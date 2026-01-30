import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { FixedHeader } from '@/components/layout/FixedHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { useCart } from '@/contexts/CartContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';


const allWigs = [
  {
    id: 1,
    name: 'Lisse Soyeux Noir',
    type: 'Cheveux Humains',
    texture: 'Lisse',
    length: '45cm',
    color: 'Noir',
    price: 294350,
    originalPrice: 359650,
    rating: 4.9,
    reviews: 128,
    image: '/perruques/perruque1.jpg',
    badge: 'Meilleure Vente',
    inStock: true,
    category: 'bestseller',
    sales: 245,
    createdAt: '2024-01-01'
  },
  {
    id: 2,
    name: 'Boucles Auburn Glamour',
    type: 'Cheveux Humains',
    texture: 'Bouclé',
    length: '40cm',
    color: 'Auburn',
    price: 346870,
    rating: 4.8,
    reviews: 96,
    image: '/perruques/perruque2.jpg',
    badge: 'Nouveauté',
    inStock: true,
    category: 'new',
    sales: 45,
    createdAt: '2024-01-15'
  },
  {
    id: 3,
    name: 'Ondulations Blond Miel',
    type: 'Cheveux Humains',
    texture: 'Ondulé',
    length: '55cm',
    color: 'Blond',
    price: 392730,
    rating: 5.0,
    reviews: 214,
    image: '/perruques/perruque3.jpg',
    badge: 'Choix de l\'Éditeur',
    inStock: true,
    category: 'bestseller',
    sales: 189,
    createdAt: '2023-12-20'
  },
  {
    id: 4,
    name: 'Afro Naturel Queen',
    type: 'Cheveux Humains',
    texture: 'Crépu',
    length: '35cm',
    color: 'Noir',
    price: 313990,
    rating: 4.9,
    reviews: 87,
    image: '/perruques/perruque4.jpg',
    inStock: true,
    category: 'regular',
    sales: 67,
    createdAt: '2023-11-10'
  },
  {
    id: 5,
    name: 'Bob Classique Châtain',
    type: 'Cheveux Humains',
    texture: 'Lisse',
    length: '30cm',
    color: 'Châtain',
    price: 267890,
    rating: 4.7,
    reviews: 156,
    image: '/perruques/perruque5.jpg',
    inStock: true,
    category: 'regular',
    sales: 98,
    createdAt: '2023-10-15'
  },
  {
    id: 6,
    name: 'Élégance Ombré Caramel',
    type: 'Cheveux Humains',
    texture: 'Ondulé',
    length: '50cm',
    color: 'Ombré',
    price: 359595,
    rating: 4.8,
    reviews: 92,
    image: '/perruques/perruque6.jpg',
    badge: 'Tendance',
    inStock: false,
    category: 'outofstock',
    sales: 134,
    createdAt: '2023-12-05'
  },
  {
    id: 7,
    name: 'Boucles Profondes Bordeaux',
    type: 'Cheveux Humains',
    texture: 'Bouclé',
    length: '45cm',
    color: 'Bordeaux',
    price: 320295,
    rating: 4.9,
    reviews: 73,
    image: '/perruques/perruque7.jpg',
    badge: 'Édition Limitée',
    inStock: true,
    category: 'new',
    sales: 23,
    createdAt: '2024-01-10'
  },
  {
    id: 8,
    name: 'Spirales Crépues Naturelles',
    type: 'Cheveux Humains',
    texture: 'Crépu',
    length: '40cm',
    color: 'Noir',
    price: 300645,
    rating: 4.8,
    reviews: 64,
    image: '/perruques/perruque1.jpg',
    inStock: false,
    category: 'outofstock',
    sales: 156,
    createdAt: '2023-09-20'
  },
  {
    id: 9,
    name: 'Lisse Premium Platine',
    type: 'Cheveux Humains',
    texture: 'Lisse',
    length: '60cm',
    color: 'Platine',
    price: 425750,
    rating: 4.9,
    reviews: 89,
    image: '/perruques/perruque2.jpg',
    badge: 'Premium',
    inStock: true,
    category: 'new',
    sales: 34,
    createdAt: '2024-01-20'
  },
  {
    id: 10,
    name: 'Waves Naturelles Miel',
    type: 'Cheveux Humains',
    texture: 'Ondulé',
    length: '42cm',
    color: 'Miel',
    price: 298450,
    rating: 4.6,
    reviews: 112,
    image: '/perruques/perruque3.jpg',
    inStock: true,
    category: 'regular',
    sales: 78,
    createdAt: '2023-11-25'
  },
  {
    id: 11,
    name: 'Curly Volumineux Acajou',
    type: 'Cheveux Humains',
    texture: 'Bouclé',
    length: '38cm',
    color: 'Acajou',
    price: 334890,
    rating: 4.8,
    reviews: 95,
    image: '/perruques/perruque4.jpg',
    inStock: true,
    category: 'bestseller',
    sales: 167,
    createdAt: '2023-12-10'
  },
  {
    id: 12,
    name: 'Pixie Moderne Noir Jais',
    type: 'Cheveux Humains',
    texture: 'Lisse',
    length: '25cm',
    color: 'Noir',
    price: 245670,
    rating: 4.5,
    reviews: 78,
    image: '/perruques/perruque5.jpg',
    inStock: true,
    category: 'regular',
    sales: 56,
    createdAt: '2023-10-30'
  }
];

const filterOptions = {
  type: ['Cheveux Humains', 'Synthétique'],
  texture: ['Lisse', 'Bouclé', 'Ondulé', 'Crépu'],
  length: ['25cm', '30cm', '35cm', '38cm', '40cm', '42cm', '45cm', '50cm', '55cm', '60cm'],
  color: ['Noir', 'Auburn', 'Blond', 'Bordeaux', 'Ombré', 'Châtain', 'Platine', 'Miel', 'Acajou'],
  category: ['Nouveautés', 'Meilleures Ventes', 'Épuisé']
};

type FilterKey = keyof typeof filterOptions;

interface Filters {
  type: string[];
  texture: string[];
  length: string[];
  color: string[];
  category: string[];
  priceRange: [number, number];
}

const Shop = () => {
  const [filters, setFilters] = useState<Filters>({
    type: [],
    texture: [],
    length: [],
    color: [],
    category: [],
    priceRange: [0, 458500],
  });
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { addItem } = useCart();

  const toggleFilter = (category: FilterKey, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((v) => v !== value)
        : [...prev[category], value],
    }));
  };

  const filteredWigs = allWigs.filter((wig) => {
    if (filters.type.length && !filters.type.includes(wig.type)) return false;
    if (filters.texture.length && !filters.texture.includes(wig.texture)) return false;
    if (filters.length.length && !filters.length.includes(wig.length)) return false;
    if (filters.color.length && !filters.color.includes(wig.color)) return false;
    if (wig.price < filters.priceRange[0] || wig.price > filters.priceRange[1]) return false;
    
    // Filtre par catégorie
    if (filters.category.length) {
      const hasMatchingCategory = filters.category.some(cat => {
        if (cat === 'Nouveautés') return wig.category === 'new';
        if (cat === 'Meilleures Ventes') return wig.category === 'bestseller';
        if (cat === 'Épuisé') return wig.category === 'outofstock';
        return false;
      });
      if (!hasMatchingCategory) return false;
    }
    
    return true;
  });

  // Grouper les perruques par catégorie pour l'affichage
  const groupedWigs = {
    new: filteredWigs.filter(wig => wig.category === 'new'),
    bestseller: filteredWigs.filter(wig => wig.category === 'bestseller'),
    regular: filteredWigs.filter(wig => wig.category === 'regular'),
    outofstock: filteredWigs.filter(wig => wig.category === 'outofstock')
  };

  const categoryTitles = {
    new: 'Nouveautés',
    bestseller: 'Meilleures Ventes',
    regular: 'Autres Produits',
    outofstock: 'Épuisé'
  };

  const categoryOrder = ['new', 'bestseller', 'regular', 'outofstock'] as const;

  const FilterSection = ({ category }: { category: FilterKey }) => {
    const categoryNames = {
      type: 'Type',
      texture: 'Texture',
      length: 'Longueur',
      color: 'Couleur',
      category: 'Catégorie'
    };
    
    return (
      <div className="mb-6">
        <h4 className="font-medium mb-3 flex items-center gap-2">
          {category === 'category' && <span className="text-gold">★</span>}
          {categoryNames[category]}
        </h4>
        <div className="space-y-2">
          {filterOptions[category].map((option) => {
            let count = 0;
            if (category === 'category') {
              if (option === 'Nouveautés') count = allWigs.filter(w => w.category === 'new').length;
              if (option === 'Meilleures Ventes') count = allWigs.filter(w => w.category === 'bestseller').length;
              if (option === 'Épuisé') count = allWigs.filter(w => w.category === 'outofstock').length;
            }
            
            return (
              <label
                key={option}
                className="flex items-center justify-between cursor-pointer group hover:bg-secondary/30 p-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={filters[category].includes(option)}
                    onCheckedChange={() => toggleFilter(category, option)}
                  />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {option}
                  </span>
                </div>
                {category === 'category' && (
                  <span className="text-xs bg-gold/20 text-gold-dark px-2 py-1 rounded-full">
                    {count}
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </div>
    );
  };

  const FiltersContent = () => (
    <div className="space-y-6">
      <FilterSection category="category" />
      <div className="border-t border-border/50 pt-6">
        <FilterSection category="type" />
        <FilterSection category="texture" />
        <FilterSection category="length" />
        <FilterSection category="color" />
      </div>
      
      <div className="mb-6">
        <h4 className="font-medium mb-4">Gamme de Prix</h4>
        <Slider
          value={filters.priceRange}
          onValueChange={(value) => setFilters((prev) => ({ ...prev, priceRange: value as [number, number] }))}
          max={458500}
          step={10}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{filters.priceRange[0].toLocaleString()} FCFA</span>
          <span>{filters.priceRange[1].toLocaleString()} FCFA</span>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full cursor-pointer bg-[#e1b052] hover:bg-[#d89c2b]"
        onClick={() =>
          setFilters({
            type: [],
            texture: [],
            length: [],
            color: [],
            category: [],
            priceRange: [0, 458500],
          })
        }
      >
        Effacer tous les Filtres
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen">
      <FixedHeader />
      
      <main>
        {/* Page Header */}
        <div className="bg-secondary/30 py-16 md:py-24 pt-24">
          <div className="container-luxury text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-4"
            >
              Boutique des <span className="text-gradient-gold">Perruques</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Découvrez notre collection de perruques de luxe confectionnées avec les cheveux de la plus haute qualité
            </motion.p>
          </div>
        </div>

        <div className="container-luxury py-12">
          <div className="flex gap-8">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-28">
                <h3 className="font-serif text-xl font-medium mb-6">Filtres</h3>
                <FiltersContent />
              </div>
            </aside>

            {/* Products Section */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-8">
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">{filteredWigs.length}</span> perruques trouvées
                </p>

                <div className="flex items-center gap-4">
                  {/* Mobile Filter Button */}
                  <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="lg:hidden">
                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                        Filtres
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                      <SheetHeader>
                        <SheetTitle className="font-serif">Filtres</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <FiltersContent />
                      </div>
                    </SheetContent>
                  </Sheet>

                  {/* Sort Dropdown */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-card border border-border rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer"
                    >
                      <option value="featured">En Vedette</option>
                      <option value="new">Plus Récent</option>
                      <option value="price-low">Prix: Croissant</option>
                      <option value="price-high">Prix: Décroissant</option>
                      <option value="rating">Mieux Noté</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
                  </div>
                </div>
              </div>

              {/* Products Grid - Groupé par catégories */}
              <div className="space-y-12">
                {categoryOrder.map(categoryKey => {
                  const categoryWigs = groupedWigs[categoryKey];
                  if (categoryWigs.length === 0) return null;
                  
                  return (
                    <div key={categoryKey} className="space-y-6">
                      <div className="flex items-center gap-4">
                        <h2 className="font-serif text-2xl font-medium text-foreground">
                          {categoryTitles[categoryKey]}
                        </h2>
                        <div className="h-px bg-border flex-1" />
                        <span className="text-sm text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">
                          {categoryWigs.length} produit{categoryWigs.length > 1 ? 's' : ''}
                        </span>
                      </div>
                      
                      <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                      >
                        <AnimatePresence mode="popLayout">
                          {categoryWigs.map((wig) => (
                            <motion.div
                              key={wig.id}
                              layout
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              transition={{ duration: 0.3 }}
                              className="group"
                            >
                              <div className="luxury-card bg-card rounded-2xl overflow-hidden border border-border/50">
                                <div className="relative aspect-square img-zoom">
                                  <img
                                    src={wig.image}
                                    alt={wig.name}
                                    className="w-full h-full object-cover"
                                  />
                                  
                                  {wig.badge && (
                                    <Badge className="absolute top-4 left-4 bg-gold text-white border-0 font-semibold">
                                      {wig.badge}
                                    </Badge>
                                  )}

                                  {!wig.inStock && (
                                    <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                                      <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">
                                        Épuisé
                                      </span>
                                    </div>
                                  )}

                                  {wig.inStock && (
                                    <div className="absolute bottom-4 flex justify-center left-4 right-4 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                                      <Button 
                                        variant="gold" 
                                        size="lg" 
                                        className="w-[70%] bg-[#e1b052] hover:bg-[#d89c2b] cursor-pointer text-white"
                                        onClick={() => addItem({
                                          id: wig.id.toString(),
                                          name: wig.name,
                                          price: wig.price,
                                          image: wig.image,
                                          color: wig.color,
                                          length: wig.length
                                        })}
                                      >
                                        <ShoppingBag className="h-4 w-4" />
                                        Ajouter au Panier
                                      </Button>
                                    </div>
                                  )}
                                </div>

                                <div className="p-5">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                                      {wig.type}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      {wig.length} • {wig.texture}
                                    </span>
                                  </div>
                                  
                                  <h3 className="font-serif text-lg font-medium mb-2 group-hover:text-gold-dark transition-colors">
                                    <Link to={`/product/${wig.id}`}>{wig.name}</Link>
                                  </h3>

                                  <div className="flex items-center gap-2 mb-3">
                                    <div className="flex items-center gap-0.5">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`h-3.5 w-3.5 ${
                                            i < Math.floor(wig.rating)
                                              ? 'fill-gold text-gold'
                                              : 'text-muted'
                                          }`}
                                        />
                                      ))}
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                      ({wig.reviews})
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <span className="text-lg font-semibold">{wig.price.toLocaleString()} FCFA</span>
                                    {wig.originalPrice && (
                                      <span className="text-sm text-muted-foreground line-through">
                                        {wig.originalPrice.toLocaleString()} FCFA
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </motion.div>
                    </div>
                  );
                })}
              </div>

              {filteredWigs.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-xl text-muted-foreground mb-4">
                    Aucune perruque ne correspond à vos filtres
                  </p>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setFilters({
                        type: [],
                        texture: [],
                        length: [],
                        color: [],
                        category: [],
                        priceRange: [0, 458500],
                      })
                    }
                  >
                    Effacer les Filtres
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
