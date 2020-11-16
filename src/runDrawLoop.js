import runLoop from "./runLoop";
import { fabric } from "fabric";
const { Canvas, Circle, Text } = fabric;

export default function runDrawLoop(time, gameState)
{
    const canvasElement = document.createElement("canvas");
    document.body.appendChild(canvasElement);

    const canvas = new Canvas(
        canvasElement,
        {
            width: 500,
            height: 500,
            interactive: false,
            selection: false
        });
    runLoop(
        (delta) => draw(delta, gameState, canvas),
        time,
        requestAnimationFrame
    );
}

function draw(delta, gameState, canvas)
{
    let player;
    let info;
    if(canvas.size() > 0) {
        player = canvas.item(0);
        player.set({
            left: gameState.player.position.x,
            top: gameState.player.position.y
        });

        info = canvas.item(1);
        info.text = `FPS: ${Math.round(1000 / delta)}`;
    } else {
        player = new Circle({
            left: gameState.player.position.x,
            top: gameState.player.position.y,
            radius: gameState.player.radius,
            fill: "red"
        });
        canvas.add(player);

        info = new Text(
            `FPS: ${Math.round(1000 / delta)}`,
            {
                left: 2,
                top: 2
            }
        );
        canvas.add(info);
    }
    canvas.renderAndReset();
}