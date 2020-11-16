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
            speed: 100,
            direction: 0,
            targetDirection: 0,
            turnSpeed: Math.PI,
            radius: 10,
            timeLeftInCurrentDirection: 0
        },
        world: {
            size: {
                width: 200,
                height: 200
            }
        }
    };
}
