document.getElementById('menu-toggle').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('active');
});

document.getElementById('close-btn').addEventListener('click', function() {
    document.getElementById('sidebar').classList.remove('active');
});


document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartButton = document.getElementById('cart-button');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    // Function to update the cart count
    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

    // Function to calculate the total price
    function calculateTotalPrice() {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Function to update the cart display in the Offcanvas
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex align-items-center';

            // Product Image
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.name;
            img.style.width = '50px';
            img.style.height = '50px';
            img.className = 'me-2';

            // Product Details
            const details = document.createElement('div');
            details.className = 'd-flex flex-column flex-grow-1';

            const name = document.createElement('span');
            name.textContent = item.name;
            details.appendChild(name);

            const price = document.createElement('span');
            price.textContent = `$${item.price.toFixed(2)}`;
            details.appendChild(price);

            // Quantity Controls
            const quantityControls = document.createElement('div');
            quantityControls.className = 'd-flex align-items-center ms-auto';

            const decrementBtn = document.createElement('button');
            decrementBtn.innerHTML = '<iconify-icon icon="mdi:minus"></iconify-icon>';
            decrementBtn.className = 'btn btn-outline-secondary btn-sm';
            decrementBtn.addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity--;
                    updateCartDisplay();
                }
            });
            quantityControls.appendChild(decrementBtn);

            const quantityDisplay = document.createElement('span');
            quantityDisplay.textContent = item.quantity;
            quantityDisplay.className = 'mx-2';
            quantityControls.appendChild(quantityDisplay);

            const incrementBtn = document.createElement('button');
            incrementBtn.innerHTML = '<iconify-icon icon="mdi:plus"></iconify-icon>';
            incrementBtn.className = 'btn btn-outline-secondary btn-sm';
            incrementBtn.addEventListener('click', () => {
                item.quantity++;
                updateCartDisplay();
            });
            quantityControls.appendChild(incrementBtn);

            // Remove Button
            const removeBtn = document.createElement('button');
            removeBtn.innerHTML = '<iconify-icon icon="mdi:close"></iconify-icon>';
            removeBtn.className = 'btn btn-danger btn-sm ms-2';
            removeBtn.addEventListener('click', () => {
                const index = cart.indexOf(item);
                if (index > -1) {
                    cart.splice(index, 1);
                    updateCartCount();
                    updateCartDisplay();
                }
            });
            quantityControls.appendChild(removeBtn);

            listItem.appendChild(img);
            listItem.appendChild(details);
            listItem.appendChild(quantityControls);
            cartItemsContainer.appendChild(listItem);
        });

        // Update total price
        cartTotal.textContent = `$${calculateTotalPrice().toFixed(2)}`;
    }

    // Function to handle "Add to Cart" button click
    function handleAddToCart(event) {
        const button = event.target;
        const productElement = button.closest('.col-6');
        const productName = productElement.querySelector('#underline').textContent.trim();
        const productPrice = parseFloat(productElement.querySelector('.fw-bold').textContent.replace('$', ''));
        const productImage = productElement.querySelector('img').src;

        // Check if product is already in cart
        const existingProduct = cart.find(item => item.name === productName);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            });
        }

        updateCartCount();
        updateCartDisplay();
    }

    // Attach "Add to Cart" event listeners
    document.querySelectorAll('#addtocart').forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });
});
