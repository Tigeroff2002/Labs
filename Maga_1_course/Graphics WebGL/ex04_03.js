// глобальные переменные
var container, camera, controls, scene, renderer, light; 

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
AddLight( 0, 0, 500 ); //устанавливаем белый свет

//создаем рендерер
renderer = new THREE.WebGLRenderer( { antialias: true } ); 
renderer.setClearColor( 0xffffff );
renderer.setSize( window.innerWidth, window.innerHeight ); 
container = document.getElementById('MyWebGLApp'); 
container.appendChild( renderer.domElement );

chain = new THREE.Curve.create ( function(){}, function(t)
{
t = 2 * Math.PI * t; 
var a = 40, b = 20, c=0; 
var x = a*Math.cos( t ); 
var y = b*Math.sin( t ); 
var z = c*t;
return new THREE.Vector3(x, y, z).multiplyScalar(2);
} );
mychain = new chain;

var tubegeo = new THREE.TubeGeometry (mychain, 128, 2, 12, closed = false );
var material = new THREE.MeshPhongMaterial( { color: 0x9b2d30, specular: 0xd53e07, 
   emissive: 0x000000, shininess: 40, shading: THREE.FlatShading, blending: THREE.NormalBlending, 
   depthTest: true } );
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
