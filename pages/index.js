import Link from 'next/link'
import Gallery from "../components/Gallery"
import { Canvas, useFrame } from '@react-three/fiber'

export default function IndexPage() {

  return (
    <Canvas camera={{position: [0, 0, 0], rotation: [0, Math.PI, 0]}} >
      <Gallery />
    </Canvas>
  )
}
