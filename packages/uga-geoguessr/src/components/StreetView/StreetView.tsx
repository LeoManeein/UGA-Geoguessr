import { Canvas, useLoader } from "@react-three/fiber";
import {
  CameraControls,
  // PerspectiveCamera,
  // useTexture,
} from "@react-three/drei";
import { Suspense } from "react";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { BackSide } from "three";
import StreetViewCSS from "./StreetView.module.css";

interface StreetViewProps {
  image: string;
}

const Scene: React.FC<StreetViewProps> = ({ image }) => {
  const colormap = useLoader(TextureLoader, image);
  return (
    <>
      <CameraControls maxDistance={0} />

      {/* <PerspectiveCamera
        fov={100}
        args={[75, 1920 / 1080, 41, 1100]}
      ></PerspectiveCamera> */}
      <mesh scale={[-1, 1, 1]}>
        <sphereGeometry args={[500, 60, 40]}></sphereGeometry>

        <meshBasicMaterial map={colormap} side={BackSide}></meshBasicMaterial>
      </mesh>
    </>
  );
};


const StreetView: React.FC<StreetViewProps> = ({ image }) => {
  return (
    // <Canvas camera={{ position: [0, 0, 0], fov: 90 }}>
    //   <CameraControls makeDefault></CameraControls>
    //   <Suspense fallback={null}>
    //     <Scene></Scene>
    //   </Suspense>
    // </Canvas>
    <div className={StreetViewCSS.div}>
      <Suspense fallback={<div>Hi</div>}>
        <Canvas linear>
          <Suspense fallback={null}>
            <Scene image={image} />
          </Suspense>
        </Canvas>
      </Suspense>
    </div>
  );
};

export default StreetView;
