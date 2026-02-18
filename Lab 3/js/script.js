// Get all elements
const output = document.getElementById('output');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const decimalButton = document.getElementById('decimal');

// Calculator state
let firstNumber = '';
let secondNumber = '';
let operator = null;
let shouldResetOutput = false;
let lastOperator = null; // Track the last operator used

// Number button clicks
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        const number = button.getAttribute('data-number');
        
        if (shouldResetOutput) {
            output.value = number;
            shouldResetOutput = false;
        } else {
            output.value += number;
        }
        
        if (operator === null) {
            firstNumber = output.value;
        } else {
            secondNumber = output.value;
        }
    });
});

// Helper function to perform calculation
function performCalculation(num1, op, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    let result;
    
    switch(op) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num1 / num2;
            break;
    }
    return result;
}

// Operator button clicks
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const op = button.getAttribute('data-operator');
        
        // If we have a pending operation, calculate it first
        if (firstNumber && operator && output.value && !shouldResetOutput) {
            secondNumber = output.value;
            const result = performCalculation(firstNumber, operator, secondNumber);
            output.value = result;
            firstNumber = result;
            secondNumber = '';
        } else if (firstNumber && !shouldResetOutput) {
            firstNumber = output.value;
        }
        
        operator = op;
        lastOperator = op;
        shouldResetOutput = true;
        
        // Highlight the active operator
        operatorButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// Equals button
equalsButton.addEventListener('click', () => {
    if (firstNumber && operator && output.value) {
        secondNumber = output.value;
        const result = performCalculation(firstNumber, operator, secondNumber);
        output.value = result;
        firstNumber = result;
        secondNumber = '';
        operator = null;
        shouldResetOutput = true;
        
        // Remove highlight
        operatorButtons.forEach(btn => btn.classList.remove('active'));
    } else if (firstNumber && lastOperator && shouldResetOutput) {
        // Pressing equals again repeats the last operation
        const result = performCalculation(firstNumber, lastOperator, firstNumber);
        output.value = result;
        firstNumber = result;
        shouldResetOutput = true;
    }
});

// Clear button
clearButton.addEventListener('click', () => {
    output.value = '';
    firstNumber = '';
    secondNumber = '';
    operator = null;
    lastOperator = null;
    shouldResetOutput = false;
    
    operatorButtons.forEach(btn => btn.classList.remove('active'));
});

// Decimal button
decimalButton.addEventListener('click', () => {
    if (!output.value.includes('.')) {
        output.value += '.';
    }
});