import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TimelineItemProps {
  title: string;
  subtitle: string;
  meta?: string;
  date: string;
  badge?: string;
  isLast?: boolean;
  index?: number;
  children?: React.ReactNode;
}

export default function TimelineItem({
  title,
  subtitle,
  meta,
  date,
  badge,
  isLast = false,
  index = 0,
  children,
}: TimelineItemProps) {
  return (
    <motion.div
      className="relative flex gap-5"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.12, ease: [0.23, 1, 0.32, 1] }}
      viewport={{ once: true, margin: "-60px" }}
    >
      <div className="flex flex-col items-center">
        <motion.div
          className="z-10 mt-1.5 h-3 w-3 rounded-full border-2 border-accent bg-background"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 420,
            damping: 22,
            delay: index * 0.12 + 0.15,
          }}
          viewport={{ once: true, margin: "-60px" }}
        />
        {!isLast && (
          <motion.div
            className="w-px grow bg-gradient-to-b from-accent/50 to-border/30"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 0.7, delay: index * 0.12 + 0.25 }}
            viewport={{ once: true, margin: "-60px" }}
          />
        )}
      </div>
      <div className={cn("pb-9", isLast ? "pb-0" : "")}>
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h3 className="font-display text-[17px] font-bold tracking-tight">{title}</h3>
            {badge && (
              <span className="rounded-full border border-warm/40 bg-warm/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-warm">
                {badge}
              </span>
            )}
          </div>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-2.5 text-sm">
            <span className="font-medium text-foreground/90">{subtitle}</span>
            {meta && <span className="text-muted-foreground">· {meta}</span>}
          </div>
          <p className="mt-0.5 font-mono text-[11px] tracking-tight text-accent">{date}</p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: index * 0.12 + 0.25 }}
          viewport={{ once: true }}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
}
