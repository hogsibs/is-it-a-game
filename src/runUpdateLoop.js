import runLoop from "./runLoop";

export default function runUpdateLoop(time, gameState)
{
    runLoop(
        (delta) => update(delta, gameState),
        time,
        //setImmediate
        callback => setTimeout(callback, Math.round(1000 / 120))
    );
}

function update(delta, gameState)
{
    gameState.time = performance.now();

    let directionDelta = delta;
    if(gameState.player.direction === gameState.player.targetDirection)
    {
        if(gameState.player.timeLeftInCurrentDirection > delta)
        {
            gameState.player.timeLeftInCurrentDirection -= delta;
            directionDelta = 0;
        } else {
            gameState.player.targetDirection =
                gameState.player.direction +
                (   (Math.random() > 0.5 ? 1 : -1) *
                    (Math.random() * Math.PI / 2 + Math.PI / 2));
            directionDelta = delta - gameState.player.timeLeftInCurrentDirection;
        }
    }

    if(gameState.player.direction !== gameState.player.targetDirection)
    {
        const diff = gameState.player.targetDirection - gameState.player.direction;
        if(Math.abs(diff) < (directionDelta / 1000) * gameState.player.turnSpeed)
        {
            gameState.player.direction = gameState.player.targetDirection;
            gameState.player.timeLeftInCurrentDirection = Math.round(Math.random() * 2000) + 1000;
        } else {
            const radialDirection = diff / Math.abs(diff);
            gameState.player.direction +=
                radialDirection *
                gameState.player.turnSpeed *
                (directionDelta / 1000);
        }
    }
    
    gameState.player.position.x +=
        Math.cos(gameState.player.direction) *
        (delta / 1000) *
        gameState.player.speed;
    gameState.player.position.y +=
        Math.sin(gameState.player.direction) *
        (delta / 1000) *
        gameState.player.speed;
}