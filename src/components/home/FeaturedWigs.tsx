import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import wigProduct1 from '@/assets/wig-product-1.jpg';
import wigProduct2 from '@/assets/wig-product-2.jpg';
import wigProduct3 from '@/assets/wig-product-3.jpg';
import wigProduct4 from '@/assets/wig-product-4.jpg';

const featuredWigs = [
  {
    id: 1,
    name: 'Lisse Soyeux Noir',
    type: 'Cheveux Humains',
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
    price: 313990,
    rating: 4.9,
    reviews: 87,
    image: wigProduct4,
    inStock: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function FeaturedWigs() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-luxury">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-gold-dark text-sm font-semibold tracking-wider uppercase mb-4"
          >
            Sélectionné pour Vous
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl font-medium mb-6"
          >
            Collection <span className="text-gradient-gold">Vedette</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            Découvrez nos perruques les plus aimées, sélectionnées pour leur qualité exceptionnelle, 
            leur design époustouflant et la confiance qu'elles inspirent.
          </motion.p>
        </div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {featuredWigs.map((wig) => (
            <motion.div
              key={wig.id}
              variants={itemVariants}
              className="group"
            >
              <div className="luxury-card bg-card rounded-2xl overflow-hidden border border-border/50">
                {/* Image Container */}
                <div className="relative aspect-square img-zoom">
                  <img
                    src={wig.image}
                    alt={wig.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Badge */}
                  {wig.badge && (
                    <Badge className="absolute top-4 left-4 bg-gold text-white border-0 font-semibold">
                      {wig.badge}
                    </Badge>
                  )}

                  {/* Wishlist Button */}
                  <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-black/80 hover:scale-110">
                    <Heart className="h-5 w-5 text-white" />
                  </button>

                  {/* Quick Add */}
                  <div className="absolute bottom-4  left-4 right-4  flex justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                    <Button variant="gold" size="lg" className=" w-[70%] bg-[#e1b052] rounded-xl hover:bg-[#d89c2b] cursor-pointer text-white">
                      <ShoppingBag className="h-4 w-4" />
                      Ajouter au Panier
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {wig.type}
                  </span>
                  <h3 className="font-serif text-lg font-medium mt-1 mb-2 group-hover:text-gold-dark transition-colors">
                    <Link to={`/product/${wig.id}`}>{wig.name}</Link>
                  </h3>

                  {/* Rating */}
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

                  {/* Price */}
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
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button asChild variant="luxury-outline" size="lg">
            <Link to="/shop" className="group">
              Voir Toutes les Perruques
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
