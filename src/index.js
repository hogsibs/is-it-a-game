import "setImmediate";
import domready from "domready";
import runDrawLoop from "./runDrawLoop";
import runUpdateLoop from "./runUpdateLoop";

domready(startGame);

function startGame()
{
    const gameState = initializeGameState();
    runUpdateLoop(gameState);
    runDrawLoop(gameState);
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
            speed: 50,
            direction: 0,
            targetDirection: 0,
            turnSpeed: Math.PI / 4,
            radius: 10,
            timeLeftInCurrentDirection: 0
        },
        world: {
            size: {
                width: 500,
                height: 500
            }
        }
    };
}
