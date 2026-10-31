import { services } from "@/lib/data";
import { ArrowRight, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import MotionWrapper from "./MotionWrapper";
import MotionProvider from "./MotionProvider";

export default function ProjectsSection() {
  return (
    <MotionProvider>
    <section id="services" className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
      <MotionWrapper>
        <div className="mb-9 flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            Soluciones & servicios
          </h2>
          <p className="hidden max-w-[38ch] text-right text-sm text-muted-foreground md:block">
            Formas concretas de trabajar juntos, sin onboarding largo ni sorpresas.
          </p>
        </div>
      </MotionWrapper>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true, margin: "-60px" }}
            className="group flex h-full flex-col rounded-lg border border-border/70 bg-card/50 p-5 transition-[border-color,transform] duration-200 ease-out hover:-translate-y-1 hover:border-accent/50"
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <h3 className="font-display text-base font-bold tracking-tight">{service.title}</h3>
            </div>
            <ul className="mb-5 flex-grow space-y-2.5">
              {service.description.map((desc, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-warm" />
                  {desc}
                </li>
              ))}
            </ul>
            <motion.a
              href={service.github}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-1.5 self-start rounded-md border border-border px-3.5 py-2 text-[13px] font-semibold transition-colors duration-150 group-hover:border-accent group-hover:text-accent"
            >
              <MessageSquare size={13} />
              {service.linkText}
              <ArrowRight
                size={13}
                className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
              />
            </motion.a>
          </motion.div>
        ))}
      </div>
    </section>
    </MotionProvider>
  );
}
