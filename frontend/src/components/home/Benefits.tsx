import { motion } from 'framer-motion';
import { Truck, Shield, HeadphonesIcon, Sparkles, RefreshCw, Award } from 'lucide-react';

const benefits = [
  {
    icon: Truck,
    title: 'Livraison Rapide & Gratuite',
    description: 'Livraison express gratuite sur les commandes de plus de 200000 FCFA',
  },
  {
    icon: Shield,
    title: 'Qualité Garantie',
    description: '100% cheveux humains premium avec un aspect et toucher naturels',
  },
  {
    icon: HeadphonesIcon,
    title: 'Support VIP',
    description: 'Consultations personnalisées avec nos stylistes experts',
  },
  {
    icon: Sparkles,
    title: 'Excellence Artisanale',
    description: 'Chaque perruque est nouée à la main pour la ligne de cheveux la plus naturelle',
  },
  {
    icon: RefreshCw,
    title: 'Retours Faciles',
    description: 'Retours sans tracas sous 30 jours sur les perruques non portées',
  },
  {
    icon: Award,
    title: 'Approuvé par des Milliers',
    description: '5 000+ clients satisfaits avec une note moyenne de 4,9',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Benefits() {
  return (
    <section className="">
      <div className="container-luxury">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-gold-dark text-sm font-semibold tracking-wider uppercase mb-4"
          >
            Pourquoi Nous Choisir
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl font-medium"
          >
            La Promesse <span className="text-gradient-gold">LuxeWig</span>
          </motion.h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={itemVariants}
              className="group relative p-8 rounded-2xl bg-card border border-border/50 hover:border-gold/30 transition-all duration-500 hover:shadow-soft"
            >
              <div className="w-14 h-14 rounded-xl bg-linear-to-br from-gold/20 to-champagne flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <benefit.icon className="h-7 w-7 text-gold-dark" />
              </div>
              <h3 className="font-serif text-xl font-medium mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
