import React, { useRef, useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function KittyModel({ animationCall}:{animationCall:string}) {
  const group = useRef();
  const { nodes, materials } = useGLTF('./kitty.glb');
  const [targetRotation, setTargetRotation] = useState(0); // Target rotation value

  const neckBone = nodes.cat.skeleton.bones.find(bone => bone.name === 'MCH_neck');

  useFrame(() => {
    // Update bone rotation smoothly
    if (neckBone) {
      const delta = targetRotation - neckBone.rotation.y;
      const speed = 0.05; // Adjust the speed of the rotation
      neckBone.rotation.y += delta * speed;
    }
  });

  const startAnimation = (animationName:string, boneName: string, repetitions: number, speed: number) => {
    const bone = nodes.cat.skeleton.bones.find(bone => bone.name === boneName);
    if (!bone) return;

    if (animationName==="no") {
    const animate = (count) => {
      if (count <= 0) return; // Stop recursion when count reaches 0
      setTargetRotation(Math.PI / 20); // Rotate to one direction
      setTimeout(() => {
        setTargetRotation(-Math.PI / 20); // Rotate to the other direction
        setTimeout(() => {
          animate(count - 1); // Recursive call with reduced count
        }, 500);
      }, 500);
    };

    animate(repetitions);
  }
  };

  useEffect(() => {
    if (animationCall === "no"){
    startAnimation("no", 'MCH_neck', 2, 3); // Example: Start animation for 'MCH_neck' bone with 10 repetitions and speed 0.05
  }
  }, [animationCall]);

  const scale = 5;
  const rotationY = 0.2;

  return (
    <group position={[0, -2, 2]} ref={group} scale={[scale, scale, scale]} dispose={null} rotation={[0, rotationY, 0]}>
      <group name="Scene">
        <group name="Chibi_Cat" position={[-0.002, 0, 0]}>
          <primitive object={nodes.root} />
          <skinnedMesh name="cat" geometry={nodes.cat.geometry} material={materials.gato_material} skeleton={nodes.cat.skeleton} />
        </group>
        <group name="WGT_tailIK" position={[-0.072, 0, -0.021]} />
      </group>
    </group>
  );
}

useGLTF.preload('/kitty.glb');
