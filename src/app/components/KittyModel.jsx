import React, { useRef, useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { MathUtils, Vector3 } from 'three'; // Import MathUtils from Three.js


export default function KittyModel({ animationCall, textCoordinates, typing, setAnimationCall }) {
  const group = useRef();
  const { nodes, materials } = useGLTF('./kitty.glb');
  const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0 }); // Target rotation values

  const headBone = nodes.cat.skeleton.bones.find(bone => bone.name === 'MCH_head'); // Replace 'MCH_head' with the actual name of the head bone
  const backBone = nodes.cat.skeleton.bones.find(bone => bone.name === 'MCH_back004');

  if (headBone && typing) {
    setAnimationCall("unfollow")
    setAnimationCall("typing")
  } else if (headBone && !typing) {
    setAnimationCall("follow")
  }
useEffect(() => {
    if (typing) {
      console.log(textCoordinates)
    const minRotationX = 1;
    const maxRotationX = -1;
   
    const lettersPerLine = 61; // Number of letters per line

const remainder = (textCoordinates - 1) % lettersPerLine;

// Calculate mappedRotationX based on the totalLines and remainder
const mappedRotationX = MathUtils.mapLinear(remainder, 0, lettersPerLine - 1, minRotationX, maxRotationX);

    
    setTargetRotation({ y: mappedRotationX, x: -2 });
}
}, [textCoordinates])

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
    let cursorY = -(e.clientY / window.innerHeight) * 3 + 0.5;





    // Calculate the direction vector from the head to the cursor
    const direction = new Vector3(cursorX, cursorY, 0).sub(headBone.position);
    direction.normalize();
  
    // Calculate the angles for rotation and negate them
    let yawAngle = -Math.atan2(direction.x, direction.z);
    let pitchAngle = -Math.atan2(-direction.y, Math.sqrt(direction.x * direction.x + direction.z * direction.z));
    let minPitch
    let maxPitch
    if (cursorY >= -2) {
    // Define rotation limits (in radians)
    minPitch = -5; // Minimum pitch angle
    maxPitch = -1;  // Maximum pitch angle
    }
    else {
      minPitch = -50
      maxPitch = -2
    }
    let minYaw
    let maxYaw
    if (cursorX > -0.3 && cursorX < 0.3) {
    minYaw = -0.2;    // Minimum yaw angle
   maxYaw = 0.2;     // Maximum yaw angle
  } else {
    minYaw = -1
    maxYaw = 1
  }
  console.log(minYaw, maxYaw)
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
    } else if (animationCall === "unfollow") {
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
    if (backBone && animationCall === "sit") {
      const backBoneRotationY = -0.5; // Adjust the desired Y-axis rotation
      backBone.rotation.x = backBoneRotationY;
      headBone.rotation.x = -2.5
      headBone.rotation.y = 0
      // Rotate it back to normal after 2 seconds
      setTimeout(() => {
        console.log(backBone.rotation.x)
        if (backBone) {
          backBone.rotation.x = -1.5869743022867884;
        }
      }, 2000); // 2000 milliseconds = 2 seconds
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
