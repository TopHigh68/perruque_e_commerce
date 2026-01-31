import { motion } from 'framer-motion';
import { Shield, Truck, RefreshCw, Award, Lock, Phone } from 'lucide-react';

const trustBadges = [
  {
    icon: Shield,
    title: 'Garantie 30 Jours',
    description: 'Satisfait ou remboursé'
  },
  {
    icon: Truck,
    title: 'Livraison Gratuite',
    description: 'Dès 200 000 FCFA'
  },
  {
    icon: RefreshCw,
    title: 'Retour Gratuit',
    description: 'Sous 14 jours'
  },
  {
    icon: Award,
    title: '5000+ Clientes',
    description: 'Note 4.9/5'
  },
  {
    icon: Lock,
    title: 'Paiement Sécurisé',
    description: 'SSL & Cryptage'
  },
  {
    icon: Phone,
    title: 'Support 24/7',
    description: 'Assistance dédiée'
  }
];

export const TrustBadges = () => {
  return (
    <section className="py-8 sm:py-12 bg-secondary/10">
      <div className="container-luxury">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {trustBadges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group p-3 sm:p-4 rounded-xl hover:bg-white/50 transition-all duration-300"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                <badge.icon className="h-5 w-5 sm:h-6 sm:w-6 text-gold" />
              </div>
              <h3 className="font-medium text-xs sm:text-sm mb-1 leading-tight">{badge.title}</h3>
              <p className="text-xs text-muted-foreground leading-tight">{badge.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};