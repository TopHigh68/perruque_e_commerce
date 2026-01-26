import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Michelle Thompson',
    role: 'Verified Buyer',
    content: 'The quality is absolutely incredible. This wig looks so natural that even my closest friends couldn\'t tell the difference. I\'ve received so many compliments!',
    rating: 5,
    wigPurchased: 'Honey Blonde Waves',
  },
  {
    id: 2,
    name: 'Jasmine Williams',
    role: 'Verified Buyer',
    content: 'LuxeWig has completely transformed my confidence. The lace front is undetectable, and the hair moves so beautifully. Worth every penny!',
    rating: 5,
    wigPurchased: 'Silky Straight Noir',
  },
  {
    id: 3,
    name: 'Aisha Johnson',
    role: 'Verified Buyer',
    content: 'I was nervous about ordering online, but the VIP support team walked me through everything. The wig arrived perfectly styled and ready to wear.',
    rating: 5,
    wigPurchased: 'Natural Afro Queen',
  },
];

export function Testimonials() {
  return (
    <section className="section-padding bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold via-transparent to-transparent" />
      </div>

      <div className="container-luxury relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-gold text-sm font-semibold tracking-wider uppercase mb-4"
          >
            Real Stories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl font-medium"
          >
            Loved by <span className="text-gold">Thousands</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative p-8 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur-sm"
            >
              <Quote className="h-10 w-10 text-gold/30 mb-6" />
              
              <p className="text-primary-foreground/90 leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>

              <div>
                <p className="font-medium">{testimonial.name}</p>
                <p className="text-sm text-primary-foreground/60">
                  {testimonial.role} • {testimonial.wigPurchased}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
