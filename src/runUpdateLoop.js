import runLoop from "./runLoop";

export default function runUpdateLoop(gameState)
{
    runLoop(
        (delta) => update(delta, gameState),
        callback => setTimeout(callback, Math.round(1000 / 200))
    );
}

function update(delta, gameState)
{
    gameState.time = performance.now();

    gameState.player.update(delta);
    gameState.world.solids.forEach(solid => {
        const overlap = boundingBoxOverlap(gameState.player.boundingBox, solid.boundingBox);
        if (overlap) {
            gameState.player.position.x += overlap.x;
            gameState.player.position.y += overlap.y;
        }
    });
    
    if(gameState.player.position.x < 64) {
        gameState.player.position.x = 64;
    } else if(gameState.player.position.x > 178) {
        gameState.player.position.x = 178;
    }
    if(gameState.player.position.y < 64) {
        gameState.player.position.y = 64;
    } else if(gameState.player.position.y > 176) {
        gameState.player.position.y = 176;
    }
}

function boundingBoxOverlap(a, b) {
    const right = b.max.x - a.min.x;
    if (right <= 0) {
        return false;
    }
    const left = a.max.x - b.min.x;
    if (left <= 0) {
        return false;
    }
    const top = b.max.y - a.min.y;
    if (top <= 0) {
        return false;
    }
    const bottom = a.max.y - b.min.y;
    if (bottom <= 0) {
        return false;
    }
    const overlap = {
        x: right > left ? -left : right,
        y: top > bottom ? -bottom : top
    };
    const xOverlap = Math.abs(overlap.x);
    const yOverlap = Math.abs(overlap.y);
    if (yOverlap < xOverlap) {
        overlap.x = 0;
    }
    else if (xOverlap < yOverlap) {
        overlap.y = 0;
    }
    return overlap;
}
