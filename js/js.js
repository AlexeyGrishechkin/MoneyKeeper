let startCounter = document.querySelector("#start");

let budgetValue = document.querySelector(".budget-value");
let dayBudgetValue = document.querySelector(".daybudget-value");
let levelValue = document.querySelector(".level-value");
let expensesValue = document.querySelector(".expenses-value");
let optionalExpensesValue = document.querySelector(".optionalexpenses-value");
let incomeValue = document.querySelector(".income-value");
let monthSavingsValue = document.querySelector(".monthsavings-value");
let yearSavingsValue = document.querySelector(".yearsavings-value");

// inputs
let expensesItem = document.querySelectorAll(".expenses-item");
let optExpensesItem = document.querySelectorAll(".optionalexpenses-item");
let incomeItem = document.querySelector("#income");

//buttons
let expensesBtn = document.querySelector(".expenses-item-btn");
let optionalExpensesBtn = document.querySelector(".optionalexpenses-btn");
let countBtn = document.querySelector(".count-budget-btn");

let checkBoxSavings = document.querySelector("#savings");
let sumValue = document.querySelector("#sum");
let percentValue = document.querySelector("#percent");

// date
let yearValue = document.querySelector(".year-value");
let monthValue = document.querySelector(".month-value");
let dayValue = document.querySelector(".day-value");

let money, time;

let appData = {
  budget: money,
  timeData: time,
  expenses: {},
  optionalExpenses: {},
  income: [],
  savings: savings,
};

startCounter.addEventListener("click", () => {
  money = +prompt("Ваш бюджет на месяц");
  time = prompt("Введите дату в формате YYYY-MM-DD", "2020-08-21");

  while (isNaN(money) || money == "" || money == null) {
    money = +prompt("Ваш бюджет на месяц");
  }

  appData.budget = money;
  appData.timeData = time;
  budgetValue.textContent = money.toFixed();
  yearValue.value = new Date(Date.parse(time)).getFullYear();
  monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
  dayValue.value = new Date(Date.parse(time)).getDate();
});

expensesBtn.addEventListener("click", () => {
  if (appData.budget == undefined) {
    alert("Нажмите 'Начать расчет'");
    return false;
  } else {
    let sum = 0;
    for (let i = 0; i < expensesItem.length; i++) {
      let a = expensesItem[i].value;
      let b = +expensesItem[++i].value;
      if (
        typeof a === "string" &&
        typeof a != null &&
        typeof b != null &&
        a != "" &&
        b != ""
      ) {
        appData.expenses[a] = b;
        sum += +b;
      } else {
        i = i - 1;
      }
    }
    expensesValue.textContent = sum;
  }
});

optionalExpensesBtn.addEventListener("click", () => {
  if (appData.budget == undefined) {
    alert("Нажмите 'Начать расчет'");
    return false;
  } else {
    for (let i = 0; i < optExpensesItem.length; i++) {
      let opt = optExpensesItem[i].value;
      appData.optionalExpenses[i] = opt;
      optionalExpensesValue.textContent += appData.optionalExpenses[i] + " ";
    }
  }
});

countBtn.addEventListener("click", () => {
  if (appData.budget != undefined) {
    let sumExpenses = 0;
    for (let key in appData.expenses) {
      sumExpenses += appData.expenses[key];
    }
    appData.moneyPerDay = ((appData.budget - sumExpenses) / 30).toFixed(1);
    dayBudgetValue.textContent = appData.moneyPerDay;

    if (money <= 10) {
      levelValue.textContent = "Низкий уровень достатка";
    } else if (money >= 10 && money <= 50) {
      levelValue.textContent = "Средний уровень достатка";
    } else if (money > 50) {
      levelValue.textContent = "Высокий уровень достатка";
    } else {
      levelValue.textContent = "Произошла ошибка";
    }
  } else {
    alert("Нажмите 'Начать расчет'");
    dayBudgetValue.textContent = "Произошла ошибка";
  }
});

incomeItem.addEventListener("input", () => {
  let items = incomeItem.value;
  appData.income = items.split(", ");
  incomeValue.textContent = appData.income;
});

checkBoxSavings.addEventListener("click", () => {
  if (appData.savings == true) {
    appData.savings = false;
  } else {
    appData.savings = true;
  }
});

sumValue.onkeypress = (e) => {
  if (e.keyCode >= 48 && e.keyCode <= 58) {
    sumValue.addEventListener("input", () => {
      if (appData.savings == true) {
        let sum = +sumValue.value;
        let percent = +percentValue.value;

        appData.monthIncome = (sum / 100 / 12) * percent;
        appData.yearIncome = (sum / 100) * percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
      }
    });
  } else {
    return false;
  }
};

percentValue.onkeypress = (e) => {
  if (e.keyCode >= 49 && e.keyCode <= 57) {
    percentValue.addEventListener("input", () => {
      if (appData.savings == true) {
        let sum = +sumValue.value;
        let percent = +percentValue.value;

        appData.monthIncome = (sum / 100 / 12) * percent;
        appData.yearIncome = (sum / 100) * percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
      }
    });
  } else {
    return false;
  }
};
