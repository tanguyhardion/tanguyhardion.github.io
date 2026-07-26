export type Language = 'en' | 'fr';

export interface TranslationStrings {
  nav: {
    home: string;
    academics: string;
    experience: string;
    projects: string;
    skills: string;
    more: string;
    contact: string;
  };
  home: {
    greeting: string;
    role: string;
    summary: string;
    ctaProjects: string;
    ctaContact: string;
    highlightsTitle: string;
    quickStats: {
      label: string;
      value: string;
    }[];
  };
  academics: {
    title: string;
    subtitle: string;
    gpaLabel: string;
    courseworkLabel: string;
    projectsLabel: string;
  };
  experience: {
    title: string;
    subtitle: string;
    keyAchievements: string;
    projectsLabel: string;
  };
  projects: {
    title: string;
    subtitle: string;
    allContexts: string;
    filterBy: string;
    teamSize: string;
    duration: string;
    viewRepo: string;
    liveDemo: string;
  };
  skills: {
    title: string;
    subtitle: string;
    proficiency: string;
  };
  more: {
    title: string;
    subtitle: string;
    resumesTitle: string;
    resumesSubtitle: string;
    lastUpdated: string;
    download: string;
    languagesTitle: string;
    languagesSubtitle: string;
    interestsTitle: string;
    interestsSubtitle: string;
  };
  footer: {
    rights: string;
    builtWith: string;
  };
}

export interface AcademicItem {
  id: string;
  degree: { en: string; fr: string };
  institution: { en: string; fr: string };
  location: { en: string; fr: string };
  period: string;
  gpa?: string;
  fieldOfStudy: { en: string; fr: string };
  courses: { en: string[]; fr: string[] };
  linkedProjects?: string[]; // IDs of project
  logoUrl?: string;
  honors?: { en: string; fr: string };
}

export interface ExperienceItem {
  id: string;
  role: { en: string; fr: string };
  company: { en: string; fr: string };
  location: { en: string; fr: string };
  contractType: { en: string; fr: string }; // e.g., Full-time, Internship, Apprenticeship
  period: string;
  description: { en: string; fr: string };
  achievements: { en: string[]; fr: string[] };
  technologies: string[];
  linkedProjects?: string[];
}

export type ProjectContext = 'School' | 'Work' | 'Personal';

export interface ProjectItem {
  id: string;
  title: string;
  context: ProjectContext;
  contextLabel: { en: string; fr: string };
  teamSize: number;
  duration: { en: string; fr: string };
  shortDescription: { en: string; fr: string };
  fullDescription: { en: string; fr: string };
  tags: string[];
  repoUrl?: string;
  demoUrl?: string;
  featured?: boolean;
}

export interface SkillCategory {
  id: string;
  name: { en: string; fr: string };
  icon: string;
  skills: {
    name: string;
    icon?: string;
  }[];
}

export interface LanguageSkill {
  name: { en: string; fr: string };
  flag?: string;
  flagIcon: string;
  level: string; // e.g. Native / C2 / B2
  description: { en: string; fr: string };
}

export interface ResumeFormat {
  id: string;
  title: { en: string; fr: string };
  languageCode: string;
  fileName: string;
  filePathInRepo: string; // Used for GitHub API commit date query
  downloadUrl: string;
  fileSize: string;
  format: 'PDF';
}

export interface PersonalInterest {
  title: { en: string; fr: string };
  icon: string;
  description: { en: string; fr: string };
}
