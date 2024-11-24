import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';

export function Viewer3D() {
  return (
    <div className="w-full h-full">
      <Canvas shadows>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[5, 5, 5]} />
          <OrbitControls enableDamping />
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <mesh receiveShadow castShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#ff0000" />
          </mesh>
          <gridHelper args={[10, 10]} />
        </Suspense>
      </Canvas>
    </div>
  );
}