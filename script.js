document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("pizzaForm");
    const table = document.querySelector("table");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form from submitting and reloading page

        // Get form values
        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const pizzaSize = document.getElementById("pizzaSize").value;
        const deliveryInstructions = document.getElementById("delivery").value.trim();

        // Get checked toppings
        const toppingInputs = document.querySelectorAll("input[name='toppings']:checked");
        const toppings = Array.from(toppingInputs).map(input => input.value).join(", ");

        // Create new table row and cells
        const newRow = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = `${firstName} ${lastName}`;

        const sizeCell = document.createElement("td");
        sizeCell.textContent = pizzaSize;

        const toppingsCell = document.createElement("td");
        toppingsCell.textContent = toppings || "None";

        const deliveryCell = document.createElement("td");
        deliveryCell.textContent = deliveryInstructions || "None";

        // Append cells to row
        newRow.appendChild(nameCell);
        newRow.appendChild(sizeCell);
        newRow.appendChild(toppingsCell);
        newRow.appendChild(deliveryCell);

        // Insert row before the summary row (second last row)
        const summaryRow = table.rows[table.rows.length - 2];
        table.insertBefore(newRow, summaryRow);

        // Optionally, reset the form
        form.reset();
    });
});