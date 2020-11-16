import { Application, Graphics, RenderTexture, Sprite } from "pixi.js";

export default function runDrawLoop(gameState)
{
    const app = new Application({
        width: gameState.world.size.width,
        height: gameState.world.size.height,
        antialias: true
    });
    document.body.appendChild(app.view);
    app.ticker.add(() => draw(app.ticker.deltaMS, gameState, app));
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