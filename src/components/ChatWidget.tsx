import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowUp } from "lucide-react";
import MotionProvider from "./MotionProvider";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const SEED: Msg = {
  role: "assistant",
  content:
    "¡Hola! Soy el asistente de Christian. Pregúntame por su experiencia, proyectos o servicios.",
};

const OFFLINE_REPLY =
  "No pude conectar con el asistente ahora mismo — escríbele directo a chrispaulrtv@rinnotec.com, responde personalmente.";

function Bubble({ msg }: { msg: Msg }) {
  const isUser = msg.role === "user";
  return (
    <div
      className={
        isUser
          ? "ml-auto max-w-[85%] rounded-lg rounded-br-sm border border-accent/35 bg-accent/15 px-3 py-2 text-[13px] leading-snug text-foreground"
          : "max-w-[90%] rounded-lg rounded-bl-sm border border-border/60 bg-surface px-3 py-2 text-[13px] leading-snug text-foreground/90"
      }
    >
      {msg.content}
    </div>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([SEED]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [demo, setDemo] = useState(false);
  const [touched, setTouched] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;

    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setBusy(true);
    setTouched(true);

    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-10) }),
      });
      const data = await r.json();
      const reply =
        r.ok && data.reply
          ? data.reply
          : OFFLINE_REPLY;
      if (data.demo) setDemo(true);
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: OFFLINE_REPLY }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <MotionProvider>
      <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
        <AnimatePresence>
          {open && (
            <motion.div
              role="dialog"
              aria-label="Chat con el asistente"
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97, transition: { duration: 0.15 } }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.18 }}
              style={{ transformOrigin: "bottom right" }}
              className="flex h-[min(460px,72vh)] w-[min(360px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-xl border border-border/70 bg-background/95 shadow-[0_24px_64px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl"
            >
              {/* terminal header */}
              <div className="flex items-center gap-2 border-b border-border/60 bg-surface px-3 py-2.5">
                <span className="h-2 w-2 rounded-full bg-warm/70" aria-hidden="true" />
                <span className="h-2 w-2 rounded-full bg-accent/60" aria-hidden="true" />
                <span className="font-display text-xs font-semibold tracking-tight">
                  asistente<span className="text-accent">.</span>
                </span>
                {demo && (
                  <span className="rounded-full border border-warm/40 bg-warm/10 px-1.5 py-px text-[9px] font-semibold uppercase tracking-wider text-warm">
                    demo
                  </span>
                )}
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar chat"
                  className="ml-auto rounded-md p-1 text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground active:scale-90"
                >
                  <X size={14} />
                </button>
              </div>

              {/* messages */}
              <div ref={scrollRef} className="flex-grow space-y-2.5 overflow-y-auto p-3">
                {messages.map((m, i) => (
                  <Bubble key={i} msg={m} />
                ))}
                {busy && (
                  <div className="flex max-w-[90%] items-center gap-1 rounded-lg rounded-bl-sm border border-border/60 bg-surface px-3 py-2.5">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent"
                        style={{ animationDelay: `${d * 120}ms`, animationDuration: "900ms" }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* input */}
              <form onSubmit={send} className="flex items-center gap-2 border-t border-border/60 p-2.5">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Pregúntame sobre Christian…"
                  maxLength={2000}
                  aria-label="Mensaje"
                  className="min-w-0 flex-grow rounded-md border border-border/60 bg-surface/60 px-3 py-2 text-sm outline-none transition-colors duration-150 placeholder:text-muted-foreground/80 focus:border-accent/60"
                />
                <button
                  type="submit"
                  disabled={busy || !input.trim()}
                  aria-label="Enviar mensaje"
                  className="rounded-md bg-accent p-2 text-accent-foreground transition-transform duration-150 ease-out hover:-translate-y-0.5 active:scale-90 disabled:pointer-events-none disabled:opacity-40"
                >
                  <ArrowUp size={15} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* launcher */}
        <motion.button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Cerrar chat con el asistente" : "Abrir chat con el asistente"}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.93 }}
          className="relative flex h-13 w-13 items-center justify-center rounded-full border border-accent/50 bg-background/90 font-display text-lg font-bold text-accent shadow-[0_10px_32px_-8px_color-mix(in_oklab,var(--accent)_55%,transparent)] backdrop-blur-md"
          style={{ height: 52, width: 52 }}
        >
          ›_
          {!touched && !open && (
            <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-background bg-accent" />
            </span>
          )}
        </motion.button>
      </div>
    </MotionProvider>
  );
}
