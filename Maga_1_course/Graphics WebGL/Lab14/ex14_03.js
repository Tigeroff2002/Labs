// глобальные переменные
var container, camera, controls, scene, renderer, light; 
var Cube;
var Key =
{
_pressed: {},
A:	65,
W:	87,
D:	68,
S:	83,
SPACE: 32,
VK_LEFT:	37,
VK_RIGHT: 39,
VK_UP: 38,
VK_SPACE: 32,
VK_ENTER: 13,
isDown: function(keyCode) { return this._pressed[keyCode]; }, 
                               onKeydown: function(event) { this._pressed[event.keyCode] = true; },
                               onKeyup: function(event) { delete this._pressed[event.keyCode]; }
};

// начинаем рисовать после полной загрузки страницы
window.onload = function()
{
init();
animate();
}

function init()
{
scene = new THREE.Scene(); //создаем сцену 
AddCamera( 50, 300, 1200); //добавляем камеру
AddLight( 0, 0, 500 ); //устанавливаем белый свет

//создаем рендерер
renderer = new THREE.WebGLRenderer( { antialias: true } ); 
renderer.setClearColor( 0xffffff );
renderer.setSize( window.innerWidth, window.innerHeight ); 
container = document.getElementById('MyWebGLApp'); 
container.appendChild( renderer.domElement );

//обработчики событий нажатия клавиш
window.addEventListener( 'keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);

//кубик
var geometry = new THREE.BoxGeometry( 50, 50, 50); 
var material = new THREE.MeshNormalMaterial({color: 0x00ff00}); 
Cube = new THREE.Mesh( geometry, material ); 
scene.add( Cube );
}

function dynamo()
{
if (Key.isDown(Key.VK_LEFT)) // движение влево 
{ Cube.position.x -= 10; }
if (Key.isDown(Key.VK_RIGHT)) // движение вправо 
{ Cube.position.x += 10; }
if (Key.isDown(Key.VK_ENTER)) // вверх 
{ Cube.position.y += 10; }
}

function animate()
{
requestAnimationFrame(animate);
render();
}

function render()
{
dynamo(); //управление с помощью клавиатуры 
controls.update(); //управление камерой с помощью мышки 
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
