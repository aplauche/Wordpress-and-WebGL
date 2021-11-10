import Link from 'next/link'
import Gallery from "../components/Gallery"
import { Canvas, useFrame } from '@react-three/fiber'

export default function IndexPage() {

  return (
    <Canvas>
      <Gallery />
    </Canvas>
  )
}
