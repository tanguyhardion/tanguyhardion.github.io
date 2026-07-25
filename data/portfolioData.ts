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
      badge: 'Available for New Opportunities',
      greeting: "Hi, I'm Tanguy",
      role: 'AI / ML & Software Engineer',
      summary: 'Passionate about engineering intelligent systems, robust web architectures, and scalable data solutions. Combining analytical rigor with modern design aesthetics to craft impactful digital experiences.',
      ctaProjects: 'Explore Work',
      ctaContact: 'Contact Me',
      highlightsTitle: 'Key Highlights',
      quickStats: [
        { label: 'Years Experience', value: '4+' },
        { label: 'Completed Projects', value: '18+' },
        { label: 'Degrees & Honors', value: 'Master & BSc' },
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
      languagesTitle: 'Spoken Languages',
      languagesSubtitle: 'CEFR proficiency levels & linguistic capabilities.',
      interestsTitle: 'Passions & Interests',
      interestsSubtitle: 'What drives my curiosity outside of code.'
    },
    footer: {
      rights: 'All rights reserved.',
      builtWith: 'Built with Nuxt, SCSS & Vue. Hosted on GitHub Pages.'
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
      badge: 'Disponible pour de nouvelles opportunités',
      greeting: 'Bonjour, je suis Tanguy',
      role: 'Ingénieur IA / ML & Développeur Software',
      summary: "Passionné par la conception de systèmes intelligents, d'architectures web robustes et de solutions de données à grande échelle. J'associe rigueur analytique et esthétique moderne pour créer des expériences numériques d'exception.",
      ctaProjects: 'Découvrir mes projets',
      ctaContact: 'Me contacter',
      highlightsTitle: 'En Résumé',
      quickStats: [
        { label: "Années d'expérience", value: '4+' },
        { label: 'Projets Réalisés', value: '18+' },
        { label: 'Diplômes & Distinctions', value: 'Master & Licence' },
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
      languagesTitle: 'Langues Parlées',
      languagesSubtitle: 'Niveaux CECRL et capacités linguistiques.',
      interestsTitle: 'Passions & Centred d\'Intérêt',
      interestsSubtitle: 'Ce qui me passionne en dehors de la programmation.'
    },
    footer: {
      rights: 'Tous droits réservés.',
      builtWith: 'Conçu avec Nuxt, SCSS & Vue. Hébergé sur GitHub Pages.'
    }
  }
};

export const academicsData: AcademicItem[] = [
  {
    id: 'master-cs',
    degree: {
      en: "Master's Degree in Computer Science & Artificial Intelligence",
      fr: 'Master Informatique & Intelligence Artificielle'
    },
    institution: {
      en: 'Grande École of Engineering',
      fr: 'Grande École d\'Ingénieurs'
    },
    location: {
      en: 'France',
      fr: 'France'
    },
    period: '2022 - 2024',
    gpa: '3.9 / 4.0 (Highest Honors)',
    fieldOfStudy: {
      en: 'Machine Learning, Distributed Systems, Cloud Architecture',
      fr: 'Apprentissage Automatique, Systèmes Distribués, Architecture Cloud'
    },
    courses: {
      en: ['Deep Learning & Neural Networks', 'Distributed Data Processing', 'MLOps & CI/CD', 'Advanced Algorithms'],
      fr: ['Apprentissage Profond & Réseaux de Neurones', 'Traitement de Données Distribuées', 'MLOps & CI/CD', 'Algorithmique Avancée']
    },
    linkedProjects: ['ai-copilot-excel', 'neural-vision-lab']
  },
  {
    id: 'bsc-cs',
    degree: {
      en: "Bachelor of Science in Mathematics & Computer Science",
      fr: 'Licence Mathématiques & Informatique'
    },
    institution: {
      en: 'University of Science & Technology',
      fr: 'Université des Sciences et Technologies'
    },
    location: {
      en: 'France',
      fr: 'France'
    },
    period: '2019 - 2022',
    gpa: '3.8 / 4.0',
    fieldOfStudy: {
      en: 'Software Engineering, Applied Mathematics, Database Systems',
      fr: 'Génie Logiciel, Mathématiques Appliquées, Base de Données'
    },
    courses: {
      en: ['Object-Oriented Design', 'Linear Algebra & Statistics', 'Database Systems & SQL', 'Web Technologies'],
      fr: ['Conception Orientée Objet', 'Algèbre Linéaire & Statistiques', 'Bases de Données & SQL', 'Technologies Web']
    },
    linkedProjects: ['quantum-sim-engine']
  }
];

export const experienceData: ExperienceItem[] = [
  {
    id: 'ai-eng-lead',
    role: {
      en: 'AI & Data Software Engineer',
      fr: 'Ingénieur IA & Software'
    },
    company: {
      en: 'Tech Global Solutions',
      fr: 'Tech Global Solutions'
    },
    location: {
      en: 'Paris / Hybrid',
      fr: 'Paris / Hybride'
    },
    contractType: {
      en: 'Full-Time',
      fr: 'CDI'
    },
    period: '2024 - Present',
    description: {
      en: 'Designing and deploying production LLM workflows, automated data pipelines, and responsive web microservices.',
      fr: 'Conception et déploiement de workflows LLM en production, pipelines de données et microservices web réactifs.'
    },
    achievements: {
      en: [
        'Built dynamic prompt execution pipelines reducing query latency by 35%.',
        'Engineered PySide6 desktop applications and Vue 3 frontend dashboards.',
        'Implemented rigorous CI/CD test automation for ML models.'
      ],
      fr: [
        'Création de pipelines d\'exécution de prompts réduisant la latence de 35%.',
        'Développement d\'applications desktop PySide6 et dashboards Vue 3.',
        'Mise en place de tests d\'intégration automatisés CI/CD pour modèles ML.'
      ]
    },
    technologies: ['Python', 'Vue.js', 'Nuxt', 'FastAPI', 'Docker', 'PyTorch', 'TypeScript'],
    linkedProjects: ['ai-copilot-excel']
  },
  {
    id: 'fullstack-dev-appr',
    role: {
      en: 'Full-Stack Software Developer (Apprenticeship)',
      fr: 'Développeur Full-Stack (Alternance)'
    },
    company: {
      en: 'Innovate Digital Agency',
      fr: 'Agence Innovate Digital'
    },
    location: {
      en: 'France',
      fr: 'France'
    },
    contractType: {
      en: 'Apprenticeship',
      fr: 'Alternance'
    },
    period: '2022 - 2024',
    description: {
      en: 'Developed high-availability web portals, REST APIs, and automated data aggregation services for enterprise client apps.',
      fr: 'Développement de portails web haute disponibilité, d\'APIs REST et de services d\'agrégation de données pour clients grands comptes.'
    },
    achievements: {
      en: [
        'Designed modular Vue / Nuxt frontend components with tailored Sass/SCSS designs.',
        'Optimized PostgreSQL queries, improving payload delivery time by 50%.',
        'Integrated OAuth2 authentication and RBAC security controls.'
      ],
      fr: [
        'Conception de composants Vue / Nuxt modulaires avec designs Sass/SCSS sur mesure.',
        'Optimisation de requêtes PostgreSQL, améliorant le temps de réponse de 50%.',
        'Intégration de l\'authentification OAuth2 et du contrôle d\'accès RBAC.'
      ]
    },
    technologies: ['Vue 3', 'Nuxt', 'SCSS', 'Node.js', 'PostgreSQL', 'GitLab CI'],
    linkedProjects: ['nexus-analytics-suite']
  }
];

export const projectsData: ProjectItem[] = [
  {
    id: 'ai-copilot-excel',
    title: 'Excel AI Copilot Desktop',
    context: 'Personal',
    contextLabel: {
      en: 'Personal Project',
      fr: 'Projet Personnel'
    },
    teamSize: 1,
    duration: {
      en: '3 Months',
      fr: '3 Mois'
    },
    shortDescription: {
      en: 'Offline LLM-driven Excel workbook analyzer, semantic formula resolver, and structured spreadsheet action runner.',
      fr: 'Analyseur de classeurs Excel piloté par LLM hors-ligne, résolveur sémantique de formules et exécuteur d\'actions.'
    },
    fullDescription: {
      en: 'Built with PySide6, Python, and open-source LLMs. Features strict JSON schema validation, formula safety translation, and atomic undo/redo operations.',
      fr: 'Développé avec PySide6, Python et des LLM open-source. Inclut la validation stricte de schémas JSON et la traduction sécurisée de formules.'
    },
    tags: ['Python', 'PySide6', 'LLM', 'OpenPyXL', 'AI'],
    repoUrl: 'https://github.com/tanguyhardion/excel-ai-copilot',
    featured: true
  },
  {
    id: 'nexus-analytics-suite',
    title: 'Nexus Analytics Dashboard',
    context: 'Work',
    contextLabel: {
      en: 'Enterprise Work',
      fr: 'Projet Entreprise'
    },
    teamSize: 4,
    duration: {
      en: '6 Months',
      fr: '6 Mois'
    },
    shortDescription: {
      en: 'Real-time telemetry and data analytics dashboard featuring glassmorphism layout, dynamic chart modules, and instant filter presets.',
      fr: 'Tableau de bord d\'analyse de télémétrie en temps réel avec interface effet verre givré, graphiques dynamiques et filtres instantanés.'
    },
    tags: ['Nuxt', 'Vue 3', 'SCSS', 'Chart.js', 'FastAPI'],
    repoUrl: 'https://github.com/tanguyhardion/nexus-analytics',
    demoUrl: 'https://nexus-demo.example.com',
    featured: true
  },
  {
    id: 'neural-vision-lab',
    title: 'Neural Vision Lab',
    context: 'School',
    contextLabel: {
      en: 'Academic Master Project',
      fr: 'Projet Master'
    },
    teamSize: 2,
    duration: {
      en: '4 Months',
      fr: '4 Mois'
    },
    shortDescription: {
      en: 'Computer vision framework for real-time defect identification on assembly line imagery using convolutional network architectures.',
      fr: 'Framework de vision par ordinateur pour l\'identification en temps réel de défauts de fabrication par réseaux convolutifs.'
    },
    fullDescription: {
      en: 'Trained ResNet-50 and YOLO models on industrial image datasets. Reached 96.4% precision with real-time video stream processing.',
      fr: 'Entraînement de modèles ResNet-50 et YOLO sur données industrielles. Précision atteinte de 96,4% sur flux vidéo temps réel.'
    },
    tags: ['PyTorch', 'OpenCV', 'Python', 'CUDA', 'YOLO'],
    repoUrl: 'https://github.com/tanguyhardion/neural-vision-lab',
    featured: true
  },
  {
    id: 'quantum-sim-engine',
    title: 'Quantum Sim Engine',
    context: 'School',
    contextLabel: {
      en: 'Academic BSc Thesis',
      fr: 'Mémoire de Licence'
    },
    teamSize: 1,
    duration: {
      en: '5 Months',
      fr: '5 Mois'
    },
    shortDescription: {
      en: 'Interactive quantum logic gate simulator with 2D visual circuit builder and state-vector representation export.',
      fr: 'Simulateur interactif de portes logiques quantiques avec éditeur 2D de circuits et exportation du vecteur d\'état.'
    },
    fullDescription: {
      en: 'Simulates multi-qubit Hadamard, CNOT, and Phase shift gates with complex matrix mathematical computations rendered on HTML5 Canvas.',
      fr: 'Simulation des portes Hadamard, CNOT et déphasage multi-qubits avec calculs matriciels complexes et rendu HTML5 Canvas.'
    },
    tags: ['TypeScript', 'Canvas 2D', 'Linear Algebra', 'WebAssembly'],
    repoUrl: 'https://github.com/tanguyhardion/quantum-sim-engine'
  }
];

export const skillCategoriesData: SkillCategory[] = [
  {
    id: 'ai-ml',
    name: {
      en: 'AI & Machine Learning',
      fr: 'IA & Apprentissage Automatique'
    },
    icon: 'ph:brain-bold',
    skills: [
      { name: 'Python (PyTorch / TensorFlow)', level: 92, highlight: true },
      { name: 'LLM Orchestration & Prompt Eng.', level: 90, highlight: true },
      { name: 'Computer Vision (OpenCV / YOLO)', level: 85 },
      { name: 'Scikit-Learn & Statistics', level: 88 }
    ]
  },
  {
    id: 'data-eng',
    name: {
      en: 'Data Engineering & Pipelines',
      fr: 'Ingénierie des Données & Pipelines'
    },
    icon: 'ph:database-bold',
    skills: [
      { name: 'SQL & Database Architecture', level: 90, highlight: true },
      { name: 'PostgreSQL / MongoDB / Redis', level: 86 },
      { name: 'ETL Pipelines & Pandas', level: 88 },
      { name: 'Data Modeling & Sanitization', level: 85 }
    ]
  },
  {
    id: 'web-dev',
    name: {
      en: 'Web & Desktop Development',
      fr: 'Développement Web & Desktop'
    },
    icon: 'ph:code-bold',
    skills: [
      { name: 'Vue 3 / Nuxt 3 & 4', level: 95, highlight: true },
      { name: 'SCSS / CSS Grid / Responsive Design', level: 95, highlight: true },
      { name: 'TypeScript / Modern JavaScript', level: 92 },
      { name: 'PySide6 / PyQt Desktop UI', level: 88 }
    ]
  },
  {
    id: 'devops-cloud',
    name: {
      en: 'DevOps & Cloud Systems',
      fr: 'DevOps & Infrastructure Cloud'
    },
    icon: 'ph:cloud-check-bold',
    skills: [
      { name: 'Docker & Containerization', level: 87, highlight: true },
      { name: 'Git & GitHub / GitLab CI/CD', level: 92 },
      { name: 'GitHub Pages / Vercel Deployments', level: 90 },
      { name: 'Linux SysAdmin & Bash Scripting', level: 84 }
    ]
  }
];

export const languagesData: LanguageSkill[] = [
  {
    name: { en: 'French', fr: 'Français' },
    flag: '🇫🇷',
    level: 'Native / Maternelle',
    description: {
      en: 'Native fluency in speaking, writing, and professional communication.',
      fr: 'Langue maternelle, parfaite maîtrise orale et écrite.'
    }
  },
  {
    name: { en: 'English', fr: 'Anglais' },
    flag: '🇬🇧',
    level: 'Full Professional (C1/C2)',
    description: {
      en: 'Full professional proficiency in international teams and technical writing.',
      fr: 'Maîtrise professionnelle complète pour travail en équipe internationale.'
    }
  }
];

export const resumeFormatsData: ResumeFormat[] = [
  {
    id: 'resume-en',
    title: {
      en: 'English Resume (International Standard)',
      fr: 'CV en Anglais (Format International)'
    },
    languageCode: 'en',
    fileName: 'Tanguy_Hardion_Resume_EN.pdf',
    filePathInRepo: 'public/resumes/Tanguy_Hardion_Resume_EN.pdf',
    downloadUrl: '/resumes/Tanguy_Hardion_Resume_EN.pdf',
    fileSize: '185 KB',
    format: 'PDF'
  },
  {
    id: 'resume-fr',
    title: {
      en: 'French Resume (CV Français)',
      fr: 'CV en Français (Format France)'
    },
    languageCode: 'fr',
    fileName: 'Tanguy_Hardion_CV_FR.pdf',
    filePathInRepo: 'public/resumes/Tanguy_Hardion_CV_FR.pdf',
    downloadUrl: '/resumes/Tanguy_Hardion_CV_FR.pdf',
    fileSize: '190 KB',
    format: 'PDF'
  },
  {
    id: 'resume-us',
    title: {
      en: 'US One-Page Resume (Tech / AI Focus)',
      fr: 'CV Américain 1-Page (Spécialité IA & Tech)'
    },
    languageCode: 'us',
    fileName: 'Tanguy_Hardion_Resume_US_OnePage.pdf',
    filePathInRepo: 'public/resumes/Tanguy_Hardion_Resume_US_OnePage.pdf',
    downloadUrl: '/resumes/Tanguy_Hardion_Resume_US_OnePage.pdf',
    fileSize: '175 KB',
    format: 'PDF'
  }
];

export const personalInterestsData: PersonalInterest[] = [
  {
    title: {
      en: 'Astrophysics & Space Exploration',
      fr: 'Astrophysique & Exploration Spatiale'
    },
    icon: '🪐',
    description: {
      en: 'Fascinated by planetary movement, quantum mechanics, and deep space observations.',
      fr: 'Passionné par la mécanique céleste, la physique quantique et l\'observation spatiale.'
    }
  },
  {
    title: {
      en: 'UI/UX Craftsmanship & Generative Art',
      fr: 'Design UI/UX & Art Génératif'
    },
    icon: '🎨',
    description: {
      en: 'Exploring algorithmic graphics, shader visualizers, and minimal micro-interactions.',
      fr: 'Exploration de graphismes algorithmiques, visualiseurs et micro-interactions.'
    }
  },
  {
    title: {
      en: 'Open Source Software & Linux Customization',
      fr: 'Open Source & Customisation Linux'
    },
    icon: '⚡',
    description: {
      en: 'Building developer tools, optimizing shell workflows, and contributing to community projects.',
      fr: 'Création d\'outils développeur, optimisation de scripts shell et contributions open-source.'
    }
  }
];
