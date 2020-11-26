import controller from "./controller";
import { cartesianVector, setMagnitude } from "./vector";

const zeroThreshold = 1;
function isZero(value) {
    return Math.abs(value) < zeroThreshold;
}

export function buildPlayer() {
    const position = {
        x: 112,
        y: 160
    };
    const velocity = velocityComponent(cartesianVector(0, 0), position);
    const acceleration = accelerationComponent(cartesianVector(0, 0), velocity);
    const friction = frictionComponent(20, velocity);

    const direction = playerDirectionComponent(velocity);
    const timeSpentWalking = timeSpentWalkingComponent(20, velocity);

    return {
        timeSpentWalking: 0,
        position,
        direction,
        timeSpentWalking,
        components: [
            friction,
            playerControlledComponent(1200, controller, acceleration),
            acceleration,
            velocity,
            direction,
            timeSpentWalking
        ],
        update(delta) {
            this.components.forEach(component => component.update(delta));
        }
    }
}

function frictionComponent(magnitude, velocity) {
    return {
        magnitude,
        update(delta) {
            const { magnitude: velocityMagnitude } = velocity.vector.getEuclidean();
            setMagnitude(velocity.vector, velocityMagnitude - velocityMagnitude * this.magnitude * (delta / 1000));
        }
    }
}

function velocityComponent(vector, position) {
    console.log(vector.getCartesian());
    return {
        vector,
        update(delta) {
            const { x, y } = this.vector.getCartesian();
            position.x += x * (delta / 1000);
            position.y += y * (delta / 1000);
        }
    };
}

function accelerationComponent(vector, velocity) {
    return {
        vector,
        update(delta) {
            const { magnitude } = this.vector.getEuclidean();
            if (magnitude > 0) {
                const cartesianVelocity = velocity.vector.getCartesian();
                const { x, y } = this.vector.getCartesian();
                cartesianVelocity.x += x * (delta / 1000);
                cartesianVelocity.y += y * (delta / 1000);
                velocity.vector.setCartesian(cartesianVelocity);
            }
        }
    };
}

function playerControlledComponent(power, controller, acceleration) {
    return {
        power,
        update() {
            const vertical = controller.down - controller.up;
            const horizontal = controller.right - controller.left;
            if (!vertical && !horizontal) {
                acceleration.vector.setCartesian({ x: 0, y: 0 });
            }
            else {
                acceleration.vector.setCartesian({ x: horizontal, y: vertical });
                setMagnitude(acceleration.vector, this.power);
            }
        }
    };
}

function playerDirectionComponent(velocity) {
    return {
        vertical: 1,
        horizontal: 0,
        update() {
            const { x, y } = velocity.vector.getCartesian();
            if (isZero(x)) {
                this.horizontal = 0;
            }
            else {
                this.horizontal = Math.sign(x);
            }
            if (isZero(y)) {
                if (this.horizontal == 0) {
                    this.vertical = 1;
                }
                else {
                    this.vertical = 0;
                }
            }
            else {
                this.vertical = Math.sign(y);
            }
        }
    }
}

function timeSpentWalkingComponent(threshold, velocity) {
    return {
        threshold,
        timeSpentWalking: 0,
        update(delta) {
            const { magnitude } = velocity.vector.getEuclidean();
            if (magnitude <= this.threshold) {
                this.timeSpentWalking = 0;
            } else {
                this.timeSpentWalking = (this.timeSpentWalking + delta) % 1000;
            }
        }
    }
}