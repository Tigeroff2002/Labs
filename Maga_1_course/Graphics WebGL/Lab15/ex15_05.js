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
 AddCamera( 0, 200, 1700); //добавляем камеру
 AddLight( 0, 0, 500 ); //устанавливаем белый свет
 
 //создаем рендерер
 renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } ); 
 renderer.setClearColor( 0xffffff );
 renderer.setPixelRatio(window.devicePixelRatio);
 renderer.setSize( window.innerWidth, window.innerHeight ); 
 container = document.getElementById('MyWebGLApp'); 
 container.appendChild( renderer.domElement );
 
 //Создаём чёрный фон
 var floorTexture = new THREE.ImageUtils.loadTexture( 'black.jpg' );
 floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; floorTexture.repeat.set( 10, 10 );
 var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
 var floorGeometry = new THREE.PlaneGeometry(10000, 10000, 10, 10);
 var floor = new THREE.Mesh(floorGeometry, floorMaterial);
 scene.add(floor);

//Создаём частицы
 var terrainSize = 200; //размер поверхности 
 var geometry = new THREE.Geometry();
 var vertex;
 for (var i = 0; i < terrainSize; i++) {
    for (var j = 0; j < terrainSize; j++) {
       vertex = new THREE.Vector3();
       vertex.x = (i - terrainSize / 2) * 8 + (Math.random() - 0.5) * 8;
       vertex.y = 125;
       vertex.z = (j - terrainSize / 2) * 8 + (Math.random() - 0.5) * 8;
       geometry.vertices.push(vertex);
    }
 }
 
 // Создание текстуры
 var textureLoader = new THREE.TextureLoader();
 var material = new THREE.PointsMaterial({
        color: 0xffdb8f,
        size: 10,
        map: textureLoader.load("particle.png"),
        blending: THREE.AdditiveBlending,
        transparent: true
  });
 // Добавляем систему частиц на сцену
 var particles = new THREE.Points(geometry, material);
 scene.add(particles);
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
 light = new THREE.DirectionalLight( 0x000000 );
 light.position.set(X,Y,Z);
 scene.add( light );
}
