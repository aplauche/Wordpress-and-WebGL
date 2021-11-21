import Link from 'next/link'
import Gallery from "../components/Gallery"
import { Canvas } from '@react-three/fiber'
import { useRef } from 'react'
import { useAppContext } from '../data/AppContext'
import Popup from '../components/Popup'
import Target from '../components/Target'

export default function IndexPage({data}) {

  const {info, setInfo} = useAppContext()

  const isLocked = useRef(false)

  const updateLocked = (val) => {
    isLocked.current = val

    if(val == true){
      setInfo(
        {
          isOpen: false,
          title: null,
          content: null,
          url: null
        }
      )
    }
  }

  const handleArtClick = (picture) => {
    setInfo(
      {
        isOpen: !info.isOpen,
        title: picture.title,
        content: picture.description,
        url: picture.url
        
      }
    )
  }

  return (
    <>
    <Canvas 
      raycaster={{
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
      }} 
      camera={{position: [0, 0, 0], rotation: [0, Math.PI, 0]}} 
    >
      <Gallery updateLocked={updateLocked} handleArtClick={handleArtClick} popupState={info.isOpen} artData={data}/>
    </Canvas>

    {isLocked.current && (
      <Target />
    )}
    {info.isOpen && (   
      <Popup info={info} />
    )}

    </>
  )

}


export async function getStaticProps() {
  const res = await fetch(`http://webgl-backend.local/wp-json/wp/v2/posts`)
  const json = await res.json()

  const imageReq = await fetch(`http://webgl-backend.local/wp-json/wp/v2/media`)
  const imageJson = await imageReq.json()


  const data = json.map((post) => {

    const image = imageJson.filter(item =>{
      return item.id === post.featured_media
    })

    return {
      url: `/uploads/${image[0]['media_details'].file}`,
      title: post.title.rendered,
      description: post.content.rendered
    }
  })

  return {
    props: {
      data
    },
  }
}