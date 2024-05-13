import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.module.js';
import { VRButton } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/webxr/VRButton.js';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true; // Enable WebXR
document.body.appendChild(renderer.domElement);
document.body.appendChild(VRButton.createButton(renderer)); // Add VR button

// Create a cube
const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Create a grid helper
const size = 10;
const divisions = 10;
const gridHelper = new THREE.GridHelper(size, divisions);
gridHelper.material.color.set(0x00ff00); // Set grid color to green
scene.add(gridHelper);

// Animation
function animate() {
    renderer.setAnimationLoop(function () {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    });
}

// Handle window resize
window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

animate();