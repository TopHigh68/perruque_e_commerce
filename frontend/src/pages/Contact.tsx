import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, MessageCircle, Menu, X, ShoppingBag, Heart, Search, User } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Accueil', path: '/' },
  { name: 'Boutique', path: '/shop' },
  { name: 'À propos', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const Contact = () => {
  return (
    <div className="min-h-screen">
      <ContactHeader />

      <main>
        {/* Hero Section */}
        <section className="bg-secondary/30 py-16 md:py-24 pt-24">
          <div className="container-luxury text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-4"
            >
              Restons en <span className="text-gradient-gold">Contact</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground max-w-3xl mx-auto"
            >
              <p>Vous avez des questions sur nos perruques ou besoin de conseils de coiffure ?</p> 
              <p>Notre équipe est là pour vous aider à trouver votre look parfait.</p>
            </motion.p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-20">
          <div className="container-luxury">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-serif text-3xl font-medium mb-8">Envoyez-nous un Message</h2>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Prénom</label>
                      <Input placeholder="Votre prénom" className="h-12 focus:border focus:border-[#e1b052]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Nom</label>
                      <Input placeholder="Votre nom" className="h-12 focus:border focus:border-[#e1b052]" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 ">Adresse Email</label>
                    <Input type="email" placeholder="vous@exemple.com" className="h-12 focus:border focus:border-[#e1b052]" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Sujet</label>
                    <Input placeholder="Comment pouvons-nous vous aider ?" className="h-12" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 ">Message</label>
                    <Textarea 
                      placeholder="Parlez-nous de votre demande..." 
                      className="min-h-[150px] resize-none"
                    />
                  </div>

                  <Button variant="gold" size="lg" className="w-full cursor-pointer sm:w-auto bg-[#ebb551] hover:bg-[#d89c2b]   transition-colors">
                    <Send className="h-4 w-4" />
                    Envoyer
                  </Button>
                </form>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-serif text-3xl font-medium mb-8">Informations de Contact</h2>

                <div className="space-y-8 mb-12">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/20 to-champagne flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-gold-dark" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Écrivez-nous</h3>
                      <p className="text-muted-foreground">hello@luxewig.com</p>
                      <p className="text-sm text-muted-foreground">Nous répondons sous 24h</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/20 to-champagne flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-gold-dark" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Appelez-nous</h3>
                      <p className="text-muted-foreground">+33 1 23 45 67 89</p>
                      <p className="text-sm text-muted-foreground">Lun-Ven 9h-18h</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/20 to-champagne flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-gold-dark" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Visitez-nous</h3>
                      <p className="text-muted-foreground">
                        123 Avenue de la Beauté, Suite 100<br />
                        75001 Paris, France
                      </p>
                      <p className="text-sm text-muted-foreground">Sur rendez-vous uniquement</p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <div className="bg-secondary/50 rounded-2xl p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-medium">Chat sur WhatsApp</h3>
                      <p className="text-muted-foreground text-sm">Consultations perruques instantanées</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Vous préférez chatter ? Connectez-vous directement avec nos spécialistes perruques 
                    sur WhatsApp pour des recommandations personnalisées et des réponses rapides.
                  </p>
                  <Button
                    variant="luxury"
                    size="lg"
                    className="w-full bg-[#e1b052] hover:bg-[#d89c2b] transition-color cursor-pointer"
                    onClick={() => window.open('https://wa.me/33123456789', '_blank')}
                  >
                    <MessageCircle className="h-5 w-5" />
                    Démarrer le Chat WhatsApp
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

// Header fixe pour la page Contact
function ContactHeader() {
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
    </>
  );
}

export default Contact;
