import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Award, Users, Sparkles } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-model-1.jpg';

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-transparent z-10" />
          <div className="absolute inset-0 opacity-30">
            <img
              src={heroImage}
              alt="About LuxeWig"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="container-luxury relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <span className="inline-block text-gold-dark text-sm font-semibold tracking-wider uppercase mb-4">
                Our Story
              </span>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium leading-tight mb-6">
                Crafting Confidence,{' '}
                <span className="text-gradient-gold">One Wig at a Time</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                At LuxeWig, we believe every woman deserves to feel beautiful and confident. 
                Our journey began with a simple mission: to create wigs that don't just look 
                natural, but feel like an extension of who you are.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="section-padding bg-secondary/30">
          <div className="container-luxury">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Heart,
                  title: 'Passion for Beauty',
                  description: 'Every wig is crafted with love and attention to detail, ensuring you receive a product that exceeds expectations.',
                },
                {
                  icon: Award,
                  title: 'Premium Quality',
                  description: 'We source only the finest 100% Remy human hair and use advanced techniques for the most natural-looking wigs.',
                },
                {
                  icon: Users,
                  title: 'Customer First',
                  description: 'Our dedicated team of stylists and support staff are here to guide you every step of your wig journey.',
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
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/20 to-champagne flex items-center justify-center mx-auto mb-6">
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
                  The Journey
                </span>
                <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6">
                  From Dream to <span className="text-gradient-gold">Reality</span>
                </h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p>
                    LuxeWig was born from a personal experience. Our founder, after struggling to 
                    find quality wigs that looked and felt natural, decided to create her own solution.
                  </p>
                  <p>
                    What started as a small operation has grown into a beloved brand trusted by 
                    thousands of women worldwide. We've helped women going through medical treatments, 
                    busy professionals looking for convenience, and style enthusiasts seeking versatility.
                  </p>
                  <p>
                    Today, every wig we create carries that same passion and attention to detail 
                    that inspired our journey from the very beginning.
                  </p>
                </div>
                <Button asChild variant="luxury-outline" size="lg" className="mt-8">
                  <Link to="/shop" className="group">
                    Explore Our Collection
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
                <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                  <img
                    src={heroImage}
                    alt="Our story"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 -left-8 bg-gold text-primary p-8 rounded-2xl">
                  <Sparkles className="h-8 w-8 mb-3" />
                  <p className="font-serif text-3xl font-semibold">5,000+</p>
                  <p className="text-primary/80">Happy Customers</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="container-luxury text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6">
                Ready to Find Your Perfect Wig?
              </h2>
              <p className="text-primary-foreground/70 text-lg mb-10">
                Join thousands of confident women who trust LuxeWig for their hair transformation.
              </p>
              <Button asChild variant="gold" size="hero">
                <Link to="/shop" className="group">
                  Shop Now
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
