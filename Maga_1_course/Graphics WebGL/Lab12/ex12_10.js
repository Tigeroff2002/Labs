

var scene,camera,renderer,cylinder;
init();
animate();
function init(){
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(800,600);
    document.body.appendChild( renderer.domElement );
	
	camera = new THREE.PerspectiveCamera( 70, 1.5, 1, 1000 );
	camera.translateZ(5);
	camera.lookAt(new THREE.Vector3(  0, 0, 0 ));
	scene = new THREE.Scene();
	
	var cylinder_materials = new THREE.MeshFaceMaterial([
		new THREE.MeshPhongMaterial({color:0xff0000, metal:true, speculat:0x999999, emissive:0x700000, shines:90}),
		new THREE.MeshPhongMaterial({color:0x00ff00, metal:true, speculat:0x999999, emissive:0x007000, shines:90}),
		new THREE.MeshPhongMaterial({color:0x0000ff, metal:true, speculat:0x999999, emissive:0x000070, shines:90})
	]);
	var cylinder_geometry = new THREE.CylinderGeometry( 1, 1, 5, 15, 5 );
	for (var i=0;i<(cylinder_geometry.faces.length-30)/2;i++){
		cylinder_geometry.faces[2*i].materialIndex=i%3;
		cylinder_geometry.faces[2*i+1].materialIndex=i%3;
	}
	cylinder = new THREE.Mesh( cylinder_geometry, cylinder_materials );
	var light1 = new THREE.AmbientLight( 0xffffff );
	var light2 = new THREE.DirectionalLight( 0xffffff, 1 );
	light2.position.set(3, 3, 3);
	light2.lookAt(new THREE.Vector3(  0, 0, 0 ));
	
	scene.add( light1, light2, cylinder );
	animate();
}
function animate(){
	cylinder.rotateX( Math.PI/360 );
    renderer.render( scene, camera );
    requestAnimationFrame( animate );
}

