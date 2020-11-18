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
                x: 250,
                y: 250
            },
            power: 200,
            friction: 3,
            velocity: {
                direction: 0,
                magnitude: 0
            },
            acceleration: {
                direction: 0,
                magnitude: 0
            },
            timeLeftInCurrentDirection: 1000
        },
        world: {
            size: {
                width: 200,
                height: 200
            }
        }
    };
}
