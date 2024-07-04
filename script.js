document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expenseForm');
    const expenseTable = document.getElementById('expenseTable').getElementsByTagName('tbody')[0];

   
    loadFromStorage();

    expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);

        
        if (description.trim() !== '' && !isNaN(amount) && amount > 0) {
            const expense = { description, amount };
            saveToStorage(expense);

           
            expenseForm.reset();
        } else {
            alert('Por favor ingresa una descripción válida y un gasto mayor que cero.');
        }
    });

    
    function saveToStorage(expense) {
        let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));

       
        renderTable();
    }

    
    function loadFromStorage() {
        let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses.forEach(expense => {
            renderRow(expense);
        });
    }

    
    function renderTable() {
      
        expenseTable.innerHTML = '';
        loadFromStorage();
    }

 
    function renderRow(expense) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.description}</td>
            <td>$${expense.amount.toFixed(2)}</td>
            <td class="button-container">
                <button class="delete-button" onclick="deleteRow(this)">Eliminar</button>
            </td>
        `;
        expenseTable.appendChild(row);
        
    }

   
    function deleteRow(button) {
        const row = button.closest('tr');
        const description = row.querySelector('td:first-child').innerText;
        const amount = parseFloat(row.querySelector('td:nth-child(2)').innerText.replace('$', ''));

        if (confirm(`¿Estás seguro de eliminar el gasto "${description}" de $${amount.toFixed(2)}?`)) {
            let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

          
            expenses = expenses.filter(expense => !(expense.description === description && expense.amount === amount));
            localStorage.setItem('expenses', JSON.stringify(expenses));

       
            row.remove();
        }
    }
});
  var tot= 44+3;
  alert(tot);

  function dele(){
    var tab=document.getElementById("expenseTable");
    while(tab.firstChild){
        tab.removeChild(tab.firstChild)
    }
    localStorage.removeItem('expenses')
  }