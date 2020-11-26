export function cartesianVector(x, y) {
    const vector = new LazyVector();
    vector.setCartesian(x, y);
    return vector;
}

export function euclideanVector(angle, magnitude) {
    const vector = new LazyVector();
    vector.setEuclidean(angle, magnitude);
    return vector;
}

export function setMagnitude(vector, magnitude) {
    const euclidean = vector.getEuclidean();
    euclidean.magnitude = magnitude;
    vector.setEuclidean(euclidean);
}

class LazyVector {
    setCartesian({ x, y }) {
        this.cartesian = { x, y };
        delete this.getCartesian;
        this.getEuclidean = () => this.lazyGetEuclidean();
    }
    getCartesian() {
        return { ...this.cartesian };
    }
    lazyGetCartesian() {
        this.cartesian = asCartesian(this.euclidean);
        delete this.getCartesian;
        return this.getCartesian();
    }
    setEuclidean({ angle, magnitude }) {
        this.euclidean = { angle, magnitude };
        delete this.getEuclidean;
        this.getCartesian = () => this.lazyGetCartesian();
    }
    getEuclidean() {
        return { ...this.euclidean };
    }
    lazyGetEuclidean() {
        this.euclidean = asEuclidean(this.cartesian);
        delete this.getEuclidean;
        return this.getEuclidean();
    }
}

function asCartesian({ angle, magnitude }) {
    return {
        x: magnitude * Math.cos(angle),
        y: magnitude * Math.sin(angle)
    };
}

function asEuclidean({ x, y }) {
    return {
        angle: Math.atan2(y, x),
        magnitude: Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
    };
}