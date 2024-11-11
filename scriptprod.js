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
        removeButton.className = 'btn btn-outline-danger btn-md';
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

function buyAllItems() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
    } else {
        openPaymentModal();
    }
}

buyAllBtn.addEventListener("click", buyAllItems);

const paymentModal = document.getElementById("paymentModal");
const closeModal = document.querySelector(".close");

function openPaymentModal() {
    paymentModal.style.display = "block";
}

function closePaymentModal() {
    paymentModal.style.display = "none";
}

closeModal.onclick = closePaymentModal;

window.onclick = function(event) {
    if (event.target === paymentModal) {
        closePaymentModal();
    }
}

document.getElementById("paymentForm").onsubmit = function(event) {
    event.preventDefault();

    const cardNumber = document.getElementById("cardNumber").value;
    const cardName = document.getElementById("cardName").value;
    const expiry = document.getElementById("expiry").value;
    const cvv = document.getElementById("cvv").value;

    if (validatePaymentInfo(cardNumber, cardName, expiry, cvv)) {
        alert("Payment successful! Thank you for your purchase.");
        closePaymentModal();
        
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }
};

function validatePaymentInfo(cardNumber, cardName, expiry, cvv) {
    const cardNumberRegex = /^\d{16}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRegex = /^\d{3}$/;

    if (!cardNumberRegex.test(cardNumber)) {
        alert("Please enter a valid 16-digit card number.");
        return false;
    }
    if (cardName.trim() === "") {
        alert("Please enter the name on the card.");
        return false;
    }
    if (!expiryRegex.test(expiry)) {
        alert("Please enter a valid expiry date (MM/YY).");
        return false;
    }
    if (!cvvRegex.test(cvv)) {
        alert("Please enter a valid 3-digit CVV.");
        return false;
    }
    return true;
}
