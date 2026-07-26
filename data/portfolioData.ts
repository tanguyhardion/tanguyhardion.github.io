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

  const years = experienceData
    .filter(isFullTime)
    .map(exp => parseInt(exp.period.split('-')[0].trim(), 10))
    .filter(y => !isNaN(y));
  
  if (years.length === 0) return '1+';
  const startYear = Math.min(...years);
  const currentYear = new Date().getFullYear();
  const diff = currentYear - startYear;
  return `${diff}+`;
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
      languagesTitle: 'Spoken Languages',
      languagesSubtitle: 'CEFR proficiency levels & linguistic capabilities.',
      interestsTitle: 'Passions & Interests',
      interestsSubtitle: 'What drives my curiosity outside of the professional field.'
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
      greeting: 'Bonjour, je suis Tanguy',
      role: 'Consultant Junior en IA & Data chez Deloitte',
      summary: "Consultant Junior en IA & Data chez Deloitte Luxembourg. Spécialisé en IA agentique, automatisation intelligente, stratégie de données, architecture de données, data engineering, gouvernance et gestion des données d'entreprise.",
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
      languagesTitle: 'Langues Parlées',
      languagesSubtitle: 'Niveaux CECRL et capacités linguistiques.',
      interestsTitle: 'Passions & Centred d\'Intérêt',
      interestsSubtitle: 'Ce qui me passionne en dehors du domaine professionnel.'
    },
    footer: {
      rights: 'Tous droits réservés.',
      builtWith: 'Conçu avec Nuxt, SCSS & Vue. Hébergé sur GitHub Pages.'
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
    period: '2023 - 2024',
    gpa: '3.67 / 4.0',
    fieldOfStudy: {
      en: 'Specialization in Artificial Intelligence and Data Science',
      fr: 'Spécialisation en Intelligence Artificielle et Data Science'
    },
    courses: {
      en: ['Advanced Machine Learning', 'Deep Learning', 'Advanced Statistics', 'Multi-Agent Systems'],
      fr: ['Machine Learning Avancé', 'Deep Learning', 'Statistiques Avancées', 'Systèmes Multi-Agents']
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
    period: '2021 - 2024',
    gpa: '4.70 / 5.0',
    fieldOfStudy: {
      en: 'Computer Science and Information Systems, Data Science track',
      fr: "Informatique et systèmes d'information, spécialisation Data Science"
    },
    courses: {
      en: ['Machine Learning', 'Introductory Deep Learning', 'Computer Vision', 'Big Data', 'Data Visualization', 'Data Analytics', 'Software Engineering'],
      fr: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'Big Data', 'Visualisation de Données', 'Analyse de Données', 'Génie Logiciel']
    },
    linkedProjects: ['cpage-map', 'cnn-cifar100', 'llama2-finetuning', 'visualizer', 'census-income']
  },
  {
    id: 'iut-dijon',
    degree: {
      en: "Associate's Degree (DUT)",
      fr: 'DUT'
    },
    institution: {
      en: 'IUT Dijon',
      fr: 'IUT Dijon'
    },
    location: {
      en: 'Dijon, France',
      fr: 'Dijon, France'
    },
    period: '2019 - 2021',
    gpa: 'Top 10 / 100',
    fieldOfStudy: {
      en: 'Computer Science',
      fr: 'Informatique'
    },
    courses: {
      en: ['Algorithms', 'Probability & Statistics', 'Programming', 'Web Development', 'Databases', 'Computer Networks', 'Operating Systems'],
      fr: ['Algorithmes', 'Probabilités et Statistiques', 'Programmation', 'Développement Web', 'Bases de données', 'Réseaux Informatiques', "Systèmes d'Exploitation"]
    }
  }
];

export const experienceData: ExperienceItem[] = [
  {
    id: 'deloitte-junior-consultant',
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
      en: 'Permanent (CDI)',
      fr: 'CDI'
    },
    period: '2024 - Present',
    description: {
      en: 'Junior Consultant in AI & Data at Deloitte Luxembourg. Working on data engineering projects, data management, data analysis, data governance, Generative AI and Agentic AI solutions.',
      fr: "Consultant Junior IA & Data chez Deloitte Luxembourg. Travaille sur des projets d'ingénierie des données, d'analyse des données, de gouvernance des données, d'IA générative et de solutions d'IA agentique."
    },
    achievements: {
      en: [
        'Delivering Data Engineering & Governance pipelines for enterprise data platforms.',
        'Architecting Generative AI & Agentic AI frameworks for enterprise clients.'
      ],
      fr: [
        'Livraison de pipelines Data Engineering & Gouvernance pour plateformes de données.',
        'Architecture de solutions d\'IA Générative & IA Agentique pour grands comptes.'
      ]
    },
    technologies: ['Agentic AI', 'Generative AI', 'Python', 'Data Engineering', 'Data Governance', 'SQL']
  },
  {
    id: 'deloitte-intern',
    role: {
      en: 'Analyst in AI & Data (Intern)',
      fr: 'Analyste en IA & Data (Stagiaire)'
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
    period: '2024',
    description: {
      en: 'End of studies internship at Deloitte. Enabling database interaction in natural language by leveraging Agentic AI.',
      fr: "Stage de fin d'études chez Deloitte. Projet : permettre d'interagir avec une base de données en langage naturel grâce à l'IA agentique."
    },
    achievements: {
      en: [
        'Designed natural language to database (Text-to-SQL) interfaces using LLM agentic orchestrations.'
      ],
      fr: [
        'Conception d\'interfaces langage naturel vers base de données (Text-to-SQL) via orchestration d\'agents LLM.'
      ]
    },
    technologies: ['Agentic AI', 'LLM', 'Text-to-SQL', 'Python', 'LangChain/LangGraph']
  },
  {
    id: 'cpage-junior-engineer',
    role: {
      en: 'Junior Software Engineer',
      fr: 'Ingénieur Logiciel Junior'
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
    period: '2023',
    description: {
      en: 'Summer job that followed my previous internship at CPage.',
      fr: "Job d'été qui a suivi mon précédent stage chez CPage."
    },
    achievements: {
      en: [
        'Expanded customer tracking features and visual data analysis tooling.'
      ],
      fr: [
        'Développement de fonctionnalités de suivi client et d\'outils d\'analyse visuelle.'
      ]
    },
    technologies: ['JavaScript', 'Vue.js', 'Python', 'NLP'],
    linkedProjects: ['cpage-map', 'visualizer']
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
    period: '2023',
    description: {
      en: 'Mid-engineering degree internship at CPage, a company that develops software for public health institutions.',
      fr: "Stage de milieu de cursus ingénieur chez CPage, une société développant des logiciels pour les établissements de santé publics."
    },
    achievements: {
      en: [
        'Developed CPage Map interactive dashboard with NLP HuggingFace integration.',
        'Created proof of concept for Llama 2 7B fine-tuning for PDF text extraction.'
      ],
      fr: [
        'Développement du tableau de bord CPage Map avec intégration NLP HuggingFace.',
        'Réalisation d\'un PoC de fine-tuning Llama 2 7B pour l\'extraction de texte sur fichiers PDF.'
      ]
    },
    technologies: ['Vue.js', 'Python', 'Llama 2', 'HuggingFace', 'ETL'],
    linkedProjects: ['cpage-map', 'llama2-finetuning', 'visualizer']
  },
  {
    id: 'aprr-intern',
    role: {
      en: 'Software Developer Intern',
      fr: 'Stagiaire Développeur Logiciel'
    },
    company: {
      en: 'APRR',
      fr: 'APRR'
    },
    location: {
      en: 'Saint-Apollinaire, France',
      fr: 'Saint-Apollinaire, France'
    },
    contractType: {
      en: 'Internship',
      fr: 'Stage'
    },
    period: '2022',
    description: {
      en: 'End of associate degree internship in the department that manages the installation and support of the systems used by the company.',
      fr: "Stage de fin de DUT dans le département qui gère l'installation et le support des systèmes utilisés par l'entreprise."
    },
    achievements: {
      en: [
        'Maintained internal IT tooling and system administration scripts.'
      ],
      fr: [
        'Maintenance de l\'outillage informatique interne et des scripts de gestion de systèmes.'
      ]
    },
    technologies: ['Shell', 'Python', 'System Administration']
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
      en: 'Digital portfolio and interactive resume built with Nuxt 3 & modern web aesthetics.',
      fr: 'CV numérique et portfolio interactif conçu avec Nuxt 3 et un design moderne.'
    },
    fullDescription: {
      en: 'You\'re looking at it! I like to think of it as a digital resume, more personal and interactive than a traditional one or a LinkedIn profile (although you can find me there too). It\'s also more fun to make!',
      fr: 'Vous y êtes ! J\'aime le considérer comme un CV numérique, plus personal et interactif qu\'un CV traditionnel ou un profil LinkedIn (même si vous pouvez aussi m\'y trouver). C\'est aussi plus cool à faire.'
    },
    tags: ['Nuxt', 'Vue 3', 'TypeScript', 'SCSS'],
    repoUrl: 'https://github.com/tanguyhardion/tanguyhardion.github.io',
    featured: true
  },
  {
    id: 'cpage-map',
    title: 'CPage Map',
    context: 'Work',
    contextLabel: {
      en: 'Work Project',
      fr: 'Projet Pro'
    },
    teamSize: 1,
    duration: {
      en: '200 hours',
      fr: '200 heures'
    },
    shortDescription: {
      en: 'Interactive map application tracking customer satisfaction for public health institutions using ETL & HuggingFace NLP.',
      fr: 'Application web cartographique de suivi de satisfaction des établissements de santé avec ETL et NLP HuggingFace.'
    },
    fullDescription: {
      en: 'A web application displaying an interactive map of CPage\'s customers: public health institutions in France. It shows relevant data loaded with ETL processes and lets CPage collaborators log satisfaction levels after interactions (calls, emails, visits). Institutions are marked with a weather code indicating their satisfaction, offering a quick visual of which need more attention. It also provides data analysis tools, such as graphs and word clouds of the satisfaction logs using an NLP model from HuggingFace.',
      fr: 'Une application web affichant une carte interactive des clients de CPage : établissements de santé publique en France. Elle montre des données pertinentes chargées avec des processus ETL et permet aux collaborateurs de CPage de consigner les niveaux de satisfaction après des interactions (appels, emails, visites). Les établissements sont marqués avec un code météo indiquant leur satisfaction, offrant une vue rapide de ceux qui nécessitent plus d\'attention. Elle fournit également des outils d\'analyse de données, comme des graphiques et des nuages de mots des journaux de satisfaction en utilisant un modèle NLP de HuggingFace.'
    },
    tags: ['Vue.js', 'ETL', 'HuggingFace', 'NLP', 'Data Analytics'],
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
    id: 'llama2-finetuning',
    title: 'Llama 2 Fine-Tuning',
    context: 'Work',
    contextLabel: {
      en: 'Work Project',
      fr: 'Projet Pro'
    },
    teamSize: 1,
    duration: {
      en: '70 hours',
      fr: '70 heures'
    },
    shortDescription: {
      en: 'Fine-tuning Llama 2 (7B) to extract structured text from PDF documents for enterprise software solutions.',
      fr: 'Fine-tuning de Llama 2 7B pour extraire du texte structuré depuis des PDF pour des solutions logicielles.'
    },
    fullDescription: {
      en: 'Fine-tuning of the 7B-parameter large language model (LLM) Llama 2. Prepared a dataset to train the model on extracting specific text from PDF files. Tuned the hyperparameters to make the model as accurate as possible. Experimented with different architectures and hyperparameters to improve the model\'s accuracy. Tested the model on various PDF files and evaluated its performance. This project, part of my internship at CPage, was a proof of concept to demonstrate the purpose of modern AI models in the company\'s software solutions.',
      fr: 'Fine-tuning du modèle de langage (LLM) Llama 2 de 7 Md de paramètres. Préparation d\'un ensemble de données pour entraîner le modèle à extraire du texte spécifique à partir de fichiers PDF. Ajustement des hyperparamètres pour améliorer l\'exactitude du modèle. Tests sur divers fichiers PDF et évaluation des performances. Ce projet, réalisé dans le cadre de mon stage chez CPage, est une preuve de concept pour démontrer l\'utilité des modèles d\'IA modernes dans les solutions logicielles de l\'entreprise.'
    },
    tags: ['LLM', 'Llama 2', 'Fine-Tuning', 'Python', 'NLP']
  },
  {
    id: 'visualizer',
    title: 'Visualizer',
    context: 'Work',
    contextLabel: {
      en: 'Work Project',
      fr: 'Projet Pro'
    },
    teamSize: 1,
    duration: {
      en: '150 hours',
      fr: '150 heures'
    },
    shortDescription: {
      en: 'Dependency graph application mapping software solutions and version relationships for tracking compatibility.',
      fr: 'Graphe de dépendances web cartographiant les solutions logicielles et le suivi de compatibilité des versions.'
    },
    fullDescription: {
      en: 'A web application featuring a dependencies graph to map software solutions and their respective versions, for better compatibility tracking. Each node represents a software version, and each edge a dependency between two versions. Also includes features to add/remove nodes, view logs, and check stats.',
      fr: 'Une application web avec un graphe de dépendances pour cartographier les solutions logicielles et leurs dépéndances entre elles, afin d\'améliorer le suivi des versions. Chaque nœud représente une version logicielle et chaque arête, une dépendance entre deux versions. Comprend également des fonctionnalités pour ajouter/supprimer des nœuds, afficher les journaux et vérifier les statistiques.'
    },
    tags: ['Web Application', 'Graph Visualization', 'JavaScript']
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
    id: 'gen-agentic-ai',
    name: {
      en: 'Generative & Agentic AI',
      fr: 'IA Générative & Agentique'
    },
    icon: 'ph:brain-bold',
    skills: [
      { name: 'Agentic AI Workflows & Orchestration', level: 92, highlight: true },
      { name: 'LLM Fine-tuning & Prompt Engineering', level: 90, highlight: true },
      { name: 'Text-to-SQL & RAG Systems', level: 88 }
    ]
  },
  {
    id: 'data-science-ml',
    name: {
      en: 'Data Science & Machine Learning',
      fr: 'Data Science & Machine Learning'
    },
    icon: 'ph:chart-line-up-bold',
    skills: [
      { name: 'Python (PyTorch / TensorFlow)', level: 90, highlight: true },
      { name: 'Computer Vision & CNNs', level: 85 },
      { name: 'Scikit-Learn, Statistics & EDA', level: 88 }
    ]
  },
  {
    id: 'data-engineering',
    name: {
      en: 'Data Engineering & Analytics',
      fr: 'Data Engineering & Analytics'
    },
    icon: 'ph:database-bold',
    skills: [
      { name: 'ETL Pipelines & Data Management', level: 88, highlight: true },
      { name: 'Databases & SQL Architecture', level: 90, highlight: true },
      { name: 'Data Governance & BI Analytics', level: 85 }
    ]
  },
  {
    id: 'web-development',
    name: {
      en: 'Web Development',
      fr: 'Développement Web'
    },
    icon: 'ph:code-bold',
    skills: [
      { name: 'Vue.js / Nuxt', level: 92, highlight: true },
      { name: 'Front-end & SCSS Styling', level: 90 },
      { name: 'Back-end APIs & Software Eng.', level: 88 }
    ]
  }
];

export const languagesData: LanguageSkill[] = [
  {
    name: { en: 'French', fr: 'Français' },
    flagIcon: 'emojione-v1:flag-for-france',
    level: 'Native / Langue maternelle',
    description: {
      en: 'Native fluency in speaking, writing, and professional communication.',
      fr: 'Langue maternelle, parfaite maîtrise orale et écrite.'
    }
  },
  {
    name: { en: 'English', fr: 'Anglais' },
    flagIcon: 'emojione-v1:flag-for-united-kingdom',
    level: 'Fluent (C1+, TOEFL 108/120)',
    description: {
      en: 'Fluent proficiency in technical writing and professional environments.',
      fr: 'Anglais courant (niveau C1+, TOEFL 108/120).'
    }
  },
  {
    name: { en: 'Spanish', fr: 'Espagnol' },
    flagIcon: 'emojione-v1:flag-for-spain',
    level: 'Intermediate (B1)',
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
    fileName: 'Tanguy_Hardion_CV_FR.pdf',
    filePathInRepo: 'public/resumes/Tanguy_Hardion_CV_FR.pdf',
    downloadUrl: '/resumes/Tanguy_Hardion_CV_FR.pdf',
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
    fileName: 'Tanguy_Hardion_Resume_US.pdf',
    filePathInRepo: 'public/resumes/Tanguy_Hardion_Resume_US.pdf',
    downloadUrl: '/resumes/Tanguy_Hardion_Resume_US.pdf',
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

