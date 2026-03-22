import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

export function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section ref={ref} className="relative min-h-[100svh] flex items-center justify-center overflow-hidden -mt-20 pt-32 sm:pt-36 md:pt-40 lg:pt-44">
      {/* Ambient Light — adapts to theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-transparent dark:from-primary/[0.08]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/[0.04] dark:bg-primary/[0.06] rounded-full blur-[120px]" />
      
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />

      <motion.div style={{ y, opacity: textOpacity, scale }} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Club Name */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="mb-16"
          >
            <div className="inline-flex flex-col items-center gap-3 px-8 py-6 rounded-3xl glass border border-primary/20 bg-primary/5 dark:bg-primary/5 dark:border-primary/20">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                Robotics Club
              </h2>
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                <span className="text-lg sm:text-xl md:text-2xl font-heading font-medium text-primary tracking-wider">
                  NIT PATNA
                </span>
                <div className="h-px w-12 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 glass rounded-full px-5 py-2 mb-16"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-sm font-medium text-muted-foreground">Open for new members — Spring 2026</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.05] mb-8"
          >
            Where machines{' '}
            <span className="relative">
              <span className="bg-gradient-to-r from-primary via-blue-500 to-violet-500 text-gradient">learn</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                <motion.path
                  d="M1 5.5C47 2 77 2 99.5 3.5C122 5 153 5.5 199 2"
                  stroke="url(#underline-grad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 1, ease: 'easeInOut' }}
                />
                <defs>
                  <linearGradient id="underline-grad" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="hsl(238, 76%, 60%)" />
                    <stop offset="0.5" stopColor="hsl(217, 91%, 60%)" />
                    <stop offset="1" stopColor="hsl(263, 70%, 55%)" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <br className="hidden sm:block" />
            &nbsp;to think. 
          </motion.h1>

          {/* Subheadline */}
          {/* <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            The Robotics Club at NIT Patna builds autonomous systems, AI solutions, and next-generation hardware — pushing what's possible in Indian engineering.
          </motion.p> */}

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="pt-20 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/projects">
              <Button size="lg" className="px-8 py-3.5 text-base font-semibold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 group">
                Explore our work
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="px-8 py-3.5 text-base font-semibold rounded-xl border-2 hover:bg-accent transition-all duration-300">
                Get in touch
              </Button>
            </Link>
          </motion.div>

          {/* Social proof line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 flex items-center justify-center gap-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-2xl text-foreground">100+</span>
              <span>Members</span>
            </div>
            <div className="w-px h-6 bg-border" />
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-2xl text-foreground">45+</span>
              <span>Projects</span>
            </div>
            <div className="w-px h-6 bg-border hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2">
              <span className="font-heading font-bold text-2xl text-foreground">15+</span>
              <span>Awards</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-muted-foreground/50"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
