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

var planeMaterial = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x9999ff });
var planGeo = new THREE.PlaneGeometry(100, 100, 20, 20);
var plane = new THREE.Mesh(planGeo, planeMaterial);
plane.position.set(50,80,50);
plane.rotation.x = Math.PI;
plane.rotation.y = 0;
plane.rotation.z = Math.PI;

// �������������
var material = new THREE.LineBasicMaterial ( { color: 0xcc0000 } );

// отрисовка внешнего контура
var geometry1 = new THREE.Geometry; 
geometry1.vertices.push(new THREE.Vector3 (10, 30, 0 ));
geometry1.vertices.push(new THREE.Vector3 (10, 110, 0 ));
geometry1.vertices.push(new THREE.Vector3 (80, 110, 0 ));
geometry1.vertices.push(new THREE.Vector3 (85, 25, 0 ));
geometry1.vertices.push(new THREE.Vector3 (75, 10, 0 ));
geometry1.vertices.push(new THREE.Vector3 (30, 10, 0 ));
geometry1.vertices.push(new THREE.Vector3 (10, 30, 0 ));

// большая окружность
var radiusLarge = 15;
var pi = Math.PI;
var step = 0.01;
var centerXLarge = 55;
var centerYLarge = 35;

var startPoint = pi/2;

var geometry2 = new THREE.Geometry; 

for (i = 0; i <= 200; i+=1) 
{
    var x = Math.sin(startPoint - pi * step * i) * radiusLarge + centerXLarge;
    var y = Math.cos(startPoint - pi * step * i) * radiusLarge + centerYLarge;

    geometry2.vertices.push(new THREE.Vector3 (x, y, 0 ));
}

// малая окружность
var radiusLarge = 10;
var centerXLarge = 30;
var centerYLarge = 90;

var startPoint = pi/2;

var geometry3 = new THREE.Geometry; 

for (i = 0; i <= 200; i+=1) 
{
    var x = Math.sin(startPoint - pi * step * i) * radiusLarge + centerXLarge;
    var y = Math.cos(startPoint - pi * step * i) * radiusLarge + centerYLarge;

    geometry3.vertices.push(new THREE.Vector3 (x, y, 0 ));
}

// квадрат внутри
var geometry4 = new THREE.Geometry; 

geometry4.vertices.push(new THREE.Vector3 (60, 80, 0 ));
geometry4.vertices.push(new THREE.Vector3 (60, 95, 0 ));
geometry4.vertices.push(new THREE.Vector3 (75, 95, 0 ));
geometry4.vertices.push(new THREE.Vector3 (75, 80, 0 ));
geometry4.vertices.push(new THREE.Vector3 (60, 80, 0 ));

// Отрисовка полученного линиями
var line1 = new THREE.Line( geometry1, material ); 
var line2 = new THREE.Line( geometry2, material ); 
var line3 = new THREE.Line( geometry3, material );
var line4 = new THREE.Line( geometry4, material );

scene.add(plane);

scene.add(line1);
scene.add(line2);
scene.add(line3);
scene.add(line4);
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
controls.rotateSpeed = 0; 
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
