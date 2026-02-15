import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCharacterMovement } from '@/hooks/useCharacterMovement';

interface CharacterProps {
  isPaused?: boolean;
  joystickVector?: { x: number; z: number };
  onPositionUpdate?: (pos: THREE.Vector3) => void;
}

export function Character({ isPaused, joystickVector, onPositionUpdate }: CharacterProps) {
  const { groupRef, positionRef, isMovingRef } = useCharacterMovement({
    speed: 5,
    isPaused,
    joystickVector,
  });

  const bodyRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;

    // Bobbing animation
    const bobSpeed = isMovingRef.current ? 10 : 2;
    const bobAmount = isMovingRef.current ? 0.08 : 0.03;
    const bob = Math.sin(timeRef.current * bobSpeed) * bobAmount;

    if (bodyRef.current) {
      bodyRef.current.position.y = 0.4 + bob;
    }
    if (headRef.current) {
      headRef.current.position.y = 0.95 + bob * 1.2;
    }

    // Report position for camera follow
    if (onPositionUpdate) {
      onPositionUpdate(positionRef.current);
    }
  });

  return (
    <group ref={groupRef} castShadow>
      {/* Body - cylinder */}
      <mesh ref={bodyRef} position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.3, 0.6, 12]} />
        <meshToonMaterial color="#3b82f6" />
      </mesh>

      {/* Head - sphere */}
      <mesh ref={headRef} position={[0, 0.95, 0]} castShadow>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshToonMaterial color="#fbbf24" />
      </mesh>

      {/* Left eye */}
      <mesh position={[-0.08, 1.0, -0.18]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#1a1a2e" />
      </mesh>

      {/* Right eye */}
      <mesh position={[0.08, 1.0, -0.18]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#1a1a2e" />
      </mesh>

      {/* Shadow blob on ground */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.3, 16]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}
