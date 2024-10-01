import {Sphere} from "@react-three/drei";
import {Gradient, LayerMaterial} from "lamina";
import * as THREE from "three";

export const Background = () => {
    return (
        <Sphere scale={[100, 100, 100]} rotation-y={Math.PI / 2}>
            <LayerMaterial
                lighting="physical"
                transparent={1}
                side={THREE.BackSide}>
                <Gradient colorA={"#44596e"} colorB={"white"} axes={"y"} start={0} end={-0.5}/>
            </LayerMaterial>
        </Sphere>
    );
};