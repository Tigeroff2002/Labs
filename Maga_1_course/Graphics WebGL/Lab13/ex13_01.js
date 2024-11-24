var scene, camera, renderer, controls, light, lathe, pyramid1, sphere1, pyramid2, sphere2;

window.onload = function() {
    init();
    animate();
};

function init() {
    // Создаём сцену
    scene = new THREE.Scene();

    // Добавляем камеру
    AddCamera(0, 300, 500);

    // Добавляем освещение
    AddLight(0, 300, 500);

    // Устанавливаем рендерер
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0x87ceeb); // Голубой фон для воды
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Материал для тела вращения (водоросли)
    var material = new THREE.MeshPhongMaterial({
        color: 0x32cd32, // Зелёный цвет для водорослей
        specular: 0x00b2fc,
        shininess: 50,
        side: THREE.DoubleSide
    });

    // Создаём профиль водоросли
    var points = [];
    for (var i = 0; i < 10; i += 0.5) {
        var x = Math.sin(i * 0.5) * 10 + 5; // Волнистая форма
        var y = i * 10;
        points.push(new THREE.Vector3(x, y, 0));
    }

    // Создаём тело вращения (водоросль)
    var latheGeometry = new THREE.LatheGeometry(points, 64);
    lathe = new THREE.Mesh(latheGeometry, material);
    lathe.position.set(0, -50, 0); // Устанавливаем водоросль внизу сцены
    scene.add(lathe);

    // Материалы для пирамид и сфер (рыбок)
    var obj_material1 = [
        new THREE.MeshPhongMaterial({ wireframe: false, side: THREE.DoubleSide, color: 0xff0000 }) // Рыбка 1
    ];
    var obj_material2 = [
        new THREE.MeshPhongMaterial({ wireframe: false, side: THREE.DoubleSide, color: 0xaacb00 }) // Рыбка 2
    ];

    var radius_top = 0;
    var radius_bottom = 16;
    var height = 20;
    var segments = 3;
    var pyramid_geometry = new THREE.CylinderGeometry(radius_top, radius_bottom, height, segments);
    var sphere_geometry = new THREE.SphereGeometry(20, 6, 8);

    // Рыбка 1
    pyramid1 = new THREE.Mesh(pyramid_geometry, obj_material1[0]);
    pyramid1.position.set(-80, 60, 0); // Дальше от водорослей
    pyramid1.rotateY(-Math.PI / 2);
    pyramid1.translateY(20);
    pyramid1.translateX(-10);

    sphere1 = new THREE.Mesh(sphere_geometry, obj_material1[0]);
    sphere1.position.set(-50, 60, 0); // Дальше от водорослей
    sphere1.rotateY(-Math.PI / 2);

    // Рыбка 2
    pyramid2 = new THREE.Mesh(pyramid_geometry, obj_material2[0]);
    pyramid2.position.set(-80, 0, 0); // Дальше от водорослей
    pyramid2.rotateY(-Math.PI / 2);
    pyramid2.translateY(20);
    pyramid2.translateX(-10);

    sphere2 = new THREE.Mesh(sphere_geometry, obj_material2[0]);
    sphere2.position.set(-50, 0, 0); // Дальше от водорослей
    sphere2.rotateY(-Math.PI / 2);

    // Освещение
    var light = new THREE.HemisphereLight(0x666666, 0xff0000, 10);
    scene.add(light);

    // Добавляем объекты (пирамиды и сферы) на сцену
    scene.add(pyramid1, sphere1, pyramid2, sphere2);
}

function animate() {
    // Анимация объектов
    pyramid1.rotateY(Math.PI / 360);
    sphere1.rotateY(Math.PI / 360);
    pyramid2.rotateY(Math.PI / 360);
    sphere2.rotateY(Math.PI / 360);
    lathe.rotateY(Math.PI / 360);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

function AddCamera(X, Y, Z) {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(X, Y, Z);
    controls = new THREE.TrackballControls(camera, document.body);
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