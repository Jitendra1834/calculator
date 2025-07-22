const display = document.getElementById('display');
const historyDisplay = document.getElementById('history');
let calculationHistory = [];

// Append input to display
function appendToDisplay(value) {
    display.value += value;
}

// Clear display
function clearDisplay() {
    display.value = '';
}

// Backspace function
function backspace() {
    display.value = display.value.slice(0, -1);
}

// Percentage function
function percentage() {
    try {
        display.value = eval(display.value) / 100;
    } catch (error) {
        display.value = 'Error';
    }
}

// Main calculation function
function calculate() {
    try {
        const expression = display.value.replace(/×/g, '*').replace(/÷/g, '/');
        const result = eval(expression);
        
        // Add to history
        calculationHistory.push(`${display.value} = ${result}`);
        updateHistory();
        
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}

// Update history display
function updateHistory() {
    historyDisplay.innerHTML = calculationHistory.join('<br>');
}

// Clear history
function clearHistory() {
    calculationHistory = [];
    historyDisplay.innerHTML = '';
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (/[0-9+\-*/.%=]/.test(e.key)) {
        appendToDisplay(e.key);
    } else if (e.key === 'Enter') {
        calculate();
    } else if (e.key === 'Escape') {
        clearDisplay();
    } else if (e.key === 'Backspace') {
        backspace();
    }
});