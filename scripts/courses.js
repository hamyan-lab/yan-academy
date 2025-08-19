// Courses page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeCourseFilters();
    initializeCoursesAnimations();
    initializeBundleInteractions();
    initializeOfferTracking();
    initializeLearningPath();
});

// Initialize course filtering system
function initializeCourseFilters() {
    const levelFilter = document.getElementById('level-filter');
    const durationFilter = document.getElementById('duration-filter');
    const priceFilter = document.getElementById('price-filter');
    const courseCards = document.querySelectorAll('.course-card');
    const noResults = document.getElementById('no-results');
    
    // Add event listeners to all filters
    [levelFilter, durationFilter, priceFilter].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', () => {
                filterCourses();
                trackFilterUsage(filter.id, filter.value);
            });
        }
    });
    
    // Clear filters button
    const clearFiltersBtn = document.querySelector('[onclick="clearFilters()"]');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearFilters);
    }
    
    function filterCourses() {
        const levelValue = levelFilter ? levelFilter.value : '';
        const durationValue = durationFilter ? durationFilter.value : '';
        const priceValue = priceFilter ? priceFilter.value : '';
        
        let visibleCount = 0;
        
        courseCards.forEach(card => {
            let showCard = true;
            
            // Level filter
            if (levelValue) {
                const cardLevel = card.getAttribute('data-level');
                if (cardLevel !== levelValue) {
                    showCard = false;
                }
            }
            
            // Duration filter
            if (durationValue && showCard) {
                const cardDuration = card.getAttribute('data-duration');
                if (cardDuration !== durationValue) {
                    showCard = false;
                }
            }
            
            // Price filter
            if (priceValue && showCard) {
                const cardPrice = card.getAttribute('data-price');
                if (cardPrice !== priceValue) {
                    showCard = false;
                }
            }
            
            // Show/hide card with animation
            if (showCard) {
                card.classList.remove('hidden');
                card.style.animation = 'slideInUp 0.4s ease-out forwards';
                visibleCount++;
            } else {
                card.style.animation = 'fadeOut 0.3s ease-out forwards';
                setTimeout(() => {
                    card.classList.add('hidden');
                }, 300);
            }
        });
        
        // Show/hide no results message
        if (noResults) {
            if (visibleCount === 0) {
                noResults.style.display = 'block';
                noResults.style.animation = 'slideInUp 0.4s ease-out forwards';
            } else {
                noResults.style.display = 'none';
            }
        }
        
        // Update filter summary in session storage
        updateFilterSummary(levelValue, durationValue, priceValue, visibleCount);
    }
}

// Clear all filters
function clearFilters() {
    const filters = [
        document.getElementById('level-filter'),
        document.getElementById('duration-filter'),
        document.getElementById('price-filter')
    ];
    
    filters.forEach(filter => {
        if (filter) {
            filter.value = '';
        }
    });
    
    // Show all courses
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach((card, index) => {
        card.classList.remove('hidden');
        card.style.animation = `slideInUp 0.4s ease-out ${index * 0.05}s forwards`;
    });
    
    // Hide no results message
    const noResults = document.getElementById('no-results');
    if (noResults) {
        noResults.style.display = 'none';
    }
    
    showNotification('Filters cleared!', 'info');
    trackFilterUsage('clear_all', 'cleared');
}

// Initialize courses page animations
function initializeCoursesAnimations() {
    // Animate filter controls on load
    const filterControls = document.querySelector('.filter-controls');
    if (filterControls) {
        filterControls.style.opacity = '0';
        filterControls.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            filterControls.style.transition = 'all 0.5s ease-out';
            filterControls.style.opacity = '1';
            filterControls.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Animate course cards on load
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 400 + (index * 50));
    });
    
    // Animate other sections on scroll
    observeAndAnimateSection('.course-bundles', animateSlideInUp);
    observeAndAnimateSection('.learning-path', animateSlideInUp);
    observeAndAnimateSection('.special-offers', animateSlideInUp);
}

// Initialize bundle interactions
function initializeBundleInteractions() {
    const bundleCards = document.querySelectorAll('.bundle-card');
    
    bundleCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click tracking
        const addToCartBtn = card.querySelector('.add-to-cart');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function() {
                trackBundleInteraction('add_to_cart', this.dataset.course);
            });
        }
    });
}

// Initialize offer tracking
function initializeOfferTracking() {
    const offerCards = document.querySelectorAll('.offer-card');
    
    offerCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const offerType = this.querySelector('.offer-badge').textContent.toLowerCase();
            trackOfferInteraction('click', offerType);
            
            // Show offer details
            showOfferDetails(offerType);
        });
        
        // Add entrance animation with stagger
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 1000 + (index * 200));
    });
}

// Initialize learning path interactions
function initializeLearningPath() {
    const pathSteps = document.querySelectorAll('.path-step');
    
    pathSteps.forEach((step, index) => {
        step.addEventListener('click', function() {
            showLearningPathDetails(index + 1);
        });
        
        // Add interactive hover effects
        step.addEventListener('mouseenter', function() {
            const stepNumber = this.querySelector('.step-number');
            if (stepNumber) {
                stepNumber.style.transform = 'scale(1.1)';
                stepNumber.style.boxShadow = '0 8px 20px rgba(224, 122, 95, 0.3)';
            }
        });
        
        step.addEventListener('mouseleave', function() {
            const stepNumber = this.querySelector('.step-number');
            if (stepNumber) {
                stepNumber.style.transform = 'scale(1)';
                stepNumber.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }
        });
    });
    
    // Animate path steps on scroll
    observeAndAnimateSteps();
}

// Enhanced add to cart functionality
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('add-to-cart')) {
        const courseData = event.target.getAttribute('data-course');
        if (courseData) {
            const course = JSON.parse(courseData);
            
            // Add course to cart
            addToCart(course);
            
            // Track the interaction
            trackCourseInteraction('add_to_cart', course.id);
            
            // Add visual feedback
            addVisualFeedback(event.target);
            
            // Update course recommendations
            updateCourseRecommendations(course);
        }
    }
});

// Add visual feedback to button clicks
function addVisualFeedback(button) {
    const originalText = button.textContent;
    
    // Change button appearance
    button.style.background = 'linear-gradient(45deg, #06D6A0, #81B29A)';
    button.textContent = '✓ Added!';
    button.disabled = true;
    
    // Reset after 2 seconds
    setTimeout(() => {
        button.style.background = '';
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
}

// Update course recommendations based on user selections
function updateCourseRecommendations(selectedCourse) {
    const recommendations = getFromSessionStorage('yanacademy_recommendations', []);
    recommendations.push({
        selectedCourse: selectedCourse.id,
        timestamp: new Date().toISOString()
    });
    
    // Keep only last 10 interactions for recommendations
    if (recommendations.length > 10) {
        recommendations.splice(0, recommendations.length - 10);
    }
    
    saveToSessionStorage('yanacademy_recommendations', recommendations);
    
    // Show recommended courses if applicable
    showRecommendedCourses(selectedCourse);
}

// Show recommended courses
function showRecommendedCourses(baseCourse) {
    const recommendations = getCourseRecommendations(baseCourse);
    
    if (recommendations.length > 0) {
        setTimeout(() => {
            showNotification(`Based on your selection, you might also like: ${recommendations.join(', ')}`, 'info');
        }, 3000);
    }
}

// Get course recommendations logic
function getCourseRecommendations(baseCourse) {
    const recommendations = [];
    
    switch (baseCourse.id) {
        case 'beginner':
            recommendations.push('Conversational Spanish for Beginners');
            break;
        case 'intermediate':
            recommendations.push('Business Spanish', 'Spanish for Travelers');
            break;
        case 'advanced':
            recommendations.push('DELE/SIELE Exam Preparation');
            break;
        case 'business':
            recommendations.push('Advanced Spanish Fluency');
            break;
    }
    
    return recommendations;
}

// Show offer details
function showOfferDetails(offerType) {
    let message = '';
    
    switch (offerType) {
        case 'new student':
            message = 'New Student Offer: Use code WELCOME20 at checkout to get 20% off your first course!';
            break;
        case 'referral':
            message = 'Refer a Friend: Both you and your friend get 30% off when they enroll in any course!';
            break;
        case 'bundle deal':
            message = 'Bundle Savings: Automatic discounts applied when you purchase multiple courses together!';
            break;
        default:
            message = 'Special offer details will be applied automatically at checkout!';
    }
    
    showNotification(message, 'info');
}

// Show learning path details
function showLearningPathDetails(stepNumber) {
    const pathDetails = {
        1: 'Foundation Phase: Master basic Spanish vocabulary, essential phrases, and fundamental grammar. Perfect for complete beginners.',
        2: 'Building Phase: Develop conversation skills and learn specialized vocabulary. Choose between general conversation or specific areas like business or travel.',
        3: 'Advancing Phase: Complex grammar structures, cultural immersion, and advanced conversation techniques. Build fluency and confidence.',
        4: 'Mastery Phase: Achieve near-native proficiency with advanced courses or prepare for official Spanish certification exams.'
    };
    
    const detail = pathDetails[stepNumber];
    if (detail) {
        showNotification(`Step ${stepNumber}: ${detail}`, 'info');
    }
}

// Animate learning path steps
function observeAndAnimateSteps() {
    const pathSteps = document.querySelectorAll('.path-step');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                    entry.target.setAttribute('data-animated', 'true');
                    
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.opacity = '1';
                        
                        // Add ripple effect
                        const stepNumber = entry.target.querySelector('.step-number');
                        if (stepNumber) {
                            stepNumber.style.animation = 'pulse 1s ease-out';
                        }
                    }, index * 200);
                }
            });
        }, { threshold: 0.3 });
        
        pathSteps.forEach(step => {
            step.style.transform = 'translateY(30px)';
            step.style.opacity = '0';
            step.style.transition = 'all 0.6s ease-out';
            observer.observe(step);
        });
    }
}

// Utility function to observe and animate sections
function observeAndAnimateSection(selector, animationFunction) {
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
        elements.forEach(animationFunction);
    }
}

// Animation function
function animateSlideInUp(element) {
    element.style.transform = 'translateY(50px)';
    element.style.opacity = '0';
    element.style.transition = 'all 0.8s ease-out';
    
    setTimeout(() => {
        element.style.transform = 'translateY(0)';
        element.style.opacity = '1';
    }, 100);
}

// Tracking functions
function trackFilterUsage(filterId, value) {
    const filterData = {
        filter: filterId,
        value: value,
        timestamp: new Date().toISOString(),
        page: 'courses'
    };
    
    const filterHistory = getFromSessionStorage('yanacademy_filter_history', []);
    filterHistory.push(filterData);
    
    // Keep only last 50 filter interactions
    if (filterHistory.length > 50) {
        filterHistory.splice(0, filterHistory.length - 50);
    }
    
    saveToSessionStorage('yanacademy_filter_history', filterHistory);
}

function trackCourseInteraction(action, courseId) {
    const interactionData = {
        action,
        courseId,
        timestamp: new Date().toISOString(),
        page: 'courses'
    };
    
    const interactions = getFromSessionStorage('yanacademy_course_interactions', []);
    interactions.push(interactionData);
    saveToSessionStorage('yanacademy_course_interactions', interactions);
}

function trackBundleInteraction(action, bundleData) {
    const bundleInteraction = {
        action,
        bundle: JSON.parse(bundleData).name,
        timestamp: new Date().toISOString(),
        page: 'courses'
    };
    
    const bundleInteractions = getFromSessionStorage('yanacademy_bundle_interactions', []);
    bundleInteractions.push(bundleInteraction);
    saveToSessionStorage('yanacademy_bundle_interactions', bundleInteractions);
}

function trackOfferInteraction(action, offerType) {
    const offerData = {
        action,
        offerType,
        timestamp: new Date().toISOString(),
        page: 'courses'
    };
    
    const offerInteractions = getFromSessionStorage('yanacademy_offer_interactions', []);
    offerInteractions.push(offerData);
    saveToSessionStorage('yanacademy_offer_interactions', offerInteractions);
}

// Update filter summary
function updateFilterSummary(level, duration, price, resultCount) {
    const summary = {
        level,
        duration,
        price,
        resultCount,
        timestamp: new Date().toISOString()
    };
    
    saveToSessionStorage('yanacademy_current_filter', summary);
}

// Enhanced course card interactions
document.addEventListener('mouseover', function(event) {
    if (event.target.closest('.course-card')) {
        const card = event.target.closest('.course-card');
        const img = card.querySelector('img');
        const level = card.querySelector('.course-level');
        
        if (img) {
            img.style.transform = 'scale(1.05)';
        }
        
        if (level) {
            level.style.transform = 'scale(1.1)';
        }
    }
});

document.addEventListener('mouseout', function(event) {
    if (event.target.closest('.course-card')) {
        const card = event.target.closest('.course-card');
        const img = card.querySelector('img');
        const level = card.querySelector('.course-level');
        
        if (img) {
            img.style.transform = 'scale(1)';
        }
        
        if (level) {
            level.style.transform = 'scale(1)';
        }
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.9);
        }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .course-card img,
    .course-level {
        transition: transform 0.3s ease;
    }
    
    .path-step {
        cursor: pointer;
    }
    
    .path-step .step-number {
        transition: all 0.3s ease;
    }
    
    .bundle-card {
        transition: all 0.3s ease;
    }
    
    .offer-card {
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .offer-card:hover {
        transform: translateY(-4px);
    }
`;
document.head.appendChild(style);