export function cartesianVector(x, y) {
    const vector = new LazyVector();
    vector.setCartesian({ x, y });
    return vector;
}

export function euclideanVector(angle, magnitude) {
    const vector = new LazyVector();
    vector.setEuclidean({ angle, magnitude });
    return vector;
}

export function setMagnitude(vector, magnitude) {
    const euclidean = vector.getEuclidean();
    euclidean.magnitude = magnitude;
    vector.setEuclidean(euclidean);
}

class LazyVector {
    constructor() {
        this.x = new Lazy(() => this.calculateX());
        this.y = new Lazy(() => this.calculateY());
        this.angle = new Lazy(() => this.calculateAngle());
        this.magnitude = new Lazy(() => this.calculateMagnitude());
    }
    calculateX() {
        return Math.cos(this.angle.getValue()) * this.magnitude.getValue();
    }
    calculateY() {
        return Math.sin(this.angle.getValue()) * this.magnitude.getValue();
    }
    calculateAngle() {
        return Math.atan2(this.y.getValue(), this.x.getValue());
    }
    calculateMagnitude() {
        return Math.sqrt(Math.pow(this.x.getValue(), 2) + Math.pow(this.y.getValue(), 2));
    }
    setCartesian({ x, y }) {
        this.x.setValue(x);
        this.y.setValue(y);
        this.angle.reset();
        this.magnitude.reset();
    }
    getCartesian() {
        return {
            x: this.getX(),
            y: this.getY()
        };
    }
    getX() {
        return this.x.getValue();
    }
    getY() {
        return this.y.getValue();
    }
    setEuclidean({ angle, magnitude }) {
        this.angle.setValue(angle);
        this.magnitude.setValue(magnitude);
        this.x.reset();
        this.y.reset();
    }
    getEuclidean() {
        return {
            angle: this.angle.getValue(),
            magnitude: this.magnitude.getValue()
        };
    }
}

class Lazy {
    constructor(getter) {
        this.getter = getter;
        this.getValue = this.lazyGetValue;
    }
    getValue() {
        return this.value;
    }
    lazyGetValue() {
        this.value = this.getter();
        delete this.getValue;
        return this.value;
    }
    reset() {
        delete this.value;
        this.getValue = this.lazyGetValue;
    }
    setValue(value) {
        this.value = value;
        delete this.getValue;
    }
}
