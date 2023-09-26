import { Canvas, useLoader } from '@react-three/fiber';
import KittyModel from '../../../public/assets/kitty/KittyModel';





const Kitty = () => {
  return (
    <Canvas style={{ width: '100%', height: '100vh' }}>
        
        <ambientLight intensity={0.5} />
        <directionalLight intensity={0.8} position={[5, 5, 5]} />
      <KittyModel />
    </Canvas>
  );
};

export default Kitty;
