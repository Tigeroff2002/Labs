var scene, camera, renderer, pyramid1, sphere1, pyramid2, sphere2;

init();

function init() {
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('primer') });
    var width = 783;
    renderer.setSize(width, width * 2 / 3);
    camera = new THREE.PerspectiveCamera(70, 1.5, 1, 1000);
    camera.position.z = 150;
    scene = new THREE.Scene();

    var obj_material1 = new THREE.MeshPhongMaterial({ wireframe: false, side: THREE.DoubleSide, color: 0xff0000 });
    var obj_material2 = new THREE.MeshPhongMaterial({ wireframe: false, side: THREE.DoubleSide, color: 0xaacb00 });

    var radius_top = 0;
    var radius_bottom = 16;
    var height = 20;
    var segments = 3;
    var pyramid_geometry = new THREE.CylinderGeometry(radius_top, radius_bottom, height, segments);
    var sphere_geometry = new THREE.SphereGeometry(20, 6, 8);

    pyramid1 = createMultiMaterialObject(pyramid_geometry, [obj_material1, obj_material2]);
    pyramid1.position.set(-40, 60, 0);

    sphere1 = createMultiMaterialObject(sphere_geometry, [obj_material1, obj_material2]);
    sphere1.position.set(-10, 60, 0);

    pyramid2 = createMultiMaterialObject(pyramid_geometry, [obj_material1, obj_material2]);
    pyramid2.position.set(-40, 0, 0);

    sphere2 = createMultiMaterialObject(sphere_geometry, [obj_material1, obj_material2]);
    sphere2.position.set(-10, 0, 0);

    scene.add(pyramid1, sphere1, pyramid2, sphere2);

    // Освещение
    var light = new THREE.AmbientLight(0x666666);
    var light1 = new THREE.DirectionalLight(0xffffff, 0.9);
    light1.position.set(50, 50, 50);
    scene.add(light, light1);

    animate();
}

function animate() {
    pyramid1.rotation.y += Math.PI / 360;
    sphere1.rotation.y += Math.PI / 360;
    pyramid2.rotation.y += Math.PI / 360;
    sphere2.rotation.y += Math.PI / 360;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

function createMultiMaterialObject(geometry, materials) {
    var group = new THREE.Group();
    materials.forEach(material => {
        var mesh = new THREE.Mesh(geometry, material);
        group.add(mesh);
    });
    return group;
}
