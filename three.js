import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

    export const cubeDimensions = {
        x: 0.5,
        y: 0.5,
        z: 0.5
    }

    export const scene = new THREE.Scene()

    export const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    export const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    const geometry = new THREE.BoxGeometry( cubeDimensions.x, cubeDimensions.y, cubeDimensions.z );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    export const cube = new THREE.Mesh( geometry, material );

    const geometryPlane = new THREE.PlaneGeometry(10,10);
    const materialPlane = new THREE.MeshBasicMaterial({ color: 'red'})
    export const plane = new THREE.Mesh(geometryPlane, materialPlane)


    scene.add( cube, plane );

    
    camera.position.set(15,15,10)


    const controls = new OrbitControls( camera, renderer.domElement );

    // function animate() {
    //     requestAnimationFrame( animate );
    //     renderer.render( scene, camera );
    // }
    // animate()
