export type Locale = 'ar' | 'en';
export type Theme = 'dark' | 'light';

export interface LocalizedString {
  ar: string;
  en: string;
}

export interface LocalizedArray {
  ar: string[];
  en: string[];
}

export interface ProfileInfo {
  name: LocalizedString;
  displayName: LocalizedString;
  title: LocalizedString;
  specialties: LocalizedArray;
  shortBio: LocalizedString;
  fullBio: LocalizedString;
  location: LocalizedString;
  email: string;
  phone: string;
  whatsapp: string;
  github: string;
  stats: {
    yearsExperience: number;
    completedProjects: number;
    repositoriesCount: number;
  };
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: LocalizedString;
  summary: LocalizedString;
  description: LocalizedString;
  category: 'mobile' | 'web' | 'erp' | 'uiux' | 'tools';
  categoryLabel: LocalizedString;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  coverImage: string;
  isFeatured: boolean;
  status: 'Completed' | 'In Progress' | 'Production';
  highlights?: LocalizedArray;
}

export interface ExperienceItem {
  id: string;
  role: LocalizedString;
  organization: LocalizedString;
  location: LocalizedString;
  period: LocalizedString;
  statusText?: LocalizedString;
  responsibilities: LocalizedArray;
  type: 'design' | 'development' | 'support' | 'teaching';
}

export interface EducationItem {
  id: string;
  degree: LocalizedString;
  institution: LocalizedString;
  period: LocalizedString;
  status: LocalizedString;
  details?: LocalizedString;
  grade?: LocalizedString;
}

export interface CertificationItem {
  id: string;
  title: LocalizedString;
  issuer: LocalizedString;
  year: string;
  type: 'certificate' | 'training' | 'workshop';
}

export interface SkillCategory {
  id: string;
  title: LocalizedString;
  skills: {
    name: string;
    icon?: string;
    level?: string;
  }[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  category: string;
  message: string;
  date: string;
}

export interface PortfolioData {
  profile: ProfileInfo;
  projects: ProjectItem[];
  experiences: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  skills: SkillCategory[];
  heroImage: string;
  avatarImage: string;
  aboutImage: string;
}
