import { Application } from "pixi.js";

export function buildApp(size)
{
    const app = new Application({
        width: size.width,
        height: size.height,
        antialias: true,
    });
    resize(app);
    window.addEventListener("resize", () => resize(app));
    return app;
}
const resolution = {
    width: 256,
    height: 256
}

function resize(app) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    let newGameWidth;
    let newGameHeight;
  
    if (viewportHeight / viewportWidth < resolution.height / resolution.width) {
        newGameHeight = viewportHeight;
        newGameWidth = (newGameHeight * resolution.width) / resolution.height;
    } else {
        newGameWidth = viewportWidth;
        newGameHeight = (newGameWidth * resolution.height) / resolution.width;
    }
    
    app.renderer.resize(newGameWidth, newGameHeight);
    app.stage.scale.set(newGameWidth / resolution.width, newGameHeight / resolution.height);
}