/**
 * Created a class for text Manipulation
 * In the class we have certain methods to manipulate string
 * But also we are getting the text and also printing it
 * which are not part of manipulation so we can create a new class
 */
var TextManipulator = /** @class */ (function () {
    function TextManipulator(text) {
        this.text = text;
    }
    TextManipulator.prototype.appendText = function (newText) {
        return this.text.concat(newText);
    };
    TextManipulator.prototype.findAndReplace = function (word, replacementWord) {
        if (this.text.includes(word)) {
            this.text.replace(word, replacementWord);
        }
        return this.text;
    };
    TextManipulator.prototype.printText = function () {
        console.log("The text is ", this.text);
    };
    return TextManipulator;
}());
var NewTextManipulator = /** @class */ (function () {
    function NewTextManipulator(text) {
        this.text = text;
    }
    NewTextManipulator.prototype.appendText = function (newText) {
        return this.text.concat(newText);
    };
    NewTextManipulator.prototype.findAndReplace = function (word, replacementWord) {
        if (this.text.includes(word)) {
            this.text.replace(word, replacementWord);
        }
        return this.text;
    };
    NewTextManipulator.prototype.getText = function () {
        return this.text;
    };
    return NewTextManipulator;
}());
var PrintText = /** @class */ (function () {
    function PrintText(formattedText) {
        this.formattedText = formattedText;
    }
    PrintText.prototype.printText = function () {
        console.log("The text is ", this.formattedText.getText());
    };
    return PrintText;
}());
