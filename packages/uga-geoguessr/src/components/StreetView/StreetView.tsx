import { Canvas, useLoader } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
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

			<mesh scale={[-1, 1, 1]}>
				<sphereGeometry args={[500, 60, 40]}></sphereGeometry>

				<meshBasicMaterial map={colormap} side={BackSide}></meshBasicMaterial>
			</mesh>
		</>
	);
};

/**
 * StreetView is a React component for displaying street view images.
 *
 * ThreeJS is a library that can be used to render 3d stuff in the browser using WebGL.
 * We're using ThreeJS Fiber to convert the basic html three into react components.
 * React-Drei is used to extend some of the functionality of fiber by adding in things like camera controls.
 *
 * The 2-1 panorama is mapped onto a sphere, and the sphere is then inverted. Placing a camera inside of that sphere will give the illusion the user is actually in a normal three dimensional view.
 *
 * @param {StreetViewProps} image - A string to the absolute path of the 2-1 panoramic image that will be used to display the street view
 * @returns {JSX.Element} A React JSX element.
 */
const StreetView: React.FC<StreetViewProps> = ({ image }) => {
	return (
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
