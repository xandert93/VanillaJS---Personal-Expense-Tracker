const balance = document.getElementById("balance"),
  incomeText = document.getElementById("money-plus"),
  expenseText = document.getElementById("money-minus"),
  list = document.getElementById("list"),
  form = document.getElementById("form"),
  transactionInput = document.getElementById("transaction"),
  amountInput = document.getElementById("amount");

// const dummyTransactions = [
//   { id: 1, description: "Flower", amount: -20 },
//   { id: 2, description: "Salary", amount: 300 },
//   { id: 3, description: "Book", amount: -10 },
//   { id: 4, description: "Camera", amount: 150 },
// ];

const LSTransactions = JSON.parse(localStorage.getItem("transactions"));

let transactions =
  localStorage.getItem("transactions") !== null ? LSTransactions : [];

function addTransaction(e) {
  e.preventDefault();
  if (transactionInput.value.trim() === "" || amountInput.value.trim() === "") {
    alert("Pleaase detail your transaction");
  } else {
    const transaction = {
      id: Math.floor(Math.random() * 100000000),
      description: transactionInput.value,
      amount: +amountInput.value,
    };
    transactionInput.value = "";
    amountInput.value = "";
    transactions.push(transaction);
    addTransactionToDOM(transaction);
    updateValues();
    updateLocalStorage();
  }
}

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

//Add transactions to DOM list
function addTransactionToDOM(transaction) {
  const sign = transaction.amount < 0 ? `-` : `+`;
  const item = document.createElement("li");
  item.classList.add(transaction.amount < 0 ? `minus` : `plus`);
  item.innerHTML = `${transaction.description} <span>£${sign}${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>`;

  list.appendChild(item);
}

function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acca, amount) => acca + amount, 0).toFixed(2);

  const income = amounts
    .filter((amount) => amount > 0)
    .reduce((acca, incomeAmount) => acca + incomeAmount, 0)
    .toFixed(2);

  const expense = amounts
    .filter((amount) => amount < 0)
    .reduce((acca, expenseAmount) => acca + expenseAmount, 0)
    .toFixed(2);

  balance.innerText = `£${total}`;
  incomeText.innerText = `£${income}`;
  expenseText.innerText = `£${expense}`;
}

//Init app
function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionToDOM);
  updateValues();
}

function setBorderColor(e) {
  function getBorderColor() {
    return amountInput.value === ""
      ? undefined
      : amountInput.value[0] !== "-"
      ? "plus"
      : "minus";
  }

  amountInput.className = getBorderColor();
}

function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  init();
}

init();
