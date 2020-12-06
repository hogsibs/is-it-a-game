import boundingBox from "./collision/boundingBox";

export function buildWorld() {
    return {
        size: {
            width: 256,
            height: 256
        },
        bounds: {
            left: 64,
            right: 192,
            top: 80,
            bottom: 192
        },
        solids: [
            {
                name: 'bed',
                boundingBox: boundingBox(16, 32, { x: 64, y: 160 })
            },
            {
                name: 'desk',
                boundingBox: boundingBox(48, 16, { x: 64, y: 80 })
            },
            {
                name: 'plant',
                boundingBox: boundingBox(16, 32, { x: 160, y: 160 })
            },
            {
                name: 'console',
                boundingBox: boundingBox(16, 32, { x: 112, y: 128 })
            }
        ]
    };
}
