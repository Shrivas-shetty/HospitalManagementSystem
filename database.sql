

--(we wont be using patient_history view)



DELIMITER $$                                       --trigger that adds bill when appointment is completed
CREATE TRIGGER generate_bill_after_completion
AFTER UPDATE ON appointments
FOR EACH ROW
BEGIN
  IF NEW.status = 'Completed' THEN
    INSERT INTO bills (appointment_id, total_amount)
    VALUES (
      NEW.appointment_id,
      (SELECT fees FROM doctors WHERE doctor_id = NEW.doctor_id)
    );
  END IF;
END$$
DELIMITER ;









DELIMITER $$                                                    -- procedure that generates bill
CREATE PROCEDURE generate_bill(IN appt_id INT)
BEGIN
  DECLARE doc_fee DECIMAL(10,2);

  SELECT d.fees INTO doc_fee
  FROM doctors d
  JOIN appointments a ON d.doctor_id = a.doctor_id
  WHERE a.appointment_id = appt_id;

  INSERT INTO bills (appointment_id, total_amount)
  VALUES (appt_id, doc_fee);
END$$
DELIMITER ;




DELIMITER //
CREATE TRIGGER after_payment_insert             --trigger for payments
AFTER INSERT ON payments
FOR EACH ROW
BEGIN
    UPDATE bills 
    SET payment_status = 'Paid' 
    WHERE bill_id = NEW.bill_id;
END //

DELIMITER ;



CREATE TABLE stay_history (                                 
    patient_id,
    room_id INT,
    admit_date DATE,
    discharge_date DATE,

    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    FOREIGN KEY (room_id) REFERENCES rooms(room_id)
);





 --(trigger which saves record into stay_history whenever a patient is discharged (removed from admissions))
DELIMITER $$                                   
CREATE TRIGGER before_admission_delete
BEFORE DELETE ON admissions
FOR EACH ROW
BEGIN
    INSERT INTO stay_history (patient_id, room_id, admit_date, discharge_date)
    VALUES (OLD.patient_id, OLD.room_id, OLD.admission_date, OLD.discharge_date);
END $$

DELIMITER ;


SELECT dep.name AS department, SUM(p.amount) AS total_revenue       --complex queries
    FROM departments dep
    JOIN doctors doc ON doc.department_id = dep.department_id
    JOIN appointments app ON app.doctor_id=doc.doctor_id
    JOIN bills b on b.appointment_id = app.appointment_id
    JOIN payments p ON b.bill_id = p.bill_id
    GROUP BY department
    order by total_revenue desc



SELECT pat.name , SUM(p.amount) FROM patients pat              --complex queries
    JOIN appointments app ON pat.patient_id=app.patient_id
    JOIN bills b ON app.appointment_id=b.appointment_id
    JOIN payments p ON b.bill_id=p.bill_id
    Group by pat.patient_id
    order by SUM(p.amount) DESC









DELIMITER $$                      --(procedure takes in roomtype and displays all patients in such rooms)

CREATE PROCEDURE getPatientsByRoomType(IN room_type VARCHAR(50))
BEGIN
    SELECT p.patient_id, p.name, r.room_number, r.type
    FROM patients p
    JOIN admissions a ON p.patient_id = a.patient_id
    JOIN rooms r ON a.room_id = r.room_id
    WHERE r.type = room_type;
END $$
DELIMITER ;








DELIMITER $$                          --(a function which takes patientid and shows total amount paid by him)
CREATE FUNCTION getTotalBill(pid INT)
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE total INT;

    SELECT SUM(p.amount) INTO total
    FROM payments p
    JOIN bills b ON p.bill_id = b.bill_id
    JOIN appointments a ON b.appointment_id = a.appointment_id
    WHERE a.patient_id = pid;
    RETURN IFNULL(total, 0);
END $$
DELIMITER ;










DELIMITER $$                                --(procedure which displays patients who stayed >5 days)
CREATE PROCEDURE longStayPatients()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE pid INT;
    DECLARE stay INT;
    DECLARE cur CURSOR FOR
        SELECT patient_id, DATEDIFF(discharge_date, admit_date)
        FROM stay_history;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
    DROP TEMPORARY TABLE IF EXISTS temp_result;
    CREATE TEMPORARY TABLE temp_result (
        patient_id INT,
        stay_days INT
    );

    OPEN cur;
    read_loop: LOOP
        FETCH cur INTO pid, stay;
        IF done THEN
            LEAVE read_loop;
        END IF;
        IF stay > 5 THEN
            INSERT INTO temp_result VALUES (pid, stay);
        END IF;
    END LOOP;
    CLOSE cur;
    SELECT * FROM temp_result;
END $$

DELIMITER ;


--(No packages used coz MySQL doesn't support it)








SET SQL_SAFE_UPDATES = 0;

DELETE FROM payments;
DELETE FROM bills;
DELETE FROM prescriptions;
DELETE FROM appointments;
DELETE FROM stay_history;
DELETE FROM admissions;
DELETE FROM doctors;
DELETE FROM patients;
DELETE FROM rooms;
DELETE FROM departments;
DELETE FROM users;


ALTER TABLE payments AUTO_INCREMENT = 1;
ALTER TABLE bills AUTO_INCREMENT = 1;
ALTER TABLE prescriptions AUTO_INCREMENT = 1;
ALTER TABLE appointments AUTO_INCREMENT = 1;
ALTER TABLE stay_history AUTO_INCREMENT = 1;
ALTER TABLE admissions AUTO_INCREMENT = 1;
ALTER TABLE doctors AUTO_INCREMENT = 1;
ALTER TABLE patients AUTO_INCREMENT = 1;
ALTER TABLE rooms AUTO_INCREMENT = 1;
ALTER TABLE departments AUTO_INCREMENT = 1;
ALTER TABLE users AUTO_INCREMENT = 1;




//Insertion order corrected:

departments
users
rooms
patients
doctors
appointments
admissions
stay_history
prescriptions
bills
payments



DELIMITER //

-- Trigger to mark room as Occupied when a new admission is added
CREATE TRIGGER after_admission_insert
AFTER INSERT ON admissions
FOR EACH ROW
BEGIN
    UPDATE rooms 
    SET status = 'Occupied' 
    WHERE room_id = NEW.room_id;
END //

-- Trigger to mark room as Available when an admission is deleted (discharged)
CREATE TRIGGER after_admission_delete
AFTER DELETE ON admissions
FOR EACH ROW
BEGIN
    UPDATE rooms 
    SET status = 'Available' 
    WHERE room_id = OLD.room_id;
END //

DELIMITER ;
















