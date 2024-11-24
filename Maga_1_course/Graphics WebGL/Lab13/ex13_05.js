
// глобальные переменные
var container, camera, controls, scene, renderer, light; 
var segments = 32; 
var graphGeometry; 
var graphMesh;

// начинаем рисовать после полной загрузки страницы
window.onload = function()
{
init();
animate();
}

function init()
{
scene = new THREE.Scene(); //создаем сцену 
AddCamera( 300, 600, 500); //добавляем камеру
AddLight( 0, 0, 500 ); //устанавливаем белый свет

//создаем рендерер
renderer = new THREE.WebGLRenderer( { antialias: true } ); 
renderer.setClearColor( 0xffffff );
renderer.setSize( window.innerWidth, window.innerHeight ); 
container = document.getElementById('MyWebGLApp'); 
container.appendChild( renderer.domElement );

var axes = new THREE.AxisHelper(300); 
axes.position.set( 0,0,0 ); 
scene.add(axes);

ParamFunction = function(rho, teta)
{
rho = 100*rho; 
teta = 2*Math.PI*teta;
x = rho*Math.cos(teta);
y = rho*Math.sin(teta);
var z = rho*rho/40;
return new THREE.Vector3(y, z, x);
};

graphGeometry = new THREE.ParametricGeometry( ParamFunction, segments, segments, false );
var Texture = new THREE.ImageUtils.loadTexture('square.png' );
Texture.wrapS = Texture.wrapT = THREE.RepeatWrapping;
Texture.repeat.set( 40, 40 );
var material = new THREE.MeshBasicMaterial( { map: Texture, vertexColors: THREE.VertexColors, side:THREE.DoubleSide } ); 
material.map.repeat.set( segments, segments );
graphMesh = new THREE.Mesh (graphGeometry, material );


graphGeometry.computeBoundingBox(); 
var yMin = graphGeometry.boundingBox.min.y; 
var yMax = graphGeometry.boundingBox.max.y; 
var yRange = yMax - yMin; 
var color, point, face, numberOfSides, vertexIndex;
var faceIndices = [ 'a', 'b', 'c', 'd' ];
for ( var i = 0; i < graphGeometry.vertices.length; i++ )
{
point = graphGeometry.vertices[ i ]; 
color = new THREE.Color( 0x0000ff ); 
color.setHSL( 0.7 * (yMax - point.y) / yRange, 1,0.5 ); 
graphGeometry.colors[i] = color;
}
for ( var i = 0; i < graphGeometry.faces.length; i++ )
{
face = graphGeometry.faces[ i ];
numberOfSides = ( face instanceof THREE.Face3 ) ? 3 : 4;
for( var j = 0; j < numberOfSides; j++ )
{
vertexIndex = face[ faceIndices[ j ] ]; 
face.vertexColors[ j ] = graphGeometry.colors[ vertexIndex ];
}
}



graphMesh.position.set(0,0,0);
scene.add(graphMesh);
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
