
import {  Image, Box as NativeBox} from '@react-three/drei'
import { useRef, useState, useContext } from 'react'
import * as THREE from 'three'


export default function Art({picture, number, vectors, handleArtClick}){

    const {url, title, description} = picture
    // const {info, setInfo} = useContext(AppContext);
    const [hover, setHover] = useState(false)
 



    const handleClick = () => {
        setHover(!hover)
        // setInfo({
        //     isOpen: !info.isOpen,
        //     title: "test",
        //     content: "lorem ipsum"
        // })
    }

    return(
        <>
            <group rotation={vectors.rotation} position={vectors.position}>
                <NativeBox
                args={[12, 12, 2]}
                onClick={()=> handleArtClick(picture)}
                >
                    <meshStandardMaterial
                        attach="material"
                        color={hover ? 'white' : '#999'}
                    />
                </NativeBox>
                <Image  scale={[10,10,1]} position={[0,0,1.1]} url={url} />
            </group>

        </>
    )

}