import runLoop from "./runLoop";

export default function runUpdateLoop(time, gameState)
{
    runLoop(
        (delta) => update(delta, gameState),
        time,
        (callback) => setTimeout(callback)
    );
}

function update(delta, gameState)
{
    gameState.time = performance.now();
    console.log(delta);
    gameState.player.position.x += delta / 1000 * 100;
}