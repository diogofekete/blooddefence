function Point( x, y ) {
    this.position = { x: x || 0, y: y || 0 };
}

Point.prototype.distanceTo = function(p) {
    var dx = p.position.x-this.position.x;
    var dy = p.position.y-this.position.y;
    return Math.sqrt(dx*dx + dy*dy);
};

Point.prototype.clonePosition = function() {
    return { x: this.position.x, y: this.position.y };
};
var p = new Point();

function Player() {
    // TODO: make a state control (alive or dead)
	this.accuracy = 0; //Zeeshan K. Hayat (01.03.2013)
    this.energy = 0;
    this.score = 0;
    this.woundSize = 0;
};

function Blood(canvasWidth, canvasHeight, woundSize, Xboost) {
    this.maxVelocity = (Math.random() / 8) + .1 + Xboost; // MAX .22
    this.acceleration = { x: 0.01, y: 0.0 };
    this.heal = 1;
    this.img = document.getElementById("rbc_img");
	this.radius = this.img.width / 2;

    var xpos = 0 - this.radius * 2;
    var ypos = (Math.random() * (canvasHeight - this.radius)) + woundSize + this.radius;
    this.position = { x: xpos, y: ypos };
    //this.previousPosition = { x: xpos, y: ypos };
    this.velocity = { x: 0.1, y: 0 };
}
Blood.prototype = new Point();

Blood.prototype.update = function (delta) {
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;

    if (this.velocity.x > this.maxVelocity) {
        this.velocity.x = this.maxVelocity;
    }
    else if (this.velocity.x < -this.maxVelocity) {
        this.velocity.x = -this.maxVelocity;
    }

    if (this.velocity.y > this.maxVelocity) {
        this.velocity.y = this.maxVelocity;
    }
    else if (this.velocity.y < -this.maxVelocity) {
        this.velocity.y = -this.maxVelocity;
    }

    this.position.x += (this.velocity.x) * delta;
    this.position.y += (this.velocity.y) * delta;
};

Blood.prototype.left = function () {
    return this.position.x - this.radius;
}

Blood.prototype.right = function () {
    return this.position.x + this.radius;
}

function Enemy(canvasWidth, canvasHeight, margin, type) {
    this.type = type;
    
    switch (this.type) {
        case "VIRUS":
            this.maxVelocity = (Math.random() / 5) + .2; // MAX .39
            this.acceleration = { x: -.7, y: 0.0 };
            this.damage = 1;
            this.img = document.getElementById("virus_img");
            break;
        case "BACTERIA":
            this.maxVelocity = (Math.random() / 6) + .2; // MAX .36
            this.acceleration = { x: -.5, y: 0.0 };
            this.damage = 2;
            this.img = document.getElementById("bacteria_img");
            break;
        case "PROTOZOA":
            this.maxVelocity = (Math.random() / 7) + .15; // MAX .29
            this.acceleration = { x: -.5, y: 0.0 };
            this.damage = 5;
            this.img = document.getElementById("protozoa_img");
            break;
        case "FUNGI":
            this.maxVelocity = (Math.random() / 8) + .05; // MAX .17
            this.acceleration = { x: -.5, y: 0.0 };
            this.damage = 8;
            this.img = document.getElementById("fungi_img");
            break;
        default:
            break;
    }
	this.radius = this.img.width / 2;
    var xpos = canvasWidth + this.radius * 2;
    var ypos = (Math.random() * (canvasHeight - this.radius)) + margin + this.radius;
    this.position = { x: xpos, y: ypos };
    //this.previousPosition = { x: xpos, y: ypos };
    this.velocity = { x: -0.1, y: 0 };
}

Enemy.prototype = new Point();

Enemy.prototype.update = function (delta) {
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;

    // Make the enemy accellerate sinusoidally
    //this.acceleration.y = Math.sin((this.position.x / GameWorld.gameWorld.width) * Math.PI * this.sinewaves) * this.sinewaveStrength;

    if (this.velocity.x > this.maxVelocity) {
        this.velocity.x = this.maxVelocity;
    }
    else if (this.velocity.x < -this.maxVelocity) {
        this.velocity.x = -this.maxVelocity;
    }

    if (this.velocity.y > this.maxVelocity) {
        this.velocity.y = this.maxVelocity;
    }
    else if (this.velocity.y < -this.maxVelocity) {
        this.velocity.y = -this.maxVelocity;
    }

    //this.previousPosition.x = this.position.x;
    //this.previousPosition.y = this.position.y;

    this.position.x += this.velocity.x * delta;
    this.position.y += this.velocity.y * delta;

};

Enemy.prototype.left = function () {
    return this.position.x - this.radius;
}

Enemy.prototype.right = function () {
    return this.position.x + this.radius;
}


Enemy.prototype.top = function () {
    return this.position.y - this.radius;
}

Enemy.prototype.bottom = function () {
    return this.position.y + this.radius;
}

Blood.prototype.top = function () {
    return this.position.y - this.radius;
}

Blood.prototype.bottom = function () {
    return this.position.y + this.radius;
}

function WBC(x, y, radius) {
    this.position = { x: x, y: y };
    this.radius = radius;
}
WBC.prototype = new Point();

WBC.prototype.left = function () {
    return this.position.x - this.radius;
}

WBC.prototype.right = function () {
    return this.position.x + this.radius;
}

WBC.prototype.top = function () {
    return this.position.y - this.radius;
}

WBC.prototype.bottom = function () {
    return this.position.y + this.radius;
}

function Vitamin(canvasWidth, bottomMargin, topMargin, type) {
	this.type = type;
	this.lifeTime = Math.random() * 200;
	this.score = 10;
	this.boneMarrowSize = 0;
	this.rbcUnits = 0;
	this.boneMarrowRegeneration = 0;
	this.rbcVelocityBoost = 0;
	this.killVirus = false;
	
	switch (this.type) {
        case "A": 	// enhance immune function (increase bone marrow capacity)
			this.boneMarrowSize = 50;
            this.img = document.getElementById("carrot");
            break;
        case "B2":	// increase red blood cells creation
            this.rbcUnits = 1;
            this.img = document.getElementById("almonds");
            break;
        case "B9":	// increase bone marrow regeneration
            this.boneMarrowRegeneration = .2;
            this.img = document.getElementById("broccoli");
            break;
        case "C":	// Antiviral agent (could kill all the virus on the screen)
			this.killVirus = true;
            this.img = document.getElementById("orange");
            break;
		case "K":	// enhance blood clotting (could close a % of the wound OR increase velocity of the blood cells)
            this.rbcVelocityBoost = .1;
            this.img = document.getElementById("lettuce");
            break;
        default:
            break;
    }
	this.radius = this.img.width > this.img.height ? (this.img.width / 2) : (this.img.height / 2);
    var xpos = Math.random() * (canvasWidth - this.radius);
    var ypos = (Math.random() * (bottomMargin - topMargin)) + topMargin;
    this.position = { x: xpos, y: ypos };
}
Vitamin.prototype = new Point();

Vitamin.prototype.left = function () {
    return this.position.x - this.radius;
}

Vitamin.prototype.right = function () {
    return this.position.x + this.radius;
}

Vitamin.prototype.top = function () {
    return this.position.y - this.radius;
}

Vitamin.prototype.bottom = function () {
    return this.position.y + this.radius;
}

// End UTILS functins

// Function to be called by the html
GameWorld = new function () {
    var FRAMERATE = 60;
	var GAMEOVER_DELAY = 8000;
    var WOUND_GROW_FACTOR = .5;
    var WOUND_START_HEIGHT = 200;
    var WOUND_END_HEIGHT = (WOUND_START_HEIGHT * WOUND_GROW_FACTOR) + WOUND_START_HEIGHT;
	var PLAYER_STATE;

    var stage;
	var virus_spawn;
	var bacteria_spawn;
	var protozoa_spawn;
	var fungi_spawn;
	var blood_spawn;
    var time = 0;
    var playing = false;
    var canvas;
    var context;
    var levelID = 0;
	var bestLevel = levelID;
    var player;
	var inPause = false;
    var mouse = { x: 0, y: 0 };
    var WBCs = [];
	var RBCs = [];
    var Enemies = [];
	var Vitamins = [];
	var Highlights = [];
	
	var rbc_spawn_interval; //Zeeshan K. Hayat (21.02.2013)
	
	var world = { 
		width: UserProfile.isTouchDevice() ? window.innerWidth : (window.innerWidth - (window.innerWidth/50)), 
		height: UserProfile.isTouchDevice() ? window.innerHeight : (window.innerHeight - (window.innerHeight/40)), 
        toolMargin: window.innerWidth/10
    };

	var hitArea = false;
	var hitAreaY_bottomLimit = world.height - 100;
	var hitAreaY_topLimit = 75;
	
	//Pause margins  
	var pauseStartX = 5;
	var pauseEndX = 43;
	var pauseTop = hitAreaY_bottomLimit;
	var pauseBottom = pauseTop + 64;
	
	// Level links global variables
	var spaceBetweenLevels = (world.width - world.toolMargin) / Stages.length;
	var linkStartX;
	var linkEndX;
	var linkY = world.height - 40;
	var linkHeight=40;
	var inLink = false;
	
	// Bone Marrow variables
	var boneMarrowBarStart = world.width/8;
	var boneMarrowBarEnd;
	var creationFrequency = 0;
	var blinkCount = 0;
	
    // make the world object available
    // externally to the "class"
    this.gameWorld = world;

    this.initialize = function () {
        // DOM elements
        canvas = document.getElementById('world');

        if (canvas && canvas.getContext) {
            context = canvas.getContext('2d');

            // Events
            document.addEventListener('mousemove', documentMouseMoveHandler, false);
            document.addEventListener('mousedown', documentMouseDownHandler, false);

            // canvas properties
            canvas.width = world.width;
            canvas.height = world.height;

			// Load images
			WBC_normal = document.getElementById("wbc_normal");
			WBC_winning = document.getElementById("wbc_winning");
			WBC_losing = document.getElementById("wbc_loosing");
			pause_img = document.getElementById("pause_img");
			
            // Set intervals
            setInterval(frame, 1000 / FRAMERATE);

            renderLevelSelection();
        }
    };

    // Main loop, rendering all objects per framerate
    function frame() {
        if( playing ) {    
			context.drawImage(background_img, 0, 0, world.width, world.height);
            delta = new Date().getTime() - time;
            updateEnemies();
			updateBlood();
			updateBoneMarrowBar("increase");
			updateVitamins();
            render();
            time = new Date().getTime();
        }
		else	// loop after play time
		{
			// Some time right after stage (to check score)
			if (new Date().getTime() < (time + GAMEOVER_DELAY))
				ShowScore();
			else
				renderLevelSelection();
		}
    }
	
	function togglePause(){
		playing = !playing;
		
		if(playing){
			delta = new Date().getTime();
			time = new Date().getTime();						
			document.getElementById('background_audio').muted = false;
		}
		else
		{
			document.getElementById('background_audio').muted = true;
		}
	/* Diogo Fekete 2013.03.05
	TODO: show menu & hide pause_icon */
	}
	
	function spawnBlood() {
		if(playing){
			for (var i = 0; i < stage.rbc; i++) {
				var b = new Blood(0, player.woundSize, (WOUND_START_HEIGHT + (player.energy * WOUND_GROW_FACTOR)), stage.rbcXBoost);
				RBCs.push(b);
			}
        }
    }
	
	/* Diogo Fekete 2013.03.01
	Create enemies based on type and interval by stage */
    function spawnVirus() {
		if(playing) Enemies.push(new Enemy(canvas.width, player.woundSize, (WOUND_START_HEIGHT + (player.energy * WOUND_GROW_FACTOR)), "VIRUS"));
	}
	function spawnBacteria() {
		if(playing) Enemies.push(new Enemy(canvas.width, player.woundSize, (WOUND_START_HEIGHT + (player.energy * WOUND_GROW_FACTOR)), "BACTERIA"));
	}
	function spawnProtozoa() {
		if(playing) Enemies.push(new Enemy(canvas.width, player.woundSize, (WOUND_START_HEIGHT + (player.energy * WOUND_GROW_FACTOR)), "PROTOZOA"));
	}
	function spawnFungi() {
		if(playing) Enemies.push(new Enemy(canvas.width, player.woundSize, (WOUND_START_HEIGHT + (player.energy * WOUND_GROW_FACTOR)), "FUNGI"));
	}
	
	function getTextPositionX(text,p){ return ((world.width/p)-(context.measureText(text).width/2));	}

    function render() {
        renderWound();
        renderWBC();
		renderRBC();
        renderEnemies();
		renderVitamins();
        renderHUD();
    }

    function renderHUD() {
		// Highlights HUD
		updateHighlights();
		// Up HUD
		context.font = "Bold 20px sans-serif";
		context.fillStyle = 'rgba(243,243,21,0.5)';
		context.fillText("Bone Marrow", boneMarrowBarStart, hitAreaY_topLimit - 56);
		if (blinkCount <= 0 || (blinkCount % 5) == 0){
			context.fillStyle = 'rgba(2,2,1,1)';
			context.strokeRect(boneMarrowBarStart, hitAreaY_topLimit - 50, (boneMarrowBarStart + stage.boneMarrowCapacity), hitAreaY_topLimit - 30);
			context.fillStyle = 'rgba(240,240,210,0.4)';
			context.fillRect(boneMarrowBarStart+2, hitAreaY_topLimit - 48, boneMarrowBarEnd, hitAreaY_topLimit - 33);
		}
		if (blinkCount > 0) blinkCount--;
		// Middle HUD
		context.font = "Bold 30px Calibri";
        context.fillStyle = 'rgba(100,243,21,0.8)';
		context.fillText("Stage " + stage.id, getTextPositionX("stage 1",2), hitAreaY_bottomLimit + 50);
		context.fillText(stage.name, getTextPositionX(stage.name,2), hitAreaY_bottomLimit + 25);
		// Down HUD
		context.drawImage(pause_img, pauseStartX, hitAreaY_bottomLimit + 20);
		context.font = "Bold 40px Calibri";
        context.fillStyle = 'rgba(243,243,21,0.5)';
        context.fillText("HEALTH: " + player.energy, 55, hitAreaY_bottomLimit + 50);
		context.fillText("SCORE: " + player.score, 3*(canvas.width/4), hitAreaY_bottomLimit + 50);
		context.fillText("ACCURACY: " + player.accuracy + "%", 
			((3*(world.width/4))-(context.measureText("ACCURACY").width/4)), hitAreaY_bottomLimit + 85);
    }

    function renderWound() {
        if (player.energy > 0) {
            var w = player.energy * WOUND_GROW_FACTOR;
            // context.fillRect(startX, StartY, endX, endY);	
            context.fillStyle = 'rgba(243,243,21, 0.9)';
            context.fillRect(world.width - 20, 0, world.width, WOUND_START_HEIGHT + w);
            context.fillStyle = 'rgba(243,243,21, 0.9)';
            context.fillRect(world.width - 20, WOUND_END_HEIGHT + stage.gapSize - w, world.width, world.height);

            player.woundSize = (WOUND_END_HEIGHT + stage.gapSize - w) - (WOUND_START_HEIGHT + w);
        }
    }
	
	function renderRBC() {
        for (var i = 0; i < RBCs.length; i++) {
            var rbc = RBCs[i];
            context.drawImage(rbc.img, rbc.left(), rbc.top());
        }
    }

    function renderWBC() {
		var wbc_img = WBC_normal;
		if (player.energy <= 25) wbc_img = WBC_losing;
		else if (player.energy >= 75) wbc_img = WBC_winning;
        for(var i = 0; i < WBCs.length; i++) {
            var wbc = WBCs[i];	
            context.drawImage(wbc_img, wbc.left(), wbc.top());
        }
    }

    function renderEnemies() {
        for (var i = 0; i < Enemies.length; i++) {
            var enemy = Enemies[i];
            context.drawImage(enemy.img, enemy.left(), enemy.top());
        }
    }
	
	function renderVitamins() {
        for (var i = 0; i < Vitamins.length; i++) {
            var vit = Vitamins[i];
            context.drawImage(vit.img, vit.left(), vit.top());
        }
    }

	function createHighlight(text,font,color,xLocation,yLocation,xDeslocation,yDeslocation,alphaReduction){
		var textSize = context.measureText(text).width;
		var highlight = {
		text: text,
		font: font,
		color: color,
		xLocation: (xLocation + textSize) > world.width ? (xLocation - textSize) : xLocation,
		yLocation: yLocation,
		xDeslocation: xDeslocation,
		yDeslocation: yDeslocation,
		alpha: 1.0,
		alphaReduction: alphaReduction
		};
		Highlights.push(highlight);
	}
		
	function updateHighlights(){
		for(i=0; i < Highlights.length; i++){
			h = Highlights[i];
			if (h != null){
				context.font = h.font;
				context.fillStyle = h.color + h.alpha + ")";
				context.fillText(h.text,h.xLocation,h.yLocation);
				h.xLocation += h.xDeslocation;
				h.yLocation += h.yDeslocation;
				h.alpha -= h.alphaReduction;
				if (h.alpha <= 0) Highlights.splice(i, 1);
			}
		}
	}
	
	function updateVitamins(){
		// Update existing vitamins
		for (var i = 0; i < Vitamins.length; i++) {
			var vit = Vitamins[i];
            if (vit != null){
				if (vit.lifeTime <= 0) Vitamins.splice(i, 1);
				else vit.lifeTime--;
			}
		}
		// If there's space, roll dices to create a new vitamin
		if (Vitamins.length < stage.vitamins){
			if (Math.random() < stage.vitaminRate){
				var type;
				var dices = Math.random();
				if (dices <= .2) type = "A";
				else if (dices <= .4) type = "B2";
				else if (dices <= .6) type = "B9";
				else if (dices <= .8) type = "K";
				else type = "C";
					
				Vitamins.push(new Vitamin((world.width - world.toolMargin), hitAreaY_bottomLimit, hitAreaY_topLimit, type));
			}
		}
	}
	
    function updateEnemies() {
        for (var i = 0; i < Enemies.length; i++) {
            var enemy = Enemies[i];
            if (enemy != null){
				if(WBCs.length > 0){
					for(var j = 0; j < WBCs.length; j++){
						var wbc = WBCs[j];
						if ((((wbc.left() >= enemy.left()) && (wbc.left() <= enemy.right()))
						|| ((wbc.right() >= enemy.left()) && (wbc.right() <= enemy.right())))
						&& (((wbc.bottom() >= enemy.top()) && (wbc.bottom() <= enemy.bottom()))
						|| ((wbc.top() >= enemy.top()) && (wbc.top() <= enemy.bottom())))) {
							var xLocation;
							var yLocation;
							var collisionArea;
							var collisionPercentage;
							var coverArea = enemy.bottom() - enemy.top();
							if(wbc.top() < enemy.top()){
								collisionArea = wbc.bottom() - enemy.top();
								yLocation = wbc.top();
								xLocation = wbc.right();
							}
							else if(wbc.top() > enemy.top()){
								collisionArea = enemy.bottom() - wbc.top();
								yLocation = enemy.top();
								xLocation = enemy.left();
							}
							collisionPercentage = ~~((collisionArea/coverArea)*100);
							if(collisionPercentage < 10){
								collisionPercentage = 10;
							}
							createHighlight(collisionPercentage+"%","Bold 50px Calibri","rgba(0,0,0,",xLocation,yLocation,0,-2,.05); 
							player.accuracy = ~~((player.accuracy + collisionPercentage)/2);
							player.score += enemy.damage;
							Enemies.splice(i, 1);
							WBCs.splice(j, 1);
							i--;
							j--;
							break;
						}
					}
				}
			   
				// If the enemy reached the left side
				if (enemy.right() < 0) {
					player.energy -= enemy.damage;
					Enemies.splice(i, 1);
					i--;
					if (player.energy <= 0)
						GameOver(false);
				}
				// If the didn't reach the left side yet, continue advancing towards
				else {
					var dices = Math.random();
					enemy.acceleration.y = dices < .5 ? Math.random() * -1 : Math.random();
					enemy.update(delta);
				}
			}
        }
    }

    function updateBlood() {
        for (var i = 0; i < RBCs.length; i++) {
            var blood = RBCs[i];
			if(blood != null){
				for (var j = 0; j < Enemies.length; j++) {
					var enemy = Enemies[j];
					if (((blood.right() >= enemy.left()) && (blood.right() <= enemy.right()))
					&& (((blood.bottom() >= enemy.top()) && (blood.bottom() <= enemy.bottom()))
					|| ((blood.top() >= enemy.top()) && (blood.top() <= enemy.bottom())))) {
						if (enemy.type == "VIRUS")
							if (Math.random() <= stage.virusDuplicationRate)
								Enemies.push(new Enemy(enemy.right(), enemy.img.height, enemy.position.y, "VIRUS"));
						RBCs.splice(i, 1);
						i--;
						break;
					}
				}

				// If the blood reached the right side
				if (blood.right() > (world.width - 20)) {
					if (player.energy >= 100) {
						GameOver(true);                    
					}
					else {
						player.energy += blood.heal;
					}
					RBCs.splice(i, 1);
					i--;
				}
				// If the blood didn't reach the right side yet, continue advancing towards
				else {
					var dices = Math.random();
					blood.acceleration.y = dices < .5 ? Math.random() * -1 : Math.random();
					blood.update(delta);
				}
			}
        }
    }

    function GameOver(win) {
        playing = false;
		
		if(win){
			PLAYER_STATE = "YOU WIN";
			bestLevel = stage.id;
		}
		else
			PLAYER_STATE = "YOU LOSE";

		document.getElementById('background_audio').muted = true;
    }
	
	function ShowScore(){
		context.drawImage(background_img, 0, 0, world.width, world.height);
		context.font = "Bold 90px Calibri";
		context.fillStyle = PLAYER_STATE == "YOU WIN" ? 'rgba(23,2,201,0.9)' : 'rgba(230,24,21,0.9)';
		context.fillText(PLAYER_STATE, getTextPositionX(PLAYER_STATE,2), world.height/2);
		context.font = "Bold 40px Calibri";
		context.fillStyle = 'rgba(0,220,221,0.5)';
		context.fillText("HEALTH: " + (player.energy <= 0 ? "0" : "100"), getTextPositionX("HEALTH: 100",2), (world.height/2) + 100);
		context.fillText("SCORE: " + player.score, getTextPositionX("SCORE: 100",2), (world.height/2) + 150);
		context.fillText("ACCURACY: " + player.accuracy + "%", getTextPositionX("ACCURACY: 100%",2), (world.height/2) + 200);
	}
	
    function documentMouseMoveHandler(event) {

        // get external ref to the game world
        var gameWorld = GameWorld.gameWorld;
		var updatedX = event.clientX;
		var updatedY = event.clientY;
		
		// Applying margins to limit per window size
		//if(updatedX < gameWorld.toolMargin) {
			//updatedX = gameWorld.toolMargin;
		//}
		//else 
		if(updatedX > gameWorld.width - gameWorld.toolMargin) {
			updatedX = gameWorld.width - gameWorld.toolMargin;
		}

		//if(updatedY < gameWorld.toolMargin) {
		//	updatedY = gameWorld.toolMargin;
		//}
		//else 
		//if(updatedY > gameWorld.height - gameWorld.toolMargin) {
			//updatedY = gameWorld.height - gameWorld.toolMargin;
		//}
		
		//is the mouse over the link? (before start the stage)
		if (!playing)
		{
			if(updatedX >= linkStartX && updatedX <= linkEndX && updatedY <=(linkY+(linkHeight/2)) && updatedY >= (linkY-(linkHeight/2))
				&& ((((updatedX / spaceBetweenLevels) % 1) >= .4) && (((updatedX / spaceBetweenLevels) % 1) <= .7))
			){
				document.body.style.cursor = "pointer";
				levelID = Math.floor(updatedX / spaceBetweenLevels);
				inLink=true;
			}
			else{
			  document.body.style.cursor = "";
			  inLink=false;
			}
		}
		//check if the player is in hitArea
		else
		{
			if (updatedY < hitAreaY_bottomLimit && updatedY > hitAreaY_topLimit){
				hitArea = true;
				// check if the player is on a vitamin
				
			}
			else{
				hitArea = false;
				// check if the player is onPause icon
				// TODO: FIX!
				if (updatedX >= pauseStartX && updatedX <= pauseEndX && updatedY >= pauseTop && updatedY <= pauseBottom){
					document.body.style.cursor = "pointer";
					inPause = true;
				}
				else{
				  document.body.style.cursor = "";
				  inPause=false;
				}
				// TODO: FIX!
			}
		}

        mouse.x = updatedX;
        mouse.y = updatedY;
    }

    function documentMouseDownHandler(event) {
        event.preventDefault();
        //mouse.down = true;
		if(playing){
			if(hitArea)
				if(!tryGetVitamin()) 
					createWBC();
		}
		else if (inLink){
				inLink = false;
				startGame();
			}
			
		if(inPause && !inLink)
			togglePause();
    }
	
	function tryGetVitamin(){
		// Check if pointer is on a vitamin, but only if there's any!
		var gotIt = false;
		if (Vitamins.length > 0){
			for (var i = 0; i < Vitamins.length; i++) {
				var vit = Vitamins[i];
				if (vit != null)
					if (mouse.x >= vit.left() && mouse.x <= vit.right()
						&& mouse.y >= vit.top() && mouse.y <= vit.bottom()){
						giveBonus(vit);
						createHighlight("Vitamin " + vit.type,"Bold 50px Calibri","rgba(0,204,20,",mouse.x,mouse.y,0,0,.01); 
						Vitamins.splice(i, 1);
						i--;
						gotIt = true;
						break;
					}
			}
		}
		return gotIt;
	}
	
	function giveBonus(vitamin){
		stage.boneMarrowCapacity += vitamin.boneMarrowSize;
		stage.rbc += vitamin.rbcUnits;
		stage.boneMarrowRegeneration += vitamin.boneMarrowRegeneration;
		stage.rbcXBoost += vitamin.rbcVelocityBoost;
		if (vitamin.killVirus){
			// Kill all virus rendered on the screen
			for(var i = 0; i < Enemies.length; i++) {
				var e = Enemies[i];
				if (e != null && e.type == "VIRUS"){
					player.score += e.damage;
					Enemies.splice(i, 1);
					i--;
				}
			}
		}
		player.score += vitamin.score;
	}
	
	function updateBoneMarrowBar(option){
		var updated = boneMarrowBarEnd;
		var max = boneMarrowBarStart + stage.boneMarrowCapacity;
		switch (option) {
		case "increase":
			creationFrequency -= stage.boneMarrowStamina;
			if (creationFrequency < 0) creationFrequency = 0;
			updated += stage.boneMarrowRegeneration;
			break;
		case "decrease":
			updated -= creationFrequency;
			break;
		default:
			return;
		}
		if (updated >= max) updated = max;
		if (updated <= 0) updated = 0;
		boneMarrowBarEnd = updated;
	}
	
	function allowToCreateWBC(){
		var canCreate = true;
		for(var i = 0; i < WBCs.length; i++) {
			var wbc = WBCs[i];
			if (wbc != null)
				if (mouse.x >= wbc.left() && mouse.x <= wbc.right()
					&& mouse.y >= wbc.top() && mouse.y <= wbc.bottom()){
					canCreate = false;
					break;
				}
		}
		return canCreate;
	}

    function createWBC(){
		creationFrequency += stage.boneMarrowWbcUse;
		if (boneMarrowBarEnd >= creationFrequency){
			if (allowToCreateWBC()){
				WBCs.push( new WBC(mouse.x, mouse.y, (WBC_normal.width / 2)) );
				// Control frequency of creation of WBC by bone marrow bar
				updateBoneMarrowBar("decrease");
			}
		}
		else //Make the BoneMarrowBar blink to atract the attention of the gamer
			blinkCount = 15; // number of blinks divided by 5
    }

    function renderLevelSelection() {
		context.drawImage(stageBackground_img, 0, 0, world.width, world.height);
		context.font = "Bold " + linkHeight + "px Calibri";
        context.fillStyle = 'rgba(240,240,240,0.8)';
	
		var newX= spaceBetweenLevels / 2;
		linkStartX = spaceBetweenLevels /3;
		for (var i = 1; i <= Stages.length; i++) {
			// Just enable levels <= bestLevel
			context.fillText(i, newX, linkY);
			newX += spaceBetweenLevels;
			if (i >= (bestLevel+1))
				context.fillStyle = 'rgba(40,40,' + (200 - (i*20)) + ',0.5)';
        }
		linkEndX = newX + spaceBetweenLevels;
    }

    function startGame() {
		// Allow just available levels
        if (levelID > bestLevel) return;
		
		stage = { 
			id: Stages[levelID].id,
			name: Stages[levelID].name,
			health: Stages[levelID].health,
			rbc: Stages[levelID].rbc,
			rbcInterval: Stages[levelID].rbcInterval,
			rbcXBoost: Stages[levelID].rbcXBoost,
			virus: Stages[levelID].virus,
			virusDuplicationRate: Stages[levelID].virusDuplicationRate,
			bacteria: Stages[levelID].bacteria,
			protozoa: Stages[levelID].protozoa,
			fungi: Stages[levelID].fungi,
			gapSize: Stages[levelID].gapSize,
			boneMarrowCapacity: Stages[levelID].boneMarrowCapacity,
			boneMarrowRegeneration: Stages[levelID].boneMarrowRegeneration,
			boneMarrowWbcUse: Stages[levelID].boneMarrowWbcUse,
			boneMarrowStamina: Stages[levelID].boneMarrowStamina,
			vitamins: Stages[levelID].vitamins,
			vitaminRate: Stages[levelID].vitaminRate
		};
		
		player = new Player();

        canvas.style.cursor = 'default';
		document.getElementById('background_audio').muted = false;
		
		/*  Diogo Fekete 2013.03.05
		 Reset all intervals from previuos stage */
		if (blood_spawn != null) { clearInterval(blood_spawn); blood_spawn = null; }
		if (virus_spawn != null) { clearInterval(virus_spawn); virus_spawn = null; }
		if (bacteria_spawn != null) { clearInterval(bacteria_spawn); bacteria_spawn = null; }
		if (protozoa_spawn != null) { clearInterval(protozoa_spawn); protozoa_spawn = null; } 
		if (fungi_spawn != null) { clearInterval(fungi_spawn); fungi_spawn = null; }
		
        startLevel();
    }

    function startLevel() {
        playing = true;
		// Clear all variables from the previous stage (if exist)
        WBCs = [];
		RBCs = [];
		Enemies = [];
		
		rbc_spawn_interval = stage.rbcInterval;
        player.woundSize = stage.gapSize;
		player.energy = stage.health;
		boneMarrowBarEnd = boneMarrowBarStart + stage.boneMarrowCapacity;
		creationFrequency = 0;
		
		inLink = false;
		
		/*  Diogo Fekete 2013.03.05
		Setting intervals for each enemy */
		blood_spawn = setInterval(spawnBlood, rbc_spawn_interval);
		if(stage.virus > 0) virus_spawn = setInterval(spawnVirus, stage.virus);
		if(stage.bacteria > 0) bacteria_spawn = setInterval(spawnBacteria, stage.bacteria);
		if(stage.protozoa > 0) protozoa_spawn = setInterval(spawnProtozoa, stage.protozoa);
		if(stage.fungi > 0) fungi_spawn = setInterval(spawnFungi, stage.fungi);
    }

};



