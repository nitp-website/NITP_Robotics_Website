import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';
import { NotificationMenu } from '@/components/NotificationMenu';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Team', path: '/team' },
  { name: 'Projects', path: '/projects' },
  { name: 'Events', path: '/events' },
  { name: 'Awards', path: '/awards' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-background/70 backdrop-blur-2xl border-b border-border/40 shadow-lg shadow-black/5'
          : 'bg-background/30 backdrop-blur-md'
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />
      
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group relative z-10">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300"
            >
              <img 
                src="/assets/logo.png" 
                alt="Robotics Club Logo" 
                className="w-full h-full object-contain"
              />
            </motion.div>
            <div className="hidden sm:block">
              <div className="font-heading font-bold text-lg tracking-tight leading-tight">Robotics Club</div>
              <div className="text-[10px] text-muted-foreground -mt-0.5 tracking-[0.2em] uppercase font-medium">NIT Patna</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 bg-background/40 backdrop-blur-md rounded-2xl px-2 py-1.5 border border-border/50 shadow-sm">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      'relative text-sm font-medium transition-all duration-300 rounded-xl px-4 h-9',
                      location.pathname === item.path
                        ? 'text-foreground bg-primary/10 shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                    )}
                  >
                    {item.name}
                    {location.pathname === item.path && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-primary/5 border border-primary/20 rounded-xl"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Button>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Right side: Notifications + Theme toggle + mobile button */}
          <div className="flex items-center gap-6 relative z-10">
            {/* Notifications */}
            <NotificationMenu isScrolled={isScrolled} />

            {/* Theme Toggle */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className={cn(
                  "w-10 h-10 rounded-xl transition-all duration-300",
                  "hover:bg-accent/80 backdrop-blur-sm",
                  isScrolled && "bg-background/60"
                )}
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {resolvedTheme === 'dark' ? (
                    <motion.div 
                      key="sun" 
                      initial={{ rotate: -90, opacity: 0, scale: 0.8 }} 
                      animate={{ rotate: 0, opacity: 1, scale: 1 }} 
                      exit={{ rotate: 90, opacity: 0, scale: 0.8 }} 
                      transition={{ duration: 0.3 }}
                    >
                      <Sun className="w-5 h-5 text-white" />
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="moon" 
                      initial={{ rotate: 90, opacity: 0, scale: 0.8 }} 
                      animate={{ rotate: 0, opacity: 1, scale: 1 }} 
                      exit={{ rotate: -90, opacity: 0, scale: 0.8 }} 
                      transition={{ duration: 0.3 }}
                    >
                      <Moon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "lg:hidden p-2.5 rounded-xl transition-all duration-300",
                "hover:bg-accent/80 backdrop-blur-sm",
                isScrolled && "bg-background/60"
              )}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={22} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={22} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-background/95 backdrop-blur-2xl border-b border-border/40 shadow-xl"
          >
            <div className="container mx-auto px-4 py-6 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link to={item.path}>
                    <Button
                      variant="ghost"
                      className={cn(
                        'w-full justify-start rounded-xl text-base h-12 transition-all duration-300',
                        location.pathname === item.path 
                          ? 'bg-primary/10 text-foreground font-semibold border border-primary/20 shadow-sm' 
                          : 'hover:bg-accent/80 text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {item.name}
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
