import { cube, plane } from './three';
import './style.css'

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
          .setTranslation(0.0, 50, 0.0);
  let rigidBody = world.createRigidBody(rigidBodyDesc);

  // Create a cuboid collider attached to the dynamic rigidBody.
  let colliderDesc = RAPIER.ColliderDesc.cuboid(0.5, 0.5, 0.5);
  let collider = world.createCollider(colliderDesc, rigidBody);

  // Run three.js
  plane.rotation.x = -Math.PI / 2
  plane.position.set(0,0,0)
  cube.position.set(rigidBody.translation().x,rigidBody.translation().y,rigidBody.translation().z)

  
  // Game loop. Replace by your own game loop system.
  let gameLoop = () => {
    // Ste the simulation forward.  
    world.step();

    // Get and print the rigid-body's position.
    let position = rigidBody.translation();
    console.log("Rigid-body position: ", position.x, position.y, position.z);
    cube.position.set(position.x,position.y,position.z)
    setTimeout(gameLoop, 16);
  };

  gameLoop();
})