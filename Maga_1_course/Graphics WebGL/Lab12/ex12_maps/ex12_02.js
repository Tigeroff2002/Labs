        var scene, camera, renderer, box;

        init();

        function init(){
            renderer = new THREE.WebGLRenderer({canvas: document.getElementById('primer')});
            var width = 458;
            renderer.setSize(width,width*2/3);

            camera = new THREE.PerspectiveCamera( 70, 1.5, 1, 1000 );
            camera.translateZ(4);

            scene = new THREE.Scene();
            var box_material = new THREE.MeshLambertMaterial({
                color:0xff3333,
                specular: 0x999999,
                shading:THREE.FlatShading
            });
            var box_geometry = new THREE.SphereGeometry(1, 16, 16);
            box_geometry = new THREE.TorusGeometry( 1.5, 0.5, 8, 16 );
            box = new THREE.Mesh( box_geometry, box_material );
            scene.add( box );
            var light = new THREE.AmbientLight( 0x666666 );
            var light1 = new THREE.DirectionalLight( 0xffffff, 0.9 );
            light1.position.set(5, 5, 5);
            light1.lookAt(new THREE.Vector3(  0, 0, 0 ));
            scene.add( light, light1);
            animate();
        }
        function animate(){
            box.rotateY( Math.PI/180 );
            renderer.render( scene, camera );
            requestAnimationFrame( animate );
        }
