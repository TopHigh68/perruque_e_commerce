const mongoose = require('mongoose');

const wigSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom de la perruque est requis'],
    trim: true,
    maxlength: [100, 'Le nom ne peut pas dépasser 100 caractères']
  },
  price: {
    type: Number,
    required: [true, 'Le prix est requis'],
    min: [0, 'Le prix ne peut pas être négatif']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Le prix original ne peut pas être négatif']
  },
  priceRange: {
    type: String,
    enum: ['abordable', 'standard', 'premium', 'luxe'],
    required: [true, 'La gamme de prix est requise']
  },
  hairType: {
    type: String,
    required: [true, 'Le type de cheveux est requis'],
    enum: ['Cheveux Humains', 'Synthétique', 'Mixte']
  },
  style: {
    type: String,
    required: [true, 'Le style est requis'],
    enum: ['Lisse', 'Bouclé', 'Ondulé', 'Crépu', 'Frisé']
  },
  length: {
    type: String,
    required: [true, 'La longueur est requise'],
    enum: ['25cm', '30cm', '35cm', '40cm', '45cm', '50cm', '55cm', '60cm']
  },
  description: {
    type: String,
    maxlength: [1000, 'La description ne peut pas dépasser 1000 caractères']
  },
  stock: {
    type: Number,
    required: [true, 'Le stock est requis'],
    min: [0, 'Le stock ne peut pas être négatif'],
    default: 0
  },
  isVisible: {
    type: Boolean,
    default: true
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  sales: {
    type: Number,
    default: 0
  },
  tags: [String],
  seo: {
    metaTitle: String,
    metaDescription: String,
    slug: {
      type: String,
      unique: true,
      sparse: true
    }
  }
}, {
  timestamps: true
});

// Index pour la recherche
wigSchema.index({ name: 'text', description: 'text', tags: 'text' });
wigSchema.index({ priceRange: 1, hairType: 1, style: 1 });
wigSchema.index({ isVisible: 1, stock: 1 });

// Middleware pour générer le slug automatiquement
wigSchema.pre('save', function(next) {
  if (this.isModified('name') && !this.seo.slug) {
    this.seo.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Méthode pour vérifier si en stock
wigSchema.methods.isInStock = function() {
  return this.stock > 0;
};

// Méthode pour décrémenter le stock
wigSchema.methods.decrementStock = function(quantity = 1) {
  if (this.stock >= quantity) {
    this.stock -= quantity;
    this.sales += quantity;
    return this.save();
  }
  throw new Error('Stock insuffisant');
};

module.exports = mongoose.model('Wig', wigSchema);