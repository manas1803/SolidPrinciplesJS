// abstract class BankAccount {
//   private _customerName: string;
//   private _customerId: string;
//   private _bankType: string;
//   private _amount: number = 10000;

//   constructor(customerName: string, customerId: string, bankType: string) {
//     this._customerName = customerName;
//     this._customerId = customerId;
//     this._bankType = bankType;
//   }

//   public get getAmount(): number {
//     return this._amount;
//   }

//   public set setAmount(amount: number) {
//     this._amount = amount;
//   }

//   abstract withdrawAmount(newAmount: number): void;

//   abstract depositAmount(newAmount: number): void;
// }

// class SavingsAccount extends BankAccount {
//   constructor(customerName: string, customerId: string, bankType: string) {
//     super(customerName, customerId, bankType);
//   }

//   withdrawAmount(newAmount: number): void {
//     this.setAmount = this.getAmount - newAmount;
//   }

//   depositAmount(newAmount: number): void {
//     this.setAmount = this.getAmount + newAmount;
//   }
// }

// class CurrentAccount extends BankAccount {
//   constructor(customerName: string, customerId: string, bankType: string) {
//     super(customerName, customerId, bankType);
//   }

//   withdrawAmount(newAmount: number): void {
//     this.setAmount = this.getAmount - this.getAmount * 0.005 - newAmount;
//   }

//   depositAmount(newAmount: number): void {
//     this.setAmount = this.getAmount + this.getAmount * 0.005 + newAmount;
//   }
// }

// const savingsAccount = new SavingsAccount("Manas", "123", "savings");
// const currentAccount = new CurrentAccount("Manas", "123", "current");

// savingsAccount.depositAmount(100000);
// savingsAccount.withdrawAmount(1212);

// console.log("Amount in savings account is ", savingsAccount.getAmount);

// currentAccount.depositAmount(100000);
// currentAccount.withdrawAmount(1212);

// console.log("Amount in current account is ", currentAccount.getAmount);
