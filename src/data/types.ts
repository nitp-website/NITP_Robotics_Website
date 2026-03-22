// ============================================
// Centralized type definitions for all data
// ============================================

export interface Project {
  id: number;
  title: string;
  description: string;
  detailedDescription: string;
  image: string;
  category: string;
  tags: string[];
  github?: string;
  demo?: string;
  status: 'Completed' | 'Ongoing';
  featured: boolean;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  detailedDescription: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
  capacity: string;
  status: 'Upcoming' | 'Completed';
  registrationOpen: boolean;
  registrationLink?: string;
  featured: boolean;
}

export interface TeamMemberPI {
  name: string;
  role: string;
  department: string;
  image: string;
  bio: string;
  email: string;
  social: {
    linkedin?: string;
    twitter?: string;
  };
}

export interface TeamExecutive {
  name: string;
  role: string;
  year: string;
  image: string;
  bio: string;
  email: string;
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface TeamCoreMember {
  name: string;
  role: string;
  year: string;
  image: string;
  domain: string;
}

export interface TeamMember {
  name: string;
  year: string;
  domain: string;
}

export interface TeamData {
  pi: TeamMemberPI;
  executives: TeamExecutive[];
  coreTeam: TeamCoreMember[];
  members: TeamMember[];
}

export interface Award {
  id: number;
  title: string;
  description: string;
  year: string;
  category: string;
  /** Icon name from lucide-react (mapped at render time) */
  icon: string;
  color: string;
  bg: string;
  venue: string;
}

export interface AwardStats {
  label: string;
  value: string;
  /** Icon name from lucide-react */
  icon: string;
}

export interface AwardGalleryImage {
  id: number;
  src: string;
  title: string;
  year: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  category: string;
  title: string;
}

export interface Milestone {
  year: string;
  event: string;
  description: string;
  /** Icon name from lucide-react */
  icon: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface Metric {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  link?: string;
  read: boolean;
}
