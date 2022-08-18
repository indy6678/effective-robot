INSERT INTO department (name)
VALUES 
    ('Legal'),
    ('Sales'),
    ('Engineering'),
    ('Finance');

INSERT INTO role (title, department_id, salary)
VALUES
    ('Sales Lead', 2,  10000),
    ('Salesperson', 2, 80000),
    ('Lead Engineer', 3, 150000),
    ('Software Engineer', 3, 120000),
    ('Account Manager', 4, 160000),
    ('Accountant', 4, 125000),
    ('Legal Team Lead', 1, 250000),
    ('Lawyer', 1, 190000);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', NULL, 3),
    ('Kunal', 'Singh', NULL, NULL),
    ('Malia', 'Brown', NULL, 5),
    ('Sarah', 'Lourd', NULL, NULL),
    ('Tom', 'Allen', NULL, 7);