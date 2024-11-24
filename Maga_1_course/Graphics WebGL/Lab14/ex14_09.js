// глобальные переменные
var container, camera, controls, scene, renderer, light; 
var Cube;
var projector = new THREE.Projector();
var objects = [ ];
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

//      добавляем куб разноцветный
var materials = [
new THREE.MeshBasicMaterial( { color: 0xff0000 }), 
new THREE.MeshBasicMaterial( { color: 0x00ff00 }), 
new THREE.MeshBasicMaterial( { color: 0x0000ff }), 
new THREE.MeshBasicMaterial( { color: 0xff00ff }), 
new THREE.MeshBasicMaterial( { color: 0xffff00 }), 
new THREE.MeshBasicMaterial( { color: 0x00ffff }) 
];
var material = new THREE.MeshFaceMaterial( materials );
var geometry = new THREE.BoxGeometry( 200, 200, 200, 1, 1 );
Cube = new THREE.Mesh( geometry, material );  
Cube.position.x = 0;
Cube.rotation.x = Math.PI / 6; 
Cube.rotation.z = Math.PI / 2; 
Cube.rotation.y = Math.PI / 6; 
scene.add( Cube ); 
objects.push( Cube);
document.addEventListener( 'mousedown', onDocumentMouseDown, false );
}

function onDocumentMouseDown( event ) 
{
 var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, 
                               - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 ); 
 projector.unprojectVector( vector, camera );
 var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
 var intersects = raycaster.intersectObjects( objects ); 
 if ( intersects.length > 0 )
  {
   var index = Math.floor( intersects[0].faceIndex / 2 );
   switch (index)
   {
    case 0:sssr = 'Вы нажали на красную грань!'; break; 
    case 1:sssr = 'Вы нажали на зеленую грань!'; break; 
    case 2:sssr = 'Вы нажали на синюю грань!'; break; 
    case 3:sssr = 'Вы нажали на пурпурную грань!'; break; 
    case 4:sssr = 'Вы нажали на желтую грань!'; break; 
    case 5:sssr = 'Вы нажали на светло-голубую грань!'; break;
   }
  info.innerHTML = sssr;
 }
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
