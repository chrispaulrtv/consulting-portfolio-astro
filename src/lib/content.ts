/**
 * Single source of truth for ALL copy — Spanish (default, `/`) and English (`/en/`).
 * `en: typeof es` makes TypeScript fail the build if any key is missing.
 */

export type Locale = "es" | "en";

/* Locale-independent links & assets */
const links = {
  email: "chrispaulrtv@rinnotec.com",
  github: "https://github.com/chrispaulrtv",
  linkedin: "https://www.linkedin.com/in/christian-reinoso/",
  profilePicture: "/profile-512.jpg",
  rinnotec: "https://rinnotec.com",
  music: {
    alias: "Errante Chr",
    url: "https://open.spotify.com/artist/5Me73cFOokmGThnvUxnzwo?si=0cbbZKTkSnKMVZMtVm-tag",
    instagram: "https://www.instagram.com/errantechr/",
    youtube: "https://www.youtube.com/@errantechr",
    tiktok: "https://www.tiktok.com/@errantechr",
  },
};

/* Tech names are language-neutral */
const skillLists = {
  programmingLanguages: ["TypeScript", "JavaScript", "SQL"],
  frontendDevelopment: [
    "React Native (Expert)",
    "React.js",
    "Next.js",
    "Astro",
    "Tailwind CSS",
    "Redux Toolkit",
  ],
  backendDevelopment: ["Nest.js (Expert)", "Node.js", "Spring Boot", "Microservices", "Apache Kafka"],
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

export const es = {
  personalInfo: {
    name: "Christian Paul Reinoso",
    fullName: "Christian Paul Reinoso Salazar",
    role: "Senior Consultant Developer",
    location: "Ambato, Ecuador · Remoto worldwide",
    heroDescription:
      "Diseño y escalo software para el sector bancario y fintech. Consultor Senior en Thoughtworks, fundador de RinnoTec. Especialista en React Native y NestJS: entro a donde hay deuda técnica compleja y la convierto en arquitectura que el equipo puede mantener.",
    ...links,
  },
  workExperience: [
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
  ],
  education: [
    {
      institution: "Universidad Técnica de Ambato",
      location: "Ambato, Ecuador",
      degree: "Ingeniero en Sistemas Computacionales e Informáticos",
      period: "Oct 2017 - Ago 2023",
      achievements: ["Especialización en Ingeniería de Sistemas."],
    },
  ],
  skills: skillLists,
  featuredProjects: [
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
      href: links.rinnotec,
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
      href: links.github,
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
      href: links.github,
      linkText: "Ver en GitHub",
    },
  ],
  services: [
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
  ],
  ui: {
    meta: {
      title: "Christian Paul Reinoso — Senior Consultant Developer",
      description:
        "Senior Consultant Developer. Banca y fintech con React Native y NestJS. Fundador de RinnoTec y RinnFac.",
      keywords:
        "Christian Reinoso, Senior Consultant Developer, React Native, NestJS, Thoughtworks, RinnoTec, RinnFac, Ecuador",
    },
    nav: [
      { id: "experience", label: "Experiencia" },
      { id: "projects", label: "Proyectos" },
      { id: "skills", label: "Stack" },
      { id: "services", label: "Servicios" },
    ],
    contactBtn: "Contacto",
    langSwitch: "EN",
    explore: "Explorar",
    hero: {
      available: "Disponible para proyectos",
      ctaPrimary: "Hablemos de tu proyecto",
      hint: "Toca los puntos para explorar la estación",
    },
    agentLines: {
      experience: "Lo bancario empezó en Thoughtworks. Sigue explorando.",
      saas: "RinnFac: mi SaaS multi-tenant. La factura electrónica, resuelta.",
      projects: "Fuera del trabajo consultorio también construyo lo mío.",
      stack: "Esta es mi caja de herramientas diaria.",
      music: "Cuando no hay deploy, hay beats.",
      idle: "Hola — toca un punto de la estación, o escríbeme por el chat de la esquina.",
    },
    hotspotLabels: {
      experience: "Experiencia",
      saas: "RinnoTec · RinnFac",
      projects: "Proyectos",
      stack: "Stack",
      music: "Errante Chr",
    },
    panelTitles: {
      experience: "Experiencia",
      saas: "RinnoTec · RinnFac",
      projects: "Proyectos propios",
      stack: "Stack técnico",
      music: "Errante Chr",
    },
    panelClose: "Cerrar panel",
    sections: {
      projects: {
        title: "Proyectos propios",
        sub: "Producto, arquitectura y negocio: lo que construyo cuando no hay cliente de por medio.",
      },
      experience: {
        title: "Trayectoria",
        sub: "De wallets en Panamá a plataformas bancarias con Thoughtworks.",
        achievements: "Logros clave",
      },
      skills: {
        title: "Stack técnico",
        sub: "Las herramientas que uso a diario para llevar ideas de la pizarra a producción.",
        groups: {
          languages: "Lenguajes",
          frontend: "Frontend & Mobile",
          backend: "Backend",
          data: "Datos",
          cloud: "Cloud & DevOps",
          tools: "Tools",
        },
      },
      services: {
        title: "Soluciones & servicios",
        sub: "Formas concretas de trabajar juntos, sin onboarding largo ni sorpresas.",
      },
      contact: {
        title: "¿Hablamos?",
        copy: "Cuéntame qué necesitas: auditar tu app móvil, reforzar tu equipo senior o diseñar la arquitectura de tu próximo producto. Respondo personalmente.",
        photoAlt: "Foto de Christian Paul Reinoso",
      },
    },
    musicIntro:
      "Fuera del editor también produzco música urbana. Bajo el alias <b>Errante Chr</b>.",
    footer: {
      rights: "Todos los derechos reservados.",
      alsoSound: "También sueno como",
      builtWith: "Hecho con Astro, React y Three.js",
    },
    chat: {
      seed: "¡Hola! Soy el asistente de Christian. Pregúntame por su experiencia, proyectos o servicios.",
      placeholder: "Pregúntame sobre Christian…",
      offline:
        "No pude conectar con el asistente ahora mismo — escríbele directo a chrispaulrtv@rinnotec.com, responde personalmente.",
      openAria: "Abrir chat con el asistente",
      closeAria: "Cerrar chat con el asistente",
      panelAria: "Chat con el asistente",
      sendAria: "Enviar mensaje",
      inputAria: "Mensaje",
      close: "Cerrar chat",
      title: "asistente",
      demo: "demo",
    },
  },
};

export const en: typeof es = {
  personalInfo: {
    name: "Christian Paul Reinoso",
    fullName: "Christian Paul Reinoso Salazar",
    role: "Senior Consultant Developer",
    location: "Ambato, Ecuador · Remote worldwide",
    heroDescription:
      "I design and scale software for banking and fintech. Senior Consultant Developer at Thoughtworks, founder of RinnoTec. React Native and NestJS specialist: I step into complex technical debt and turn it into architecture your team can maintain.",
    ...links,
  },
  workExperience: [
    {
      company: "Thoughtworks",
      location: "Ecuador (Remote)",
      position: "Senior Consultant Developer",
      period: "Jul 2025 - Present",
      highlight: "Banking",
      achievements: [
        "Technical leadership on a credit platform for Mi Banco (Perú), optimizing the financial lifecycle.",
        "Defining Clean Architecture and banking security standards.",
        "Mentoring junior/mid developers and high-bar code reviews.",
      ],
    },
    {
      company: "Deuna App",
      location: "Quito, Ecuador",
      position: "Software Engineer (Fintech)",
      period: "Apr 2024 - Jul 2025",
      highlight: "Payments",
      achievements: [
        "Microservices development for 'Wallet As a Service' and the payment button.",
        "Tap to Phone (NFC) solutions and backend scalability optimization.",
        "Significant improvement in system response times.",
      ],
    },
    {
      company: "NTT DATA Europe & Latam",
      location: "Quito, Ecuador",
      position: "Software Engineer / Tech Interviewer",
      period: "Apr 2024 - Jul 2025",
      highlight: "Tech hiring",
      achievements: [
        "Designing and running technical interviews for React/Native and Node profiles.",
        "Component architecture evaluation and technical selection criteria.",
      ],
    },
    {
      company: "Hypernova Labs",
      location: "Panama (Remote)",
      position: "Mobile & Frontend Developer",
      period: "Jan 2023 - Mar 2024",
      highlight: "Wallets",
      achievements: [
        "Led the development of a mobile Wallet with React Native.",
        "90% general performance optimization applying CDD methodology.",
        "70% bug reduction through strict TypeScript refactoring.",
      ],
    },
  ],
  education: [
    {
      institution: "Universidad Técnica de Ambato",
      location: "Ambato, Ecuador",
      degree: "Computer Systems & Informatics Engineer",
      period: "Oct 2017 - Aug 2023",
      achievements: ["Specialization in Systems Engineering."],
    },
  ],
  skills: skillLists,
  featuredProjects: [
    {
      name: "RinnFac",
      org: "RinnoTec",
      tagline: "Multi-tenant electronic invoicing & inventory SaaS",
      description: [
        "Multi-tenant platform for Ecuadorian SMEs: SRI-compliant electronic invoicing, inventory control and reporting.",
        "Full-stack architecture designed and built from scratch, with per-tenant data isolation and automated deployment.",
        "Founder and lead developer: product, architecture and customer support.",
      ],
      stack: ["NestJS", "PostgreSQL", "React", "Docker"],
      href: links.rinnotec,
      linkText: "Visit RinnoTec",
    },
    {
      name: "PromptLens",
      org: "Side project",
      tagline: "Desktop app for AI prompt engineering",
      description: [
        "Prompt lab with preview, versioned history and result comparison across models.",
        "Predictable global state and reactive UI built with Zustand on Vite.",
      ],
      stack: ["Electron", "Vite", "Zustand", "TypeScript"],
      href: links.github,
      linkText: "View on GitHub",
    },
    {
      name: "WealthOS",
      org: "Side project",
      tagline: "Automated personal finance, Profit First philosophy",
      description: [
        "Personal finance system with a Safe-to-Spend algorithm: it automatically separates your savings goal and fixed expenses to tell you exactly what you can spend today without unbalancing your finances.",
        "Strict liquidity control with double-entry bookkeeping: a clear barrier between daily operating capital and untouchable investments.",
        "Financial timeline management: recurring payments, scheduled transfers and visual progress on personal goals.",
      ],
      stack: ["React", "NestJS", "Prisma", "PostgreSQL"],
      href: links.github,
      linkText: "View on GitHub",
    },
  ],
  services: [
    {
      title: "Mobile App Rescue",
      github: "mailto:chrispaulrtv@rinnotec.com?subject=Auditor%C3%ADa%20App%20Mobile",
      linkText: "Request an audit",
      description: [
        "Deep audit of React Native apps.",
        "Critical bug and crash fixes, performance optimization (60fps).",
        "App Store and Play Store rejection resolution.",
      ],
    },
    {
      title: "Fractional Senior Dev",
      github: "mailto:chrispaulrtv@rinnotec.com?subject=Desarrollo%20Fraccional",
      linkText: "Check availability",
      description: [
        "Consulting via hourly blocks (10h - 20h / month) for agencies.",
        "Senior support for your team: code reviews and technical mentoring.",
        "Scalable Nest.js backend architecture definition.",
      ],
    },
    {
      title: "High-Performance Web",
      github: "mailto:chrispaulrtv@rinnotec.com?subject=Web%20Astro",
      linkText: "Get a quote",
      description: [
        "Corporate sites and landing pages built with Astro.",
        "Instant load times (100/100 on Lighthouse).",
        "Advanced technical SEO for organic ranking.",
      ],
    },
  ],
  ui: {
    meta: {
      title: "Christian Paul Reinoso — Senior Consultant Developer",
      description:
        "Senior Consultant Developer. Banking & fintech with React Native and NestJS. Founder of RinnoTec and RinnFac.",
      keywords:
        "Christian Reinoso, Senior Consultant Developer, React Native, NestJS, Thoughtworks, RinnoTec, RinnFac, Ecuador",
    },
    nav: [
      { id: "experience", label: "Experience" },
      { id: "projects", label: "Projects" },
      { id: "skills", label: "Stack" },
      { id: "services", label: "Services" },
    ],
    contactBtn: "Contact",
    langSwitch: "ES",
    explore: "Explore",
    hero: {
      available: "Available for projects",
      ctaPrimary: "Let's talk about your project",
      hint: "Tap the dots to explore the station",
    },
    agentLines: {
      experience: "Banking first happened at Thoughtworks. Keep exploring.",
      saas: "RinnFac: my multi-tenant SaaS. Electronic invoicing, handled.",
      projects: "Outside consulting work, I build my own products.",
      stack: "This is my daily toolbox.",
      music: "When there's no deploy, there are beats.",
      idle: "Hi — tap a point on the station, or message me in the chat at the corner.",
    },
    hotspotLabels: {
      experience: "Experience",
      saas: "RinnoTec · RinnFac",
      projects: "Projects",
      stack: "Stack",
      music: "Errante Chr",
    },
    panelTitles: {
      experience: "Experience",
      saas: "RinnoTec · RinnFac",
      projects: "Own projects",
      stack: "Tech stack",
      music: "Errante Chr",
    },
    panelClose: "Close panel",
    sections: {
      projects: {
        title: "My own projects",
        sub: "Product, architecture and business: what I build when there's no client involved.",
      },
      experience: {
        title: "Track record",
        sub: "From wallets in Panama to banking platforms at Thoughtworks.",
        achievements: "Key achievements",
      },
      skills: {
        title: "Tech stack",
        sub: "The tools I use daily to take ideas from whiteboard to production.",
        groups: {
          languages: "Languages",
          frontend: "Frontend & Mobile",
          backend: "Backend",
          data: "Data",
          cloud: "Cloud & DevOps",
          tools: "Tools",
        },
      },
      services: {
        title: "Solutions & services",
        sub: "Concrete ways to work together, no long onboarding, no surprises.",
      },
      contact: {
        title: "Let's talk?",
        copy: "Tell me what you need: audit your mobile app, reinforce your senior team, or design your next product's architecture. I reply personally.",
        photoAlt: "Photo of Christian Paul Reinoso",
      },
    },
    musicIntro:
      "Outside the editor I also produce urban music as <b>Errante Chr</b>.",
    footer: {
      rights: "All rights reserved.",
      alsoSound: "I also sound like",
      builtWith: "Built with Astro, React and Three.js",
    },
    chat: {
      seed: "Hi! I'm Christian's assistant. Ask me about his experience, projects or services.",
      placeholder: "Ask me about Christian…",
      offline:
        "I couldn't reach the assistant right now — email chrispaulrtv@rinnotec.com, he replies personally.",
      openAria: "Open chat with the assistant",
      closeAria: "Close chat with the assistant",
      panelAria: "Chat with the assistant",
      sendAria: "Send message",
      inputAria: "Message",
      close: "Close chat",
      title: "assistant",
      demo: "demo",
    },
  },
};

export type Content = typeof es;

export const content: Record<Locale, Content> = { es, en };
