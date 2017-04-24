import renderToCanvas from './renderToCanvas.js'

function enemyspawn(renderingObj) {
    console.log(renderingObj)
    
    setInterval(e => {
        renderToCanvas(false, true)
    }, 10)
}

export default enemyspawn