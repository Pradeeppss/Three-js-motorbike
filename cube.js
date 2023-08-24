import * as Three from "three";
import WebGL from "three/addons/capabilities/WebGL.js";

const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new Three.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const geometry = new Three.BoxGeometry(1, 1, 1);
const material = new Three.MeshBasicMaterial({ color: 0xffffff });
const lineMaterial = new Three.LineBasicMaterial({ color: 0xffffff });
const cube = new Three.Mesh(geometry, material);
// scene.add(cube);
camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);
//line
const squarePoints = [];
squarePoints.push(new Three.Vector3(0.5, 0.5, 0.5));
squarePoints.push(new Three.Vector3(0.5, 0.5, -0.5));
squarePoints.push(new Three.Vector3(-0.5, 0.5, -0.5));
squarePoints.push(new Three.Vector3(-0.5, 0.5, 0.5));
squarePoints.push(new Three.Vector3(0.5, 0.5, 0.5));

squarePoints.push(new Three.Vector3(0.5, -0.5, 0.5));
squarePoints.push(new Three.Vector3(0.5, -0.5, -0.5));
squarePoints.push(new Three.Vector3(-0.5, -0.5, -0.5));
squarePoints.push(new Three.Vector3(-0.5, -0.5, 0.5));
squarePoints.push(new Three.Vector3(0.5, -0.5, 0.5));
const squareConnectionPoints = [];
squareConnectionPoints.push(new Three.Vector3(0.5, 0.5, -0.5));
squareConnectionPoints.push(new Three.Vector3(0.5, -0.5, -0.5));
squareConnectionPoints.push(new Three.Vector3(-0.5, -0.5, -0.5));
squareConnectionPoints.push(new Three.Vector3(-0.5, 0.5, -0.5));
squareConnectionPoints.push(new Three.Vector3(-0.5, 0.5, 0.5));
squareConnectionPoints.push(new Three.Vector3(-0.5, -0.5, 0.5));
squareConnectionPoints.push(new Three.Vector3(0.5, -0.5, 0.5));
const points = [];
points.push(new Three.Vector3(1, 1, 1));
points.push(new Three.Vector3(1, 1, -1));
points.push(new Three.Vector3(-1, 1, -1));
points.push(new Three.Vector3(-1, 1, 1));
points.push(new Three.Vector3(1, 1, 1));

points.push(new Three.Vector3(1, -1, 1));
points.push(new Three.Vector3(1, -1, -1));
points.push(new Three.Vector3(-1, -1, -1));
points.push(new Three.Vector3(-1, -1, 1));
points.push(new Three.Vector3(1, -1, 1));

const centerPoints = [];
centerPoints.push(new Three.Vector3(0.5, 0.5, 0.5));
centerPoints.push(new Three.Vector3(1, 1, 1));
centerPoints.push(new Three.Vector3(1, 1, -1));
centerPoints.push(new Three.Vector3(0.5, 0.5, -0.5));
centerPoints.push(new Three.Vector3(-0.5, 0.5, -0.5));
centerPoints.push(new Three.Vector3(-1, 1, -1));
centerPoints.push(new Three.Vector3(-1, 1, 1));
centerPoints.push(new Three.Vector3(-0.5, 0.5, 0.5));
centerPoints.push(new Three.Vector3(-0.5, -0.5, 0.5));
centerPoints.push(new Three.Vector3(-1, -1, 1));
centerPoints.push(new Three.Vector3(-1, -1, -1));
centerPoints.push(new Three.Vector3(-0.5, -0.5, -0.5));
centerPoints.push(new Three.Vector3(0.5, -0.5, -0.5));
centerPoints.push(new Three.Vector3(1, -1, -1));
centerPoints.push(new Three.Vector3(1, -1, 1));
centerPoints.push(new Three.Vector3(0.5, -0.5, 0.5));

const connectionPoints = [];
connectionPoints.push(new Three.Vector3(1, 1, -1));
connectionPoints.push(new Three.Vector3(1, -1, -1));
connectionPoints.push(new Three.Vector3(-1, -1, -1));
connectionPoints.push(new Three.Vector3(-1, 1, -1));
connectionPoints.push(new Three.Vector3(-1, 1, 1));
connectionPoints.push(new Three.Vector3(-1, -1, 1));
connectionPoints.push(new Three.Vector3(1, -1, 1));

const lineGeometry = new Three.BufferGeometry().setFromPoints(points);
const squareGeometry = new Three.BufferGeometry().setFromPoints(squarePoints);
const squareSideGeometry = new Three.BufferGeometry().setFromPoints(
  squareConnectionPoints
);
const connectLineGeometry = new Three.BufferGeometry().setFromPoints(
  connectionPoints
);
const centerLineGeometry = new Three.BufferGeometry().setFromPoints(
  centerPoints
);
const squareLines = new Three.Line(squareGeometry, lineMaterial);
const squareSideLines = new Three.Line(squareSideGeometry, lineMaterial);
const line = new Three.Line(lineGeometry, lineMaterial);
const centerLine = new Three.Line(centerLineGeometry, lineMaterial);
const connectLine = new Three.Line(connectLineGeometry, lineMaterial);
scene.add(squareLines);
scene.add(squareSideLines);
scene.add(line);
scene.add(centerLine);
scene.add(connectLine);

function animate() {
  requestAnimationFrame(animate);
  line.rotation.y += 0.02;
  squareLines.rotation.y += 0.01;
  squareSideLines.rotation.y += 0.01;
  centerLine.rotation.y += 0.02;
  connectLine.rotation.y += 0.02;
  renderer.render(scene, camera);
}
if (WebGL.isWebGLAvailable()) {
  animate();
} else {
  const warning = WebGL.getWebGLErrorMessage();
  document.getElementById("container").appendChild(warning);
}
