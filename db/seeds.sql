USE employee_info;

INSERT INTO department (id, name)
VALUES (001, "Deli"), (002, "Produce");

INSERT INTO role (id, title, salary, department_id)
VALUES (001, "Deli Manager", 20000.00, 001), 
        (002, "Deli Chef", 10000.00, 001),
        (003, "Deli Merchant", 1000.00, 001),
        (004, "Produce Manager", 10000.00, 002), 
        (005, "Produce Worker", 2000.00, 002); 

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (001, "Melissa" , "Johnson", 001, null),
        (002, "Susan" , "McCoy", 003, 001),
        (003, "Micheal" , "Huffman", 003, 001),
        (004, "Andrew" , "Trudeau", 002, 001),
        (005, "Dwight" , "Cotton", 004, null),
        (006, "Sam" , "Bucket", 005, 005);