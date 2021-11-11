import Link from 'next/link'
import Gallery from "../components/Gallery"
import { Canvas, useFrame,  } from '@react-three/fiber'
import { Suspense, useState, useEffect, useRef } from 'react'


export default function IndexPage() {

 
  const isLocked = useRef(false)
  // const controls = useRef()

  const updateLocked = (val) => {
    isLocked.current = val
  }

    // return (
    //   <Canvas raycaster={{
    //     computeOffsets: (_, { size: { width, height } }) => {
    //         return ({
    //           offsetX: width / 2,
    //           offsetY: height / 2
    //         })
    //     }
    //   }} camera={{position: [0, 0, 0], rotation: [0, Math.PI, 0]}} >
    //     <Gallery  handleLock={handleLock} />
    //   </Canvas>
    // )


  return (
    <Canvas raycaster={{
      computeOffsets: (_, { size: { width, height } }) => {
        if (isLocked.current) {
          return ({
            offsetX: width / 2,
            offsetY: height / 2
          })
        } else {
          return null;
        }
      }
    }} camera={{position: [0, 0, 0], rotation: [0, Math.PI, 0]}} >
      <Gallery updateLocked={updateLocked} />
    </Canvas>
  )

}
