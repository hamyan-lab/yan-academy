// Gallery page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeGalleryFilters();
    initializeGalleryModal();
    initializeFeedbackForm();
    initializeGalleryAnimations();
});

// Initialize gallery filtering system
function initializeGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            filterGalleryItems(filter, galleryItems);
        });
    });
}

// Filter gallery items based on category
function filterGalleryItems(filter, items) {
    items.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            item.classList.remove('hidden');
            // Animate in
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 100);
        } else {
            // Animate out
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
            setTimeout(() => {
                item.classList.add('hidden');
            }, 300);
        }
    });
    
    // Update gallery layout after filtering
    setTimeout(updateGalleryLayout, 400);
}

// Update gallery layout
function updateGalleryLayout() {
    const visibleItems = document.querySelectorAll('.gallery-item:not(.hidden)');
    
    visibleItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.animation = 'slideInUp 0.4s ease-out forwards';
        }, index * 50);
    });
}

// Initialize gallery modal for enlarged view
function initializeGalleryModal() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Create modal if it doesn't exist
    if (!document.getElementById('gallery-modal')) {
        const modal = document.createElement('div');
        modal.id = 'gallery-modal';
        modal.className = 'gallery-modal';
        modal.innerHTML = `
            <div class="gallery-modal-content">
                <span class="close">&times;</span>
                <img id="gallery-modal-img" src="" alt="">
                <div id="gallery-modal-caption"></div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('gallery-modal-img');
    const modalCaption = document.getElementById('gallery-modal-caption');
    const closeBtn = modal.querySelector('.close');
    
    // Add click event to gallery items
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const overlay = this.querySelector('.gallery-overlay');
            
            if (img) {
                modal.style.display = 'block';
                modalImg.src = img.src;
                modalImg.alt = img.alt;
                
                if (overlay) {
                    const title = overlay.querySelector('h3')?.textContent || '';
                    const description = overlay.querySelector('p')?.textContent || '';
                    modalCaption.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
                }
                
                // Prevent body scrolling
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal events
    closeBtn.addEventListener('click', closeGalleryModal);
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeGalleryModal();
        }
    });
    
    // Close with escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeGalleryModal();
        }
    });
    
    function closeGalleryModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Initialize feedback form
function initializeFeedbackForm() {
    const feedbackForm = document.getElementById('feedback-form');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(event) {
            event.preventDefault();
            handleFeedbackSubmission(this);
        });
    }
}

// Handle feedback form submission
function handleFeedbackSubmission(form) {
    const formData = new FormData(form);
    const feedbackData = {
        name: formData.get('feedback-name') || document.getElementById('feedback-name').value,
        email: formData.get('feedback-email') || document.getElementById('feedback-email').value,
        rating: formData.get('feedback-rating') || document.getElementById('feedback-rating').value,
        message: formData.get('feedback-message') || document.getElementById('feedback-message').value,
        submittedAt: new Date().toISOString(),
        page: 'gallery'
    };
    
    // Validate form data
    if (!feedbackData.name || !feedbackData.email || !feedbackData.rating || !feedbackData.message) {
        showNotification('Please fill in all required fields!', 'error');
        return;
    }
    
    if (!validateEmail(feedbackData.email)) {
        showNotification('Please enter a valid email address!', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('.btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    form.classList.add('form-loading');
    
    // Simulate form submission
    setTimeout(() => {
        // Store feedback in local storage
        const existingFeedback = getFromLocalStorage('yanacademy_feedback', []);
        existingFeedback.push(feedbackData);
        saveToLocalStorage('yanacademy_feedback', existingFeedback);
        
        // Show success message
        showFeedbackSuccess(form);
        
        // Reset form
        form.reset();
        form.classList.remove('form-loading');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        showNotification('Thank you for your feedback!', 'success');
        
        // Update user preferences
        const userPreferences = getFromSessionStorage('yanacademy_preferences', {});
        userPreferences.hasLeftFeedback = true;
        userPreferences.lastFeedbackDate = new Date().toISOString();
        saveToSessionStorage('yanacademy_preferences', userPreferences);
        
    }, 2000);
}

// Show feedback success message
function showFeedbackSuccess(form) {
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const successMessage = document.createElement('div');
    successMessage.className = 'form-message success';
    successMessage.innerHTML = `
        <strong>Thank you!</strong> Your feedback has been submitted successfully. 
        We appreciate your input and will use it to improve our services.
    `;
    
    form.insertBefore(successMessage, form.firstChild);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

// Initialize gallery animations
function initializeGalleryAnimations() {
    // Animate filter buttons on load
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach((button, index) => {
        button.style.opacity = '0';
        button.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            button.style.transition = 'all 0.4s ease-out';
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Animate gallery items on load
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease-out';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        }, 300 + (index * 50));
    });
    
    // Animate achievement cards on scroll
    observeElementsOnScroll('.achievement-card', animateSlideInUp);
    
    // Animate feedback form on scroll
    observeElementsOnScroll('.feedback-form', animateSlideInUp);
}

// Utility function to observe elements and animate
function observeElementsOnScroll(selector, animationFunction) {
    const elements = document.querySelectorAll(selector);
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                    entry.target.setAttribute('data-animated', 'true');
                    animationFunction(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        elements.forEach(animationFunction);
    }
}

// Animation functions
function animateSlideInUp(element) {
    element.style.transform = 'translateY(30px)';
    element.style.opacity = '0';
    element.style.transition = 'all 0.6s ease-out';
    
    setTimeout(() => {
        element.style.transform = 'translateY(0)';
        element.style.opacity = '1';
    }, 100);
}

// Enhanced gallery item interactions
document.addEventListener('mouseover', function(event) {
    if (event.target.closest('.gallery-item')) {
        const item = event.target.closest('.gallery-item');
        const img = item.querySelector('img');
        
        if (img) {
            img.style.transform = 'scale(1.1)';
        }
    }
});

document.addEventListener('mouseout', function(event) {
    if (event.target.closest('.gallery-item')) {
        const item = event.target.closest('.gallery-item');
        const img = item.querySelector('img');
        
        if (img) {
            img.style.transform = 'scale(1)';
        }
    }
});

// Keyboard navigation for gallery
document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('gallery-modal');
    if (modal && modal.style.display === 'block') {
        if (event.key === 'ArrowLeft') {
            // Navigate to previous image (if implementing gallery navigation)
            event.preventDefault();
        } else if (event.key === 'ArrowRight') {
            // Navigate to next image (if implementing gallery navigation)
            event.preventDefault();
        }
    }
});

// Rating system for feedback form
const ratingSelect = document.getElementById('feedback-rating');
if (ratingSelect) {
    ratingSelect.addEventListener('change', function() {
        const rating = parseInt(this.value);
        const feedbackMessage = document.getElementById('feedback-message');
        
        // Provide helpful placeholders based on rating
        if (feedbackMessage) {
            let placeholder = 'Please share your detailed feedback...';
            
            switch(rating) {
                case 5:
                    placeholder = 'We\'re thrilled you had an excellent experience! Please tell us what made it special...';
                    break;
                case 4:
                    placeholder = 'Thank you for the positive feedback! How can we make it even better?';
                    break;
                case 3:
                    placeholder = 'We appreciate your honest feedback. What areas can we improve?';
                    break;
                case 2:
                    placeholder = 'We\'re sorry to hear about your experience. Please help us understand what went wrong...';
                    break;
                case 1:
                    placeholder = 'We sincerely apologize for not meeting your expectations. Your detailed feedback will help us improve...';
                    break;
            }
            
            feedbackMessage.placeholder = placeholder;
        }
    });
}

// Add performance tracking for gallery interactions
function trackGalleryInteraction(action, category) {
    const interactionData = {
        action,
        category,
        timestamp: new Date().toISOString(),
        page: 'gallery'
    };
    
    // Store interaction data
    const interactions = getFromSessionStorage('yanacademy_interactions', []);
    interactions.push(interactionData);
    saveToSessionStorage('yanacademy_interactions', interactions);
}

// Track filter usage
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('filter-btn')) {
        const filter = event.target.getAttribute('data-filter');
        trackGalleryInteraction('filter', filter);
    }
});

// Track gallery item clicks
document.addEventListener('click', function(event) {
    if (event.target.closest('.gallery-item')) {
        const item = event.target.closest('.gallery-item');
        const category = item.getAttribute('data-category');
        trackGalleryInteraction('view_image', category);
    }
});