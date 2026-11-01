import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Html } from "@react-three/drei";
import * as THREE from "three";
import { Workstation, FloatingPhone, getPalette } from "./Workstation";
import AgentDrone from "./AgentDrone";
import { content, type Locale } from "@/lib/content";

export type StationHotspotId =
  | "experience"
  | "saas"
  | "projects"
  | "stack"
  | "music";

interface HotspotDef {
  id: StationHotspotId;
  marker: [number, number, number];
  cam: [number, number, number];
  target: [number, number, number];
}

const DEFAULT_CAM: [number, number, number] = [4.6, 3.15, 5.7];
const DEFAULT_TARGET: [number, number, number] = [0, 1.15, 0];

export const HOTSPOTS: HotspotDef[] = [
  {
    id: "experience",
    marker: [-0.5, 2.5, -0.32],
    cam: [-0.15, 2.5, 1.95],
    target: [-0.5, 1.95, -0.3],
  },
  {
    id: "saas",
    marker: [2.15, 1.22, -0.35],
    cam: [3.15, 1.4, 1.55],
    target: [2.1, 0.7, -0.35],
  },
  {
    id: "projects",
    marker: [2.3, 2.55, 0.65],
    cam: [3.5, 2.35, 3.0],
    target: [2.26, 1.85, 0.65],
  },
  {
    id: "stack",
    marker: [-0.42, 1.6, 0.32],
    cam: [-0.75, 2.15, 1.95],
    target: [-0.4, 1.08, 0.3],
  },
  {
    id: "music",
    marker: [1.55, 1.78, -0.05],
    cam: [2.55, 2.1, 1.6],
    target: [1.55, 1.42, -0.05],
  },
];

const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);

/* Camera flies to the focused hotspot, or returns to the wide shot */
function CameraRig({
  active,
  reduced,
  isMobile,
}: {
  active: StationHotspotId | null;
  reduced: boolean;
  isMobile: boolean;
}) {
  const { camera } = useThree();
  const lookAt = useRef(new THREE.Vector3(...DEFAULT_TARGET));
  const desiredPos = useRef(new THREE.Vector3());
  const desiredTarget = useRef(new THREE.Vector3());

  useFrame((_, dt) => {
    const def = HOTSPOTS.find((h) => h.id === active);
    let camPos = def ? def.cam : DEFAULT_CAM;
    let target = def ? def.target : DEFAULT_TARGET;

    if (isMobile && !def) {
      // pull back a little so the whole station fits narrow viewports
      camPos = [DEFAULT_CAM[0] * 1.25, DEFAULT_CAM[1] * 1.2, DEFAULT_CAM[2] * 1.25];
    }

    desiredPos.current.set(...camPos);
    desiredTarget.current.set(...target);

    if (reduced) {
      camera.position.copy(desiredPos.current);
      lookAt.current.copy(desiredTarget.current);
    } else {
      const k = 1 - Math.exp(-3.2 * Math.min(dt, 0.1));
      camera.position.lerp(desiredPos.current, k);
      lookAt.current.lerp(desiredTarget.current, k);
    }
    camera.lookAt(lookAt.current);
  });

  return null;
}

/* Pulsing beacon above each interactive object */
function HotspotMarker({
  def,
  label,
  explore,
  active,
  onSelect,
  accent,
}: {
  def: HotspotDef;
  label: string;
  explore: string;
  active: boolean;
  onSelect: (id: StationHotspotId) => void;
  accent: string;
}) {
  const group = useRef<THREE.Group>(null);
  const pulse = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const scaleRef = useRef(1);

  useFrame(({ clock }, dt) => {
    if (!pulse.current || !ring.current) return;
    const t = clock.elapsedTime;
    const wave = 1 + Math.sin(t * 2.4 + def.marker[0]) * 0.12;
    const target = (active ? 1.35 : pressed ? 0.9 : hovered ? 1.18 : 1) * wave;
    // ~110ms settle: press reads instantly, release eases back
    scaleRef.current = THREE.MathUtils.lerp(
      scaleRef.current,
      target,
      1 - Math.exp(-14 * Math.min(dt, 0.1))
    );
    pulse.current.scale.setScalar(scaleRef.current);
    pulse.current.position.y = Math.sin(t * 1.6) * 0.04;
    ring.current.rotation.z = t * 0.6;
  });

  return (
    <group ref={group} position={def.marker}>
      {/* pulsing visual beacon (clicks pass through to R3F scene) */}
      <group
        ref={pulse}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(def.id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <mesh ref={ring}>
          <torusGeometry args={[0.11, 0.012, 8, 26]} />
          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={active ? 2 : 1.1}
            toneMapped={false}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.038, 12, 12]} />
          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={1.8}
            toneMapped={false}
          />
        </mesh>
        <Html position={[0, 0.24, 0]} center style={{ pointerEvents: "none" }}>
          <div
            className={`station-label${active || hovered ? " station-label--visible" : ""}${active ? " station-label--active" : ""}`}
          >
            {label}
          </div>
        </Html>
      </group>

      {/* DOM hit area: real button → reliable clicks, touch targets & keyboard focus.
          Static (outside the pulse group) so its hit box never moves. */}
      <Html
        key={`${def.id}-hit`}
        position={[0, 0, 0]}
        center
        style={{ pointerEvents: "none" }}
      >
        <button
          type="button"
          aria-label={`${explore} ${label}`}
          aria-pressed={active}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(def.id);
          }}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => {
            setHovered(false);
            setPressed(false);
          }}
          onPointerDown={() => setPressed(true)}
          onPointerUp={() => setPressed(false)}
          onPointerCancel={() => setPressed(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          className="station-hotspot-btn"
        />
      </Html>
    </group>
  );
}

/* Entrance: the station floats up into place once */
function StationRig({
  p,
  reduced,
  simple,
  agentMessage,
  onAgentClick,
}: {
  p: ReturnType<typeof getPalette>;
  reduced: boolean;
  simple: boolean;
  agentMessage: string | null;
  onAgentClick?: () => void;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    if (reduced) return;
    const t = Math.min(clock.elapsedTime / 1.4, 1);
    const e = easeOutCubic(t);
    group.current.position.y = (1 - e) * -1.1;
    group.current.scale.setScalar(0.92 + e * 0.08);
    group.current.rotation.y = (1 - e) * 0.25;
  });

  return (
    <group ref={group}>
      <Workstation p={p} simple={simple} />
      <FloatingPhone p={p} />
      <AgentDrone
        p={p}
        reduced={reduced}
        message={agentMessage}
        onClick={onAgentClick}
      />
    </group>
  );
}

export default function StationScene({
  active,
  onSelect,
  isDark,
  reduced,
  isMobile,
  agentMessage,
  onAgentClick,
  locale = "es",
}: {
  active: StationHotspotId | null;
  onSelect: (id: StationHotspotId | null) => void;
  isDark: boolean;
  reduced: boolean;
  isMobile: boolean;
  agentMessage: string | null;
  onAgentClick?: () => void;
  locale?: Locale;
}) {
  const p = getPalette(isDark);
  const t = content[locale];

  return (
    <Canvas
      dpr={[1, isMobile ? 1.6 : 2]}
      camera={{ position: DEFAULT_CAM, fov: 38, near: 0.1, far: 60 }}
      gl={{ antialias: true, alpha: true }}
      onPointerMissed={() => onSelect(null)}
      style={{ touchAction: "pan-y" }}
    >
      <Suspense fallback={null}>
        {/* lighting: cool key + teal rim + warm bounce */}
        <ambientLight intensity={isDark ? 0.9 : 1.0} />
        <directionalLight position={[5, 8, 5]} intensity={isDark ? 1.6 : 1.7} castShadow={!isMobile} shadow-mapSize={[1024, 1024]} />
        <pointLight position={[-3.5, 2.5, 2.5]} intensity={isDark ? 30 : 12} color={p.accent} distance={14} />
        <pointLight position={[3.5, 1.2, -2.5]} intensity={isDark ? 18 : 8} color={p.warm} distance={12} />
        {/* soft fill from camera side so the desk front never goes pitch black */}
        <pointLight position={[2.5, 3.5, 5]} intensity={isDark ? 12 : 6} color="#cfe0ff" distance={18} />

        <StationRig
          p={p}
          reduced={reduced}
          simple={isMobile}
          agentMessage={agentMessage}
          onAgentClick={onAgentClick}
        />

        {HOTSPOTS.map((def) => (
          <HotspotMarker
            key={def.id}
            def={def}
            label={t.ui.hotspotLabels[def.id]}
            explore={t.ui.explore}
            active={active === def.id}
            onSelect={onSelect}
            accent={p.accent}
          />
        ))}

        {!isMobile && (
          <ContactShadows
            position={[0, -0.56, 0]}
            opacity={isDark ? 0.55 : 0.35}
            scale={9}
            blur={2.4}
            far={1.6}
            resolution={256}
            color="#000000"
          />
        )}

        <CameraRig active={active} reduced={reduced} isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
}
