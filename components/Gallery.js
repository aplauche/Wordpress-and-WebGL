import {useFrame } from '@react-three/fiber'
import {PointerLockControls, Plane, Sky } from '@react-three/drei'
// import pictures from '../data/artData'
import * as THREE from 'three'

import RoomSegment from './RoomSegment'
import { useState, useEffect, useRef } from 'react'

export default function Gallery({updateLocked, handleArtClick, popupState, artData}) {

  const [moveForward, setMoveForward] = useState(false)
  const [moveBackward, setMoveBackward] = useState(false)
  const [moveLeft, setMoveLeft] = useState(false)
  const [moveRight, setMoveRight] = useState(false)

  const isPopupOpen = popupState

  useEffect(()=>{
    if(isPopupOpen){
      controls.current.unlock()
    }
  }, [isPopupOpen])

  const controls = useRef()

  const velocity = new THREE.Vector3();
	const direction = new THREE.Vector3();

  const roomSize = 6

  const rooms = []

  for (let i = 0; i < artData.length; i += roomSize){
    rooms.push(artData.slice(i, i + roomSize));
  }


  useFrame((state, delta) => {

    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    var rotationMatrix;
    var rayCaster;
    var cameraDirection = controls.current.getDirection(new THREE.Vector3(0, 0, 0)).clone();

    direction.z = Number( moveForward ) - Number( moveBackward );
    direction.x = Number( moveRight ) - Number( moveLeft );
    direction.normalize(); // this ensures consistent movements in all directions

    const checkForCollision = (movementAxis, angleModifier) => {
      if(angleModifier){
        rotationMatrix = new THREE.Matrix4();
        rotationMatrix.makeRotationY(angleModifier * Math.PI / 180);
        cameraDirection.applyMatrix4(rotationMatrix);
      }
      rayCaster = new THREE.Raycaster(controls.current.getObject().position, cameraDirection); 
      const intersects = rayCaster.intersectObjects( state.scene.children, true );
      // console.log(intersects);
      if(intersects.length == 0 || intersects[0].distance > 10){
        
        velocity[movementAxis] -= direction[movementAxis] * 400.0 * delta;
      }
    }

    if ( moveForward ){
      checkForCollision("z", null)
    } 

    if ( moveBackward ){
      checkForCollision("z", 180)
    } 

    if ( moveLeft ){
      checkForCollision("x", 90)
    } 

    if ( moveRight ){
      checkForCollision("x", 270)
    } 

    controls.current.moveRight( - velocity.x * delta );
		controls.current.moveForward( - velocity.z * delta );

  })

  useEffect(()=>{
    if (controls.current) {
      controls.current.addEventListener('lock', () => {
        console.log('lock');
        updateLocked(true)
      });
      controls.current.addEventListener('unlock', () => {
        console.log('unlock')
        updateLocked(false)
      });
    }
  }, [controls])

  useEffect(()=>{

    document.addEventListener('keydown', (e)=>{
      switch (e.key) {
        case "ArrowUp":
          setMoveForward(true);
        break;
        case "ArrowDown":
          setMoveBackward(true);
        break;
        case "ArrowLeft":
          setMoveLeft(true);
        break;
        case "ArrowRight":
          setMoveRight(true);
        break;
      }
    })

    document.addEventListener('keyup', (e)=>{
      switch (e.key) {
        case "ArrowUp":
          setMoveForward(false);
        break;
        case "ArrowDown":
          setMoveBackward(false);
        break;
        case "ArrowLeft":
          setMoveLeft(false);
        break;
        case "ArrowRight":
          setMoveRight(false);
        break;
      }
    })

  },[])


  return (
    <>
      <Sky distance={450000} sunPosition={[0.45, 0.5, 0.45]} inclination={0} azimuth={0.75} />

      <ambientLight intensity={2} />
      <pointLight position={[40, 40, 40]} />

      <Plane position={[0,-12.5,0]} rotation={[-Math.PI / 2,0,0]} args={[2000, 2000, 1, 1]}>
        <meshStandardMaterial
            attach="material"
            color={'#666'}
        />
      </Plane>


      {rooms.map((room, idx) => (
        <RoomSegment key={idx} pictures={room} number={idx} handleArtClick={handleArtClick}  />
      ))}

      <PointerLockControls ref={controls} />

    </>
  )
}
