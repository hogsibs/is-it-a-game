import domready from "domready";
import runDrawLoop from "./runDrawLoop";
import runUpdateLoop from "./runUpdateLoop";
import { buildPlayer } from "./player";
import "./style.css";
import { buildApp } from "./app";

domready(startGame);

function startGame()
{
    const app = buildApp({
        width: 256,
        height: 256
    });
    const gameState = initializeGameState();
    runUpdateLoop(gameState);
    runDrawLoop(app, gameState);
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
