const controller = {
    up: false,
    right: false,
    down: false,
    left: false
};

export default controller;

bindArrowKeys("keydown");
bindArrowKeys("keyup");
addEventListener(
    "blur",
    () => {
        controller.up = false;
        controller.right = false;
        controller.down = false;
        controller.left = false;
    });

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