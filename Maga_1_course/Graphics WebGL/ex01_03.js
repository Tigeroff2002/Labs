// ���������� ����������
var container, camera, controls, scene, renderer, light; 
var Cube;

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

//��������� ���
var geometry = new THREE.BoxGeometry( 200, 100, 150); 
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); 
Cube = new THREE.Mesh( geometry, material );
Cube.position.z = -100;
Cube.rotation.y = -Math.PI / 12; 
scene.add( Cube );

var geometry = new THREE.BoxGeometry( 100, 100, 30); 
var material = new THREE.MeshBasicMaterial( { color: 0xffffff } ); 
Cube = new THREE.Mesh( geometry, material );
Cube.position.z = 0;
Cube.position.y = 20;
Cube.rotation.y = -Math.PI / 12; 
scene.add( Cube );
}

function animate()
{
requestAnimationFrame(animate);
render();
}
 
function render()
{
//Cube.position.x = Cube.position.x + 0; // +1 - ��� �������� 
//Cube.rotation.y = Cube.rotation.y + 0.01; //� ��������� ������ ��� 
controls.update(); 
renderer.render(scene, camera);
}

function AddCamera(X,Y,Z) 
{
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.set(X,Y,Z);
controls = new THREE.TrackballControls(camera,container);
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
