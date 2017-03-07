(function () {
'use strict';

/**************************
CANVAS PROTOTYPE CONSTRUCTOR
 ***************************/

class Canvas {
    constructor() {
        this.canvasElement = document.getElementById('myCanvas');
        this.ctx = this.canvasElement.getContext('2d');
        this.width = this.canvasElement.width;
        this.height = this.canvasElement.height;
    }

    clearFrame() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
}

class Player {
    constructor(x, y) {
        this.width = 10;
        this.height = 10;
        this.x = x;
        this.y = y;
        this.xMotionSpeed = 0;
        this.yMotionSpeed = 0;
        this.radius = 10;
    }

    drawPlayer(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#558bb8';
        ctx.fill();
        ctx.closePath();
    }

    updatePlayerPosition() {
        this.x += this.xMotionSpeed;
        this.y += this.yMotionSpeed;
    }

    collision(cwidth, cheight) {

        var xPos = this.x + this.xMotionSpeed,
            yPos = this.y + this.yMotionSpeed;

        if (xPos > cwidth - this.radius || xPos < this.radius) this.xMotionSpeed = -this.xMotionSpeed;
        if (yPos > cheight - this.radius || yPos < this.radius) this.yMotionSpeed = -this.yMotionSpeed;
    }

    movePlayer() {

        var that = this;

        document.onkeydown = e => {

            /*To make a static speed instead of a steady acceleration*/

            that.xMotionSpeed = 0;
            that.yMotionSpeed = 0;

            let keyCode = e.keyCode || e.which,
                stringKey = keyCode.toString(),
                move = {
                    '37': () => {
                        /*arrow left*/
                        that.xMotionSpeed = that.xMotionSpeed - 2;
                        socket.emit('go left', that);
                    },
                    '38': () => {
                        /*arrow up*/
                        that.yMotionSpeed = that.yMotionSpeed - 2;
                        socket.emit('go up', that);
                    },
                    '39': () => {
                        /*arrow right*/
                        that.xMotionSpeed = that.xMotionSpeed + 2;
                        socket.emit('go right', that);
                    },
                    '40': () => {
                        /*arrow down*/
                        that.yMotionSpeed = that.yMotionSpeed + 2;
                        socket.emit('go down', that);
                    }
                };

            move[stringKey]();
        };

        document.onkeyup = () => {

            that.xMotionSpeed = 0;
            that.yMotionSpeed = 0;

            socket.emit('reset motion', that);

        };
    }
}

/*End game function.*/

/*
TODO
The drawing of the canvas needs to show the position of the connected players.  
Having an interval in the current location isn't a very good spot.
*/

var socket$1 = io();

/*OBJECTS*/

document.querySelector('canvas').width = window.innerWidth;
document.querySelector('canvas').height = window.innerHeight;

/*OBJECT OFF OF PROTOTYPES*/

var canvas = new Canvas();

function drawOtherPlayers(ctx, pos) {

    //        ctx.clearRect(0, 0, this.width, this.height)

    ctx.beginPath();
    ctx.arc(pos.x, pos.y, pos.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#55b877';
    ctx.fill();
    ctx.closePath();
}

/*SOCKET CONNECTION*/

socket$1.on('user connected', e => {
    console.log("user connected", e);
});

socket$1.on('lobbyUser', e => {
    console.log(e);
});

socket$1.on('on left', e => {
    drawOtherPlayers(canvas.ctx, e);
});

socket$1.on('on up', e => {
    drawOtherPlayers(canvas.ctx, e);
});

socket$1.on('on right', e => {
    drawOtherPlayers(canvas.ctx, e);
});

socket$1.on('on down', e => {
    drawOtherPlayers(canvas.ctx, e);
});

socket$1.on('on reset', e => {
    drawOtherPlayers(canvas.ctx, e);
});

socket$1.on('user left', e => {
    console.log(e);
});

/*FRAME RATE*/

function frameRate(renderingObject) {

    let canvas = renderingObject.canvas,
        player = renderingObject.player;
        //            enemy = renderingObject.enemy()

    canvas.clearFrame();

    player.drawPlayer(canvas.ctx);
        //        enemy.drawEnemy(canvas.ctx)

    player.updatePlayerPosition();
        //        enemy.updateEnemyPosition()

    player.collision(canvas.width, canvas.height);
        //      enemy.collision(canvas.width, canvas.height)


    /*Pass into the function the positional data of the player and the enemy.*/
    //      endgame(player, enemy)
}

/*****
EVENTS
******/

document.querySelector('input[type="button"]').onclick = e => {
    let srcElement = e.target || e.srcElement,
        textInput = srcElement.previousElementSibling,
        username = textInput.value,
        parent = srcElement.parentElement,
        aunt = parent.nextElementSibling;

    /*GAME START MECHANICS*/

    socket$1.emit('add user to game', username);

    socket$1.on('login', e => {

        let xPos = e.clientData.player.x,
            yPos = e.clientData.player.y,
            renderingObject = {
                'canvas': canvas,
                'player': new Player(xPos, yPos)
            };

        parent.style.display = 'none';
        aunt.style.display = 'block';

        renderingObject.player.movePlayer();

        window.inter = setInterval(() => {
            frameRate(renderingObject);
        }, 10);

    });
};

}());
//# sourceMappingURL=main.js.map
