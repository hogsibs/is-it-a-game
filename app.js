function startGameLoop()
{
    const currentTime = performance.now();
    const gameState = initializeGameState();
    runUpdateLoop(gameState);
    runDrawLoop(currentTime, gameState);
}

function initializeGameState()
{
    return {
        time: performance.now(),
    };
}

function runUpdateLoop(gameState)
{
    update(gameState);
    setImmediate(() => runUpdateLoop(gameState));
}

function update(gameState)
{
    gameState.time = performance.now();
}

function runDrawLoop(time, gameState)
{
    const newTime = performance.now();
    const delta = newTime - time;
    draw(delta, gameState);
    window.requestAnimationFrame(() => runDrawLoop(newTime, gameState));
}

function draw(delta, gameState)
{
    document.body.innerHTML = `
        <div>Current Time: ${gameState.time}</div>
        <div>Time Passed: ${delta}</div>
        <div>Framerate: ${Math.round(1000 / delta)}</div>
    `;
}