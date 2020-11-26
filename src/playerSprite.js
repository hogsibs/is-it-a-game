import { Sprite, Rectangle } from "pixi.js";
import red from "./sprites/red.png";

export default function playerSprite(direction, timeSpentWalking, position) {
    return {
        draw(delta, app) {
            let player = app.stage.getChildByName('player');
            if(!player)
            {
                const playerTexture = app.loader.resources[red].texture;
                playerTexture.frame = new Rectangle(14, 0, 14, 16);
                player = new Sprite(playerTexture);
                player.name = 'player';
                app.stage.addChild(player);
            }
            let targetFrameY;
            switch (direction.direction) {
                case "down":
                    targetFrameY = 0;
                    break;
                case "left":
                    targetFrameY = 16;
                    break;
                case "right":
                    targetFrameY = 32;
                    break;
                case "up":
                    targetFrameY = 48;
                    break;
            }
        
            const walkingAnimation = [28, 14, 0, 14];
            let targetFrameX = walkingAnimation[
                Math.floor(
                    ((timeSpentWalking.timeSpentWalking + 950) % 1000) / 250
                )
            ];
            if(targetFrameY !== player.texture.frame.y ||
                targetFrameX !== player.texture.frame.x)
            {
                player.texture.frame.y = targetFrameY;
                player.texture.frame.x = targetFrameX;
                player.texture.update();
            }
            player.x = position.x;
            player.y = position.y;
        }
    }
}