// глобальные переменные
var container, camera, controls, scene, renderer, light; 
var spline = new THREE.SplineCurve([
new THREE.Vector2(-2, -1), 
new THREE.Vector2(-1, -2), 
new THREE.Vector2(1,2), 
new THREE.Vector2(4, 3), 
new THREE.Vector2(7, -1), 
new THREE.Vector2(10, 2), 
new THREE.Vector2(13, -4), 
new THREE.Vector2(16, -2),
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
AddCamera( 0, 30, 50); //добавл€ем камеру
AddLight( 0, 0, 50 ); //устанавливаем белый свет

//создаем рендерер
renderer = new THREE.WebGLRenderer( { antialias: true } ); 
renderer.setClearColor( 0xffffff );
renderer.setSize( window.innerWidth, window.innerHeight ); 
container = document.getElementById('MyWebGLApp'); 
container.appendChild( renderer.domElement );

// —плайн
var geometry = new THREE.Geometry;
var material = new THREE.LineBasicMaterial( { color: 0xcc0000 } );
// «аносим вершины в geometry:
for (var i = 0; i <= 1; i+=0.01)
{
var x = spline.getPoint( i ).x;
var y = spline.getPoint( i ).y;
var vec = new THREE.Vector3( x, y, 0 );
geometry.vertices.push( vec );
}
// —троим линию:
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
