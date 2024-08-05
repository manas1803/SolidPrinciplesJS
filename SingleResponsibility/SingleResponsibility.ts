/**
 * Created a class for text Manipulation
 * In the class we have certain methods to manipulate string
 * But also we are getting the text and also printing it
 * which are not part of manipulation so we can create a new class
 */

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

class NewTextManipulator {
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
  formattedText: NewTextManipulator;

  constructor(formattedText: NewTextManipulator) {
    this.formattedText = formattedText;
  }

  printText() {
    console.log("The text is ", this.formattedText.getText());
  }
}
