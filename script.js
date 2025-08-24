let cart = [];

function updateCartDisplay() {
  const cartDiv = document.getElementById('cartItems');
  cartDiv.innerHTML = '';

  if (cart.length === 0) {
    cartDiv.innerHTML = '<p>No items</p>';
    return;
  }

  cart.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';

    itemDiv.innerHTML = `
      <p><strong>${item.name}</strong></p>
      <p>Quantity: ${item.quantity}</p>
      <p>Price per item: R${item.price.toFixed(2)}</p>
      <p>Total: R${(item.price * item.quantity).toFixed(2)}</p>
      <button type="button" onclick="removeItem(${index})">Remove</button>
      <hr>
    `;
    cartDiv.appendChild(itemDiv);
  });
}

function addToCart(productName, productPrice) {
  const quantityInput = document.querySelector(`.add-to-cart[data-product="${productName}"]`)
    .parentElement.querySelector('.quantity');

  const quantity = parseInt(quantityInput.value);
  if (isNaN(quantity) || quantity < 1) {
    alert('Please enter a valid quantity.');
    return;
  }

  const existingItemIndex = cart.findIndex(item => item.name === productName);
  if (existingItemIndex > -1) {

    cart[existingItemIndex].quantity += quantity;
  } else {

    cart.push({ name: productName, price: parseFloat(productPrice), quantity: quantity });
  }

  updateCartDisplay();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCartDisplay();
}

document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    const productName = btn.getAttribute('data-name');
    const productPrice = btn.getAttribute('data-price');
    addToCart(productName, productPrice);
  });
});

function validateForm() {
  const fullName = document.querySelector('input[name="fullName"]').value.trim();
  const contact = document.querySelector('input[name="contact"]').value.trim();
  const email = document.querySelector('input[name="email"]').value.trim();

  if (!fullName || !contact || !email) {
    alert('Please fill in all your information.');
    return false;
  }

  if (cart.length === 0) {
    alert('Your cart is empty. Please add items before placing an order.');
    return false;
  }

  alert('Order placed successfully! Thank you.');

  cart = [];
  updateCartDisplay();

  return true;
}

window.onload = () => {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartDisplay();
  }
};

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}