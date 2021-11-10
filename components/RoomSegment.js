import { Box as NativeBox } from '@react-three/drei'

import Art from './Art'

import * as THREE from 'three'

import { Suspense, useState, useEffect, useRef } from 'react'

export default ({number, pictures}) => {

    const length = 75
    const gap = 20
  

    const translateSides = length + (gap / 2)
    const translateLongSides = translateSides - (length / 2)

    const artPositions = [
        {position: [translateSides -2.5, 0, 25], rotation: [0, -Math.PI / 2, 0]},
        {position: [translateSides - 50, 0, 48], rotation: [0, Math.PI, 0]},
        {position: [translateSides - 25, 0, 48], rotation: [0, Math.PI, 0]},
        {position: [-translateSides + 50, 0, 48], rotation: [0, Math.PI, 0]},
        {position: [-translateSides + 25, 0, 48], rotation: [0, Math.PI, 0]},
        {position: [-translateSides +2.5 , 0, 25], rotation: [0, Math.PI/2, 0]},
  
    ]

    return (
        <>
        <group position={[0,0, number * 55]}>
            <Suspense fallback={null}>
            {pictures.map((picture, idx) => (
                <Art key={idx} vectors={artPositions[idx]} number={idx} url={picture.url}/>
            ))}
             </Suspense> 
            <NativeBox
                args={[50, 20, 5]}
                position={[translateSides,0,25]}
                rotation={[0, Math.PI / 2, 0 ]}
                >
                <meshStandardMaterial
                    attach="material"
                    color={'#888888'}
                />
            </NativeBox>
            <NativeBox
                args={[50, 20, 5]}
                position={[-translateSides,0,25]}
                rotation={[0, Math.PI / 2, 0 ]}
                >
                <meshStandardMaterial
                    attach="material"
                    color={'#888888'}
                />
            </NativeBox>
            <NativeBox
                args={[length, 20, 5]}
                position={[-translateLongSides,0,50]}
                >
                <meshStandardMaterial
                    attach="material"
                    color={'#888888'}
                />
            </NativeBox>
            <NativeBox
                args={[length, 20, 5]}
                position={[translateLongSides,0,50]}
                >
                <meshStandardMaterial
                    attach="material"
                    color={'#888888'}
                />
            </NativeBox>
            <NativeBox
                args={[length, 20, 5]}
                position={[-translateLongSides,0,0]}
                >
                <meshStandardMaterial
                    attach="material"
                    color={'#888888'}
                />
            </NativeBox>
            <NativeBox
                args={[length, 20, 5]}
                position={[translateLongSides,0,0]}
                >
                <meshStandardMaterial
                    attach="material"
                    color={'#888888'}
                />
            </NativeBox>
        </group>

        </>
    )
}