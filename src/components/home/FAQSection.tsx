import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Who can join the Robotics Club?',
    a: 'Any student of NIT Patna, regardless of branch or year, can join. We welcome freshers with zero experience — all you need is curiosity and willingness to learn.',
  },
  {
    q: 'Do I need prior robotics experience?',
    a: 'Not at all. We run beginner-friendly workshops at the start of each semester covering electronics, programming, and mechanical basics. You\'ll be assigned a mentor to guide you.',
  },
  {
    q: 'What is the time commitment?',
    a: 'Typically 6–8 hours per week, including weekly meetings, workshop sessions, and project work. During competition season, it can be more intensive but always rewarding.',
  },
  {
    q: 'How are project teams formed?',
    a: 'We form cross-functional teams based on interest and skill level. Each team has a mix of experienced and new members, with a senior lead overseeing progress.',
  },
  {
    q: 'Are there any membership fees?',
    a: 'No, there are no membership fees. Club participation is free for students, and major project expenses are supported through institute resources, events, and sponsorships when needed.',
  },
];

function FAQItem({ item, isOpen, onToggle }: { item: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-border/60 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="font-heading font-semibold text-base pr-8 group-hover:text-primary transition-colors">{item.q}</span>
        <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-muted-foreground leading-relaxed pr-12">{item.a}</p>
      </motion.div>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Left — Header */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block text-sm font-semibold text-primary tracking-wide uppercase mb-4"
            >
              FAQ
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-heading text-4xl sm:text-5xl font-bold tracking-tight mb-6"
            >
              Got questions? <br />
              <span className="text-muted-foreground">We've got answers.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-muted-foreground leading-relaxed"
            >
              Everything you need to know about joining and participating in the Robotics Club at NIT Patna.
            </motion.p>
          </div>

          {/* Right — Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {faqs.map((item, i) => (
              <FAQItem
                key={i}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
