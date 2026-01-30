
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { FixedHeader } from '@/components/layout/FixedHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Contact = () => {
  return (
    <div className="min-h-screen">
      <FixedHeader />

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
                      className="min-h-37.5 resize-none"
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
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-gold/20 to-champagne flex items-center justify-center shrink-0">
                      <Mail className="h-6 w-6 text-gold-dark" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Écrivez-nous</h3>
                      <p className="text-muted-foreground">contact@luxewig.com</p>
                      <p className="text-sm text-muted-foreground">Nous répondons sous 24h</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-gold/20 to-champagne flex items-center justify-center shrink-0">
                      <Phone className="h-6 w-6 text-gold-dark" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Appelez-nous</h3>
                      <p className="text-muted-foreground">+229 01 51 00 00 00</p>
                      <p className="text-sm text-muted-foreground">Lun-Ven 9h-18h</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-gold/20 to-champagne flex items-center justify-center shrink-0">
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
                    <svg width="20" height="20" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="mr-2">
                      <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                    </svg>
                    Démarrer le Chat WhatsApp
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.292292615674073!3d48.85837007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1635789012345!5m2!1sen!2sfr"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Notre localisation"
          />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
