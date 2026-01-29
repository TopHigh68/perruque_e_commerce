const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Wig = require('../models/Wig');
const auth = require('../middleware/auth');

// GET /api/wigs - Récupérer toutes les perruques (public)
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      priceRange,
      hairType,
      style,
      length,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      minPrice,
      maxPrice
    } = req.query;

    // Construction du filtre
    const filter = { isVisible: true };
    
    if (priceRange && priceRange !== 'all') {
      filter.priceRange = priceRange;
    }
    
    if (hairType) filter.hairType = hairType;
    if (style) filter.style = style;
    if (length) filter.length = length;
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    
    if (search) {
      filter.$text = { $search: search };
    }

    // Options de tri
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Pagination
    const skip = (page - 1) * limit;

    const wigs = await Wig.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit))
      .select('-__v');

    const total = await Wig.countDocuments(filter);

    res.json({
      wigs,
      pagination: {
        current: Number(page),
        pages: Math.ceil(total / limit),
        total,
        hasNext: skip + wigs.length < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des perruques:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// GET /api/wigs/admin - Récupérer toutes les perruques pour l'admin
router.get('/admin', auth, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search,
      priceRange,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const filter = {};
    
    if (priceRange && priceRange !== 'all') {
      filter.priceRange = priceRange;
    }
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const skip = (page - 1) * limit;

    const wigs = await Wig.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    const total = await Wig.countDocuments(filter);

    res.json({
      wigs,
      pagination: {
        current: Number(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Erreur admin perruques:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// GET /api/wigs/:id - Récupérer une perruque par ID
router.get('/:id', async (req, res) => {
  try {
    const wig = await Wig.findById(req.params.id);
    
    if (!wig) {
      return res.status(404).json({ error: 'Perruque non trouvée' });
    }

    res.json(wig);
  } catch (error) {
    console.error('Erreur récupération perruque:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// POST /api/wigs - Créer une nouvelle perruque (admin)
router.post('/', [
  auth,
  body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Le nom est requis (1-100 caractères)'),
  body('price').isNumeric().withMessage('Le prix doit être un nombre'),
  body('priceRange').isIn(['abordable', 'standard', 'premium', 'luxe']).withMessage('Gamme de prix invalide'),
  body('hairType').isIn(['Cheveux Humains', 'Synthétique', 'Mixte']).withMessage('Type de cheveux invalide'),
  body('style').isIn(['Lisse', 'Bouclé', 'Ondulé', 'Crépu', 'Frisé']).withMessage('Style invalide'),
  body('length').isIn(['25cm', '30cm', '35cm', '40cm', '45cm', '50cm', '55cm', '60cm']).withMessage('Longueur invalide'),
  body('stock').isNumeric().withMessage('Le stock doit être un nombre')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const wig = new Wig(req.body);
    await wig.save();

    res.status(201).json(wig);
  } catch (error) {
    console.error('Erreur création perruque:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// PUT /api/wigs/:id - Mettre à jour une perruque (admin)
router.put('/:id', [
  auth,
  body('name').optional().trim().isLength({ min: 1, max: 100 }),
  body('price').optional().isNumeric(),
  body('stock').optional().isNumeric()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const wig = await Wig.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!wig) {
      return res.status(404).json({ error: 'Perruque non trouvée' });
    }

    res.json(wig);
  } catch (error) {
    console.error('Erreur mise à jour perruque:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// DELETE /api/wigs/:id - Supprimer une perruque (admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const wig = await Wig.findByIdAndDelete(req.params.id);
    
    if (!wig) {
      return res.status(404).json({ error: 'Perruque non trouvée' });
    }

    res.json({ message: 'Perruque supprimée avec succès' });
  } catch (error) {
    console.error('Erreur suppression perruque:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// PATCH /api/wigs/:id/visibility - Changer la visibilité (admin)
router.patch('/:id/visibility', auth, async (req, res) => {
  try {
    const { isVisible } = req.body;
    
    const wig = await Wig.findByIdAndUpdate(
      req.params.id,
      { isVisible },
      { new: true }
    );

    if (!wig) {
      return res.status(404).json({ error: 'Perruque non trouvée' });
    }

    res.json(wig);
  } catch (error) {
    console.error('Erreur changement visibilité:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;