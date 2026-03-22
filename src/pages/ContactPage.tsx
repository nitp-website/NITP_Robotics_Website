import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone, Send, Twitter, Instagram, Linkedin, Github, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: 'Message Sent Successfully!',
      description: 'Thank you for reaching out. We\'ll get back to you within 24 hours.',
    });
    
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      content: ['National Institute of Technology Patna', 'Bihta, Patna - 801103, Bihar, IN'],
      color: 'text-blue-500 dark:text-blue-400',
      bg: 'bg-blue-500/10 dark:bg-blue-500/15',
    },
    {
      icon: Mail,
      title: 'Email Us',
      content: ['roboticsclub@nitp.ac.in', 'ankita.ug23.ec@nitp.ac.in'],
      color: 'text-violet-500 dark:text-violet-400',
      bg: 'bg-violet-500/10 dark:bg-violet-500/15',
      links: true
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: ['Aarav: +91 82528 62360', 'Ankit Anand: +91 79038 28567'],
      color: 'text-amber-500 dark:text-amber-400',
      bg: 'bg-amber-500/10 dark:bg-amber-500/15',
      links: true
    },
  ];

  const socialLinks = [
    { 
      icon: Instagram, 
      label: 'Instagram', 
      href: 'https://www.instagram.com/robotics_club_nitp', 
      color: 'text-pink-500 dark:text-pink-400',
      bg: 'bg-pink-500/10 dark:bg-pink-500/15'
    },
    { 
      icon: Twitter, 
      label: 'Twitter', 
      href: '#', 
      color: 'text-sky-500 dark:text-sky-400',
      bg: 'bg-sky-500/10 dark:bg-sky-500/15'
    },
    { 
      icon: Linkedin, 
      label: 'LinkedIn', 
      href: 'https://www.linkedin.com/company/robotics-club-nit-patna', 
      color: 'text-blue-600 dark:text-blue-500',
      bg: 'bg-blue-600/10 dark:bg-blue-600/15'
    },
    { 
      icon: Github, 
      label: 'GitHub', 
      href: 'https://github.com/Robotics-Club-NIT-Patna', 
      color: 'text-gray-700 dark:text-gray-400',
      bg: 'bg-gray-500/10 dark:bg-gray-500/15'
    },
  ];

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
              <MessageCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">We're Here to Help</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight">
              Get In{' '}
              <span className="text-gradient bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Have questions or ideas? We'd love to hear from you. Send us a message and we'll respond within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                >
                  <Card className="border-2 hover:border-primary/30 transition-all duration-500 h-full premium-shadow group hover:-translate-y-1">
                    <CardContent className="p-8">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${info.bg} mb-6`}>
                        <Icon className={`w-6 h-6 ${info.color}`} />
                      </div>
                      <h3 className="text-2xl font-heading font-bold mb-4">{info.title}</h3>
                      <div className="space-y-2">
                        {info.content.map((line, i) => (
                          <p key={i} className="text-muted-foreground">
                            {info.links && (line.includes('@') || line.includes('+')) ? (
                              <a
                                href={line.includes('@') ? `mailto:${line}` : `tel:${line.replace(/\s/g, '')}`}
                                className="hover:text-primary transition-colors"
                              >
                                {line}
                              </a>
                            ) : (
                              line
                            )}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Form and Social */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <Card className="border-2 hover:border-primary/30 transition-all duration-500 premium-shadow">
                <CardContent className="p-8 sm:p-10">
                  <h3 className="text-3xl font-heading font-bold mb-2">Send us a Message</h3>
                  <p className="text-muted-foreground mb-8">Fill out the form below and we'll get back to you shortly</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="h-12 rounded-xl"
                          placeholder="Your Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="h-12 rounded-xl"
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="h-12 rounded-xl"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="rounded-xl resize-none"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 group"
                    >
                      {isSubmitting ? (
                        'Sending...'
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Social Links & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Social Media */}
              <Card className="border-2 hover:border-primary/30 transition-all duration-500 premium-shadow">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-heading font-bold mb-6">Connect With Us</h3>
                  <div className="space-y-4">
                    {socialLinks.map((social) => {
                      const Icon = social.icon;
                      return (
                        <motion.a
                          key={social.label}
                          href={social.href}
                          whileHover={{ x: 5 }}
                          className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-accent transition-all duration-300 group"
                        >
                          <div className={`w-12 h-12 rounded-xl ${social.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <Icon className={`w-5 h-5 ${social.color}`} />
                          </div>
                          <span className="font-medium">{social.label}</span>
                        </motion.a>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Info */}
              <Card className="border-2 hover:border-primary/30 transition-all duration-500 premium-shadow">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-heading font-bold mb-6">Office Hours</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="font-medium">Monday - Friday</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="font-medium">Saturday</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="font-medium">Sunday</span>
                      <span className="text-red-500">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Find Us</span>
            <h2 className="text-4xl font-heading font-bold mt-2 mb-4">Visit Our Campus</h2>
            <p className="text-lg text-muted-foreground">
              Located at the heart of NIT Patna, we welcome visitors during office hours
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[500px] rounded-3xl overflow-hidden border-2 border-border premium-shadow"
          >
            <iframe
              src="https://www.google.com/maps?q=25.576724356292182,84.83201828650684&z=15&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[30%] hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
