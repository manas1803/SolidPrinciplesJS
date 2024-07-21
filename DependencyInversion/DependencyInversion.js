/**
 * The last principle states that higher modules should not have dependency on lower level modules
 * So now from the code the main issue is that we are directly dependent on Mysql connect
 */

class MySqlConnection {
    connect(){
        // some connection code here
    }
}

class PasswordReminder {
    constructor(){
        this.dbConnection = new MySqlConnection()
    }    
}

// Refactoring

class SqlConnection{
    connect(){
        //some code here
    }
}

class CodeReminder{
    // Some instance of SQLConnection have been injected to the constructor to use
    constructor(connection){
        this.dbConnection = connection
    }
}