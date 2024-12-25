
// --------------------------------------------- //
// --------- 3D ПИНГ-ПОНГ с Three.JS ----------- //
// --------------------------------------------- //

// ------------------------------------- //
// ------- ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ------- //
// ------------------------------------- //

// scene object variables
var renderer, scene, camera, pointLight, spotLight;

// определяем размер сцены
var fieldWidth = 400, fieldHeight = 200;

// paddle variables
var paddleWidth, paddleHeight, paddleDepth, paddleQuality;
var paddle1DirY = 0, paddle2DirY = 0, paddleSpeed = 3;

// ball variables
var ball, paddle1, paddle2;
var ballDirX = 1, ballDirY = 1, ballSpeed = 2;

// переменные с очками каждого игрока
var score1 = 0, score2 = 0;
// игра завершится, когда кто-то наберет 7 очков
var maxScore = 7;

// set opponent reflexes (0 - easiest, 1 - hardest)
var difficulty = 0.2;

// ------------------------------------- //
// --------- ИГРОВЫЕ ФУНКЦИИ ----------- //
// ------------------------------------- //

function setup()
{
	// Обновляем блок, содержащий сообщение о необходимых для победы очках
	document.getElementById("winnerBoard").innerHTML = "Набравший " + maxScore + " очков победит!";
	
	// обнуляем значения переменных с очками каждого игрока
	score1 = 0;
	score2 = 0;
	
	// set up all the 3D objects in the scene	
	createScene();
	
	// and let's get cracking!
	draw();
}

function createScene()
{
	// set the scene size
	var WIDTH = 640,
	  HEIGHT = 360;

	// set some camera attributes
	var VIEW_ANGLE = 50,
	  ASPECT = WIDTH / HEIGHT,
	  NEAR = 0.1,
	  FAR = 10000;

	var c = document.getElementById("gameCanvas");

	// создаем WebGL рендер, камеру и сцену
	renderer = new THREE.WebGLRenderer();
	camera =
	  new THREE.PerspectiveCamera(
		VIEW_ANGLE,
		ASPECT,
		NEAR,
		FAR);

	scene = new THREE.Scene();

	// добавляем камеру на сцену
	scene.add(camera);
	
	// устанавливаем начальную позицию камеры
	// если этого не сделать, то может
	// испортится рендеринг теней
	camera.position.z = 320;
	
	// запуск рендера
	renderer.setSize(WIDTH, HEIGHT);

	// attach the render-supplied DOM element
	c.appendChild(renderer.domElement);

	// set up the playing surface plane 
	var planeWidth = fieldWidth,
		planeHeight = fieldHeight,
		planeQuality = 10;
		
	// создаем материал дощечки № 1
	var paddle1Material =
	  new THREE.MeshLambertMaterial(
		{
		  color: 0x1B32C0
		});
	// создаем материал дощечки № 2
	var paddle2Material =
	  new THREE.MeshLambertMaterial(
		{
		  color: 0xFF4045
		});
	// создаем материал плоскости	
	var planeMaterial =
	  new THREE.MeshLambertMaterial(
		{
		  color: 0x4BD121
		});
	// создаем материал стола
	var tableMaterial =
	  new THREE.MeshLambertMaterial(
		{
		  color: 0x111111
		});
	// создаем материала столбов
	var pillarMaterial =
	  new THREE.MeshLambertMaterial(
		{
		  color: 0x534d0d
		});
	// create the ground's material
	var groundMaterial =
	  new THREE.MeshLambertMaterial(
		{
		  color: 0x888888
		});
		
		
	// create the playing surface plane
	var plane = new THREE.Mesh(

	  new THREE.PlaneGeometry(
		planeWidth * 0.95,	//95% ширины стола, т.к. нужно показать где шар будет выходить за пределы поля
		planeHeight,
		planeQuality,
		planeQuality),

	  planeMaterial);
	  
	scene.add(plane);
	plane.receiveShadow = true;	
	
	var table = new THREE.Mesh(

	  new THREE.CubeGeometry(
		planeWidth * 1.05,	// this creates the feel of a billiards table, with a lining
		planeHeight * 1.03,
		100,				// an arbitrary depth, the camera can't see much of it anyway
		planeQuality,
		planeQuality,
		1),

	  tableMaterial);
	table.position.z = -51;	// we sink the table into the ground by 50 units. The extra 1 is so the plane can be seen
	scene.add(table);
	table.receiveShadow = true;	
		
	// устанавливаем переменные для 
	// сферы: radius, segments, rings
	// низкие значения 'segment' и 'ring'
	// улучшают производительность
	var radius = 5,
		segments = 6,
		rings = 6;
		
	// создаем материал сферы
	var sphereMaterial =
	  new THREE.MeshLambertMaterial(
		{
		  color: 0xD43001
		});
		
	// создаем шар с геометрией как у сферы
	ball = new THREE.Mesh(

	  new THREE.SphereGeometry(
		radius,
		segments,
		rings),

	  sphereMaterial);

	// // добавляем сферу на сцену
	scene.add(ball);
	
	ball.position.x = 0;
	ball.position.y = 0;
	// set ball above the table surface
	ball.position.z = radius;
	ball.receiveShadow = true;
    ball.castShadow = true;
	
	// // set up the paddle vars
	paddleWidth = 10;
	paddleHeight = 30;
	paddleDepth = 10;
	paddleQuality = 1;
		
	paddle1 = new THREE.Mesh(

	  new THREE.CubeGeometry(
		paddleWidth,
		paddleHeight,
		paddleDepth,
		paddleQuality,
		paddleQuality,
		paddleQuality),

	  paddle1Material);

	// добавляем шар на сцену
	scene.add(paddle1);
	paddle1.receiveShadow = true;
    paddle1.castShadow = true;
	
	paddle2 = new THREE.Mesh(

	  new THREE.CubeGeometry(
		paddleWidth,
		paddleHeight,
		paddleDepth,
		paddleQuality,
		paddleQuality,
		paddleQuality),

	  paddle2Material);
	  
	// добавляем шар на сцену
	scene.add(paddle2);
	paddle2.receiveShadow = true;
    paddle2.castShadow = true;	
	
	// set paddles on each side of the table
	paddle1.position.x = -fieldWidth/2 + paddleWidth;
	paddle2.position.x = fieldWidth/2 - paddleWidth;
	
	// lift paddles over playing surface
	paddle1.position.z = paddleDepth;
	paddle2.position.z = paddleDepth;
		
	// we iterate 10x (5x each side) to create pillars to show off shadows
	// this is for the pillars on the left
	for (var i = 0; i < 5; i++)
	{
		var backdrop = new THREE.Mesh(
		
		  new THREE.CubeGeometry( 
		  30, 
		  30, 
		  300, 
		  1, 
		  1,
		  1 ),

		  pillarMaterial);
		  
		backdrop.position.x = -50 + i * 100;
		backdrop.position.y = 230;
		backdrop.position.z = -30;		
		backdrop.castShadow = true;
		backdrop.receiveShadow = true;		  
		scene.add(backdrop);	
	}
	// we iterate 10x (5x each side) to create pillars to show off shadows
	// this is for the pillars on the right
	for (var i = 0; i < 5; i++)
	{
		var backdrop = new THREE.Mesh(

		  new THREE.CubeGeometry( 
		  30, 
		  30, 
		  300, 
		  1, 
		  1,
		  1 ),

		  pillarMaterial);
		  
		backdrop.position.x = -50 + i * 100;
		backdrop.position.y = -230;
		backdrop.position.z = -30;
		backdrop.castShadow = true;
		backdrop.receiveShadow = true;		
		scene.add(backdrop);	
	}
	
	// finally we finish by adding a ground plane
	// to show off pretty shadows
	var ground = new THREE.Mesh(

	  new THREE.CubeGeometry( 
	  1000, 
	  1000, 
	  3, 
	  1, 
	  1,
	  1 ),

	  groundMaterial);
    // set ground to arbitrary z position to best show off shadowing
	ground.position.z = -132;
	ground.receiveShadow = true;	
	scene.add(ground);		
		
	// создаем точечный свет
	pointLight =
	  new THREE.PointLight(0xF8D898);

	// позиционируем
	pointLight.position.x = -1000;
	pointLight.position.y = 0;
	pointLight.position.z = 1000;
	pointLight.intensity = 2.9;
	pointLight.distance = 10000;
	// добавляем на сцену
	scene.add(pointLight);
		
	// добавляем прожектор для создания теней
    spotLight = new THREE.SpotLight(0xF8D898);
    spotLight.position.set(0, 0, 460);
    spotLight.intensity = 1.5;
    spotLight.castShadow = true;
    scene.add(spotLight);
	
	// Включаем рендеринг теней
	renderer.shadowMapEnabled = true;		
}

function draw()
{	
	// отрисовываем THREE.JS sсцену
	renderer.render(scene, camera);
	// зацикливаем функцию draw()
	requestAnimationFrame(draw);
	
	ballPhysics();
	paddlePhysics();
	cameraPhysics();
	playerPaddleMovement();
	opponentPaddleMovement();
}

function ballPhysics()
{
	// если шар двигается слева (со стороны игрока)
	if (ball.position.x <= -fieldWidth/2)
	{	
		// компьютер получает очко
		score2++;
		// обновляем таблицу с результатами
		document.getElementById("scores").innerHTML = score1 + "-" + score2;
		// устанавливаем новый шар в центр стола
		resetBall(2);
		// проверяем, закончился ли матч (набрано требуемое количество очков)
		matchScoreCheck();	
	}
	
	// если шар двигается справа (со стороны компьютера)
	if (ball.position.x >= fieldWidth/2)
	{	
		// игрок получает очко
		score1++;
		// обновляем таблицу с результатами
		document.getElementById("scores").innerHTML = score1 + "-" + score2;
		// устанавливаем новый шар в центр стола
		resetBall(1);
		// проверяем, закончился ли матч (набрано требуемое количество очков)
		matchScoreCheck();	
	}
	
	// Если шар двигается сверху
	if (ball.position.y <= -fieldHeight/2)
	{
		ballDirY = -ballDirY;
	}	
	// Если шар двигается снизу
	if (ball.position.y >= fieldHeight/2)
	{
		ballDirY = -ballDirY;
	}
	
	// обновляем положение шара во время игры
	ball.position.x += ballDirX * ballSpeed;
	ball.position.y += ballDirY * ballSpeed;
	
	// ограничиваем скорость шарика чтобы он не летал как сумасшедший
	if (ballDirY > ballSpeed * 2)
	{
		ballDirY = ballSpeed * 2;
	}
	else if (ballDirY < -ballSpeed * 2)
	{
		ballDirY = -ballSpeed * 2;
	}
}

// Программирование AI
function opponentPaddleMovement()
{
	// применяем функцию Lerp к шару на плоскости Y
	paddle2DirY = (ball.position.y - paddle2.position.y) * difficulty;
	
	// если функция Lerp вернет значение, которое больше скорости движения дощечки, мы ограничим его
	if (Math.abs(paddle2DirY) <= paddleSpeed)
	{	
		paddle2.position.y += paddle2DirY;
	}
	// если значение функции Lerp слишком большое, мы ограничиваем скорость paddleSpeed
	else
	{
		// если дощечка движется в положительном направлении
		if (paddle2DirY > paddleSpeed)
		{
			paddle2.position.y += paddleSpeed;
		}
		// если дощечка движется в отрицательном направлении
		else if (paddle2DirY < -paddleSpeed)
		{
			paddle2.position.y -= paddleSpeed;
		}
	}
	// Мы возвращаем значение функции Lerp обратно в 1
	// это нужно, потому что мы растягиваем дощечку в нескольких случаях:
	// когда дощечка прикасается к стенкам стола или ударяется о шарик.
	// Так мы гарантируем, что она всегда вернется к своему исходному размеру
	paddle2.scale.y += (1 - paddle2.scale.y) * 0.2;	
}


// Управление дощечками при помощи клавиатуры
function playerPaddleMovement()
{
	// движение влево
	if (Key.isDown(Key.A))		
	{
		// двигаем дощечку пока она не коснется стенки
		if (paddle1.position.y < fieldHeight * 0.45)
		{
			paddle1DirY = paddleSpeed * 0.5;
		}
		// в противном случае мы прекращаем движение и растягиваем
		// дощечку чтобы показать, что дальше двигаться нельзя
		else
		{
			paddle1DirY = 0;
			paddle1.scale.z += (10 - paddle1.scale.z) * 0.2;
		}
	}	
	// движение вправо
	else if (Key.isDown(Key.D))
	{
		// двигаем дощечку пока она не коснется стенки
		if (paddle1.position.y > -fieldHeight * 0.45)
		{
			paddle1DirY = -paddleSpeed * 0.5;
		}
		// в противном случае мы прекращаем движение и растягиваем
		// дощечку чтобы показать, что дальше двигаться нельзя
		else
		{
			paddle1DirY = 0;
			paddle1.scale.z += (10 - paddle1.scale.z) * 0.2;
		}
	}
	// мы не можем дальше двигаться
	else
	{
		// прекращаем движение
		paddle1DirY = 0;
	}
	
	paddle1.scale.y += (1 - paddle1.scale.y) * 0.2;	
	paddle1.scale.z += (1 - paddle1.scale.z) * 0.2;	
	paddle1.position.y += paddle1DirY;
}

// Handles camera and lighting logic
function cameraPhysics()
{
	// we can easily notice shadows if we dynamically move lights during the game
	spotLight.position.x = ball.position.x * 2;
	spotLight.position.y = ball.position.y * 2;
	
	// move to behind the player's paddle
	camera.position.x = paddle1.position.x - 100;
	camera.position.y += (paddle1.position.y - camera.position.y) * 0.05;
	camera.position.z = paddle1.position.z + 100 + 0.04 * (-ball.position.x + paddle1.position.x);
	
	// rotate to face towards the opponent
	camera.rotation.x = -0.01 * (ball.position.y) * Math.PI/180;
	camera.rotation.y = -60 * Math.PI/180;
	camera.rotation.z = -90 * Math.PI/180;
}

// Отскакивания шара от дощечки
function paddlePhysics()
{
	// ЛОГИКА ДОЩЕЧКИ ИГРОКА
	
	//если шар имеет одинаковые координаты с дощечкой № 1
	// на плоскости Х запоминаем позицию ЦЕНТРА объекта
	// мы делаем проверку только между передней и средней 
	// частями дощечки (столкновение одностороннее)
	if (ball.position.x <= paddle1.position.x + paddleWidth
	&&  ball.position.x >= paddle1.position.x)
	{
		// если у шара одинаковые координаты с дощечкой № 1 на плоскости Y
		if (ball.position.y <= paddle1.position.y + paddleHeight/2
		&&  ball.position.y >= paddle1.position.y - paddleHeight/2)
		{
			// если шар движется к игроку (отрицательное направление)
			if (ballDirX < 0)
			{
				// растягиваем дощечку, чтобы показать столкновение
				paddle1.scale.y = 15;
				// меняем направление движения чтобы создать эффект отскакивания шара
				ballDirX = -ballDirX;
				// Меняем угол шара при ударе. Немного усложним игру, позволив скользить шарику
				ballDirY -= paddle1DirY * 0.7;
			}
		}
	}
	
	// ЛОГИКА ДОЩЕЧКИ СОПЕРНИКА
	
	// если шар имеет одинаковые координаты с дощечкой № 2
	// на плоскости Х запоминаем позицию ЦЕНТРА объекта
	// мы делаем проверку только между передней и средней 
	// частями дощечки (столкновение одностороннее)
	if (ball.position.x <= paddle2.position.x + paddleWidth
	&&  ball.position.x >= paddle2.position.x)
	{
		// и если шар направляется к игроку (отрицательное направление)
		if (ball.position.y <= paddle2.position.y + paddleHeight/2
		&&  ball.position.y >= paddle2.position.y - paddleHeight/2)
		{
			// и если шар направляется к сопернику (положительное направление)
			if (ballDirX > 0)
			{
				// растягиваем дощечку, чтобы показать столкновение
				paddle2.scale.y = 15;	
				// меняем направление движения чтобы создать эффект отскакивания шара
				ballDirX = -ballDirX;
				// Меняем угол шара при ударе. Немного усложним игру, позволив скользить шарику
				ballDirY -= paddle2DirY * 0.7;
			}
		}
	}
}

function resetBall(loser)
{
	// размещаем шар в центре стола
	ball.position.x = 0;
	ball.position.y = 0;
	
	// если игрок проиграл, отправляем шар компьютеру
	if (loser == 1)
	{
		ballDirX = -1;
	}
	// если компьютер проиграл, отправляем шар игроку
	else
	{
		ballDirX = 1;
	}
	
	// шар двигается в положительном направлении по оси Y (налево от камеры)
	ballDirY = 1;
}

var bounceTime = 0;
// проверяем, закончился ли матч (набрано требуемое количество очков)
function matchScoreCheck()
{
	// если выиграл игрок
	if (score1 >= maxScore)
	{
		// останавливаем шар
		ballSpeed = 0;
		// выводим текст
		document.getElementById("scores").innerHTML = "Игрок выиграл!";		
		document.getElementById("winnerBoard").innerHTML = "Обновите страницу чтобы сыграть снова";
		// make paddle bounce up and down
		bounceTime++;
		paddle1.position.z = Math.sin(bounceTime * 0.1) * 10;
		// enlarge and squish paddle to emulate joy
		paddle1.scale.z = 2 + Math.abs(Math.sin(bounceTime * 0.1)) * 10;
		paddle1.scale.y = 2 + Math.abs(Math.sin(bounceTime * 0.05)) * 10;
	}
	// если выиграл компьютер
	else if (score2 >= maxScore)
	{
		// останавливаем шар
		ballSpeed = 0;
		// выводим текст
		document.getElementById("scores").innerHTML = "Выиграл компьютер!";
		document.getElementById("winnerBoard").innerHTML = "Обновите страницу чтобы сыграть снова";
		// make paddle bounce up and down
		bounceTime++;
		paddle2.position.z = Math.sin(bounceTime * 0.1) * 10;
		// enlarge and squish paddle to emulate joy
		paddle2.scale.z = 2 + Math.abs(Math.sin(bounceTime * 0.1)) * 10;
		paddle2.scale.y = 2 + Math.abs(Math.sin(bounceTime * 0.05)) * 10;
	}
}