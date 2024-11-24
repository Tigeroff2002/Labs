        var scene, camera, renderer, box;

        init();

        function init(){
            renderer = new THREE.WebGLRenderer({canvas: document.getElementById('primer')});
            var width = 458;
            renderer.setSize(width,width*2/3);

            camera = new THREE.PerspectiveCamera( 70, 1.5, 1, 1000 );
            camera.translateZ(4);

            scene = new THREE.Scene();
            var box_material = new THREE.MeshPhongMaterial({
                color:0xff3333,
                specular: 0x111111,
                shininess:10,
                shading:THREE.SmoothShading
            });
            var box_geometry = new THREE.SphereGeometry(1, 16, 16);
            box_geometry = new THREE.TorusGeometry( 1.5, 0.5, 16, 32 );
            box = new THREE.Mesh( box_geometry, box_material );
            console.log(box);
            scene.add( box );
            var light = new THREE.AmbientLight( 0x999999 );
            var light1 = new THREE.DirectionalLight( 0x666666, 0.3 );
            light1.position.set(20, 10, 50);
            light1.lookAt(new THREE.Vector3(  0, 0, 0 ));
            scene.add( light, light1);
            animate();
        }
        function animate(){
            box.rotateY( Math.PI/180 );
            renderer.render( scene, camera );
            requestAnimationFrame( animate );
        }
        $('.slider-red').slider({
            min: 0,
            max: 255,
            default:17,
            slide: function( event, ui ) {
                box.material.specular.r = ui.value;
                $(this).parent().parent().find('span').eq(1).html(ui.value);
            }
        });
        $('.slider-green').slider({
            min: 0,
            max: 255,
            default:17,
            slide: function( event, ui ) {
                box.material.specular.g = ui.value;
                $(this).parent().parent().find('span').eq(1).html(ui.value);
            }
        });
        $('.slider-blue').slider({
            min: 0,
            max: 255,
            default:17,
            slide: function( event, ui ) {
                box.material.specular.b = ui.value;
                $(this).parent().parent().find('span').eq(1).html(ui.value);
            }
        });
        $('.slider-shin').slider({
            min: 1,
            max: 500,
            slide: function( event, ui ) {
                box.material.shininess = ui.value;
                $(this).parent().parent().find('span').eq(1).html(ui.value);
            }
        });
