const storeName = "Tech Haven";
const storeLocation = "Metro Manila";
const storeCapacity = 230;

let products = [
    { name: "Laptop", price: 50000, quantity: 60 },
    { name: "Smartphone", price: 30000, quantity: 100 },
    { name: "Tablet", price: 20000, quantity: 70 }
];

function checkInventoryCapacity() {
    const totalProducts = products.reduce((acc, product) => acc + product.quantity, 0);
    console.log(`Store Name: ${storeName}`);
    console.log(`Store Location: ${storeLocation}`);
    console.log(`Total Number of Products: ${totalProducts}`);
    
    if (totalProducts > storeCapacity) {
        console.log("Warning: Store is at full capacity, cannot add new products.");
    } else {
        console.log(`Total Products: ${totalProducts}`);
    }
}

function restockProduct(productName, threshold) {
    products.forEach(product => {
        if (product.name === productName && product.quantity < threshold) {
            const restockQuantity = 20;
            const newTotalQuantity = product.quantity + restockQuantity;

            const currentTotalProducts = products.reduce((acc, prod) => acc + prod.quantity, 0);
            if (currentTotalProducts + restockQuantity > storeCapacity) {
                console.log("Cannot restock. Store is at full capacity.");
            } else {
                product.quantity = newTotalQuantity;
                console.log(`Automatically restocked ${restockQuantity} units of ${productName}.`);
                checkInventoryCapacity();
            }
        }
    });
}

function addProduct(productName, price, quantity) {
    const totalProducts = products.reduce((acc, product) => acc + product.quantity, 0);
    if (totalProducts + quantity > storeCapacity) {
        console.log("Cannot add product, store is at full capacity.");
        return;
    }

    let existingProduct = products.find(product => product.name === productName);
    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        products.push({ name: productName, price, quantity });
    }
    console.log(`${productName} added/updated in inventory.`);
    checkInventoryCapacity();
}

function removeProduct(productName, quantity) {
    const product = products.find(p => p.name === productName);
    if (product) {
        if (product.quantity >= quantity) {
            product.quantity -= quantity;
            console.log(`${quantity} ${productName}(s) removed from inventory.`);
        } else {
            console.log(`Not enough quantity to remove. Only ${product.quantity} available.`);
        }
    } else {
        console.log("Product not found.");
    }
    checkInventoryCapacity();
}

function getMostExpensiveProduct() {
    const mostExpensive = products.reduce((prev, current) => (prev.price > current.price) ? prev : current);
    console.log(`Most Expensive Product: ${mostExpensive.name}`);
    return mostExpensive;
}

function calculateTotalInventoryValue() {
    const totalValue = products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    console.log(`Total Inventory Value: ${totalValue}`);
    return totalValue;
}

function userInteraction() {
    const action = prompt("What would you like to do? (add/remove/mostExpensive/totalValue/restock/exit)");

    if (action === "add") {
        const productName = prompt("Enter product name:");
        const price = parseFloat(prompt("Enter product price:"));
        const quantity = parseInt(prompt("Enter product quantity:"));
        addProduct(productName, price, quantity);

    } else if (action === "remove") {
        const removeName = prompt("Enter product name:");
        const removeQuantity = parseInt(prompt("Enter quantity to remove:"));
        removeProduct(removeName, removeQuantity);

    } else if (action === "mostExpensive") {
        getMostExpensiveProduct();

    } else if (action === "totalValue") {
        calculateTotalInventoryValue();

    } else if (action === "restock") {
        const productName = prompt("Enter product name to restock:");
        const threshold = parseInt(prompt("Enter threshold for restocking:"));
        restockProduct(productName, threshold);

    } else if (action === "exit") {
        console.log("Exiting...");
        return;

    } else {
        console.log("Invalid action.");
    }

    userInteraction();
}

checkInventoryCapacity();
calculateTotalInventoryValue();
userInteraction();