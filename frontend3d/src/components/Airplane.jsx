import { useFrame } from "@react-three/fiber";
import { CatmullRomCurve3, Vector3 } from "three";
import React, { useRef } from "react";
import { useGLTF, Float } from "@react-three/drei";
import * as THREE from "three";

export function Airplane({ scrollProgress, ...props }) {
    const { nodes, materials } = useGLTF("./models/Airplane.glb");
    const airplaneRef = useRef();
    const CURVE_DISTANCE = 100;

    // Define the path using CatmullRomCurve3
    const path = new CatmullRomCurve3([
        new THREE.Vector3(-80, 0, -100),
        new THREE.Vector3(0, 0, -CURVE_DISTANCE),
        new THREE.Vector3(150, 0, -2 * CURVE_DISTANCE),
        new THREE.Vector3(-150, 0, -3 * CURVE_DISTANCE),
        new THREE.Vector3(150, 0, -4 * CURVE_DISTANCE),
        new THREE.Vector3(0, 0, -5 * CURVE_DISTANCE),
        new THREE.Vector3(0, 0, -6 * CURVE_DISTANCE),
        new THREE.Vector3(0, 0, -7 * CURVE_DISTANCE),
    ]);

    // Update the airplane's position along the path based on scrollProgress
    useFrame(() => {
        const pointOnPath = path.getPointAt(scrollProgress); // Get the point on the path at scroll progress

        // Move airplane to the point on the path
        airplaneRef.current.position.copy(pointOnPath);

        const tangent = path.getTangentAt(scrollProgress).normalize(); // Calculate direction
        airplaneRef.current.lookAt(pointOnPath.clone().add(tangent)); // Make airplane look ahead
    });

    return (

    <group ref={airplaneRef} {...props} scale={[0.2, 0.2, 0.2]} position={[0, 0.1, 0]}>
        <Float floatIntensity={1.5} speed={1.5} rotationIntensity={0.5}>
            <mesh geometry={nodes.Boeing_787_8obj2.children[0].geometry} material={materials["Mat"]}/>
            <mesh geometry={nodes.Boeing_787_8obj2.children[1].geometry} material={materials["Mat.1"]}/>
        </Float>
    </group>

);
}

useGLTF.preload("./models/Airplane.glb");
