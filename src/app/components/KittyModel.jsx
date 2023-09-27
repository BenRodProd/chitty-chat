import React, { useRef, useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { MathUtils, Vector3 } from 'three'; // Import MathUtils from Three.js

export default function KittyModel({ animationCall }) {
  const group = useRef();
  const { nodes, materials } = useGLTF('./kitty.glb');
  const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0 }); // Target rotation values

  const headBone = nodes.cat.skeleton.bones.find(bone => bone.name === 'MCH_head'); // Replace 'MCH_head' with the actual name of the head bone

  const startAnimation = (animationName, boneName, repetitions, speed) => {
    const bone = nodes.cat.skeleton.bones.find(bone => bone.name === boneName);
    if (!bone) return;

    if (animationName === "no") {
      const animate = (count) => {
        if (count <= 0) return; // Stop recursion when count reaches 0
        setTargetRotation(prevRotation => ({
          ...prevRotation,
          x: prevRotation.x + (Math.PI / 20),
        })); // Add a small rotation
        setTimeout(() => {
          setTargetRotation(prevRotation => ({
            ...prevRotation,
            x: prevRotation.x - (Math.PI / 20),
          })); // Add the opposite rotation
          setTimeout(() => {
            animate(count - 1); // Recursive call with reduced count
          }, 500);
        }, 500);
      };

      animate(repetitions);
    }
  };

  const rotateHeadToCursor = (e) => {
    if (!headBone) return;
  
    const cursorX = (e.clientX / window.innerWidth) * 2 - 1;
    const cursorY = -(e.clientY / window.innerHeight) * 2 + 1;
  console.log(cursorX, cursorY)
    // Calculate the direction vector from the head to the cursor
    const direction = new Vector3(cursorX, cursorY, 0).sub(headBone.position);
    direction.normalize();
  
    // Calculate the angles for rotation and negate them
    let yawAngle = -Math.atan2(direction.x, direction.z);
    let pitchAngle = -Math.atan2(-direction.y, Math.sqrt(direction.x * direction.x + direction.z * direction.z));
  
    // Define rotation limits (in radians)
    const minPitch = -5000; // Minimum pitch angle
    const maxPitch = -1;  // Maximum pitch angle
  
    const minYaw = -2;    // Minimum yaw angle
    const maxYaw = 2;     // Maximum yaw angle
  
    // Clamp the pitch and yaw angles within the defined limits
    pitchAngle = Math.max(minPitch, Math.min(maxPitch, pitchAngle));
    yawAngle = Math.max(minYaw, Math.min(maxYaw, yawAngle));
  
    // Set the target rotation angles for the head bone
    setTargetRotation({
      x: pitchAngle,
      y: yawAngle,
    });
  };
  

  useEffect(() => {
    if (animationCall === "no") {
      startAnimation("no", 'MCH_neck', 2, 3);
    }
  }, [animationCall]);

  useEffect(() => {
    if (animationCall === "follow") {
      document.addEventListener('mousemove', rotateHeadToCursor);
    } else {
      document.removeEventListener('mousemove', rotateHeadToCursor);
    }

    return () => {
      // Clean up the event listener when the component unmounts or when the animationCall changes
      document.removeEventListener('mousemove', rotateHeadToCursor);
    };
  }, [animationCall]);

  useFrame(() => {
    // Interpolate the head rotation towards the target rotation
    if (headBone) {
      headBone.rotation.x = MathUtils.lerp(headBone.rotation.x, targetRotation.x, 0.01); // Adjust the interpolation factor (0.01) for smoother or quicker movement
      headBone.rotation.y = MathUtils.lerp(headBone.rotation.y, targetRotation.y, 0.01); // Adjust the interpolation factor (0.01) for smoother or quicker movement
    }
  });

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
