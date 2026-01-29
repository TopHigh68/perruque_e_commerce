const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    // Récupérer le token depuis l'en-tête Authorization
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Accès refusé. Token manquant.' });
    }

    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    
    next();
  } catch (error) {
    console.error('Erreur authentification:', error);
    res.status(401).json({ error: 'Token invalide.' });
  }
};

// Middleware pour vérifier si l'utilisateur est admin
const adminAuth = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Accès refusé. Droits administrateur requis.' });
    }
    next();
  });
};

module.exports = auth;
module.exports.adminAuth = adminAuth;