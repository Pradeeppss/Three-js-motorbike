import * as Three from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const loader = new OBJLoader();
const renderer = new Three.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//light
let ambientLight = new Three.AmbientLight(0xf0f0f0);
let light = new Three.DirectionalLight(0xffffff, 1.0);
light.position.set(0.32, 0.39, 0.7);
scene.add(ambientLight);
scene.add(light);
//camera
camera.position.set(0, 4, 10);
camera.lookAt(0, 0, 0);
//controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 1;
controls.target = new Three.Vector3(0, 4, 0);
controls.update();
//select
const formElem = document.getElementById("checkForm");
let SelectedParts = [];
formElem.addEventListener("change", onformChange);
function onformChange(e) {
  let retunArr = [...SelectedParts];
  let value = e.target.value;
  if (SelectedParts.length === 0) {
    retunArr.push(value);
  } else {
    for (let index = 0; index < SelectedParts.length; index++) {
      const elem = SelectedParts[index];
      if (elem === value) {
        retunArr = SelectedParts.slice(0, index).concat(
          SelectedParts.slice(index + 1)
        );
        break;
      }
    }
  }
  if (retunArr.length === SelectedParts.length) {
    retunArr.push(value);
  }
  SelectedParts = retunArr;
  reRenderBike();
}
function makeCheckboxes(partArr) {
  for (let i = 0; i < partArr.length; i++) {
    const element = partArr[i];
    SelectedParts.push(`part_${i}`);
    formElem.innerHTML += `
        <div>
          <input checked value="part_${i}" type="checkbox" name="picture1" id="picture${i}" />
          <label for="picture${i}">Part ${i + 1}</label>
        </div>
        `;
  }
}
// loading bike .obj file
let bikeObj;
loader.load("/public/bike.obj", addObject, loading, errorFound);
function reRenderBike() {
  loader.load("/public/bike.obj", addNewObject, loading, errorFound);
}
function changeObjectChildren(childArr) {
  const tempArr = [];
  for (let i = 0; i < SelectedParts.length; i++) {
    const element = SelectedParts[i];
    let elemArr = element.split("_");
    let elemInd = Number(elemArr[elemArr.length - 1]);
    tempArr.push(childArr[elemInd]);
  }
  return tempArr;
}
function addNewObject(object) {
  scene.remove(bikeObj);
  renderer.render(scene, camera);
  const updatedChilren = changeObjectChildren(object.children);
  object.children = updatedChilren;
  bikeObj = object;
  scene.add(object);
  renderer.render(scene, camera);
}
function addObject(object) {
  //   console.log(object);
  makeCheckboxes(object.children);
  bikeObj = object;
  scene.add(object);
  renderer.render(scene, camera);
}
function loading(xhr) {
  console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
}
function errorFound(err) {
  console.log("error found", error);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}

if (WebGL.isWebGLAvailable()) {
  animate();
} else {
  const warning = WebGL.getWebGLErrorMessage();
  document.getElementById("container").appendChild(warning);
}
