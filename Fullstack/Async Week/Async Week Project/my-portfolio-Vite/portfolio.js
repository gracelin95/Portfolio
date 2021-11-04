import * as THREE from "https://unpkg.com/three@0.126.1/build/three.module.js";
import gsap from "gsap";
import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(innerWidth, innerHeight);

camera.position.setZ(30);

renderer.render(scene, camera);

//CREATING BOX
// const geometry = new THREE.BoxGeometry(5, 5, 5);
// const material = new THREE.MeshPhongMaterial({
//   color: 0xff6347,
//   wireframe: true,
// });
// const boxMesh = new THREE.Mesh(geometry, material);

//CREATING GRACE BOX
const graceBox = new THREE.TextureLoader().load("grace.png");
const grace = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: graceBox })
);
// grace.position.z = 30;
grace.position.x = 10;
grace.position.y = 20;
scene.add(grace);

//LIGHT SOURCE
const light = new THREE.AmbientLight(0xffffff, 1);
light.position.set(0, -1, 1);
scene.add(light);

//GRID
const gridHelper = new THREE.GridHelper(200, 50);

scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

//ADDING STARS
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

const sky = new THREE.TextureLoader().load("moon.jpeg");
scene.background = sky;

function animate() {
  requestAnimationFrame(animate);

  grace.rotation.x += 0.01;
  grace.rotation.y += 0.005;
  grace.rotation.z += 0.01;

  controls.update();
  renderer.render(scene, camera);
}

animate();
