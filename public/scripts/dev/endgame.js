function endgame(player, enemy) {

    var enemyRadius = enemy.radius + enemy.collisions * 1.5,
        playerRadius = player.radius,
        middleEvalExpr = Math.pow(player.x - enemy.x, 2) + Math.pow(player.y - enemy.y, 2),
        lowerEval = Math.pow(playerRadius - enemyRadius, 2) <= middleEvalExpr,
        higherEval = middleEvalExpr <= Math.pow(playerRadius + enemyRadius, 2)

    if (lowerEval && higherEval) {
        setTimeout(() => {
            clearInterval(window.inter)
        }, 1)
    }

}

export default endgame
