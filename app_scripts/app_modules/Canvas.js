/**************************
CANVAS PROTOTYPE CONSTRUCTOR
 ***************************/

class Canvas {
    constructor() {
        this.canvasElement = document.getElementById('myCanvas')
        this.ctx = this.canvasElement.getContext('2d')
        this.width = this.canvasElement.width
        this.height = this.canvasElement.height
    }

    clearFrame() {
        this.ctx.clearRect(0, 0, this.width, this.height)
    }
}

export default Canvas