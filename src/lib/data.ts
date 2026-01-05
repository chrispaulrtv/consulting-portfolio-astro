import { Github, Linkedin, Mail } from "lucide-react";

export const personalInfo = {
  name: "Christian Reinoso",
  role: "Senior Consultant Developer",
  location: "Ecuador (Remote Worldwide)",
  email: "chrispaulrtv@rinnotec.com", // Correo actualizado
  github: "https://github.com/chrispaulrtv", // Tu GitHub limpio
  linkedin: "https://www.linkedin.com/in/christian-reinoso/", // Tu LinkedIn
  profilePicture: "/profile.jpeg", // Asegúrate que la foto esté en public/
  heroDescription:
    "Especialista en React Native & Nest.js. Ayudo a Agencias y Startups a escalar aplicaciones móviles, resolver deuda técnica compleja y desatascar sprints críticos. Sin onboarding largo, directo a solucionar.",
};

export const workExperience = [
  {
    company: "Thoughtworks",
    location: "Ecuador (Remote)",
    position: "Senior Consultant Developer",
    period: "Jul 2025 - Presente",
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
    degree: "Ingeniero en Sistemas Computacionales",
    period: "Oct 2017 - Ago 2023",
    achievements: [
      "Especialización en Ingeniería de Sistemas.",
    ],
  },
];

export const awards = []; // Se mantiene vacío para perfil Senior

export const skills = {
  programmingLanguages: [
    "TypeScript",
    "JavaScript",
    "Python",
    "SQL",
  ],
  frontendDevelopment: [
    "React Native (Expert)",
    "React.js",
    "Astro",
    "Next.js",
    "Tailwind CSS",
    "Redux Toolkit",
  ],
  backendDevelopment: [
    "Nest.js (Expert)", 
    "Node.js", 
    "Microservices",
    "Apache Kafka" 
  ],
  databaseAndStorage: [
    "PostgreSQL", 
    "MongoDB", 
    "Redis",
    "TypeORM"
  ],
  cloudAndDevOps: [
    "AWS", 
    "Azure", 
    "Docker", 
    "CI/CD Pipelines",
    "Vercel"
  ],
  toolsAndServices: [
    "Git",
    "Jira",
    "Figma",
    "Technical Recruiting",
  ],
};

export const projects = [
  {
    title: "🚑 Mobile App Rescue",
    // Enlace directo a tu correo con asunto predefinido
    github: "mailto:chrispaulrtv@rinnotec.com?subject=Auditoría%20App%20Mobile", 
    linkText: "Solicitar Auditoría",
    description: [
      "Auditoría profunda de Apps en React Native.",
      "Corrección de bugs críticos, crashes y optimización de rendimiento (60fps).",
      "Resolución de problemas de rechazo en App Store y Play Store.",
    ],
  },
  {
    title: "👨‍💻 Fractional Senior Dev",
    github: "mailto:chrispaulrtv@rinnotec.com?subject=Desarrollo%20Fraccional",
    linkText: "Consultar Disponibilidad",
    description: [
      "Consultoría por bolsa de horas (10h - 20h / mes) para Agencias.",
      "Soporte Senior para tu equipo: Code Reviews y Mentoría técnica.",
      "Definición de arquitectura Backend con Nest.js escalable.",
    ],
  },
  {
    title: "⚡ High-Performance Web",
    github: "mailto:chrispaulrtv@rinnotec.com?subject=Web%20Astro",
    linkText: "Cotizar Sitio Web",
    description: [
      "Desarrollo de sitios corporativos y Landing Pages usando Astro.",
      "Velocidad de carga instantánea (Score 100/100 en Lighthouse).",
      "SEO Técnico avanzado para posicionamiento orgánico.",
    ],
  },
];