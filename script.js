let operator = "";
let display = "";
let currentValue = "";
let previousValue = "";

document.addEventListener("DOMContentLoaded", function(){
    let clear = document.querySelector("#clear");
    let equal = document.querySelector(".equal");
    let decimal = document.querySelector(".decimal");

    let numbers = document.querySelectorAll(".number");
    let operators = document.querySelectorAll(".operator");
    let display = document.querySelector(".calculator-display");

    numbers.forEach((number) => number.addEventListener("click", function(e){
        handleNumber(e.target.textContent)
        display.textContent = currentValue;
    }))

    operators.forEach((op) => op.addEventListener("click", function(e){
        handleOperator(e.target.textContent)
        display.textContent = currentValue;
    }))

    clear.addEventListener("click", function(){
        currentValue = "";
        operator = "";
        display.textContent = currentValue;  
    })

    equal.addEventListener("click", function(){
        if (currentValue != "" && previousValue != ""){
           operate();
           display.textContent = "";
           if (previousValue.length <= 10){
             display.textContent = previousValue;
           }
           else {
            display.textContent = previousValue.slice(0,10) + "..."
           }
        }
    })

    decimal.addEventListener("click", function(){
        addDecimal();
    })

    percent.addEventListener("click", function(){
        addPercent();
        display.textContent = currentValue;
    })

    backspace.addEventListener("click", function(){
        deleteLast();
        display.textContent = 0;    
    })
})

function handleNumber(num){
    if (currentValue.length <=10){
        currentValue += num;
    }
}

function handleOperator(op){
    operator = op;
    previousValue = currentValue;
    currentValue = "";

}

function operate(){
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);

    if (operator === "+"){
        previousValue += currentValue;
    }
    else if (operator === "-"){
        previousValue -= currentValue;
    }
    else if (operator === "x"){
        previousValue *= currentValue;
    }
    else {
        previousValue /= currentValue;
    }
    
    previousValue = roundNumber(previousValue);
    previousValue = previousValue.toString();
    currentValue = previousValue.toString();
}

function roundNumber(num){
    return Math.round(num * 1000) / 1000;
}

function addDecimal(){
    if (!currentValue.includes(".")){
         currentValue += ".";

    }
}

function addPercent(){
    currentValue = currentValue / 100;
    return currentValue
}

function deleteLast(){
    currentValue = ""
}