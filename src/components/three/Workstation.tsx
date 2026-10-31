import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

export interface StationPalette {
  desk: string;
  deskEdge: string;
  metal: string;
  island: string;
  islandDeep: string;
  bezel: string;
  key: string;
  accent: string;
  warm: string;
  leaf: string;
  screen: string;
}

export const getPalette = (isDark: boolean): StationPalette =>
  isDark
    ? {
        desk: "#2e3d5c",
        deskEdge: "#1f2b45",
        metal: "#1a2540",
        island: "#152136",
        islandDeep: "#101a2c",
        bezel: "#0a1120",
        key: "#24314f",
        accent: "#4fd1c5",
        warm: "#f2a65a",
        leaf: "#34a883",
        screen: "#0b2730",
      }
    : {
        desk: "#dde5f2",
        deskEdge: "#c2cddd",
        metal: "#9fadc2",
        island: "#e7ecf6",
        islandDeep: "#d3dbe9",
        bezel: "#182132",
        key: "#c6d0e0",
        accent: "#0d8f81",
        warm: "#c97a1e",
        leaf: "#2f9e6f",
        screen: "#d5f0ec",
      };

/* ——— Main monitor with code "lines" on screen ——— */
function Monitor({
  p,
  width = 1.5,
  height = 0.92,
  position = [0, 0, 0] as [number, number, number],
  rotation = [0, 0, 0] as [number, number, number],
}: {
  p: StationPalette;
  width?: number;
  height?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  const lines = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        y: height / 2 - 0.14 - i * 0.14,
        w: [0.62, 0.44, 0.72, 0.36, 0.55][i],
        warm: i === 2,
      })),
    [height]
  );

  return (
    <group position={position} rotation={rotation}>
      {/* stand */}
      <mesh position={[0, -height / 2 - 0.1, 0]}>
        <cylinderGeometry args={[0.05, 0.09, 0.22, 12]} />
        <meshStandardMaterial color={p.metal} roughness={0.6} metalness={0.4} />
      </mesh>
      <mesh position={[0, -height / 2 - 0.2, 0.06]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.03, 16]} />
        <meshStandardMaterial color={p.metal} roughness={0.6} metalness={0.4} />
      </mesh>
      {/* bezel */}
      <RoundedBox args={[width, height, 0.06]} radius={0.02} smoothness={2} castShadow>
        <meshStandardMaterial color={p.bezel} roughness={0.45} />
      </RoundedBox>
      {/* screen */}
      <mesh position={[0, 0, 0.033]}>
        <planeGeometry args={[width - 0.1, height - 0.1]} />
        <meshStandardMaterial
          color={p.screen}
          emissive={p.accent}
          emissiveIntensity={0.25}
          roughness={0.3}
        />
      </mesh>
      {/* code lines */}
      {lines.map((l, i) => (
        <mesh key={i} position={[-(width - 0.1) / 2 + l.w / 2 + 0.08, l.y - height / 2 + 0.42, 0.036]}>
          <planeGeometry args={[l.w, 0.05]} />
          <meshBasicMaterial
            color={l.warm ? p.warm : p.accent}
            transparent
            opacity={l.warm ? 0.85 : 0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ——— Mechanical keyboard ——— */
function Keyboard({
  p,
  position = [0, 0, 0] as [number, number, number],
}: {
  p: StationPalette;
  position?: [number, number, number];
}) {
  const keys = useMemo(() => {
    const arr: Array<[number, number]> = [];
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 9; c++) arr.push([-0.36 + c * 0.09, -0.09 + r * 0.09]);
    return arr;
  }, []);

  return (
    <group position={position} rotation={[0, 0.06, 0]}>
      <RoundedBox args={[0.92, 0.05, 0.34]} radius={0.015} smoothness={2}>
        <meshStandardMaterial color={p.metal} roughness={0.5} metalness={0.3} />
      </RoundedBox>
      {keys.map(([x, z], i) => (
        <mesh key={i} position={[x, 0.033, z]}>
          <boxGeometry args={[0.07, 0.018, 0.07]} />
          <meshStandardMaterial
            color={i === 31 ? p.accent : p.key}
            emissive={i === 31 ? p.accent : "#000000"}
            emissiveIntensity={i === 31 ? 0.5 : 0}
            roughness={0.65}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ——— Server rack with blinking LEDs ——— */
function ServerRack({
  p,
  position = [0, 0, 0] as [number, number, number],
}: {
  p: StationPalette;
  position?: [number, number, number];
}) {
  const leds = useRef<THREE.Mesh[]>([]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    leds.current.forEach((led, i) => {
      if (!led) return;
      const mat = led.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.5 + Math.abs(Math.sin(t * (1.4 + i * 0.6))) * 2.2;
    });
  });

  return (
    <group position={position}>
      <RoundedBox args={[0.55, 0.92, 0.55]} radius={0.03} smoothness={2}>
        <meshStandardMaterial color={p.metal} roughness={0.5} metalness={0.35} />
      </RoundedBox>
      {[0.3, 0.1, -0.1, -0.3].map((y, i) => (
        <group key={i} position={[0, y, 0.278]}>
          <mesh>
            <planeGeometry args={[0.42, 0.11]} />
            <meshStandardMaterial color={p.bezel} roughness={0.6} />
          </mesh>
          <mesh
            position={[0.15, 0, 0.003]}
            ref={(el) => {
              if (el) leds.current[i] = el;
            }}
          >
            <sphereGeometry args={[0.018, 8, 8]} />
            <meshStandardMaterial
              color={i === 3 ? p.warm : p.accent}
              emissive={i === 3 ? p.warm : p.accent}
              emissiveIntensity={1.5}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ——— Floating phone ——— */
function Phone({
  p,
  position = [0, 0, 0] as [number, number, number],
}: {
  p: StationPalette;
  position?: [number, number, number];
}) {
  return (
    <group position={position} rotation={[0.12, -0.5, 0.08]}>
      <RoundedBox args={[0.3, 0.6, 0.035]} radius={0.035} smoothness={3}>
        <meshStandardMaterial color={p.bezel} roughness={0.35} metalness={0.5} />
      </RoundedBox>
      <mesh position={[0, 0, 0.019]}>
        <planeGeometry args={[0.25, 0.54]} />
        <meshStandardMaterial
          color={p.screen}
          emissive={p.accent}
          emissiveIntensity={0.35}
          roughness={0.3}
        />
      </mesh>
      {/* chat bubbles on screen */}
      <mesh position={[-0.035, 0.12, 0.021]}>
        <planeGeometry args={[0.13, 0.06]} />
        <meshBasicMaterial color={p.accent} transparent opacity={0.8} />
      </mesh>
      <mesh position={[0.035, 0.0, 0.021]}>
        <planeGeometry args={[0.13, 0.06]} />
        <meshBasicMaterial color={p.accent} transparent opacity={0.55} />
      </mesh>
      <mesh position={[-0.035, -0.12, 0.021]}>
        <planeGeometry args={[0.1, 0.06]} />
        <meshBasicMaterial color={p.warm} transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

/* ——— Headphones on stand ——— */
function Headphones({
  p,
  position = [0, 0, 0] as [number, number, number],
}: {
  p: StationPalette;
  position?: [number, number, number];
}) {
  return (
    <group position={position}>
      {/* stand */}
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.13, 0.15, 0.03, 16]} />
        <meshStandardMaterial color={p.metal} roughness={0.6} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.35, 8]} />
        <meshStandardMaterial color={p.metal} roughness={0.6} metalness={0.3} />
      </mesh>
      {/* headband */}
      <mesh position={[0, 0.44, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.16, 0.022, 8, 24, Math.PI]} />
        <meshStandardMaterial color={p.bezel} roughness={0.5} />
      </mesh>
      {/* earcups */}
      {[-0.16, 0.16].map((x) => (
        <mesh key={x} position={[x, 0.42, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.07, 0.07, 0.05, 16]} />
          <meshStandardMaterial color={p.bezel} roughness={0.45} />
        </mesh>
      ))}
      {/* subtle accent ring on left cup */}
      <mesh position={[-0.185, 0.42, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.05, 0.008, 8, 20]} />
        <meshStandardMaterial
          color={p.accent}
          emissive={p.accent}
          emissiveIntensity={0.6}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/* ——— Coffee mug (warm accent) ——— */
function Mug({
  p,
  position = [0, 0, 0] as [number, number, number],
}: {
  p: StationPalette;
  position?: [number, number, number];
}) {
  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={[0.07, 0.06, 0.14, 14]} />
        <meshStandardMaterial color={p.warm} roughness={0.55} />
      </mesh>
      <mesh position={[0, 0.071, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 0.008, 14]} />
        <meshStandardMaterial color="#1c1108" roughness={0.9} />
      </mesh>
      <mesh position={[0.085, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.035, 0.01, 8, 16, Math.PI]} />
        <meshStandardMaterial color={p.warm} roughness={0.55} />
      </mesh>
    </group>
  );
}

/* ——— Low-poly plant ——— */
function Plant({
  p,
  position = [0, 0, 0] as [number, number, number],
}: {
  p: StationPalette;
  position?: [number, number, number];
}) {
  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={[0.13, 0.1, 0.18, 6]} />
        <meshStandardMaterial color={p.deskEdge} roughness={0.8} flatShading />
      </mesh>
      {[
        [0, 0.24, 0, 1],
        [-0.06, 0.2, 0.04, 0.75],
        [0.05, 0.21, -0.05, 0.85],
      ].map(([x, y, z, s], i) => (
        <mesh key={i} position={[x, y, z]} scale={s}>
          <coneGeometry args={[0.09, 0.28, 5]} />
          <meshStandardMaterial color={p.leaf} roughness={0.85} flatShading />
        </mesh>
      ))}
    </group>
  );
}

/* ——— Floating island base ——— */
function Island({ p, simple = false }: { p: StationPalette; simple?: boolean }) {
  const rocks = useMemo(
    () => [
      { pos: [-2.3, -0.75, 0.6] as [number, number, number], s: 0.22 },
      { pos: [2.5, -0.95, -0.4] as [number, number, number], s: 0.3 },
      { pos: [0.6, -1.15, 0.9] as [number, number, number], s: 0.16 },
    ],
    []
  );

  return (
    <group>
      <RoundedBox args={[5.4, 0.5, 2.9]} radius={0.1} smoothness={2} position={[0, -0.26, 0]}>
        <meshStandardMaterial color={p.island} roughness={0.9} flatShading />
      </RoundedBox>
      <mesh position={[0, -0.56, 0]}>
        <boxGeometry args={[4.6, 0.18, 2.3]} />
        <meshStandardMaterial color={p.islandDeep} roughness={0.95} flatShading />
      </mesh>
      {!simple &&
        rocks.map((r, i) => (
          <mesh key={i} position={r.pos} rotation={[i, i * 0.7, 0]}>
            <dodecahedronGeometry args={[r.s, 0]} />
            <meshStandardMaterial color={p.islandDeep} roughness={0.95} flatShading />
          </mesh>
        ))}
    </group>
  );
}

/* ——— Desk + everything on it ——— */
export function Workstation({
  p,
  simple = false,
}: {
  p: StationPalette;
  simple?: boolean;
}) {
  return (
    <group>
      <Island p={p} simple={simple} />

      {/* desk */}
      <RoundedBox args={[3.6, 0.12, 1.6]} radius={0.03} smoothness={2} position={[0, 1.0, 0]}>
        <meshStandardMaterial color={p.desk} roughness={0.6} />
      </RoundedBox>
      {[
        [-1.65, -0.65],
        [1.65, -0.65],
        [-1.65, 0.65],
        [1.65, 0.65],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.5, z]}>
          <boxGeometry args={[0.09, 0.94, 0.09]} />
          <meshStandardMaterial color={p.metal} roughness={0.55} metalness={0.4} />
        </mesh>
      ))}

      {/* main monitor (experience hotspot) */}
      <Monitor p={p} position={[-0.5, 1.86, -0.32]} rotation={[0, 0.08, 0]} />

      {/* secondary monitor */}
      {!simple && (
        <Monitor
          p={p}
          width={1.1}
          height={0.72}
          position={[0.82, 1.76, -0.26]}
          rotation={[0, -0.42, 0]}
        />
      )}

      <Keyboard p={p} position={[-0.42, 1.09, 0.32]} />
      {/* mouse */}
      {!simple && (
        <mesh position={[0.28, 1.1, 0.34]} scale={[1, 0.6, 1.4]}>
          <sphereGeometry args={[0.055, 12, 10]} />
          <meshStandardMaterial color={p.key} roughness={0.6} />
        </mesh>
      )}
      <Mug p={p} position={[0.72, 1.13, 0.38]} />

      {/* server rack (saas hotspot) */}
      <ServerRack p={p} position={[2.15, 0.48, -0.35]} />

      <Headphones p={p} position={[1.55, 1.06, -0.05]} />
      <Plant p={p} position={[-2.1, 0.1, 0.35]} />
    </group>
  );
}

export function FloatingPhone({ p }: { p: StationPalette }) {
  return <Phone p={p} position={[1.22, 1.95, 0.42]} />;
}
