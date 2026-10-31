import { motion } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import type { StationHotspotId } from "./three/StationScene";
import { workExperience, featuredProjects, skills, personalInfo } from "@/lib/data";

const panelMotion = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, duration: 0.45, bounce: 0.15 },
  },
  exit: { opacity: 0, y: 16, transition: { duration: 0.16, ease: "easeIn" as const } },
};

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border/70 bg-muted/60 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
      {children}
    </span>
  );
}

function ExperiencePanel() {
  return (
    <ul className="space-y-3">
      {workExperience.map((job) => (
        <li key={job.company} className="flex items-baseline justify-between gap-3">
          <div>
            <p className="font-display text-sm font-semibold">
              {job.company}
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                {job.position}
              </span>
            </p>
            <p className="text-xs text-muted-foreground">{job.achievements[0]}</p>
          </div>
          <span className="shrink-0 font-mono text-[11px] text-accent">{job.period}</span>
        </li>
      ))}
    </ul>
  );
}

function SaasPanel() {
  const project = featuredProjects[0];
  return (
    <div className="space-y-3">
      <p className="font-display text-sm font-semibold">
        {project.name}
        <span className="ml-2 text-xs font-normal text-muted-foreground">{project.org}</span>
      </p>
      <p className="text-xs leading-relaxed text-muted-foreground">{project.description[0]}</p>
      <div className="flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <Chip key={s}>{s}</Chip>
        ))}
      </div>
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
      >
        {project.linkText} <ArrowUpRight size={13} />
      </a>
    </div>
  );
}

function ProjectsPanel() {
  return (
    <div className="space-y-4">
      {featuredProjects.slice(1).map((project) => (
        <div key={project.name} className="space-y-1.5">
          <p className="font-display text-sm font-semibold">{project.name}</p>
          <p className="text-xs leading-relaxed text-muted-foreground">{project.tagline}</p>
          <div className="flex flex-wrap items-center gap-1.5">
            {project.stack.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
            >
              {project.linkText} <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

function StackPanel() {
  const groups: Array<[string, string[]]> = [
    ["Lenguajes", skills.programmingLanguages],
    ["Frontend", skills.frontendDevelopment],
    ["Backend", skills.backendDevelopment],
    ["Datos", skills.databaseAndStorage],
    ["Cloud & DevOps", skills.cloudAndDevOps],
    ["Tools", skills.toolsAndServices],
  ];
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
      {groups.map(([title, items]) => (
        <div key={title}>
          <p className="mb-1 font-display text-[11px] font-semibold uppercase tracking-wide text-accent">
            {title}
          </p>
          <p className="text-xs leading-relaxed text-muted-foreground">{items.join(" · ")}</p>
        </div>
      ))}
    </div>
  );
}

function MusicPanel() {
  const links = [
    { label: "Spotify", href: personalInfo.music.url },
    { label: "Instagram", href: personalInfo.music.instagram },
    { label: "YouTube", href: personalInfo.music.youtube },
    { label: "TikTok", href: personalInfo.music.tiktok },
  ];
  return (
    <div>
      <p className="text-xs leading-relaxed text-muted-foreground">
        Fuera del editor también produzco música urbana. Bajo el alias{" "}
        <span className="font-semibold text-foreground">{personalInfo.music.alias}</span>.
      </p>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-warm hover:underline"
          >
            {link.label} <ArrowUpRight size={13} />
          </a>
        ))}
      </div>
    </div>
  );
}

const PANEL_TITLES: Record<StationHotspotId, string> = {
  experience: "Experiencia",
  saas: "RinnoTec · RinnFac",
  projects: "Proyectos propios",
  stack: "Stack técnico",
  music: "Errante Chr",
};

export default function StationPanel({
  active,
  onClose,
}: {
  active: StationHotspotId | null;
  onClose: () => void;
}) {
  if (!active) return null;

  return (
    <motion.div
      key={active}
      {...panelMotion}
      className="absolute inset-x-0 bottom-0 z-20 rounded-t-xl border-t border-accent/30 bg-background/85 p-4 backdrop-blur-xl sm:p-5"
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-sm font-bold tracking-tight">{PANEL_TITLES[active]}</h3>
        <button
          onClick={onClose}
          aria-label="Cerrar panel"
          className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-90"
        >
          <X size={15} />
        </button>
      </div>
      <div className="max-h-44 overflow-y-auto pr-1 sm:max-h-52">
        {active === "experience" && <ExperiencePanel />}
        {active === "saas" && <SaasPanel />}
        {active === "projects" && <ProjectsPanel />}
        {active === "stack" && <StackPanel />}
        {active === "music" && <MusicPanel />}
      </div>
    </motion.div>
  );
}
