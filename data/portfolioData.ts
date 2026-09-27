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

// Helper functions to calculate stats dynamically
export const getTotalProjectsCount = (): string => `${projectsData.length}+`;

export const getYearsOfExperienceCount = (): string => {
  const isFullTime = (exp: ExperienceItem) => {
    const typeEn = exp.contractType.en.toLowerCase();
    const typeFr = exp.contractType.fr.toLowerCase();
    const descEn = exp.description.en.toLowerCase();
    const descFr = exp.description.fr.toLowerCase();

    const isInternship = typeEn.includes('intern') || typeFr.includes('stage');
    const isSummerJob = descEn.includes('summer job') || descFr.includes("job d'été");

    return !isInternship && !isSummerJob;
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
      role: 'Junior Consultant in AI & Data at Deloitte',
      summary: 'Junior Consultant in AI & Data at Deloitte Luxembourg. Driving value through Agentic AI, intelligent automation, data strategy, data architecture, data engineering, data governance, and enterprise data management.',
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
      role: 'Consultant Junior IA & Data chez Deloitte',
      summary: "Consultant Junior IA & Data chez Deloitte Luxembourg. Spécialisé en IA agentique, automatisation intelligente, stratégie de données, architecture de données, data engineering, gouvernance et gestion des données d'entreprise.",
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

export const academicsData: AcademicItem[] = [
  {
    id: 'utc',
    degree: {
      en: 'Academic Mobility Program',
      fr: 'Programme de mobilité académique'
    },
    institution: {
      en: 'Université de Technologie de Compiègne (UTC)',
      fr: 'Université de Technologie de Compiègne (UTC)'
    },
    location: {
      en: 'Compiègne, France',
      fr: 'Compiègne, France'
    },
    period: '09/2024 - 01/2025',
    fieldOfStudy: {
      en: 'Artificial Intelligence and Data Science',
      fr: 'Intelligence Artificielle et Data Science'
    },
    courses: {
      en: ['Multi-Agent Systems', 'Machine Learning', 'Deep Learning', 'Stochastic Processes'],
      fr: ['Systèmes Multi-Agents', 'Machine Learning', 'Deep Learning', 'Processus Stochastiques']
    }
  },
  {
    id: 'utt',
    degree: {
      en: "Engineer's Degree",
      fr: "Diplôme d'Ingénieur"
    },
    institution: {
      en: 'Université de Technologie de Troyes (UTT)',
      fr: 'Université de Technologie de Troyes (UTT)'
    },
    location: {
      en: 'Troyes, France',
      fr: 'Troyes, France'
    },
    period: '07/2022 - 07/2025',
    gpa: '4.70 / 5.00',
    fieldOfStudy: {
      en: 'Computer Science',
      fr: 'Informatique'
    },
    courses: {
      en: ['Databases', 'Programming', 'Software Engineering', 'Deep Learning', 'Project Management', 'AI (LLMs)'],
      fr: ['Bases de données', 'Programmation', 'Génie Logiciel', 'Deep Learning', 'Gestion de Projet', 'IA (LLM)']
    },
    linkedProjects: ['cnn-cifar100', 'census-income']
  },
  {
    id: 'iut-dijon',
    degree: {
      en: "Associate's Degree (DUT)",
      fr: 'DUT'
    },
    institution: {
      en: 'IUT Dijon-Auxerre-Nevers',
      fr: 'IUT Dijon-Auxerre-Nevers'
    },
    location: {
      en: 'Dijon, France',
      fr: 'Dijon, France'
    },
    period: '09/2020 - 06/2022',
    gpa: 'Top 10 / 100',
    fieldOfStudy: {
      en: 'Computer Science',
      fr: 'Informatique'
    },
    courses: {
      en: ['General IT Fundamentals', 'Mathematics', 'Software', 'Programming', 'Networking', 'Project Management', 'Communication'],
      fr: ['Fondamentaux de l\'Informatique', 'Mathématiques', 'Logiciel', 'Programmation', 'Réseaux', 'Gestion de Projet', 'Communication']
    }
  }
];

export const experienceData: ExperienceItem[] = [
  {
    id: 'deloitte-consultant',
    role: {
      en: 'Junior Consultant in AI & Data',
      fr: 'Consultant Junior IA & Data'
    },
    company: {
      en: 'Deloitte Luxembourg',
      fr: 'Deloitte Luxembourg'
    },
    location: {
      en: 'Luxembourg',
      fr: 'Luxembourg'
    },
    contractType: {
      en: 'Full-Time',
      fr: 'CDI'
    },
    period: '09/2025 - Present',
    description: {
      en: 'Junior Consultant in AI & Data at Deloitte Luxembourg, delivering data strategy, governance, architecture, AI and regulatory engagements for public institutions and financial services clients.',
      fr: 'Consultant Junior IA & Data chez Deloitte Luxembourg, intervenant sur des missions de stratégie, gouvernance et architecture de données, d\'IA et de conformité réglementaire pour des institutions publiques et des acteurs des services financiers.'
    },
    achievements: {
      en: [],
      fr: []
    },
    engagements: [
      {
        client: { en: 'Global digital payments company', fr: 'Acteur mondial du paiement digital' },
        title: { en: 'BCBS 239 Compliance', fr: 'Conformité BCBS 239' },
        period: { en: 'Jun 2026 – Present', fr: 'Juin 2026 – Aujourd\'hui' },
        bullets: {
          en: [
            'Supporting BCBS 239 regulatory compliance by modernizing end-to-end data lineage tracing, mapping critical data points (credit, FINREP and COREP indicators) from source to consumption to establish complete transparency, data quality, and governance across complex financial flows.',
            'Combining AI, automated code analysis, and expert human judgment to strengthen risk data aggregation and reporting capabilities, alongside business glossary development and architecture documentation.'
          ],
          fr: [
            'Accompagnement de la conformité réglementaire BCBS 239 par la modernisation du lignage de données de bout en bout, en cartographiant les données critiques (indicateurs de crédit, FINREP et COREP) de la source à la consommation afin d\'assurer transparence, qualité et gouvernance sur des flux financiers complexes.',
            'Combinaison d\'IA, d\'analyse automatisée du code et d\'expertise humaine pour renforcer l\'agrégation des données de risque et les capacités de reporting, avec construction d\'un glossaire métier et documentation de l\'architecture.'
          ]
        }
      },
      {
        client: { en: 'Public finance institution', fr: 'Institution financière publique' },
        title: { en: 'Data & BI Transformation Readiness', fr: 'Préparation à la Transformation Data & BI' },
        period: { en: 'Mar – Apr 2026', fr: 'Mars – Avr. 2026' },
        bullets: {
          en: [
            'Worked embedded with the client daily to structure pre-transformation groundwork, assessing both the data landscape and the reporting landscape.',
            'Delivered data domain definitions, a report inventory, a data dictionary, and BI report mockups to prepare the client for a data/BI transformation.'
          ],
          fr: [
            'Intégré quotidiennement chez le client pour structurer les travaux préparatoires, en évaluant à la fois le paysage de données et le paysage de reporting.',
            'Livraison de définitions de domaines de données, d\'un inventaire des rapports, d\'un dictionnaire de données et de maquettes de rapports BI pour préparer le client à une transformation data/BI.'
          ]
        }
      },
      {
        client: { en: 'Public institution', fr: 'Institution publique' },
        title: { en: 'AI Vision & Roadmap', fr: 'Vision & Feuille de Route IA' },
        period: { en: 'Feb – Mar 2026', fr: 'Févr. – Mars 2026' },
        bullets: {
          en: [
            'Conducted executive interviews to define AI vision and ambition, then identified and prioritized AI use cases and delivered an implementation roadmap.'
          ],
          fr: [
            'Conduite d\'entretiens avec la direction pour définir la vision et l\'ambition IA, puis identification et priorisation des cas d\'usage IA et livraison d\'une feuille de route de mise en œuvre.'
          ]
        }
      },
      {
        client: { en: 'International asset manager', fr: 'Gestionnaire d\'actifs international' },
        title: { en: 'Data Architecture Assessment', fr: 'Évaluation d\'Architecture de Données' },
        period: { en: 'Jan – Feb 2026', fr: 'Janv. – Févr. 2026' },
        bullets: {
          en: [
            'Assessed the current data landscape (systems, data, flows, quality) via documentation review and workshops.',
            'Mapped current-state architecture (applications, data flows, ownership) and defined the target data architecture, including tool/vendor benchmarking.'
          ],
          fr: [
            'Évaluation du paysage de données (systèmes, données, flux, qualité) via revue documentaire et ateliers.',
            'Cartographie de l\'architecture existante (applications, flux, propriété) et définition de l\'architecture de données cible, incluant un benchmark d\'outils/éditeurs.'
          ]
        }
      },
      {
        client: { en: 'European insurance & wealth management group', fr: 'Groupe européen d\'assurance & gestion de patrimoine' },
        title: { en: 'AI/RPA Use Case Prioritization', fr: 'Priorisation de cas d\'usage IA/RPA' },
        period: { en: 'Jan – Feb 2026', fr: 'Janv. – Févr. 2026' },
        bullets: {
          en: [
            'Collected and structured 40+ AI/RPA automation use cases from business stakeholders via workshops and questionnaires, refining and qualifying requirements.',
            'Built a feasibility/impact scoring model (based on current tech stack, IT roadmap, and data complexity) and a resulting prioritization matrix, culminating in a delivered implementation roadmap.'
          ],
          fr: [
            'Collecte et structuration de plus de 40 cas d\'usage d\'automatisation IA/RPA auprès des métiers via ateliers et questionnaires, avec affinage et qualification des besoins.',
            'Conception d\'un modèle de scoring faisabilité/impact (selon la stack technique, la feuille de route IT et la complexité des données) et d\'une matrice de priorisation, aboutissant à la livraison d\'une feuille de route de mise en œuvre.'
          ]
        }
      },
      {
        client: { en: 'Public institution', fr: 'Institution publique' },
        title: { en: 'Data Strategy & Governance', fr: 'Stratégie & Gouvernance des Données' },
        period: { en: 'Oct – Dec 2025', fr: 'Oct. – Déc. 2025' },
        bullets: {
          en: [
            'Led stakeholder workshops to assess the current data landscape (data location, flow, ownership); produced a gap analysis and recommendations centered on data governance and data warehousing, and delivered a future-state roadmap.',
            'Defined data governance model options (centralized / federated / decentralized) with associated roles, responsibilities, and target structure; defined governance principles and processes across four dimensions: data quality, data integration & interoperability, metadata management, and master data management.'
          ],
          fr: [
            'Animation d\'ateliers avec les parties prenantes pour évaluer le paysage de données existant (localisation, flux, propriété) ; réalisation d\'une analyse d\'écarts et de recommandations centrées sur la gouvernance des données et l\'entreposage de données, et livraison d\'une feuille de route cible.',
            'Définition d\'options de modèles de gouvernance des données (centralisé / fédéré / décentralisé) avec rôles, responsabilités et structure cible associés ; définition des principes et processus de gouvernance selon quatre dimensions : qualité des données, intégration & interopérabilité, gestion des métadonnées et gestion des données de référence (MDM).'
          ]
        }
      },
      {
        client: { en: 'Deloitte', fr: 'Deloitte' },
        title: { en: 'Internal Initiatives', fr: 'Initiatives Internes' },
        bullets: {
          en: [
            'Contributed to internal firm initiatives including proposal development and innovation assignments alongside client delivery work.'
          ],
          fr: [
            'Contribution à des initiatives internes (réponses à appels d\'offres, missions d\'innovation) en parallèle des missions client.'
          ]
        }
      }
    ],
    technologies: ['Data Governance', 'Data Strategy', 'Data Architecture', 'Data Lineage', 'BCBS 239', 'AI Use Cases', 'Roadmapping']
  },
  {
    id: 'deloitte-analyst',
    role: {
      en: 'AI & Data Analyst',
      fr: 'Analyste IA & Data'
    },
    company: {
      en: 'Deloitte Luxembourg',
      fr: 'Deloitte Luxembourg'
    },
    location: {
      en: 'Luxembourg',
      fr: 'Luxembourg'
    },
    contractType: {
      en: 'Internship',
      fr: 'Stage'
    },
    period: '02/2025 - 08/2025',
    description: {
      en: 'End of studies internship at Deloitte, contributing to end-to-end data pipelines for a global asset management client and building AI agents on top of its data.',
      fr: "Stage de fin d'études chez Deloitte : contribution aux pipelines de données de bout en bout d'un client international de gestion d'actifs et développement d'agents IA sur ses données."
    },
    achievements: {
      en: [
        'Contributed to end-to-end data pipeline processes for a global investment/asset management client, from monthly data sourcing to client-facing dashboards delivering portfolio risk and performance insights to investors.',
        'Managed the monthly data provider sourcing process (medallion architecture on a custom in-house SQL Server-based platform) and oversaw provider upload compliance.',
        'Developed data quality controls on incoming data, and maintained/improved the SQL Server data model (tables, views, stored procedures).',
        'Produced and improved client-facing reporting in Excel and Power BI, combining business knowledge of portfolio risk/performance concepts with technical execution to ensure end-to-end data correctness.',
        'Built a pilot AI agent (Python, LangChain, LangGraph) that progressively explores a large database — schemas, then tables, then data — to answer natural-language questions from both technical users (raw queries/tables) and business users (simplified tables/graphs).',
        'Delivered the agent pilot successfully, demonstrating clear feasibility and value: faster build/debug cycles for the internal team and greater transparency and autonomy for the client over their own processed data.',
        'Built a proof-of-concept AI agent (Python, LangChain, prompt engineering) to quality-check incoming provider data, complementing existing programmatic/logical data quality checks.',
        'Diagnosed and automated numerous manual, tedious business-as-usual processes throughout the engagement using Python scripts, integrated into the main application or delivered as standalone tools.'
      ],
      fr: [
        'Contribution aux processus de pipelines de données de bout en bout pour un client international de gestion d\'actifs, du sourcing mensuel des données jusqu\'aux tableaux de bord clients présentant les indicateurs de risque et de performance des portefeuilles aux investisseurs.',
        'Pilotage du processus mensuel de sourcing auprès des fournisseurs de données (architecture médaillon sur une plateforme interne basée sur SQL Server) et suivi de la conformité des chargements.',
        'Développement de contrôles qualité sur les données entrantes, et maintenance/amélioration du modèle de données SQL Server (tables, vues, procédures stockées).',
        'Production et amélioration des reportings clients sous Excel et Power BI, alliant connaissance métier du risque/de la performance de portefeuille et exécution technique pour garantir la justesse des données de bout en bout.',
        'Développement d\'un agent IA pilote (Python, LangChain, LangGraph) explorant progressivement une large base de données — schémas, puis tables, puis données — pour répondre en langage naturel aux utilisateurs techniques (requêtes/tables brutes) comme métiers (tableaux/graphiques simplifiés).',
        'Livraison réussie du pilote, démontrant faisabilité et valeur : cycles de développement/débogage accélérés pour l\'équipe interne, et plus de transparence et d\'autonomie pour le client sur ses propres données.',
        'Développement d\'un agent IA en preuve de concept (Python, LangChain, prompt engineering) pour contrôler la qualité des données fournisseurs, en complément des contrôles programmatiques existants.',
        'Identification et automatisation de nombreux processus manuels et fastidieux via des scripts Python, intégrés à l\'application principale ou livrés comme outils autonomes.'
      ]
    },
    technologies: ['Python', 'LangChain', 'LangGraph', 'AI Agents', 'SQL Server', 'T-SQL', 'Power BI', 'Excel', 'Medallion Architecture', 'Data Quality']
  },
  {
    id: 'cpage-engineer',
    role: {
      en: 'Software Engineer',
      fr: 'Ingénieur Logiciel'
    },
    company: {
      en: 'CPage',
      fr: 'CPage'
    },
    location: {
      en: 'Dijon, France',
      fr: 'Dijon, France'
    },
    contractType: {
      en: 'Fixed-term contract (CDD)',
      fr: 'CDD'
    },
    period: '07/2024 - 08/2024',
    description: {
      en: 'Summer job at CPage, a healthcare/hospital software vendor, following my previous internship there.',
      fr: "Job d'été chez CPage, éditeur de logiciels pour les établissements de santé, à la suite de mon précédent stage."
    },
    achievements: {
      en: [
        'Built a client satisfaction tracking web application (Angular, Spring Boot, PostgreSQL, Leaflet) enabling staff to log client interaction outcomes (satisfaction level + free-text notes) after every client touchpoint.',
        'Designed a live, always-on map of client satisfaction across France (metropolitan + overseas territories), selectable by time period, displayed company-wide so staff could check client sentiment before meetings and calls.',
        'Integrated a lightweight, locally-run Hugging Face NLP model (keyword extraction + sentiment analysis) to automatically process free-text notes into word clouds, surfacing recurring themes without manual review.',
        'Outcome: improved internal communication and client relationship tracking across teams; delivered a complete, demo-ready application by end of contract, laying the groundwork for a planned production rollout.'
      ],
      fr: [
        'Développement d\'une application web de suivi de la satisfaction client (Angular, Spring Boot, PostgreSQL, Leaflet) permettant aux équipes de consigner le résultat de chaque interaction client (niveau de satisfaction + notes libres).',
        'Conception d\'une carte en temps réel de la satisfaction client sur toute la France (métropole + outre-mer), filtrable par période, affichée dans toute l\'entreprise pour consulter le ressenti client avant réunions et appels.',
        'Intégration d\'un modèle NLP Hugging Face léger exécuté localement (extraction de mots-clés + analyse de sentiment) pour transformer automatiquement les notes libres en nuages de mots et faire ressortir les thèmes récurrents.',
        'Résultat : meilleure communication interne et meilleur suivi de la relation client entre équipes ; application complète et prête pour démonstration livrée en fin de contrat, préparant un déploiement en production.'
      ]
    },
    technologies: ['Angular', 'Spring Boot', 'PostgreSQL', 'Leaflet', 'Hugging Face', 'NLP']
  },
  {
    id: 'cpage-intern',
    role: {
      en: 'Software Engineer Intern',
      fr: 'Stagiaire Ingénieur Logiciel'
    },
    company: {
      en: 'CPage',
      fr: 'CPage'
    },
    location: {
      en: 'Dijon, France',
      fr: 'Dijon, France'
    },
    contractType: {
      en: 'Internship',
      fr: 'Stage'
    },
    period: '07/2023 - 12/2023',
    description: {
      en: 'Mid-engineering degree internship at CPage, a company that develops software for public health institutions.',
      fr: "Stage de milieu de cursus ingénieur chez CPage, une société développant des logiciels pour les établissements de santé publics."
    },
    achievements: {
      en: [
        'Main mission: built an interactive dependency graph web application (Angular, Spring Boot, Oracle DB, Sigma.js, Graphology) visualizing software release dependencies as a directed graph, replacing a fully manual, error-prone process based on non-standardized PDF delivery notes.',
        'Developed a Java regex-based parser to extract release version and dependency data from inconsistent PDF delivery notes, and drove alignment across development teams on a standardized delivery note format.',
        'Built graph app features: fuzzy/typo-tolerant search (edit-distance algorithm), interactive zoom/pan with dependency highlighting, timestamped and undoable change history, color-coded node categorization, an interactive statistics dashboard, and multiple graph layout algorithms (ForceAtlas2, Dagre).',
        'Delivered iteratively using Agile methodology, presenting and validating each feature with the team; used Balsamiq for mockups and Git for version control.',
        'Outcome: gave installation technicians a reliable, self-service way to check release dependencies, speeding up and simplifying installations while reducing the risk of installing incorrect dependencies.',
        'Secondary mission: worked alongside an architect on a proof-of-concept to restructure the release packaging pipeline, migrating toward Maven + RPM/Yum-based dependency resolution for Linux package installation.',
        'Organized and led cross-team alignment meetings to define and get adopted a standardized XML schema for release/dependency metadata; authored the structural proposal that was ultimately adopted.',
        'Built a custom Maven plugin that consumes the standardized XML metadata to auto-generate uniform PDF delivery notes and insert release/dependency data directly into the database, eliminating manual PDF parsing for releases using the new pipeline.',
        'Self-initiated an AI innovation project: tested zero-shot prompting with ChatGPT for dependency extraction, found it unreliable, then designed and executed a supervised fine-tuning pipeline for an open-source LLM (Llama 2, 7B, via Hugging Face) on Google Colab, using a dataset auto-generated from the existing regex parser.',
        'Result: the fine-tuned 7B model reliably outperformed general-purpose 175B-parameter models on the narrow extraction task, demonstrating the value of task-specific fine-tuning; presented the POC company-wide to promote practical AI adoption.',
        'Built two standalone JavaScript/Node.js automation tools to speed up colleagues\' recurring manual file-processing tasks, packaged as cross-platform executables (Windows/Linux/macOS).'
      ],
      fr: [
        'Mission principale : développement d\'une application web de graphe de dépendances interactif (Angular, Spring Boot, Oracle DB, Sigma.js, Graphology) représentant les dépendances entre versions logicielles sous forme de graphe orienté, en remplacement d\'un processus entièrement manuel et source d\'erreurs basé sur des bons de livraison PDF non standardisés.',
        'Développement d\'un parseur Java à base de regex pour extraire versions et dépendances de bons de livraison PDF hétérogènes, et pilotage de l\'alignement des équipes de développement sur un format de bon de livraison standardisé.',
        'Fonctionnalités du graphe : recherche floue tolérante aux fautes (distance d\'édition), zoom/déplacement interactifs avec mise en évidence des dépendances, historique des modifications horodaté et annulable, catégorisation des nœuds par couleur, tableau de bord statistique interactif et plusieurs algorithmes de disposition (ForceAtlas2, Dagre).',
        'Livraison itérative en méthodologie Agile, avec présentation et validation de chaque fonctionnalité auprès de l\'équipe ; maquettes sous Balsamiq et versionnage avec Git.',
        'Résultat : un outil fiable et en libre-service pour les techniciens d\'installation, accélérant et simplifiant les installations tout en réduisant le risque d\'installer de mauvaises dépendances.',
        'Mission secondaire : travail aux côtés d\'un architecte sur une preuve de concept de refonte de la chaîne de packaging des versions, vers une résolution des dépendances basée sur Maven + RPM/Yum pour l\'installation de paquets Linux.',
        'Organisation et animation de réunions d\'alignement inter-équipes pour définir et faire adopter un schéma XML standardisé de métadonnées de versions/dépendances ; rédaction de la proposition de structure finalement retenue.',
        'Développement d\'un plugin Maven exploitant ces métadonnées XML pour générer automatiquement des bons de livraison PDF uniformes et insérer directement versions et dépendances en base, supprimant l\'analyse manuelle des PDF pour les versions utilisant la nouvelle chaîne.',
        'Projet d\'innovation IA à mon initiative : test du prompting zero-shot avec ChatGPT pour l\'extraction des dépendances, jugé peu fiable, puis conception et exécution d\'un pipeline de fine-tuning supervisé d\'un LLM open source (Llama 2, 7B, via Hugging Face) sur Google Colab, avec un jeu de données généré automatiquement à partir du parseur regex existant.',
        'Résultat : le modèle 7B fine-tuné surpassait de façon fiable des modèles généralistes de 175 Md de paramètres sur cette tâche d\'extraction ciblée ; POC présenté à toute l\'entreprise pour promouvoir l\'adoption concrète de l\'IA.',
        'Développement de deux outils d\'automatisation JavaScript/Node.js pour accélérer des traitements de fichiers manuels et récurrents de collègues, packagés en exécutables multiplateformes (Windows/Linux/macOS).'
      ]
    },
    technologies: ['Angular', 'Spring Boot', 'Java', 'Oracle DB', 'Sigma.js', 'Graphology', 'Maven', 'Llama 2', 'Hugging Face', 'Node.js']
  },
  {
    id: 'aprr-intern',
    role: {
      en: 'Software Engineer Intern',
      fr: 'Stagiaire Ingénieur Logiciel'
    },
    company: {
      en: 'APRR',
      fr: 'APRR'
    },
    location: {
      en: 'Dijon, France',
      fr: 'Dijon, France'
    },
    contractType: {
      en: 'Internship',
      fr: 'Stage'
    },
    period: '04/2022 - 06/2022',
    description: {
      en: 'End of associate degree internship at APRR, a highway infrastructure operator, in the department that manages the installation and support of the systems used by the company.',
      fr: "Stage de fin de DUT chez APRR, opérateur d'infrastructures autoroutières, dans le département qui gère l'installation et le support des systèmes utilisés par l'entreprise."
    },
    achievements: {
      en: [
        'Improved a WPF desktop application (C#, XAML) connecting to highway systems for real-time monitoring and control: redesigned the UI/UX with mockups validated by the team before implementation, applying Material Design principles.',
        'Cleaned up the existing codebase, added new features, and fixed bugs in the monitoring application, resulting in improved UX and faster day-to-day use for technicians.',
        'Applied the same redesign, cleanup, feature, and bug-fix process to a second internal tool used to encrypt SQLite databases (C#, XAML, WPF, Material Design).',
        'Outcome: faster and easier monitoring workflows for technicians, contributing to faster client support and intervention on highway systems.'
      ],
      fr: [
        'Amélioration d\'une application de bureau WPF (C#, XAML) connectée aux systèmes autoroutiers pour la supervision et le contrôle en temps réel : refonte de l\'UI/UX avec maquettes validées par l\'équipe avant implémentation, selon les principes du Material Design.',
        'Nettoyage du code existant, ajout de fonctionnalités et correction de bugs dans l\'application de supervision, pour une meilleure UX et une utilisation quotidienne plus rapide par les techniciens.',
        'Même démarche (refonte, nettoyage, fonctionnalités, corrections) appliquée à un second outil interne de chiffrement de bases SQLite (C#, XAML, WPF, Material Design).',
        'Résultat : des processus de supervision plus rapides et plus simples pour les techniciens, contribuant à un support client et des interventions plus rapides sur les systèmes autoroutiers.'
      ]
    },
    technologies: ['C#', 'XAML', 'WPF', 'Material Design', 'SQLite']
  }
];

export const projectsData: ProjectItem[] = [
  {
    id: 'ml-challenge',
    title: 'Machine Learning Challenge',
    context: 'School',
    contextLabel: {
      en: 'School Project',
      fr: 'Projet Scolaire'
    },
    teamSize: 1,
    duration: {
      en: '80 hours',
      fr: '80 heures'
    },
    shortDescription: {
      en: 'Analysis of two simulated datasets (classification & regression) and a real-world dataset from Kaggle/UCI.',
      fr: 'Analyse de deux jeux de données simulés (classification & régression) et d\'un jeu de données réel issu de Kaggle/UCI.'
    },
    fullDescription: {
      en: 'Analysis of two simulated datasets (classification and regression) and a real-world dataset. Goal: apply machine learning methods, evaluate model performance with error metrics and submit the best models to a leaderboard. The real-world dataset is sourced from platforms like Kaggle or UCI.',
      fr: 'Analyse de deux jeux de données simulés (classification et régression) et d\'un jeu de données réel. Objectif : développer des modèles de machine learning avec différents algorithmes, évaluer la performance du modèle avec des métriques d\'erreur et soumettre les meilleurs modèles à un classement. Le jeu de données réel est extrait de plateformes comme Kaggle ou UCI.'
    },
    tags: ['Machine Learning', 'Python', 'Scikit-Learn', 'Kaggle'],
    featured: true
  },
  {
    id: 'personal-website',
    title: 'Personal Website',
    context: 'Personal',
    contextLabel: {
      en: 'Personal Project',
      fr: 'Projet Personnel'
    },
    teamSize: 1,
    duration: {
      en: '30 hours',
      fr: '30 heures'
    },
    shortDescription: {
      en: 'Digital portfolio and interactive resume built with Nuxt 4 & modern web aesthetics.',
      fr: 'CV numérique et portfolio interactif conçu avec Nuxt 4 et un design moderne.'
    },
    fullDescription: {
      en: 'You\'re looking at it!',
      fr: 'Vous y êtes !'
    },
    tags: ['Nuxt', 'Vue 3', 'TypeScript', 'SCSS'],
    repoUrl: 'https://github.com/tanguyhardion/tanguyhardion.github.io',
    featured: true
  },
  {
    id: 'cnn-cifar100',
    title: 'CNN on CIFAR-100',
    context: 'School',
    contextLabel: {
      en: 'School Project',
      fr: 'Projet Scolaire'
    },
    teamSize: 1,
    duration: {
      en: '50 hours',
      fr: '50 heures'
    },
    shortDescription: {
      en: 'Training a Convolutional Neural Network from scratch on the CIFAR-100 image classification dataset.',
      fr: 'Entraînement d\'un réseau de neurones convolutif (CNN) à partir de zéro pour classifier les images de CIFAR-100.'
    },
    fullDescription: {
      en: 'Training of a convolutional neural network (CNN) from scratch to classify images of the CIFAR-100 dataset. Preprocessed and engineered the dataset by normalizing the images and converting them to TensorFlow datasets. Experimented with different architectures and hyperparameters to improve the model\'s accuracy. Finished by evaluating the model\'s performance using various metrics and visualizations. This project was part of a course on machine learning and deep learning using Python.',
      fr: 'Entraînement d\'un réseau de neurones convolutif (CNN) à partir de zéro pour classifier les images du jeu de données CIFAR-100. Prétraitement et ingénierie des données en normalisant les images et en les convertissant en ensembles de données TensorFlow. Expérimentation avec différentes architectures et hyperparamètres pour améliorer la précision du modèle. Évaluation finale des performances du modèle avec diverses métriques et visualisations. Ce projet fait partie d\'un cours sur le machine learning et deep learning en Python.'
    },
    tags: ['Deep Learning', 'CNN', 'TensorFlow', 'Python', 'Computer Vision']
  },
  {
    id: 'census-income',
    title: 'Census Income Analysis',
    context: 'School',
    contextLabel: {
      en: 'School Project',
      fr: 'Projet Scolaire'
    },
    teamSize: 1,
    duration: {
      en: '80 hours',
      fr: '80 heures'
    },
    shortDescription: {
      en: 'Exploratory data analysis of UCI Census Income dataset with R Shiny interactive web presentation.',
      fr: 'Analyse exploratoire de données sur le jeu UCI Census Income avec application R Shiny.'
    },
    fullDescription: {
      en: 'Conducted an analysis of the UCI Census Income dataset, including exploratory data analysis (EDA) to comprehend the data, created visualizations, and authored a report on the findings. Developed a Shiny app to present the results.',
      fr: 'Réalisation d\'une analyse du jeu de données UCI Census Income, incluant une analyse exploratoire des données (EDA) pour comprendre les données, création de visualisations et rédaction d\'un rapport sur les résultats. Développement d\'une application Shiny pour présenter les résultats.'
    },
    tags: ['R', 'Shiny', 'EDA', 'Data Analytics']
  }
];

export const skillCategoriesData: SkillCategory[] = [
  {
    id: 'data-databases',
    name: { en: 'Data & Databases', fr: 'Données & Bases de Données' },
    icon: 'ph:database-bold',
    skills: [
      { name: 'Oracle DB', icon: 'simple-icons:oracle' },
      { name: 'PostgreSQL', icon: 'simple-icons:postgresql' },
      { name: 'SQL Server', icon: 'ph:database-bold' },
      { name: 'T-SQL' },
      { name: 'SQL' },
      { name: 'Data Modeling' },
      { name: 'Medallion Architecture' },
      { name: 'Data Quality' },
      { name: 'Data Engineering' },
      { name: 'Regex' },
      { name: 'PDF Parsing' }
    ]
  },
  {
    id: 'ai-ml',
    name: { en: 'AI & Machine Learning', fr: 'IA & Machine Learning' },
    icon: 'ph:brain-bold',
    skills: [
      { name: 'NLP' },
      { name: 'Hugging Face', icon: 'simple-icons:huggingface' },
      { name: 'Llama 2', icon: 'simple-icons:meta' },
      { name: 'LLM Fine-Tuning' },
      { name: 'LangChain', icon: 'simple-icons:langchain' },
      { name: 'LangGraph', icon: 'simple-icons:langchain' },
      { name: 'AI Agents / Agentic Workflows', icon: 'ph:robot-bold' },
      { name: 'Prompt Engineering', icon: 'ph:sparkle-bold' },
      { name: 'LLMs' },
      { name: 'Dataset Engineering' },
      { name: 'Google Colab', icon: 'simple-icons:googlecolab' },
      { name: 'Machine Learning' },
      { name: 'Deep Learning' }
    ]
  },
  {
    id: 'dataviz-bi',
    name: { en: 'Data Visualization & BI', fr: 'Data Visualisation & BI' },
    icon: 'ph:chart-bar-bold',
    skills: [
      { name: 'Sigma.js' },
      { name: 'Graphology' },
      { name: 'ForceAtlas2' },
      { name: 'Dagre' },
      { name: 'Graph Theory', icon: 'ph:graph-bold' },
      { name: 'Data Visualization', icon: 'ph:chart-line-up-bold' },
      { name: 'Leaflet', icon: 'simple-icons:leaflet' },
      { name: 'Geo-visualization', icon: 'ph:map-trifold-bold' },
      { name: 'Power BI', icon: 'ph:chart-bar-bold' },
      { name: 'Excel (Advanced)', icon: 'simple-icons:microsoftexcel' }
    ]
  },
  {
    id: 'data-strategy-governance',
    name: { en: 'Data Strategy & Governance', fr: 'Stratégie & Gouvernance des Données' },
    icon: 'ph:shield-check-bold',
    skills: [
      { name: 'Data Governance' },
      { name: 'Data Strategy' },
      { name: 'Data Architecture' },
      { name: 'Data Warehousing (DWH)' },
      { name: 'Master Data Management (MDM)' },
      { name: 'Metadata Management' },
      { name: 'Data Integration & Interoperability' },
      { name: 'Data Lineage' },
      { name: 'Business Glossary' },
      { name: 'Data Dictionary' }
    ]
  },
  {
    id: 'consulting-delivery',
    name: { en: 'Consulting & Delivery', fr: 'Conseil & Delivery' },
    icon: 'ph:handshake-bold',
    skills: [
      { name: 'Stakeholder Workshops' },
      { name: 'Executive Interviews' },
      { name: 'Requirements Gathering' },
      { name: 'Roadmapping' },
      { name: 'Prioritization Frameworks' },
      { name: 'Feasibility & Impact Scoring Models' },
      { name: 'BI Transformation' },
      { name: 'Report Inventory' },
      { name: 'Consulting / Client Management' },
      { name: 'Current/Target State Mapping' },
      { name: 'Tool Benchmarking' }
    ]
  },
  {
    id: 'compliance-regulatory',
    name: { en: 'Compliance & Regulatory', fr: 'Conformité & Réglementaire' },
    icon: 'ph:scales-bold',
    skills: [
      { name: 'BCBS 239' },
      { name: 'Regulatory Compliance' },
      { name: 'FINREP' },
      { name: 'COREP' },
      { name: 'Risk Data Aggregation' }
    ]
  },
  {
    id: 'engineering-practices',
    name: { en: 'Engineering Practices', fr: 'Pratiques d\'Ingénierie' },
    icon: 'ph:wrench-bold',
    skills: [
      { name: 'Agile Methodology' },
      { name: 'Git', icon: 'simple-icons:git' },
      { name: 'Code Refactoring' },
      { name: 'Process Standardization' },
      { name: 'Process Automation' },
      { name: 'Scripting' },
      { name: 'Maven', icon: 'simple-icons:apachemaven' },
      { name: 'RPM' },
      { name: 'Yum' },
      { name: 'Linux Packaging', icon: 'simple-icons:linux' },
      { name: 'XML Schema Design' },
      { name: 'Full-Stack Development' }
    ]
  },
  {
    id: 'design',
    name: { en: 'Design', fr: 'Design' },
    icon: 'ph:palette-bold',
    skills: [
      { name: 'UI/UX Design' },
      { name: 'Mockups/Wireframing' },
      { name: 'Material Design', icon: 'simple-icons:materialdesign' },
      { name: 'Balsamiq' }
    ]
  },
  {
    id: 'domain-knowledge',
    name: { en: 'Domain Knowledge', fr: 'Connaissances Métier' },
    icon: 'ph:briefcase-bold',
    skills: [
      { name: 'Asset & Investment Management' },
      { name: 'Portfolio Risk & Performance Reporting' },
      { name: 'Healthcare Software' },
      { name: 'Critical Infrastructure Systems' },
      { name: 'Public Sector' },
      { name: 'Insurance & Wealth Management' },
      { name: 'Banking & Payments Regulatory' }
    ]
  }
];

export const languagesData: LanguageSkill[] = [
  {
    name: { en: 'French', fr: 'Français' },
    flagIcon: 'emojione-v1:flag-for-france',
    level: {
      en: 'Native Speaker',
      fr: 'Langue Maternelle'
    },
    description: {
      en: 'Native fluency in speaking, writing, and professional communication.',
      fr: 'Langue maternelle, parfaite maîtrise orale et écrite.'
    }
  },
  {
    name: { en: 'English', fr: 'Anglais' },
    flagIcon: 'emojione-v1:flag-for-united-kingdom',
    level: {
      en: 'Fluent (C1+, TOEFL 108/120)',
      fr: 'Courant (C1+, TOEFL 108/120)'
    },
    description: {
      en: 'Fluent proficiency in technical writing and professional environments.',
      fr: 'Anglais courant (niveau C1+, TOEFL 108/120).'
    }
  },
  {
    name: { en: 'Spanish', fr: 'Espagnol' },
    flagIcon: 'emojione-v1:flag-for-spain',
    level: {
      en: 'Intermediate (B1)',
      fr: 'Intermédiaire (B1)'
    },
    description: {
      en: 'Intermediate conversational and reading skills.',
      fr: 'Niveau intermédiaire (B1).'
    }
  }
];

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

export const personalInterestsData: PersonalInterest[] = [
  {
    title: {
      en: 'Watchmaking',
      fr: 'Horlogerie'
    },
    icon: 'ph:watch-bold',
    description: {
      en: 'Passionate about mechanical watch engineering, movements, and horological history.',
      fr: 'Passionné par l\'ingénierie horlogère mécanique, les mouvements et l\'histoire horlogère.'
    }
  },
  {
    title: {
      en: 'Sports',
      fr: 'Sport'
    },
    icon: 'ph:barbell-bold',
    description: {
      en: 'Enthusiastic about strength training, fitness, and physical performance.',
      fr: 'Pratique régulière de la musculation, du fitness et du développement des performances physiques.'
    }
  },
  {
    title: {
      en: 'Music',
      fr: 'Musique'
    },
    icon: 'ph:music-notes-bold',
    description: {
      en: 'Music lover with an interest in genres, composition, and audio culture.',
      fr: 'Passionné de musique, d\'écoute et de découverte de genres variés.'
    }
  }
];

