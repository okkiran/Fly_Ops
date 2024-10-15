import { useFrame } from "@react-three/fiber";
import { CatmullRomCurve3, Vector3 } from "three";
import React, { useRef, forwardRef } from "react";
import { useGLTF, Float } from "@react-three/drei";
import * as THREE from "three";

const Airplane = forwardRef(({ scrollProgress }, ref) => {
    const { nodes, materials } = useGLTF("./models/Airplane.glb");
    const airplaneRef = useRef();

    // Define the path using CatmullRomCurve3
    const path = new CatmullRomCurve3([
        new THREE.Vector3(0, 0, -100),
        new THREE.Vector3(0, 0, -200),
        new THREE.Vector3(0, 0, -300),
        new THREE.Vector3(0, 0, -400),
    ]);

    // Update the airplane's position along the path based on scrollProgress
    useFrame(() => {
        const pointOnPath = path.getPointAt(scrollProgress);
        airplaneRef.current.position.copy(pointOnPath);

        const tangent = path.getTangentAt(scrollProgress).normalize();
        airplaneRef.current.lookAt(pointOnPath.clone().add(tangent));
    });

    return (
        <group ref={airplaneRef} scale={[0.1, 0.1, 0.1]}>
            <Float floatIntensity={1.5} speed={1.5} rotationIntensity={1}>
                <mesh geometry={nodes.Boeing_787_8obj2.children[0].geometry} material={materials["Mat"]} />
                <mesh geometry={nodes.Boeing_787_8obj2.children[1].geometry} material={materials["Mat.1"]} />
            </Float>
        </group>
    );
});

useGLTF.preload("./models/Airplane.glb");

export { Airplane };
