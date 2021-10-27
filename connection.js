const fs = require('fs')
const sql = require('mysql2')
const path = require('path')

// SQL connection //
const connection = sql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    multipleStatements: true
});

// Views either the employees, roles, or departments

let printTable = (strTblName, callback) => {
    let tableCMD = "";

    switch (strTblName) {
        case "department":
            tableCMD = "SELECT id as ID, name as Name FROM department"
            break;
        case "role":
            tableCMD = "SELECT role.id as ID, title as Title, department.name as Department, salary as Salary FROM role JOIN department ON department.id = role.department_id"
            break;
        case "employee":
            tableCMD = `SELECT 
            e.id as ID, 
            e.first_name as FirstName,
            e.last_name as LastName,
            title as Title,
            department.name as Department,
            salary as Salary,
            CONCAT(man.first_name," ", man.last_name) as Manager
            FROM employee e
            JOIN role ON
            role.id = e.role_id
            JOIN department ON
            department.id = role.department_id
            LEFT JOIN employee man ON
            man.id = e.manager_id`
            break;
    }

    connection.execute(tableCMD, (err, result) => {
        if (err) throw err;
        console.table(result);
        callback();
    });

}
// Add table values //

let addDepartment = (id, name) => {
    let SQL = `INSERT INTO department (id, name) 
                VALUES (${id}, "${name}")`

    connection.execute(SQL, (err, result) => {
        if (err) throw err;
    });
}

let addRole = (id, title, salary, departmentId) => {
    let SQL = `INSERT INTO role (id, title, salary, department_id) 
                VALUES (${id}, "${title}",${salary}, ${departmentId})`

    connection.execute(SQL, (err, result) => {
        if (err) throw err;
    });
}

let addEmployee = (id, firstName, lastName, roleId, managerId) => {
    let SQL = `INSERT INTO employee (id, first_name, last_name, role_id, manager_id) 
                VALUES (${id},"${firstName}","${lastName}", ${roleId},${managerId})`

    connection.execute(SQL, (err, result) => {
        if (err) throw err;
    });
}

// Update table values

let updateEmployeeRole = (employeeId, roleId) => {
    let SQL = `UPDATE employee SET role_id = ${roleId} WHERE id = ${employeeId};`

    connection.execute(SQL, (err, result) => {
        if (err) throw err;
    });
}

// Populate db

function init() {
    connection.connect();

    const schema = fs.readFileSync(path.join(__dirname, './db/schema.sql')).toString();

    connection.query(schema, (err, result) => {
        if (err) throw err;
    });

    const seeds = fs.readFileSync(path.join(__dirname, './db/seeds.sql')).toString();

    connection.query(seeds, (err, result) => {
        if (err) throw err;
    });
}

module.exports = {
    init: init,
    connection: connection,
    printTable: printTable,
    addDepartment: addDepartment,
    addRole: addRole,
    addEmployee: addEmployee,
    updateEmployeeRole: updateEmployeeRole
}