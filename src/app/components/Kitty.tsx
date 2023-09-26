import { Canvas, useLoader } from '@react-three/fiber';
import KittyModel from '../../../public/assets/kitty/KittyModel';
import styled from 'styled-components';
import { OrbitControls } from '@react-three/drei';

const CanvasPlacement = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

z-index:-15;
`




const Kitty = ({animationCall}:{animationCall:string}) => {
  return (
    <CanvasPlacement>
    <Canvas style={{ width: '100%', height: '100%' }}>
      <OrbitControls />
        
        <ambientLight intensity={0.5} />
        <directionalLight intensity={0.8} position={[5, 5, 5]} />
      <KittyModel animationCall={animationCall}/>
    </Canvas>
    </CanvasPlacement>
  );
};

export default Kitty;
