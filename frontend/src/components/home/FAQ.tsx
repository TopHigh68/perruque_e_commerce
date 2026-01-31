import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqData = [
  {
    question: "Quelle est la qualité de vos perruques ?",
    answer: "Nos perruques sont confectionnées avec des cheveux humains 100% naturels de qualité premium. Chaque pièce est soigneusement sélectionnée et traitée pour garantir une apparence naturelle et une durabilité exceptionnelle."
  },
  {
    question: "Comment choisir la bonne taille de perruque ?",
    answer: "Nous proposons un guide des tailles détaillé avec chaque produit. La plupart de nos perruques sont ajustables grâce à des sangles élastiques. Pour un ajustement parfait, mesurez votre tour de tête et consultez notre tableau des tailles."
  },
  {
    question: "Combien de temps dure une perruque ?",
    answer: "Avec un entretien approprié, nos perruques en cheveux humains peuvent durer de 6 mois à 2 ans selon la fréquence d'utilisation. Nous fournissons des instructions d'entretien détaillées avec chaque achat."
  },
  {
    question: "Proposez-vous la livraison gratuite ?",
    answer: "Oui, nous offrons la livraison gratuite pour toutes les commandes au Bénin. Les délais de livraison sont généralement de 2-5 jours ouvrables à Cotonou et 3-7 jours dans les autres villes."
  },
  {
    question: "Puis-je retourner ma perruque si elle ne me convient pas ?",
    answer: "Nous acceptons les retours dans les 14 jours suivant la réception, à condition que la perruque soit dans son état d'origine avec tous les accessoires. Les frais de retour sont à la charge du client sauf en cas de défaut de fabrication."
  },
  {
    question: "Comment entretenir ma perruque ?",
    answer: "Utilisez des produits spécialement conçus pour les perruques, lavez délicatement à l'eau tiède, laissez sécher à l'air libre sur un support adapté. Évitez les sources de chaleur directe et brossez avec une brosse spéciale perruque."
  }
];

export const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-secondary/20">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium mb-4">
            Questions <span className="text-gradient-gold">Fréquentes</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trouvez les réponses aux questions les plus courantes sur nos perruques et services
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-border/30 rounded-xl overflow-hidden bg-card"
            >
              <button
                onClick={() => toggleExpanded(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/10 transition-colors"
              >
                <h3 className="font-medium text-lg pr-4">{faq.question}</h3>
                {expandedIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gold shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
                )}
              </button>
              
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};