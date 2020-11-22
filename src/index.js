import domready from "domready";
import runDrawLoop from "./runDrawLoop";
import runUpdateLoop from "./runUpdateLoop";
import { buildPlayer } from "./player";
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
        player: buildPlayer(),
        world: {
            size: {
                width: 256,
                height: 256
            }
        }
    };
}
