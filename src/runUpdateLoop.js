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
    
    if(controller.up && !controller.down) {
        if(controller.right && !controller.left) {
            gameState.player.acceleration.direction = Math.PI / -4;
        } else if (controller.left && !controller.right) {
            gameState.player.acceleration.direction = 3 * Math.PI / -4;
        } else {
            gameState.player.acceleration.direction = Math.PI / -2;
        }
        gameState.player.acceleration.magnitude = gameState.player.power;
    } else if(!controller.up && controller.down) {
        if(controller.right && !controller.left) {
            gameState.player.acceleration.direction = Math.PI / 4;
        } else if (controller.left && !controller.right) {
            gameState.player.acceleration.direction = 3 * Math.PI / 4;
        } else {
            gameState.player.acceleration.direction = Math.PI / 2;
        }
        gameState.player.acceleration.magnitude = gameState.player.power;
    } else if(controller.right && !controller.left) {
        gameState.player.acceleration.direction = 0;
        gameState.player.acceleration.magnitude = gameState.player.power;
    } else if(!controller.right && controller.left) {
        gameState.player.acceleration.direction = Math.PI;
        gameState.player.acceleration.magnitude = gameState.player.power;
    } else {
        gameState.player.acceleration.magnitude = 0;
    }
}

