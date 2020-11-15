import "setImmediate";
import domready from "domready";

domready(startGameLoop);

function startGameLoop()
{
    const currentTime = performance.now();
    const gameState = initializeGameState();
    runUpdateLoop(currentTime, gameState);
    runDrawLoop(currentTime, gameState);
}

function initializeGameState()
{
    return {
        time: performance.now()
    };
}

function runDrawLoop(time, gameState)
{
    runLoop(
        (delta) => draw(delta, gameState),
        time,
        requestAnimationFrame
    );
}

function runUpdateLoop(time, gameState)
{
    runLoop(
        (delta) => update(delta, gameState),
        time,
        setImmediate
    );
}

function runLoop(callback, time, timer)
{
    const newTime = performance.now();
    const delta = newTime - time;
    callback(delta);
    timer(() => runLoop(callback, newTime, timer));
}

function update(delta, gameState)
{
    gameState.time = performance.now();
}

function draw(delta, gameState)
{
    document.body.innerHTML = `
        <div>Current Time: ${gameState.time}</div>
        <div>Time Passed: ${delta}</div>
        <div>Framerate: ${Math.round(1000 / delta)}</div>
    `;
}