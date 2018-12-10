    // Configuration.
//dino1
var dino1 = {
    startX: 200,
    startY: 350,
    topSpeed: 10,
    acceleration: 0.25,
    src: "dinos/gifs/DinoSprites_doux.gif"
};

var dino2 = {
    startX: document.body.clientWidth - 200,
    startY: 350,
    topSpeed: 10,
    acceleration: 0.25,
    src: "dinos/gifs/DinoSprites_mort.gif"
};


//map1
    var friction = 0.5;
    var brakeFriction = 1;

//math functions.
    function toDegrees (angle){
        return angle * (180 / Math.PI);
    }

    function toRadians (angle){
        return angle * (Math.PI / 180);
    }

    function sinDegree(degrees){
        return Math.round(Math.sin(toRadians(degrees)) * 1000) / 1000;
    }

    function cosDegree(degrees){
        return Math.round(Math.cos(toRadians(degrees)) * 1000 ) / 1000;
    }
    function sinInverseDegree(num) {
        return Math.round(toDegrees(Math.asin(toRadians(num))));
    }

    window.onload = function(){
        var theCanvas = document.getElementById("theCanvas");
        theCanvas.width = document.body.clientWidth;
        theCanvas.height = document.body.clientHeight;

        var stage = new createjs.Stage(theCanvas);

        var player1 = new Image;
        var player2 = new Image;
        player1.src = dino1.src;
        player2.src = dino2.src;

        player2.onload = function(){
            var p2 = new createjs.Bitmap(player2);

            p2.scaleX = 2.5;
            p2.scaleY = 2.5;

            p2.x = dino2.startX;
            p2.y = dino2.startY;

            p2.regX = p2.image.width * 2.5;
            p2.regY =  p2.image.height * 2.5;
            p2.rotation = 0;

            stage.addChild(p2);

            var p1 = new createjs.Bitmap(player1);

            p1.scaleX = 2.5;
            p1.scaleY = 2.5;

            p1.x = dino1.startX;
            p1.y = dino1.startY;

            p1.regX = p1.image.width * 2.5;
            p1.regY =  p1.image.height * 2.5;
            p1.rotation = 0;

            stage.addChild(p1);

            stage.update();

            // Order of keys: left, up, right, down.
            var keysDown = [0, 0, 0, 0];

            document.onkeydown = function(e){
                var keyCode = e.keyCode - 37;
                keysDown[keyCode] = 1;
                if(keyCode > -1 && keyCode < 5) e.preventDefault();
            };

            document.onkeyup = function(e){
                var keyCode = e.keyCode - 37;
                keysDown[keyCode] = 0;
                if(keyCode > -1 && keyCode < 5) e.preventDefault();
            };

            createjs.Ticker.setFPS(40);

            var speed1 = 0;
            var oldRotation1;
            var oldY1 = 0, oldX1 = 0;

            var speed2 = 0;
            var oldRotation2;
            var oldY2 = 0, oldX2 = 0;

            createjs.Ticker.addEventListener("tick", function(){

                    console.log(p1.rotation, p2.rotation);
                if(keysDown[1])
                {
                    // If the up key is down.
                    speed1 += dino1.acceleration;
                    if(speed1 > dino1.topSpeed)
                    {
                        speed1 = dino1.topSpeed;
                    }
                } else if (keysDown[3])
                {
                    // If the down key is down.
                    speed1 -= dino1.acceleration;
                    if(speed1 > dino1.topSpeed)
                    {
                        speed1 = dino1.topSpeed;
                    }
                }
                else
                {
                    if (speed1 > 0) {speed1 -= friction}
                    if(speed1 < 0) {speed1 += friction}
                    if (speed1 == 0) { speed1 = 0 }
                }

                if(p1.rotation !== oldRotation1)
                {
                    // If the rotation changed, calculate new speeds.
                    oldCos1 = cosDegree(p1.rotation);
                    oldSin1 = sinDegree(p1.rotation);
                }

                p1.y -= speed1 * oldCos1;
                p1.x += speed1 * oldSin1;

                oldRotation1 = p1.rotation;

                var recX1 = p1.x;
                var recY1 = p1.y;

                if(recX1 >= theCanvas.width
                    || recX1 <= 0
                    || recY1 >= theCanvas.height
                    || recY1 <= 0) {return console.log("you lose");}

                // Little performance improvement.
                var checkSpeed1 = speed1;

                if(keysDown[0] && checkSpeed1 != 0)
                {
                    // If the left key is pressed.
                    p1.rotation -= 1 * (checkSpeed1 / 3);
                }
                if(keysDown[2] && checkSpeed1 != 0)
                {
                    // If the right key is pressed.
                    p1.rotation += 1 * (checkSpeed1 / 3);
                }


                if(keysDown[50])
                {
                    // If the up key is down.
                    speed2 += dino2.acceleration;
                    if(speed2 > dino2.topSpeed)
                    {
                        speed2 = dino2.topSpeed;
                    }
                } else if (keysDown[46])
                {
                    // If the down key is down.
                    speed2 -= dino2.acceleration;
                    if(speed2 > dino2.topSpeed)
                    {
                        speed2 = dino2.topSpeed;
                    }
                }
                else
                {
                    if (speed2 > 0) {speed2 -= friction}
                    if(speed2 < 0) {speed2 += friction}
                    if (speed2 == 0) { speed2 = 0 }
                }

                if(p2.rotation !== oldRotation2)
                {
                    // If the rotation changed, calculate new speeds.
                    oldCos2 = cosDegree(p2.rotation);
                    oldSin2 = sinDegree(p2.rotation);
                }

                p2.y -= speed2 * oldCos2;
                p2.x += speed2 * oldSin2;

                oldRotation2 = p2.rotation;

                var recX2 = p2.x;
                var recY2 = p2.y;

                if(recX2 >= theCanvas.width
                    || recX2 <= 0
                    || recY2 >= theCanvas.height
                    || recY2 <= 0) {return console.log("you lose");}

                // Little performance improvement.
                var checkSpeed2 = speed2;

                if(keysDown[28] && checkSpeed2 != 0)
                {
                    // If the left key is pressed.
                    p2.rotation -= 1 * (checkSpeed2 / 3);
                }
                if(keysDown[31] && checkSpeed2 != 0)
                {
                    // If the right key is pressed.
                    p2.rotation += 1 * (checkSpeed2 / 3);
                }

                var dx = recX1 - recX2;
                var dy = recY1 - recY2;
                var distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < p1.image.width * 2.5) {
                    // collision detected!
                    console.log("we lose");
                    var x1 = speed1 * sinDegree(p1.rotation);
                    var y1 = speed1 * cosDegree(p1.rotation);
                    var x2 = speed2 * sinDegree(p2.rotation);
                    var y2 = speed2 * cosDegree(p2.rotation);

                    var x1new = x2;
                    var y1new = y2;
                    var x2new = x1;
                    var y2new = y1;

                    speed1 = Math.sqrt(x1new*x1new + y1new*y1new);
                    speed2 = Math.sqrt(x2new*x2new + y2new*y2new);

                    var abc = p1.rotation
                    p1.rotation = p2.rotation;
                    p2.rotation = abc;
                }

                stage.update();
            });
        }
    };
