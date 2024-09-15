v0 = new THREE.Vector2(4, 7);
v1 = new THREE.Vector2(5, 8);
v2 = new THREE.Vector2(7, 0);
v3 = new THREE.Vector2(8, 0);
v4 = new THREE.Vector2(9, 8);
v5 = new THREE.Vector2(9, 9);
v6 = new THREE.Vector2(10, 0);
v7 = new THREE.Vector2(10, 11);
v8 = new THREE.Vector2(11, 8);
v9 = new THREE.Vector2(11, 9);
v10 = new THREE.Vector2(12, 7);
v11 = new THREE.Vector2(14, 2);

var numberPoints = 12;
// ��������� ������ �����:
var curve = new THREE.QuadraticBezierCurve( v0, v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11);

// ���������� ����������
var container, camera, controls, scene, renderer, light; 
// �������� �������� ����� ������ �������� ��������
window.onload = function()
{
init();
animate();
}

function init()
{
scene = new THREE.Scene(); //������� ����� 
AddCamera( 0, 300, 500); //��������� ������
AddLight( 0, 0, 500 ); //������������� ����� ����

//������� ��������
renderer = new THREE.WebGLRenderer( { antialias: true } ); 
renderer.setClearColor( 0xffffff );
renderer.setSize( window.innerWidth, window.innerHeight ); 
container = document.getElementById('MyWebGLApp'); 
container.appendChild( renderer.domElement );

// �������� ������� ��������� � �������� � ��������� ��������� ������� ������ �����:
var geometry = new THREE.Geometry;
var material = new THREE.LineBasicMaterial( { color: 0x95cc32 } );
for (var i = 0; i < numberPoints; i += 1)
{
var x = curve.getPoint( i ).x; 
var y = curve.getPoint( i ).y; 
var vec = new THREE.Vector3( x, y, 0 );
geometry.vertices.push( vec );
}
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
