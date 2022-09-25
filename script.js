let firstOperand = "";
let secondOperand= "";
let currentOperation = null;
// A boolean variable to control if statement
let shouldResetScreen = false;


const lastScreen      = document.getElementById("lastScreen");
const currentScreen   = document.getElementById("currentScreen");
// querySelector targeting [data-] attribute
const numberButtons   = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalsButton    = document.getElementById("equalsBtn");
const clearButton     = document.getElementById("clearBtn");
const deleteButton    = document.getElementById("deleteBtn");
const pointButton     = document.getElementById("pointBtn");


equalsButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clear);
deleteButton.addEventListener("click", deleteNumber);
pointButton.addEventListener("click", appendPoint);

// Use forEach due to querySelector, node list is array like element
numberButtons.forEach((button) =>
  button.addEventListener("click", () => appendNumber(button.textContent))
)
// Alternative code
// numberButtons.forEach((button) =>
//   button.addEventListener("click", (e) => appendNumber(e.target.textContent))
// )

operatorButtons.forEach((button) =>
  button.addEventListener("click", () => setOperation(button.textContent))
)


// Logic after clicking number button
function appendNumber(number) {
  // Remove 0 before append number, avoid 0 in front of number clicked
  // shouldResetScreen = true to clear out current screen display after evaluate()
  if (currentScreen.textContent === "0" || shouldResetScreen) {
    resetScreen();
  }
  // Display number on current screen, += to display subsequent number
  currentScreen.textContent += number;
}

function resetScreen() {
  // Clear out current screen display
  currentScreen.textContent = "";
  // Set to false to allow evaluate()
  shouldResetScreen = false;
}

// Logic after clicking operator button
function setOperation(operator) {
  // If there's operator, run evaluate
  // Use in consecutive calculation without clicking equal button, example: 1+2+3+4
  if (currentOperation != null) evaluate()
  // Assign operand & operator into variable
  firstOperand = currentScreen.textContent;
  currentOperation = operator;
  // Display both variables to last screen
  lastScreen.textContent = `${firstOperand} ${currentOperation}`;
  // Remove display at current screen
  currentScreen.textContent = "";
  // Turn on
  shouldResetScreen = true;
}

// Logic after clicking equal button
function evaluate() {
  // Prevent error from evaluate without operand
  if (shouldResetScreen) return
  // This code will run also, but calculation stop when 2nd operand = 0
  // if (currentScreen.textContent === "0") return

  // Prevent error from evaluate without operator
  if (currentOperation === null) return
  if (currentOperation = "÷" && currentScreen.textContent === "0") {
    alert("Can't divide by 0");
    return;
  }
  // Assign operand into variable
  secondOperand = currentScreen.textContent;
  // Display evaluate result on current screen and round it
  currentScreen.textContent = roundResult(operate(currentOperation, firstOperand, secondOperand));
  // Display evaluate components on last screen
  lastScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand}`;
  // Reset operator
  currentOperation = null;
}

// Round evaluate result into 4 decimal point
function roundResult(number) {
  return Math.round(number * 10000) / 10000;
}

// Reset all to default setting
function clear() {
  currentScreen.textContent = "0";
  lastScreen.textContent = "";
  firstOperand = "";
  secondOperand= "";
  currentOperation = null;
}

// Remove last number from current screen
function deleteNumber() {
  currentScreen.textContent = currentScreen.textContent.slice(0, -1);
}

function appendPoint() {
  // Add 0 in front of decimal
  if (currentScreen.textContent === "") currentScreen.textContent = "0";
  // Avoid duplicate decimal exist
  if (currentScreen.textContent.includes(".")) return
  // Display decimal point on current screen
  currentScreen.textContent += ".";
  // Set to false to prevent resetScreen()
  shouldResetScreen = false;
}


// Math operator function

function add(a, b) {
return a + b;
}

function minus(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a , b) {
  // Convert string to number, otherwise math operator won't work
  a = Number(a)
  b = Number(b)  
  switch(operator) {
    case "+":
      return add(a, b);
      break;
    case "-":
      return minus(a, b);
      break;
    case "×":
      return multiply(a, b);
      break;
    case "÷":
      if (b === 0) return null;
      else return divide(a, b);
      break;
  }
}


// Keyboard support

window.addEventListener('keydown', handleKeyboardInput)

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
  if (e.key === '=' || e.key === 'Enter') evaluate()
  if (e.key === 'Escape') clear()
  if (e.key === 'Backspace') deleteNumber()
  if (e.key === '.') appendPoint()
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
    setOperation(convertOperator(e.key))
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === '/') return '÷'
  if (keyboardOperator === '*') return '×'
  if (keyboardOperator === '-') return '-'
  if (keyboardOperator === '+') return '+'
}

// Console log keyboard key

// window.addEventListener("keydown", keyPressed);

// function keyPressed(e) {
//   console.log(e.key);
// }