var clearButton = document.getElementById("clear");
var eraseButton = document.getElementById("erase");
var equalButton = document.getElementById("equal");
var numberButtons = document.querySelectorAll("#buttons .number");
var operatorButtons = document.querySelectorAll("#buttons .operator");
var outputField = document.getElementById("output");
var copyButton = document.querySelector(".copy");

document.addEventListener("DOMContentLoaded", function () {
    outputField.focus();
});

numberButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        equation = this.textContent;
        outputField.value += equation;
    });
});

operatorButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        equation = this.textContent;
        outputField.value += equation;
    });
});

clearButton.addEventListener("click", function () {
    outputField.value = "";
});

eraseButton.addEventListener("click", function () {
    sliceLastCharacter();
});

function sliceLastCharacter() {
    var currentValue = outputField.value;
    if (currentValue.length > 0) {
        outputField.value = currentValue.slice(0, -1);
    }
}

equalButton.addEventListener("click", function () {
    evaluate();
});

function evaluate() {
    var expression = outputField.value;
    expression = expression.replace(/\^/g, '*');
    expression = expression.replace(/x/g, '*');

    try {
        var result = eval(expression);
        outputField.value = result;
    } catch (error) {
        outputField.value = "Error";
    }
}

document.addEventListener("keydown", function (event) {
    var key = event.key;
    switch (key) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '^':
            event.preventDefault();
            outputField.value += key;
            break;
        case 'Enter':
        case 'Return':
            event.preventDefault();
            evaluate();
            break;
        default:
            break;
    }
});

copyButton.addEventListener("click", function () {
    copyDisplayContentToClipboard();
});

function copyDisplayContentToClipboard() {
    var displayContent = outputField.value;
    navigator.clipboard.writeText(displayContent)
        .then(function () {
            if(displayContent.length === 0 ){
                alert("Nothing to copy");
            }
            else{
                alert("Content copied to clipboard: " + displayContent);    
            }
        })
        .catch(function (error) {
            console.error("Failed to copy: ", error);
        });
}