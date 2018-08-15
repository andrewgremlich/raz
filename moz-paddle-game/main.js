function Paddle(ctx, canvas) {
  this.canvas = canvas;
  this.ctx = ctx;
  this.paddleWidth = 75;
  this.paddleHeight = 10;
  this.paddleX = (this.canvas.width - this.paddleWidth) / 2;
}

Paddle.prototype.drawPaddle = function() {
  this.ctx.beginPath();
  this.ctx.rect(this.paddleX, this.canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
  this.ctx.fillStyle = '#0095DD';
  this.ctx.fill();
  this.ctx.closePath();
};

function Ball(ctx, canvas) {
  this.ballRadius = 10;
  this.ctx = ctx;
  this.canvas = canvas;
  this.x = this.canvas.width / 2;
  this.y = this.canvas.height - 30;
}

Ball.prototype.drawBall = function() {
  this.ctx.beginPath();
  this.ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
  this.ctx.fillStyle = '#0095DD';
  this.ctx.fill();
  this.ctx.closePath();
};

function BrickField(ctx) {
  this.ctx = ctx;
  this.bricks = [];
  this.brickColumnCount = 3;
  this.brickRowCount = 5;
  this.brickWidth = 75;
  this.brickHeight = 20;
  this.brickPadding = 10;
  this.brickOffsetTop = 30;
  this.brickOffsetLeft = 30;

  this.generateField();
}

BrickField.prototype.drawBricks = function() {
  for (let c = 0; c < this.brickColumnCount; c++) {
    for (let r = 0; r < this.brickRowCount; r++) {
      if (this.bricks[c][r].status == 1) {
        let brickX = (r * (this.brickWidth + this.brickPadding)) + this.brickOffsetLeft;
        let brickY = (c * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop;
        this.bricks[c][r].x = brickX;
        this.bricks[c][r].y = brickY;
        this.ctx.beginPath();
        this.ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
        this.ctx.fillStyle = '#0095DD';
        this.ctx.fill();
        this.ctx.closePath();
      }
    }
  }
};

BrickField.prototype.generateField = function() {
  for (let c = 0; c < this.brickColumnCount; c++) {
    this.bricks[c] = [];
    for (let r = 0; r < this.brickRowCount; r++) {
      this.bricks[c][r] = {
        x: 0,
        y: 0,
        status: 1
      };
    }
  }
};

function Canvas() {
  this.canvas = document.getElementById('myCanvas');
  this.ctx = this.canvas.getContext('2d');

  this.dx = 2;
  this.dy = -2;

  this.paddle = new Paddle(this.ctx, this.canvas);
  this.brickField = new BrickField(this.ctx);
  this.ball = new Ball(this.ctx, this.canvas);
}

Canvas.prototype.collisionDetection = function() {
  for (let c = 0; c < this.brickField.brickColumnCount; c++) {
    for (let r = 0; r < this.brickField.brickRowCount; r++) {
      let b = this.brickField.bricks[c][r];
      if (b.status === 1) {
        let xCollision = this.ball.x > b.x && this.ball.x < b.x + this.brickField.brickWidth;
        let yCollision = this.ball.y > b.y && this.ball.y < b.y + this.brickField.brickHeight;
        if (xCollision && yCollision) {
          this.dy = -this.dy;
          b.status = 0;
        }
      }
    }
  }
};

function Game() {
  this.rightPressed = false;
  this.leftPressed = false;

  this.setEvents();
}

Game.prototype = new Canvas();

Game.prototype.keyDownHandler = function(th) {
  let that = th;

  document.onkeydown = function(e) {
    if (e.keyCode == 39) {
      that.rightPressed = true;
    } else if (e.keyCode == 37) {
      that.leftPressed = true;
    }
  };
};

Game.prototype.keyUpHandler = function(th) {
  let that = th;

  document.onkeyup = function(e) {
    if (e.keyCode == 39) {
      that.rightPressed = false;
    } else if (e.keyCode == 37) {
      that.leftPressed = false;
    }
  };
};

Game.prototype.setEvents = function() {
  this.keyDownHandler(this);
  this.keyUpHandler(this);
};

Game.prototype.drawFrame = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.brickField.drawBricks();
  this.ball.drawBall();
  this.paddle.drawPaddle();
  this.collisionDetection();

  let ballRightXBounce = this.ball.x + this.dx > this.canvas.width - this.ball.ballRadius;
  let ballLeftXBounce = this.ball.x + this.dx < this.ball.ballRadius;

  if (ballRightXBounce || ballLeftXBounce) {
    this.dx = -this.dx;
  }

  //Y ball bounce
  if (this.ball.y + this.dy < this.ball.ballRadius) {
    this.dy = -this.dy;
  } else if (this.ball.y + this.dy > this.canvas.height - this.ball.ballRadius) {
    if (this.ball.x > this.paddle.paddleX && this.ball.x < this.paddle.paddleX + this.paddle.paddleWidth) {
      this.dy = -this.dy;
    } else {
      console.log('GAME OVER');
    }
  }

  if (this.rightPressed && this.paddle.paddleX < this.canvas.width - this.paddle.paddleWidth) {
    this.paddle.paddleX += 7;
  } else if (this.leftPressed && this.paddle.paddleX > 0) {
    this.paddle.paddleX -= 7;
  }

  this.ball.x += this.dx;
  this.ball.y += this.dy;
};

let executeGame = new Game();

setInterval(() => {
  executeGame.drawFrame();
}, 10);
