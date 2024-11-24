var scene, camera, renderer, pyramid1, sphere1, pyramid2, sphere2;

    init();

    function init() {
        renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('primer') });
        var width = 783;
        renderer.setSize(width, width * 2 / 3);
        camera = new THREE.PerspectiveCamera(70, 1.5, 1, 1000);
        camera.translateZ(150);
        scene = new THREE.Scene();

        var texture = new THREE.ImageUtils.loadTexture('fish.jpg');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(2, 2);

        var obj_material1 = new THREE.MeshPhongMaterial({
            map:texture
        });
        var obj_material2 = new THREE.MeshPhongMaterial({
            map:texture
        });

        var radius_top = 0;
        var radius_bottom = 16;
        var height = 20;
        var segments = 3;
        var pyramid_geometry = new THREE.CylinderGeometry(radius_top, radius_bottom, height, segments);

        var sphere_geometry = new THREE.SphereGeometry(20, 6, 8);

        pyramid1 = new THREE.Mesh(pyramid_geometry, obj_material1);
        pyramid1.position.set(-40, 60, 0);
        pyramid1.rotateY(-Math.PI / 2);
        pyramid1.translateY(20);
        pyramid1.translateX(-10);

        sphere1 = new THREE.Mesh(sphere_geometry, obj_material1);
        sphere1.position.set(-10, 60, 0);
        sphere1.rotateY(-Math.PI / 2);

        pyramid2 = new THREE.Mesh(pyramid_geometry, obj_material2);
        pyramid2.position.set(-40, 0, 0);
        pyramid2.rotateY(-Math.PI / 2);
        pyramid2.translateY(20);
        pyramid2.translateX(-10);

        sphere2 = new THREE.Mesh(sphere_geometry, obj_material2);
        sphere2.position.set(-10, 0, 0);
        sphere2.rotateY(-Math.PI / 2);

        scene.add(pyramid1, sphere1, pyramid2, sphere2);

        var light = new THREE.AmbientLight(0x666666);
        var light1 = new THREE.DirectionalLight(0xffffff, 0.9);
        light1.position.set(50, 50, 50);
        scene.add(light, light1);

        animate();
    }

    function animate() {
        pyramid1.rotateY(Math.PI / 360);
        sphere1.rotateY(Math.PI / 360);
        pyramid2.rotateY(Math.PI / 360);
        sphere2.rotateY(Math.PI / 360);

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }