import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function KittyModel(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('./kitty.glb')


  const scale= 5
  const rotationY=0.2
  return (
    <group position={[0,-2,2]} ref={group} scale={[scale, scale, scale]} {...props} dispose={null} rotation={[0, rotationY, 0]}>
      <group name="Scene">
        <group name="Chibi_Cat" position={[-0.002, 0, 0]} >
          <primitive object={nodes.root} />
          <skinnedMesh name="cat" geometry={nodes.cat.geometry} material={materials.gato_material} skeleton={nodes.cat.skeleton} />
        </group>
         <group name="WGT_tailIK" position={[-0.072, 0, -0.021]} /> 
      </group>
    </group>
  )
}

useGLTF.preload('/kitty.glb')
