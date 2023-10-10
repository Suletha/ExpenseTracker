// Function to add an expense
function addExpense() {
    const expenseAmount = parseFloat(document.getElementById("amount").value);
    const expenseDescription = document.getElementById("description").value;
    const expenseCategory = document.getElementById("exp_cat").value;

    if (!isNaN(expenseAmount) && expenseDescription && expenseCategory) {
        // Create a new expense object
        const expense = { amount: expenseAmount, description: expenseDescription, category: expenseCategory };

        // Retrieve existing expenses from localStorage or create an empty array
        const existingExpenses = JSON.parse(localStorage.getItem("expenses")) || [];

        // Add the new expense to the array
        existingExpenses.push(expense);

        // Store the updated array back in localStorage
        localStorage.setItem("expenses", JSON.stringify(existingExpenses));

        // Display the updated expense list
        displayExpenses();

        // Clear input fields
        document.getElementById("amount").value = "";
        document.getElementById("description").value = "";
    } else {
        alert("Please enter a valid expense amount, description, and category.");
    }
}

// Function to display expenses from localStorage
function displayExpenses() {
    const expensesList = document.getElementById("expenses");
    expensesList.innerHTML = ""; // Clear the existing list

    // Retrieve expenses from localStorage
    const existingExpenses = JSON.parse(localStorage.getItem("expenses")) || [];

    // Iterate through expenses and display them
    existingExpenses.forEach((expense, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>${expense.description}: $${expense.amount.toFixed(2)} (${expense.category})</span>
            <button onclick="editExpense(${index})">Edit Expense</button>
            <button onclick="deleteExpense(${index})">Delete Expense</button>
        `;
        expensesList.appendChild(listItem);
    });
}

// Function to edit an expense
function editExpense(index) {
    const existingExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const newExpenseDescription = prompt("Edit expense description:", existingExpenses[index].description);

    if (newExpenseDescription !== null) {
        existingExpenses[index].description = newExpenseDescription;

        // Update the expenses in localStorage
        localStorage.setItem("expenses", JSON.stringify(existingExpenses));

        // Redisplay the updated expense list
        displayExpenses();
    }
}

// Function to delete an expense
function deleteExpense(index) {
    if (confirm("Are you sure you want to delete this expense?")) {
        const existingExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
        existingExpenses.splice(index, 1);

        // Update the expenses in localStorage
        localStorage.setItem("expenses", JSON.stringify(existingExpenses));

        // Redisplay the updated expense list
        displayExpenses();
    }
}

// Initial display of expenses
displayExpenses();
