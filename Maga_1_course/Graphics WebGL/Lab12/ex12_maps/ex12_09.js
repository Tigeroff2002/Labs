        var scene, camera, renderer, sphere;

        init();

        function init(){
            renderer = new THREE.WebGLRenderer({canvas: document.getElementById('primer')});
            var width = 783;
            renderer.setSize(width,width*2/3);

            camera = new THREE.PerspectiveCamera( 70, 1.5, 1, 1000 );
            camera.translateZ(3);

            scene = new THREE.Scene();
			var cubemap = new THREE.ImageUtils.loadTextureCube([
				'px.png','nx.png',
				'py.png','ny.png',
				'pz.png','nz.png'
			]);
			cubemap.mapping = THREE.CubeReflectionMapping;
			var sphere_material = new THREE.MeshPhongMaterial({
				envMap: cubemap
			});
			console.log(sphere_material);
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
            renderer.render( scene, camera );
            requestAnimationFrame( animate );
        }
