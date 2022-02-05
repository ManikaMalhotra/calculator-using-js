const entireStringElement = document.querySelector('.string-so-far');
const currentInputElement = document.querySelector('.current-input');
const tempResultElement = document.querySelector('.temp-result');
const numbersElement = document.querySelectorAll('.number');
const operationsElement = document.querySelectorAll('.operation');
const equalElement = document.querySelector('.equal');
const resetToDefault = document.querySelector('.clear');
const clearLastElement = document.querySelector('.clear-last');

let entireString = '';
let currentInput = '';
let result = null;
let lastOperation = '';
let hasDecimal = false;

numbersElement.forEach(number => {
    number.addEventListener('click', (e) => {
        // adding decimal point
        if ((e.target.innerText === '.') && !hasDecimal) {
            hasDecimal = true;
        }
        // if we have a decimal before, we need not add another decimal to the number
        else if ((e.target.innerText === '.') && hasDecimal) {
            return;
        }
        // appending next input digit and managing display
        currentInput += e.target.innerText;
        currentInputElement.innerText = currentInput;
    });
})

operationsElement.forEach(operation => {
    operation.addEventListener('click', (e) => {
        // we need a number first to perform an operation, we don't want to unnecessarily add operations to the display
        if (!currentInput) {
            return;
        }

        // we might have used a decimal in the previous number, so the boolean is now true, and therefore we need to resest it before we move on to the next number
        hasDecimal = false;
        const currentOperation = e.target.innerText;

        // checking the 3 displays before performing mathematical operation
        if (entireString && currentInput && lastOperation) {
            mathematicalOperations();
        }
        // displaying temporary result
        else {
            result = parseFloat(currentInput);
        }
        // clearing currentInput and moving elements from currentInput to entireString and updating last operation
        clearCurrent(currentOperation);
        lastOperation = currentOperation;
        // console.log(result);
    })
})

function clearCurrent (currentOperation = '') {
    // managing display
    entireString += currentInput + ' ' + currentOperation + ' ';
    entireStringElement.innerText = entireString;
    
    // clearing current
    currentInputElement.innerText = '';
    currentInput = '';

    tempResultElement.innerText = result;
}

function mathematicalOperations() {
    // Multiplying
    if (lastOperation === 'x') {
        result = parseFloat(result) * parseFloat(currentInput);
    }

    // Adding
    else if (lastOperation === '+') {
        result = parseFloat(result) + parseFloat(currentInput);
    }

    // Subtracting
    else if (lastOperation === '-') {
        result = parseFloat(result) - parseFloat(currentInput);
    }

    // Division
    else if (lastOperation === '/') {
        result = parseFloat(result) / parseFloat(currentInput);
    }

    // Modulo
    else if (lastOperation === '%') {
        result = parseFloat(result) % parseFloat(currentInput);
    }
}

equalElement.addEventListener('click', (e) => {
    // we need to have inputs (at least two) for the equal-to operation to work
    if (!currentInput || !entireString) {
        return;
    }

    hasDecimal = false;

    // completing the mathermatical operation first
    mathematicalOperations();
    clearCurrent();

    currentInputElement.innerText = result;

    // clearing temporary result
    tempResultElement.innerText = '';

    currentInput = result;
    entireString = '';
});

resetToDefault.addEventListener('click', (e) => {
    entireStringElement.innerText = '0';
    currentInputElement.innerText = '0';
    tempResultElement.innerText = '0';

    entireString = '';
    currentInput = '';
    result = null;    
});

clearLastElement.addEventListener('click', (e) => {
    currentInputElement.innerText = '';
    currentInput = '';
});

// adding event listener to the keyboard
window.addEventListener('keydown', (e) => {
    // 0 - 9 numbers, decimal point and mathematical operations
    if(e.key === '0' || e.key === '1' || e.key === '2' || e.key === '3'
    || e.key === '4' || e.key === '5' || e.key === '6' || e.key === '7'
    || e.key === '8' || e.key === '9' || e.key === '.' || e.key === '+'
    || e.key === '-' || e.key === 'x' || e.key === '/' || e.key === '%') {
        clickButton(e.key);
    }
    else if (e.key === 'Enter' || e.key === '=') {
        equalElement.click();
    }
    else if (e.key === 'Backspace') {
        clearLastElement.click();
    }
});

function clickButton (key) {
    // loop through each of the number and operations and check if the key pressed is equal to the innerText of the element
    numbersElement.forEach(button => {
        if (button.innerText === key) {
            button.click();
        }
    });

    operationsElement.forEach(button => {
        if (button.innerText === key) {
            button.click();
        }
    });
}