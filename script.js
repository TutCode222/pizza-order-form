document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("pizzaForm");
    const table = document.querySelector("table");

    // Track order data
    const orderData = {
        totalCustomers: 0,
        sizes: {
            Small: 0,
            Medium: 0,
            Large: 0,
            XLarge: 0
        },
        toppingsCount: {},
        specialInstructionsCount: 0
    };

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const pizzaSize = document.getElementById("pizzaSize").value;
        const deliveryInstructions = document.getElementById("delivery").value.trim();
        const toppingInputs = document.querySelectorAll("input[name='toppings']:checked");
        const toppings = Array.from(toppingInputs).map(input => input.value);
        const toppingsText = toppings.join(", ") || "None";

        // Update order data
        orderData.totalCustomers++;
        orderData.sizes[pizzaSize]++;
        if (deliveryInstructions !== "") {
            orderData.specialInstructionsCount++;
        }
        toppings.forEach(topping => {
            orderData.toppingsCount[topping] = (orderData.toppingsCount[topping] || 0) + 1;
        });


// Create and populate the row
const newRow = document.createElement("tr");
newRow.innerHTML = `
    <td>${firstName} ${lastName}</td>
    <td>${pizzaSize}</td>
    <td>${toppingsText}</td>
    <td>${deliveryInstructions || "None"}</td>
`;

// Insert row before the summary row
const summaryRow = table.rows[table.rows.length - 2];
summaryRow.parentNode.insertBefore(newRow, summaryRow);

        // Update summary
        updateSummaryRow();

        form.reset();
    });

    function updateSummaryRow() {
        const summaryCells = table.rows[table.rows.length - 1].cells;

        // Customer count
        summaryCells[0].innerHTML = `<strong>${orderData.totalCustomers}</strong>`;

        // Sizes count
        summaryCells[1].innerHTML = `<strong>S: ${orderData.sizes.Small}, M: ${orderData.sizes.Medium}, L: ${orderData.sizes.Large}, XL: ${orderData.sizes.XLarge}</strong>`;

        // Most ordered topping
        let mostOrdered = "None";
        let maxCount = 0;
        for (let [topping, count] of Object.entries(orderData.toppingsCount)) {
            if (count > maxCount) {
                mostOrdered = topping;
                maxCount = count;
            }
        }
        summaryCells[2].innerHTML = `<strong>${mostOrdered}</strong>`;

        // Special instructions count
        summaryCells[3].innerHTML = `<strong>${orderData.specialInstructionsCount}</strong>`;
    }
});