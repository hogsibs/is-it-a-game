import "setImmediate";
import domready from "domready";
import runDrawLoop from "./runDrawLoop";
import runUpdateLoop from "./runUpdateLoop";

domready(startGame);

function startGame()
{
    const currentTime = performance.now();
    const gameState = initializeGameState();
    runUpdateLoop(currentTime, gameState);
    runDrawLoop(currentTime, gameState);
}

function initializeGameState()
{
    return {
        time: performance.now(),
        player: {
            position: {
                x: 100,
                y: 100
            },
            radius: 10
        },
        world: {
            size: {
                width: 200,
                height: 200
            }
        }
    };
}
