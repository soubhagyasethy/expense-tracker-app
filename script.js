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

// function displayExpenses(expenses) {
//   const expenseList = document.getElementById("expenseList");
//   expenseList.innerHTML = "";
//   expenses.forEach((expense, index) => {
//     const listItem = document.createElement("li");
//     listItem.textContent = `${expense.Amount} - ${expense.Description} - ${expense.Category}`;
//     listItem.style.color = "blue";
//     const deleteButton = document.createElement("button");
//     deleteButton.textContent = "Delete";
//     deleteButton.classList.add("btn", "btn-danger", "mx-2");
//     deleteButton.addEventListener("click", () => {
//       removeExpense(index);
//     });
//     listItem.appendChild(deleteButton);
//     const editButton = document.createElement("button");
//     editButton.textContent = "Edit";
//     editButton.classList.add("btn", "btn-primary");
//     editButton.addEventListener("click", () => {
//       editExpense(index);
//     });
//     listItem.appendChild(editButton);
//     expenseList.appendChild(listItem);
//   });
// }

function displayExpenses(expenses) {
  const expenseList = document.getElementById("expenseList");
  expenseList.innerHTML = ""; // Clear previous content

  expenses.forEach((expense, index) => {
    const row = document.createElement("tr");

    // Create table cells for each expense property
    const amountCell = document.createElement("td");
    amountCell.textContent = expense.Amount;
    row.appendChild(amountCell);

    const descriptionCell = document.createElement("td");
    descriptionCell.textContent = expense.Description;
    row.appendChild(descriptionCell);

    const categoryCell = document.createElement("td");
    categoryCell.textContent = expense.Category;
    row.appendChild(categoryCell);

    // Create buttons for actions
    const actionsCell = document.createElement("td");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("btn", "btn-danger", "me-2");
    deleteButton.addEventListener("click", () => {
      removeExpense(index);
    });
    actionsCell.appendChild(deleteButton);

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("btn", "btn-primary");
    editButton.addEventListener("click", () => {
      editExpense(index);
    });
    actionsCell.appendChild(editButton);

    row.appendChild(actionsCell);

    // Append the row to the table body
    expenseList.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const existingExpenses =
    JSON.parse(localStorage.getItem("ExpenseDetails")) || [];
  displayExpenses(existingExpenses);
});
