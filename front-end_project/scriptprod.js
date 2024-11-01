let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productName, price, quantity = 1) {
    const sound = document.getElementById("sound");
    sound.play();

    quantity = parseInt(quantity);
    if (quantity < 1) {
        alert("Quantity must be at least 1");
        return;
    }

    let product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity += quantity;
    } else {
        cart.push({ name: productName, price: price, quantity: quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(productName + " has been added to your cart!");
    displayCart();
}

function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function updateQuantity(productName, newQuantity) {
    newQuantity = parseInt(newQuantity);
    if (newQuantity < 1) {
        alert("Quantity must be at least 1");
        return;
    }

    let product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    displayCart();
}

function displayCart() {
    const cartItemsContainer = document.querySelector('.product-container-cart');
    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;

    cart.forEach(item => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        const productName = document.createElement('h3');
        productName.textContent = item.name;
        productName.classList.add('product-name');

        const productPrice = document.createElement('p');
        productPrice.textContent = `Price: ${item.price} T`;
        productPrice.classList.add('product-price');

        const quantityLabel = document.createElement('label');
        quantityLabel.textContent = 'Quantity:';

        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = item.quantity;
        quantityInput.min = 1;
        quantityInput.onchange = () => updateQuantity(item.name, quantityInput.value);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'btn btn-outline-danger btn-sm';
        removeButton.onclick = () => removeFromCart(item.name);

        productDiv.appendChild(productName);
        productDiv.appendChild(productPrice);
        productDiv.appendChild(quantityLabel);
        productDiv.appendChild(quantityInput);
        productDiv.appendChild(removeButton);

        cartItemsContainer.appendChild(productDiv);
        totalPrice += item.price * item.quantity;
    });

    cartItemsContainer.appendChild(createTotalDisplay(totalPrice));
}

function createTotalDisplay(totalPrice) {
    const shippingCost = 500;
    const finalPrice = totalPrice + shippingCost;

    const container = document.createElement('div');

    const totalDisplay = document.createElement('p');
    totalDisplay.textContent = `Total cost: ${totalPrice} T`;
    totalDisplay.classList.add('total-cost');

    const finalDisplay = document.createElement('p');
    finalDisplay.textContent = `Total cost with delivery: ${finalPrice} T (Delivery: ${shippingCost} T)`;
    finalDisplay.classList.add('total-cost');

    container.appendChild(totalDisplay);
    container.appendChild(finalDisplay);
    return container;
}

function filterProducts() {
    const categoryFilter = document.getElementById('category').value;
    const priceFilter = document.getElementById('price').value;

    localStorage.setItem('categoryFilter', categoryFilter);
    localStorage.setItem('priceFilter', priceFilter);

    const products = document.querySelectorAll('.card');

    products.forEach(product => {
        const category = product.getAttribute('data-category');
        const price = parseInt(product.getAttribute('data-price'));

        let categoryMatch = (categoryFilter === 'all' || category === categoryFilter);

        let priceMatch = false;
        switch (priceFilter) {
            case 'all':
                priceMatch = true;
                break;
            case 'low':
                priceMatch = (price < 500);
                break;
            case 'medium':
                priceMatch = (price >= 500 && price <= 1500);
                break;
            case 'high':
                priceMatch = (price > 1500);
                break;
        }
        if (categoryMatch && priceMatch) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

function loadFilterSettings() {
    const categoryFilter = localStorage.getItem('categoryFilter') || 'all';
    const priceFilter = localStorage.getItem('priceFilter') || 'all';

    document.getElementById('category').value = categoryFilter;
    document.getElementById('price').value = priceFilter;

    filterProducts();
}

function initializePage() {
    const cartItemsContainer = document.querySelector('.product-container-cart');

    if (cartItemsContainer) {
        displayCart();
    }
    loadFilterSettings();
}
document.addEventListener('DOMContentLoaded', initializePage);
const buyAllBtn = document.getElementById("buyAllBtn");

let isCartEmpty = false;

function buyAllItems() {
    const productContainer = document.querySelector(".product-container-cart");

    if (isCartEmpty) {
        alert("Your cart is already empty.");
    } else {
        alert("Thank you for your purchase! All items in the cart have been bought.");

        productContainer.innerHTML = `
            <p>Total cost: 0 T</p>
            <p>Total cost with delivery: 500 T (Delivery: 500 T)</p>
            <p>Your cart is now empty.</p>
        `;

        productContainer.style.backgroundColor = "#301934";
        productContainer.style.padding = "20px";
        productContainer.style.borderRadius = "15px";

        isCartEmpty = true;
    }
}

buyAllBtn.addEventListener("click", buyAllItems);

