import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { content, type Locale } from "@/lib/content";
import MotionWrapper from "./MotionWrapper";
import MotionProvider from "./MotionProvider";

export default function FeaturedProjectsSection({ locale = "es" }: { locale?: Locale }) {
  const t = content[locale];
  const p = t.ui.sections.projects;

  return (
    <MotionProvider>
    <section
      id="projects"
      className="border-y border-border/50 bg-surface/40 py-16 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <MotionWrapper>
          <div className="mb-10 flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              {p.title}
            </h2>
            <p className="hidden max-w-[38ch] text-right text-sm text-muted-foreground md:block">
              {p.sub}
            </p>
          </div>
        </MotionWrapper>

        <div>
          {t.featuredProjects.map((project, i) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
              viewport={{ once: true, margin: "-80px" }}
              className="group grid gap-4 border-t border-border/60 py-8 transition-colors duration-200 md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] md:gap-12 md:py-10"
            >
              <div className="relative">
                <span className="absolute -left-4 top-1 hidden h-full w-px bg-gradient-to-b from-accent/60 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:block" />
                <p className="font-display text-xl font-bold tracking-tight md:text-2xl">
                  {project.name}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-widest text-warm">
                  {project.org}
                </p>
                <p className="mt-2 max-w-[32ch] text-sm text-muted-foreground">{project.tagline}</p>
              </div>

              <div>
                <ul className="space-y-2.5">
                  {project.description.map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {line}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-border/60 bg-background/60 px-2 py-0.5 text-[11px] font-medium text-foreground/75"
                    >
                      {s}
                    </span>
                  ))}
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto inline-flex items-center gap-1 text-[13px] font-semibold text-accent transition-transform duration-150 ease-out group-hover:translate-x-0.5 hover:underline"
                  >
                    {project.linkText}
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
    </MotionProvider>
  );
}
