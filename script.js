let display =  document.getElementById('display');
let expression = "";

function press(value) {
    if (expression === "0") expression = "";
    expression += value;
    display.textContent = expression;
}

function clearDisplay() {
    expression = "";
    display.textContent = "0";
}

function toggleSign() {
    if (expression) {
        expression = String(-parseFloat(expression));
        display.textContent = expression;
    }
}

function percent() {
    if (expression) {
        expression = String(parseFloat(expression) / 100);
        display.textContent = expression;
    }
}

function calculate() {
    try {
        expression = String(eval(expression));
        display.textContent = expression;
    } catch {
        display.textContent = "Error";
        expression = "";
    }
}