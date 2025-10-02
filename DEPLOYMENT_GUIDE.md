# YANACADEMY - Guide de Déploiement

## 🚀 Vue d'ensemble du déploiement

Ce guide détaille les étapes pour déployer le site web YANACADEMY sur différentes plateformes d'hébergement. Le site est actuellement déployé sur Bolt Hosting et accessible à l'adresse : https://yanacademy-spanish-l-vcd5.bolt.host

## 📋 Prérequis

### Fichiers requis
- Tous les fichiers HTML (index.html, gallery.html, about.html, courses.html)
- Dossier `styles/` avec tous les fichiers CSS
- Dossier `scripts/` avec tous les fichiers JavaScript
- Fichiers de configuration (si applicable)

### Outils nécessaires
- Navigateur web moderne
- Client FTP/SFTP (FileZilla, WinSCP) ou accès SSH
- Éditeur de texte (VS Code, Sublime Text)
- Outil de validation HTML/CSS (optionnel)

## 🌐 Déploiement sur Bolt Hosting (Actuel)

### Configuration actuelle
- **URL** : https://yanacademy-spanish-l-vcd5.bolt.host
- **Type** : Hébergement statique
- **SSL** : Automatique
- **CDN** : Intégré

### Processus de déploiement
1. **Build automatique** : Les fichiers sont optimisés automatiquement
2. **Déploiement** : Upload automatique vers les serveurs
3. **Propagation CDN** : Distribution mondiale instantanée
4. **SSL** : Certificat généré automatiquement

### Avantages Bolt Hosting
- Déploiement en un clic
- SSL automatique
- CDN global intégré
- Pas de configuration serveur nécessaire
- Monitoring intégré

## 🔧 Déploiement sur d'autres plateformes

### 1. Netlify

#### Étapes de déploiement
```bash
# 1. Créer un compte sur netlify.com
# 2. Connecter votre repository Git ou upload manuel

# 3. Configuration de build (netlify.toml)
[build]
  publish = "."
  command = "echo 'No build required for static site'"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/gallery"
  to = "/gallery.html"
  status = 200

[[redirects]]
  from = "/about"
  to = "/about.html"
  status = 200

[[redirects]]
  from = "/courses"
  to = "/courses.html"
  status = 200

# 4. Headers pour sécurité
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

#### Commandes de déploiement
```bash
# Installation Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Déploiement
netlify deploy --prod --dir=.
```

### 2. Vercel

#### Configuration (vercel.json)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "**/*",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/gallery",
      "dest": "/gallery.html"
    },
    {
      "src": "/about",
      "dest": "/about.html"
    },
    {
      "src": "/courses",
      "dest": "/courses.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

#### Déploiement
```bash
# Installation Vercel CLI
npm install -g vercel

# Login
vercel login

# Déploiement
vercel --prod
```

### 3. GitHub Pages

#### Configuration
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

### 4. Hébergement traditionnel (cPanel/FTP)

#### Structure de fichiers sur le serveur
```
public_html/
├── index.html
├── gallery.html
├── about.html
├── courses.html
├── styles/
│   ├── main.css
│   ├── home.css
│   ├── gallery.css
│   ├── about.css
│   └── courses.css
├── scripts/
│   ├── main.js
│   ├── home.js
│   ├── gallery.js
│   ├── about.js
│   └── courses.js
└── .htaccess
```

#### Configuration .htaccess
```apache
# Compression GZIP
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache des fichiers statiques
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/gif "access plus 1 month"
</IfModule>

# Redirections pour URLs propres
RewriteEngine On
RewriteRule ^gallery/?$ gallery.html [L]
RewriteRule ^about/?$ about.html [L]
RewriteRule ^courses/?$ courses.html [L]

# Sécurité
Header always set X-Frame-Options DENY
Header always set X-Content-Type-Options nosniff
Header always set X-XSS-Protection "1; mode=block"
```

## 🔍 Optimisation pré-déploiement

### 1. Validation du code
```bash
# Validation HTML
html5validator --root . --also-check-css

# Validation CSS
csslint styles/*.css

# Validation JavaScript
eslint scripts/*.js
```

### 2. Optimisation des performances
```bash
# Minification CSS
cleancss -o styles/main.min.css styles/main.css
cleancss -o styles/home.min.css styles/home.css
cleancss -o styles/gallery.min.css styles/gallery.css
cleancss -o styles/about.min.css styles/about.css
cleancss -o styles/courses.min.css styles/courses.css

# Minification JavaScript
uglifyjs scripts/main.js -o scripts/main.min.js
uglifyjs scripts/home.js -o scripts/home.min.js
uglifyjs scripts/gallery.js -o scripts/gallery.min.js
uglifyjs scripts/about.js -o scripts/about.min.js
uglifyjs scripts/courses.js -o scripts/courses.min.js
```

### 3. Optimisation des images
```bash
# Optimisation JPEG
jpegoptim --max=85 --strip-all *.jpg

# Optimisation PNG
optipng -o2 *.png

# Conversion WebP (optionnel)
cwebp -q 80 image.jpg -o image.webp
```

## 📊 Monitoring et maintenance

### 1. Métriques à surveiller
- **Temps de chargement** : < 3 secondes
- **Disponibilité** : > 99.9%
- **Erreurs JavaScript** : < 1%
- **Taux de conversion** : Inscriptions newsletter, ajouts panier

### 2. Outils de monitoring
```javascript
// Google Analytics (exemple d'intégration)
gtag('config', 'GA_MEASUREMENT_ID', {
    page_title: document.title,
    page_location: window.location.href
});

// Monitoring des erreurs
window.addEventListener('error', (event) => {
    // Envoyer les erreurs à un service de monitoring
    console.error('Error:', event.error);
});

// Performance monitoring
window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0];
    const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
    
    // Envoyer les métriques de performance
    console.log('Load time:', loadTime);
});
```

### 3. Tests automatisés
```javascript
// Tests de fumée (smoke tests)
const smokeTests = [
    {
        name: 'Homepage loads',
        test: () => document.title.includes('YANACADEMY')
    },
    {
        name: 'Navigation works',
        test: () => document.querySelector('.nav-menu') !== null
    },
    {
        name: 'Cart functionality',
        test: () => typeof addToCart === 'function'
    },
    {
        name: 'Local storage works',
        test: () => typeof Storage !== 'undefined'
    }
];

// Exécution des tests
smokeTests.forEach(test => {
    try {
        if (test.test()) {
            console.log(`✓ ${test.name}`);
        } else {
            console.error(`✗ ${test.name}`);
        }
    } catch (error) {
        console.error(`✗ ${test.name}: ${error.message}`);
    }
});
```

## 🔒 Sécurité et HTTPS

### 1. Configuration SSL
```apache
# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### 2. Headers de sécurité
```apache
# Sécurité renforcée
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' fonts.googleapis.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com; img-src 'self' images.pexels.com data:; font-src 'self' fonts.gstatic.com"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"
```

### 3. Validation des entrées
```javascript
// Sanitisation côté client (complément, pas remplacement de la validation serveur)
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Validation email renforcée
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email) && email.length <= 254;
}
```

## 🚨 Résolution de problèmes de déploiement

### Problèmes courants

#### 1. Erreur 404 sur les sous-pages
**Cause** : Serveur ne trouve pas gallery.html, about.html, courses.html
**Solution** :
```apache
# .htaccess
RewriteEngine On
RewriteRule ^gallery/?$ gallery.html [L]
RewriteRule ^about/?$ about.html [L]
RewriteRule ^courses/?$ courses.html [L]
```

#### 2. CSS/JS ne se chargent pas
**Cause** : Chemins relatifs incorrects
**Solution** : Vérifier les chemins dans les fichiers HTML
```html
<!-- Correct -->
<link rel="stylesheet" href="styles/main.css">
<script src="scripts/main.js"></script>

<!-- Incorrect -->
<link rel="stylesheet" href="/styles/main.css">
<script src="/scripts/main.js"></script>
```

#### 3. Images Pexels bloquées
**Cause** : CORS ou HTTPS mixte
**Solution** : Utiliser uniquement des URLs HTTPS
```javascript
// Correct
const imageUrl = "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800";

// Incorrect
const imageUrl = "http://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg";
```

#### 4. Local Storage ne fonctionne pas
**Cause** : Protocole file:// ou restrictions navigateur
**Solution** : Utiliser un serveur web local
```bash
# Python
python -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

### Checklist de déploiement

#### Avant le déploiement
- [ ] Tous les fichiers HTML sont présents
- [ ] Tous les fichiers CSS sont liés correctement
- [ ] Tous les fichiers JavaScript sont liés correctement
- [ ] Les images Pexels utilisent des URLs HTTPS
- [ ] Les formulaires sont fonctionnels
- [ ] Le panier fonctionne correctement
- [ ] La navigation mobile est opérationnelle
- [ ] Les animations se chargent correctement

#### Après le déploiement
- [ ] Toutes les pages se chargent sans erreur
- [ ] La navigation fonctionne entre toutes les pages
- [ ] Les formulaires s'envoient correctement
- [ ] Le panier persiste entre les sessions
- [ ] Les filtres fonctionnent sur la page cours
- [ ] La galerie s'affiche correctement
- [ ] Le site est responsive sur mobile
- [ ] Les performances sont acceptables (< 3s)

### Tests de validation post-déploiement
```bash
# Test de connectivité
curl -I https://votre-domaine.com

# Test des pages principales
curl -s -o /dev/null -w "%{http_code}" https://votre-domaine.com/
curl -s -o /dev/null -w "%{http_code}" https://votre-domaine.com/gallery
curl -s -o /dev/null -w "%{http_code}" https://votre-domaine.com/about
curl -s -o /dev/null -w "%{http_code}" https://votre-domaine.com/courses

# Test des assets
curl -s -o /dev/null -w "%{http_code}" https://votre-domaine.com/styles/main.css
curl -s -o /dev/null -w "%{http_code}" https://votre-domaine.com/scripts/main.js
```

## 📈 Optimisation continue

### 1. Performance
- Surveiller les Core Web Vitals
- Optimiser les images selon l'usage
- Minifier CSS/JS en production
- Utiliser un CDN pour les assets statiques

### 2. SEO
```html
<!-- Meta tags optimisés -->
<meta name="description" content="Apprenez l'espagnol avec YANACADEMY - Cours en ligne interactifs avec instructeurs natifs. Débutant à avancé.">
<meta name="keywords" content="cours espagnol, apprendre espagnol, formation espagnol en ligne">
<meta property="og:title" content="YANACADEMY - Apprenez l'espagnol en ligne">
<meta property="og:description" content="Plateforme d'apprentissage de l'espagnol avec cours interactifs et instructeurs natifs">
<meta property="og:image" content="https://votre-domaine.com/images/og-image.jpg">
```

### 3. Analytics
```javascript
// Suivi des conversions
function trackConversion(action, value) {
    gtag('event', 'conversion', {
        'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
        'value': value,
        'currency': 'EUR',
        'transaction_id': Date.now()
    });
}

// Suivi des interactions
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        trackConversion('add_to_cart', e.target.dataset.price);
    }
});
```

---

*Guide de déploiement - Version 1.0.0*
*Dernière mise à jour : [Date actuelle]*

**Support technique** : info@yanacademy.com
**Documentation** : Consultez README.md pour plus de détails