// Load existing expenses from local storage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Function to render expenses
function renderExpenses() {
  const expenseList = document.getElementById("expenseList");
  expenseList.innerHTML = "";

  expenses.forEach((expense, index) => {
    const row = document.createElement("div");
    row.classList.add("row", "mt-2");

    const amountCol = document.createElement("div");
    amountCol.classList.add("col");
    amountCol.textContent = expense.amount.toFixed(2);

    const descriptionCol = document.createElement("div");
    descriptionCol.classList.add("col");
    descriptionCol.textContent = expense.description;

    const categoryCol = document.createElement("div");
    categoryCol.classList.add("col");
    categoryCol.textContent = expense.category;

    const actionsCol = document.createElement("div");
    actionsCol.classList.add("col");

    const editButton = document.createElement("button");
    editButton.classList.add("btn", "btn-primary", "me-2");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
      editExpense(index);
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      deleteExpense(index);
    });

    actionsCol.appendChild(editButton);
    actionsCol.appendChild(deleteButton);

    row.appendChild(amountCol);
    row.appendChild(descriptionCol);
    row.appendChild(categoryCol);
    row.appendChild(actionsCol);

    expenseList.appendChild(row);
  });
}

// Function to delete an expense
function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
  updateTotalExpenses();
}

// Function to edit an expense
function editExpense(index) {
  const expense = expenses[index];
  document.getElementById("expenseAmount").value = expense.amount;
  document.getElementById("expenseDescription").value = expense.description;
  document.getElementById("expenseCategory").value = expense.category;

  deleteExpense(index);
}

// Add expense button click event
document.getElementById("addExpense").addEventListener("click", function () {
  const amount = parseFloat(
    document.getElementById("expenseAmount").value.trim()
  );
  const description = document
    .getElementById("expenseDescription")
    .value.trim();
  const category = document.getElementById("expenseCategory").value;

  if (isNaN(amount) || amount <= 0 || description === "") {
    alert("Please enter a valid description and amount.");
    return;
  }

  // Add expense to the expenses array
  expenses.push({ amount, description, category });

  // Update local storage
  localStorage.setItem("expenses", JSON.stringify(expenses));

  // Render expenses
  renderExpenses();

  // Update total expenses
  updateTotalExpenses();

  // Reset input fields
  document.getElementById("expenseAmount").value = "";
  document.getElementById("expenseDescription").value = "";
});

// Update total expenses
function updateTotalExpenses() {
  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );
  document.getElementById("totalExpenses").textContent =
    totalExpenses.toFixed(2);
}

// Initial rendering of expenses
renderExpenses();

// Initial update of total expenses
updateTotalExpenses();
