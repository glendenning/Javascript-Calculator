
const numbers = Array.from(document.querySelectorAll('.number'));
const operators = Array.from(document.querySelectorAll('.operation'));
const equals = document.querySelector('.equals');
const acButton = document.getElementById('acButton');
const ceButton = document.getElementById('ceButton');
const outputArea = document.querySelector('#outputArea h1');
const recentArea = document.querySelector('#outputArea p');

var currentNumber = [];
var total = 0;
var lastOperator;
var lastNumber;

function updateTotal (lastOperator, lastNumber) {
    switch (lastOperator) {
        case '/':
            total /= lastNumber;
            break;
        case 'x':
            total *= lastNumber;
            break;
        case '+':
            total += lastNumber;
            break;
        case '-':
            total -= lastNumber;
            break;
    }
    console.log('total is now: ' + total);
}

function AC() {
    recentArea.innerHTML = 0;
    outputArea.innerHTML = 0;
    currentNumber = [];
    total = 0;
}

function CE() {
    currentNumber = [];
    outputArea.innerHTML = 0;
}


numbers.map(number => {
    number.onclick = function() {
        if (recentArea.innerHTML.includes("=")) {
            AC();
        }
        if (currentNumber.includes('.') && number.innerHTML === '.') {
            //so if they press '.' but there is already a '.', do nothing
        } else {
            currentNumber.push(number.innerHTML);
            outputArea.innerHTML = currentNumber.join('');
        }
    };
});

operators.map(operator => {
    operator.onclick = function() {

        // make the output area display the operator pressed
        outputArea.innerHTML = operator.innerHTML;

        // if an operator is pressed after = is used, continue
        // calculating with the ouptut as the starting total
        if (recentArea.innerHTML.includes("=")) {
            whatTheTotalWas = total;
            AC();
            total = whatTheTotalWas;
            recentArea.innerHTML = total;
        }

        // for the first time, the total becomes the number that was typed
        if (recentArea.innerHTML == "0") {
            recentArea.innerHTML = currentNumber.join('') + operator.innerHTML;
            total = parseFloat(currentNumber.join(''));

        // otherwise if the last character in the recent Area was an operator
        // } else if (recentArea.innerHTML.slice(-1) === "+" || "-" || "x" || "/") {
        //     // replace the operator with the operator pressed
        //     recentArea.innerHTML = recentArea.innerHTML.substring(0, recentArea.innerHTML.length-1) + operator.innerHTML;
        
        } else {
            // update the toal
            lastOperator = recentArea.innerHTML.slice(-1);
            lastNumber = parseFloat(currentNumber.join(''));
            updateTotal(lastOperator, lastNumber);

            // display the recent numbers and operations in the recent area
            recentArea.innerHTML += currentNumber.join('') + operator.innerHTML;
        }

        // reset the current number
        currentNumber = [];

    }

});

equals.onclick = function () {

    // don't do anything if there wasn't a current number
    console.log(currentNumber);
    if (currentNumber[0] === undefined) {
        return;
    }
    // if a number was typed and nothing else, the total is just the number typed


    //Update the total for the last number pressed
    lastOperator = recentArea.innerHTML.slice(-1);
    lastNumber = parseFloat(currentNumber.join('')); 
    updateTotal(lastOperator, lastNumber); 

    // Display the total
    recentArea.innerHTML += lastNumber + "=" + total;
    outputArea.innerHTML = total;

}
acButton.onclick = function () {
    AC();
}
ceButton.onclick = function () {
    CE();
}