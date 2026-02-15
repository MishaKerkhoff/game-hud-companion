import { useRef, useEffect, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface UseCharacterMovementOptions {
  speed?: number;
  isPaused?: boolean;
  joystickVector?: { x: number; z: number };
}

export function useCharacterMovement({
  speed = 5,
  isPaused = false,
  joystickVector,
}: UseCharacterMovementOptions = {}) {
  const positionRef = useRef(new THREE.Vector3(0, 0, 0));
  const rotationRef = useRef(0);
  const isMovingRef = useRef(false);
  const keysRef = useRef<Set<string>>(new Set());
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(e.key.toLowerCase())) {
        keysRef.current.add(e.key.toLowerCase());
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key.toLowerCase());
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  useFrame((_, delta) => {
    if (isPaused) {
      isMovingRef.current = false;
      return;
    }

    const dir = new THREE.Vector3(0, 0, 0);
    const keys = keysRef.current;

    // Keyboard input
    if (keys.has('w') || keys.has('arrowup')) dir.z -= 1;
    if (keys.has('s') || keys.has('arrowdown')) dir.z += 1;
    if (keys.has('a') || keys.has('arrowleft')) dir.x -= 1;
    if (keys.has('d') || keys.has('arrowright')) dir.x += 1;

    // Joystick input (additive)
    if (joystickVector) {
      dir.x += joystickVector.x;
      dir.z += joystickVector.z;
    }

    if (dir.length() > 0.01) {
      dir.normalize();
      positionRef.current.x += dir.x * speed * delta;
      positionRef.current.z += dir.z * speed * delta;
      rotationRef.current = Math.atan2(dir.x, -dir.z);
      isMovingRef.current = true;
    } else {
      isMovingRef.current = false;
    }

    if (groupRef.current) {
      groupRef.current.position.copy(positionRef.current);
      groupRef.current.rotation.y = rotationRef.current;
    }
  });

  return { groupRef, positionRef, rotationRef, isMovingRef };
}
