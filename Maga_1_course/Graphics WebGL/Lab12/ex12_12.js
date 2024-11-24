// глобальные переменные
var container, camera, controls, scene, renderer, light; 
//var Cube;

// начинаем рисовать после полной загрузки страницы
window.onload = function()
{
init();
animate();
}

function init()
{
scene = new THREE.Scene(); //создаем сцену 
AddCamera( 0, 300, 500); //добавляем камеру
AddLight( 0, 200, 0 ); //устанавливаем белый свет

//создаем рендерер
renderer = new THREE.WebGLRenderer( { antialias: true } ); 
renderer.setClearColor( 0xffffff );
renderer.setSize( window.innerWidth, window.innerHeight ); 
renderer.shadowMapEnabled = true;
container = document.getElementById('primer'); 
container.appendChild( renderer.domElement );


// Добавление теней
var material = new THREE.MeshLambertMaterial( { color: 0x33CCFF } );
var geometry = new THREE.SphereGeometry(20, 50, 50); 
var sphere1 = new THREE.Mesh( geometry, material );
sphere1.position.set( 0, 60, 0 ); 
sphere1.castShadow = true; 
scene.add ( sphere1 );

var planeMaterial1 = new THREE.MeshLambertMaterial( { color: 0x9999ff, side: THREE.DoubleSide }); 
var planGeo1 = new THREE.PlaneGeometry( 200, 200, 1, 1);
var plane1 = new THREE.Mesh(planGeo1, planeMaterial1); 
plane1.rotation.x = Math.PI/2; 
plane1.receiveShadow = true; 
plane1.castShadow = true;
scene.add( plane1 );

var planeMaterial2 = new THREE.MeshLambertMaterial( { color: 0xff00ff, side: THREE.DoubleSide }); 
var planGeo2 = new THREE.PlaneGeometry( 300, 300, 1, 1); 
var plane2 = new THREE.Mesh(planGeo2, planeMaterial2);
plane2.position.set(0,-120,0); 
plane2.rotation.x = Math.PI/2;
plane2.receiveShadow = true;
plane2.castShadow = true; 
scene.add( plane2 );

}

function animate()
{
requestAnimationFrame(animate);
render();
}
 
function render()
{
renderer.shadowMapEnabled = true;
controls.update(); 
renderer.render(scene, camera);
}

function AddCamera(X,Y,Z) 
{
camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.set(X,Y,Z);
controls = new THREE.TrackballControls( camera, container );
controls.rotateSpeed = 2; 
controls.noZoom = false; 
controls.zoomSpeed = 1.2; 
controls.staticMoving = true;
}

function AddLight(X,Y,Z)
{
light = new THREE.DirectionalLight( 0xffffff );
light.position.set(X,Y,Z);
light.castShadow = true;
scene.add( light );
}
