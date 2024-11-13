var scene,camera,renderer,box;
var delta = Math.PI/300;
var angle=0;
var dx=delta,dy=0,dz=0;
init();
animate();
function init(){
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(800,600);
	document.body.appendChild( renderer.domElement );

	camera = new THREE.PerspectiveCamera( 70, 800 / 600, 1, 1000 );
	camera.translateX(50);
	camera.translateY(70);
	camera.translateZ(200);

	scene = new THREE.Scene();

	var box_material=new THREE.MeshLambertMaterial( { color: 0x00FF00 } );
	
	var box_geometry = new THREE.BoxGeometry( 50, 50, 50, 1, 1, 1 );
	box = new THREE.Mesh( box_geometry, box_material);
	
	var light1 = new THREE.AmbientLight( 0x666666 );
	var light2 = new THREE.PointLight( 0x666666, 1, 400 );
	light2.position.set(200,200,50);
	
	new_axis = new THREE.Object3D();
	box.position.set(50,50,0);
	box.rotateOnAxis(new THREE.Vector3(0,1,1).normalize(),0.5);
	
 	var axisHelper_scene = new THREE.AxisHelper( 100 );
	var axisHelper_mesh = new THREE.AxisHelper( 50 );
	
	box.add( axisHelper_mesh,new_axis );
	scene.add( axisHelper_scene,light1,light2,box );
}

function animate(){
	box.rotateOnAxis(new THREE.Vector3(1,0,0),dx);
	box.rotateY(dy);
	box.rotateOnAxis(new THREE.Vector3(0,0,99).normalize(),dz);
	angle+=delta;

	if(angle>Math.PI/2){
		angle=0;
		if(dx>0){
			dx=0;
			dy=delta;
		}
		else if(dy>0){
			dy=0;
			dz=delta;
		}
		else if(dz>0){
			dz=0;
			dx=delta;
		}
	}
	renderer.render( scene, camera );
	requestAnimationFrame( animate );
}