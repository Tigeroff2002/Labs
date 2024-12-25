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
AddCamera( 2, 200, 200); //добавляем камеру
AddLight( 500, 500, 500 ); //устанавливаем белый свет
AddLight( 500, 500, -500 ); //устанавливаем белый свет
//создаем рендерер
renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } ); 
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor( 0x6f267d, 0 );
renderer.setSize( window.innerWidth, window.innerHeight ); 
container = document.getElementById('MyWebGLApp'); 
container.appendChild( renderer.domElement );

var onProgress = function ( ) { };
var onError = function () { };

var loader = new THREE.MTLLoader();  // лоадер mtl
loader.load ( 'cube.mtl', 
              function ( materials ) 
               {
		materials.preload();
		var loader2 = new THREE.OBJLoader();  // лоадер obj
		loader2.setMaterials( materials );
		loader2.load( 'cube.obj', 
                function ( object ) 
                 {
		  object.position.y = 0;
                  object.scale.x = 50.0;
                  object.scale.y = 50.0;
                  object.scale.z = 50.0;
		  scene.add( object );
		 }, onProgress, onError );
	       } );
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
camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 3000 );
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
