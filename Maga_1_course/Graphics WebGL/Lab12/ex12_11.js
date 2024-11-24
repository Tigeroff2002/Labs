

var scene,camera,renderer,box;
init();
animate();
function init(){
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(800,600);
    document.body.appendChild( renderer.domElement );
	
	camera = new THREE.PerspectiveCamera( 70, 1.5, 1, 1000 );
	camera.translateZ(3);
	camera.lookAt(new THREE.Vector3(  0, 0, 0 ));
	scene = new THREE.Scene();
	var obj_material = [ 
		new THREE.MeshPhongMaterial( { wireframe: false, color: 0xff0000 } ),
		new THREE.MeshBasicMaterial( { wireframe: true, color: 0xffffff } )
	];
	var box_geometry = new THREE.BoxGeometry( 1, 1, 1);
        box = createMultiMaterialObject( box_geometry, obj_material );
	var light1 = new THREE.AmbientLight( 0x666666 );
	var light2 = new THREE.DirectionalLight( 0xffffff, 0.9 );
	light2.position.set(5, 5, 5);
	light2.lookAt(new THREE.Vector3(  0, 0, 0 ));
	scene.add( light1, light2, box );
	animate();
}
function animate(){
	box.rotateX( Math.PI/360 );
    renderer.render( scene, camera );
    requestAnimationFrame( animate );
}

function createMultiMaterialObject( geometry, materials ) {
		var group = new THREE.Object3D();
		for ( var i = 0, l = materials.length; i < l; i ++ ) {
			group.add( new THREE.Mesh( geometry, materials[ i ] ) );
		}
		return group;
}

