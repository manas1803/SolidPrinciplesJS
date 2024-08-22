## SOLID Principles

### Single Responsibility Principle(S)

The main definition of Single Responsibility principle says that `A class should have only one reason to change`. Lets break down this statement for better understanding.

Suppose we have a class that manipulates the text that we pass to it, the single responsibility principle states that the class we create should only be responsible for manipulating the text, and any other action that it performs should not be the part of the class.

Lets take an example of such a class and see how we can refactor it :

```ts
class TextManipulator {
  text: string;

  constructor(text: string) {
    this.text = text;
  }

  appendText(newText: string) {
    return this.text.concat(newText);
  }

  findAndReplace(word: string, replacementWord: string) {
    if (this.text.includes(word)) {
      this.text.replace(word, replacementWord);
    }
    return this.text;
  }

  printText() {
    console.log("The text is ", this.text);
  }
}
```

In the above code one can see that the class is also performing the `print` action. This breaks the Single Responsibility principle. We can refactor the code by creating two new classes

```ts
class TextManipulator {
  private text: string;

  constructor(text: string) {
    this.text = text;
  }

  appendText(newText: string) {
    return this.text.concat(newText);
  }

  findAndReplace(word: string, replacementWord: string) {
    if (this.text.includes(word)) {
      this.text.replace(word, replacementWord);
    }
    return this.text;
  }

  getText() {
    return this.text;
  }
}

class PrintText {
  formattedText: TextManipulator;

  constructor(formattedText: TextManipulator) {
    this.formattedText = formattedText;
  }

  printText() {
    console.log("The text is ", this.formattedText.getText());
  }
}
```

In the refactored code we have two separate classes that are performing separate action.

#### Why Single Responsibility Principle

With Single Responsibility Principle in place we can achieve the following :-

1. Better code organization and maintainability
2. Higher code reusability
3. Improved readability
4. Easier debugging and testing

#### Things to take in account

The trick to implement single responsibility principle is to know what is the single responsibility of our class. However every developer has his/her vision for class responsibility, and since we don't have any instructions on how to implement, we are only left with our own interpretation.

There can be instances when we separate two classes that are in fact doing the same thing with business or architecture perspective. This can create a more complicated code with both the classes **tightly coupled** to each other, and thus reducing the sole purpose of **SOLID** principles

> The key is not to overthink when creating new classes

### Open Closed Principle(O)

The basic definition of the principle is that software entities such as `classes`, `modules`, `functions` etc should be open for extension but closed for modification. Lets break down this statement to understand in detail.

Suppose we create a class for bank accounts where we have two methods to withdraw and deposit the amount. Now in future we will have different kinds of accounts, to to deposit or withdraw the amount sometimes we are charged with some fees,depending on type of account.
So if such a scenario occurs, then in that case we should not modify the existing class(close for modification) but rather create abstraction of such methods and then extend it into new class

Lets take an example to better understand :-

```ts
class BankAccount {
  private _customerName: string;
  private _customerId: string;
  private _amount: number = 10000;

  constructor(customerName: string, customerId: string) {
    this._customerName = customerName;
    this._customerId = customerId;
  }

  withdrawAmount(newAmount: number) {
    this._amount = this._amount - newAmount;
  }

  depositAmount(newAmount: number) {
    this._amount = this._amount + newAmount;
  }
}
```

From the code we can see that its a basic class of BankAccount that have a method to calculate withdraw and deposit. Now suppose a new requirement comes that we have different `accountType` and for different accountType calculations are different. Lets change the code accordingly.

```ts
class BankAccount {
  private _customerName: string;
  private _customerId: string;
  private _bankType: string;
  private _amount: number = 10000;

  constructor(customerName: string, customerId: string, bankType: string) {
    this._customerName = customerName;
    this._customerId = customerId;
    this._bankType = bankType;
  }

  public get amount(): number {
    return this._amount;
  }

  withdrawAmount(newAmount: number) {
    if (this._bankType === "savings") this._amount = this._amount - newAmount;
    else if (this._bankType === "current")
      this._amount = this._amount - this._amount * 0.005 - newAmount;
  }

  depositAmount(newAmount: number) {
    if (this._bankType === "savings") this._amount = this._amount + newAmount;
    else if (this._bankType === "current")
      this._amount = this._amount + this._amount * 0.005 + newAmount;
  }
}
const savingsAccount = new BankAccount("Manas", "123", "savings");
const currentAccount = new BankAccount("Manas", "123", "current");

savingsAccount.depositAmount(100000);
savingsAccount.withdrawAmount(1212);

console.log("Amount in savings account is ", savingsAccount.amount);

currentAccount.depositAmount(100000);
currentAccount.withdrawAmount(1212);

console.log("Amount in current account is ", currentAccount.amount);
```

This code works, but can you find the issue with this approach ?

#### Why Open Closed Principle

The above approach has few issues with it.

1. We will end up testing the whole functionality again since we introduced new code in already existing feature
2. This in turn can end up being a costly process for the organization
3. Since our class or method might end up doing multiple this, this also breaks our Single Responsibility Principle
4. With addition of new code, the maintainence overhead for the classes increases.

To get rid of the above issues we go with Open Closed Principle approach
What we do is basically create an abstract class for `bankAccount` and then make the `withdraw()` and `deposit()` method as abstract. Now once that is done, we can create as many classes as we want based on `type of account` and then simply extend this abstract class

```ts
abstract class BankAccount {
  private _customerName: string;
  private _customerId: string;
  private _bankType: string;
  private _amount: number = 10000;

  constructor(customerName: string, customerId: string, bankType: string) {
    this._customerName = customerName;
    this._customerId = customerId;
    this._bankType = bankType;
  }

  public get getAmount(): number {
    return this._amount;
  }

  public set setAmount(amount: number) {
    this._amount = amount;
  }

  abstract withdrawAmount(newAmount: number): void;

  abstract depositAmount(newAmount: number): void;
}

class SavingsAccount extends BankAccount {
  constructor(customerName: string, customerId: string, bankType: string) {
    super(customerName, customerId, bankType);
  }

  withdrawAmount(newAmount: number): void {
    this.setAmount = this.getAmount - newAmount;
  }

  depositAmount(newAmount: number): void {
    this.setAmount = this.getAmount + newAmount;
  }
}

class CurrentAccount extends BankAccount {
  constructor(customerName: string, customerId: string, bankType: string) {
    super(customerName, customerId, bankType);
  }

  withdrawAmount(newAmount: number): void {
    this.setAmount = this.getAmount - this.getAmount * 0.005 - newAmount;
  }

  depositAmount(newAmount: number): void {
    this.setAmount = this.getAmount + this.getAmount * 0.005 + newAmount;
  }
}

const savingsAccount = new SavingsAccount("Manas", "123", "savings");
const currentAccount = new CurrentAccount("Manas", "123", "current");

savingsAccount.depositAmount(100000);
savingsAccount.withdrawAmount(1212);

console.log("Amount in savings account is ", savingsAccount.getAmount);

currentAccount.depositAmount(100000);
currentAccount.withdrawAmount(1212);

console.log("Amount in current account is ", currentAccount.getAmount);
```

### Liskov Substitution Principle(L)
The Liskov Substitution Principle says that objects of a superclass shall be replaceable with objects of its subclasses without breaking the application. That requires the objects of your subclasses to behave in the same way as the objects of your superclass.
> Liskov Substitution Principle is extension of Open/Close Principle

In simple words
1. Objects of a superclass should be able to be replaced with objects of a subclass without affecting the program.
2. Object of subclass should be able to access the all the methods and properties of the superclass.

Lets take an example to understand this :-(Since this is extension of Opne/Close Principle lets use the same example)

As we have seen now that if we have different types of bank account, we can simply create a new bankAccount by extending the class bankAccount

Now suppose we have a new BankAccount type now, for Fixed Deposit. From the Open/Close Principle we can simply implement this as
```ts
class FixedDepositAccount extends BankAccount{
      withdrawAmount(newAmount: number): void {
          throw new Error("Cannot withdraw from Fixed Deposit when in locing period.");
      }
      depositAmount(newAmount: number): void {
        this.setAmount = this.getAmount + newAmount;
      }
    
  }

const fixedAccount = new FixedDepositAccount("Manas", "123");
fixedAccount.depositAmount(1234567);
```

Since we cannot withdraw from FixedDepositAccount we throw an error for that

Lets assume we have a `BankWithdrawlService` and we wish to withdraw amount from different accounts.
```ts
class BankWithdrawService {
    private _bankAccount:BankAccount

    constructor(bankAccount:BankAccount){
        this._bankAccount=bankAccount
    }

    withdrawAmount(amount:number){
        this._bankAccount.withdrawAmount(amount)
    }
}

```
Now Liskov Principle says that any subclass of a class should be able to replace it. So now if we try to withdraw amount from fixedDeposit class(Subclass of BankAccount), we will get an error which violates the Liskov Principle

```ts
const bankWithdrawlService = new BankWithdrawService(fixedAccount)
bankWithdrawlService.withdrawAmount(123)

```
>Error: Cannot withdraw from Fixed Deposit when in locking period.

So to improve this code and align with Liskov principle, first we need to separate out the withdraw method. Since all accounts will always have deposit method so lets create interfaces to refactor the code and optimise it.

Steps to approach :-
1. We create an interface for deposit method, since all bank accounts currently that we have serve deposit
2. Then we create another interface for withdraw method for withdrawable accounts
3. Now we create a main BankAccount abstract class which implements the deposit interface
4. Then we create a withdrawable abstract class which extends the BankAccount class and also implements the withdrawable interface
5. Now we simple use withdrawable abstract class for Savings and Current Account
6. And the BankAccount abstract class for FixedDeposit account

```ts
interface IDepositAmount {
  depositAmount(amount: number): void;
}

interface IWithdrawAmount {
  withdrawAmount(amount: number): void;
}
abstract class BankAccount implements IDepositAmount {
  private _customerName: string;
  private _customerId: string;
  private _amount: number = 10000;

  constructor(customerName: string, customerId: string) {
    this._customerName = customerName;
    this._customerId = customerId;
  }
  abstract depositAmount(amount: number): void;

  public get getAmount(): number {
    return this._amount;
  }

  public set setAmount(amount: number) {
    this._amount = amount;
  }
}

abstract class WithdrawableAccount
  extends BankAccount
  implements IWithdrawAmount
{
  constructor(customerName: string, customerId: string) {
    super(customerName, customerId);
  }
  abstract withdrawAmount(amount: number): void;
}

class SavingsAccount extends WithdrawableAccount {
  constructor(customerName: string, customerId: string) {
    super(customerName, customerId);
  }

  withdrawAmount(newAmount: number): void {
    this.setAmount = this.getAmount - this.getAmount * 0.005 - newAmount;
  }

  depositAmount(newAmount: number): void {
    this.setAmount = this.getAmount + this.getAmount * 0.005 + newAmount;
  }
}

class CurrentAccount extends WithdrawableAccount {
  constructor(customerName: string, customerId: string) {
    super(customerName, customerId);
  }

  withdrawAmount(newAmount: number): void {
    this.setAmount = this.getAmount - this.getAmount * 0.005 - newAmount;
  }

  depositAmount(newAmount: number): void {
    this.setAmount = this.getAmount + this.getAmount * 0.005 + newAmount;
  }
}

class FixedDepositAccount extends BankAccount {
  depositAmount(amount: number): void {
    this.setAmount = this.getAmount + amount;
  }
}
const fixedAccount = new FixedDepositAccount("Manas", "123");
fixedAccount.depositAmount(1234567);

class BankWithdrawService {
  private _withdrawableAccount: WithdrawableAccount;

  constructor(withdrawableAccount: WithdrawableAccount) {
    this._withdrawableAccount = withdrawableAccount;
  }

  withdrawAmount(amount: number) {
    this._withdrawableAccount.withdrawAmount(amount);
  }
}

const withdrawableAccount = new SavingsAccount("Manas","123")

const bankWithdrawlService = new BankWithdrawService(withdrawableAccount);
bankWithdrawlService.withdrawAmount(123);

```

Benefits:
The benefit of following LSP is that it leads to more modular, extensible, and maintainable code. Here are some specific benefits:

1. Code reusability: When LSP is followed, the code can be reused easily because it allows for the use of generic interfaces or base classes that can be implemented or extended by different subclasses.

2. Improved code quality: By following LSP, the code becomes more understandable and easier to maintain.

### Interface Segregation
This principle was first defined by Robert C. Martin as: **Clients should not be forced to depend upon interfaces that they do not use**

The goal of this principle is to reduce the side effects of using larger interfaces by breaking application interfaces into smaller ones. It’s similar to the Single Responsibility Principle, where each class or interface serves a single purpose.

Let’s look into a situation where we’ve got a Payment interface used by an implementation BankPayment:

```ts
interface IPayment{
  initiatePayment():void;
  paymentStatus:string;
  getPayments():Array<string>[];
}

class BankPayment implements IPayment {
  initiatePayment(): void {
    throw new Error("Method not implemented.");
  }
  paymentStatus: string;
  getPayments(): Array<string>[] {
    throw new Error("Method not implemented.");
  }
  
}
```
For simplicity, let’s ignore the actual business implementation of these methods.

This is very clear — so far, the implementing class BankPayment needs all the methods in the Payment interface. Thus, it doesn’t violate the principle.

Now with time we got a new feature introduced and we need to implement LoanPayment Service

```ts
interface IPayment{
  initiatePayment():void;
  paymentStatus:string;
  getPayments():Array<string>[];
  intiateLoanSettlement():void;
  initiateRePayment():void;
}

class BankPayment implements IPayment {
  intiateLoanSettlement(): void {
    // Not needed here
  }
  initiateRePayment(): void {
    // not needed here
  }
  initiatePayment(): void {
    throw new Error("Method not implemented.");
  }
  paymentStatus: string;
  getPayments(): Array<string>[] {
    throw new Error("Method not implemented.");
  }
  
}

class LoanPayment implements IPayment{
  initiatePayment(): void {
    throw new Error("Method not implemented.");
  }
  paymentStatus: string;
  getPayments(): Array<string>[] {
    throw new Error("Method not implemented.");
  }
  intiateLoanSettlement(): void {
    throw new Error("Method not implemented.");
  }
  initiateRePayment(): void {
    throw new Error("Method not implemented.");
  }

}
```

Since the Payment interface has changed and more methods were added, all the implementing classes now have to implement the new methods. The problem is, implementing them is unwanted and could lead to many side effects. Here, the LoanPayment implementation class has to implement the initiatePayments() without any actual need for this. And so, the principle is violated.

```ts
interface IPayment{
  paymentStatus:string;
  getPayments():Array<string>[];
}

interface IBank extends IPayment{
  initiatePayment():void;
}

interface ILoan extends IPayment{
  intiateLoanSettlement():void;
  initiateRePayment():void;
}

class BankPayment implements IBank {
  initiatePayment(): void {
    throw new Error("Method not implemented.");
  }
  paymentStatus: string;
  getPayments(): Array<string>[] {
    throw new Error("Method not implemented.");
  }
  
}

class LoanPayment implements ILoan{
  intiateLoanSettlement(): void {
    throw new Error("Method not implemented.");
  }
  initiateRePayment(): void {
    throw new Error("Method not implemented.");
  }
  paymentStatus: string;
  getPayments(): Array<string>[] {
    throw new Error("Method not implemented.");
  }
}
```

>The principle is similar to Single Responsibility Principle
