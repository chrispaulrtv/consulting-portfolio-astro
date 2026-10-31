import { personalInfo } from "@/lib/data";
import MotionProvider from "./MotionProvider";
import { Music2 } from "lucide-react";

export default function Footer() {
  return (
    <MotionProvider>
    <footer className="border-t border-border/50 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 md:flex-row md:px-8">
        <p className="text-[13px] text-muted-foreground">
          © {new Date().getFullYear()} {personalInfo.fullName}. Todos los derechos reservados.
        </p>

        {/* The music alias lives here — present, but quiet. */}
        <a
          href={personalInfo.music.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors duration-150 hover:text-warm"
        >
          <Music2 size={13} />
          También sueno como{" "}
          <span className="font-medium text-muted-foreground group-hover:text-warm">
            {personalInfo.music.alias}
          </span>
        </a>

        <p className="text-[13px] text-muted-foreground">
          Hecho con Astro, React y Three.js
        </p>
      </div>
    </footer>
    </MotionProvider>
  );
}
