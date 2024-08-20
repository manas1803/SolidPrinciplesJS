var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Employee = /** @class */ (function () {
    function Employee(empName, id, salary, empType) {
        this._empName = empName;
        this._id = id;
        this._salary = salary;
        this._empType = empType;
    }
    Object.defineProperty(Employee.prototype, "salary", {
        get: function () {
            return this._salary;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Employee.prototype, "empName", {
        get: function () {
            return this._empName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Employee.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Employee.prototype.printResult = function () {
        return "The bonus of employe ".concat(this.empName, " with id ").concat(this.id, " is ").concat(this.calculateBonus());
    };
    return Employee;
}());
var PermanentEmployee = /** @class */ (function (_super) {
    __extends(PermanentEmployee, _super);
    function PermanentEmployee() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PermanentEmployee.prototype.calculateBonus = function () {
        return this.salary + this.salary / 2;
    };
    return PermanentEmployee;
}(Employee));
var TemporaryEmployee = /** @class */ (function (_super) {
    __extends(TemporaryEmployee, _super);
    function TemporaryEmployee() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TemporaryEmployee.prototype.calculateBonus = function () {
        return this.salary * 0.5 + this.salary / 2;
    };
    return TemporaryEmployee;
}(Employee));
var emp1 = new PermanentEmployee("Manas Pant", 1, 1000000, "permanent");
var emp2 = new TemporaryEmployee("Kislaya Pant", 1, 1000000, "temporary");
console.log(emp1.printResult());
console.log(emp2.printResult());
