import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { FixedHeader } from '@/components/layout/FixedHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { useCart } from '@/contexts/CartContext';
import { allWigs } from '@/data/wigs';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const filterOptions = {
  type: ['Cheveux Humains', 'Synthétique'],
  texture: ['Lisse', 'Bouclé', 'Ondulé', 'Crépu'],
  length: ['25cm', '30cm', '35cm', '38cm', '40cm', '42cm', '45cm', '50cm', '55cm', '60cm'],
  color: ['Noir', 'Auburn', 'Blond', 'Bordeaux', 'Ombré', 'Châtain', 'Platine', 'Miel', 'Acajou'],
  collection: ['Nouveautés', 'Meilleures Ventes', 'Coups de Cœur', 'Promotions', 'Épuisé']
};

type FilterKey = keyof typeof filterOptions;

interface Filters {
  type: string[];
  texture: string[];
  length: string[];
  color: string[];
  collection: string[];
  priceRange: [number, number];
}

const Shop = () => {
  const [filters, setFilters] = useState<Filters>({
    type: [],
    texture: [],
    length: [],
    color: [],
    collection: [],
    priceRange: [0, 458500],
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    nouveautes: true,
    meilleures_ventes: false,
    coups_de_coeur: false,
    promotions: false,
    epuise: false
  });
  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>({
    collection: true,
    type: false,
    texture: false,
    length: false,
    color: false,
    price: false
  });
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

    // Filtre par collection
    if (filters.collection.length) {
      const hasMatchingCollection = filters.collection.some(col => {
        if (col === 'Nouveautés') return wig.collection === 'nouveautes';
        if (col === 'Meilleures Ventes') return wig.collection === 'meilleures_ventes';
        if (col === 'Coups de Cœur') return wig.collection === 'coups_de_coeur';
        if (col === 'Promotions') return wig.collection === 'promotions';
        if (col === 'Épuisé') return wig.collection === 'epuise';
        return false;
      });
      if (!hasMatchingCollection) return false;
    }

    return true;
  });

  // Grouper les perruques par collection pour l'affichage
  const groupedWigs = {
    nouveautes: filteredWigs.filter(wig => wig.collection === 'nouveautes'),
    meilleures_ventes: filteredWigs.filter(wig => wig.collection === 'meilleures_ventes'),
    coups_de_coeur: filteredWigs.filter(wig => wig.collection === 'coups_de_coeur'),
    promotions: filteredWigs.filter(wig => wig.collection === 'promotions'),
    epuise: filteredWigs.filter(wig => wig.collection === 'epuise')
  };

  const categoryTitles = {
    nouveautes: 'Nouveautés',
    meilleures_ventes: 'Meilleures Ventes',
    coups_de_coeur: 'Coups de Cœur',
    promotions: 'Promotions',
    epuise: 'Épuisé'
  };

  const categoryOrder = ['nouveautes', 'meilleures_ventes', 'coups_de_coeur', 'promotions', 'epuise'] as const;

  const FilterSection = ({ category }: { category: FilterKey }) => {
    const categoryNames = {
      type: 'Type',
      texture: 'Texture',
      length: 'Longueur',
      color: 'Couleur',
      collection: 'Collection'
    };

    return (
      <div className="border border-border/30 rounded-lg overflow-hidden mb-3">
        <button
          onClick={() => setExpandedFilters(prev => ({
            ...prev,
            [category]: !prev[category]
          }))}
          className="w-full flex items-center justify-between p-3 bg-secondary/10 hover:bg-secondary/20 transition-colors"
        >
          <h4 className="font-medium text-sm flex items-center gap-2">
            {category === 'collection' && <span className="text-gold">★</span>}
            {categoryNames[category]}
          </h4>
          {expandedFilters[category] ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
        
        <AnimatePresence>
          {expandedFilters[category] && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="p-3 space-y-1">
                {filterOptions[category].map((option) => {
                  let count = 0;
                  if (category === 'collection') {
                    if (option === 'Nouveautés') count = allWigs.filter(w => w.collection === 'nouveautes').length;
                    if (option === 'Meilleures Ventes') count = allWigs.filter(w => w.collection === 'meilleures_ventes').length;
                    if (option === 'Coups de Cœur') count = allWigs.filter(w => w.collection === 'coups_de_coeur').length;
                    if (option === 'Promotions') count = allWigs.filter(w => w.collection === 'promotions').length;
                    if (option === 'Épuisé') count = allWigs.filter(w => w.collection === 'epuise').length;
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
                          className="data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                        />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          {option}
                        </span>
                      </div>
                      {category === 'collection' && (
                        <span className="text-xs bg-gold/20 text-gold-dark px-2 py-1 rounded-full font-medium">
                          {count}
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const FiltersContent = () => (
    <div className="space-y-3">
      <FilterSection category="collection" />
      <FilterSection category="type" />
      <FilterSection category="texture" />
      <FilterSection category="length" />
      <FilterSection category="color" />
      
      <div className="border border-border/30 rounded-lg overflow-hidden">
        <button
          onClick={() => setExpandedFilters(prev => ({
            ...prev,
            price: !prev.price
          }))}
          className="w-full flex items-center justify-between p-3 bg-secondary/10 hover:bg-secondary/20 transition-colors"
        >
          <h4 className="font-medium text-sm">Gamme de Prix</h4>
          {expandedFilters.price ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
        
        <AnimatePresence>
          {expandedFilters.price && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="p-3">
                <div className="px-2">
                  <Slider
                    value={filters.priceRange}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, priceRange: value as [number, number] }))}
                    max={458500}
                    step={10}
                    className="mb-3"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground bg-secondary/30 rounded-lg p-2">
                    <span className="font-medium">{filters.priceRange[0].toLocaleString()} FCFA</span>
                    <span className="font-medium">{filters.priceRange[1].toLocaleString()} FCFA</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Button
        variant="outline"
        className="w-full cursor-pointer bg-[#e1b052] hover:bg-[#d89c2b] mt-4"
        onClick={() =>
          setFilters({
            type: [],
            texture: [],
            length: [],
            color: [],
            collection: [],
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

        <div className="container-luxury py-8 sm:py-12">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-28">
                <h3 className="font-serif text-xl font-medium mb-6">Filtres</h3>
                <FiltersContent />
              </div>
            </aside>

            {/* Products Section */}
            <div className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="flex items-center justify-between gap-4 mb-8">
                <p className="text-muted-foreground text-sm sm:text-base">
                  <span className="font-medium text-foreground">{filteredWigs.length}</span> perruques trouvées
                </p>

                {/* Mobile Filter Button */}
                <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filtres
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[320px] sm:w-[400px] p-0 bg-white">
                    <div className="flex flex-col h-full bg-white">
                      <SheetHeader className="px-6 py-4 border-b border-gray-200 bg-white">
                        <SheetTitle className="font-serif text-xl text-left text-gray-900">Filtres</SheetTitle>
                      </SheetHeader>

                      <div className="flex-1 overflow-y-auto px-6 py-4 bg-white">
                        {/* Filtres rapides */}
                        <div className="mb-6">
                          <h4 className="font-medium mb-3 text-gold">Filtres Rapides</h4>
                          <div className="flex flex-wrap gap-2">
                            {['Nouveautés', 'Meilleures Ventes', 'Cheveux Humains'].map((quickFilter) => (
                              <Button
                                key={quickFilter}
                                variant="outline"
                                size="sm"
                                className={`text-xs ${(quickFilter === 'Nouveautés' && filters.collection.includes('Nouveautés')) ||
                                    (quickFilter === 'Meilleures Ventes' && filters.collection.includes('Meilleures Ventes')) ||
                                    (quickFilter === 'Cheveux Humains' && filters.type.includes('Cheveux Humains'))
                                    ? 'bg-gold text-white border-gold'
                                    : ''
                                  }`}
                                onClick={() => {
                                  if (quickFilter === 'Nouveautés' || quickFilter === 'Meilleures Ventes') {
                                    toggleFilter('collection', quickFilter);
                                  } else if (quickFilter === 'Cheveux Humains') {
                                    toggleFilter('type', quickFilter);
                                  }
                                }}
                              >
                                {quickFilter}
                              </Button>
                            ))}
                          </div>
                        </div>

                        <FiltersContent />
                      </div>

                      {/* Actions en bas */}
                      <div className="border-t border-gray-200 p-4 bg-white">
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => {
                              setFilters({
                                type: [],
                                texture: [],
                                length: [],
                                color: [],
                                collection: [],
                                priceRange: [0, 458500],
                              });
                            }}
                          >
                            Effacer
                          </Button>
                          <Button
                            className="flex-1 bg-gold hover:bg-gold/90 text-white"
                            onClick={() => setIsFilterOpen(false)}
                          >
                            Voir {filteredWigs.length} résultats
                          </Button>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Products Grid - Groupé par catégories */}
              <div className="space-y-4 sm:space-y-6">
              {categoryOrder.map(categoryKey => {
                const categoryWigs = groupedWigs[categoryKey];
                if (categoryWigs.length === 0) return null;

                return (
                  <div key={categoryKey} id={`category-${categoryKey}`} className="border border-border/30 rounded-xl overflow-hidden">
                    <button
                      onClick={() => {
                        setExpandedCategories(prev => {
                          const newState = { nouveautes: false, meilleures_ventes: false, coups_de_coeur: false, promotions: false, epuise: false };
                          newState[categoryKey] = !prev[categoryKey];
                          return newState;
                        });
                        // Scroll to top of the category section
                        setTimeout(() => {
                          const element = document.getElementById(`category-${categoryKey}`);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }, 100);
                      }}
                      className="w-full flex items-center justify-between p-4 sm:p-6 bg-secondary/20 hover:bg-secondary/30 transition-colors"
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <h2 className="font-serif text-lg sm:text-xl font-medium text-foreground">
                          {categoryTitles[categoryKey]}
                        </h2>
                        <span className="text-xs sm:text-sm text-muted-foreground bg-secondary/50 px-2 sm:px-3 py-1 rounded-full">
                          {categoryWigs.length} produit{categoryWigs.length > 1 ? 's' : ''}
                        </span>
                      </div>
                      {expandedCategories[categoryKey] ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>

                    <AnimatePresence>
                      {expandedCategories[categoryKey] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 sm:p-6">
                            <motion.div
                              layout
                              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6"
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
                                          <div className="absolute bottom-4 flex justify-center left-2 right-2 sm:left-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                                            <Button
                                              variant="gold"
                                              size="sm"
                                              className="w-full sm:w-[70%] bg-[#e1b052] hover:bg-[#d89c2b] cursor-pointer text-white text-xs sm:text-sm px-2 sm:px-4 py-2"
                                              onClick={() => addItem({
                                                id: wig.id.toString(),
                                                name: wig.name,
                                                price: wig.price,
                                                image: wig.image,
                                                color: wig.color,
                                                length: wig.length
                                              })}
                                            >
                                              <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                                              <span className="hidden sm:inline">Ajouter au Panier</span>
                                              <span className="sm:hidden">Ajouter</span>
                                            </Button>
                                          </div>
                                        )}
                                      </div>

                                      <div className="p-3 sm:p-5">
                                        <div className="flex items-center justify-between mb-1">
                                          <span className="text-xs text-muted-foreground uppercase tracking-wider">
                                            {wig.type}
                                          </span>
                                          <span className="text-xs text-muted-foreground hidden sm:inline">
                                            {wig.length} • {wig.texture}
                                          </span>
                                        </div>

                                        <h3 className="font-serif text-base sm:text-lg font-medium mb-2 group-hover:text-gold-dark transition-colors line-clamp-2">
                                          <Link to={`/product/${wig.id}`}>{wig.name}</Link>
                                        </h3>

                                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                          <div className="flex items-center gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                              <Star
                                                key={i}
                                                className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${i < Math.floor(wig.rating)
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

                                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                          <span className="text-base sm:text-lg font-semibold">{wig.price.toLocaleString()} FCFA</span>
                                          {wig.originalPrice && (
                                            <span className="text-xs sm:text-sm text-muted-foreground line-through">
                                              {wig.originalPrice.toLocaleString()} FCFA
                                            </span>
                                          )}
                                        </div>

                                        {/* Mobile details */}
                                        <div className="sm:hidden mt-2 text-xs text-muted-foreground">
                                          {wig.length} • {wig.texture}
                                        </div>
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                              </AnimatePresence>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

              {filteredWigs.length === 0 && (
                <div className="text-center py-12 sm:py-20 px-4">
                  <p className="text-lg sm:text-xl text-muted-foreground mb-4">
                    Aucune perruque ne correspond à vos filtres
                  </p>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={() =>
                      setFilters({
                        type: [],
                        texture: [],
                        length: [],
                        color: [],
                        collection: [],
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
