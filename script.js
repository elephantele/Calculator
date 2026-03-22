let display = document.getElementById("display");
let expression = "";
let degMode = true; // DEG by default

function updateDisplay() {
    display.textContent = expression || "0";
}

function press(value) {
    expression += value;
    updateDisplay();
}

function clearDisplay() {
    expression = "";
    updateDisplay();
}

function toggleSign() {
    if (!expression) return;
    try {
        expression = String(-eval(expression));
        updateDisplay();
    } catch {}
}

function percent() {
    if (!expression) return;
    try {
        expression = String(eval(expression) / 100);
        updateDisplay();
    } catch {}
}

function backspace() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

function pressParen() {
    let last = expression.slice(-1);

    // Smart parentheses
    if (/[0-9eπ)]/.test(last)) {
        expression += ")";
    } else {
        expression += "(";
    }

    updateDisplay();
}

function pressConst(type) {
    if (type === "pi") expression += "π";
    if (type === "e") expression += "e";
    updateDisplay();
}

function pressPower2() {
    expression += "^2";
    updateDisplay();
}

function pressFunc(name) {
    if (name === "sqrt") {
        expression += "√(";
    } else {
        expression += name + "(";
    }
    updateDisplay();
}

function toggleMode() {
    degMode = !degMode;
    document.querySelector("button[onclick='toggleMode()']").textContent =
        degMode ? "Mode: DEG" : "Mode: RAD";
}

function calculate() {
    if (!expression) return;

    try {
        let exp = expression;

        // Replace constants
        exp = exp.replace(/π/g, "Math.PI").replace(/e/g, "Math.E");

        // Replace √ with Math.sqrt
        exp = exp.replace(/√\(/g, "Math.sqrt(");

        // Replace x²
        exp = exp.replace(/(\d+(\.\d+)?)\^2/g, "Math.pow($1,2)");

        // log, ln
        exp = exp.replace(/log\(/g, "Math.log10(");
        exp = exp.replace(/ln\(/g, "Math.log(");

        // Trig functions with DEG/RAD
        exp = exp.replace(/sin\(([^)]+)\)/g, (_, a) =>
            degMode ? `Math.sin((${a})*Math.PI/180)` : `Math.sin(${a})`
        );
        exp = exp.replace(/cos\(([^)]+)\)/g, (_, a) =>
            degMode ? `Math.cos((${a})*Math.PI/180)` : `Math.cos(${a})`
        );
        exp = exp.replace(/tan\(([^)]+)\)/g, (_, a) =>
            degMode ? `Math.tan((${a})*Math.PI/180)` : `Math.tan(${a})`
        );

        expression = String(eval(exp));
        updateDisplay();
    } catch {
        display.textContent = "Error";
        expression = "";
    }
}
