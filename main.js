import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );

const geometryPlane = new THREE.PlaneGeometry(10,10);
const materialPlane = new THREE.MeshBasicMaterial({ color: 'red'})
const plane = new THREE.Mesh(geometryPlane, materialPlane)


scene.add( cube, plane );

plane.rotation.x = -Math.PI / 2
plane.position.set(0,0,0)
cube.position.set(0,10,0)
camera.position.set(15,15,10)

const controls = new OrbitControls( camera, renderer.domElement );

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate()