import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import type { StationPalette } from "./Workstation";

interface AgentDroneProps {
  p: StationPalette;
  reduced: boolean;
  message: string | null;
  onClick?: () => void;
}

/*
 * The agent's physical presence: a small survey drone that idles near the
 * station, bobs gently, tracks the pointer with its "gaze" and answers with
 * a speech bubble when clicked.
 */
export default function AgentDrone({ p, reduced, message, onClick }: AgentDroneProps) {
  const group = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const rotors = useRef<THREE.Group[]>([]);
  const basePos = new THREE.Vector3(-1.85, 2.15, 0.75);

  useFrame(({ clock, pointer }, dt) => {
    if (!group.current || !body.current) return;
    const t = clock.elapsedTime;

    if (reduced) {
      group.current.position.copy(basePos);
      return;
    }

    // idle bob + slow drift toward pointer (desktop only, subtle)
    const drift = Math.min(1, dt * 2);
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      basePos.x + pointer.x * 0.35,
      drift
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      basePos.y + Math.sin(t * 1.3) * 0.09,
      drift
    );
    group.current.position.z = THREE.MathUtils.lerp(
      group.current.position.z,
      basePos.z - pointer.y * 0.15,
      drift
    );

    // gaze follows pointer
    body.current.rotation.y = THREE.MathUtils.lerp(
      body.current.rotation.y,
      pointer.x * 0.45,
      drift
    );
    body.current.rotation.x = THREE.MathUtils.lerp(
      body.current.rotation.x,
      -pointer.y * 0.3,
      drift
    );

    rotors.current.forEach((r, i) => {
      if (r) r.rotation.y = t * (14 + i * 3);
    });
  });

  return (
    <group
      ref={group}
      position={basePos.toArray() as [number, number, number]}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
    >
      <group ref={body}>
        {/* hull */}
        <mesh castShadow>
          <sphereGeometry args={[0.17, 16, 14]} />
          <meshStandardMaterial color={p.bezel} roughness={0.35} metalness={0.55} />
        </mesh>
        {/* visor / eye band */}
        <mesh position={[0, 0.02, 0.13]} rotation={[0.1, 0, 0]}>
          <sphereGeometry args={[0.085, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial
            color={p.accent}
            emissive={p.accent}
            emissiveIntensity={1.4}
            toneMapped={false}
          />
        </mesh>
        {/* antenna */}
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.14, 6]} />
          <meshStandardMaterial color={p.metal} roughness={0.5} metalness={0.4} />
        </mesh>
        <mesh position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.022, 8, 8]} />
          <meshStandardMaterial
            color={p.warm}
            emissive={p.warm}
            emissiveIntensity={1.6}
            toneMapped={false}
          />
        </mesh>
        {/* rotor arms + spinning rotors */}
        {[
          [0.24, 0.06, 0.16],
          [-0.24, 0.06, 0.16],
          [0.24, 0.06, -0.16],
          [-0.24, 0.06, -0.16],
        ].map(([x, y, z], i) => (
          <group key={i} position={[x, y, z]}>
            {/* horizontal arm from hull to rotor */}
            <mesh
              position={[-x / 2, 0, -z / 2]}
              rotation={[0, -Math.atan2(z, x), 0]}
            >
              <boxGeometry args={[Math.hypot(x, z), 0.024, 0.024]} />
              <meshStandardMaterial color={p.metal} roughness={0.5} metalness={0.4} />
            </mesh>
            <group
              ref={(el) => {
                if (el) rotors.current[i] = el;
              }}
              position={[0, 0.09, 0]}
            >
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.09, 0.008, 6, 20]} />
                <meshStandardMaterial
                  color={p.accent}
                  emissive={p.accent}
                  emissiveIntensity={0.5}
                  transparent
                  opacity={0.85}
                />
              </mesh>
              <mesh>
                <boxGeometry args={[0.16, 0.004, 0.03]} />
                <meshStandardMaterial color={p.metal} transparent opacity={0.6} />
              </mesh>
            </group>
          </group>
        ))}
        {/* thruster glow */}
        <mesh position={[0, -0.17, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.06, 0.1, 10]} />
          <meshStandardMaterial
            color={p.accent}
            emissive={p.accent}
            emissiveIntensity={1.1}
            transparent
            opacity={0.55}
            toneMapped={false}
          />
        </mesh>
      </group>

      {message && (
        <Html
          position={[0, 0.5, 0]}
          center
          style={{ pointerEvents: "none" }}
        >
          <div className="station-bubble">{message}</div>
        </Html>
      )}
    </group>
  );
}
