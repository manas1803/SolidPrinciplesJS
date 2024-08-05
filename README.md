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

