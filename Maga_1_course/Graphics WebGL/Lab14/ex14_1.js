var scene, camera, renderer, pyramid1, sphere1, pyramid2, sphere2;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var selectedObject = null;

init();
animate();

function init() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(600, 600);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(70, 600 / 600, 1, 1000);
    camera.position.z = 150;

    scene = new THREE.Scene();

    var obj_material1 = [
        new THREE.MeshPhongMaterial({ wireframe: false, side: THREE.DoubleSide, color: 0xff0000 }),
    ];
    var obj_material2 = [
        new THREE.MeshPhongMaterial({ wireframe: false, side: THREE.DoubleSide, color: 0xaacb00 }),
    ];

    var radius_top = 0;
    var radius_bottom = 16;
    var height = 20;
    var segments = 3;
    var pyramid_geometry = new THREE.CylinderGeometry(radius_top, radius_bottom, height, segments);

    var sphere_geometry = new THREE.SphereGeometry(20, 6, 8);

    // Рыбка 1
    pyramid1 = new THREE.Mesh(pyramid_geometry, obj_material1);
    pyramid1.position.set(-40, 60, 0);
    pyramid1.rotation.y = -Math.PI / 2;

    sphere1 = new THREE.Mesh(sphere_geometry, obj_material1);
    sphere1.position.set(-10, 60, 0);

    // Рыбка 2
    pyramid2 = new THREE.Mesh(pyramid_geometry, obj_material2);
    pyramid2.position.set(-40, 0, 0);
    pyramid2.rotation.y = -Math.PI / 2;

    sphere2 = new THREE.Mesh(sphere_geometry, obj_material2);
    sphere2.position.set(-10, 0, 0);

    // Освещение
    var light = new THREE.HemisphereLight(0x666666, 0xff0000, 1);
    scene.add(light);

    // Добавление объектов в сцену
    scene.add(pyramid1, sphere1, pyramid2, sphere2);

    // Обработка событий мыши
    renderer.domElement.addEventListener('mousedown', onMouseDown, false);
    renderer.domElement.addEventListener('mousemove', onMouseMove, false);
    renderer.domElement.addEventListener('mouseup', onMouseUp, false);
}

function animate() {
    // Вращение объекта sphere1
    sphere1.rotation.y += 0.02;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

function onMouseDown(event) {
    // Преобразование координат мыши
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects([sphere1, sphere2, pyramid1, pyramid2]);

    if (intersects.length > 0) {
        selectedObject = intersects[0].object;
        console.log(`Вы выбрали объект: ${selectedObject.uuid}`);
    }
}

function onMouseMove(event) {
    if (selectedObject) {
        // Перемещение объекта
        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(scene.children);

        if (intersects.length > 0) {
            var point = intersects[0].point;
            selectedObject.position.copy(point);
        }
    }
}

function onMouseUp() {
    selectedObject = null;
}
