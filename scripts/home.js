// Home page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeHomeAnimations();
    initializeTestimonialSlider();
    initializeCounterAnimations();
});

// Initialize animations for home page elements
function initializeHomeAnimations() {
    // Animate hero section on load
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    const heroImage = document.querySelector('.hero-image img');
    
    if (heroTitle) {
        setTimeout(() => {
            heroTitle.style.opacity = '0';
            heroTitle.style.transform = 'translateY(30px)';
            heroTitle.style.transition = 'all 0.6s ease-out';
            
            setTimeout(() => {
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }, 200);
        }, 100);
    }
    
    if (heroSubtitle) {
        setTimeout(() => {
            heroSubtitle.style.opacity = '0';
            heroSubtitle.style.transform = 'translateY(30px)';
            heroSubtitle.style.transition = 'all 0.6s ease-out';
            
            setTimeout(() => {
                heroSubtitle.style.opacity = '1';
                heroSubtitle.style.transform = 'translateY(0)';
            }, 400);
        }, 100);
    }
    
    if (heroButtons) {
        setTimeout(() => {
            heroButtons.style.opacity = '0';
            heroButtons.style.transform = 'translateY(30px)';
            heroButtons.style.transition = 'all 0.6s ease-out';
            
            setTimeout(() => {
                heroButtons.style.opacity = '1';
                heroButtons.style.transform = 'translateY(0)';
            }, 600);
        }, 100);
    }
    
    if (heroImage) {
        setTimeout(() => {
            heroImage.style.opacity = '0';
            heroImage.style.transform = 'scale(0.9)';
            heroImage.style.transition = 'all 0.8s ease-out';
            
            setTimeout(() => {
                heroImage.style.opacity = '1';
                heroImage.style.transform = 'scale(1)';
            }, 800);
        }, 100);
    }
    
    // Animate feature cards on scroll
    observeElementsOnScroll('.feature-card', 'slide-in-up');
    observeElementsOnScroll('.course-card', 'slide-in-up');
}

// Initialize testimonial slider functionality
function initializeTestimonialSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    if (testimonialCards.length <= 1) return;
    
    let currentTestimonial = 0;
    
    // Add navigation dots
    const testimonialsSection = document.querySelector('.testimonials');
    if (testimonialsSection) {
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'testimonial-dots';
        dotsContainer.style.cssText = `
            display: flex;
            justify-content: center;
            gap: 12px;
            margin-top: 2rem;
        `;
        
        testimonialCards.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'testimonial-dot';
            dot.style.cssText = `
                width: 12px;
                height: 12px;
                border-radius: 50%;
                border: none;
                background-color: rgba(255, 255, 255, 0.5);
                cursor: pointer;
                transition: background-color 0.3s ease;
            `;
            
            if (index === 0) {
                dot.style.backgroundColor = 'white';
            }
            
            dot.addEventListener('click', () => goToTestimonial(index));
            dotsContainer.appendChild(dot);
        });
        
        testimonialsSection.appendChild(dotsContainer);
    }
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        goToTestimonial(currentTestimonial);
    }, 5000);
    
    function goToTestimonial(index) {
        const testimonialGrid = document.querySelector('.testimonials-grid');
        if (!testimonialGrid) return;
        
        currentTestimonial = index;
        
        // Hide all cards
        testimonialCards.forEach((card, i) => {
            if (i === index) {
                card.style.display = 'block';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update dots
        const dots = document.querySelectorAll('.testimonial-dot');
        dots.forEach((dot, i) => {
            dot.style.backgroundColor = i === index ? 'white' : 'rgba(255, 255, 255, 0.5)';
        });
    }
}

// Initialize counter animations
function initializeCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number, .achievement-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
        if (isNaN(target)) return;
        
        const increment = target / 50;
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = element.textContent; // Restore original formatting
            }
        };
        
        updateCounter();
    };
    
    // Observe counters and animate when visible
    if ('IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                    entry.target.setAttribute('data-animated', 'true');
                    animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
}

// Utility function to observe elements on scroll
function observeElementsOnScroll(selector, animationClass) {
    const elements = document.querySelectorAll(selector);
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(animationClass);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(element => {
            // Set initial state
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease-out';
            
            observer.observe(element);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        elements.forEach(element => {
            element.classList.add(animationClass);
        });
    }
}

// Course card interactions
document.addEventListener('click', function(event) {
    if (event.target.closest('.course-card')) {
        const card = event.target.closest('.course-card');
        
        // Add click effect
        card.style.transform = 'translateY(-6px) scale(0.98)';
        setTimeout(() => {
            card.style.transform = 'translateY(-6px) scale(1)';
        }, 150);
    }
});

// Newsletter form enhancements
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    
    // Add floating label effect
    if (emailInput) {
        emailInput.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        emailInput.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    }
    
    // Enhanced form submission
    newsletterForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const submitBtn = this.querySelector('.btn');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Subscribing...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            const email = emailInput.value;
            if (handleNewsletterSubscription(email)) {
                submitBtn.textContent = 'Subscribed!';
                emailInput.value = '';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            } else {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        }, 1500);
    });
}

// Feature card hover effects
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.feature-icon');
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            icon.style.transition = 'transform 0.3s ease';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.feature-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Testimonial card interactions
document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('click', function() {
        // Add pulse effect
        this.style.animation = 'pulse 0.6s ease-in-out';
        
        setTimeout(() => {
            this.style.animation = '';
        }, 600);
    });
});

// Add CSS for pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .slide-in-up {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .newsletter-form.focused input {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(224, 122, 95, 0.1);
    }
`;
document.head.appendChild(style);