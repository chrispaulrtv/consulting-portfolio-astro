/**
 * /api/chat — endpoint del agente del portafolio (Vercel Node function).
 *
 * Proveedor agnóstico (OpenAI-compatible). Env vars en Vercel:
 *   CHAT_BASE_URL — default: https://opencode.ai/zen/go/v1   (OpenCode Go)
 *   CHAT_API_KEY  — sin ella el endpoint responde en MODO DEMO
 *   CHAT_MODEL    — default: opencode-go/minimax-m3.1-flash
 *
 * Si el proveedor falla (o es whitelist-only), cae al modo demo en vez de romperse.
 */

const BASE = process.env.CHAT_BASE_URL || "https://opencode.ai/zen/go/v1";
const MODEL = process.env.CHAT_MODEL || "opencode-go/minimax-m3.1-flash";

const SYSTEM_PROMPT = `Eres el asistente virtual del portafolio de Christian Paul Reinoso Salazar, "Senior Consultant Developer" (nunca lo llames Tech Lead ni inventes otros títulos). Sitio: chrispaulrtv.rinnotec.com.

REGLAS ESTRICTAS:
- Usa EXCLUSIVAMENTE los datos de abajo. Si no están, di que no tienes esa información y sugiere escribir a chrispaulrtv@rinnotec.com.
- Responde SIEMPRE en el idioma del usuario (español o inglés), en máximo 3 oraciones, tono profesional y cercano. Sin markdown ni listas.
- Si preguntan por servicios empresariales, facturación o software a medida para empresas: deriva a RinnoTec (rinnotec.com) y al correo chrispaulrtv@rinnotec.com.
- Si hablas con un reclutador: destaca banca/fintech, liderazgo técnico, arquitectura full-stack y las empresas Thoughtworks, Deuna, NTT DATA y Hypernova Labs.

DATOS:
- Identidad: Christian Paul Reinoso Salazar, Ambato (Ecuador), remoto worldwide. Correo: chrispaulrtv@rinnotec.com. LinkedIn: linkedin.com/in/christian-reinoso. GitHub: github.com/chrispaulrtv.
- Rol actual: Senior Consultant Developer en Thoughtworks (jul 2025-presente), liderazgo técnico en plataforma de créditos para Mi Banco (Perú). Fundador de RinnoTec y creador de RinnFac (SaaS de facturación electrónica e inventario multi-tenant).
- Experiencia: Thoughtworks (Senior Consultant Developer), Deuna App (Software Engineer fintech), NTT DATA (Software Engineer / Tech Interviewer, subcontrato trabajando con Deuna), Hypernova Labs (Mobile & Frontend Developer, wallets).
- Proyectos propios: RinnFac (NestJS, PostgreSQL, React, Docker), PromptLens (escritorio para prompts con IA: Electron, Vite, Zustand), WealthOS (finanzas personales "Profit First": React, NestJS, Prisma, PostgreSQL).
- Formación: Ingeniero en Sistemas Computacionales e Informáticos, Universidad Técnica de Ambato (2023).
- Stack: TypeScript; React y React Native (experto); Next.js, Astro, Tailwind; Nest.js (experto), Node.js, Spring Boot, Kafka; PostgreSQL, Oracle, MongoDB, Redis, Prisma, TypeORM, Supabase; AWS, Azure, Docker, CI/CD.
- Servicios: auditoría y rescate de apps React Native; desarrollo senior fraccional (10-20 h/mes); sitios web de alto rendimiento con Astro.
- Música (mención sutil): produce música urbana como "Errante Chr".`;

/* ---------- modo demo (sin key o si el proveedor falla) ---------- */

const DEMO_RULES = [
  {
    kw: ["hola", "buenas", "hey", "qué tal", "que tal", "hello", "hi", "good"],
    reply:
      "¡Hola! Soy el asistente del portafolio de Christian. Pregúntame por su experiencia, proyectos o servicios — o escríbele directo a chrispaulrtv@rinnotec.com.",
  },
  {
    kw: ["quién", "quien eres", "quién eres", "sobre ti", "about you", "who"],
    reply:
      "Soy el asistente virtual del sitio. Christian Paul Reinoso es Senior Consultant Developer en Thoughtworks, especialista en banca y fintech con React Native y NestJS, y fundador de RinnoTec.",
  },
  {
    kw: ["experiencia", "trabajo", "empleo", "experience", "work", "thoughtworks", "empresa"],
    reply:
      "Christian es Senior Consultant Developer en Thoughtworks desde 2025, liderando una plataforma de créditos para la banca. Antes pasó por Deuna (fintech), NTT DATA y Hypernova Labs desarrollando wallets y microservicios.",
  },
  {
    kw: ["rinnfac", "rinnotec", "saas", "facturación", "facturacion", "invoicing"],
    reply:
      "RinnFac es el SaaS de facturación electrónica e inventario multi-tenant que Christian construyó de cero con NestJS y PostgreSQL bajo su empresa RinnoTec. Más info en rinnotec.com.",
  },
  {
    kw: ["proyecto", "promptlens", "wealthos", "billetera", "project"],
    reply:
      "Sus proyectos propios: RinnFac (facturación SaaS), PromptLens (laboratorio de prompts con IA en Electron) y WealthOS (finanzas personales con filosofía Profit First en React y NestJS).",
  },
  {
    kw: ["servicio", "auditoría", "auditoria", "contratar", "disponible", "service", "hire", "freelance"],
    reply:
      "Ofrece tres servicios: auditoría y rescate de apps React Native, desarrollo senior fraccional (10-20 h/mes) y sitios web de alto rendimiento con Astro. Escríbele a chrispaulrtv@rinnotec.com para cotizar.",
  },
  {
    kw: ["stack", "tecnología", "tecnologia", "technologies", "skills", "lenguaje"],
    reply:
      "Su stack diario: TypeScript, React/React Native y Nest.js como especialidades, con PostgreSQL, Prisma, Docker, AWS y CI/CD. También maneja Spring Boot y Kafka.",
  },
  {
    kw: ["contacto", "correo", "email", "linkedin", "hablar", "contact", "reach"],
    reply:
      "Puedes escribirle a chrispaulrtv@rinnotec.com o encontrarlo en linkedin.com/in/christian-reinoso — responde personalmente.",
  },
];

function demoReply(text = "") {
  const q = text.toLowerCase();
  for (const rule of DEMO_RULES) {
    if (rule.kw.some((k) => q.includes(k))) return rule.reply;
  }
  return "Estoy en modo demo (sin clave de IA configurada). Para una respuesta completa, escríbele a chrispaulrtv@rinnotec.com — Christian responde personalmente.";
}

/* ---------- rate limit best-effort (memoria por instancia) ---------- */

const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < 60_000);
  if (list.length >= 12) return true;
  list.push(now);
  hits.set(ip, list);
  return false;
}

/* ---------- handler ---------- */

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return res.status(429).json({ error: "Too many messages. Try again in a minute." });
  }

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: "Invalid JSON" });
  }

  const raw = Array.isArray(body?.messages) ? body.messages : [];
  const messages = raw
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-10)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));

  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return res.status(400).json({ error: "No user message" });
  }

  const apiKey = process.env.CHAT_API_KEY;
  if (!apiKey) {
    return res.status(200).json({ reply: demoReply(messages[messages.length - 1].content), demo: true });
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15_000);

    const r = await fetch(`${BASE}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        max_tokens: 300,
        temperature: 0.4,
      }),
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!r.ok) throw new Error(`provider ${r.status}`);
    const data = await r.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();
    if (!reply) throw new Error("empty reply");

    return res.status(200).json({ reply });
  } catch {
    // proveedor cao o no autorizado → demo en vez de error
    return res.status(200).json({
      reply: demoReply(messages[messages.length - 1].content),
      demo: true,
    });
  }
}
