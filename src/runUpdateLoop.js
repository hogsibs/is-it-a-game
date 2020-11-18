import runLoop from "./runLoop";

export default function runUpdateLoop(gameState)
{
    runLoop(
        (delta) => update(delta, gameState),
        //setImmediate
        callback => setTimeout(callback, Math.round(1000 / 120))
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
    
    gameState.player.position.x +=
        Math.cos(gameState.player.velocity.direction) *
        (delta / 1000) *
        gameState.player.velocity.magnitude;
    gameState.player.position.y +=
        Math.sin(gameState.player.velocity.direction) *
        (delta / 1000) *
        gameState.player.velocity.magnitude;
    
    gameState.player.timeLeftInCurrentDirection -= delta;
    if(gameState.player.timeLeftInCurrentDirection <= 0)
    {
        gameState.player.timeLeftInCurrentDirection = Math.random() * 2000 + 1000;
        if(Math.random() < 0.2)
        {
            gameState.player.acceleration.magnitude = 0;
        } else {
            gameState.player.acceleration.magnitude = gameState.player.power;
            gameState.player.acceleration.direction = Math.random() * 2 * Math.PI;
        }
    }
}