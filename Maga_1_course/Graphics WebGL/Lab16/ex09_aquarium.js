var scene, camera, renderer, pyramid1, sphere1, pyramid2, sphere2;

init();
animate();

function init(){
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(600,600);
    document.body.appendChild( renderer.domElement );
    camera = new THREE.PerspectiveCamera( 70, 600 / 600, 1, 1000 );
    camera.translateZ(150);
    scene = new THREE.Scene();
        var obj_material1 = [ 
			new THREE.MeshPhongMaterial( { wireframe: false, side: THREE.DoubleSide, color: 0xff0000 } )
	];
		var obj_material2 = [ 
			new THREE.MeshPhongMaterial( { wireframe: false, side: THREE.DoubleSide, color: 0xaacb00 } )
	];

	var radius_top = 0; 
	var radius_bottom = 16; 
	var heigth = 20; 
	var segments = 3;
	var pyramid_geometry = new THREE.CylinderGeometry( radius_top, radius_bottom, heigth, segments );

	var sphere_geometry = new THREE.SphereGeometry( 20, 6, 8 );

	// рыбка 1
	piramida1 = new THREE.SceneUtils.createMultiMaterialObject( pyramid_geometry, obj_material1 );
	piramida1.position.set(-40,60,0);
	piramida1.rotateY(-Math.PI/2);
	piramida1.translateY(20);
	piramida1.translateX(-10);

	sphere1 = THREE.SceneUtils.createMultiMaterialObject( sphere_geometry, obj_material1 );
	sphere1.position.set( -10, 60, 0 );
	sphere1.rotateY(-Math.PI/2);

	// рыбка 2
	piramida2 = new THREE.SceneUtils.createMultiMaterialObject( pyramid_geometry, obj_material2 );
	piramida2.position.set(-40,0,0);
	piramida2.rotateY(-Math.PI/2);
	piramida2.translateY(20);
	piramida2.translateX(-10);

	sphere2 = THREE.SceneUtils.createMultiMaterialObject( sphere_geometry, obj_material2 );
	sphere2.position.set( -10, 0, 0 );
	sphere2.rotateY(-Math.PI/2);

	// освещение полусферическое
	var light = new THREE.HemisphereLight( 0x666666, 0xff0000, 10 );

	scene.add( light, piramida1, sphere1, piramida2, sphere2);
}
 
function animate(){
	
    renderer.render( scene, camera );
    requestAnimationFrame( animate );
}

