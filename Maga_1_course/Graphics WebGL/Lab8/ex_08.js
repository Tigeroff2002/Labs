var scene, camera, renderer, box, new_axis;
var dx=1, dy=0, dz=0;
var sx = 1, sx = 1, sz = 1;
var direct=1;
init();
animate();
function init(){
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( 800, 600 );
	document.body.appendChild( renderer.domElement );

	camera = new THREE.PerspectiveCamera( 70, 800 / 600, 1, 1000 );
	camera.translateX( 50 );
	camera.translateY( 70 );
	camera.translateZ( 200 );

	scene = new THREE.Scene();

	var box_material=new THREE.MeshLambertMaterial( { color: 0x00FF00 } );
	var box_geometry = new THREE.BoxGeometry( 30, 30, 30, 1, 1, 1 );
	box = new THREE.Mesh( box_geometry, box_material );
	
	var light1 = new THREE.AmbientLight( 0x666666 );
	var light2 = new THREE.PointLight( 0x666666, 1, 400 );
	light2.position.set( 200, 200, 50 );
	
	new_axis = new THREE.Object3D();
	new_axis.position.set( 50, 50, 0 );
	new_axis.rotateOnAxis( new THREE.Vector3( 0, 1, 1 ).normalize(), 0.5 );
	
 	var axisHelper_scene = new THREE.AxisHelper( 100 );
	var axisHelper_mesh = new THREE.AxisHelper( 50 );
	
	new_axis.add( axisHelper_mesh, box );
	scene.add( axisHelper_scene, light1, light2, new_axis );
}

function animate(){
    // Перемещение
	box.translateOnAxis( new THREE.Vector3( 1, 0, 0 ), dx*direct );
	box.translateY( dy*direct );
	box.translateOnAxis( new THREE.Vector3( 0, 0, 13 ).normalize(), dz*direct );
	
	if ( box.position.x>100 ) {
		direct=-1;
	}
	if ( box.position.y>100 ) {
		direct=-1;
	}
	if ( box.position.z>100 ) {
		direct=-1;
	}
	if ( box.position.x<0 ){
		box.position.x=0;
		direct=1;
		dx=0;
		dy=1
	}
	if ( box.position.y<0 ){
		box.position.y=0;
		direct=1;
		dy=0;
		dz=1
	}
	if ( box.position.z<0 ){
		box.position.z=0;
		direct=1;
		dz=0;
		dx=1
	}

    // Масштабирование
    box.position.x *= sx;
    box.position.y *= sy;
    box.position.z *= sz;

    // Поворот
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

