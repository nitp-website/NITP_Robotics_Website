import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Trophy } from 'lucide-react';
import { getAwards, getAwardStats, getAwardCategories, getAwardYears, getAwardsByYear, resolveIcon } from '@/data';

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const numeric = parseInt(value);
  const suffix = value.replace(String(numeric), '');

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numeric));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, numeric]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function AwardsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const awards = getAwards();
  const stats = getAwardStats();
  const categories = getAwardCategories();
  const awardYears = getAwardYears();

  const filteredAwards = selectedCategory === 'All'
    ? awards
    : awards.filter((a) => a.category === selectedCategory);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10" />
        <div className="absolute top-20 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <Trophy className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Achievements & Recognition</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight">
              Our{' '}
              <span className="text-gradient bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
                Awards
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              A track record of excellence in competitions, research, and innovation on the national and international stage
            </p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
            >
              {stats.map((stat, index) => {
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    className="glass rounded-2xl px-6 pt-10 pb-8 text-center"
                  >
                    <div className="font-heading text-4xl sm:text-5xl font-bold text-primary mb-3">
                      <AnimatedCounter value={stat.value} />
                    </div>
                    <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-3 flex-wrap mb-12"
          >
            {categories.map((category) => (
              <motion.div
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full px-6 transition-all duration-300"
                >
                  {category}
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* Awards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {filteredAwards.map((award, index) => {
              const Icon = resolveIcon(award.icon);
              return (
                <motion.div
                  key={award.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
                  layout
                >
                  <Card className="h-full border border-border/50 hover:border-primary/30 transition-all duration-500 group hover:shadow-xl hover:-translate-y-1 bg-card/80 backdrop-blur-sm">
                    <CardContent className="p-7">
                      <div className="flex items-start gap-5">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${award.bg} flex-shrink-0`}>
                          <Icon className={`w-6 h-6 ${award.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <span className={`text-sm font-semibold ${award.color}`}>{award.year}</span>
                            <span className={`text-xs px-2.5 py-1 rounded-full ${award.bg} ${award.color} font-medium`}>
                              {award.category}
                            </span>
                          </div>
                          <h3 className="text-lg font-heading font-semibold leading-snug mb-2 group-hover:text-foreground/80 transition-colors">
                            {award.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                            {award.description}
                          </p>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground/70">
                            <Award className="w-3.5 h-3.5" />
                            <span>{award.venue}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute top-20 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Year by Year</span>
            <h2 className="text-4xl sm:text-5xl font-heading font-bold mt-4 mb-6">
              Our Journey of Excellence
            </h2>
            <p className="text-lg text-muted-foreground">
              A growing legacy of achievements that showcase our team's dedication and talent
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="max-w-3xl mx-auto relative">
            {/* Vertical line */}
            <div className="absolute left-6 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-0.5 bg-border" />

            {awardYears.map((year, yearIndex) => {
              const yearAwards = getAwardsByYear(year);
              return (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8, delay: yearIndex * 0.15, ease: 'easeOut' }}
                  className={`relative mb-12 last:mb-0 ${yearIndex % 2 === 0 ? 'sm:pr-[calc(50%+2rem)]' : 'sm:pl-[calc(50%+2rem)]'} pl-16 sm:pl-0`}
                >
                  {/* Year badge on the line */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 -top-1 z-10">
                    <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">{year}</span>
                    </div>
                  </div>

                  <div className="space-y-4 mt-2">
                    {yearAwards.map((award) => {
                      const Icon = resolveIcon(award.icon);
                      return (
                        <Card key={award.id} className="border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-lg bg-card/80 backdrop-blur-sm">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-4">
                              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${award.bg} flex-shrink-0`}>
                                <Icon className={`w-5 h-5 ${award.color}`} />
                              </div>
                              <div>
                                <h3 className="font-heading font-semibold text-sm leading-snug mb-1">{award.title}</h3>
                                <p className="text-xs text-muted-foreground">{award.venue}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
