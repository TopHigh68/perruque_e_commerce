import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Heart, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Accueil', path: '/' },
  { name: 'Boutique', path: '/shop' },
  { name: 'À propos', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'glass border-b border-border/50 shadow-soft py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="container-luxury flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className={cn(
              "font-serif text-2xl md:text-3xl font-semibold tracking-tight transition-colors",
              isScrolled ? "text-foreground" : "text-white"
            )}>
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
                    ? isScrolled ? 'text-foreground' : 'text-white'
                    : isScrolled ? 'text-muted-foreground hover:text-foreground' : 'text-white/80 hover:text-white'
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                "hidden md:flex transition-colors",
                isScrolled ? "text-foreground hover:text-foreground/80" : "text-white hover:text-white/80"
              )}
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                "relative transition-colors",
                isScrolled ? "text-foreground hover:text-foreground/80" : "text-white hover:text-white/80"
              )}
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold rounded-full text-xs font-semibold flex items-center justify-center text-primary">
                0
              </span>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "lg:hidden transition-colors",
                isScrolled ? "text-foreground hover:text-foreground/80" : "text-white hover:text-white/80"
              )}
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
