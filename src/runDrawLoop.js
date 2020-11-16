import { Application, Circle, Graphics, RenderTexture, Sprite, Texture } from "pixi.js";
import runLoop from "./runLoop";

export default function runDrawLoop(time, gameState)
{
    const app = new Application({
        width: 500,
        height: 500,
        antialias: true
    });
    document.body.appendChild(app.view);

    runLoop(
        (delta) => draw(delta, gameState, app),
        time,
        requestAnimationFrame
    );
}

function draw(delta, gameState, app)
{
    let player = app.stage.getChildByName('player');
    if(!player)
    {
        const playerShape = new Graphics();
        playerShape.beginFill(0xff0000);
        playerShape.lineStyle(0);
        playerShape.drawCircle(10, 10, 10);
        playerShape.endFill();
        const texture = RenderTexture.create({
            width: playerShape.width,
            height: playerShape.height
        });
        app.renderer.render(playerShape, texture);

        player = new Sprite(texture);
        
        player.name = 'player';
        app.stage.addChild(player);
    }
    player.x = gameState.player.position.x - (player.width / 2);
    player.y = gameState.player.position.y - (player.height / 2);
}