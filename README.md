# YANACADEMY - Documentation du Projet

## 📋 Table des Matières
1. [Vue d'ensemble du projet](#vue-densemble-du-projet)
2. [Architecture technique](#architecture-technique)
3. [Structure des fichiers](#structure-des-fichiers)
4. [Pages et fonctionnalités](#pages-et-fonctionnalités)
5. [Technologies utilisées](#technologies-utilisées)
6. [Guide d'installation](#guide-dinstallation)
7. [Guide de développement](#guide-de-développement)
8. [Fonctionnalités JavaScript](#fonctionnalités-javascript)
9. [Stockage des données](#stockage-des-données)
10. [Design et accessibilité](#design-et-accessibilité)
11. [Responsive Design](#responsive-design)
12. [Tests et validation](#tests-et-validation)
13. [Déploiement](#déploiement)

---

## 🎯 Vue d'ensemble du projet

**YANACADEMY** est une plateforme d'apprentissage de l'espagnol en ligne conçue pour une petite entreprise éducative. Le site web offre une expérience utilisateur moderne et interactive pour promouvoir les cours d'espagnol et faciliter l'engagement des clients.

### Objectifs du client
- **Promotion des produits** : Présenter la gamme de cours d'espagnol de manière visuellement attrayante
- **Engagement** : Attirer les clients potentiels et les encourager à prendre contact
- **Contact** : Faciliter les demandes de renseignements et les commandes personnalisées

### Fonctionnalités principales
- Catalogue de cours interactif avec système de panier
- Système d'inscription à la newsletter
- Galerie filtrable avec témoignages d'étudiants
- Formulaires de contact et de commandes personnalisées
- Interface responsive pour tous les appareils

---

## 🏗️ Architecture technique

### Structure générale
```
YANACADEMY/
├── Pages HTML (4 pages principales)
├── Styles CSS (modulaires et organisés)
├── Scripts JavaScript (fonctionnalités interactives)
├── Assets (images via Pexels)
└── Configuration (responsive et accessibilité)
```

### Approche de développement
- **Mobile-first** : Conception responsive prioritaire mobile
- **Progressive Enhancement** : Amélioration progressive des fonctionnalités
- **Modularité** : Code organisé en modules réutilisables
- **Accessibilité** : Conformité aux standards WCAG 2.1

---

## 📁 Structure des fichiers

```
/
├── index.html                 # Page d'accueil
├── gallery.html              # Galerie d'images
├── about.html                 # À propos et contact
├── courses.html               # Catalogue de cours
├── styles/
│   ├── main.css              # Styles globaux et variables
│   ├── home.css              # Styles spécifiques à l'accueil
│   ├── gallery.css           # Styles de la galerie
│   ├── about.css             # Styles de la page à propos
│   └── courses.css           # Styles du catalogue
├── scripts/
│   ├── main.js               # Fonctionnalités globales
│   ├── home.js               # Interactions de l'accueil
│   ├── gallery.js            # Fonctionnalités de la galerie
│   ├── about.js              # Formulaires et animations
│   └── courses.js            # Filtrage et panier
└── README.md                 # Documentation
```

---

## 📄 Pages et fonctionnalités

### 1. Page d'accueil (index.html)
**Objectif** : Présenter l'académie et attirer les visiteurs

**Sections principales :**
- **Hero Section** : Titre accrocheur avec appel à l'action
- **Fonctionnalités** : Avantages de l'apprentissage avec YANACADEMY
- **Aperçu des cours** : Présentation des cours populaires
- **Témoignages** : Avis d'étudiants satisfaits
- **Newsletter** : Inscription aux actualités

**Fonctionnalités interactives :**
- Animations d'entrée progressives
- Boutons d'ajout au panier
- Modal d'inscription newsletter
- Défilement fluide vers les sections

### 2. Galerie (gallery.html)
**Objectif** : Montrer la communauté d'apprentissage et les réussites

**Sections principales :**
- **Filtres** : Catégorisation par type (classe, événements, étudiants, matériel)
- **Grille d'images** : Présentation visuelle avec overlays informatifs
- **Statistiques** : Chiffres de réussite de l'académie
- **Formulaire de feedback** : Collecte d'avis clients

**Fonctionnalités interactives :**
- Filtrage en temps réel des images
- Modal d'agrandissement des images
- Animations au survol
- Validation de formulaire

### 3. À propos (about.html)
**Objectif** : Établir la crédibilité et faciliter le contact

**Sections principales :**
- **Notre histoire** : Présentation de l'académie
- **Mission et valeurs** : Philosophie éducative
- **Équipe** : Présentation des instructeurs
- **Statistiques** : Métriques de performance
- **Contact** : Formulaire de contact détaillé
- **Commandes personnalisées** : Demandes de programmes sur mesure

**Fonctionnalités interactives :**
- Animations d'apparition au défilement
- Compteurs animés pour les statistiques
- Validation de formulaires en temps réel
- Stockage des demandes de contact

### 4. Cours (courses.html)
**Objectif** : Présenter l'offre de formation et faciliter l'achat

**Sections principales :**
- **Filtres** : Par niveau, durée et prix
- **Catalogue** : Grille de cours avec détails
- **Bundles** : Offres groupées avec réductions
- **Parcours d'apprentissage** : Progression recommandée
- **Offres spéciales** : Promotions et codes de réduction

**Fonctionnalités interactives :**
- Filtrage multicritères
- Système de panier complet
- Calcul automatique des réductions
- Recommandations personnalisées

---

## 💻 Technologies utilisées

### Frontend
- **HTML5** : Structure sémantique et accessible
- **CSS3** : Styles modernes avec variables CSS et Flexbox/Grid
- **JavaScript ES6+** : Fonctionnalités interactives et manipulation DOM

### Bibliothèques et frameworks
- **Google Fonts** : Typographie (Poppins, Open Sans)
- **Pexels** : Images stock de haute qualité
- **Web Storage API** : Stockage local et session

### Outils de développement
- **Vite** : Serveur de développement rapide
- **ESLint** : Analyse de code JavaScript
- **Responsive Design** : Breakpoints à 768px et 1024px

---

## 🚀 Guide d'installation

### Prérequis
- Navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Serveur web local (optionnel pour le développement)

### Installation locale
```bash
# Cloner le projet
git clone [URL_DU_PROJET]

# Naviguer dans le dossier
cd yanacademy

# Ouvrir avec un serveur local (optionnel)
npx serve .
# ou
python -m http.server 8000
```

### Accès direct
Le site est déployé et accessible à : https://yanacademy-spanish-l-vcd5.bolt.host

---

## 🛠️ Guide de développement

### Structure CSS
```css
/* Variables globales dans main.css */
:root {
  --primary-color: #E07A5F;    /* Terracotta */
  --secondary-color: #3D5A80;  /* Bleu profond */
  --accent-color: #81B29A;     /* Vert forêt */
  --success-color: #06D6A0;    /* Vert succès */
  --warning-color: #FFD23F;    /* Jaune attention */
  --error-color: #F18F01;      /* Orange erreur */
}
```

### Conventions de nommage
- **Classes CSS** : kebab-case (ex: `.course-card`)
- **IDs** : kebab-case (ex: `#nav-menu`)
- **Variables JavaScript** : camelCase (ex: `cartItems`)
- **Fonctions** : camelCase (ex: `addToCart()`)

### Bonnes pratiques
- Code modulaire et réutilisable
- Commentaires explicatifs
- Validation des entrées utilisateur
- Gestion d'erreurs appropriée
- Performance optimisée

---

## ⚡ Fonctionnalités JavaScript

### 1. Navigation
```javascript
// Navigation responsive avec menu hamburger
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}
```

### 2. Système de panier
```javascript
// Ajout d'articles au panier avec stockage local
function addToCart(course) {
    const existingItem = cart.find(item => item.id === course.id);
    
    if (!existingItem) {
        cart.push(course);
        localStorage.setItem('yanacademy_cart', JSON.stringify(cart));
        updateCartCount();
        showNotification('Ajouté au panier!', 'success');
    }
}
```

### 3. Newsletter
```javascript
// Inscription newsletter avec validation
function handleNewsletterSubscription(email, name = '', level = '') {
    if (!validateEmail(email)) {
        showNotification('Email invalide!', 'error');
        return false;
    }
    
    const subscriptions = getFromLocalStorage('yanacademy_subscriptions', []);
    subscriptions.push({
        email, name, level,
        subscribedAt: new Date().toISOString()
    });
    
    saveToLocalStorage('yanacademy_subscriptions', subscriptions);
    return true;
}
```

### 4. Filtrage de cours
```javascript
// Filtrage en temps réel des cours
function filterCourses() {
    const levelValue = levelFilter.value;
    const durationValue = durationFilter.value;
    const priceValue = priceFilter.value;
    
    courseCards.forEach(card => {
        const matches = (
            (!levelValue || card.dataset.level === levelValue) &&
            (!durationValue || card.dataset.duration === durationValue) &&
            (!priceValue || card.dataset.price === priceValue)
        );
        
        card.style.display = matches ? 'block' : 'none';
    });
}
```

---

## 💾 Stockage des données

### Local Storage
Utilisé pour les données persistantes :
- **Panier d'achat** : `yanacademy_cart`
- **Abonnements newsletter** : `yanacademy_subscriptions`
- **Feedback clients** : `yanacademy_feedback`
- **Demandes de contact** : `yanacademy_inquiries`

### Session Storage
Utilisé pour les données temporaires :
- **Préférences utilisateur** : `yanacademy_preferences`
- **Historique des filtres** : `yanacademy_filter_history`
- **Interactions cours** : `yanacademy_course_interactions`

### Structure des données
```javascript
// Exemple d'article dans le panier
{
    id: "beginner",
    name: "Spanish Fundamentals",
    price: 99,
    image: "https://...",
    addedAt: "2024-01-15T10:30:00.000Z"
}

// Exemple d'abonnement newsletter
{
    email: "user@example.com",
    name: "John Doe",
    level: "beginner",
    subscribedAt: "2024-01-15T10:30:00.000Z"
}
```

---

## 🎨 Design et accessibilité

### Palette de couleurs
- **Primaire** : #E07A5F (Terracotta chaleureux)
- **Secondaire** : #3D5A80 (Bleu professionnel)
- **Accent** : #81B29A (Vert apaisant)
- **Succès** : #06D6A0 (Vert confirmation)
- **Attention** : #FFD23F (Jaune alerte)
- **Erreur** : #F18F01 (Orange erreur)

### Typographie
- **Titres** : Poppins (600-700 weight)
- **Corps de texte** : Open Sans (400-600 weight)
- **Hiérarchie** : H1 (2.5rem) → H2 (2rem) → H3 (1.5rem)

### Accessibilité
- **Contraste** : Ratio minimum 4.5:1 pour le texte
- **Navigation clavier** : Tous les éléments interactifs
- **ARIA labels** : Boutons et formulaires
- **Alt text** : Toutes les images descriptives
- **Focus visible** : Indicateurs clairs

### Animations
- **Durées** : 0.3s pour les interactions, 0.6s pour les entrées
- **Easing** : ease-out pour les apparitions, ease-in-out pour les transitions
- **Respect des préférences** : `prefers-reduced-motion`

---

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile First Approach */
/* Base: 320px+ (mobile) */

@media (max-width: 768px) {
    /* Tablette et mobile large */
    .nav-menu {
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
    }
}

@media (max-width: 1024px) {
    /* Desktop petit */
    .hero {
        grid-template-columns: 1fr;
    }
}
```

### Adaptations mobiles
- **Navigation** : Menu hamburger avec overlay
- **Grilles** : Passage de 3 colonnes à 1 colonne
- **Formulaires** : Champs empilés verticalement
- **Images** : Redimensionnement automatique
- **Touch targets** : Minimum 44px pour les boutons

### Performance mobile
- **Images optimisées** : Lazy loading et formats appropriés
- **CSS critique** : Styles essentiels en priorité
- **JavaScript différé** : Chargement non-bloquant
- **Compression** : Minification des assets

---

## 🧪 Tests et validation

### Tests fonctionnels
- [x] Navigation entre toutes les pages
- [x] Ajout/suppression d'articles du panier
- [x] Soumission de formulaires
- [x] Filtrage des cours et galerie
- [x] Responsive design sur différents appareils

### Validation du code
- [x] HTML5 valide (W3C Validator)
- [x] CSS3 valide (W3C CSS Validator)
- [x] JavaScript sans erreurs (ESLint)
- [x] Accessibilité (WAVE, axe-core)

### Tests de performance
- [x] Temps de chargement < 3 secondes
- [x] Images optimisées (WebP quand possible)
- [x] CSS et JS minifiés
- [x] Lazy loading des images

### Tests d'accessibilité
- [x] Navigation au clavier
- [x] Lecteurs d'écran compatibles
- [x] Contraste des couleurs suffisant
- [x] Textes alternatifs présents

---

## 🚀 Déploiement

### Environnement de production
- **Hébergeur** : Bolt Hosting
- **URL** : https://yanacademy-spanish-l-vcd5.bolt.host
- **SSL** : Certificat automatique
- **CDN** : Distribution globale

### Processus de déploiement
1. **Build** : Optimisation des assets
2. **Test** : Validation finale
3. **Deploy** : Mise en ligne automatique
4. **Monitoring** : Surveillance des performances

### Maintenance
- **Sauvegardes** : Automatiques quotidiennes
- **Mises à jour** : Sécurité et fonctionnalités
- **Monitoring** : Uptime et performance
- **Support** : Documentation et assistance

---

## 📊 Métriques et analytics

### Données collectées
- **Interactions utilisateur** : Clics, formulaires, navigation
- **Performance** : Temps de chargement, erreurs
- **Engagement** : Temps passé, pages vues
- **Conversions** : Inscriptions, ajouts panier

### Stockage local des métriques
```javascript
// Exemple de tracking d'interaction
function trackInteraction(action, element) {
    const interaction = {
        action,
        element,
        timestamp: new Date().toISOString(),
        page: window.location.pathname
    };
    
    const interactions = getFromLocalStorage('yanacademy_interactions', []);
    interactions.push(interaction);
    saveToLocalStorage('yanacademy_interactions', interactions);
}
```

---

## 🔧 Maintenance et évolutions

### Maintenance régulière
- **Contenu** : Mise à jour des cours et prix
- **Images** : Renouvellement de la galerie
- **Témoignages** : Ajout de nouveaux avis
- **Offres** : Actualisation des promotions

### Évolutions possibles
- **Système de paiement** : Intégration Stripe/PayPal
- **Espace membre** : Connexion et suivi de progression
- **Chat en direct** : Support client instantané
- **Multilingue** : Version anglaise du site

### Support technique
- **Documentation** : Guides utilisateur et développeur
- **Formation** : Sessions pour l'équipe client
- **Assistance** : Support technique continu
- **Évolutions** : Développement de nouvelles fonctionnalités

---

## 📞 Contact et support

### Équipe de développement
- **Développeur principal** : [Nom]
- **Designer UX/UI** : [Nom]
- **Testeur QA** : [Nom]

### Ressources
- **Repository** : [URL Git]
- **Documentation** : Ce fichier README.md
- **Issues** : [URL du système de tickets]
- **Wiki** : [URL de la documentation étendue]

---

*Documentation mise à jour le : [Date actuelle]*
*Version du projet : 1.0.0*