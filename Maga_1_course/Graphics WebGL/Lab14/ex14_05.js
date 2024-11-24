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
AddCamera( 0, 200, 600); //добавляем камеру
AddLight( 0, 500, 500 ); //устанавливаем белый свет

//создаем рендерер
renderer = new THREE.WebGLRenderer( { antialias: true } ); 
renderer.setClearColor( 0xffffff );
renderer.setSize( window.innerWidth, window.innerHeight ); 
renderer.shadowMapEnabled = true;
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
checkerboard.position.y = 0;
checkerboard.rotation.x = Math.PI / 2;
checkerboard.receiveShadow = true; 
checkerboard.castShadow = true;
scene.add(checkerboard);
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
light.castShadow = true;
scene.add( light );
}
