import { Sky, Cloud } from "@react-three/drei";

const Background = () => {
    return (
        <>
            {/* Sky */}
            <Sky distance={450000} sunPosition={[0, 1, 0]} azimuth={0.25} inclination={0.6} />

            {/* Clouds */}
            <Cloud position={[-10, 10, -20]} scale={1.5} />
            <Cloud position={[10, 20, -40]} scale={2} />
        </>
    );
};


export default Background;
