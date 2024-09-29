import {useGLTF} from "@react-three/drei";
import React from "react";

export function Airplane(props) {
    const {nodes, materials} = useGLTF("./models/Airplane.glb");

    return (
        <group {...props} dispose={null} scale={[0.02, 0.02, 0.02]}> {/* Adjust scale here */}
            <mesh geometry={nodes.Boeing_787_8obj2.children[0].geometry} material={materials["Mat"]}/>
            <mesh geometry={nodes.Boeing_787_8obj2.children[1].geometry} material={materials["Mat.1"]}/>
        </group>
    );
}

useGLTF.preload("./models/Airplane.glb");