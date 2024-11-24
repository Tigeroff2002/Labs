        var scene, camera, renderer, sphere;

        init();

        function init(){
            renderer = new THREE.WebGLRenderer({canvas: document.getElementById('primer')});
            var width = 783;
            renderer.setSize(width,width*2/3);

            camera = new THREE.PerspectiveCamera( 70, 1.5, 1, 1000 );
            camera.translateZ(3);

            scene = new THREE.Scene();
            var alphamap = new THREE.ImageUtils.loadTexture('alphamap.jpg');
            alphamap.wrapS = THREE.RepeatWrapping;
            alphamap.wrapT = THREE.RepeatWrapping;
            alphamap.repeat.set( 1, 1 );
            var sphere_material = new THREE.MeshPhongMaterial({
                transparent:true,
                color:0xFF0000,
                alphaMap:alphamap,
                alphaTest:0.5,
                side: THREE.DoubleSide
            });

            var sphere_geometry = new THREE.SphereGeometry(1, 16, 16);
            sphere = new THREE.Mesh( sphere_geometry, sphere_material );
            scene.add( sphere );
            var light = new THREE.AmbientLight( 0x666666 );
            var light1 = new THREE.DirectionalLight( 0xffffff, 0.9 );
            light1.position.set(5, 5, 5);
            light1.lookAt(new THREE.Vector3(  0, 0, 0 ));
            scene.add( light, light1);
            animate();
        }
        function animate(){
            sphere.rotateY( Math.PI/360 );
            renderer.render( scene, camera );
            requestAnimationFrame( animate );
        }
