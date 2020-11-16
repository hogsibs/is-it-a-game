export default function runLoop(callback, time, timer)
{
    const newTime = performance.now();
    const delta = newTime - time;
    callback(delta);
    timer(() => runLoop(callback, newTime, timer));
}