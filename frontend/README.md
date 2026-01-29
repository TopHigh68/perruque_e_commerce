# LuxeWig - Boutique de Perruques Premium

Plateforme e-commerce complète pour la vente de perruques de luxe avec interface d'administration.

## 🏗️ Architecture

Le projet est divisé en deux parties :

- **Frontend** : Application React/TypeScript avec Vite
- **Backend** : API REST Node.js/Express avec MongoDB

## 🚀 Installation Rapide

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Accessible sur `http://localhost:5174`

### Backend
```bash
cd backend
npm install
npm run dev
```
API accessible sur `http://localhost:5000`

## 📱 Fonctionnalités

### Site Public
- ✅ Page d'accueil avec hero section
- ✅ Catalogue de perruques avec filtres
- ✅ Pages À propos et Contact
- ✅ Design responsive et animations
- ✅ Interface en français
- ✅ Prix en FCFA

### Administration
- ✅ Authentification sécurisée
- ✅ Tableau de bord avec statistiques
- ✅ Gestion des perruques (CRUD)
- ✅ Gestion des commandes
- ✅ Gestion des clients
- ✅ Messages et contacts
- ✅ Analytics et statistiques
- ✅ Paramètres de la boutique

### API Backend
- ✅ Authentification JWT
- ✅ CRUD perruques
- ✅ Sécurité (Helmet, CORS, Rate limiting)
- ✅ Validation des données
- ✅ Structure MongoDB avec Mongoose

## 🔐 Accès Admin

**URL :** `http://localhost:5174/admin/login`

**Identifiants :**
- Email: `admin@luxewig.com`
- Mot de passe: `admin123`

## 🛠️ Technologies

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS v4
- Framer Motion (animations)
- React Router (navigation)
- Lucide React (icônes)

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT (authentification)
- bcryptjs (hachage mots de passe)
- express-validator (validation)
- Helmet (sécurité)
- CORS, Rate limiting

## 📁 Structure du Projet

```
perruque_e_commerce/
├── frontend/           # Application React
│   ├── src/
│   │   ├── components/ # Composants réutilisables
│   │   ├── pages/      # Pages de l'application
│   │   ├── assets/     # Images et ressources
│   │   └── ...
│   └── package.json
├── backend/            # API Node.js
│   ├── models/         # Modèles MongoDB
│   ├── routes/         # Routes Express
│   ├── middleware/     # Middlewares
│   └── server.js
└── README.md
```

## 🎨 Design

- **Thème** : Luxe avec couleurs or et champagne
- **Responsive** : Mobile-first design
- **Animations** : Transitions fluides avec Framer Motion
- **Typographie** : Police serif pour les titres

## 🚀 Déploiement

### Frontend
```bash
cd frontend
npm run build
# Déployer le dossier dist/
```

### Backend
```bash
cd backend
npm start
# Configurer les variables d'environnement en production
```

## 📞 Support

Pour toute question ou support, contactez l'équipe de développement.

---

**LuxeWig** - *Révélez votre beauté, une perruque à la fois* ✨