import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { Header } from '@/components/layout/Header';
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
import wigProduct1 from '@/assets/wig-product-1.jpg';
import wigProduct2 from '@/assets/wig-product-2.jpg';
import wigProduct3 from '@/assets/wig-product-3.jpg';
import wigProduct4 from '@/assets/wig-product-4.jpg';

const allWigs = [
  {
    id: 1,
    name: 'Silky Straight Noir',
    type: 'Human Hair',
    texture: 'Straight',
    length: '18"',
    color: 'Black',
    price: 449,
    originalPrice: 549,
    rating: 4.9,
    reviews: 128,
    image: wigProduct1,
    badge: 'Best Seller',
    inStock: true,
  },
  {
    id: 2,
    name: 'Auburn Curly Glamour',
    type: 'Human Hair',
    texture: 'Curly',
    length: '16"',
    color: 'Auburn',
    price: 529,
    rating: 4.8,
    reviews: 96,
    image: wigProduct2,
    badge: 'New Arrival',
    inStock: true,
  },
  {
    id: 3,
    name: 'Honey Blonde Waves',
    type: 'Human Hair',
    texture: 'Body Wave',
    length: '22"',
    color: 'Blonde',
    price: 599,
    rating: 5.0,
    reviews: 214,
    image: wigProduct3,
    badge: "Editor's Choice",
    inStock: true,
  },
  {
    id: 4,
    name: 'Natural Afro Queen',
    type: 'Human Hair',
    texture: 'Kinky',
    length: '14"',
    color: 'Black',
    price: 479,
    rating: 4.9,
    reviews: 87,
    image: wigProduct4,
    inStock: true,
  },
  {
    id: 5,
    name: 'Classic Bob Black',
    type: 'Synthetic',
    texture: 'Straight',
    length: '12"',
    color: 'Black',
    price: 189,
    rating: 4.7,
    reviews: 156,
    image: wigProduct1,
    inStock: true,
  },
  {
    id: 6,
    name: 'Ombre Elegance',
    type: 'Human Hair',
    texture: 'Body Wave',
    length: '20"',
    color: 'Ombre',
    price: 549,
    rating: 4.8,
    reviews: 92,
    image: wigProduct3,
    inStock: false,
  },
  {
    id: 7,
    name: 'Deep Curly Burgundy',
    type: 'Human Hair',
    texture: 'Curly',
    length: '18"',
    color: 'Burgundy',
    price: 489,
    rating: 4.9,
    reviews: 73,
    image: wigProduct2,
    badge: 'Limited Edition',
    inStock: true,
  },
  {
    id: 8,
    name: 'Natural Kinky Coils',
    type: 'Human Hair',
    texture: 'Kinky',
    length: '16"',
    color: 'Black',
    price: 459,
    rating: 4.8,
    reviews: 64,
    image: wigProduct4,
    inStock: true,
  },
];

const filterOptions = {
  type: ['Human Hair', 'Synthetic'],
  texture: ['Straight', 'Curly', 'Body Wave', 'Kinky'],
  length: ['12"', '14"', '16"', '18"', '20"', '22"'],
  color: ['Black', 'Auburn', 'Blonde', 'Burgundy', 'Ombre'],
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
    priceRange: [0, 700],
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

  const FilterSection = ({ category }: { category: FilterKey }) => (
    <div className="mb-6">
      <h4 className="font-medium mb-3 capitalize">{category}</h4>
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

  const FiltersContent = () => (
    <div className="space-y-6">
      <FilterSection category="type" />
      <FilterSection category="texture" />
      <FilterSection category="length" />
      <FilterSection category="color" />
      
      <div className="mb-6">
        <h4 className="font-medium mb-4">Price Range</h4>
        <Slider
          value={filters.priceRange}
          onValueChange={(value) => setFilters((prev) => ({ ...prev, priceRange: value as [number, number] }))}
          max={700}
          step={10}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${filters.priceRange[0]}</span>
          <span>${filters.priceRange[1]}</span>
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
            priceRange: [0, 700],
          })
        }
      >
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24">
        {/* Page Header */}
        <div className="bg-secondary/30 py-16 md:py-24">
          <div className="container-luxury text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-4"
            >
              Shop <span className="text-gradient-gold">Premium Wigs</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Discover our collection of luxury wigs crafted with the finest quality hair
            </motion.p>
          </div>
        </div>

        <div className="container-luxury py-12">
          <div className="flex gap-8">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-28">
                <h3 className="font-serif text-xl font-medium mb-6">Filters</h3>
                <FiltersContent />
              </div>
            </aside>

            {/* Products Section */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-8">
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">{sortedWigs.length}</span> wigs found
                </p>

                <div className="flex items-center gap-4">
                  {/* Mobile Filter Button */}
                  <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="lg:hidden">
                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                      <SheetHeader>
                        <SheetTitle className="font-serif">Filters</SheetTitle>
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
                      <option value="featured">Featured</option>
                      <option value="new">Newest</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
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
                            <Badge className="absolute top-4 left-4 bg-gold text-primary border-0 font-semibold">
                              {wig.badge}
                            </Badge>
                          )}

                          {!wig.inStock && (
                            <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                              <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                                Sold Out
                              </span>
                            </div>
                          )}

                          <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-background hover:scale-110">
                            <Heart className="h-5 w-5" />
                          </button>

                          {wig.inStock && (
                            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                              <Button variant="gold" size="lg" className="w-full">
                                <ShoppingBag className="h-4 w-4" />
                                Add to Cart
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
                            <span className="text-lg font-semibold">${wig.price}</span>
                            {wig.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                ${wig.originalPrice}
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
                    No wigs match your filters
                  </p>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setFilters({
                        type: [],
                        texture: [],
                        length: [],
                        color: [],
                        priceRange: [0, 700],
                      })
                    }
                  >
                    Clear Filters
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
