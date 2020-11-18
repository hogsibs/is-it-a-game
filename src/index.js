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
            power: 600,
            friction: 5,
            velocity: {
                direction: 0,
                magnitude: 0
            },
            acceleration: {
                direction: 0,
                magnitude: 0
            }
        },
        world: {
            size: {
                width: 500,
                height: 500
            }
        }
    };
}
