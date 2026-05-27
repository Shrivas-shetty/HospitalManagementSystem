
CREATE DATABASE hospital_db;
USE hospital_db;

CREATE TABLE patients (
    patient_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT,
    gender ENUM('Male', 'Female', 'Other'),
    phone VARCHAR(15) UNIQUE
);



CREATE TABLE appointments (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    doctor_id INT,
    appointment_date DATETIME NOT NULL,
    status ENUM('Scheduled', 'Completed', 'Cancelled') DEFAULT 'Scheduled',

    FOREIGN KEY (patient_id) 
        REFERENCES patients(patient_id)
        ON DELETE CASCADE,

    FOREIGN KEY (doctor_id) 
        REFERENCES doctors(doctor_id)
        ON DELETE CASCADE
);




CREATE TABLE doctors (
    doctor_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    specialization VARCHAR(100),
    fees DECIMAL(10,2) NOT NULL,
    department_id INT,
   FOREIGN KEY(department_id) REFERENCES departments(department_id)
);



CREATE TABLE bills (
    bill_id INT AUTO_INCREMENT PRIMARY KEY,
    appointment_id INT UNIQUE,
    total_amount DECIMAL(10,2) NOT NULL,
    payment_status ENUM('Paid', 'Pending') DEFAULT 'Pending',

    FOREIGN KEY (appointment_id) 
        REFERENCES appointments(appointment_id)
        ON DELETE CASCADE
);


CREATE VIEW monthly_revenue AS
SELECT 
  DATE_FORMAT(a.appointment_date, '%Y-%m') AS month,
  SUM(b.total_amount) AS total_revenue
FROM bills b
JOIN appointments a ON b.appointment_id = a.appointment_id
GROUP BY month;

CREATE VIEW doctor_stats AS
SELECT 
  d.name,
  COUNT(a.appointment_id) AS total_appointments
FROM doctors d
LEFT JOIN appointments a ON d.doctor_id = a.doctor_id
GROUP BY d.doctor_id;

CREATE VIEW patient_history AS
SELECT 
  p.name AS patient_name,
  d.name AS doctor_name,
  a.appointment_date,
  a.status
FROM appointments a
JOIN patients p ON a.patient_id = p.patient_id
JOIN doctors d ON a.doctor_id = d.doctor_id;



CREATE TABLE departments (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255)
);


CREATE TABLE rooms (
    room_id INT AUTO_INCREMENT PRIMARY KEY,
    room_number VARCHAR(10) NOT NULL,
    type VARCHAR(50),   -- ICU / General / Private
    status VARCHAR(20) DEFAULT 'Available'  -- Available / Occupied
);


CREATE TABLE admissions (
    admission_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    room_id INT,
    doctor_id INT,
    admission_date DATE,
    discharge_date DATE,

    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    FOREIGN KEY (room_id) REFERENCES rooms(room_id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id)
);

CREATE TABLE prescriptions (
    prescription_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    doctor_id INT,
    medication VARCHAR(255),
    dosage VARCHAR(100),
    instructions VARCHAR(255),
    date DATE,

    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id)
);



CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    bill_id INT,
    amount DECIMAL(10,2),
    payment_date DATE,
    method VARCHAR(50),  -- Cash / Card / UPI

    FOREIGN KEY (bill_id) REFERENCES billing(bill_id)
);

CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('Admin', 'Staff') NOT NULL
);


CREATE TABLE admissionbills (
    id INT PRIMARY KEY AUTO_INCREMENT,
    admission_id INT,
    amount INT,
    status ENUM('paid', 'unpaid')
);




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


//UNEXPECTED CHANGES ARE BELOW

ALTER TABLE admissions
ADD doctor_id INT,
ADD CONSTRAINT fk_admissions_doctor
FOREIGN KEY (doctor_id)
REFERENCES doctors(doctor_id);





CREATE TABLE admissionbills (
    id INT PRIMARY KEY AUTO_INCREMENT,
    admission_id INT,
    amount INT,
    status ENUM('paid', 'unpaid'),

    CONSTRAINT fk_admission_bill
    FOREIGN KEY (admission_id)
    REFERENCES admissions(admission_id)
    ON DELETE CASCADE
);






 
DELIMITER //                  --this trigger generates admission bill while discharging

CREATE TRIGGER before_admission_discharge
BEFORE DELETE ON admissions
FOR EACH ROW
BEGIN
    DECLARE v_amount DECIMAL(10,2);
    DECLARE v_days INT;
    DECLARE v_rate INT;

    -- 1. Determine Rate based on Room Type
    SELECT 
        CASE 
            WHEN LOWER(type) = 'general' THEN 500
            WHEN LOWER(type) = 'semi-private' THEN 1200
            WHEN LOWER(type) = 'private' THEN 2500
            WHEN LOWER(type) = 'icu' THEN 5000
            ELSE 0
        END INTO v_rate
    FROM rooms 
    WHERE room_id = OLD.room_id;

    -- 2. Calculate Stay Duration (StayHistory Logic)
    SET v_days = GREATEST(1, DATEDIFF(CURDATE(), OLD.admission_date));

    -- 3. Apply ₹1000 Minimum Floor
    SET v_amount = GREATEST(1000, v_days * v_rate);

    -- 4. Insert into admissionbills
    -- Using OLD.admission_id because it still exists in this 'BEFORE' window
    INSERT INTO admissionbills (admission_id, amount, status)
    VALUES (OLD.admission_id, v_amount, 'Unpaid');
END //

DELIMITER ;



