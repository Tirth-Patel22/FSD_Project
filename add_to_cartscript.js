 // Cart state management
 let cartItems = [];

 // Initialize all product cards
 document.addEventListener('DOMContentLoaded', () => {
     // Add unique identifiers to all cards
     const allCarousels = document.querySelectorAll('.carousel');
     allCarousels.forEach((carousel, carouselIndex) => {
         const cards = carousel.querySelectorAll('.card');
         cards.forEach((card, cardIndex) => {
             // Create unique identifier combining carousel and card index
             const uniqueId = `carousel${carouselIndex}-card${cardIndex}`;
             card.setAttribute('data-product-id', uniqueId);
             
             // Update IDs to be unique
             const cartBtn = card.querySelector('.cart-btn');
             const btnGroup = card.querySelector('.cart-btn-group');
             const decreaseBtn = card.querySelector('.qty-btn:first-child');
             const increaseBtn = card.querySelector('.qty-btn:last-child');
             const quantityDisplay = card.querySelector('#quantity-display');
             
             cartBtn.id = `cart-button-${uniqueId}`;
             btnGroup.id = `cart-btn-group-${uniqueId}`;
             decreaseBtn.id = `decrease-btn-${uniqueId}`;
             increaseBtn.id = `increase-btn-${uniqueId}`;
             quantityDisplay.id = `quantity-display-${uniqueId}`;
         });
     });
 
     // Add click handlers to all cart buttons
     document.querySelectorAll('.cart-btn').forEach(button => {
         button.addEventListener('click', function() {
             const card = this.closest('.card');
             handleAddToCart(card);
         });
     });
 
     // Add click handlers to quantity buttons
     document.querySelectorAll('.qty-btn').forEach(btn => {
         btn.addEventListener('click', handleQuantityChange);
     });
 
     // Add click handler to cart icon in navbar
     const cartIcon = document.querySelector('.nav-link img[alt="Cart Icon"]');
     cartIcon.parentElement.addEventListener('click', showCartModal);
 });
 
 function handleAddToCart(card) {
     const productId = card.getAttribute('data-product-id');
     const cartBtn = card.querySelector('.cart-btn');
     const btnGroup = card.querySelector('.cart-btn-group');
     
     // Hide "Add to Cart" button and show quantity controls
     cartBtn.style.display = 'none';
     btnGroup.style.display = 'flex';
 
     // Get product details
     const productName = card.querySelector('.card-title').textContent;
     const price = card.querySelector('.text-success').textContent;
     const quantity = 1;
 
     // Add to cart array if not already present
     const existingItem = cartItems.find(item => item.productId === productId);
     if (!existingItem) {
         cartItems.push({
             productId,
             name: productName,
             price: price,
             quantity: quantity
         });
     }
 
     updateCartCount();
 }
 
 function handleQuantityChange(event) {
     const btnGroup = event.target.closest('.cart-btn-group');
     const card = btnGroup.closest('.card');
     const productId = card.getAttribute('data-product-id');
     const quantityDisplay = btnGroup.querySelector('[id^="quantity-display"]');
     let quantity = parseInt(quantityDisplay.textContent);
 
     if (event.target.classList.contains('decrease-btn')) {
         if (quantity > 1) {
             quantity--;
         } else {
             // If quantity reaches 0, show "Add to Cart" button again
             btnGroup.style.display = 'none';
             card.querySelector('.cart-btn').style.display = 'block';
             // Remove item from cart
             cartItems = cartItems.filter(item => item.productId !== productId);
         }
     } else if (event.target.classList.contains('increase-btn')) {
         quantity++;
     }
 
     quantityDisplay.textContent = quantity;
     
     // Update quantity in cart array
     const cartItem = cartItems.find(item => item.productId === productId);
     if (cartItem) {
         cartItem.quantity = quantity;
     }
 
     updateCartCount();
 }
 
 function updateCartCount() {
     const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
     
     // Create or update cart count badge
     let badge = document.querySelector('.cart-count');
     if (!badge) {
         badge = document.createElement('span');
         badge.className = 'cart-count badge bg-danger';
         document.querySelector('.atc').appendChild(badge);
     }
     badge.textContent = totalItems;
 }
 
 function showCartModal(event) {
     event.preventDefault();
     
     // Remove existing modal if present
     const existingModal = document.querySelector('.cart-modal');
     if (existingModal) {
         existingModal.remove();
     }
 
     // Create modal
     const modal = document.createElement('div');
     modal.className = 'cart-modal';
     modal.innerHTML = `
         <div class="cart-modal-content">
             <h3>Shopping Cart</h3>
             <div class="cart-items">
                 ${cartItems.map(item => {
                     const total = parseFloat(item.price.replace('₹', '')) * item.quantity;
                     return `
                         <div class="cart-item">
                             <div class="cart-item-details">
                                 <div class="item-name">${item.name}</div>
                                 <div class="item-price">Price: ${item.price}</div>
                             </div>
                             <div class="cart-item-quantity">
                                 <div>Quantity: ${item.quantity}</div>
                                 <div>Total: ₹${total}</div>
                             </div>
                         </div>
                     `;
                 }).join('')}
             </div>
             <div class="cart-total">
                 <div>Total Items: ${cartItems.reduce((sum, item) => sum + item.quantity, 0)}</div>
                 <div>Total Amount: ₹${cartItems.reduce((sum, item) => {
                     const price = parseFloat(item.price.replace('₹', ''));
                     return sum + (price * item.quantity);
                 }, 0)}</div>
             </div>
             <button class="close-modal">Close</button>
         </div>
     `;
 
     // Add modal styles
     const styles = document.createElement('style');
     styles.textContent = `
         .cart-modal {
             position: fixed;
             top: 0;
             left: 0;
             width: 100%;
             height: 100%;
             background: rgba(0, 0, 0, 0.5);
             display: flex;
             justify-content: center;
             align-items: center;
             z-index: 1000;
         }
         .cart-modal-content {
             background: white;
             padding: 20px;
             border-radius: 8px;
             max-width: 500px;
             width: 90%;
         }
         .cart-item {
             display: flex;
             justify-content: space-between;
             padding: 10px 0;
             border-bottom: 1px solid #eee;
         }
         .cart-item-details, .cart-item-quantity {
             display: flex;
             flex-direction: column;
             gap: 5px;
         }
         .item-name {
             font-weight: bold;
         }
         .cart-total {
             margin-top: 20px;
             font-weight: bold;
             display: flex;
             flex-direction: column;
             gap: 5px;
         }
         .close-modal {
             margin-top: 20px;
             padding: 8px 16px;
             background: #dc3545;
             color: white;
             border: none;
             border-radius: 4px;
             cursor: pointer;
         }
         .cart-count {
             position: absolute;
             padding: 2px 6px;
             border-radius: 50%;
             font-size: 12px;
         }
         .cart-btn-group {
             display: none;
         }
     `;
 
     document.head.appendChild(styles);
     document.body.appendChild(modal);
 
     // Add close button handler
     modal.querySelector('.close-modal').addEventListener('click', () => {
         modal.remove();
     });
 
     // Close modal when clicking outside
     modal.addEventListener('click', (e) => {
         if (e.target === modal) {
             modal.remove();
         }
     });
 }