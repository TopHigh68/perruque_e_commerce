import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star, Truck, Shield, RefreshCw, ChevronLeft, ChevronRight, Calendar, Check } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import wigProduct1 from '@/assets/wig-product-1.jpg';
import wigProduct2 from '@/assets/wig-product-2.jpg';
import wigProduct3 from '@/assets/wig-product-3.jpg';
import wigProduct4 from '@/assets/wig-product-4.jpg';

// Mock product data (in a real app, this would come from an API)
const productData = {
  id: 1,
  name: 'Silky Straight Noir',
  type: 'Human Hair',
  price: 449,
  originalPrice: 549,
  rating: 4.9,
  reviews: 128,
  images: [wigProduct1, wigProduct2, wigProduct3, wigProduct4],
  badge: 'Best Seller',
  inStock: true,
  description: 'Experience the epitome of luxury with our Silky Straight Noir wig. Crafted from 100% premium Remy human hair, this wig offers an undetectable hairline and natural movement that will have everyone believing it\'s your own hair.',
  details: {
    hairType: '100% Remy Human Hair',
    laceType: 'HD Invisible Lace Front',
    capSize: 'Medium (22.5" - 23")',
    density: '180% Full Density',
    length: '18 inches',
    color: 'Jet Black (1B)',
    texture: 'Silky Straight',
  },
  careInstructions: [
    'Wash with sulfate-free shampoo every 7-10 wears',
    'Use a wide-tooth comb, starting from the ends',
    'Air dry whenever possible to maintain quality',
    'Store on a wig stand when not in use',
    'Use heat protectant before styling with hot tools',
  ],
};

const relatedProducts = [
  { id: 2, name: 'Auburn Curly Glamour', price: 529, image: wigProduct2, rating: 4.8 },
  { id: 3, name: 'Honey Blonde Waves', price: 599, image: wigProduct3, rating: 5.0 },
  { id: 4, name: 'Natural Afro Queen', price: 479, image: wigProduct4, rating: 4.9 },
];

const ProductDetail = () => {
    const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showReservation, setShowReservation] = useState(false);

  const product = productData; // In real app, fetch based on id

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24">
        {/* Breadcrumb */}
        <div className="container-luxury py-6">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>

        {/* Product Section */}
        <div className="container-luxury pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary/30 mb-4">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {product.badge && (
                  <Badge className="absolute top-4 left-4 bg-gold text-primary border-0 font-semibold text-sm px-4 py-1">
                    {product.badge}
                  </Badge>
                )}

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-all"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-all"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? 'border-gold' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm text-gold-dark font-semibold uppercase tracking-wider">
                {product.type}
              </span>
              
              <h1 className="font-serif text-4xl md:text-5xl font-medium mt-2 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-semibold">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                    <Badge variant="secondary" className="bg-rose text-rose-dark border-0">
                      Save ${product.originalPrice - product.price}
                    </Badge>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-secondary transition-colors"
                  >
                    -
                  </button>
                  <span className="px-6 py-3 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 hover:bg-secondary transition-colors"
                  >
                    +
                  </button>
                </div>

                <Button variant="gold" size="xl" className="flex-1">
                  <ShoppingBag className="h-5 w-5" />
                  Add to Cart
                </Button>

                <Button variant="outline" size="icon" className="h-14 w-14">
                  <Heart className="h-6 w-6" />
                </Button>
              </div>

              {/* Reserve Button */}
              <Button
                variant="luxury-outline"
                size="lg"
                className="w-full mb-8"
                onClick={() => setShowReservation(!showReservation)}
              >
                <Calendar className="h-5 w-5" />
                Reserve This Wig
              </Button>

              {/* Reservation Form (simplified) */}
              {showReservation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-secondary/50 rounded-xl p-6 mb-8"
                >
                  <h3 className="font-serif text-lg font-medium mb-4">Reserve Your Wig</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Reserve without payment. We'll hold this wig for you and contact you to arrange pickup or delivery.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-gold mb-4"
                  />
                  <Button variant="gold" className="w-full">
                    Confirm Reservation
                  </Button>
                </motion.div>
              )}

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 border-t border-border pt-8">
                <div className="text-center">
                  <Truck className="h-6 w-6 mx-auto mb-2 text-gold" />
                  <p className="text-xs text-muted-foreground">Free Shipping</p>
                </div>
                <div className="text-center">
                  <Shield className="h-6 w-6 mx-auto mb-2 text-gold" />
                  <p className="text-xs text-muted-foreground">Quality Guaranteed</p>
                </div>
                <div className="text-center">
                  <RefreshCw className="h-6 w-6 mx-auto mb-2 text-gold" />
                  <p className="text-xs text-muted-foreground">30-Day Returns</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-20">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent h-auto p-0 mb-8">
                <TabsTrigger
                  value="details"
                  className="font-serif text-lg px-6 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:bg-transparent"
                >
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value="care"
                  className="font-serif text-lg px-6 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:bg-transparent"
                >
                  Care Instructions
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="font-serif text-lg px-6 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:bg-transparent"
                >
                  Reviews ({product.reviews})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
                  {Object.entries(product.details).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-3 border-b border-border/50">
                      <span className="text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="care" className="mt-0">
                <div className="max-w-2xl">
                  <ul className="space-y-4">
                    {product.careInstructions.map((instruction, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-gold mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-0">
                <div className="text-center py-12 text-muted-foreground">
                  <p>Reviews coming soon!</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          <div className="mt-20">
            <h2 className="font-serif text-3xl font-medium mb-8">You May Also Love</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((wig) => (
                <Link key={wig.id} to={`/product/${wig.id}`} className="group">
                  <div className="luxury-card bg-card rounded-2xl overflow-hidden border border-border/50">
                    <div className="aspect-square img-zoom">
                      <img
                        src={wig.image}
                        alt={wig.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif text-lg font-medium group-hover:text-gold-dark transition-colors">
                        {wig.name}
                      </h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-semibold">${wig.price}</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-gold text-gold" />
                          <span className="text-sm">{wig.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
