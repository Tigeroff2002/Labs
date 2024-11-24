// глобальные переменные
var container, camera, controls, scene, renderer, light; 
var objects = [ ];
var projector = new THREE.Projector();
var x_previous=0, z_previous=0;
var SELECTED = null; 

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

// шахматная доска
var Texture = new THREE.ImageUtils.loadTexture( 'checkerboard.jpg' );
Texture.wrapS = THREE.RepeatWrapping;
Texture.wrapT = THREE.RepeatWrapping;
Texture.repeat.set( 4, 4 );
Texture.offset.set( 0.5, 0 );
var Material = new THREE.MeshBasicMaterial( { map: Texture, side: THREE.DoubleSide } );
var Geometry = new THREE.PlaneGeometry(400, 400, 1, 1);
var checkerboard = new THREE.Mesh(Geometry, Material);
checkerboard.position.y = -8;
checkerboard.rotation.x = Math.PI / 2;
checkerboard.receiveShadow = true; 
checkerboard.castShadow = true;
scene.add(checkerboard);
objects.push( checkerboard );

// шашки
var x0 = -175; 
var z0 = 175;
var key_count=12;
for ( var i = 0; i < key_count; i ++ )
 {
  var geometry = new THREE.CylinderGeometry( 22, 22, 16, 36 ); 
  var material = new THREE.MeshPhongMaterial( { color: 0x9b2d30, specular: 0x00b2fc, 
                                     emissive: 0x000000, shininess: 40, shading: THREE.FlatShading,
                                     blending: THREE.NormalBlending, depthTest: true } );
  var object = new THREE.Mesh( geometry, material );
  if (i==4) { x0 = -175 - 7 * 50; z0 = 175 - 50; } 
  if (i==8) { x0 = -175 - 16 * 50; z0 = 175 - 2*50; }
  object.position.set( x0 + i * 2*50, 0, z0); 
  scene.add( object ); 
  objects.push( object );
 }

window.addEventListener( 'resize', onWindowResize, false );
document.addEventListener( 'mousemove',onDocumentMouseMove, false ); 
document.addEventListener( 'mousedown',onDocumentMouseDown, false ); 
document.addEventListener( 'mouseup',onDocumentMouseUp, false ); 
}

function onDocumentMouseDown( event )
 {
  var vector = new THREE.Vector3(( event.clientX / window.innerWidth ) * 2 - 1, 
                               - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
  projector.unprojectVector( vector, camera );
  var raycaster = new THREE.Raycaster (camera.position, vector.sub (camera.position ).normalize() );
  var intersects = raycaster.intersectObjects( objects );
  if ( intersects.length> 0 ) // если массив не пуст
   {
    controls.enabled = false;
    var k = objects.indexOf(intersects[ 0 ].object);
    if (k==0) { return; } // мышка кликнула над доской 
    SELECTED = intersects[ 0 ].object; 
    x_previous = SELECTED.position.x; 
    z_previous = SELECTED.position.z;
 }
}

function onDocumentMouseMove( event )
 {
  var vector = new THREE.Vector3(( event.clientX / window.innerWidth ) * 2 - 1, 
                               - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
  projector.unprojectVector( vector, camera );
  var raycaster = new THREE.Raycaster (camera.position, vector.sub (camera.position ).normalize() );
  if ( SELECTED )
   {
    var intersects = raycaster.intersectObjects( objects );
    SELECTED.position.x = intersects[ 0 ].point.sub( vector ).x; 
    SELECTED.position.z = intersects[ 0 ].point.sub( vector ).z; 
    SELECTED.position.y = 0;
    container.style.cursor = 'move';
   }
 }

function onDocumentMouseUp( event )
 {
  controls.enabled = true; 
  flag = false; 
  if ( SELECTED )
   {
    // находим центр ближайшей черной клетки 
    for (i=0; i<8; i++)
     {
      for (j=0; j<8; j++)
       {
        if ((i+j)%2==0)
         {
          var dx = Math.abs( SELECTED.position.x - ( -175 + 50 * i ) ); 
          var dz = Math.abs( SELECTED.position.z - ( 175 - 50 * j ) ); 
          var dr = Math.sqrt( dx*dx + dz*dz); 
          if ( dr < 22 )
           {
            SELECTED.position.x =-175 + 50 * i; 
            SELECTED.position.z =175 - 50 * j; 
            flag = true; 
            break;
           }
         }
       }    
     }
    if (!flag) // черная клеточка слишком далека 
     {
      SELECTED.position.x = x_previous;
      SELECTED.position.z = z_previous;
     }
    SELECTED = null;
   }
  container.style.cursor = 'auto';
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
