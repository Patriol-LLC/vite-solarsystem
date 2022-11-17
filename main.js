import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { AmbientLight, Light } from 'three'


// Planet offsets
const mercuryOffset = 1000
const venusOffset = 1500
const earthOffset = 2000
const moonOffset = 40
const marsOffset = 2500
const jupiterOffset = 3000
const saturnOffset = 3500
const uranusOffset = 4000
const neptuneOffset = 5500
const plutoOffset = 6000

// Planet rotation speeds
let mercuryObjectRotation = -0.002
let venusObjectRotation = 0.003
let earthObjectRotation = -0.001
let moonObjectRotation = -0.003
let marsObjectRotation = -0.002543
let jupiterObjectRotation = -0.0007
let saturnObjectRotation = -0.0003
let uranusObjectRotation = -0.0001
let neptuneObjectRotation = -0.0005
let plutoObjectRotation = -0.0003


// Create A Scene
const scene = new THREE.Scene()
const spacetexture = new THREE.TextureLoader().load('img/bg.jpg')
scene.background = spacetexture

// Camera
const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth/window.innerHeight,
    45,
    100000
)
camera.position.set(2000,0,0)
let currentobject;
const direction = new THREE.Vector3()

// Renderer
const renderer = new THREE.WebGLRenderer({antialias:true})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.BasicShadowMap
document.body.appendChild(renderer.domElement)

// Controls
let controls = new OrbitControls(camera, renderer.domElement)
controls.minDistance = 2000
controls.maxDistance = 7000
// Controls
let perviousPlanet = -1;

let factContent = document.querySelector('.fact-content')
// Skybox
let materialarray = [];
let texture_ft = new THREE.TextureLoader().load('img/kenon_star_ft.jpg')
let texture_bk = new THREE.TextureLoader().load('img/kenon_star_bk.jpg')
let texture_up = new THREE.TextureLoader().load('img/kenon_star_up.jpg')
let texture_dn = new THREE.TextureLoader().load('img/kenon_star_dn.jpg')
let texture_rt = new THREE.TextureLoader().load('img/kenon_star_rt.jpg')
let texture_lf = new THREE.TextureLoader().load('img/kenon_star_lf.jpg')
materialarray.push(new THREE.MeshBasicMaterial({map: texture_ft}))
materialarray.push(new THREE.MeshBasicMaterial({map: texture_bk}))
materialarray.push(new THREE.MeshBasicMaterial({map: texture_up}))
materialarray.push(new THREE.MeshBasicMaterial({map: texture_dn}))
materialarray.push(new THREE.MeshBasicMaterial({map: texture_rt}))
materialarray.push(new THREE.MeshBasicMaterial({map: texture_lf}))

for(let i=0;i<6;i++){
    materialarray[i].side = THREE.BackSide;
}
const geometry = new THREE.BoxGeometry(30000,30000,30000)
const skybox = new THREE.Mesh(geometry, materialarray)

scene.add(skybox)

// Creating The Solar System

// Stars
function addStar() {
  const geometry = new THREE.SphereGeometry(2, 24, 24);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(10000));

  star.position.set(x, y, z);
  scene.add(star);

}

Array(1000).fill().forEach(addStar);


// Sun
const sunGeometry = new THREE.SphereGeometry(500,500,500)
const sunMaterial = new THREE.MeshBasicMaterial({})
const sunTexture = new THREE.TextureLoader().load('img/sun.jpg')
sunMaterial.map = sunTexture
const sun = new THREE.Mesh(sunGeometry, sunMaterial)
sun.position.set(0,0,0)
scene.add(sun)

// Light
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(1000,0,0)
scene.add(pointLight)
// Mercury

// Create an object for mercury to revolve around
const mercuryObject = new THREE.Object3D()

// Add the Mercury Object to the scene
scene.add(mercuryObject)

const mercuryGeometry = new THREE.SphereGeometry(20,20,20)
const mercuryMaterial = new THREE.MeshStandardMaterial({})
const mercuryTexture = new THREE.TextureLoader().load('img/mercury.jpg')
mercuryMaterial.map = mercuryTexture
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial)
mercury.position.setZ(mercuryOffset)
mercuryObject.add(mercury)

// Venus

// Create an object for mercury to revolve around
const venusObject = new THREE.Object3D()

// Add the Mercury Object to the scene
scene.add(venusObject)

const venusGeometry = new THREE.SphereGeometry(20,20,20)
const venusMaterial = new THREE.MeshStandardMaterial({})
const venusTexture = new THREE.TextureLoader().load('img/venus.jpg')
venusMaterial.map = venusTexture
const venus = new THREE.Mesh(venusGeometry, venusMaterial)
venus.position.setZ(venusOffset)
venusObject.add(venus)

// Earth
const earthObject = new THREE.Object3D()
scene.add(earthObject)
const earthGeometry = new THREE.SphereGeometry(20,20,20)
const earthMaterial = new THREE.MeshStandardMaterial({})
const earthTexture = new THREE.TextureLoader().load('img/earth.jpg')
earthMaterial.map = earthTexture
const earth = new THREE.Mesh(earthGeometry, earthMaterial)
earth.position.setZ(earthOffset)
earthObject.add(earth)

// Create The Earth's Moon

// Moon object
const moonObject = new THREE.Object3D()
const moonGeometry = new THREE.SphereGeometry(5,30,30)
const moonMaterial = new THREE.MeshStandardMaterial({})
const moonTexture = new THREE.TextureLoader().load('img/moon.jpg')
moonMaterial.map = moonTexture
const moon = new THREE.Mesh(moonGeometry,moonMaterial)

scene.add(moonObject)
// Add moon to the moon Object
moonObject.add(moon)

// Add the moon object to the earth object
earthObject.add(moonObject)

// Position The Moon
moon.position.setX(moonOffset)
moonObject.position.setZ(earthOffset)

// Mars
const marsObject = new THREE.Object3D()
scene.add(marsObject)
const marsGeometry = new THREE.SphereGeometry(20,20,20)
const marsMaterial = new THREE.MeshStandardMaterial({})
const marsTexture = new THREE.TextureLoader().load('img/mars.jpg')
marsMaterial.map = marsTexture
const mars = new THREE.Mesh(marsGeometry, marsMaterial)
mars.position.setZ(marsOffset)
marsObject.add(mars)

// Jupyter
const jupiterObject = new THREE.Object3D()
scene.add(jupiterObject)
const jupiterGeometry = new THREE.SphereGeometry(80,80,80)
const jupiterMaterial = new THREE.MeshStandardMaterial({})
const jupiterTexture = new THREE.TextureLoader().load('img/jupiter.jpg')
jupiterMaterial.map = jupiterTexture
const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial)
jupiter.position.setZ(jupiterOffset)
jupiterObject.add(jupiter)

// Saturn
const saturnObject = new THREE.Object3D()
scene.add(saturnObject)
const saturnGeometry = new THREE.SphereGeometry(70,70,70)
const saturnMaterial = new THREE.MeshStandardMaterial({})
const saturnTexture = new THREE.TextureLoader().load('img/saturn.jpg')
saturnMaterial.map = saturnTexture
const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial)
saturn.position.setZ(saturnOffset)
saturnObject.add(saturn)

// Uranus
const uranusObject = new THREE.Object3D()
scene.add(uranusObject)
const uranusGeometry = new THREE.SphereGeometry(20,20,20)
const uranusMaterial = new THREE.MeshStandardMaterial({})
const uranusTexture = new THREE.TextureLoader().load('img/uranus.jpg')
uranusMaterial.map = uranusTexture
const uranus = new THREE.Mesh(uranusGeometry, uranusMaterial)
uranus.position.setZ(uranusOffset)
uranusObject.add(uranus)

// Neptune
const neptuneObject = new THREE.Object3D()
scene.add(neptuneObject)
const neptuneGeometry = new THREE.SphereGeometry(20,20,20)
const neptuneMaterial = new THREE.MeshStandardMaterial({})
const neptuneTexture = new THREE.TextureLoader().load('img/neptune.jpg')
neptuneMaterial.map = neptuneTexture
const neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial)
neptune.position.setZ(neptuneOffset)
neptuneObject.add(neptune)

// Pluto
const plutoObject = new THREE.Object3D()
scene.add(plutoObject)
const plutoGeometry = new THREE.SphereGeometry(20,50,50)
const plutoMaterial = new THREE.MeshStandardMaterial({})
const plutoTexture = new THREE.TextureLoader().load('img/pluto.jpg')
plutoMaterial.map = plutoTexture
const pluto = new THREE.Mesh(plutoGeometry, plutoMaterial)
pluto.position.setZ(plutoOffset)
plutoObject.add(pluto)



// Event Listeners

const findsun = document.querySelector('.locate-sun').addEventListener('click',locatesun)

const findmercury = document.querySelector('.locate-mercury').addEventListener('click',locatemercury)

const findvenus = document.querySelector('.locate-venus').addEventListener('click',locatevenus)

const findearth = document.querySelector('.locate-earth').addEventListener('click', locateearth)

const findmars = document.querySelector('.locate-mars').addEventListener('click', locatemars)

const findjupiter = document.querySelector('.locate-jupiter').addEventListener('click', locatejupiter)

const findsaturn = document.querySelector('.locate-saturn').addEventListener('click', locatesaturn)

const finduranus = document.querySelector('.locate-uranus').addEventListener('click', locateuranus)

const findneptune = document.querySelector('.locate-neptune').addEventListener('click', locateneptune)

const findpluto = document.querySelector('.locate-pluto').addEventListener('click', locatepluto)

// Custom Functions
function movecamera(){

    const currentposition = document.body.getBoundingClientRect().top
  
    camera.position.x = currentposition * -0.2
    camera.position.y = currentposition * -0.2
    camera.position.z = currentposition * -0.2
  }

// Set the current object
currentobject = sun
document.body.onscroll = movecamera

function resetPrevious(index){
  switch(index){
    case 0: 
            console.log('Resetting mercury')
            mercuryObjectRotation = -0.001
            break
    case 1:
            venusObjectRotation = 0.001
            break
    case 2: 
            earthObjectRotation = -0.001
            break
    case 3:
            marsObjectRotation = -0.003
            break
    case 4:
            jupiterObjectRotation = -0.0007
            break
    case 5:           
            saturnObjectRotation = -0.0003
            break
    case 6: 
            uranusObjectRotation = -0.0001
            break
    case 7:
            neptuneObjectRotation = -0.0005
            break
    case 8:
            plutoObjectRotation = -0.0003
            break
    default:break
  }
}

function displayFact(fact){
    document.querySelector('.fact-content').innerHTML = fact
    const factFile= document.querySelector('.fact-file').classList.remove('hidden')
  }

function locatesun()  {
    // Reset previous planet
    resetPrevious(perviousPlanet)
    // Set the camera
    camera.position.setZ(0)
    camera.position.setY(0)
    // Display fact
    displayFact("The sun alone contributes 99% of our solar system's mass!")
    controls.minDistance = 2000
    controls.maxDistance = 5000
    return currentobject = sun
  }

function locatemercury()  {
    // First Reset the previous planet
    resetPrevious(perviousPlanet)
    // Assign this planet an index
    let mercuryIndex = 0
    // Set this planet's index as the previous index
    perviousPlanet = mercuryIndex
    // Stop the planet from rotating around the sun
    mercuryObjectRotation = 0
    // Focus the camera
    // Display the fact
    displayFact("Mercury orbits the sun faster than any other planet. One year in Mercury is only about 88 days on Earth!")
    controls.minDistance = 100
    controls.maxDistance = 300
    return currentobject = mercury
  }

  function locatevenus()  {
    // First Reset the previous planet
    resetPrevious(perviousPlanet)
    // Assign this planet an index
    let venusIndex = 1
    // Set this planet's index as the previous index
    perviousPlanet = venusIndex
    // Stop the planet from rotating around the sun
    venusObjectRotation = 0
    // Focus the camera
    // Display the fact
    displayFact("Venus is hotter than Mercury despite being further away from the Sun")
    controls.minDistance = 100
    controls.maxDistance = 300
    return currentobject = venus
  }

  function locateearth()  {
    // First Reset the previous planet
    resetPrevious(perviousPlanet)
    // Assign this planet an index
    let earthIndex = 2
    // Set this planet's index as the previous index
    perviousPlanet = earthIndex
    // Stop the planet from rotating around the sun
    earthObjectRotation = 0
    // Focus the camera
    // Display the fact
    displayFact("Earth is the third planet from the Sun and the only astronomical object known to harbor life.")
    controls.minDistance = 100
    controls.maxDistance = 300
    return currentobject = earth
  }

  function locatemars()  {
    // First Reset the previous planet
    resetPrevious(perviousPlanet)
    // Assign this planet an index
    let marsIndex = 3
    // Set this planet's index as the previous index
    perviousPlanet = marsIndex
    // Stop the planet from rotating around the sun
    marsObjectRotation = 0
    // Focus the camera
    // Display the fact
    displayFact("One year on Mars would take about 687 days on Earth!")
    controls.minDistance = 100
    controls.maxDistance = 300
    return currentobject = mars
  }

  function locatejupiter()  {
    // First Reset the previous planet
   resetPrevious(perviousPlanet)
   // Assign this planet an index
   let jupiterIndex = 4
   // Set this planet's index as the previous index
   perviousPlanet = jupiterIndex
   // Stop the planet from rotating around the sun
   jupiterObjectRotation = 0
   // Focus the camera
   // Display the fact
   displayFact("Jupiter is 2.5 times more massive than all of the other planets in the Solar System combined!")
   controls.minDistance = 300
   controls.maxDistance = 500
   return currentobject = jupiter
 }

 function locatesaturn()  {
    // First Reset the previous planet
    resetPrevious(perviousPlanet)
    // Assign this planet an index
    let saturnIndex = 5
    // Set this planet's index as the previous index
    perviousPlanet = saturnIndex
    // Stop the planet from rotating around the sun
    saturnObjectRotation = 0
    // Focus the camera
    // Display the fact
    displayFact("You cannot stand on Saturn. It is made mostly of gases, mainly helium. Therefore Saturn could float in water!")
    controls.minDistance = 300
    controls.maxDistance = 500
    return currentobject = saturn
  }

  function locateuranus()  {
    // First Reset the previous planet
    resetPrevious(perviousPlanet)
    // Assign this planet an index
    let uranusIndex = 6
    // Set this planet's index as the previous index
    perviousPlanet = uranusIndex
    // Stop the planet from rotating around the sun
    uranusObjectRotation = 0
    // Focus the camera
    // Display the fact
    displayFact("One year on Uranus lasts about 84 years on Earth!")
    return currentobject = uranus
    controls.minDistance = 100
    controls.maxDistance = 300
  }

  function locateneptune()  {
    // First Reset the previous planet
    resetPrevious(perviousPlanet)
    // Assign this planet an index
    let neptuneIndex = 7
    // Set this planet's index as the previous index
    perviousPlanet = neptuneIndex
    // Stop the planet from rotating around the sun
    neptuneObjectRotation = 0
    // Focus the camera
    // Display the fact
    displayFact("One year on Neptune lasts about 165 years on Earth!")
    controls.minDistance = 100
    controls.maxDistance = 300
    return currentobject = neptune
  }

  function locatepluto()  {
    // First Reset the previous planet
    resetPrevious(perviousPlanet)
    // Assign this planet an index
    let plutoIndex = 8
    // Set this planet's index as the previous index
    perviousPlanet = plutoIndex
    // Stop the planet from rotating around the sun
    plutoObjectRotation = 0
    // Focus the camera
    // Display the fact
    displayFact("The sky is so dark on Pluto that a person would be able to see stars during the day.")
    controls.minDistance = 100
    controls.maxDistance = 300
    return currentobject = pluto
  }

// Config
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}
function animate() {
    requestAnimationFrame(animate)
    sun.rotation.y += 0.0005
    mercury.rotation.y += 0.005
    mercuryObject.rotateY(mercuryObjectRotation)
    venus.rotation.y += 0.006
    venusObject.rotateY(venusObjectRotation)
    earth.rotation.y += 0.003
    earthObject.rotateY(earthObjectRotation)
    moon.rotation.y += 0.02
    moonObject.rotateY(moonObjectRotation)
    mars.rotation.y += 0.0049
    marsObject.rotateY(marsObjectRotation)
    jupiter.rotation.y += 0.00234
    jupiterObject.rotateY(jupiterObjectRotation)
    saturn.rotation.y += 0.002086
    saturnObject.rotateY(saturnObjectRotation)
    uranus.rotation.y += 0.00459
    uranusObject.rotateY(uranusObjectRotation)
    neptune.rotation.y += 0.00459
    neptuneObject.rotateY(neptuneObjectRotation)
    pluto.rotation.y += 0.00459
    plutoObject.rotateY(plutoObjectRotation)
    //Focus the camera
    currentobject.getWorldPosition(controls.target)
    // Update controls
    controls.update()
    render()
}
function render() {
    renderer.render(scene, camera)
}
animate()