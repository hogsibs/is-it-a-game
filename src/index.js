import domready from "domready";
import runDrawLoop from "./runDrawLoop";
import runUpdateLoop from "./runUpdateLoop";
import { buildPlayer } from "./player";
import "./style.css";
import { buildWorld } from "./world";

domready(startGame);

function startGame()
{
    const gameState = initializeGameState();
    runUpdateLoop(gameState);
    runDrawLoop(gameState);
}

function initializeGameState()
{
    const world = buildWorld();
    const player = buildPlayer(world);
    
    return {
        time: performance.now(),
        player,
        world
    };
}
