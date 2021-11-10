import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, FirstPersonControls, PointerLockControls, Image, Box as NativeBox, useTexture, Plane, PerspectiveCamera } from '@react-three/drei'

import * as THREE from 'three'
import Art from './Art'
import RoomSegment from './RoomSegment'
import { Suspense, useState, useEffect, useRef } from 'react'

export default function Gallery() {

  const [moveForward, setMoveForward] = useState(false)
  const [moveBackward, setMoveBackward] = useState(false)
  const [moveLeft, setMoveLeft] = useState(false)
  const [moveRight, setMoveRight] = useState(false)

  const controls = useRef()

  const velocity = new THREE.Vector3();
	const direction = new THREE.Vector3();

  const pictures = [
    {url: '/IMG_5322.JPG'},
    {url: '/IMG_5323.JPG'},
    {url: '/IMG_5324.JPG'},
    {url: '/IMG_5325.JPG'},
    {url: '/IMG_5325.JPG'},
    {url: '/IMG_5325.JPG'},
    {url: '/IMG_5325.JPG'},
    {url: '/IMG_5325.JPG'},
    {url: '/IMG_5325.JPG'},
    {url: '/IMG_5325.JPG'},
    {url: '/IMG_5325.JPG'},
    {url: '/IMG_5325.JPG'},
    {url: '/IMG_5325.JPG'},
    {url: '/IMG_5325.JPG'},
    {url: '/IMG_5325.JPG'},
    {url: '/IMG_5325.JPG'},
    {url: '/IMG_5325.JPG'},
  ]

  const roomSize = 6

  const rooms = []

  for (let i = 0; i < pictures.length; i += roomSize){
    rooms.push(pictures.slice(i, i + roomSize));
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

    // if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
		// if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

    controls.current.moveRight( - velocity.x * delta );
		controls.current.moveForward( - velocity.z * delta );

  })

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
      <ambientLight intensity={2} />
      <pointLight position={[40, 40, 40]} />
      {/* <NativeBox
          args={[100, 20, 4]}
          position={[0,0,0]}
          >
          <meshStandardMaterial
              attach="material"
              color={'#2b6c76'}
          />
      </NativeBox> */}

      <Plane position={[0,-12.5,0]} rotation={[-Math.PI / 2,0,0]} args={[500, 500, 1, 1]}>
        <meshStandardMaterial
            attach="material"
            color={'#666'}
        />
      </Plane>


      {rooms.map((room, idx) => (
        <RoomSegment pictures={room} number={idx}/>
      ))}

      
      

      {/* <Suspense fallback={null}>
          {pictures.map((item, idx) =>(
              <Art key={idx} number={idx} url={item.url}/>
          ))}
      </Suspense> */}
      <PointerLockControls ref={controls} />
      {/* <OrbitControls  /> */}
    </>
  )
}
