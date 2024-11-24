var container, camera, controls, scene, renderer, light;
var segments = 32;
var graphGeometry;
var graphMesh;

// Запуск сцены
window.onload = function() {
    init();
    animate();
}

function init() {
    // Создание сцены
    scene = new THREE.Scene();
    AddCamera(300, 600, 500);  // Размещение камеры
    AddLight(0, 500, 500);     // Добавление освещения

    // Настройка рендерера
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0x87ceeb); // Голубой цвет фона (как вода)
    renderer.setSize(window.innerWidth, window.innerHeight);
    container = document.getElementById('MyWebGLApp');
    container.appendChild(renderer.domElement);

    // Параметрическая функция для создания волнистой поверхности
    ParamFunction = function(rho, teta) {
        rho = 50 * Math.sin(Math.PI * rho);  // Волнистая форма
        teta = 2 * Math.PI * teta;
        var x = rho * Math.cos(teta);
        var y = rho * Math.sin(teta);
        var z = 10 * Math.sin(3 * teta);  // Дополнительное изменение формы
        return new THREE.Vector3(x, z, y);
    };

    // Создание параметрической геометрии для подводной поверхности
    graphGeometry = new THREE.ParametricGeometry(ParamFunction, segments, segments, false);
    var material = new THREE.MeshPhongMaterial({ color: 0x32cd32, side: THREE.DoubleSide });  // Зеленый цвет для подводной поверхности
    graphMesh = new THREE.Mesh(graphGeometry, material);
    graphMesh.doubleSided = true;  // Двойная сторона
    graphMesh.position.set(0, -50, 0);  // Установка вниз, чтобы не перекрывать другие объекты
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
