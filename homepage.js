document.addEventListener("DOMContentLoaded", function() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const increment = target / 100;
      
      const interval = setInterval(() => {
        count += increment;
        if (count >= target) {
          counter.innerText = target;
          clearInterval(interval);
        } else {
          counter.innerText = Math.round(count);
        }
      }, 10);
    });
  });
  // Set maximum quantity limit
const maxQuantity = 9;

// Add event listeners for all the product cards
document.querySelectorAll('.card').forEach(card => {
    let quantity = 0;  // Initialize quantity for each card
    const cartButton = card.querySelector('.cart-btn');
    const increaseBtn = card.querySelector('.qty-btn:nth-of-type(2)');
    const decreaseBtn = card.querySelector('.qty-btn:nth-of-type(1)');
    const cartBtnGroup = card.querySelector('.cart-btn-group');
    const quantityDisplay = card.querySelector('#quantity-display');

    // Event listener for "Add to Cart" button
    cartButton.addEventListener("click", function() {
        if (quantity === 0) {
            quantity = 1;  // Start with quantity 1
            cartButton.style.display = "none";  // Hide "Add to Cart"
            cartBtnGroup.style.display = "flex";  // Show quantity controls
            updateQuantityDisplay();
            // alert("Quantity: " + quantity);  // Alert when quantity is set
        }
    });

    // Event listener for "Increase" button
    increaseBtn.addEventListener("click", function() {
        if (quantity < maxQuantity) {  // Prevent increasing beyond max limit
            quantity++;
            updateQuantityDisplay();
            // alert("Quantity: " + quantity);  // Alert after increasing
        } else {
            alert("Maximum quantity of 9 reached.");  // Alert when limit is reached
        }
    });

    // Event listener for "Decrease" button
    decreaseBtn.addEventListener("click", function() {
        if (quantity > 1) {  // Prevent decreasing below 1
            quantity--;
        } else {
            quantity = 0;  // Set quantity to 0 and hide quantity controls
            cartButton.style.display = "block";  // Show "Add to Cart"
            cartBtnGroup.style.display = "none";  // Hide quantity controls
        }
        updateQuantityDisplay();
        // alert("Quantity: " + quantity);  // Alert after decreasing
    });

    // Function to update the quantity display
    function updateQuantityDisplay() {
        quantityDisplay.textContent = quantity;
    }
});
