// About page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeAboutAnimations();
    initializeContactForm();
    initializeCustomOrderForm();
    initializeTeamInteractions();
    initializeStatCounters();
});

// Initialize about page animations
function initializeAboutAnimations() {
    // Animate story section elements
    observeAndAnimate('.story-text h2', animateSlideInLeft);
    observeAndAnimate('.story-text p', animateSlideInLeft, 200);
    observeAndAnimate('.story-image', animateSlideInRight);
    
    // Animate value cards
    observeAndAnimate('.value-card', animateSlideInUp, 100);
    
    // Animate team table
    observeAndAnimate('.team-table', animateFadeIn);
    
    // Animate stat cards
    observeAndAnimate('.stat-card', animateSlideInUp, 150);
    
    // Animate forms
    observeAndAnimate('.contact-form', animateSlideInUp);
    observeAndAnimate('.custom-order-form', animateSlideInUp);
}

// Initialize contact form
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            handleContactFormSubmission(this);
        });
        
        // Add form validation
        addFormValidation(contactForm);
    }
}

// Initialize custom order form
function initializeCustomOrderForm() {
    const customOrderForm = document.getElementById('custom-order-form');
    
    if (customOrderForm) {
        customOrderForm.addEventListener('submit', function(event) {
            event.preventDefault();
            handleCustomOrderSubmission(this);
        });
        
        // Add form validation
        addFormValidation(customOrderForm);
        
        // Add dynamic form updates based on selections
        addDynamicFormBehavior(customOrderForm);
    }
}

// Handle contact form submission
function handleContactFormSubmission(form) {
    const formData = new FormData(form);
    const contactData = {
        name: formData.get('contact-name') || document.getElementById('contact-name').value,
        email: formData.get('contact-email') || document.getElementById('contact-email').value,
        phone: formData.get('contact-phone') || document.getElementById('contact-phone').value,
        subject: formData.get('contact-subject') || document.getElementById('contact-subject').value,
        message: formData.get('contact-message') || document.getElementById('contact-message').value,
        newsletter: formData.get('contact-newsletter') || document.getElementById('contact-newsletter').checked,
        submittedAt: new Date().toISOString(),
        type: 'contact'
    };
    
    // Validate form data
    if (!validateContactForm(contactData)) {
        return;
    }
    
    // Show loading state
    showFormLoading(form, 'Sending message...');
    
    // Simulate form submission
    setTimeout(() => {
        // Store contact inquiry in local storage
        const existingInquiries = getFromLocalStorage('yanacademy_inquiries', []);
        existingInquiries.push(contactData);
        saveToLocalStorage('yanacademy_inquiries', existingInquiries);
        
        // Handle newsletter subscription if checked
        if (contactData.newsletter) {
            handleNewsletterSubscription(contactData.email, contactData.name);
        }
        
        // Show success message
        showFormSuccess(form, 'Thank you for your message! We will get back to you within 24 hours.');
        
        // Reset form
        form.reset();
        hideFormLoading(form);
        
        showNotification('Message sent successfully!', 'success');
        
        // Update user preferences
        updateUserPreferences({
            hasContacted: true,
            lastContactDate: new Date().toISOString(),
            preferredContactSubject: contactData.subject
        });
        
    }, 2500);
}

// Handle custom order form submission
function handleCustomOrderSubmission(form) {
    const formData = new FormData(form);
    const orderData = {
        name: formData.get('custom-name') || document.getElementById('custom-name').value,
        email: formData.get('custom-email') || document.getElementById('custom-email').value,
        level: formData.get('custom-level') || document.getElementById('custom-level').value,
        goal: formData.get('custom-goal') || document.getElementById('custom-goal').value,
        requirements: formData.get('custom-requirements') || document.getElementById('custom-requirements').value,
        submittedAt: new Date().toISOString(),
        type: 'custom_order',
        status: 'pending'
    };
    
    // Validate form data
    if (!validateCustomOrderForm(orderData)) {
        return;
    }
    
    // Show loading state
    showFormLoading(form, 'Processing your request...');
    
    // Simulate form submission
    setTimeout(() => {
        // Store custom order in local storage
        const existingOrders = getFromLocalStorage('yanacademy_custom_orders', []);
        existingOrders.push(orderData);
        saveToLocalStorage('yanacademy_custom_orders', existingOrders);
        
        // Show success message
        showFormSuccess(form, 'Thank you! Your custom program request has been submitted. Our team will contact you within 2 business days with a personalized proposal.');
        
        // Reset form
        form.reset();
        hideFormLoading(form);
        
        showNotification('Custom program request submitted!', 'success');
        
        // Update user preferences
        updateUserPreferences({
            hasRequestedCustomProgram: true,
            lastCustomOrderDate: new Date().toISOString(),
            preferredLearningGoal: orderData.goal,
            currentLevel: orderData.level
        });
        
    }, 3000);
}

// Form validation functions
function validateContactForm(data) {
    if (!data.name.trim()) {
        showNotification('Please enter your name!', 'error');
        return false;
    }
    
    if (!data.email.trim() || !validateEmail(data.email)) {
        showNotification('Please enter a valid email address!', 'error');
        return false;
    }
    
    if (!data.subject) {
        showNotification('Please select a subject!', 'error');
        return false;
    }
    
    if (!data.message.trim()) {
        showNotification('Please enter your message!', 'error');
        return false;
    }
    
    if (data.phone && !validatePhone(data.phone)) {
        showNotification('Please enter a valid phone number!', 'error');
        return false;
    }
    
    return true;
}

function validateCustomOrderForm(data) {
    if (!data.name.trim()) {
        showNotification('Please enter your name!', 'error');
        return false;
    }
    
    if (!data.email.trim() || !validateEmail(data.email)) {
        showNotification('Please enter a valid email address!', 'error');
        return false;
    }
    
    if (!data.level) {
        showNotification('Please select your current Spanish level!', 'error');
        return false;
    }
    
    if (!data.goal) {
        showNotification('Please select your learning goal!', 'error');
        return false;
    }
    
    return true;
}

// Add form validation with real-time feedback
function addFormValidation(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        // Add blur validation
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        // Add input validation for email and phone
        if (input.type === 'email') {
            input.addEventListener('input', function() {
                if (this.value) {
                    const isValid = validateEmail(this.value);
                    toggleFieldValidation(this, isValid);
                }
            });
        }
        
        if (input.type === 'tel') {
            input.addEventListener('input', function() {
                if (this.value) {
                    const isValid = validatePhone(this.value);
                    toggleFieldValidation(this, isValid);
                }
            });
        }
    });
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    if (field.required && !value) {
        isValid = false;
    } else if (field.type === 'email' && value && !validateEmail(value)) {
        isValid = false;
    } else if (field.type === 'tel' && value && !validatePhone(value)) {
        isValid = false;
    }
    
    toggleFieldValidation(field, isValid);
    return isValid;
}

// Toggle field validation styling
function toggleFieldValidation(field, isValid) {
    const errorClass = 'field-error';
    const successClass = 'field-success';
    
    field.classList.remove(errorClass, successClass);
    
    if (field.value.trim()) {
        field.classList.add(isValid ? successClass : errorClass);
    }
}

// Add dynamic form behavior
function addDynamicFormBehavior(form) {
    const levelSelect = document.getElementById('custom-level');
    const goalSelect = document.getElementById('custom-goal');
    const requirementsTextarea = document.getElementById('custom-requirements');
    
    // Update placeholder text based on selections
    if (levelSelect && requirementsTextarea) {
        levelSelect.addEventListener('change', function() {
            updateRequirementsPlaceholder();
        });
    }
    
    if (goalSelect && requirementsTextarea) {
        goalSelect.addEventListener('change', function() {
            updateRequirementsPlaceholder();
        });
    }
    
    function updateRequirementsPlaceholder() {
        const level = levelSelect ? levelSelect.value : '';
        const goal = goalSelect ? goalSelect.value : '';
        
        let placeholder = 'Tell us about your specific needs, timeline, and any special requirements...';
        
        if (level && goal) {
            const suggestions = getCourseSuggestions(level, goal);
            placeholder = `Based on your ${level} level and ${goal} goal, please tell us:\n${suggestions}`;
        }
        
        if (requirementsTextarea) {
            requirementsTextarea.placeholder = placeholder;
        }
    }
    
    function getCourseSuggestions(level, goal) {
        const suggestions = {
            'complete-beginner': {
                'travel': '- Which countries are you planning to visit?\n- How much time can you dedicate to learning?\n- Any specific travel scenarios you want to practice?',
                'business': '- What industry do you work in?\n- Do you need formal business correspondence skills?\n- Any specific business scenarios to focus on?',
                'conversation': '- How much time can you practice speaking daily?\n- Any specific topics you want to discuss?\n- Preferred learning schedule?'
            },
            'intermediate': {
                'travel': '- What aspects of travel Spanish need improvement?\n- Preferred learning intensity and timeline?\n- Any specific regions or dialects of interest?',
                'business': '- What business skills need refinement?\n- Any industry-specific vocabulary needs?\n- Timeline for achieving proficiency?'
            },
            'advanced': {
                'exam-prep': '- Which exam are you preparing for (DELE, SIELE)?\n- Target exam date and score?\n- Areas needing the most improvement?',
                'professional': '- What professional context requires Spanish?\n- Need for specialized terminology?\n- Timeline and intensity preferences?'
            }
        };
        
        return suggestions[level]?.[goal] || '- Your specific learning objectives and timeline\n- Any areas you want to focus on or avoid\n- Preferred learning style and schedule';
    }
}

// Initialize team interactions
function initializeTeamInteractions() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('click', function() {
            showTeamMemberDetails(this);
        });
        
        // Add hover effect for team member images
        const img = member.querySelector('img');
        if (img) {
            img.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            img.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        }
    });
}

// Show team member details (could be expanded to show modal with more info)
function showTeamMemberDetails(memberElement) {
    const name = memberElement.querySelector('span').textContent;
    const row = memberElement.closest('tr');
    const position = row.children[1].textContent;
    const experience = row.children[2].textContent;
    const specialization = row.children[3].textContent;
    const country = row.children[4].textContent;
    
    showNotification(`${name} - ${position} from ${country}. Specializes in ${specialization} with ${experience} of experience.`, 'info');
}

// Initialize stat counters with animation
function initializeStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const text = element.textContent;
        const hasPlus = text.includes('+');
        const hasPercent = text.includes('%');
        const target = parseInt(text.replace(/[^\d]/g, ''));
        
        if (isNaN(target)) return;
        
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                let displayValue = Math.floor(current);
                if (hasPercent) displayValue += '%';
                if (hasPlus) displayValue += '+';
                element.textContent = displayValue;
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = text; // Restore original text
            }
        };
        
        updateCounter();
    };
    
    // Observe stat numbers and animate when visible
    if ('IntersectionObserver' in window) {
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                    entry.target.setAttribute('data-animated', 'true');
                    setTimeout(() => {
                        animateCounter(entry.target);
                    }, 300);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => {
            statObserver.observe(stat);
        });
    }
}

// Form utility functions
function showFormLoading(form, message) {
    const submitBtn = form.querySelector('.btn[type="submit"]');
    if (submitBtn) {
        submitBtn.dataset.originalText = submitBtn.textContent;
        submitBtn.textContent = message;
        submitBtn.disabled = true;
    }
    form.classList.add('form-loading');
}

function hideFormLoading(form) {
    const submitBtn = form.querySelector('.btn[type="submit"]');
    if (submitBtn && submitBtn.dataset.originalText) {
        submitBtn.textContent = submitBtn.dataset.originalText;
        submitBtn.disabled = false;
        delete submitBtn.dataset.originalText;
    }
    form.classList.remove('form-loading');
}

function showFormSuccess(form, message) {
    // Remove existing messages
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const successMessage = document.createElement('div');
    successMessage.className = 'form-message success';
    successMessage.innerHTML = message;
    
    form.insertBefore(successMessage, form.firstChild);
    
    // Remove message after 8 seconds
    setTimeout(() => {
        if (successMessage.parentNode) {
            successMessage.remove();
        }
    }, 8000);
}

// Animation utility functions
function observeAndAnimate(selector, animationFunction, delay = 0) {
    const elements = document.querySelectorAll(selector);
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                    entry.target.setAttribute('data-animated', 'true');
                    setTimeout(() => {
                        animationFunction(entry.target);
                    }, delay * index);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        elements.forEach((element, index) => {
            setTimeout(() => {
                animationFunction(element);
            }, delay * index);
        });
    }
}

// Animation functions
function animateSlideInLeft(element) {
    element.style.transform = 'translateX(-50px)';
    element.style.opacity = '0';
    element.style.transition = 'all 0.6s ease-out';
    
    setTimeout(() => {
        element.style.transform = 'translateX(0)';
        element.style.opacity = '1';
    }, 100);
}

function animateSlideInRight(element) {
    element.style.transform = 'translateX(50px)';
    element.style.opacity = '0';
    element.style.transition = 'all 0.6s ease-out';
    
    setTimeout(() => {
        element.style.transform = 'translateX(0)';
        element.style.opacity = '1';
    }, 100);
}

function animateSlideInUp(element) {
    element.style.transform = 'translateY(30px)';
    element.style.opacity = '0';
    element.style.transition = 'all 0.6s ease-out';
    
    setTimeout(() => {
        element.style.transform = 'translateY(0)';
        element.style.opacity = '1';
    }, 100);
}

function animateFadeIn(element) {
    element.style.opacity = '0';
    element.style.transition = 'opacity 0.8s ease-out';
    
    setTimeout(() => {
        element.style.opacity = '1';
    }, 100);
}

// Update user preferences utility
function updateUserPreferences(newPreferences) {
    const currentPreferences = getFromSessionStorage('yanacademy_preferences', {});
    const updatedPreferences = { ...currentPreferences, ...newPreferences };
    saveToSessionStorage('yanacademy_preferences', updatedPreferences);
}

// Add CSS for form validation styles
const style = document.createElement('style');
style.textContent = `
    .field-error {
        border-color: #F18F01 !important;
        box-shadow: 0 0 0 3px rgba(241, 143, 1, 0.1) !important;
    }
    
    .field-success {
        border-color: #06D6A0 !important;
        box-shadow: 0 0 0 3px rgba(6, 214, 160, 0.1) !important;
    }
    
    .form-loading {
        opacity: 0.7;
        pointer-events: none;
    }
    
    .form-loading .btn::after {
        content: '';
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-left: 8px;
        border: 2px solid currentColor;
        border-radius: 50%;
        border-top-color: transparent;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);