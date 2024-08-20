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
  
    appendText(newText:string){
      return this.text.concat(newText)
    }
    
    findAndReplace(word:string,replacementWord:string){
      if(this.text.includes(word)){
          this.text.replace(word,replacementWord)
      }
      return this.text
    }

    getText(){
        return this.text;
    }
  }
  
  class PrintText {
    formattedText: TextManipulator;
  
    constructor(formattedText: TextManipulator) {
      this.formattedText = formattedText
    }

    printText() {
        console.log("The text is ",this.formattedText.getText())
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

Suppose we create a class for employees where we are calculating the bonus for each employee. Now in future if a requirement comes to update this `bonus` calculation, then in such a scenario rather than changing the original class, we should create an abstract class and then extend that to the new classes that we will create for the change.

Lets take an example to better understand :- 

```ts
class Employee {
    private empName:string;
    private id:number;
    private salary:number;

    constructor(empName:string,id:number,salary:number){
        this.empName=empName;
        this.id=id;
        this.salary=salary;
    }

    calculateBonus(){
        return this.salary + this.salary/2;
    }

    printResult(){
        return `The bonus of employe ${this.empName} with id ${this.id} is ${this.calculateBonus()}`
    }

}
```
From the code we can see that its a basic class of employees that have a method to calculate bonus. Now suppose a new requirement comes that we have different `empType` and for different employees bonus should be calculated differently. Lets change the code accordingly.

```ts
class Employee {
  private empName: string;
  private id: number;
  private salary: number;
  private empType: string;

  constructor(empName: string, id: number, salary: number, empType: string) {
    this.empName = empName;
    this.id = id;
    this.salary = salary;
    this.empType = empType;
  }

  calculateBonus() {
    if (this.empType === "permanent") return this.salary + this.salary / 2;
    else return this.salary * 0.5 + this.salary / 2;
  }

  printResult() {
    return `The bonus of employe ${this.empName} with id ${
      this.id
    } is ${this.calculateBonus()}`;
  }
}
```

This code works, but can you find the issue with this approach ?

#### Why Open Closed Principle
The above approach has few issues with it.
1. We will end up testing the whole functionality again since we introduced new code in already existing feature
2. This in turn can end up being a costly process for the organization
3. Since our class or method might end up doing multiple this, this also breaks our Single Responsibility Principle
4. With addition of new code, the maintainence overhead for the classes increases.

To get rid of the above issues we go with Open Closed Principle approach
What we do is basically create an abstract class for `Employees` and then make the `calculateBonus()` method as abstract. Now once that is done, we can create as many classes as we want based on `type of Employee` and then simply extend this abstract class 

```ts
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

```