// ���������� ����������
var container, camera, controls, scene, renderer, light; 
var Cube;
var spline = new THREE.SplineCurve3([
    new THREE.Vector3(4, 7, 0), 
    new THREE.Vector3(5, 8, 0), 
    new THREE.Vector3(7, 0, 0), 
    new THREE.Vector3(8, 0, 0), 
    new THREE.Vector3(9, 8, 0), 
    new THREE.Vector3(9, 9, 0), 
    new THREE.Vector3(10, 0, 0), 
    new THREE.Vector3(10, 11, 0),
    new THREE.Vector3(11, 8, 0),
    new THREE.Vector3(11, 9, 0), 
    new THREE.Vector3(12, 7, 0),
    new THREE.Vector3(14, 2, 0)
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

//3D spline
var material = new THREE.LineBasicMaterial( { color: 0xcc0000 } );
var tubegeo = new THREE.TubeGeometry( spline, 16, 1, 4 ); 
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
