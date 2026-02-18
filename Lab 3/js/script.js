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

// Operator button clicks
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const op = button.getAttribute('data-operator');
        
        if (firstNumber && !shouldResetOutput) {
            firstNumber = output.value;
        }
        
        operator = op;
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
        let result;
        
        firstNumber = parseFloat(firstNumber);
        secondNumber = parseFloat(secondNumber);
        
        switch(operator) {
            case '+':
                result = firstNumber + secondNumber;
                break;
            case '-':
                result = firstNumber - secondNumber;
                break;
            case '*':
                result = firstNumber * secondNumber;
                break;
            case '/':
                result = firstNumber / secondNumber;
                break;
        }
        
        output.value = result;
        firstNumber = result;
        secondNumber = '';
        operator = null;
        shouldResetOutput = true;
        
        // Remove highlight
        operatorButtons.forEach(btn => btn.classList.remove('active'));
    }
});

// Clear button
clearButton.addEventListener('click', () => {
    output.value = '';
    firstNumber = '';
    secondNumber = '';
    operator = null;
    shouldResetOutput = false;
    
    operatorButtons.forEach(btn => btn.classList.remove('active'));
});

// Decimal button
decimalButton.addEventListener('click', () => {
    if (!output.value.includes('.')) {
        output.value += '.';
    }
});