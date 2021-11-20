import Link from 'next/link'
import Gallery from "../components/Gallery"
import { Canvas, useFrame,  } from '@react-three/fiber'
import { Suspense, useState, useEffect, useRef } from 'react'
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
      <Gallery updateLocked={updateLocked} handleArtClick={handleArtClick} popupState={info.isOpen} artData={data.artData}/>
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
  // const res = await fetch(`https://.../data`)
  // const data = await res.json()

  // if (!data) {
  //   return {
  //     notFound: true,
  //   }
  // }
  const data = {
    artData: [
    {
        url: '/IMG_5322.JPG',
        title: 'Untitled',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget leo sed magna pulvinar scelerisque quis ac lacus. Nullam eu auctor arcu. Vivamus eu facilisis orci. Cras massa nunc, consequat nec egestas non, maximus in massa. Proin a dictum sem, id tempor leo. Phasellus a bibendum dolor. Ut gravida rhoncus risus, ut aliquam odio dapibus id. Aliquam at semper neque. Vivamus quis neque a velit commodo iaculis vitae quis leo.',
      },
      {
        url: '/IMG_5322.JPG',
        title: 'Untitled',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget leo sed magna pulvinar scelerisque quis ac lacus. Nullam eu auctor arcu. Vivamus eu facilisis orci. Cras massa nunc, consequat nec egestas non, maximus in massa. Proin a dictum sem, id tempor leo. Phasellus a bibendum dolor. Ut gravida rhoncus risus, ut aliquam odio dapibus id. Aliquam at semper neque. Vivamus quis neque a velit commodo iaculis vitae quis leo.',
      },
      {
        url: '/IMG_5322.JPG',
        title: 'Untitled',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget leo sed magna pulvinar scelerisque quis ac lacus. Nullam eu auctor arcu. Vivamus eu facilisis orci. Cras massa nunc, consequat nec egestas non, maximus in massa. Proin a dictum sem, id tempor leo. Phasellus a bibendum dolor. Ut gravida rhoncus risus, ut aliquam odio dapibus id. Aliquam at semper neque. Vivamus quis neque a velit commodo iaculis vitae quis leo.',
      },
      {
        url: '/IMG_5322.JPG',
        title: 'Untitled',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget leo sed magna pulvinar scelerisque quis ac lacus. Nullam eu auctor arcu. Vivamus eu facilisis orci. Cras massa nunc, consequat nec egestas non, maximus in massa. Proin a dictum sem, id tempor leo. Phasellus a bibendum dolor. Ut gravida rhoncus risus, ut aliquam odio dapibus id. Aliquam at semper neque. Vivamus quis neque a velit commodo iaculis vitae quis leo.',
      },
      {
        url: '/IMG_5322.JPG',
        title: 'Untitled',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget leo sed magna pulvinar scelerisque quis ac lacus. Nullam eu auctor arcu. Vivamus eu facilisis orci. Cras massa nunc, consequat nec egestas non, maximus in massa. Proin a dictum sem, id tempor leo. Phasellus a bibendum dolor. Ut gravida rhoncus risus, ut aliquam odio dapibus id. Aliquam at semper neque. Vivamus quis neque a velit commodo iaculis vitae quis leo.',
      },
      {
        url: '/IMG_5322.JPG',
        title: 'Untitled',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget leo sed magna pulvinar scelerisque quis ac lacus. Nullam eu auctor arcu. Vivamus eu facilisis orci. Cras massa nunc, consequat nec egestas non, maximus in massa. Proin a dictum sem, id tempor leo. Phasellus a bibendum dolor. Ut gravida rhoncus risus, ut aliquam odio dapibus id. Aliquam at semper neque. Vivamus quis neque a velit commodo iaculis vitae quis leo.',
      },
      {
        url: '/IMG_5322.JPG',
        title: 'Untitled',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget leo sed magna pulvinar scelerisque quis ac lacus. Nullam eu auctor arcu. Vivamus eu facilisis orci. Cras massa nunc, consequat nec egestas non, maximus in massa. Proin a dictum sem, id tempor leo. Phasellus a bibendum dolor. Ut gravida rhoncus risus, ut aliquam odio dapibus id. Aliquam at semper neque. Vivamus quis neque a velit commodo iaculis vitae quis leo.',
      },
      {
        url: '/IMG_5322.JPG',
        title: 'Untitled',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget leo sed magna pulvinar scelerisque quis ac lacus. Nullam eu auctor arcu. Vivamus eu facilisis orci. Cras massa nunc, consequat nec egestas non, maximus in massa. Proin a dictum sem, id tempor leo. Phasellus a bibendum dolor. Ut gravida rhoncus risus, ut aliquam odio dapibus id. Aliquam at semper neque. Vivamus quis neque a velit commodo iaculis vitae quis leo.',
      },
  
    ]
  }

  return {
    props: {
      data
    },
  }
}