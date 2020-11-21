import domready from "domready";
import runDrawLoop from "./runDrawLoop";
import runUpdateLoop from "./runUpdateLoop";
import "./style.css";

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
                x: 112,
                y: 160
            },
            power: 800,
            friction: 10,
            velocity: {
                direction: Math.PI / 2,
                magnitude: 0
            },
            acceleration: {
                direction: 0,
                magnitude: 0
            },
            timeSpentWalking: 0
        },
        world: {
            size: {
                width: 256,
                height: 256
            }
        }
    };
}
