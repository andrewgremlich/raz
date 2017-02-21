function checkForEnemy(array) {

    var returner = false

    for (var i = 0; i < array.length; i++) {
        for (var j in array[i]) {
            if (array[i][j].name !== 'enemy') {
                returner = true
            }
        }
    }

    return returner
}

module.exports = checkForEnemy
