/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 DamagedHelmet.glb
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei/native";
import modelPath from "./DamagedHelmet.glb";

export default function DamagedHelmet(props) {
  const { nodes, materials } = useGLTF(modelPath);
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes["node_damagedHelmet_-6514"].geometry}
        material={materials.Material_MR}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

// useGLTF.preload('/DamagedHelmet.glb')
