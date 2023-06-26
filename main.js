import { camera, cube, cubeDimensions, plane, renderer, scene } from './three';
import './style.css'
import Stats from 'stats.js'

import RAPIER from 'https://cdn.skypack.dev/@dimforge/rapier3d-compat';

RAPIER.init().then(() => {
  // Use the RAPIER module here.
  let gravity = { x: 0.0, y: -9.81, z: 0.0 };
  let world = new RAPIER.World(gravity);

  // Create the ground
  let groundColliderDesc = RAPIER.ColliderDesc.cuboid(10.0, 0.1, 10.0);
  world.createCollider(groundColliderDesc);

  // Create a dynamic rigid-body.
  let rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
          .setTranslation(0.0, 20, 0.0)
          .setAdditionalMassProperties(
        50,                        // Mass.
        { x: 0.0, y: 1.0, z: 0.0 }, // Center of mass.
        { x: 0.3, y: 0.2, z: 0.1 }, // Principal angular inertia.
        { w: 1.0, x: 0.0, y: 0.0, z: 0.0 } // Principal angu
        );
  let rigidBody = world.createRigidBody(rigidBodyDesc);

  // Create a cuboid collider attached to the dynamic rigidBody.
  let colliderDesc = RAPIER.ColliderDesc.cuboid(cubeDimensions.x, cubeDimensions.y, cubeDimensions.z);
  let collider = world.createCollider(colliderDesc, rigidBody);

  // Run three.js
  plane.rotation.x = -Math.PI / 2
  plane.position.set(0,0,0)
  cube.position.set(rigidBody.translation().x,rigidBody.translation().y,rigidBody.translation().z)

  //
  let stats = new Stats();
  stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild( stats.dom );

  // Game loop. Replace by your own game loop system.
  let gameLoop = () => {
    //
    stats.begin();
	  stats.end();
    // Ste the simulation forward.  
    world.step();
    renderer.render( scene, camera )
    // Get and print the rigid-body's position.
    let position = rigidBody.translation();
    let rotation = rigidBody.rotation()
    console.log("Rigid-body position: ", position.x, position.y, position.z);
    cube.position.set(position.x,position.y,position.z)
    cube.rotation.set(rotation.x,rotation.y,rotation.z)
    setTimeout(gameLoop, 16);
  };

  gameLoop();
})