'use strict';
//@ts-check
let btnStart = document.querySelector('.open #start');
let btnExpenses = document.querySelector('.data .expenses-item-btn');
let btnExpensesOptional = document.querySelector('.data .optionalexpenses-btn');
let btnBudgetCount = document.querySelector('.data .count-budget-btn');
//right input
let budgetValue = document.querySelector('.result .result-table .budget-value');
let dayBudgetValue = document.querySelector('.result .result-table .daybudget-value');
let levelValue = document.querySelector('.result .result-table .level-value');
let expensesValue= document.querySelector('.result .result-table .expenses-value');
let optionalExpensesValue = document.querySelector('.result .result-table .optionalexpenses-value');
let incomeValue = document.querySelector('.result .result-table .income-value');
let monthSavingsValue = document.querySelector('.result .result-table .monthsavings-value');
let yearSavingsValue = document.querySelector('.result .result-table .yearsavings-value');
let yearValue = document.querySelector('.time-data .year .year-value');
let monthValue = document.querySelector('.time-data .month .month-value')
let dayValue = document.querySelector('.time-data .day .day-value');
//left input
let expensesInput = document.querySelectorAll('.data .expenses-item');
let optionalExpensesInput = document.querySelectorAll('.data .optionalexpenses-item');
let chooseIncomeInput= document.querySelector('.data .choose-income');
let savingsCheckbox = document.querySelector('.checksavings #savings');
let chooseSumInput = document.querySelector('.data .choose-sum');
let choosePercentInput = document.querySelector('.data .choose-percent');
let money, time;
btnStart.addEventListener("click", function() {
    time = prompt ("Введите дату в формате YYYY-MM-DD", "");
    money = +prompt ("Ваш бюджет на месяц?", "");
    while (isNaN(money) || money == "" || money == null) {
        money = +prompt ("Ваш бюджет на месяц?", ""); 
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    time = new Date(time);
    yearValue.value = time.getFullYear();
    monthValue.value = time.getMonth() + 1;
    dayValue.value = time.getDate();
});
btnExpenses.addEventListener('click', function(){
    let sum = 0;
    for (let i = 0; i < expensesInput.length / 2; i++) {
        let a = expensesInput[2 * i].value,
            b = +expensesInput[2 * i + 1].value;
        if ( typeof(a)==='string' && typeof(a) != null && typeof(b) != null && a != "" && b != "" && a.length < 50) {
            appData.expenses[a] = b;

            sum += b;
        } else {
            i--;
        }

    }
        expensesValue.textContent = sum;
});
btnExpensesOptional.addEventListener('click', function(){
    optionalExpensesInput.forEach((current, i) => {
        appData.optionalExpenses[i] = current.value
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' '
    });
});
btnBudgetCount.addEventListener('click', function(){
    if(appData.budget != undefined) {
        appData.moneyPerDay = +((appData.budget / 30).toFixed());
        dayBudgetValue.textContent = appData.moneyPerDay;

        if (appData.moneyPerDay < 100) {
            levelValue.textContent = "Это минимальный уровень достатка!";
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
           levelValue.textContent = "Это средний уровень достатка!";
        } else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = "Это высокий уровень достатка!";
        } else {
            levelValue.textContent = "Ошибочка...!";
        }
    } else {
        dayBudgetValue.textContent = 'ошибка, необходимо нажать на "начать расчет"';
    }
});
chooseIncomeInput.addEventListener('change', function(){
    appData.income.push(chooseIncomeInput.value);
    incomeValue.textContent +=  appData.income[appData.income.length - 1] + ','
    chooseIncomeInput.value = '';
    console.log( appData.income);
});
savingsCheckbox.addEventListener('click', function(){
    appData.savings = (appData.savings === true) ? false : true;
    if(appData.savings === false) {
        chooseSumInput.value = '';
        choosePercentInput.value = '';
    }
});
chooseSumInput.addEventListener('input', function(){
    if(appData.savings === true) {
        let sum = +chooseSumInput.value,
            percent = +choosePercentInput.value;

            appData.monthIncome = sum/100/12*percent;
            appData.yearIncome = sum/100*percent;

            monthSavingsValue.textContent =  appData.monthIncome.toFixed(1);
            yearSavingsValue.textContent =  appData.yearIncome.toFixed(1);
    }
});
choosePercentInput.addEventListener('input', function(){
    if(appData.savings === true) {
        let sum = +chooseSumInput.value,
            percent = +choosePercentInput.value;

            appData.monthIncome = sum/100/12*percent;
            appData.yearIncome = sum/100*percent;

            monthSavingsValue.textContent =  appData.monthIncome.toFixed(1);
            yearSavingsValue.textContent =  appData.yearIncome.toFixed(1);
    }
});
let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
};

for (let key in appData) {
    console.log("Наша программа включает в себя данные: " + key + " - " + appData[key]);
}



