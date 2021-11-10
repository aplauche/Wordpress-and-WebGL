
import {  Image, Box as NativeBox} from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'



export default ({url, number}) => {


    return(
        <group>
            <NativeBox
            args={[12, 12, 2]}
            position={[number*20,0,2.51]}
            >
            <meshStandardMaterial
                attach="material"
                color={'white'}
            />
            </NativeBox>
            <Image  scale={[10,10,1]} position={[number*20,0,3.52]} url={url} />
        </group>
    )

}