import { content, type Locale } from "@/lib/content";
import MotionProvider from "./MotionProvider";
import { Music2 } from "lucide-react";

export default function Footer({ locale = "es" }: { locale?: Locale }) {
  const t = content[locale];

  return (
    <MotionProvider>
    <footer className="border-t border-border/50 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 md:flex-row md:px-8">
        <p className="text-[13px] text-muted-foreground">
          © {new Date().getFullYear()} {t.personalInfo.fullName}. {t.ui.footer.rights}
        </p>

        {/* The music alias lives here — present, but quiet. */}
        <a
          href={t.personalInfo.music.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors duration-150 hover:text-warm"
        >
          <Music2 size={13} />
          {t.ui.footer.alsoSound}{" "}
          <span className="font-medium text-muted-foreground group-hover:text-warm">
            {t.personalInfo.music.alias}
          </span>
        </a>

        <p className="text-[13px] text-muted-foreground">{t.ui.footer.builtWith}</p>
      </div>
    </footer>
    </MotionProvider>
  );
}
