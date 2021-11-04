import * as THREE from "https://unpkg.com/three@0.126.1/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js";

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

//LIGHT SOURCE
const light = new THREE.AmbientLight(0xffffff, 1);
light.position.set(0, -1, 1);
scene.add(light);

//GRID
const gridHelper = new THREE.GridHelper(200, 50);
gridHelper.rotation.x = Math.PI / 2;
gridHelper.rotation.y = Math.PI / 4;

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

const sky = new THREE.TextureLoader().load();
scene.background = sky;

function scaleToFit() {
  const rect = document.body.getBoundingClientRect().top;

  camera.position.z = rect * -0.01;
  camera.position.x = rect * -0.0002;
  camera.position.y = rect * -0.0002;
}
document.body.onscroll = scaleToFit;

function animate() {
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
}

animate();
