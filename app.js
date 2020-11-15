async function runGameLoop()
{
    const minimumFrameInterval = 1;
    let time = (new Date()).getTime();
    while(true)
    {
        let newTime = new Date().getTime();
        let timePassed = newTime - time;
        if(timePassed >= minimumFrameInterval)
        {
            await draw(newTime, timePassed);
            time = newTime;
        }
        await sleep();
    }
}

async function draw(time, timePassed)
{
    document.body.innerHTML = `
        <div>Current Time: ${time}</div>
        <div>Time Passed: ${timePassed}</div>
        <div>Framerate: ${Math.round(1000 / timePassed)}</div>
    `;
}

function sleep()
{
    return new Promise((resolve) => setImmediate(resolve));
}