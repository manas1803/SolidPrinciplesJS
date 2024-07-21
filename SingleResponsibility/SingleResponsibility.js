
/**
 * The following is an example of what not be done 
 * In case of `S` principle. Here we are just making calls 
 * for reports which is not required and should be avoided
 * @param {*} employee 
 * @returns 
 */
function calculateSalary(employee){
    const salary = employee.hoursWorked*employe.horlyRates
    const reports = getReports(employee)
    return salary;
}

//Refactoring

/**
 * These are the two new function and 
 * they follow the `S` principle which we
 * refactored out of the above function
 * @param {*} employee 
 * @returns 
 */

function calculateSalary(employee){
    const salary = employee.hoursWorked*employee.horlyRates
    return salary;
}

function reportsResult(employee){
    const reports = getReports(employee)
    return reports
}