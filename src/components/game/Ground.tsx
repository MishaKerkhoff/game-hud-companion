import { useMemo } from 'react';
import * as THREE from 'three';

export function Ground() {
  // Create scattered rocks/decorations
  const rocks = useMemo(() => {
    const items: { pos: [number, number, number]; scale: number }[] = [];
    for (let i = 0; i < 40; i++) {
      items.push({
        pos: [
          (Math.random() - 0.5) * 60,
          0.05,
          (Math.random() - 0.5) * 60,
        ],
        scale: 0.1 + Math.random() * 0.25,
      });
    }
    return items;
  }, []);

  const bushes = useMemo(() => {
    const items: { pos: [number, number, number]; scale: number }[] = [];
    for (let i = 0; i < 20; i++) {
      items.push({
        pos: [
          (Math.random() - 0.5) * 50,
          0.15,
          (Math.random() - 0.5) * 50,
        ],
        scale: 0.2 + Math.random() * 0.3,
      });
    }
    return items;
  }, []);

  return (
    <group>
      {/* Main ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshToonMaterial color="#4a7c59" />
      </mesh>

      {/* Darker ground patches for visual variety */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5, 0.005, 3]}>
        <circleGeometry args={[4, 16]} />
        <meshToonMaterial color="#3d6b4a" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-8, 0.005, -6]}>
        <circleGeometry args={[6, 16]} />
        <meshToonMaterial color="#3d6b4a" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[12, 0.005, -10]}>
        <circleGeometry args={[3, 16]} />
        <meshToonMaterial color="#3d6b4a" />
      </mesh>

      {/* Grid lines for visual depth */}
      <gridHelper args={[80, 40, '#5a8c69', '#5a8c69']} position={[0, 0.01, 0]}>
        <lineBasicMaterial transparent opacity={0.15} />
      </gridHelper>

      {/* Rocks */}
      {rocks.map((rock, i) => (
        <mesh key={`rock-${i}`} position={rock.pos} castShadow>
          <dodecahedronGeometry args={[rock.scale, 0]} />
          <meshToonMaterial color="#6b7280" />
        </mesh>
      ))}

      {/* Bushes */}
      {bushes.map((bush, i) => (
        <mesh key={`bush-${i}`} position={bush.pos} castShadow>
          <sphereGeometry args={[bush.scale, 8, 8]} />
          <meshToonMaterial color="#2d5a3f" />
        </mesh>
      ))}
    </group>
  );
}
