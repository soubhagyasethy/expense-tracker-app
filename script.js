function handleFormSubmit(event) {
  event.preventDefault();

  // Get form input values
  const amountInput = document.getElementById("amountInput").value;
  const descriptionInput = document.getElementById("descriptionInput").value;
  const categorySelect = document.getElementById("categorySelect").value;

  // Create expense object
  const expenseDetails = {
    Amount: amountInput,
    Description: descriptionInput,
    Category: categorySelect,
  };

  // Retrieve existing expense details from local storage or initialize empty array
  let expenseDetailsArray =
    JSON.parse(localStorage.getItem("ExpenseDetails")) || [];

  // Add new expense details to array
  expenseDetailsArray.push(expenseDetails);

  // Convert array to JSON string and store in local storage
  localStorage.setItem("ExpenseDetails", JSON.stringify(expenseDetailsArray));

  // Clear form fields
  document.getElementById("amountInput").value = "";
  document.getElementById("descriptionInput").value = "";
  document.getElementById("categorySelect").value = "";

  // Update displayed expense list
  displayExpenses(expenseDetailsArray);
}

function removeExpense(index) {
  let expenseDetailsArray =
    JSON.parse(localStorage.getItem("ExpenseDetails")) || [];
  expenseDetailsArray.splice(index, 1);
  localStorage.setItem("ExpenseDetails", JSON.stringify(expenseDetailsArray));
  displayExpenses(expenseDetailsArray);
}

function editExpense(index) {
  let expenseDetailsArray =
    JSON.parse(localStorage.getItem("ExpenseDetails")) || [];
  const expense = expenseDetailsArray[index];
  document.getElementById("amountInput").value = expense.Amount;
  document.getElementById("descriptionInput").value = expense.Description;
  document.getElementById("categorySelect").value = expense.Category;
  removeExpense(index);
}

function displayExpenses(expenses) {
  const expenseList = document.getElementById("expenseList");
  expenseList.innerHTML = "";
  expenses.forEach((expense, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${expense.Amount} - ${expense.Description} - ${expense.Category}`;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      removeExpense(index);
    });
    listItem.appendChild(deleteButton);
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
      editExpense(index);
    });
    listItem.appendChild(editButton);
    expenseList.appendChild(listItem);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const existingExpenses =
    JSON.parse(localStorage.getItem("ExpenseDetails")) || [];
  displayExpenses(existingExpenses);
});
