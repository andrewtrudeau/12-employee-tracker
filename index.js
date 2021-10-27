const inq = require('inquirer');
const con = require('./connection.js');

const msgArt = `

███████╗███╗░░░███╗██████╗░██╗░░░░░░█████╗░██╗░░░██╗███████╗███████╗
██╔════╝████╗░████║██╔══██╗██║░░░░░██╔══██╗╚██╗░██╔╝██╔════╝██╔════╝
█████╗░░██╔████╔██║██████╔╝██║░░░░░██║░░██║░╚████╔╝░█████╗░░█████╗░░
██╔══╝░░██║╚██╔╝██║██╔═══╝░██║░░░░░██║░░██║░░╚██╔╝░░██╔══╝░░██╔══╝░░
███████╗██║░╚═╝░██║██║░░░░░███████╗╚█████╔╝░░░██║░░░███████╗███████╗
╚══════╝╚═╝░░░░░╚═╝╚═╝░░░░░╚══════╝░╚════╝░░░░╚═╝░░░╚══════╝╚══════╝

███╗░░░███╗░█████╗░███╗░░██╗░█████╗░░██████╗░███████╗██████╗░
████╗░████║██╔══██╗████╗░██║██╔══██╗██╔════╝░██╔════╝██╔══██╗
██╔████╔██║███████║██╔██╗██║███████║██║░░██╗░█████╗░░██████╔╝
██║╚██╔╝██║██╔══██║██║╚████║██╔══██║██║░░╚██╗██╔══╝░░██╔══██╗
██║░╚═╝░██║██║░░██║██║░╚███║██║░░██║╚██████╔╝███████╗██║░░██║
╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═╝░░╚══╝╚═╝░░╚═╝░╚═════╝░╚══════╝╚═╝░░╚═╝
______________________________________________________________________
`
// Exit program
let quit = false;

menuOptions = [
    { name: 'View all departments', value: "0" },
    { name: 'View all roles', value: "1" },
    { name: 'View all employees', value: "2" },
    { name: 'Add a department', value: "3" },
    { name: 'Add a role', value: "4" },
    { name: 'Add an employee', value: "5" },
    { name: 'Update an employee role', value: "6" },
    { name: 'Quit', value: "-1" }
]

// PROMPTS //

function promptDepartment() {
    console.log("\n");

    inq.prompt([
        {
            name: "departmentName",
            type: "input",
            message: "Enter Department Name: ",
        },
        {
            name: "id",
            type: "input",
            message: "Enter Department ID: ",
        }
    ]).then(result => {
        let name = result.departmentName;
        let id = parseInt(result.id);
        con.addDepartment(id, name);
        console.log("Department added.");
        promptMenu();
    });
}

function promptRole() {
    console.log("\n");

    inq.prompt([
        {
            name: "roleName",
            type: "input",
            message: "Enter Role Name: ",
        },
        {
            name: "id",
            type: "input",
            message: "Enter Role ID: ",
        },
        {
            name: "salary",
            type: "input",
            message: "Enter Salary: ",
        },
        {
            name: "departmentId",
            type: "input",
            message: "Enter Department ID: ",
        }
    ]).then(result => {
        let id = parseInt(result.id);
        let title = result.roleName
        let salary = parseFloat(result.salary);
        let departmentId = parseInt(result.departmentId);

        con.addRole(id, title, salary, departmentId);
        console.log("Role added.");
        promptMenu();
    });
}

function promptEmployee() {
    console.log("\n");

    inq.prompt([
        {
            name: "first",
            type: "input",
            message: "Enter First Name: ",
        },
        {
            name: "last",
            type: "input",
            message: "Enter Last Name: ",
        },
        {
            name: "id",
            type: "input",
            message: "Enter Employee ID: ",
        },
        {
            name: "roleId",
            type: "input",
            message: "Enter The Role ID: ",
        },
        {
            name: "managerId",
            type: "input",
            message: "Enter The Manager ID: ",
        }
    ]).then(result => {
        let id = parseInt(result.id);
        let first = result.first;
        let last = result.last;
        let roleId = parseInt(result.roleId);
        let managerId = parseInt(result.managerId);

        con.addEmployee(id, first, last, roleId, managerId);
        console.log("Role added.");
        promptMenu();
    });
}

function promptUpdateRole() {
    console.log("\n");

    inq.prompt([
        {
            name: "employeeId",
            type: "input",
            message: "Enter ID of Employee to Edit: ",
        },
        {
            name: "role",
            type: "input",
            message: "Enter Role ID: ",
        }
    ]).then(result => {
        let id = parseInt(result.employeeId);
        let roleId = parseInt(result.role);

        con.updateEmployeeRole(id, roleId);
        console.log("Role updated.");
        promptMenu();
    });
}

// Main menu 

function promptMenu() {
    console.log("\n");

    inq.prompt([
        {
            name: "selection",
            type: "list",
            message: "Employee Menu",
            choices: menuOptions
        }
    ]).then(result => {
        console.log("\n");
        // Each selection has an associated ID that is used in a switch statement
        switch (parseInt(result.selection)) {
            case -1:
                con.connection.end();
                quit = true;
                break;
            case 0:
                con.printTable("department", promptMenu);
                break;
            case 1:
                con.printTable("role", promptMenu);
                break;
            case 2:
                con.printTable("employee", promptMenu);
                break;
            case 3:
                promptDepartment();
                break;
            case 4:
                promptRole();
                break;
            case 5:
                promptEmployee();
                break;
            case 6:
                promptUpdateRole();
                break;

        }

    }).then(() => {
        if (!quit) {
            console.log("\n");
            console.log("\n");
        }
    });
}

console.log(msgArt);
con.init();
promptMenu();
