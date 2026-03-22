import { Link } from 'react-router-dom';
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  MapPin
} from 'lucide-react';

const footerLinks = {
  quickLinks: [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Team', path: '/team' },
    { name: 'Projects', path: '/projects' },
  ],
  resources: [
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ],
};

const socialLinks = [
  { icon: Github, href: 'https://github.com/Robotics-Club-NIT-Patna', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/company/robotics-club-nit-patna', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: 'https://www.instagram.com/robotics_club_nitp', label: 'Instagram' },
];

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                <img 
                  src="/assets/logo.png" 
                  alt="Robotics Club Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="font-heading font-bold text-lg tracking-tight">Robotics Club</div>
                <div className="text-[11px] text-muted-foreground -mt-0.5 tracking-wide">NIT PATNA</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Pioneering robotics, AI, and automation at one of India's premier engineering institutions.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-5">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-5">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2.5 text-sm text-muted-foreground">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span>NIT Patna, Ashok Rajpath, Patna, Bihar 800005</span>
              </li>
              <li className="flex items-center space-x-2.5 text-sm text-muted-foreground">
                <Mail size={16} className="flex-shrink-0" />
                <a href="mailto:robotics@nitp.ac.in" className="hover:text-foreground transition-colors">
                  robotics@nitp.ac.in
                </a>
              </li>
              {/* <li className="flex items-center space-x-2.5 text-sm text-muted-foreground">
                <Phone size={16} className="flex-shrink-0" />
                <a href="tel:+911234567890" className="hover:text-foreground transition-colors">
                  +91 123 456 7890
                </a>
              </li> */}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Robotics Club, NIT Patna. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60">
            {import.meta.env.VITE_BUILTTEXT}
          </p>
        </div>
      </div>
    </footer>
  );
}
