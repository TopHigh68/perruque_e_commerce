import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Heart, ShoppingBag, Star, SlidersHorizontal, X, ChevronDown, Menu, Search, User } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import wigProduct1 from '@/assets/wig-product-1.jpg';
import wigProduct2 from '@/assets/wig-product-2.jpg';
import wigProduct3 from '@/assets/wig-product-3.jpg';
import wigProduct4 from '@/assets/wig-product-4.jpg';

const navLinks = [
  { name: 'Accueil', path: '/' },
  { name: 'Boutique', path: '/shop' },
  { name: 'À propos', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

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
    image: wigProduct1,
    badge: 'Meilleure Vente',
    inStock: true,
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
    image: wigProduct2,
    badge: 'Nouveauté',
    inStock: true,
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
    image: wigProduct3,
    badge: 'Choix de l\'Éditeur',
    inStock: true,
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
    image: wigProduct4,
    inStock: true,
  },
  {
    id: 5,
    name: 'Bob Classique Noir',
    type: 'Synthétique',
    texture: 'Lisse',
    length: '30cm',
    color: 'Noir',
    price: 123895,
    rating: 4.7,
    reviews: 156,
    image: wigProduct1,
    inStock: true,
  },
  {
    id: 6,
    name: 'Élégance Ombré',
    type: 'Cheveux Humains',
    texture: 'Ondulé',
    length: '50cm',
    color: 'Ombré',
    price: 359595,
    rating: 4.8,
    reviews: 92,
    image: wigProduct3,
    inStock: false,
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
    image: wigProduct2,
    badge: 'Édition Limitée',
    inStock: true,
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
    image: wigProduct4,
    inStock: true,
  },
];

const filterOptions = {
  type: ['Cheveux Humains', 'Synthétique'],
  texture: ['Lisse', 'Bouclé', 'Ondulé', 'Crépu'],
  length: ['30cm', '35cm', '40cm', '45cm', '50cm', '55cm'],
  color: ['Noir', 'Auburn', 'Blond', 'Bordeaux', 'Ombré'],
};

type FilterKey = keyof typeof filterOptions;

interface Filters {
  type: string[];
  texture: string[];
  length: string[];
  color: string[];
  priceRange: [number, number];
}

const Shop = () => {
  const [filters, setFilters] = useState<Filters>({
    type: [],
    texture: [],
    length: [],
    color: [],
    priceRange: [0, 458500],
  });
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
    return true;
  });

  const sortedWigs = [...filteredWigs].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'new':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  const FilterSection = ({ category }: { category: FilterKey }) => {
    const categoryNames = {
      type: 'Type',
      texture: 'Texture',
      length: 'Longueur',
      color: 'Couleur'
    };
    
    return (
      <div className="mb-6">
        <h4 className="font-medium mb-3">{categoryNames[category]}</h4>
        <div className="space-y-2">
          {filterOptions[category].map((option) => (
            <label
              key={option}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <Checkbox
                checked={filters[category].includes(option)}
                onCheckedChange={() => toggleFilter(category, option)}
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>
    );
  };

  const FiltersContent = () => (
    <div className="space-y-6">
      <FilterSection category="type" />
      <FilterSection category="texture" />
      <FilterSection category="length" />
      <FilterSection category="color" />
      
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
        className="w-full"
        onClick={() =>
          setFilters({
            type: [],
            texture: [],
            length: [],
            color: [],
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
      <ShopHeader />
      
      <main>
        {/* Page Header */}
        <div className="bg-secondary/30 py-16 md:py-24 pt-24">
          <div className="container-luxury text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-4"
            >
              Boutique <span className="text-gradient-gold">Perruques Premium</span>
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
            <aside className="hidden lg:block w-64 flex-shrink-0">
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
                  <span className="font-medium text-foreground">{sortedWigs.length}</span> perruques trouvées
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

              {/* Products Grid */}
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {sortedWigs.map((wig) => (
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
                              <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                                Épuisé
                              </span>
                            </div>
                          )}

                          <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-black/80 hover:scale-110">
                            <Heart className="h-5 w-5 text-white" />
                          </button>

                          {wig.inStock && (
                            <div className="absolute bottom-4 flex justify-center  left-4 right-4 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                              <Button variant="gold" size="lg" className=" w-[70%]  bg-[#e1b052] hover:bg-[#d89c2b] cursor-pointer text-white">
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

              {sortedWigs.length === 0 && (
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

// Header fixe pour la page Shop
function ShopHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50 shadow-soft py-3 transition-all duration-500">
        <div className="container-luxury flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-serif text-2xl md:text-3xl font-semibold tracking-tight text-foreground transition-colors">
              Luxe<span className="text-gradient-gold">Wig</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'link-underline text-sm font-medium tracking-wide transition-colors',
                  location.pathname === link.path
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="hidden md:flex text-foreground hover:text-foreground/80 transition-colors">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex text-foreground hover:text-foreground/80 transition-colors">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex text-foreground hover:text-foreground/80 transition-colors">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative text-foreground hover:text-foreground/80 transition-colors">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold rounded-full text-xs font-semibold flex items-center justify-center text-primary">
                0
              </span>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-foreground hover:text-foreground/80 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-background/95 backdrop-blur-lg pt-24">
              <nav className="flex flex-col items-center gap-8 pt-10">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className={cn(
                        'font-serif text-2xl font-medium tracking-wide transition-colors',
                        location.pathname === link.path
                          ? 'text-foreground'
                          : 'text-muted-foreground'
                      )}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Shop;
