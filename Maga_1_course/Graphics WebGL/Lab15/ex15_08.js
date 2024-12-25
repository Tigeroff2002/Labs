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
AddCamera( 2, 200, 700); //добавляем камеру
AddLight( 0, 0, 500 ); //устанавливаем белый свет

//создаем рендерер
renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } ); 
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor( 0x6f267d, 0 );
renderer.setSize( window.innerWidth, window.innerHeight ); 
container = document.getElementById('MyWebGLApp'); 
container.appendChild( renderer.domElement );

//var terrainSize = 100; 
var terrainSize = terrain.length;
    // Создание частиц
var geometry = new THREE.SphereGeometry(5, 5, 5); 
var material = new THREE.MeshLambertMaterial( { color: 0xffdb8f } );
 for (var i = 0; i < terrainSize; i++) {
    for (var j = 0; j < terrainSize; j++) {
      var Psphere = new THREE.Mesh( geometry, material );
      Psphere.position.x = (i - terrainSize / 2) * 8 + (Math.random() - 0.5) * 8;
      Psphere.position.y = terrain[i][j] / 3;
      Psphere.position.z = (j - terrainSize / 2) * 8 + (Math.random() - 0.5) * 8;
      scene.add (Psphere );
        }
    }
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
