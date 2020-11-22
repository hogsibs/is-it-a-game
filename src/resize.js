import { setScale } from "./controller";

const resolution = {
    width: 256,
    height: 256
}

export default function resize(app) {
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
    
    setScale(resolution.width / newGameWidth);
    app.renderer.resize(newGameWidth, newGameHeight);
    app.stage.scale.set(newGameWidth / resolution.width, newGameHeight / resolution.height);
}