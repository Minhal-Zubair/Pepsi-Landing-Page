// Function to update the main product image
function imgSlider(anything) {
    document.querySelector('.pepsi').src = anything;
}

// Function to change the background color of the main section
function changeBgColor(color) {
    const sec = document.querySelector('.sec');
    sec.style.background = color;
}

// Function to toggle the mobile menu
function menuToggle() {
    const toggleMenu = document.querySelector('.toggleMenu');
    const navigation = document.querySelector('.navigation');

    toggleMenu.classList.toggle('active');
    navigation.classList.toggle('active');
}

// --- Product Modal Functionality ---
// Cache DOM elements for modal
const productModalOverlay = document.querySelector('.product-modal-overlay');
const closeButton = document.querySelector('.close-button');
const modalProductImg = document.querySelector('.modal-product-img');
const modalProductTitle = document.querySelector('.modal-product-title');
const modalProductDescription = document.querySelector('.modal-product-description');
const modalCalories = document.getElementById('modal-calories');
const modalSugar = document.getElementById('modal-sugar');
const modalVolume = document.getElementById('modal-volume');
const modalBuyButton = document.querySelector('.modal-buy-button');

// Sample product data (you can expand this with more product details and properties)
const products = {
    'pepsi001.png': {
        title: 'Classic Pepsi',
        description: 'The original bold and refreshing taste that has delighted generations. Perfect for any moment.',
        calories: '150 kcal',
        sugar: '41g',
        volume: '330ml'
    },
    'pepsi002.png': {
        title: 'Pepsi Cherry Max',
        description: 'Enjoy the maximum taste of Pepsi with a delightful cherry twist, all with zero sugar.',
        calories: '0 kcal',
        sugar: '0g',
        volume: '330ml'
    },
    'pepsi003.png': {
        title: 'Pepsi Black',
        description: 'Bold flavor, zero sugar. Pepsi Black offers a guilt-free indulgence for those who love intense taste.',
        calories: '0 kcal',
        sugar: '0g',
        volume: '330ml'
    }
};

// Update imgSlider to also open modal with product details
function imgSlider(imagePath) {
    const imageName = imagePath.substring(imagePath.lastIndexOf('/') + 1); // Extract filename

    document.querySelector('.pepsi').src = imagePath;

    // Populate and show modal if product data exists
    if (products[imageName]) {
        const product = products[imageName];
        modalProductImg.src = imagePath;
        modalProductTitle.textContent = product.title;
        modalProductDescription.textContent = product.description;
        modalCalories.textContent = product.calories;
        modalSugar.textContent = product.sugar;
        modalVolume.textContent = product.volume;
        modalBuyButton.href = `#buy-${imageName.split('.')[0]}`; // Example dynamic link

        productModalOverlay.classList.add('active');
    }
}

// Close modal function when close button is clicked
closeButton.addEventListener('click', () => {
    productModalOverlay.classList.remove('active');
});

// Close modal if clicking outside the modal content
productModalOverlay.addEventListener('click', (event) => {
    if (event.target === productModalOverlay) {
        productModalOverlay.classList.remove('active');
    }
});

// --- Social Icons Animation on Scroll ---
const socialIcons = document.querySelector('.sci');

// Check if socialIcons element exists before observing
if (socialIcons) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                socialIcons.classList.add('show');
            } else {
                // Optional: remove 'show' class if you want it to fade out when scrolling away
                // socialIcons.classList.remove('show');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    observer.observe(socialIcons);
}

// --- Back to Top Button Functionality ---
// Get the Back to Top button
const backToTopBtn = document.getElementById("backToTopBtn");

// Only add event listeners if the button exists
if (backToTopBtn) {
    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function() {
        scrollFunction();
    };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopBtn.style.display = "flex"; // Use 'flex' to keep content (arrow) centered
        } else {
            backToTopBtn.style.display = "none";
        }
    }

    // When the user clicks on the button, scroll to the top of the document
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // This is the key for smooth scrolling!
        });
    });
}


// --- Add to Cart Functionality (Simulated) ---
const cartCountSpan = document.querySelector('.cart-count');
const addToCartBtn = document.querySelector('.add-to-cart-btn');
let cartItemCount = 0;

// Function to update cart count
function updateCartCount() {
    cartItemCount++;
    if (cartCountSpan) { // Check if the cart count span exists
        cartCountSpan.textContent = cartItemCount;
    }
}

// Add event listener to the "Add to Cart" button in the modal
if (addToCartBtn) { // Check if the button exists
    addToCartBtn.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        updateCartCount();
        if (productModalOverlay) { // Check if modal exists before closing
            productModalOverlay.classList.remove('active'); // Close modal after adding to cart
        }
        // You could also add a temporary "Added to cart!" message here (e.g., a small toast notification)
    });
}


// --- Testimonial Slider Functionality ---
const testimonialItems = document.querySelectorAll('.testimonial-item');
const sliderDots = document.querySelectorAll('.dot');
let currentSlide = 0;
let testimonialInterval; // To store the interval ID

// Only initialize slider if there are testimonial items
if (testimonialItems.length > 0) {
    function showTestimonial(index) {
        // Remove active class from all
        testimonialItems.forEach(item => item.classList.remove('active'));
        sliderDots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        testimonialItems[index].classList.add('active');
        sliderDots[index].classList.add('active');
        currentSlide = index;
    }

    function nextTestimonial() {
        currentSlide = (currentSlide + 1) % testimonialItems.length;
        showTestimonial(currentSlide);
    }

    function startTestimonialSlider() {
        testimonialInterval = setInterval(nextTestimonial, 5000); // Change slide every 5 seconds
    }

    function resetTestimonialSlider() {
        clearInterval(testimonialInterval); // Clear existing interval
        startTestimonialSlider(); // Start a new one
    }

    // Event listeners for dots
    sliderDots.forEach(dot => {
        dot.addEventListener('click', (event) => {
            const slideIndex = parseInt(event.target.dataset.slide);
            showTestimonial(slideIndex);
            resetTestimonialSlider(); // Reset timer when manually navigated
        });
    });

    // Initialize slider on page load
    showTestimonial(0);
    startTestimonialSlider();
}


// --- Newsletter Subscription Form Functionality ---
const newsletterForm = document.getElementById('newsletterForm');
const emailInput = document.getElementById('emailInput');
const subscriptionMessage = document.getElementById('subscriptionMessage');

// Only add event listener if the form exists
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const email = emailInput.value;

        if (email) {
            // Basic email format validation (more robust validation would be server-side)
            // This regex is a simple check; for production, use more comprehensive validation.
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(email)) {
                subscriptionMessage.textContent = `Thank you for subscribing, ${email}!`;
                subscriptionMessage.style.color = '#ffffff'; // Success color (white on dark background)
                subscriptionMessage.classList.add('show');
                emailInput.value = ''; // Clear the input field

                // In a real application, you would send this email to a server here:
                /*
                fetch('/subscribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: email })
                })
                .then(response => response.json())
                .then(data => {
                    // Handle server response (e.g., data.success, data.message)
                    console.log('Subscription response:', data);
                })
                .catch(error => {
                    console.error('Error during subscription:', error);
                    subscriptionMessage.textContent = 'Subscription failed. Please try again.';
                    subscriptionMessage.style.color = '#e60c2c'; // Error color (red)
                });
                */

            } else {
                subscriptionMessage.textContent = 'Please enter a valid email address.';
                subscriptionMessage.style.color = '#ffffff'; // Error color (white on dark background)
                subscriptionMessage.classList.add('show');
            }
        } else {
            subscriptionMessage.textContent = 'Email address cannot be empty.';
            subscriptionMessage.style.color = '#ffffff'; // Error color (white on dark background)
            subscriptionMessage.classList.add('show');
        }

        // Hide message after a few seconds
        setTimeout(() => {
            subscriptionMessage.classList.remove('show');
        }, 5000); // Message disappears after 5 seconds
    });
}