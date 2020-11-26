export default function vector() {
    let x, y, angle, magnitude;

    const vector = {
        setCartesian(newX, newY) {
            x = newX;
            y = newY;
            this.getCartesian = getCartesian;
            this.getEuclidean = lazyGetEuclidean;
        },
        setEuclidian(newAngle, newMagnitude) {
            angle = newAngle;
            magnitude = newMagnitude;
            this.getEuclidean = getEuclidean;
            this.getCartesian = lazyGetCartesian;
        }
    };

    function getCartesian() {
        return {x, y};
    }
    function lazyGetCartesian() {
        x = magnitude * Math.cos(angle);
        y = magnitude * Math.sin(angle);
        vector.getCartesian = getCartesian;
        return getCartesian();
    }

    function getEuclidean() {
        return {angle, magnitude};
    }
    function lazyGetEuclidean() {
        angle = Math.atan2(y, x);
        magnitude = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        vector.getEuclidean = getEuclidean;
        return getEuclidean();
    }

    return vector;
}