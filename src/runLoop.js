export default function runLoop(callback, timer)
{
    start(performance.now());
    function start(time) {
        timer(() => doWork(time));
    }
    function doWork(time) {
        const newTime = performance.now();
        const delta = newTime - time;
        callback(delta);
        start(newTime);
    }
}