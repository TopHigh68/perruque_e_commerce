import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-model-1.jpg';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent z-10" />
        <img
          src={heroImage}
          alt="Belle femme portant une perruque de luxe"
          className="w-full h-full object-cover object-center img-zoom"
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 rounded-full blur-3xl animate-pulse" style={{
        background: 'linear-gradient(135deg, hsl(var(--gold) / 0.2), hsl(var(--champagne) / 0.3))'
      }} />
      <div className="absolute bottom-32 right-20 w-24 h-24 rounded-full blur-2xl animate-pulse" style={{
        background: 'linear-gradient(135deg, hsl(var(--rose) / 0.3), hsl(var(--gold) / 0.2))',
        animationDelay: '1s'
      }} />

      {/* Content */}
      <div className="container-luxury relative z-20 pt-32">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex text-white items-center gap-2 px-4 py-2 rounded-full glass border text-sm font-medium" style={{
              backgroundColor: 'hsl(var(--gold) / 0.1)',
              borderColor: 'hsl(var(--gold) / 0.3)',
              // color: 'hsl(var(--gold-dark))'
            }}>
              <Star className="h-4 w-4 " style={{
                fill: 'white',
                color: 'hsl(var(--gold))'
              }} />
              Collection Premium 2026
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-4xl lg:text-6xl font-medium leading-tight mb-6"
            style={{ color: 'hsl(var(--foreground))' }}
          >
            <p className='text-center text-white'>Révélez Votre Beauté</p>
            <span className="text-gradient-gold">Une Perruque à la Fois</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl mb-10 leading-relaxed max-w-xl text-white text-center"
            // style={{ color: 'hsl(var(--muted-foreground))' }}
          >
            Vivez le luxe avec nos perruques artisanales, conçues pour la femme moderne 
            qui exige élégance, confort et style impeccable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-12 justify-center"
          >
            <Button 
              asChild 
              className="px-8 py-4 text-base font-medium rounded-full transition-all duration-300 group luxury-card"
              style={{
                backgroundColor: 'hsl(var(--primary))',
                color: 'hsl(var(--primary-foreground))',
                boxShadow: 'var(--shadow-medium)'
              }}
            >
              <Link to="/shop" className="flex items-center justify-center gap-2">
                Acheter Maintenant
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline"
              className="px-8 py-4 text-base font-medium rounded-full transition-all duration-300 glass group"
              style={{
                borderColor: 'hsl(var(--primary) / 0.2)',
                color: 'hsl(var(--primary))'
              }}
            >
              <Link to="/shop?reserve=true" className="flex items-center justify-center gap-2">
                Réserver Votre Perruque
              </Link>
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-center justify-center gap-6 sm:gap-8"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 shadow-sm"
                    style={{
                      borderColor: 'hsl(var(--background))',
                      background: 'linear-gradient(135deg, hsl(var(--champagne)), hsl(var(--gold) / 0.3))'
                    }}
                  />
                ))}
                <div 
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
                  style={{
                    borderColor: 'hsl(var(--background))',
                    backgroundColor: 'hsl(var(--primary) / 0.1)'
                  }}
                >
                  <span className="text-xs font-bold" style={{ color: 'hsl(var(--primary))' }}>+</span>
                </div>
              </div>
              <div className="text-sm">
                <div className="font-semibold" style={{ color: 'hsl(var(--foreground))' }}>5,000+</div>
                <div className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>Clients Satisfaits</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4" style={{
                    fill: 'hsl(var(--gold))',
                    color: 'hsl(var(--gold))'
                  }} />
                ))}
              </div>
              <div className="text-sm ml-2">
                <div className="font-semibold" style={{ color: 'hsl(var(--foreground))' }}>4.9/5</div>
                <div className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>Note</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 flex justify-center pt-2 glass"
          style={{ borderColor: 'hsl(var(--foreground) / 0.3)' }}
        >
          <div className="w-1.5 h-3 rounded-full" style={{ backgroundColor: 'hsl(var(--gold))' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
