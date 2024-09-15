// глобальные переменные
var container, camera, controls, scene, renderer, light; 
var Cube;
var spline = new THREE.SplineCurve3([
new THREE.Vector3(-2, -1, 0), 
new THREE.Vector3(-1, -2, 0), 
new THREE.Vector3(1,2, 0), 
new THREE.Vector3(4, 3, 0), 
new THREE.Vector3(7, -1, 0), 
new THREE.Vector3(10, 2, 0), 
new THREE.Vector3(13, -4, 0), 
new THREE.Vector3(16, -2, 0),
]);

// начинаем рисовать после полной загрузки страницы
window.onload = function()
{
init();
animate();
}

function init()
{
scene = new THREE.Scene(); //создаем сцену 
AddCamera( 0, 30, 50); //добавляем камеру
AddLight( 0, 0, 50 ); //устанавливаем белый свет

//создаем рендерер
renderer = new THREE.WebGLRenderer( { antialias: true } ); 
renderer.setClearColor( 0xffffff );
renderer.setSize( window.innerWidth, window.innerHeight ); 
container = document.getElementById('MyWebGLApp'); 
container.appendChild( renderer.domElement );

//3D spline
var material = new THREE.LineBasicMaterial( { color: 0xcc0000 } );
var tubegeo = new THREE.TubeGeometry( spline, 128, 1, 12 ); 
var tube = new THREE.Mesh( tubegeo, material ); 
scene.add( tube );
}

function animate()
{
requestAnimationFrame(animate);
render();
}
 
function render()
{
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
scene.add( light );
}
