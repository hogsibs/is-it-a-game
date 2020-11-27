import { Sprite, settings, SCALE_MODES } from "pixi.js";
import red from "./sprites/red.png";
import bedroom from "./sprites/bedroom.png";

settings.SCALE_MODE = SCALE_MODES.NEAREST;

export default function runDrawLoop(app, gameState)
{
    app.loader
        .add(red)
        .add(bedroom)
        .load(() => {
            document.body.appendChild(app.view);
            app.ticker.add(() => draw(app.ticker.deltaMS, gameState, app));
        }
    );
}

function draw(delta, gameState, app)
{
    if(!app.stage.getChildByName('bedroom'))
    {
        const bedroomTexture = app.loader.resources[bedroom].texture;
        const bedroomSprite = new Sprite(bedroomTexture);
        bedroomSprite.name = 'bedroom';
        bedroomSprite.x = 64;
        bedroomSprite.y = 64;
        app.stage.addChild(bedroomSprite);
    }
    gameState.player.draw(delta, app);
}