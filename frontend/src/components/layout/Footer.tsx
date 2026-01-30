import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const footerLinks = {
  shop: [
    { name: 'Perruques Cheveux Humains', path: '/shop?type=human' },
    { name: 'Perruques Synthétiques', path: '/shop?type=synthetic' },
    { name: 'Nouveautés', path: '/shop?sort=new' },
    { name: 'Meilleures Ventes', path: '/shop?sort=bestseller' },
  ],
  support: [
    { name: 'FAQ', path: '/faq' },
    { name: 'Guide d\'Entretien', path: '/care-guide' },
    { name: 'Infos Livraison', path: '/shipping' },
    { name: 'Retours & Échanges', path: '/returns' },
  ],
  company: [
    { name: 'À Propos', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Blog', path: '/blog' },
    { name: 'Carrières', path: '/careers' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'Youtube' },
];

export function Footer() {
  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--gold))_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--gold))_0%,transparent_50%)]" />
      </div>

      {/* Newsletter Section */}
      <div className="relative z-10 border-b border-white/10">
        <div className="container-luxury py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-linear-to-br from-gold to-gold-dark mb-4">
              <Mail className="h-6 w-6 text-black" />
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-medium mb-4 bg-linear-to-r from-white via-gold to-white bg-clip-text text-transparent">
              Rejoignez la Famille LuxeWig
            </h3>
            <p className="text-white/70 mb-6 leading-relaxed">
              Abonnez-vous pour des offres exclusives et conseils d'entretien.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Entrez votre email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12 rounded-full px-4 backdrop-blur-sm focus:bg-white/15 focus:border-gold"
              />
              <Button 
                size="lg" 
                className="h-12 px-6 bg-linear-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-black font-semibold rounded-full transition-all duration-300 hover:scale-105"
              >
                S'abonner
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative z-10 container-luxury py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="font-serif text-2xl font-semibold tracking-tight">
                Luxe<span className="text-gradient-gold">Wig</span>
              </span>
            </Link>
            <p className="text-white/70 mb-6 max-w-sm leading-relaxed">
              Perruques de qualité premium conçues pour la confiance.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="group w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-linear-to-br hover:from-gold hover:to-gold-dark hover:border-gold hover:scale-110 backdrop-blur-sm"
                >
                  <social.icon className="h-4 w-4 text-white group-hover:text-black transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-4 text-gold relative">
              Boutique
              <div className="absolute -bottom-1 left-0 w-6 h-0.5 bg-linear-to-r from-gold to-transparent"></div>
            </h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/70 hover:text-gold transition-all duration-300 hover:translate-x-1 inline-block text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-4 text-gold relative">
              Aide
              <div className="absolute -bottom-1 left-0 w-6 h-0.5 bg-linear-to-r from-gold to-transparent"></div>
            </h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/70 hover:text-gold transition-all duration-300 hover:translate-x-1 inline-block text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-4 text-gold relative">
              Contact
              <div className="absolute -bottom-1 left-0 w-6 h-0.5 bg-linear-to-r from-gold to-transparent"></div>
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-gold/20 to-gold-dark/20 flex items-center justify-center group-hover:from-gold group-hover:to-gold-dark transition-all duration-300">
                  <Mail className="h-4 w-4 text-gold group-hover:text-black transition-colors" />
                </div>
                <span className="text-white/70 group-hover:text-white transition-colors text-sm">hello@luxewig.com</span>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-gold/20 to-gold-dark/20 flex items-center justify-center group-hover:from-gold group-hover:to-gold-dark transition-all duration-300">
                  <Phone className="h-4 w-4 text-gold group-hover:text-black transition-colors" />
                </div>
                <span className="text-white/70 group-hover:text-white transition-colors text-sm">+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-gold/20 to-gold-dark/20 flex items-center justify-center group-hover:from-gold group-hover:to-gold-dark transition-all duration-300">
                  <MapPin className="h-4 w-4 text-gold group-hover:text-black transition-colors" />
                </div>
                <span className="text-white/70 group-hover:text-white transition-colors text-sm">
                  Paris, France
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="container-luxury py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-linear-to-br from-gold to-gold-dark flex items-center justify-center">
                <span className="text-black font-bold text-xs">©</span>
              </div>
              <p className="text-white/60 text-xs">
                2024 LuxeWig. Tous droits réservés.
              </p>
            </div>
            <div className="flex gap-6 text-xs">
              <Link to="/privacy" className="text-white/60 hover:text-gold transition-all duration-300">
                Confidentialité
              </Link>
              <Link to="/terms" className="text-white/60 hover:text-gold transition-all duration-300">
                Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
