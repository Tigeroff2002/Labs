var scene, camera, renderer;

init();
animate();
function init(){
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( 800, 600 );
	document.body.appendChild( renderer.domElement );
	camera = new THREE.PerspectiveCamera( 70, 800 / 600, 1, 1000 );
	camera.translateX( -50 );
	camera.translateY( 50 );
	camera.translateZ( 80 );
	scene = new THREE.Scene();
	var light1 = new THREE.AmbientLight( 0x666666 );
	var light2 = new THREE.PointLight( 0x666666, 1, 400 );
	light2.position.set( 200, 200, 50 );
	scene.add( light1 );
	scene.add( light2 );

        var jsonLoader = new THREE.JSONLoader();
        jsonLoader.load( "android.js", addModelToScene );

}

function animate(){
	renderer.render( scene, camera );
	requestAnimationFrame( animate );
}

function addModelToScene( geometry, materials )
{
        var material = new THREE.MeshFaceMaterial( materials ); 
        var model = new THREE.Mesh( geometry, material ); 
        model.scale.set( 3, 3, 3); 
        scene.add( model );
}

