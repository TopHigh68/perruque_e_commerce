import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';
import logo from '@/assets/logo/logo.png';

const navLinks = [
  { name: 'Accueil', path: '/' },
  { name: 'Boutique', path: '/shop' },
  { name: 'À propos', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export function FixedHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { toggleCart, totalItems } = useCart();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50 shadow-soft py-3 transition-all duration-500">
        <div className="container-luxury flex items-center justify-between">
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-foreground hover:text-foreground/80 transition-colors mr-3"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="LuxeWig Logo" 
              className="h-8 w-8 md:h-10 md:w-10 object-contain"
            />
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
                  'relative text-sm font-medium tracking-wide transition-colors pb-1',
                  location.pathname === link.path
                    ? 'text-[#e1b052] font-bold'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="activeFixedTab"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-[#e1b052] rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative text-foreground cursor-pointer hover:text-foreground/80 transition-colors"
              onClick={toggleCart}
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold rounded-full text-xs font-semibold flex items-center justify-center text-primary">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-60 lg:hidden"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/60"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-white border-r border-gray-200 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
                <span className="font-serif text-xl font-semibold text-gray-900">
                  Luxe<span className="text-[#e1b052]">Wig</span>
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Navigation */}
              <nav className="p-6 bg-white">
                <div className="space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={link.path}
                        className={cn(
                          'flex items-center justify-between w-full p-4 rounded-lg transition-all duration-200',
                          location.pathname === link.path
                            ? 'bg-[#e1b052]/10 text-[#e1b052] font-semibold border-l-4 border-[#e1b052]'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="text-lg">{link.name}</span>
                        {location.pathname === link.path && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-[#e1b052] rounded-full"
                          />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>

              {/* Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-white">
                <Button
                  onClick={() => {
                    toggleCart();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-[#e1b052] hover:bg-[#d89c2b] text-white"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Panier ({totalItems})
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}