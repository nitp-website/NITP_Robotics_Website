import { motion } from 'framer-motion';

const logos = [
  'NIT Patna', 'IIT Kharagpur', 'DRDO', 'ISRO', 'Kshitij', 'IEEE', 'NIT Jalandar',
];

export function BrandStripSection() {
  return (
    <section className="py-16 border-y border-border/50 bg-muted/30 dark:bg-muted/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm font-medium text-muted-foreground mb-10 tracking-wide uppercase"
        >
          Technical Engagements
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logos.map((logo, i) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors duration-300 font-heading font-bold text-lg sm:text-xl tracking-tight select-none"
            >
              {logo}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
