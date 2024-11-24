var container, camera, controls, scene, renderer, light;
var segments = 32;
var graphGeometry;
var graphMesh;

window.onload = function() {
    init();
    animate();
}

function init() {
    scene = new THREE.Scene();
    AddCamera(300, 600, 500); 
    AddLight(0, 500, 500);  

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0x87ceeb);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container = document.getElementById('MyWebGLApp');
    container.appendChild(renderer.domElement);

    ParamFunction = function(rho, teta) {
        rho = 50 * Math.sin(Math.PI * rho); 
        teta = 2 * Math.PI * teta;
        var x = rho * Math.cos(teta);
        var y = rho * Math.sin(teta);
        var z = 10 * Math.sin(3 * teta); 
        return new THREE.Vector3(x, z, y);
    };

    graphGeometry = new THREE.ParametricGeometry(ParamFunction, segments, segments, false);
    var material = new THREE.MeshPhongMaterial({ color: 0x32cd32, side: THREE.DoubleSide }); 
    graphMesh = new THREE.Mesh(graphGeometry, material);
    graphMesh.doubleSided = true;
    graphMesh.position.set(0, -50, 0);
    scene.add(graphMesh);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    controls.update();
    renderer.render(scene, camera);
}

function AddCamera(X, Y, Z) {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(X, Y, Z);
    controls = new THREE.TrackballControls(camera, container);
    controls.rotateSpeed = 2;
    controls.noZoom = false;
    controls.zoomSpeed = 1.2;
    controls.staticMoving = true;
}

function AddLight(X, Y, Z) {
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(X, Y, Z);
    scene.add(light);
}