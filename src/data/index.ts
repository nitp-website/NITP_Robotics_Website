// ============================================
// Central data loader & query utilities
// ============================================
// This module acts as a "database" layer. All pages import from here
// instead of holding hardcoded arrays. To update content, simply edit
// the corresponding JSON file in src/data/.
// ============================================

import type {
  Project,
  Event,
  TeamData,
  Award,
  AwardStats,
  AwardGalleryImage,
  GalleryImage,
  Achievement,
  Milestone,
  Testimonial,
  Metric,
  Notification,
} from './types';

// Re-export types so pages can import everything from '@/data'
export type {
  Project,
  Event,
  TeamData,
  Award,
  AwardStats,
  AwardGalleryImage,
  GalleryImage,
  Achievement,
  Milestone,
  Testimonial,
  Metric,
  Notification,
} from './types';

// --- Raw imports (Vite resolves JSON imports at build time) ---
import projectsData from './projects.json';
import eventsData from './events.json';
import teamData from './team.json';
import awardsData from './awards.json';
import galleryData from './gallery.json';
import aboutData from './about.json';
import notificationsData from './notifications.json';

function parseEventDate(date: string): number {
  const direct = Date.parse(date);
  if (!Number.isNaN(direct)) return direct;

  // Handle ranges like "15-17 March 2026" by taking the first date token.
  const firstPart = date.split('-')[0]?.trim() ?? date;
  const fallback = Date.parse(firstPart);
  return Number.isNaN(fallback) ? 0 : fallback;
}

// ============================================
// PROJECTS
// ============================================

/** All projects */
export function getProjects(): Project[] {
  return [...(projectsData as Project[])].sort((a, b) => b.id - a.id);
}

/** Unique project categories (for filter buttons) */
export function getProjectCategories(): string[] {
  const cats = new Set((projectsData as Project[]).map((p) => p.category));
  return ['All', ...Array.from(cats)];
}

/** Projects where featured === true (shown on Home page) */
export function getFeaturedProjects(): Project[] {
  return getProjects().filter((p) => p.featured);
}

// ============================================
// EVENTS
// ============================================

/** All events */
export function getEvents(): Event[] {
  return [...(eventsData as Event[])].sort(
    (a, b) => parseEventDate(b.date) - parseEventDate(a.date),
  );
}

/** Unique event categories */
export function getEventCategories(): string[] {
  const cats = new Set((eventsData as Event[]).map((e) => e.category));
  return ['All', ...Array.from(cats)];
}

/** Featured events (shown in featured section on Events page) */
export function getFeaturedEvents(): Event[] {
  return getEvents().filter((e) => e.featured);
}

/** Upcoming events */
export function getUpcomingEvents(): Event[] {
  return getEvents().filter((e) => e.status === 'Upcoming');
}

/** Latest N upcoming events (shown on Home page) */
export function getLatestUpcomingEvents(count: number = 3): Event[] {
  return getUpcomingEvents().slice(0, count);
}

/** Past / completed events */
export function getPastEvents(): Event[] {
  return getEvents().filter((e) => e.status === 'Completed');
}

// ============================================
// TEAM
// ============================================

/** Full team data (PI, executives, core team, members) */
export function getTeamData(): TeamData {
  return teamData as TeamData;
}

// ============================================
// AWARDS
// ============================================

/** All awards */
export function getAwards(): Award[] {
  return awardsData.awards as Award[];
}

/** Award stat counters */
export function getAwardStats(): AwardStats[] {
  return awardsData.stats as AwardStats[];
}

/** Winning moments gallery images shown on Awards page */
export function getAwardGalleryImages(): AwardGalleryImage[] {
  return (awardsData.winningGallery ?? []) as AwardGalleryImage[];
}

/** Unique award categories */
export function getAwardCategories(): string[] {
  const cats = new Set((awardsData.awards as Award[]).map((a) => a.category));
  return ['All', ...Array.from(cats)];
}

/** Distinct award years (for timeline), sorted descending */
export function getAwardYears(): string[] {
  const years = new Set((awardsData.awards as Award[]).map((a) => a.year));
  return Array.from(years).sort((a, b) => Number(b) - Number(a));
}

/** Awards for a specific year */
export function getAwardsByYear(year: string): Award[] {
  return (awardsData.awards as Award[]).filter((a) => a.year === year);
}

// ============================================
// GALLERY
// ============================================

/** All gallery images */
export function getGalleryImages(): GalleryImage[] {
  return galleryData as GalleryImage[];
}

/** Unique gallery categories */
export function getGalleryCategories(): string[] {
  const cats = new Set((galleryData as GalleryImage[]).map((g) => g.category));
  return ['All', ...Array.from(cats)];
}

// ============================================
// ABOUT (achievements, milestones, testimonials, metrics)
// ============================================

/** Recent achievements shown on About page */
export function getAchievements(): Achievement[] {
  return aboutData.achievements as Achievement[];
}

/** Club milestones / timeline */
export function getMilestones(): Milestone[] {
  return aboutData.milestones as Milestone[];
}

/** Testimonials shown on Home page */
export function getTestimonials(): Testimonial[] {
  return aboutData.testimonials as Testimonial[];
}

/** Metrics / stats shown on Home page */
export function getMetrics(): Metric[] {
  return aboutData.metrics as Metric[];
}

// ============================================
// NOTIFICATIONS
// ============================================

/** All notifications (for the notification bell menu) */
export function getNotifications(): Notification[] {
  return notificationsData as Notification[];
}

// ============================================
// ICON MAPPING (for data that stores icon names as strings)
// ============================================
import {
  Award as AwardIcon,
  Trophy,
  Medal,
  Star,
  Lightbulb,
  Rocket,
  BookOpen,
  Cpu,
  Globe,
  Zap,
  Heart,
  Users,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Award: AwardIcon,
  Trophy,
  Medal,
  Star,
  Lightbulb,
  Rocket,
  BookOpen,
  Cpu,
  Globe,
  Zap,
  Heart,
  Users,
  TrendingUp,
};

/** Resolve an icon name string to its Lucide component. Falls back to Star. */
export function resolveIcon(name: string): LucideIcon {
  return iconMap[name] || Star;
}
