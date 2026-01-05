import React from "react";
import { projects } from "@/lib/data"; // Recuerda que en data.ts "projects" ahora son tus servicios
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ArrowRight, MessageSquare } from "lucide-react"; // Cambiamos ícono Github por MessageSquare
import { GlassCard } from "./ui/glass-card";
import MotionWrapper from "./MotionWrapper";
import { motion } from "framer-motion";

export default function ProjectsSection() {
  return (
    <section id="services" className="py-16 relative"> {/* ID cambiado */}
      <div className="container max-w-4xl mx-auto px-6 md:px-4">
        <MotionWrapper>
          <h2 className="text-3xl font-bold mb-10 text-center md:text-left flex items-center gap-2">
             🚀 Soluciones & Servicios
          </h2>
        </MotionWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <MotionWrapper key={project.title} delay={index * 0.2}>
              <GlassCard className="group overflow-hidden dark:border-purple-500/10 h-full flex flex-col hover:border-purple-500/50 transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-purple-500/5 to-pink-500/5">
                  <CardTitle className="text-xl text-center md:text-left group-hover:text-purple-500 transition-colors duration-300">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow pt-4">
                  <ul className="list-none space-y-3 text-sm group-hover:space-y-3 transition-all duration-300">
                    {project.description.map((desc, i) => (
                      <motion.li
                        key={i}
                        className="text-muted-foreground flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <span className="mr-2 text-purple-500">✓</span>
                        {desc}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-center md:justify-start items-center border-t border-border/30 pt-4 pb-4">
                  <motion.a
                    href={project.github} // En data.ts esto será tu link de WhatsApp/Email
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm font-semibold text-foreground hover:text-purple-500 transition-colors group/link px-4 py-2 rounded-md bg-purple-500/10 hover:bg-purple-500/20"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    {/* @ts-ignore - Si TypeScript se queja, añade linkText a la interfaz */}
                    {project.linkText || "Contactar"} 
                    <ArrowRight className="h-3 w-3 ml-2 group-hover/link:translate-x-1 transition-transform" />
                  </motion.a>
                </CardFooter>
              </GlassCard>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}