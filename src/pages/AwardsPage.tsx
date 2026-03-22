import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, ChevronLeft, ChevronRight } from 'lucide-react';
import { getAwardStats, getAwardYears, getAwardsByYear, getAwardGalleryImages, resolveIcon } from '@/data';

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
  const [galleryIndex, setGalleryIndex] = useState(0);

  const stats = getAwardStats();
  const winningGalleryImages = getAwardGalleryImages();
  const awardYears = getAwardYears();

  const handlePrevGalleryImage = () => {
    if (winningGalleryImages.length === 0) return;
    setGalleryIndex((prev) =>
      prev > 0 ? prev - 1 : winningGalleryImages.length - 1,
    );
  };

  const handleNextGalleryImage = () => {
    if (winningGalleryImages.length === 0) return;
    setGalleryIndex((prev) =>
      prev < winningGalleryImages.length - 1 ? prev + 1 : 0,
    );
  };

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

      {/* Winning Moments Gallery */}
      {winningGalleryImages.length > 0 && (
        <section className="mt-32 py-8 sm:py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-center max-w-3xl mx-auto mb-10"
            >
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Winning Moments</span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold mt-3 mb-4">Our Victory Gallery</h2>
            </motion.div>

            <div className="relative max-w-5xl mx-auto">
              <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/70 backdrop-blur-sm">
                <motion.div
                  animate={{ x: `-${galleryIndex * 100}%` }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                  className="flex"
                >
                  {winningGalleryImages.map((image) => (
                    <div key={image.id} className="w-full flex-shrink-0">
                      <div className="relative aspect-[16/10] sm:aspect-[16/9]">
                        <img
                          src={image.src}
                          alt={image.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                          <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/30 mb-2">
                            {image.year}
                          </span>
                          <h3 className="text-white font-heading font-semibold text-lg sm:text-xl">
                            {image.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              <div className="absolute inset-y-0 left-0 flex items-center pl-2 sm:pl-3">
                <button
                  type="button"
                  onClick={handlePrevGalleryImage}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm border border-white/20 transition-colors flex items-center justify-center"
                  aria-label="Previous winning image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3">
                <button
                  type="button"
                  onClick={handleNextGalleryImage}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm border border-white/20 transition-colors flex items-center justify-center"
                  aria-label="Next winning image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 mt-5">
                {winningGalleryImages.map((image, index) => (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => setGalleryIndex(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      index === galleryIndex ? 'w-8 bg-primary' : 'w-2.5 bg-muted-foreground/40 hover:bg-muted-foreground/60'
                    }`}
                    aria-label={`Go to winning image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

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
