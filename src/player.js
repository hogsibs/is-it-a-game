import controller from "./controller";
import { cartesianVector, setMagnitude } from "./vector";

export function buildPlayer() {
    const position = {
        x: 112,
        y: 160
    };
    const velocity = velocityComponent(cartesianVector(0, 0), position);
    const acceleration = accelerationComponent(cartesianVector(0, 0), velocity);
    const friction = frictionComponent(20, velocity);

    const timeSpentWalking = timeSpentWalkingComponent(20, velocity);
    const direction = playerDirectionComponent(velocity);

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
            timeSpentWalking,
            direction
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
        direction: "down",
        update() {
            const { magnitude, angle } = velocity.vector.getEuclidean();
            if (magnitude > 1) {
                if (angle > Math.PI / -4 && angle <= Math.PI / 4) {
                    this.direction = "right";
                } else if (angle > Math.PI / 4 && angle <= Math.PI * 3 / 4) {
                    this.direction = "down";
                } else if (angle > Math.PI * 3 / 4 || angle <= Math.PI * -3 / 4) {
                    this.direction = "left";
                } else {
                    this.direction = "up";
                }
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