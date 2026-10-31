import { MotionConfig } from "framer-motion";

/*
 * Every island gets its own MotionConfig (Astro islands are independent React
 * roots). `reducedMotion="user"` makes Framer Motion respect the OS preference:
 * transform/layout animations are disabled, opacity/color transitions remain.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
