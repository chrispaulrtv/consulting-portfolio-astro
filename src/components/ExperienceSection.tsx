import { workExperience, education } from "@/lib/data";
import TimelineItem from "./TimelineItem";
import { Briefcase, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import MotionWrapper from "./MotionWrapper";
import MotionProvider from "./MotionProvider";

export default function ExperienceSection() {
  return (
    <MotionProvider>
    <section id="experience" className="border-t border-border/50 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <MotionWrapper>
          <div className="mb-10 flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              Trayectoria
            </h2>
            <p className="hidden max-w-[36ch] text-right text-sm text-muted-foreground md:block">
              De wallets en Panamá a plataformas bancarias con Thoughtworks.
            </p>
          </div>
        </MotionWrapper>

        <div className="mb-12">
          {workExperience.map((job, index) => (
            <TimelineItem
              key={job.company + job.period}
              title={job.position}
              subtitle={job.company}
              meta={job.location}
              date={job.period}
              badge={job.highlight}
              isLast={index === workExperience.length - 1}
              index={index}
            >
              <motion.div
                className="mt-3 rounded-lg border border-border/60 bg-card/40 p-4"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
                viewport={{ once: true }}
              >
                <div className="mb-2.5 flex items-center gap-2">
                  <Briefcase size={13} className="text-accent" />
                  <h4 className="font-display text-[12px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Logros clave
                  </h4>
                </div>
                <ul className="ml-1 space-y-2 text-sm">
                  {job.achievements.map((achievement, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-2.5 text-muted-foreground"
                      initial={{ opacity: 0, x: -6 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.08 * i }}
                      viewport={{ once: true }}
                    >
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-warm" />
                      {achievement}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </TimelineItem>
          ))}
        </div>

        {/* Education — quiet footnote, not a timeline */}
        <MotionWrapper>
          <div className="flex items-center gap-3 border-t border-border/50 pt-6">
            <GraduationCap size={16} className="text-accent" />
            {education.map((edu) => (
              <p key={edu.institution} className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{edu.degree}</span>
                <span className="mx-2 text-border">·</span>
                {edu.institution}
                <span className="mx-2 text-border">·</span>
                {edu.period}
              </p>
            ))}
          </div>
        </MotionWrapper>
      </div>
    </section>
    </MotionProvider>
  );
}
