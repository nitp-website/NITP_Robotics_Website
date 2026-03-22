import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { getFeaturedProjects } from '@/data';

export function ProjectsShowcaseSection() {
  const getExternalUrl = (url?: string) => {
    if (!url) return null;

    const trimmedUrl = url.trim();
    if (!trimmedUrl || trimmedUrl === '#') return null;

    const withProtocol = /^https?:\/\//i.test(trimmedUrl)
      ? trimmedUrl
      : `https://${trimmedUrl}`;

    try {
      const parsedUrl = new URL(withProtocol);
      if (parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:') {
        return parsedUrl.toString();
      }
      return null;
    } catch {
      return null;
    }
  };

  const projects = getFeaturedProjects().map((p) => ({
    title: p.title,
    category: p.category,
    description: p.description,
    image: p.image,
    tags: p.tags,
    github: p.github,
    demo: p.demo,
  }));
  return (
    <section className="section-padding bg-muted/40 dark:bg-muted/10 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block text-sm font-semibold text-primary tracking-wide uppercase mb-4"
            >
              Featured Work
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-heading text-4xl sm:text-5xl font-bold tracking-tight"
            >
              Projects that <span className="text-muted-foreground">push boundaries.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link to="/projects">
              <Button variant="outline" className="rounded-xl group">
                View all projects
                <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Project Cards */}
        <div className="space-y-8">
          {projects.map((project, i) => {
            const githubUrl = getExternalUrl(project.github);
            const demoUrl = getExternalUrl(project.demo);

            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden bg-card border border-border/60 hover:border-border transition-all duration-500 hover:premium-shadow-lg">
                  {/* Image */}
                  <div className={`relative overflow-hidden h-64 lg:h-auto ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <span className="text-sm font-medium text-primary mb-3">{project.category}</span>
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      {githubUrl && (
                        <Button asChild variant="outline" size="sm" className="rounded-lg group/btn">
                          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            Source
                          </a>
                        </Button>
                      )}
                      {demoUrl && (
                        <Button asChild size="sm" className="rounded-lg group/btn">
                          <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                            View project
                            <ArrowUpRight className="ml-2 w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
