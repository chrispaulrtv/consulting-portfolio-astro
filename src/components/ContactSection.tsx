import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "./ui/brand-icons";
import { personalInfo } from "@/lib/data";
import MotionWrapper from "./MotionWrapper";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border/50 py-16 md:py-20"
    >
      {/* quiet accent glow — the page's closing note */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_90%_at_20%_120%,var(--accent),transparent_70%)] opacity-[0.09]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <MotionWrapper>
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:gap-12">
            {/* the face behind the work */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              viewport={{ once: true, margin: "-60px" }}
              className="shrink-0"
            >
              <div className="relative">
                <div
                  className="absolute -inset-1 rounded-full bg-accent/25 blur-md"
                  aria-hidden="true"
                />
                <img
                  src={personalInfo.profilePicture}
                  alt={`Foto de ${personalInfo.name}`}
                  width={112}
                  height={112}
                  loading="lazy"
                  className="relative h-24 w-24 rounded-full border border-border/70 object-cover md:h-28 md:w-28"
                />
              </div>
            </motion.div>

            <div className="min-w-0">
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                ¿Hablamos?
              </h2>
              <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-muted-foreground">
                Cuéntame qué necesitas: auditar tu app móvil, reforzar tu equipo
                senior o diseñar la arquitectura de tu próximo producto. Respondo
                personalmente.
              </p>

              <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
                <motion.a
                  href={`mailto:${personalInfo.email}`}
                  whileTap={{ scale: 0.97 }}
                  className="group inline-flex items-center gap-2.5 rounded-md bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-transform duration-150 ease-out hover:-translate-y-0.5"
                >
                  <Mail size={15} />
                  {personalInfo.email}
                </motion.a>

                <div className="flex items-center gap-4 pl-1">
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-accent"
                  >
                    <LinkedinIcon size={15} />
                    LinkedIn
                  </a>
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-accent"
                  >
                    <GithubIcon size={15} />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
