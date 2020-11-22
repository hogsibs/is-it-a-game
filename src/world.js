export function buildWorld()
{
    return {
        size: {
            width: 256,
            height: 256
        },
        bounds: {
            left: 64,
            right: 192,
            top: 64,
            bottom: 192
        },
        solids: [
            {
                name: 'bed',
                x: 64,
                y: 160,
                width: 17,
                height: 32
            }
        ]
    };
}