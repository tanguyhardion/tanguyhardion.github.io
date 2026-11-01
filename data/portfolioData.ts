import type {
  TranslationStrings,
  AcademicItem,
  ExperienceItem,
  ProjectItem,
  SkillCategory,
  LanguageSkill,
  ResumeFormat,
  PersonalInterest
} from '~/types/portfolio';

import { calculateYearsOfExperience } from '~/utils/dateUtils';
import profileDoc from './profile.json';

// ---------------------------------------------------------------------------
// Profile content comes from Supabase (data/profile.json, refreshed at build by
// scripts/fetch-profile.mjs). Only UI strings and resume files live in this file.
// ---------------------------------------------------------------------------
type Loc = { en?: string; fr?: string } | null | undefined;
type LocList = { en?: string[]; fr?: string[] } | null | undefined;
const doc = profileDoc as any;
const P = doc.profile;

/** Localized value with FR falling back to EN. */
function tr(v: Loc): { en: string; fr: string } {
  const en = v?.en ?? '';
  return { en, fr: v?.fr || en };
}
function trList(v: LocList): { en: string[]; fr: string[] } {
  const en = v?.en ?? [];
  return { en, fr: v?.fr?.length ? v.fr : en };
}
const visible = <T extends { show_on_website?: boolean; showOnWebsite?: boolean }>(xs: T[] = []) =>
  xs.filter(x => (x.show_on_website ?? x.showOnWebsite) !== false);
/** Website shows the condensed text when one exists. */
const bulletsOf = (bs: any[] = []) => {
  const list = visible(bs).map(b => tr(b.short?.en ? b.short : b.text));
  return { en: list.map(b => b.en), fr: list.map(b => b.fr) };
};
/** '2025-09-01' → '09/2025' (format expected by utils/dateUtils). */
const mmYYYY = (iso?: string | null) => (iso ? `${iso.slice(5, 7)}/${iso.slice(0, 4)}` : 'Present');
const period = (start: string, end?: string | null) => `${mmYYYY(start)} - ${mmYYYY(end)}`;

const EN_M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const FR_M = ['Janv.', 'Févr.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'];
function engagementPeriod(start?: string | null, end?: string | null): { en: string; fr: string } | undefined {
  if (!start) return undefined;
  const f = (iso: string, m: string[]) => ({ m: m[Number(iso.slice(5, 7)) - 1], y: iso.slice(0, 4) });
  const one = (m: string[], present: string) => {
    const s = f(start, m);
    if (!end) return `${s.m} ${s.y} – ${present}`;
    const e = f(end, m);
    if (s.y !== e.y) return `${s.m} ${s.y} – ${e.m} ${e.y}`;
    return s.m === e.m ? `${s.m} ${s.y}` : `${s.m} – ${e.m} ${e.y}`;
  };
  return { en: one(EN_M, 'Present'), fr: one(FR_M, "Aujourd'hui") };
}

export const contact = {
  email: P.public_email as string,
  github: P.github as string,
  linkedin: P.linkedin as string,
  website: P.website as string
};

export const academicsData: AcademicItem[] = visible(doc.education).map((e: any) => ({
  id: e.id,
  degree: tr(e.degree),
  institution: tr({ en: e.institution }),
  location: tr(e.location),
  period: period(e.start_date, e.end_date),
  gpa: e.gpa || e.honors?.en || undefined,
  fieldOfStudy: tr(e.field_of_study),
  courses: trList(e.courses),
  honors: e.honors ? tr(e.honors) : undefined,
  logoUrl: e.logo_url || undefined,
  linkedProjects: doc.projects.filter((p: any) => p.education_id === e.id).map((p: any) => p.id)
}));

export const experienceData: ExperienceItem[] = visible(doc.experiences).map((e: any) => {
  const engagements = visible(e.engagements).map((g: any) => ({
    client: tr(g.client),
    title: tr(g.title),
    period: engagementPeriod(g.start_date, g.end_date),
    bullets: bulletsOf(g.bullets)
  }));
  return {
    id: e.id,
    role: tr(e.title),
    company: tr(e.company_display ?? { en: e.company }),
    location: tr(e.location),
    contractType: tr(e.contract_label),
    employmentType: e.employment_type,
    period: period(e.start_date, e.end_date),
    description: tr(e.description),
    achievements: bulletsOf(e.bullets),
    engagements: engagements.length ? engagements : undefined,
    technologies: e.technologies ?? [],
    linkedProjects: doc.projects.filter((p: any) => p.experience_id === e.id).map((p: any) => p.id)
  };
});

const CONTEXT: Record<string, { key: ProjectItem['context']; label: { en: string; fr: string } }> = {
  school: { key: 'School', label: { en: 'School Project', fr: 'Projet Scolaire' } },
  work: { key: 'Work', label: { en: 'Work Project', fr: 'Projet Professionnel' } },
  personal: { key: 'Personal', label: { en: 'Personal Project', fr: 'Projet Personnel' } }
};

export const projectsData: ProjectItem[] = visible(doc.projects).map((p: any) => ({
  id: p.id,
  title: tr(p.title).en,
  context: CONTEXT[p.context].key,
  contextLabel: CONTEXT[p.context].label,
  teamSize: p.team_size ?? 1,
  duration: tr(p.duration),
  shortDescription: tr(p.short_description ?? p.description),
  fullDescription: tr(p.description ?? p.short_description),
  tags: p.technologies ?? [],
  repoUrl: p.repo_url || undefined,
  demoUrl: p.demo_url || undefined,
  featured: p.featured
}));

export const skillCategoriesData: SkillCategory[] = visible(doc.skillCategories).map((c: any) => ({
  id: c.id,
  name: tr(c.name),
  icon: c.icon || 'ph:sparkle-bold',
  skills: visible(c.skills).map((s: any) => ({ name: s.name, icon: s.icon || undefined }))
}));

export const languagesData: LanguageSkill[] = visible(doc.languages).map((l: any) => ({
  name: tr(l.name),
  flagIcon: l.flag_icon || 'ph:globe-bold',
  level: tr(l.level),
  description: tr(l.description)
}));

export const personalInterestsData: PersonalInterest[] = visible(doc.interests).map((i: any) => ({
  title: tr(i.title),
  icon: i.icon || 'ph:star-bold',
  description: tr(i.description)
}));

// Helper functions to calculate stats dynamically
export const getTotalProjectsCount = (): string => `${projectsData.length}+`;

export const getYearsOfExperienceCount = (): string => {
  const isFullTime = (exp: ExperienceItem) => {
    return !['internship', 'apprenticeship', 'summer_job'].includes(exp.employmentType ?? '');
  };

  const periods = experienceData
    .filter(isFullTime)
    .map(exp => exp.period);

  return calculateYearsOfExperience(periods);
};

export const translations: Record<'en' | 'fr', TranslationStrings> = {
  en: {
    nav: {
      home: 'Home',
      academics: 'Academics',
      experience: 'Experience',
      projects: 'Projects',
      skills: 'Skills',
      more: 'More',
      contact: 'Get in touch'
    },
    home: {
      greeting: "Hi, I'm Tanguy",
      role: tr(P.headline).en,
      summary: tr(P.summary).en,
      ctaProjects: 'Explore Work',
      ctaContact: 'Contact Me',
      highlightsTitle: 'Key Highlights',
      quickStats: [
        { label: 'Years Experience', get value() { return getYearsOfExperienceCount(); } },
        { label: 'Completed Projects', get value() { return getTotalProjectsCount(); } },
        { label: 'Degrees', value: "Engineer's & Associate's" },
        { label: 'Languages Spoken', value: 'French & English' }
      ]
    },
    academics: {
      title: 'Academic Journey',
      subtitle: 'Higher education background, specialized fields of study, and academic honors.',
      gpaLabel: 'GPA / Grade',
      courseworkLabel: 'Relevant Coursework',
      projectsLabel: 'Academic Projects'
    },
    experience: {
      title: 'Work Experience',
      subtitle: 'Professional history across software engineering, AI engineering, and data platforms.',
      keyAchievements: 'Key Contributions',
      projectsLabel: 'Associated Projects'
    },
    projects: {
      title: 'Projects & Portfolio',
      subtitle: 'Selected work across machine learning, web applications, and data engineering.',
      allContexts: 'All Categories',
      filterBy: 'Filter by context',
      teamSize: 'Team size',
      duration: 'Duration',
      viewRepo: 'Repository',
      liveDemo: 'Live Demo'
    },
    skills: {
      title: 'Skills & Expertise',
      subtitle: 'Comprehensive overview of technologies, frameworks, and technical domains.',
      proficiency: 'Proficiency'
    },
    more: {
      title: 'More About Me',
      subtitle: 'Curriculum Vitae downloads, spoken languages, and personal interests.',
      resumesTitle: 'Resume / CV Downloads',
      resumesSubtitle: 'Get my latest resume in your preferred format. Dates fetched live from GitHub commits.',
      lastUpdated: 'Updated',
      download: 'Download PDF',
      open: 'Open',
      languagesTitle: 'Spoken Languages',
      languagesSubtitle: 'CEFR proficiency levels & linguistic capabilities.',
      interestsTitle: 'Passions & Interests',
      interestsSubtitle: 'What drives my curiosity outside of the professional field.'
    },
    footer: {
      rights: 'All rights reserved.',
      builtWith: 'Built with Nuxt. Hosted on GitHub Pages.'
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      academics: 'Études',
      experience: 'Expérience',
      projects: 'Projets',
      skills: 'Compétences',
      more: 'Plus',
      contact: 'Me Contacter'
    },
    home: {
      greeting: 'Bonjour, je suis Tanguy',
      role: tr(P.headline).fr,
      summary: tr(P.summary).fr,
      ctaProjects: 'Découvrir mes projets',
      ctaContact: 'Me contacter',
      highlightsTitle: 'En Résumé',
      quickStats: [
        { label: "Années d'expérience", get value() { return getYearsOfExperienceCount(); } },
        { label: 'Projets Réalisés', get value() { return getTotalProjectsCount(); } },
        { label: 'Diplômes', value: 'Ingénieur & DUT' },
        { label: 'Langues Parlées', value: 'Français & Anglais' }
      ]
    },
    academics: {
      title: 'Parcours Académique',
      subtitle: "Formation supérieure, domaines d'expertise et mentions obtenues.",
      gpaLabel: 'Moyenne / Note',
      courseworkLabel: 'Enseignements clés',
      projectsLabel: 'Projets Académiques'
    },
    experience: {
      title: 'Expériences Professionnelles',
      subtitle: "Historique de parcours en ingénierie logicielle, IA et plateformes de données.",
      keyAchievements: 'Réalisations Clés',
      projectsLabel: 'Projets Liés'
    },
    projects: {
      title: 'Projets & Réalisations',
      subtitle: "Sélection de réalisations en machine learning, applications web et data engineering.",
      allContexts: 'Toutes les catégories',
      filterBy: 'Filtrer par contexte',
      teamSize: 'Taille équipe',
      duration: 'Durée',
      viewRepo: 'Code Source',
      liveDemo: 'Démo en Direct'
    },
    skills: {
      title: 'Compétences Techniques',
      subtitle: 'Vue d\'ensemble des technologies, frameworks et domaines de maîtrise.',
      proficiency: 'Maîtrise'
    },
    more: {
      title: 'En Savoir Plus',
      subtitle: 'Téléchargement de CV, langues parlées et centres d\'intérêt.',
      resumesTitle: 'Téléchargement du CV',
      resumesSubtitle: 'Téléchargez mon CV dans le format de votre choix. Dates mises à jour en direct via l\'API GitHub.',
      lastUpdated: 'Mis à jour le',
      download: 'Télécharger PDF',
      open: 'Ouvrir',
      languagesTitle: 'Langues Parlées',
      languagesSubtitle: 'Niveaux CECRL et capacités linguistiques.',
      interestsTitle: 'Passions & Centred d\'Intérêt',
      interestsSubtitle: 'Ce qui me passionne en dehors du domaine professionnel.'
    },
    footer: {
      rights: 'Tous droits réservés.',
      builtWith: 'Conçu avec Nuxt. Hébergé sur GitHub Pages.'
    }
  }
};

export const resumeFormatsData: ResumeFormat[] = [
  {
    id: 'resume-fr',
    title: {
      en: 'EU Format, in French',
      fr: 'Format européen, en français'
    },
    languageCode: 'fr',
    fileName: 'Tanguy_Hardion_Resume_FR.pdf',
    filePathInRepo: 'public/resumes/Tanguy_Hardion_Resume_FR.pdf',
    downloadUrl: '/resumes/Tanguy_Hardion_Resume_FR.pdf',
    fileSize: '190 KB',
    format: 'PDF'
  },
  {
    id: 'resume-en',
    title: {
      en: 'EU Format, in English',
      fr: 'Format européen, en anglais'
    },
    languageCode: 'en',
    fileName: 'Tanguy_Hardion_Resume_EN.pdf',
    filePathInRepo: 'public/resumes/Tanguy_Hardion_Resume_EN.pdf',
    downloadUrl: '/resumes/Tanguy_Hardion_Resume_EN.pdf',
    fileSize: '185 KB',
    format: 'PDF'
  },
  {
    id: 'resume-us',
    title: {
      en: 'US Format',
      fr: 'Format américain'
    },
    languageCode: 'us',
    fileName: 'Tanguy_Hardion_Resume_US_OnePage.pdf',
    filePathInRepo: 'public/resumes/Tanguy_Hardion_Resume_US_OnePage.pdf',
    downloadUrl: '/resumes/Tanguy_Hardion_Resume_US_OnePage.pdf',
    fileSize: '175 KB',
    format: 'PDF'
  }
];
