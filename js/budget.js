document.addEventListener('DOMContentLoaded', () => {

    const totalBudget = document.getElementById('totalBudget');
    const totalSpent = document.getElementById('totalSpent');
    const remainingBudget = document.getElementById('remainingBudget');
    const expensesList = document.getElementById('expenses');
    const addExpenseButton = document.getElementById('addExpense');
    
    const budgetInput = document.getElementById('budget');
    const expenseInput = document.getElementById('expense');
    const amountInput = document.getElementById('amount');
    
    
    let budgetData = {
        budget: 0,
        expenses: []
    };


    function renderBudgetSummary() {
        const totalExpenses = budgetData.expenses.reduce((sum, expense) => sum + expense.amount, 0);
        totalBudget.textContent = `$${budgetData.budget.toFixed(2)}`;
        totalSpent.textContent = `$${totalExpenses.toFixed(2)}`;
        remainingBudget.textContent = `$${(budgetData.budget - totalExpenses).toFixed(2)}`;
    }


    function renderExpensesList() {
        expensesList.innerHTML = '';
        budgetData.expenses.forEach((expense, index) => {
            const li = document.createElement('li');
            li.textContent = `${expense.category}: $${expense.amount.toFixed(2)}`;

       
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', () => removeExpense(index));

         
            li.appendChild(deleteButton);
            expensesList.appendChild(li);
        });
    }

 
    function addExpense(category, amount) {
        budgetData.expenses.push({ category, amount });
        renderExpensesList();
        renderBudgetSummary();
    }


    function removeExpense(index) {
        budgetData.expenses.splice(index, 1);
        renderExpensesList();
        renderBudgetSummary();
    }


    addExpenseButton.addEventListener('click', () => {
        const category = expenseInput.value.trim();
        const amount = parseFloat(amountInput.value.trim());

  
        if (!category || isNaN(amount) || amount <= 0) {
            alert('Por favor, ingresa una categoría y un monto válidos.');
            return;
        }

  
        addExpense(category, amount);
        expenseInput.value = '';
        amountInput.value = '';
    });

    budgetInput.addEventListener('input', () => {
        const budget = parseFloat(budgetInput.value.trim());
        if (!isNaN(budget) && budget > 0) {
            budgetData.budget = budget;
            renderBudgetSummary();
        }
    });
});