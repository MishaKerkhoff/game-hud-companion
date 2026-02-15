import { useRef, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import * as THREE from 'three';
import { Character } from './Character';
import { Ground } from './Ground';

interface CameraFollowProps {
  targetRef: React.MutableRefObject<THREE.Vector3>;
}

function CameraFollow({ targetRef }: CameraFollowProps) {
  useFrame(({ camera }) => {
    const target = targetRef.current;
    // Camera offset: above and behind, tilted ~55 degrees
    const offset = new THREE.Vector3(0, 12, 10);
    const desiredPos = new THREE.Vector3(
      target.x + offset.x,
      offset.y,
      target.z + offset.z,
    );
    camera.position.lerp(desiredPos, 0.05);
    camera.lookAt(target.x, 0, target.z);
  });
  return null;
}

interface GameSceneProps {
  isPaused?: boolean;
  joystickVector?: { x: number; z: number };
}

export function GameScene({ isPaused, joystickVector }: GameSceneProps) {
  const charPosRef = useRef(new THREE.Vector3(0, 0, 0));

  const handlePositionUpdate = useCallback((pos: THREE.Vector3) => {
    charPosRef.current.copy(pos);
  }, []);

  return (
    <div className="absolute inset-0" style={{ zIndex: 0 }}>
      <Canvas shadows>
        <OrthographicCamera
          makeDefault
          zoom={50}
          position={[0, 12, 10]}
          near={0.1}
          far={200}
        />
        <CameraFollow targetRef={charPosRef} />

        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 15, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={60}
          shadow-camera-left={-30}
          shadow-camera-right={30}
          shadow-camera-top={30}
          shadow-camera-bottom={-30}
        />

        {/* Sky color */}
        <color attach="background" args={['#87ceeb']} />
        <fog attach="fog" args={['#87ceeb', 30, 60]} />

        <Ground />
        <Character
          isPaused={isPaused}
          joystickVector={joystickVector}
          onPositionUpdate={handlePositionUpdate}
        />
      </Canvas>
    </div>
  );
}
