import { motion } from 'framer-motion';
const transformations = [
  {
    before: '/src/assets/perruques/femmesansperruque.png',
    after: '/src/assets/perruques/femmeavecperruque.png',
    name: 'Marie K.',
    description: 'Transformation Lisse Platine'
  },
  {
    before: '/src/assets/perruques/femmesansperruque1.png', 
    after: '/src/assets/perruques/femmeavecperruque1.png',
    name: 'Sophie L.',
    description: 'Boucles Auburn Glamour'
  },
  {
    before: '/src/assets/perruques/femmesansperruque2.png',
    after: '/src/assets/perruques/femmeavecperruque2.png', 
    name: 'Fatou D.',
    description: 'Ondulations Naturelles'
  }
];

export const Transformations = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium mb-4">
            Transformations <span className="text-gradient-gold">Spectaculaires</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez comment nos perruques transforment la confiance de nos clientes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {transformations.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl bg-card border border-border/50">
                <div className="grid grid-cols-2">
                  <div className="relative">
                    <img src={item.before} alt="Avant" className="w-full h-48 object-cover" />
                    <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      Avant
                    </div>
                  </div>
                  <div className="relative">
                    <img src={item.after} alt="Après" className="w-full h-48 object-cover" />
                    <div className="absolute top-2 right-2 bg-gold text-white px-2 py-1 rounded text-xs">
                      Après
                    </div>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-medium mb-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};