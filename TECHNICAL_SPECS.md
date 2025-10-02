# YANACADEMY - Spécifications Techniques

## 📋 Résumé exécutif

YANACADEMY est une application web moderne développée pour une académie d'apprentissage de l'espagnol. Le projet utilise des technologies web standards (HTML5, CSS3, JavaScript ES6+) pour créer une expérience utilisateur riche et interactive.

## 🏗️ Architecture système

### Stack technologique
```
Frontend:
├── HTML5 (Structure sémantique)
├── CSS3 (Styles et animations)
├── JavaScript ES6+ (Interactivité)
└── Web APIs (Storage, Fetch, DOM)

Assets:
├── Google Fonts (Typographie)
├── Pexels Images (Contenu visuel)
└── SVG Icons (Interface)
```

### Patterns architecturaux
- **Module Pattern** : Organisation du code JavaScript
- **Observer Pattern** : Gestion des événements
- **MVC Pattern** : Séparation des préoccupations
- **Progressive Enhancement** : Amélioration progressive

## 📊 Structure des données

### Local Storage Schema
```javascript
// Panier d'achat
yanacademy_cart: [
    {
        id: string,
        name: string,
        price: number,
        image: string,
        addedAt: ISO8601
    }
]

// Abonnements newsletter
yanacademy_subscriptions: [
    {
        email: string,
        name: string,
        level: string,
        subscribedAt: ISO8601
    }
]

// Feedback clients
yanacademy_feedback: [
    {
        name: string,
        email: string,
        rating: number,
        message: string,
        submittedAt: ISO8601,
        page: string
    }
]
```

### Session Storage Schema
```javascript
// Préférences utilisateur
yanacademy_preferences: {
    email: string,
    name: string,
    level: string,
    hasContacted: boolean,
    lastContactDate: ISO8601
}

// Historique des filtres
yanacademy_filter_history: [
    {
        filter: string,
        value: string,
        timestamp: ISO8601,
        page: string
    }
]
```

## 🎨 Système de design

### Variables CSS
```css
:root {
    /* Couleurs principales */
    --primary-color: #E07A5F;      /* Terracotta */
    --secondary-color: #3D5A80;    /* Bleu profond */
    --accent-color: #81B29A;       /* Vert forêt */
    
    /* Couleurs fonctionnelles */
    --success-color: #06D6A0;      /* Succès */
    --warning-color: #FFD23F;      /* Attention */
    --error-color: #F18F01;        /* Erreur */
    
    /* Couleurs neutres */
    --white: #FFFFFF;
    --light-gray: #F2F2F2;
    --gray: #D1D5DB;
    --dark-gray: #6B7280;
    --black: #1F2937;
    
    /* Système d'espacement (8px base) */
    --space-xs: 8px;
    --space-sm: 16px;
    --space-md: 24px;
    --space-lg: 32px;
    --space-xl: 48px;
    --space-2xl: 64px;
    
    /* Ombres */
    --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
    
    /* Rayons de bordure */
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-xl: 16px;
    
    /* Transitions */
    --transition-fast: 0.15s ease-in-out;
    --transition-normal: 0.3s ease-in-out;
    --transition-slow: 0.5s ease-in-out;
}
```

### Grille responsive
```css
/* Breakpoints */
@media (max-width: 480px)  { /* Mobile */ }
@media (max-width: 768px)  { /* Tablette */ }
@media (max-width: 1024px) { /* Desktop petit */ }
@media (min-width: 1025px) { /* Desktop large */ }

/* Système de grille */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--space-sm);
}

.grid {
    display: grid;
    gap: var(--space-lg);
}

.grid-auto-fit {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
```

## ⚡ Performance et optimisation

### Métriques cibles
- **First Contentful Paint** : < 1.5s
- **Largest Contentful Paint** : < 2.5s
- **Cumulative Layout Shift** : < 0.1
- **First Input Delay** : < 100ms

### Optimisations implémentées
```javascript
// Lazy loading des images
const images = document.querySelectorAll('img[loading="lazy"]');
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Debouncing pour les filtres
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedFilter = debounce(filterCourses, 300);
```

### Stratégies de cache
```javascript
// Service Worker pour le cache (future implémentation)
const CACHE_NAME = 'yanacademy-v1';
const urlsToCache = [
    '/',
    '/styles/main.css',
    '/scripts/main.js',
    // ... autres assets critiques
];
```

## 🔒 Sécurité et validation

### Validation côté client
```javascript
// Validation d'email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validation de téléphone
function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
}

// Sanitisation des entrées
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}
```

### Protection XSS
```javascript
// Échappement HTML
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Validation des données avant stockage
function validateAndStore(key, data) {
    try {
        const sanitizedData = typeof data === 'string' 
            ? sanitizeInput(data) 
            : data;
        localStorage.setItem(key, JSON.stringify(sanitizedData));
        return true;
    } catch (error) {
        console.error('Storage error:', error);
        return false;
    }
}
```

## 🧪 Tests et qualité

### Tests unitaires (structure)
```javascript
// Framework de test simple
class TestSuite {
    constructor(name) {
        this.name = name;
        this.tests = [];
    }
    
    test(description, testFunction) {
        this.tests.push({ description, testFunction });
    }
    
    run() {
        console.log(`Running ${this.name} tests...`);
        this.tests.forEach(({ description, testFunction }) => {
            try {
                testFunction();
                console.log(`✓ ${description}`);
            } catch (error) {
                console.error(`✗ ${description}: ${error.message}`);
            }
        });
    }
}

// Exemple de tests
const cartTests = new TestSuite('Shopping Cart');

cartTests.test('should add item to cart', () => {
    const initialLength = cart.length;
    addToCart({ id: 'test', name: 'Test Course', price: 99 });
    if (cart.length !== initialLength + 1) {
        throw new Error('Item not added to cart');
    }
});
```

### Métriques de qualité
```javascript
// Monitoring des erreurs
window.addEventListener('error', (event) => {
    const errorData = {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        timestamp: new Date().toISOString()
    };
    
    // Stocker ou envoyer les erreurs
    const errors = getFromLocalStorage('yanacademy_errors', []);
    errors.push(errorData);
    saveToLocalStorage('yanacademy_errors', errors);
});

// Métriques de performance
function measurePerformance() {
    if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0];
        const metrics = {
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
            timestamp: new Date().toISOString()
        };
        
        saveToSessionStorage('yanacademy_performance', metrics);
    }
}
```

## 🔧 APIs et intégrations

### Web APIs utilisées
```javascript
// Local Storage API
const storage = {
    set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    get: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch {
            return defaultValue;
        }
    },
    remove: (key) => localStorage.removeItem(key)
};

// Intersection Observer API
const observeElements = (selector, callback, options = {}) => {
    const elements = document.querySelectorAll(selector);
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(callback, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
            ...options
        });
        
        elements.forEach(el => observer.observe(el));
        return observer;
    }
    
    // Fallback pour navigateurs non supportés
    elements.forEach(el => callback([{ target: el, isIntersecting: true }]));
};

// Fetch API (pour futures intégrations)
const apiClient = {
    async post(url, data) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
};
```

## 📱 Responsive Design détaillé

### Breakpoints et stratégies
```css
/* Mobile First - Base styles pour mobile */
.hero {
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: var(--space-lg) 0;
}

.courses-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-md);
}

/* Tablette - 768px et plus */
@media (min-width: 768px) {
    .courses-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-lg);
    }
    
    .hero {
        flex-direction: row;
        text-align: left;
    }
}

/* Desktop - 1024px et plus */
@media (min-width: 1024px) {
    .courses-grid {
        grid-template-columns: repeat(3, 1fr);
    }
    
    .hero {
        padding: var(--space-2xl) 0;
    }
}

/* Large Desktop - 1200px et plus */
@media (min-width: 1200px) {
    .container {
        max-width: 1200px;
    }
}
```

### Touch et interactions mobiles
```javascript
// Gestion des événements tactiles
function initTouchEvents() {
    let startY = 0;
    let startX = 0;
    
    document.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
        startX = e.touches[0].clientX;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        const endY = e.changedTouches[0].clientY;
        const endX = e.changedTouches[0].clientX;
        
        const deltaY = startY - endY;
        const deltaX = startX - endX;
        
        // Détection de swipe
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 50) {
                // Swipe left
                handleSwipeLeft();
            } else if (deltaX < -50) {
                // Swipe right
                handleSwipeRight();
            }
        }
    }, { passive: true });
}

// Optimisation des targets tactiles
function optimizeTouchTargets() {
    const buttons = document.querySelectorAll('button, .btn, .nav-link');
    buttons.forEach(button => {
        const rect = button.getBoundingClientRect();
        if (rect.height < 44 || rect.width < 44) {
            button.style.minHeight = '44px';
            button.style.minWidth = '44px';
        }
    });
}
```

## 🚀 Déploiement et CI/CD

### Configuration de build
```javascript
// Configuration Vite (si utilisé)
export default {
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        minify: 'terser',
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['some-library'],
                    utils: ['./src/utils/index.js']
                }
            }
        }
    },
    server: {
        port: 3000,
        open: true
    }
};
```

### Scripts de déploiement
```bash
#!/bin/bash
# deploy.sh

echo "🚀 Déploiement YANACADEMY"

# Validation du code
echo "📋 Validation HTML..."
html5validator --root . --also-check-css

# Optimisation des images
echo "🖼️ Optimisation des images..."
find . -name "*.jpg" -exec jpegoptim --max=85 {} \;
find . -name "*.png" -exec optipng -o2 {} \;

# Minification CSS/JS
echo "📦 Minification..."
cleancss -o dist/styles/main.min.css styles/*.css
uglifyjs scripts/*.js -o dist/scripts/main.min.js

# Upload vers le serveur
echo "📤 Upload..."
rsync -avz --delete dist/ user@server:/var/www/yanacademy/

echo "✅ Déploiement terminé!"
```

## 📊 Monitoring et analytics

### Métriques personnalisées
```javascript
// Système de tracking personnalisé
class Analytics {
    constructor() {
        this.events = [];
        this.sessionStart = Date.now();
    }
    
    track(event, properties = {}) {
        const eventData = {
            event,
            properties,
            timestamp: new Date().toISOString(),
            sessionId: this.getSessionId(),
            userId: this.getUserId(),
            page: window.location.pathname
        };
        
        this.events.push(eventData);
        this.saveToStorage();
    }
    
    trackPageView() {
        this.track('page_view', {
            url: window.location.href,
            title: document.title,
            referrer: document.referrer
        });
    }
    
    trackUserAction(action, element) {
        this.track('user_action', {
            action,
            element: element.tagName.toLowerCase(),
            elementId: element.id,
            elementClass: element.className
        });
    }
    
    getSessionId() {
        let sessionId = sessionStorage.getItem('yanacademy_session_id');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('yanacademy_session_id', sessionId);
        }
        return sessionId;
    }
    
    getUserId() {
        let userId = localStorage.getItem('yanacademy_user_id');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('yanacademy_user_id', userId);
        }
        return userId;
    }
    
    saveToStorage() {
        localStorage.setItem('yanacademy_analytics', JSON.stringify(this.events));
    }
    
    getReport() {
        return {
            totalEvents: this.events.length,
            sessionDuration: Date.now() - this.sessionStart,
            events: this.events
        };
    }
}

// Initialisation
const analytics = new Analytics();

// Tracking automatique
document.addEventListener('DOMContentLoaded', () => {
    analytics.trackPageView();
});

document.addEventListener('click', (e) => {
    if (e.target.matches('button, .btn, a')) {
        analytics.trackUserAction('click', e.target);
    }
});
```

## 🔮 Évolutions futures

### Roadmap technique
1. **Phase 2** : Intégration système de paiement
2. **Phase 3** : Espace membre avec authentification
3. **Phase 4** : API REST pour gestion de contenu
4. **Phase 5** : Application mobile (PWA)

### Améliorations prévues
```javascript
// Service Worker pour PWA
const CACHE_NAME = 'yanacademy-pwa-v1';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll([
                '/',
                '/styles/main.css',
                '/scripts/main.js',
                '/manifest.json'
            ]))
    );
});

// Notifications push
function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                // Configurer les notifications
                setupPushNotifications();
            }
        });
    }
}

// Géolocalisation pour cours locaux
function findNearbyClasses() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            // Rechercher des cours à proximité
            searchNearbyClasses(latitude, longitude);
        });
    }
}
```

---

*Spécifications techniques - Version 1.0.0*
*Dernière mise à jour : [Date actuelle]*