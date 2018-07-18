export function Events() {
  this.topPressed = false;
  this.bottomPressed = false;
  this.rightPressed = false;
  this.leftPressed = false;

  this.setEvents();
}

Events.prototype.keyDownListener = function() {
  let that = this;
  document.onkeydown = function(e) {
    if (e.keyCode === 39) {
      that.rightPressed = true;
    } else if (e.keyCode === 37) {
      that.leftPressed = true;
    } else if (e.keyCode === 38) {
      that.topPressed = true;
    } else if (e.keyCode === 40) {
      that.bottomPressed = true;
    }
  };
}

Events.prototype.keyUpListner = function() {
  let that = this;
  document.onkeyup = function() {
    that.topPressed = false;
    that.bottomPressed = false;
    that.rightPressed = false;
    that.leftPressed = false;
  };
}


Events.prototype.setEvents = function() {
  this.keyDownListener();
  this.keyUpListner();
}
