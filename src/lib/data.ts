export const personalInfo = {
  name: "Christian Paul Reinoso",
  fullName: "Christian Paul Reinoso Salazar",
  role: "Senior Consultant Developer",
  location: "Ambato, Ecuador · Remoto worldwide",
  email: "chrispaulrtv@rinnotec.com",
  github: "https://github.com/chrispaulrtv",
  linkedin: "https://www.linkedin.com/in/christian-reinoso/",
  profilePicture: "/profile-512.jpg",
  heroDescription:
    "Diseño y escalo software para el sector bancario y fintech. Consultor Senior en Thoughtworks, fundador de RinnoTec. Especialista en React Native y NestJS: entro a donde hay deuda técnica compleja y la convierto en arquitectura que el equipo puede mantener.",
  music: {
    alias: "Errante Chr",
    url: "https://open.spotify.com/artist/5Me73cFOokmGThnvUxnzwo?si=0cbbZKTkSnKMVZMtVm-tag",
    instagram: "https://www.instagram.com/errantechr/",
    youtube: "https://www.youtube.com/@errantechr",
    tiktok: "https://www.tiktok.com/@errantechr",
  },
};

export const workExperience = [
  {
    company: "Thoughtworks",
    location: "Ecuador (Remote)",
    position: "Senior Consultant Developer",
    period: "Jul 2025 - Presente",
    highlight: "Banca",
    achievements: [
      "Liderazgo técnico en plataforma de créditos para Mi Banco (Perú), optimizando el ciclo de vida financiero.",
      "Definición de estándares de Clean Architecture y seguridad bancaria.",
      "Mentoring a desarrolladores junior/mid y code reviews de alto nivel.",
    ],
  },
  {
    company: "Deuna App",
    location: "Quito, Ecuador",
    position: "Software Engineer (Fintech)",
    period: "Abr 2024 - Jul 2025",
    highlight: "Pagos",
    achievements: [
      "Desarrollo de microservicios para 'Wallet As a Service' y botón de pagos.",
      "Implementación de soluciones Tap to Phone (NFC) y optimización de escalabilidad backend.",
      "Mejora significativa en tiempos de respuesta del sistema.",
    ],
  },
  {
    company: "NTT DATA Europe & Latam",
    location: "Quito, Ecuador",
    position: "Software Engineer / Tech Interviewer",
    period: "Abr 2024 - Jul 2025",
    highlight: "Selección técnica",
    achievements: [
      "Diseño y conducción de entrevistas técnicas para perfiles React/Native y Node.",
      "Evaluación de arquitectura de componentes y definición de criterios de selección técnica.",
    ],
  },
  {
    company: "Hypernova Labs",
    location: "Panamá (Remote)",
    position: "Mobile & Frontend Developer",
    period: "Ene 2023 - Mar 2024",
    highlight: "Wallets",
    achievements: [
      "Liderazgo en desarrollo de Wallet móvil con React Native.",
      "Optimización del 90% en rendimiento general aplicando metodología CDD.",
      "Reducción del 70% de bugs mediante refactorización estricta a TypeScript.",
    ],
  },
];

export const education = [
  {
    institution: "Universidad Técnica de Ambato",
    location: "Ambato, Ecuador",
    degree: "Ingeniero en Sistemas Computacionales e Informáticos",
    period: "Oct 2017 - Ago 2023",
    achievements: ["Especialización en Ingeniería de Sistemas."],
  },
];

export const awards = []; // Se mantiene vacío para perfil Senior

export const skills = {
  programmingLanguages: ["TypeScript", "JavaScript", "SQL"],
  frontendDevelopment: [
    "React Native (Expert)",
    "React.js",
    "Next.js",
    "Astro",
    "Tailwind CSS",
    "Redux Toolkit",
  ],
  backendDevelopment: [
    "Nest.js (Expert)",
    "Node.js",
    "Spring Boot",
    "Microservices",
    "Apache Kafka",
  ],
  databaseAndStorage: [
    "PostgreSQL",
    "Oracle",
    "MongoDB",
    "Redis",
    "TypeORM",
    "Prisma",
    "Supabase",
  ],
  cloudAndDevOps: ["AWS", "Azure", "Docker", "CI/CD Pipelines", "Vercel"],
  toolsAndServices: ["Git", "Jira", "Figma", "VS Code", "Neovim", "Technical Recruiting"],
};

export type FeaturedProject = {
  name: string;
  org: string;
  tagline: string;
  description: string[];
  stack: string[];
  href: string;
  linkText: string;
};

export const featuredProjects: FeaturedProject[] = [
  {
    name: "RinnFac",
    org: "RinnoTec",
    tagline: "SaaS de facturación electrónica e inventario multi-tenant",
    description: [
      "Plataforma multi-tenant para PYMES ecuatorianas: facturación electrónica válida ante el SRI, control de inventario y reportes.",
      "Arquitectura full-stack diseñada y construida desde cero, con aislamiento de datos por tenant y despliegue automatizado.",
      "Fundador y desarrollador principal: producto, arquitectura y soporte a clientes.",
    ],
    stack: ["NestJS", "PostgreSQL", "React", "Docker"],
    href: "https://rinnotec.com",
    linkText: "Conocer RinnoTec",
  },
  {
    name: "PromptLens",
    org: "Proyecto propio",
    tagline: "App de escritorio para ingeniería de prompts con IA",
    description: [
      "Laboratorio de prompts con previsualización, historial versionado y comparación de resultados entre modelos.",
      "Estado global predecible y UI reactiva construidas con Zustand sobre Vite.",
    ],
    stack: ["Electron", "Vite", "Zustand", "TypeScript"],
    href: "https://github.com/chrispaulrtv",
    linkText: "Ver en GitHub",
  },
  {
    name: "WealthOS",
    org: "Proyecto propio",
    tagline: "Director financiero automatizado, filosofía Profit First",
    description: [
      "Sistema integral de finanzas personales con algoritmo de 'Safe-to-Spend': separa automáticamente tu ahorro objetivo y gastos fijos para decirte cuánto efectivo real puedes gastar hoy sin desequilibrar tus finanzas.",
      "Control estricto de liquidez con partida doble: barrera clara entre capital operativo del día a día e inversiones intocables.",
      "Gestión de línea de tiempo financiera: pagos recurrentes, transferencias programadas y progreso visual de metas personales.",
    ],
    stack: ["React", "NestJS", "Prisma", "PostgreSQL"],
    href: "https://github.com/chrispaulrtv",
    linkText: "Ver en GitHub",
  },
];

export const services = [
  {
    title: "Mobile App Rescue",
    github: "mailto:chrispaulrtv@rinnotec.com?subject=Auditor%C3%ADa%20App%20Mobile",
    linkText: "Solicitar auditoría",
    description: [
      "Auditoría profunda de apps en React Native.",
      "Corrección de bugs críticos, crashes y optimización de rendimiento (60fps).",
      "Resolución de rechazos en App Store y Play Store.",
    ],
  },
  {
    title: "Fractional Senior Dev",
    github: "mailto:chrispaulrtv@rinnotec.com?subject=Desarrollo%20Fraccional",
    linkText: "Consultar disponibilidad",
    description: [
      "Consultoría por bolsa de horas (10h - 20h / mes) para agencias.",
      "Soporte senior para tu equipo: code reviews y mentoría técnica.",
      "Definición de arquitectura backend con Nest.js escalable.",
    ],
  },
  {
    title: "High-Performance Web",
    github: "mailto:chrispaulrtv@rinnotec.com?subject=Web%20Astro",
    linkText: "Cotizar sitio web",
    description: [
      "Sitios corporativos y landing pages usando Astro.",
      "Velocidad de carga instantánea (100/100 en Lighthouse).",
      "SEO técnico avanzado para posicionamiento orgánico.",
    ],
  },
];

// Alias backward-compatible (el template original llamaba "projects" a los servicios)
export const projects = services;
