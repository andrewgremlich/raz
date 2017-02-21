(function () {

    var socket = io()

    /*OBJECTS*/

    document.querySelector('canvas').width = window.innerWidth
    document.querySelector('canvas').height = window.innerHeight

    /**************************
    CANVAS PROTOTYPE CONSTRUCTOR
     ***************************/

    function Canvas() {
        this.canvasElement = document.getElementById('myCanvas')
        this.ctx = this.canvasElement.getContext('2d')
        this.width = this.canvasElement.width
        this.height = this.canvasElement.height
    }

    /*Prototype method to draw the borders on the canvas.  Purely decorative*/

    Canvas.prototype.drawBorders = function () {
        this.ctx.beginPath()
        this.ctx.moveTo(2, 2)
        this.ctx.lineTo(this.width - 2, 2)
        this.ctx.lineTo(this.width - 2, this.height - 2)
        this.ctx.lineTo(2, this.height - 2)
        this.ctx.lineTo(2, 2)
        this.ctx.stroke()
    }

    /*
    Clear the frame for the framerate.
    */

    Canvas.prototype.clearFrame = function () {
        this.ctx.clearRect(0, 0, this.width, this.height)
    }

    /**************************
    ENEMY PROTOTYPE CONSTRUCTOR
    ***************************/
    function Enemy(x, y) {
        this.width = 10
        this.height = 10
        this.xMotionSpeed = 4
        this.yMotionSpeed = 2
        this.radius = 10
        this.x = x
        this.y = y
        this.collisions = 0
    }

    /*
    Draw the enemy circle on the canvas element.
    */

    Enemy.prototype.drawEnemy = function (ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius + this.collisions * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = '#a73838'
        ctx.fill()
        ctx.closePath()
    }

    /*
    Automatic motion of the enemy circle.
    */

    Enemy.prototype.updateEnemyPosition = function () {
        this.x += this.xMotionSpeed
        this.y += this.yMotionSpeed
    }

    /*
    Automatic and size incrementing motion of the enemy.  Each time that the enemy
    touches a wall the enemy grows.
    */

    Enemy.prototype.collision = function (cwidth, cheight) {

        var xPos = this.x + this.xMotionSpeed,
            yPos = this.y + this.yMotionSpeed,
            collisionFactor = this.collisions * 1.5

        /*The collision of an expanding circle is being detected half the time.*/

        if (xPos > cwidth - this.radius - collisionFactor || xPos < this.radius + collisionFactor) {
            this.xMotionSpeed = -this.xMotionSpeed
            this.collisions = this.collisions + 2
        }
        if (yPos > cheight - this.radius - collisionFactor || yPos < this.radius + collisionFactor) {
            this.yMotionSpeed = -this.yMotionSpeed
            this.collisions = this.collisions + 2
        }

    }

    /***************************
    PLAYER PROTOTYPE CONSTRUCTOR
    ****************************/

    function Player(x, y) {
        this.width = 10
        this.height = 10
        this.x = x
        this.y = y
        this.xMotionSpeed = 0
        this.yMotionSpeed = 0
        this.radius = 10
    }

    /*
    Draw player.  It's just a circle for now.
    */

    Player.prototype.drawPlayer = function (ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = '#558bb8'
        ctx.fill()
        ctx.closePath()
    }

    /*
    Player motion according to the arrow controls in the movePlayer method
    */

    Player.prototype.updatePlayerPosition = function () {
        this.x += this.xMotionSpeed
        this.y += this.yMotionSpeed
    }

    /*
    Evaluate collision of the player with the edges of the play area.
    */

    Player.prototype.collision = function (cwidth, cheight) {

        var xPos = this.x + this.xMotionSpeed,
            yPos = this.y + this.yMotionSpeed

        if (xPos > cwidth - this.radius || xPos < this.radius) this.xMotionSpeed = -this.xMotionSpeed
        if (yPos > cheight - this.radius || yPos < this.radius) this.yMotionSpeed = -this.yMotionSpeed
    }

    /*
    Directional control with the arrow keys.
    */

    Player.prototype.movePlayer = function () {

        var that = this

        document.onkeydown = function (e) {

            /*To make a static speed instead of a steady acceleration

            that.xMotionSpeed = 0
            that.yMotionSpeed = 0
            */

            let keyCode = e.keyCode || e.which,
                stringKey = keyCode.toString(),
                move = {
                    '37': function () {
                        /*arrow left*/
                        that.xMotionSpeed = that.xMotionSpeed - 2
                    },
                    '38': function () {
                        /*arrow up*/
                        that.yMotionSpeed = that.yMotionSpeed - 2
                    },
                    '39': function () {
                        /*arrow right*/
                        that.xMotionSpeed = that.xMotionSpeed + 2
                    },
                    '40': function () {
                        /*arrow down*/
                        that.yMotionSpeed = that.yMotionSpeed + 2
                    }
                }

            move[stringKey]()
        }

        document.onkeyup = function () {

            that.xMotionSpeed = 0
            that.yMotionSpeed = 0

        }
    }

    /*SOCKET CONNECTION*/

    socket.on('user joined', e => {
        console.log(e)
        console.log("user joined")
    })

    socket.on('user left', e => {
        console.log(e)
        console.log("user left")
    })

    socket.on('socketdata', e => {
        console.log(e)
    })

    /*End game function.*/
    function endgame(player, enemy) {

        var enemyRadius = enemy.radius + enemy.collisions * 1.5,
            playerRadius = player.radius,
            middleEvalExpr = Math.pow(player.x - enemy.x, 2) + Math.pow(player.y - enemy.y, 2),
            lowerEval = Math.pow(playerRadius - enemyRadius, 2) <= middleEvalExpr,
            higherEval = middleEvalExpr <= Math.pow(playerRadius + enemyRadius, 2)

        if (lowerEval && higherEval) {
            setTimeout(() => {
                clearInterval(window.inter)
                document.querySelector('#login').style.display = 'flex'
                document.querySelector('#canvasContainer').style.display = 'none'
            }, 1)
        }

    }

    /*FRAME RATE*/

    function frameRate(renderingObject) {

        console.log(renderingObject)

        let canvas = renderingObject.canvas,
            player = renderingObject.player,
            enemy = renderingObject.enemy()

        console.log(canvas, player, enemy)

        canvas.clearFrame()
        canvas.drawBorders()

        player.drawPlayer(canvas.ctx)
        enemy.drawEnemy(canvas.ctx)

        player.updatePlayerPosition()
        enemy.updateEnemyPosition()

        player.collision(canvas.width, canvas.height)
        enemy.collision(canvas.width, canvas.height)


        /*Pass into the function the positional data of the player and the enemy.*/
        endgame(player, enemy)
    }

    /*****
    EVENTS
    ******/

    document.querySelector('input[type="button"]').onclick = e => {
        let srcElement = e.target || e.srcElement,
            textInput = srcElement.previousElementSibling,
            username = textInput.value,
            parent = srcElement.parentElement,
            aunt = parent.nextElementSibling

        /*GAME MECHANICS*/

        socket.emit('add user', username);

        socket.on('login', e => {

            console.log(e)

            let renderingObject = {
                'canvas': new Canvas(),
                'player': new Player(e.clientData[0].x, e.clientData[0].y),
                'enemy': function () {
                    return new Enemy(e.clientData[1].x, e.clientData[1].y)
                }
            }

            console.log(renderingObject)

            parent.style.display = 'none'
            aunt.style.display = 'block'

            renderingObject.player.movePlayer()
            window.inter = setInterval(() => {
                frameRate(renderingObject)
            }, 10)
            console.log("login")
        })

        /*
        TODO
        I am going to need an emit function that passes the positional
        data to every that is connected.

        I also need to have it support multiple players and not just one.
        */
    }

}())
