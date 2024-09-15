// ���������� ����������
var container, camera, controls, scene, renderer, light; 
var spline = new THREE.SplineCurve([
new THREE.Vector2(4, 7), 
new THREE.Vector2(5, 8), 
new THREE.Vector2(7, 0), 
new THREE.Vector2(8, 0), 
new THREE.Vector2(9, 8), 
new THREE.Vector2(9, 9), 
new THREE.Vector2(10, 0), 
new THREE.Vector2(10, 11),
new THREE.Vector2(11, 8),
new THREE.Vector2(11, 9), 
new THREE.Vector2(12, 7),
new THREE.Vector2(14, 2)
]);
// �������� �������� ����� ������ �������� ��������
window.onload = function()
{
init();
animate();
}

function init()
{
scene = new THREE.Scene(); //������� ����� 
AddCamera( 0, 30, 50); //��������� ������
AddLight( 0, 0, 50 ); //������������� ����� ����

//������� ��������
renderer = new THREE.WebGLRenderer( { antialias: true } ); 
renderer.setClearColor( 0xffffff );
renderer.setSize( window.innerWidth, window.innerHeight ); 
container = document.getElementById('MyWebGLApp'); 
container.appendChild( renderer.domElement );

// ������
var geometry = new THREE.Geometry;
var material = new THREE.LineBasicMaterial( { color: 0xcc0000 } );
// ������� ������� � geometry:
for (var i = 0; i <= 1; i+=0.01)
{
var x = spline.getPoint( i ).x;
var y = spline.getPoint( i ).y;
var vec = new THREE.Vector3( x, y, 0 );
geometry.vertices.push( vec );
}
// ������ �����:
var line = new THREE.Line( geometry, material ); 
scene.add( line );
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
