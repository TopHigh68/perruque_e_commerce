import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CallToAction() {
  return (
    <section className="section-padding">
      <div className="container-luxury">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-champagne via-rose/50 to-champagne-dark p-12 md:p-20">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-dark/20 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-6 text-foreground"
            >
              Prêt à Transformer Votre Look ?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              Découvrez la perruque parfaite qui correspond à votre style et votre personnalité. 
              Explorez notre collection ou réservez votre perruque pour une expérience personnalisée.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild variant="hero" size="hero">
                <Link to="/shop" className="group flex items-center  hover:text-[#e1b052] justify-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Explorer la Collection
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="hero-secondary" size="hero" className='bg-[#e1b052] hover:bg-[#d89c2b]'>
                <Link to="/shop?reserve=true" className="group flex items-center justify-center gap-2 ">
                  <Calendar className="h-5 w-5" />
                  Réserver une Perruque
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
