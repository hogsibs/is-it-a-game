const controller = {
    up: false,
    right: false,
    down: false,
    left: false,
    mouse: {
        down: false,
        x: 0,
        y: 0
    }
};

export default controller;

const appPosition = {
    x: 0,
    y: 0
};
export function setPosition(x, y)
{
    appPosition.x = x;
    appPosition.y = y;
}

let scale = 1;
export function setScale(newScale)
{
    scale = newScale;
}

registerPreciseMovement(
    "touchstart",
    "touchend",
    "touchmove",
    event => ({ x: event.touches[0].clientX, y: event.touches[0].clientY }));
registerPreciseMovement(
    "mousedown",
    "mouseup",
    "mousemove",
    event => ({ x: event.clientX, y: event.clientY }));

function registerPreciseMovement(downEvent, upEvent, moveEvent, eventPositionResolver)
{
    window.addEventListener(downEvent, () => {
        controller.mouse.down = true;
    });
    
    window.addEventListener(upEvent, () => {
        controller.mouse.down = false;
    });
    
    window.addEventListener(moveEvent, event => {
        const position = eventPositionResolver(event);
        controller.mouse.x = (position.x - appPosition.x) * scale;
        controller.mouse.y = (position.y - appPosition.y) * scale;
    });

}

bindArrowKeys("keydown");
bindArrowKeys("keyup");

function bindArrowKeys(eventName)
{
    const isDown = eventName === "keydown";
    addEventListener(
        eventName,
        event => {
            switch(event.code)
            {
                case "ArrowUp":
                    controller.up = isDown;
                    break;
                case "ArrowRight":
                    controller.right = isDown;
                    break;
                case "ArrowDown":
                    controller.down = isDown;
                    break;
                case "ArrowLeft":
                    controller.left = isDown;
                    break;
            }
        }
    );
}