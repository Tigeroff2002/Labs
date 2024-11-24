// глобальные переменные
var container, camera, controls, scene, renderer, light; 
var objects = [ ];
var projector = new THREE.Projector();
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

for ( var i = 0; i< 10; i ++ )
{
// создаем параллелепипеды
var geometry = new THREE.BoxGeometry( 100*Math.random()+50, 100*Math.random()+50, 100*Math.random()+50 );
var material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff, opacity: 0.5 } );
var object = new THREE.Mesh( geometry, material );  
// задаем их повороты, расположение 
object.position.set( Math.random()*70, Math.random()*60, Math.random()*10 );
object.position.z = (Math.random() - Math.random()) * 400;
object.position.y = (Math.random() - Math.random()) * 400;
object.position.x = (Math.random() - Math.random()) * 400;
object.rotation.y = - Math.PI / Math.random() * 6;

scene.add( object ); // параллелепипед выводим на сцену 
objects.push( object ); // параллелепипед запоминаем в массиве objects
}
window.addEventListener( 'resize', onWindowResize, false );
document.addEventListener( 'mousemove',onDocumentMouseMove, false ); 


}

function onDocumentMouseMove( event )
{
var vector = new THREE.Vector3(( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
projector.unprojectVector( vector, camera );
var raycaster = new THREE.Raycaster (camera.position, vector.sub (camera.position ).normalize() );
var intersects = raycaster.intersectObjects( objects );
if ( intersects.length> 0 ) // если массив не пуст
 {
 intersects[0].object.material.color.setHex( Math.random()*0xffffff );
// другие действия
 }
//for ( var i in intersects )
//{
//intersects[ i ].object.material.color.setHex( Math.random()*0xffffff );
// другие действия
//}
}

function onWindowResize()
{
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize( window.innerWidth, window.innerHeight );
}


function animate()
{
requestAnimationFrame(animate);
render();
}

function render()
{
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
