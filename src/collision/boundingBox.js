export default function boundingBox(width, height, position) {
    const instance = new AxisAlignedBoundingBox(width, height, position);
    instance.update();
    return instance;
}

export class AxisAlignedBoundingBox {
    constructor(width, height, position) {
        this.width = width;
        this.height = height;

        this.position = position;
    }
    update() {
        this.min = {
            x: this.position.x,
            y: this.position.y
        };
        this.max = {
            x: this.position.x + this.width,
            y: this.position.y + this.height
        };
    }
}