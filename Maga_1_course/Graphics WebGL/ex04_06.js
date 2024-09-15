v0 = new THREE.Vector2( 0, 44 ); 
v1 = new THREE.Vector2( 84, 80 ); 
v2 = new THREE.Vector2( 120, 0 );
// ¬ычисл€ем кривую Ѕезье:
var curve = new THREE.QuadraticBezierCurve( v0, v1, v2 );

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
AddCamera( 0, 300, 500); //добавл€ем камеру
AddLight( 0, 0, 500 ); //устанавливаем белый свет

//создаем рендерер
renderer = new THREE.WebGLRenderer( { antialias: true } ); 
renderer.setClearColor( 0xffffff );
renderer.setSize( window.innerWidth, window.innerHeight ); 
container = document.getElementById('MyWebGLApp'); 
container.appendChild( renderer.domElement );

// ќсталось описать геометрию и материал и заполнить геометрию точками кривой Ѕезье:
var geometry = new THREE.Geometry;
var material = new THREE.LineBasicMaterial( { color: 0x00cc00 } );
for (var i = 0; i <= 1; i+=0.01)
{
var x = curve.getPoint( i ).x; 
var y = curve.getPoint( i ).y; 
var vec = new THREE.Vector3( x, y, 0 );
geometry.vertices.push( vec );
}
var line = new THREE.Line( geometry, material );
scene.add( line );

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
