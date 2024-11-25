// Initial Data
let tableEntries = [
    { type: 1, name: "income", amount: 25000, date: "11-01-2024" },
    { type: 0, name: "rent", amount: 18000, date: "11-10-2024" },
    { type: 0, name: "food", amount: 5000, date: "11-15-2024" },
];

// Function to update data expense summary
function updateSummary() {
    let totalIncome = tableEntries.reduce((t, e) => {
        if (e.type === 1) t += e.amount;
        return t;
    }, 0);
    let totalExpense = tableEntries.reduce((ex, e) => {
        if (e.type === 0) ex += e.amount;
        return ex;
    }, 0);
    updatedInc.innerText = totalIncome;
    updatedExp.innerText = totalExpense;
    updatedBal.innerText = totalIncome - totalExpense;
}

// Function to format date as MM-DD-YYYY
function formatDate(dateStr) {
    let date = new Date(dateStr);
    let mm = String(date.getMonth() + 1).padStart(2, "0");
    let dd = String(date.getDate()).padStart(2, "0");
    let yyyy = date.getFullYear();
    return `${mm}-${dd}-${yyyy}`;
}

// Function to add new entry to the dataset and expense table
function addItem() {
    let type = itemType.value;
    let name = document.getElementById("name");
    let amount = document.getElementById("amount");
    let date = document.getElementById("date");

    // Input validation
    if (name.value === "" || Number(amount.value) === 0 || date.value === "")
        return alert("All fields are required.");
    if (Number(amount.value) <= 0)
        return alert("Amount must be positive.");

    // Push new data
    tableEntries.push({
        type: Number(type),
        name: name.value,
        amount: Number(amount.value),
        date: date.value,
    });

    updateTable();
    name.value = "";
    amount.value = 0;
    date.value = "";
}

// Function to load all entries in the expense table
function loadItems(e, i) {
    let cls;

    let table = document.getElementById("table");
    let row = table.insertRow(i + 1);
    let cell0 = row.insertCell(0);
    let cell1 = row.insertCell(1);
    let cell2 = row.insertCell(2);
    let c3 = row.insertCell(3);
    let c4 = row.insertCell(4);
    let c5 = row.insertCell(5);

    cell0.innerHTML = i + 1;
    cell1.innerHTML = e.name;
    cell2.innerHTML = e.amount;
    c5.innerHTML = "&#9746;";
    c5.classList.add("zoom");
    c5.addEventListener("click", () => del(e));
    c4.innerHTML = formatDate(e.date);

    if (e.type == 0) {
        cls = "red";
        c3.innerHTML = "&#10138;";
    } else {
        cls = "green";
        c3.innerHTML = "&#10136;";
    }
    c3.style.color = cls;
}

// Clear the table before updation
function remove() {
    while (table.rows.length > 1) table.deleteRow(-1);
}

// Function to delete a specific entry
function del(el) {
    remove();
    tableEntries = tableEntries.filter((e) => e.name !== el.name);
    tableEntries.map((e, i) => loadItems(e, i));
    updateSummary();
}

// To render all entries
function updateTable() {
    remove();
    tableEntries.map((e, i) => {
        loadItems(e, i);
    });
    updateSummary();
}

updateTable();
