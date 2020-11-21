import runLoop from "./runLoop";
import controller from "./controller";

const velocityThreshold = 20;

export default function runUpdateLoop(gameState)
{
    runLoop(
        (delta) => update(delta, gameState),
        callback => setTimeout(callback, Math.round(1000 / 200))
    );
}

function update(delta, gameState)
{
    gameState.time = performance.now();

    gameState.player.update(delta);

    if(gameState.player.velocity.magnitude <= velocityThreshold)
    {
        gameState.player.timeSpentWalking = 0;
    } else {
        gameState.player.timeSpentWalking = (gameState.player.timeSpentWalking + delta) % 1000;
    }
    
    if(gameState.player.position.x < 64) {
        gameState.player.position.x = 64;
    } else if(gameState.player.position.x > 178) {
        gameState.player.position.x = 178;
    }
    if(gameState.player.position.y < 64) {
        gameState.player.position.y = 64;
    } else if(gameState.player.position.y > 176) {
        gameState.player.position.y = 176;
    }
}

