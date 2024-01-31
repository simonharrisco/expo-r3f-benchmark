import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useGraph, useFrame } from "@react-three/fiber/native";
import {
  useGLTF,
  useTexture,
  Detailed,
  OrbitControls,
} from "@react-three/drei/native";
import { SkeletonUtils } from "three/examples/jsm/utils/SkeletonUtils";
import { extend } from "@react-three/fiber";
import { Plane } from "@react-three/drei/native";

import modelPath from "./Duck.glb";
// import newModelPath from "./s2wt_kamdo_industrial_divinities-transformed.glb";

import Duck from "./models/Duck";
import DamagedHelmet from "./models/DamagedHelmet";
import Flair from "./models/Flair";
import { Vector3 } from "three";

function Model() {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} />;
}

const NUM_COPIES = 10; // Number of copies you want

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += delta));
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      onPointerOut={(event) => hover(false)}
      castShadow={true}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} castShadow />
    </mesh>
  );
}

export default function App() {
  return (
    <Canvas
      camera={{ position: [0, 3, 5] }}
      shadows={true}
      onCreated={(state) => {
        const _gl = state.gl.getContext();
        const pixelStorei = _gl.pixelStorei.bind(_gl);
        _gl.pixelStorei = function (...args) {
          const [parameter] = args;
          switch (parameter) {
            case _gl.UNPACK_FLIP_Y_WEBGL:
              return pixelStorei(...args);
          }
        };
      }}
    >
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 20]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
        castShadow={true}
      />
      <pointLight
        position={[-10, -10, 3]}
        decay={0}
        intensity={Math.PI}
        castShadow={true}
      />
      <Box position={[-1.2, 0, 3]} scale={[0.5, 0.5, 0.5]} />
      <Box position={[1.2, 0, 3]} scale={[0.5, 0.5, 0.5]} />
      <Suspense fallback={null}>
        {/* <Model /> */}
        <DamagedHelmet position={[0, 0, 3]} scale={[0.4, 0.4, 0.4]} />
        {/* <Duck /> */}
      </Suspense>
      <Suspense fallback={null}>
        <Flair />
      </Suspense>
      <Suspense>
        <Flair position={[0, 0, 0]} />
      </Suspense>
      {/* add a floor  */}
      <Plane
        args={[100, 100]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow={true}
      >
        <meshStandardMaterial color="lightgray" receiveShadow={true} />
      </Plane>
      {/* <OrbitControls /> */}
    </Canvas>
  );
}
