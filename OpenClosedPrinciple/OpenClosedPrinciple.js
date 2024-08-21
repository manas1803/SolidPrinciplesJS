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
var BankAccount = /** @class */ (function () {
    function BankAccount(customerName, customerId, bankType) {
        this._amount = 10000;
        this._customerName = customerName;
        this._customerId = customerId;
        this._bankType = bankType;
    }
    Object.defineProperty(BankAccount.prototype, "getAmount", {
        get: function () {
            return this._amount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BankAccount.prototype, "setAmount", {
        set: function (amount) {
            this._amount = amount;
        },
        enumerable: false,
        configurable: true
    });
    return BankAccount;
}());
var SavingsAccount = /** @class */ (function (_super) {
    __extends(SavingsAccount, _super);
    function SavingsAccount(customerName, customerId, bankType) {
        return _super.call(this, customerName, customerId, bankType) || this;
    }
    SavingsAccount.prototype.withdrawAmount = function (newAmount) {
        this.setAmount = this.getAmount - newAmount;
    };
    SavingsAccount.prototype.depositAmount = function (newAmount) {
        this.setAmount = this.getAmount + newAmount;
    };
    return SavingsAccount;
}(BankAccount));
var CurrentAccount = /** @class */ (function (_super) {
    __extends(CurrentAccount, _super);
    function CurrentAccount(customerName, customerId, bankType) {
        return _super.call(this, customerName, customerId, bankType) || this;
    }
    CurrentAccount.prototype.withdrawAmount = function (newAmount) {
        this.setAmount = this.getAmount - this.getAmount * 0.005 - newAmount;
    };
    CurrentAccount.prototype.depositAmount = function (newAmount) {
        this.setAmount = this.getAmount + this.getAmount * 0.005 + newAmount;
    };
    return CurrentAccount;
}(BankAccount));
var savingsAccount = new SavingsAccount("Manas", "123", "savings");
var currentAccount = new CurrentAccount("Manas", "123", "current");
savingsAccount.depositAmount(100000);
savingsAccount.withdrawAmount(1212);
console.log("Amount in savings account is ", savingsAccount.getAmount);
currentAccount.depositAmount(100000);
currentAccount.withdrawAmount(1212);
console.log("Amount in current account is ", currentAccount.getAmount);
