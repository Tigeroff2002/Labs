var scene, camera, renderer, box, prizma, clone_prizma, torus, bounding_sphere, polygon_object;

init();
animate();

function init(){
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(600,600);
    document.body.appendChild( renderer.domElement );
    camera = new THREE.PerspectiveCamera( 70, 600 / 600, 1, 1000 );
    camera.translateZ(150);
    scene = new THREE.Scene();
        var obj_material = [ 
			// однородный материал видный с двух сторон
			new THREE.MeshPhongMaterial( { wireframe: false, side: THREE.DoubleSide, color: 0xff0000 } )
	];

    var polygon_geometry = new THREE.BoxGeometry( 10, 30, 5, 2, 3, 1);
/* 	box = THREE.SceneUtils.createMultiMaterialObject( box_geometry, obj_material );
	box.position.set( -70, 60, 0 ); */

    var box_geometry = new THREE.BoxGeometry( 20, 40, 10, 2, 4, 1);

	// присоединение полигонального объекта
	box_geometry.mergeMesh(polygon_geometry);

	box = THREE.SceneUtils.createMultiMaterialObject( box_geometry, obj_material );
	box.position.set( -70, 60, 0 );

	var radius_top = 16; 
	var radius_bottom = 16;
	var heigth = 30; 
	var segments = 3;
	var prizma_geometry = new THREE.CylinderGeometry(radius_top, radius_bottom, heigth, segments );
	prizma = new THREE.SceneUtils.createMultiMaterialObject( prizma_geometry, obj_material );
	prizma.position.set(-20,30,0);

	// копирование объекта
	var clone_prizma_geometry = prizma_geometry.clone();
	clone_prizma = new THREE.SceneUtils.createMultiMaterialObject( clone_prizma_geometry, obj_material );
	clone_prizma.position.set(-20,60,0);
	
	var torus_geometry = new THREE.TorusGeometry( 15, 5, 8, 16, 2*Math.PI );
	torus = THREE.SceneUtils.createMultiMaterialObject( torus_geometry, obj_material );
	torus.position.set( 50, 0, 0 );

	// вычисление ограничивающей сферы
	var boundingSphereGeometry = torus_geometry.computeBoundingSphere();
	bounding_sphere = THREE.SceneUtils.createMultiMaterialObject( boundingSphereGeometry, obj_material );
	bounding_sphere.position.set( 50, 0, 0 );

	// освещение полусферическое
	var light = new THREE.HemisphereLight( 0x666666, 0xff0000, 10 );

	// вычисление нормалей к граням
	box_geometry.computeFaceNormals();
	prizma_geometry.computeFaceNormals();
	torus_geometry.computeFaceNormals();
     
    scene.add( light, box, torus, prizma, clone_prizma, bounding_sphere);
}
 
function animate(){
 	box.rotateY( Math.PI/180 );
 	box.rotateX( Math.PI/360 );

	prizma.rotateY(Math.PI / 180);
	prizma.rotateX( Math.PI/360 );

	torus.rotateY( Math.PI/180 );
	torus.rotateX( Math.PI/360 );
	
    renderer.render( scene, camera );
    requestAnimationFrame( animate );
}

