// Global variables
let cart = JSON.parse(localStorage.getItem('yanacademy_cart')) || [];
let userPreferences = JSON.parse(sessionStorage.getItem('yanacademy_preferences')) || {};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeModals();
    initializeCart();
    updateCartCount();
    
    // Initialize page-specific functionality
    const page = window.location.pathname.split('/').pop() || 'index.html';
    switch(page) {
        case 'index.html':
        case '':
            initializeHome();
            break;
        case 'gallery.html':
            initializeGallery();
            break;
        case 'about.html':
            initializeAbout();
            break;
        case 'courses.html':
            initializeCourses();
            break;
    }
});

// Navigation functionality
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Modal functionality
function initializeModals() {
    // Close modal when clicking on close button
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('close')) {
            const modal = event.target.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        }
    });
    
    // Close modal when clicking outside
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target.id);
        }
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const activeModal = document.querySelector('.modal[style*="block"]');
            if (activeModal) {
                closeModal(activeModal.id);
            }
        }
    });
}

// Cart functionality
function initializeCart() {
    const cartBtn = document.getElementById('cart-btn');
    
    if (cartBtn) {
        cartBtn.addEventListener('click', function() {
            openModal('cart-modal');
            displayCartItems();
        });
    }
    
    // Add to cart buttons
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('add-to-cart')) {
            const courseData = event.target.getAttribute('data-course');
            if (courseData) {
                const course = JSON.parse(courseData);
                addToCart(course);
            }
        }
    });
}

// Cart functions
function addToCart(course) {
    const existingItem = cart.find(item => item.id === course.id);
    
    if (existingItem) {
        showNotification('Item already in cart!', 'warning');
        return;
    }
    
    cart.push({
        id: course.id,
        name: course.name,
        price: course.price,
        image: course.image || '',
        addedAt: new Date().toISOString()
    });
    
    localStorage.setItem('yanacademy_cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Added to cart!', 'success');
    
    // Add animation to cart button
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
        cartBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartBtn.style.transform = 'scale(1)';
        }, 200);
    }
}

function removeFromCart(courseId) {
    cart = cart.filter(item => item.id !== courseId);
    localStorage.setItem('yanacademy_cart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems();
    showNotification('Removed from cart!', 'info');
}

function clearCart() {
    if (cart.length === 0) {
        showNotification('Cart is already empty!', 'info');
        return;
    }
    
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        localStorage.setItem('yanacademy_cart', JSON.stringify(cart));
        updateCartCount();
        displayCartItems();
        showNotification('Cart cleared!', 'info');
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
        cartCount.style.display = cart.length > 0 ? 'flex' : 'none';
    }
}

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');
    
    if (!cartItemsContainer || !cartTotalContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
        cartTotalContainer.innerHTML = '';
        return;
    }
    
    let total = 0;
    let itemsHTML = '';
    
    cart.forEach(item => {
        total += item.price;
        itemsHTML += `
            <div class="cart-item">
                ${item.image ? `<img src="${item.image}" alt="${item.name}">` : ''}
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price}</div>
                </div>
                <button class="cart-remove" onclick="removeFromCart('${item.id}')" title="Remove item">×</button>
            </div>
        `;
    });
    
    cartItemsContainer.innerHTML = itemsHTML;
    cartTotalContainer.innerHTML = `Total: $${total}`;
}

function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'warning');
        return;
    }
    
    // Save checkout data to session storage
    sessionStorage.setItem('yanacademy_checkout', JSON.stringify({
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price, 0),
        timestamp: new Date().toISOString()
    }));
    
    showNotification('Proceeding to checkout...', 'info');
    
    // Simulate checkout process
    setTimeout(() => {
        alert('Thank you for your purchase! You will receive an email confirmation shortly. This is a demo - no actual payment was processed.');
        cart = [];
        localStorage.setItem('yanacademy_cart', JSON.stringify(cart));
        updateCartCount();
        closeModal('cart-modal');
        showNotification('Purchase completed!', 'success');
    }, 2000);
}

// Modal utility functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Focus management for accessibility
        const firstFocusable = modal.querySelector('input, button, textarea, select');
        if (firstFocusable) {
            setTimeout(() => firstFocusable.focus(), 100);
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Newsletter subscription
function handleNewsletterSubscription(email, name = '', level = '') {
    if (!email) {
        showNotification('Please enter a valid email address!', 'error');
        return false;
    }
    
    // Store subscription in local storage
    const subscriptions = JSON.parse(localStorage.getItem('yanacademy_subscriptions')) || [];
    
    if (subscriptions.find(sub => sub.email === email)) {
        showNotification('You are already subscribed!', 'info');
        return false;
    }
    
    subscriptions.push({
        email: email,
        name: name,
        level: level,
        subscribedAt: new Date().toISOString()
    });
    
    localStorage.setItem('yanacademy_subscriptions', JSON.stringify(subscriptions));
    
    // Update user preferences
    userPreferences.email = email;
    userPreferences.name = name;
    userPreferences.level = level;
    sessionStorage.setItem('yanacademy_preferences', JSON.stringify(userPreferences));
    
    showNotification('Successfully subscribed to our newsletter!', 'success');
    return true;
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        zIndex: '10000',
        padding: '12px 24px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '600',
        maxWidth: '300px',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease-in-out',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
    });
    
    // Set background color based on type
    const colors = {
        success: '#06D6A0',
        error: '#F18F01',
        warning: '#FFD23F',
        info: '#3D5A80'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Smooth scrolling utility
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Utility functions for other pages
function initializeHome() {
    // Initialize home page specific functionality
    const newsletterForm = document.getElementById('newsletter-form');
    const modalNewsletterForm = document.getElementById('modal-newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = event.target.querySelector('input[type="email"]').value;
            if (handleNewsletterSubscription(email)) {
                event.target.reset();
            }
        });
    }
    
    if (modalNewsletterForm) {
        modalNewsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            const email = formData.get('email');
            const name = formData.get('name') || '';
            const level = formData.get('level') || '';
            
            if (handleNewsletterSubscription(email, name, level)) {
                event.target.reset();
                closeModal('subscribe-modal');
            }
        });
    }
}

// Initialize gallery page
function initializeGallery() {
    // Gallery filtering will be handled in gallery.js
}

// Initialize about page
function initializeAbout() {
    // About page forms will be handled in about.js
}

// Initialize courses page
function initializeCourses() {
    // Courses filtering will be handled in courses.js
}

// Form validation utilities
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
}

// Local storage utilities
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Failed to save to localStorage:', error);
        return false;
    }
}

function getFromLocalStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Failed to get from localStorage:', error);
        return defaultValue;
    }
}

// Session storage utilities
function saveToSessionStorage(key, data) {
    try {
        sessionStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Failed to save to sessionStorage:', error);
        return false;
    }
}

function getFromSessionStorage(key, defaultValue = null) {
    try {
        const item = sessionStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Failed to get from sessionStorage:', error);
        return defaultValue;
    }
}

// Error handling
window.addEventListener('error', function(event) {
    console.error('JavaScript error:', event.error);
    showNotification('An unexpected error occurred. Please refresh the page.', 'error');
});

// Accessibility improvements
document.addEventListener('keydown', function(event) {
    // Handle escape key for modals
    if (event.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal[style*="block"]');
        openModals.forEach(modal => {
            closeModal(modal.id);
        });
    }
    
    // Handle enter key for buttons
    if (event.key === 'Enter' && event.target.classList.contains('btn')) {
        event.target.click();
    }
});

// Performance optimization - lazy loading
function observeImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize image lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', observeImages);