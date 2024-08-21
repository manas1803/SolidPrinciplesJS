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
