# LuxeWig Backend API

Backend Node.js/Express pour la boutique de perruques LuxeWig.

## 🚀 Installation

```bash
cd backend
npm install
```

## 📝 Configuration

1. Copiez le fichier `.env` et configurez vos variables d'environnement
2. Assurez-vous d'avoir MongoDB installé et en cours d'exécution

## 🏃‍♂️ Démarrage

```bash
# Mode développement avec nodemon
npm run dev

# Mode production
npm start
```

Le serveur démarre sur `http://localhost:5000`

## 🔐 Authentification Admin

**Identifiants par défaut :**
- Email: `admin@luxewig.com`
- Mot de passe: `admin123`

## 📚 API Endpoints

### Authentification
- `POST /api/auth/login` - Connexion admin
- `POST /api/auth/verify` - Vérifier le token
- `POST /api/auth/logout` - Déconnexion

### Perruques
- `GET /api/wigs` - Liste des perruques (public)
- `GET /api/wigs/admin` - Liste admin des perruques
- `GET /api/wigs/:id` - Détails d'une perruque
- `POST /api/wigs` - Créer une perruque (admin)
- `PUT /api/wigs/:id` - Modifier une perruque (admin)
- `DELETE /api/wigs/:id` - Supprimer une perruque (admin)
- `PATCH /api/wigs/:id/visibility` - Changer la visibilité (admin)

### Autres routes (à implémenter)
- `/api/orders` - Gestion des commandes
- `/api/customers` - Gestion des clients
- `/api/messages` - Messages et contacts
- `/api/analytics` - Statistiques
- `/api/settings` - Paramètres
- `/api/upload` - Upload de fichiers

## 🗄️ Base de données

Le projet utilise MongoDB avec Mongoose. Les modèles sont dans le dossier `models/`.

## 🔒 Sécurité

- Helmet pour la sécurité des en-têtes
- Rate limiting
- CORS configuré
- JWT pour l'authentification
- Validation des données avec express-validator

## 📁 Structure

```
backend/
├── models/          # Modèles Mongoose
├── routes/          # Routes Express
├── middleware/      # Middlewares personnalisés
├── controllers/     # Contrôleurs (optionnel)
├── uploads/         # Fichiers uploadés
├── server.js        # Point d'entrée
├── package.json     # Dépendances
└── .env            # Variables d'environnement
```