
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
AddCamera( 0, 800, 50); //добавляем камеру
AddLight( 500, 500, 500 ); //устанавливаем белый свет

//создаем рендерер
renderer = new THREE.WebGLRenderer( { antialias: true } ); 
renderer.setClearColor( 0xffffff );
renderer.setSize( window.innerWidth, window.innerHeight ); 
container = document.getElementById('MyWebGLApp'); 
container.appendChild( renderer.domElement );

var points = [];
v0 = new THREE.Vector2( 0, 44 ); 
v1 = new THREE.Vector2( 84, 80 ); 
v2 = new THREE.Vector2( 120, 0 );
var BezierCurve = new THREE.QuadraticBezierCurve( v0, v1, v2 );
var j=0, m=0.5, n=3;
for ( var i = 0; i < 1; i = i + 0.05 ) 
  {j=j+m; points.push( new THREE.Vector3 ( BezierCurve.getPoint( i ).y, j, 236 - 120*i ) ); }
j=0;
for ( var i = - 4; i < 1.2; i = i + 0.1 ) 
  {j=j+n; points.push( new THREE.Vector3 ( 5 + 30*Math.atan(Math.exp(3*i)), j, 24 - 24*i ) );}
// Описываем геометрию и материал, создаем бокал:
var geometry = new THREE.LatheGeometry( points, 32, 0, 0 );
var material = new THREE.MeshPhongMaterial(       
  { color: 0xd53044, specular: 0x00b2fc, shininess: 50,
    side: THREE.DoubleSide, blending: THREE.NormalBlending, depthTest: true } );
var glass = new THREE.Mesh( geometry, material );
glass.position.set( 0, -100, 0 ); 
glass.rotation.x = -Math.PI/2;
scene.add( glass );

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

