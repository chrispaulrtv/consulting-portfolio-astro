import { content, type Locale } from "@/lib/content";
import { motion } from "framer-motion";
import MotionWrapper from "./MotionWrapper";
import MotionProvider from "./MotionProvider";

function SkillTag({ skill, index }: { skill: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 380,
        damping: 26,
        delay: 0.04 * index,
      }}
      viewport={{ once: true, margin: "-40px" }}
      className="inline-flex items-center rounded-md border border-border/60 bg-muted/50 px-2.5 py-1 text-[13px] font-medium text-foreground/85 transition-colors duration-150 hover:border-accent/50 hover:text-accent"
    >
      {skill}
    </motion.span>
  );
}

export default function SkillsSection({ locale = "es" }: { locale?: Locale }) {
  const t = content[locale];
  const g = t.ui.sections.skills.groups;

  const groups: Array<{ title: string; items: string[] }> = [
    { title: g.languages, items: t.skills.programmingLanguages },
    { title: g.frontend, items: t.skills.frontendDevelopment },
    { title: g.backend, items: t.skills.backendDevelopment },
    { title: g.data, items: t.skills.databaseAndStorage },
    { title: g.cloud, items: t.skills.cloudAndDevOps },
    { title: g.tools, items: t.skills.toolsAndServices },
  ];

  return (
    <MotionProvider>
    <section id="skills" className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
      <MotionWrapper>
        <div className="mb-9 flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            {t.ui.sections.skills.title}
          </h2>
          <p className="hidden max-w-[36ch] text-right text-sm text-muted-foreground md:block">
            {t.ui.sections.skills.sub}
          </p>
        </div>
      </MotionWrapper>

      <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
        {groups.map((group, gi) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: gi * 0.06, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true, margin: "-60px" }}
            className="border-t border-border/60 pt-4"
          >
            <h3 className="mb-3 font-display text-[13px] font-semibold uppercase tracking-widest text-accent">
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill, i) => (
                <SkillTag key={skill} skill={skill} index={i} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
    </MotionProvider>
  );
}
