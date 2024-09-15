// ���������� ����������
var container, camera, controls, scene, renderer, light; 
var Cube;

var v0 = new THREE.Vector3(4, 7, 0);
var v1 = new THREE.Vector3(5, 8, 0);
var v2 = new THREE.Vector3(7, 0, 0);
var v3 = new THREE.Vector3(8, 0, 0);
var v4 = new THREE.Vector3(9, 8, 0);
var v5 = new THREE.Vector3(9, 9, 0);
var v6 = new THREE.Vector3(10, 0, 0);
var v7 = new THREE.Vector3(10, 11, 0);
var v8 = new THREE.Vector3(11, 8, 0);
var v9 = new THREE.Vector3(11, 9, 0);
var v10 = new THREE.Vector3(12, 7, 0);
var v11 = new THREE.Vector3(14, 2, 0);

var quadBezie = new THREE.CubicBezierCurve3(v0, v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11);

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

//3D spline
var material = new THREE.LineBasicMaterial( { color: 0x97cc36 } );
var tubegeo = new THREE.TubeGeometry( quadBezie, 5, 1, 3 ); 
var tube = new THREE.Mesh( tubegeo, material ); 
scene.add( tube );
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
