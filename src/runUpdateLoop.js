import runLoop from "./runLoop";
import controller from "./controller";

const velocityThreshold = 40;

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

    const velocityX = gameState.player.velocity.magnitude *
        Math.cos(gameState.player.velocity.direction);
    const velocityY = gameState.player.velocity.magnitude *
        Math.sin(gameState.player.velocity.direction);
    const accelerationX = gameState.player.acceleration.magnitude *
        Math.cos(gameState.player.acceleration.direction) *
        (delta / 1000);
    const accelerationY = gameState.player.acceleration.magnitude *
        Math.sin(gameState.player.acceleration.direction) *
        (delta / 1000);
    const frictionX = -1 * velocityX * gameState.player.friction * (delta / 1000);
    const frictionY = -1 * velocityY * gameState.player.friction * (delta / 1000);
    const newVelocityX = velocityX + accelerationX + frictionX;
    const newVelocityY = velocityY + accelerationY + frictionY;
    gameState.player.velocity.magnitude =
        Math.sqrt(
            Math.pow(newVelocityX, 2) +
            Math.pow(newVelocityY, 2));
    if(newVelocityX !== 0 || newVelocityY !== 0)
    {
        if(newVelocityX === 0)
        {
            if(newVelocityY > 0) {
                gameState.player.velocity.direction = Math.PI / 2;
            } else {
                gameState.player.velocity.direction = Math.PI / -2;
            }
        } else {
            gameState.player.velocity.direction = Math.atan2(newVelocityY, newVelocityX);
        }
    }

    if(gameState.player.velocity.magnitude <= velocityThreshold)
    {
        gameState.player.timeSpentWalking = 0;
    } else {
        gameState.player.timeSpentWalking = (gameState.player.timeSpentWalking + delta) % 1000;
    }
    
    gameState.player.position.x +=
        Math.cos(gameState.player.velocity.direction) *
        (delta / 1000) *
        gameState.player.velocity.magnitude;
    gameState.player.position.y +=
        Math.sin(gameState.player.velocity.direction) *
        (delta / 1000) *
        gameState.player.velocity.magnitude;
    
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