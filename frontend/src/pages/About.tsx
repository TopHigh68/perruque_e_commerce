import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Award, Users } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-model-1.jpg';
import heroImage1 from '@/assets/perruques/heroaboutimage.jpg';


const About = () => {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-background/95 via-background/70 to-transparent z-10" />
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt="About LuxeWig"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="container-luxury relative z-20 pt-20 md:pt-32 px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-4xl mx-auto"
            >
              <p className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center font-semibold tracking-wider uppercase mb-4 md:mb-6">
                Notre Histoire
              </p>
              <div className="text-center space-y-4 md:space-y-6 px-4">
                <p className="text-lg sm:text-xl md:text-xl text-white/90 leading-relaxed font-light max-w-3xl mx-auto">
                  Chez <span className="text-gold font-medium">LuxeWig</span>, nous croyons que chaque femme mérite 
                  de se sentir <span className="text-white font-medium">belle et confiante</span>.
                </p>
                <p className="text-base sm:text-lg md:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
                  Notre voyage a commencé avec une mission simple : vendre des perruques qui ne semblent pas seulement 
                  naturelles, mais qui <em className="text-gold-light">se sentent comme une extension de qui vous êtes</em>.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className=" pt-20 bg-secondary/30">
          <div className="container-luxury">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Heart,
                  title: 'Passion pour la Beauté',
                  description: 'Chaque perruque est confectionnée avec amour et attention aux détails, vous garantissant un produit qui dépasse vos attentes.',
                },
                {
                  icon: Award,
                  title: 'Qualité Premium',
                  description: 'Nous sélectionnons uniquement les meilleurs cheveux humains 100% Remy et utilisons des techniques avancées pour des perruques au rendu le plus naturel.',
                },
                {
                  icon: Users,
                  title: 'Client d\'Abord',
                  description: 'Notre équipe dédiée de stylistes et de support est là pour vous guider à chaque étape de votre parcours perruque.',
                },
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="text-center p-8"
                >
                  <div className="w-16 h-16 rounded-full bg-linear-to-br from-gold/20 to-champagne flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-8 w-8 text-gold-dark" />
                  </div>
                  <h3 className="font-serif text-2xl font-medium mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="section-padding">
          <div className="container-luxury">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="inline-block text-gold-dark text-sm font-semibold tracking-wider uppercase mb-4">
                  Le Parcours
                </span>
                <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6">
                  Du Rêve à la <span className="text-gradient-gold">Réalité</span>
                </h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p>
                    LuxeWig est né d'une expérience personnelle. Notre fondatrice, après avoir eu du mal à 
                    trouver des perruques de qualité qui paraissaient et se sentaient naturelles, a décidé de créer sa propre solution.
                  </p>
                  <p>
                    Ce qui a commencé comme une petite opération s'est transformé en une marque bien-aimée à laquelle 
                    font confiance des milliers de femmes dans le monde. Nous avons aidé des femmes suivant des traitements médicaux, 
                    des professionnelles occupées recherchant la praticité, et des passionnées de style en quête de polyvalence.
                  </p>
                  <p>
                    Aujourd'hui, chaque perruque que nous créons porte cette même passion et attention aux détails 
                    qui ont inspiré notre parcours depuis le tout début.
                  </p>
                </div>
                <Button asChild variant="luxury-outline" size="lg" className="mt-8">
                  <Link to="/shop" className="group">
                    Découvrir Notre Collection
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-4/5 rounded-2xl overflow-hidden">
                  <img
                    src={heroImage1}
                    alt="Notre histoire"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className=" pb-20 bg-primary text-primary-foreground">
          <div className="container-luxury text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6">
                Prête à Trouver Votre Perruque Parfaite ?
              </h2>
              <p className="text-primary-foreground/70 text-lg mb-10">
                Rejoignez des milliers de femmes confiantes qui font confiance à LuxeWig pour leur transformation capillaire.
              </p>
              <Button asChild variant="gold" size="hero" className='bg-[#e1b052] hover:bg-[#d89c2b]'>
                <Link to="/shop" className="group">
                  Acheter Maintenant
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
