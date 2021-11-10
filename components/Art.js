
import {  Image, Box as NativeBox} from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'



export default ({url, number, vectors}) => {

    const rotate = null;

    if(number == 0){
        rotate=[0, - Math.PI / 2 , 0]
    } else {
        rotate = [0,0,0]
    }

    return(
        <group rotation={vectors.rotation} position={vectors.position}>
            <NativeBox
            args={[12, 12, 2]}
            
            >
            <meshStandardMaterial
                attach="material"
                color={'white'}
            />
            </NativeBox>
            <Image  scale={[10,10,1]} position={[0,0,1.1]} url={url} />
        </group>
    )

}