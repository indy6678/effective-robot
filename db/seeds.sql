INSERT INTO department (id, name)
VALUES 
    (1, 'Legal'),
    (2, 'Sales'),
    (3, 'Engineering'),
    (4, 'Finance');

INSERT INTO role (id, title, department, salary)
VALUES
    (1, 'Sales Lead', 'Sales',  10000),
    (2, 'Salesperson', 'Sales', 80000),
    (3, 'Lead Engineer', 'Engineering', 150000),
    (4, 'Software Engineer', 'Engineering', 120000),
    (5, 'Account Manager', 'Finance', 160000),
    (6, 'Accountant', 'Finance', 125000),
    (7, 'Legal Team Lead', 'Legal', 250000),
    (8, 'Lawyer', 'Legal', 190000);

INSERT INTO employee (id, first_name, last_name)
VALUES
    (1, 'John', 'Doe'),
    (2, 'Mike', 'Chan'),
    (3, 'Ashley', 'Rodriguez'),
    (4, 'Kevin', 'Tupik'),
    (5, 'Kunal', 'Singh'),
    (6, 'Malia', 'Brown'),
    (7, 'Sarah', 'Lourd'),
    (8, 'Tom', 'Allen');