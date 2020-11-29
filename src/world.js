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
            top: 80,
            bottom: 192
        },
        solids: [
            {
                name: 'bed',
                x: 64,
                y: 160,
                width: 16,
                height: 32
            },
            {
                name: 'desk',
                x: 64,
                y: 80,
                width: 48,
                height: 16
            },
            {
                name: 'plant',
                x: 160,
                y: 160,
                width: 16,
                height: 32
            },
            {
                name: 'console',
                x: 112,
                y: 128,
                width: 16,
                height: 32
            }
        ]
    };
}