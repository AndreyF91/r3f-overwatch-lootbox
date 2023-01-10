import { useEffect, useRef, useState } from "react";

import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { LoopOnce, Mesh } from "three";

import * as THREE from "three";
import { PerspectiveCamera, useAnimations } from "@react-three/drei";

export default function Model({ isActive, setLoaded }) {
  const group = useRef();
  const gltf = useLoader(GLTFLoader, "/lootbox1.glb");

  useEffect(() => {
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
    setLoaded(true);
  }, [gltf]);

  let mixer;
  if (gltf.animations.length && isActive) {
    mixer = new THREE.AnimationMixer(gltf.scene);
    gltf.animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.setLoop(LoopOnce);
      action.clampWhenFinished = true;
      action.play();
    });
  }
  useFrame((state, delta) => {
    mixer?.update(delta);
  });

  const pos = [-8, 5, 10];

  console.log(gltf);
  return (
    <>
      <PerspectiveCamera ref={group} name="Camera" makeDefault fov={50} position={pos} />
      <spotLight
        color={[1, 1, 1]}
        position={[-6, 8, 2]}
        intensity={4}
        castShadow
      />
      <spotLight color={[1, 1, 1]} position={[0, 5, -3]} intensity={1} />
      <ambientLight
        color={[0.1, 0.3, 0.6]}
        position={[0, 0, -8]}
        intensity={1}
      />
      <color args={[0.1, 0.3, 0.6]} attach="background" />
      <primitive ref={group} object={gltf.scene} />;
    </>
  );
}
