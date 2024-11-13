var scene,camera,renderer,eyeball_left,eyeball_right,body;
init();
animate();
function init(){
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(800,600);
	document.body.appendChild( renderer.domElement );
	camera = new THREE.PerspectiveCamera( 70, 800 / 600, 1, 1000 );
	camera.translateZ(200);

	scene = new THREE.Scene();
	var body_material=new THREE.MeshLambertMaterial( { color: 0xA28D33 } );
	var body_geometry = new THREE.BoxGeometry( 150, 170, 30);
	var eyeball_material=new THREE.MeshLambertMaterial( { color: 0xFFFFFF } );
	var eyeball_geometry = new THREE.SphereGeometry( 20, 32, 32);
	var iris_material=new THREE.MeshLambertMaterial( { color: 0x000000 } );
	var iris_geometry = new THREE.SphereGeometry( 10, 16, 16);
	
	body = new THREE.Mesh( body_geometry, body_material);
	body.position.set( 0, -20, -15 );

	eyeball_left = new THREE.Mesh( eyeball_geometry, eyeball_material);
	var iris_left = new THREE.Mesh( iris_geometry, iris_material);
	iris_left.translateZ(15);
	eyeball_left.add(iris_left);
	eyeball_left.translateX(-30);
	eyeball_left.lookAt(camera.position);
	
	eyeball_right = new THREE.Mesh( eyeball_geometry, eyeball_material);
	var iris_right = new THREE.Mesh( iris_geometry, iris_material);
	iris_right.translateZ(15);
	eyeball_right.add(iris_right);
	eyeball_right.translateX(30);
	eyeball_right.lookAt(camera.position);
	
	var light1 = new THREE.AmbientLight( 0x666666 );
	var light2 = new THREE.PointLight( 0x666666, 1, 400 );
	light2.position.set(50,50,50);
	scene.add( light1, light2, body, eyeball_left, eyeball_right );
}

function animate(){
	renderer.render( scene, camera );
	requestAnimationFrame( animate );
}

renderer.domElement.onmousemove = function(e){
	var direct_point = new THREE.Vector3(e.offsetX-renderer.domElement.clientWidth/2+camera.position.x,
								 -e.offsetY+renderer.domElement.clientHeight/2+camera.position.y,
								 500);
	eyeball_left.lookAt(direct_point);
	eyeball_right.lookAt(direct_point);
}

renderer.domElement.onmouseout = function(e){
	eyeball_left.lookAt(camera.position);
	eyeball_right.lookAt(camera.position);
}