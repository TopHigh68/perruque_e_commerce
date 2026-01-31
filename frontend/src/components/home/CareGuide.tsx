import { motion } from 'framer-motion';
import { Droplets, Wind, Brush, Shield, Clock, Sparkles } from 'lucide-react';

const careSteps = [
  {
    icon: Brush,
    title: 'Brossage Délicat',
    description: 'Utilisez une brosse spéciale perruque, commencez par les pointes et remontez doucement vers les racines.'
  },
  {
    icon: Droplets,
    title: 'Lavage Doux',
    description: 'Lavez à l\'eau tiède avec un shampooing spécialisé, sans frotter. Laissez tremper 5-10 minutes.'
  },
  {
    icon: Shield,
    title: 'Après-shampooing',
    description: 'Appliquez un après-shampooing pour perruques, évitez les racines. Rincez abondamment.'
  },
  {
    icon: Wind,
    title: 'Séchage Naturel',
    description: 'Laissez sécher à l\'air libre sur un support adapté. Évitez les sources de chaleur directe.'
  },
  {
    icon: Clock,
    title: 'Stockage Approprié',
    description: 'Rangez sur un porte-perruque dans un endroit sec, à l\'abri de la poussière et de la lumière.'
  },
  {
    icon: Sparkles,
    title: 'Entretien Régulier',
    description: 'Entretenez votre perruque tous les 10-15 ports pour maintenir sa beauté et sa durabilité.'
  }
];

export const CareGuide = () => {
  return (
    <section id="care-guide" className="py-16 md:py-24">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium mb-4">
            Guide d'<span className="text-gradient-gold">Entretien</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Suivez nos conseils d'experts pour préserver la beauté et prolonger la durée de vie de votre perruque
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {careSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-6 rounded-2xl bg-card border border-border/50 hover:border-gold/30 transition-all duration-500 hover:shadow-soft"
            >
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                <step.icon className="h-6 w-6 text-gold" />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-6 h-6 rounded-full bg-gold text-white text-xs font-bold flex items-center justify-center">
                  {index + 1}
                </span>
                <h3 className="font-serif text-lg font-medium">{step.title}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 rounded-2xl bg-gold/5 border border-gold/20"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
              <Sparkles className="h-5 w-5 text-gold" />
            </div>
            <div>
              <h3 className="font-medium text-gold mb-2">Conseil d'Expert</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Pour les perruques en cheveux humains, vous pouvez utiliser des outils chauffants à basse température (max 150°C). 
                Appliquez toujours un protecteur thermique avant le coiffage.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};