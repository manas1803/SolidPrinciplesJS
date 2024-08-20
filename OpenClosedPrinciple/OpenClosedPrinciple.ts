abstract class Employee {
  private _empName: string;
  private _id: number;
  private _salary: number;
  private _empType: string;

  constructor(empName: string, id: number, salary: number, empType: string) {
    this._empName = empName;
    this._id = id;
    this._salary = salary;
    this._empType = empType;
  }

  public get salary(): number {
    return this._salary;
  }

  public get empName(): string {
    return this._empName;
  }

  public get id(): number {
    return this._id;
  }

  abstract calculateBonus();

  printResult() {
    return `The bonus of employe ${this.empName} with id ${
      this.id
    } is ${this.calculateBonus()}`;
  }
}

class PermanentEmployee extends Employee {
  calculateBonus() {
    return this.salary+this.salary/2;
  }
}

class TemporaryEmployee extends Employee {
  calculateBonus() {
    return this.salary*0.5+this.salary/2;
  }
}

const emp1 = new PermanentEmployee("Manas Pant", 1, 1000000, "permanent");
const emp2 = new TemporaryEmployee("Kislaya Pant", 1, 1000000, "temporary");
console.log(emp1.printResult());
console.log(emp2.printResult());
