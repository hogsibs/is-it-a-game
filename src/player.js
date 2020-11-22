import controller from "./controller";

export function buildPlayer(world) {
    const position = {
        x: 112,
        y: 160
    };
    const size = {
        width: 14,
        height: 16
    };
    const velocity = velocityComponent(Math.PI / -2, 0, position, size, world);
    const acceleration = accelerationComponent(0, 0, velocity);
    const friction = frictionComponent(20, velocity);

    return {
        timeSpentWalking: 0,
        size,
        position,
        velocity,
        components: [
            friction,
            playerControlledComponent(1200, controller, acceleration),
            acceleration,
            velocity
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
            velocity.magnitude -= velocity.magnitude * this.magnitude * (delta / 1000);
        }
    }
}

function velocityComponent(direction, magnitude, position, size, world) {
    return {
        direction,
        magnitude,
        update(delta) {
            const newX = position.x + Math.cos(this.direction)* this.magnitude * (delta / 1000);
            const newY = position.y + Math.sin(this.direction) * this.magnitude * (delta / 1000);

            if(newX < world.bounds.left)
            {
                position.x = world.bounds.left;
            } else if(newX + size.width > world.bounds.right) {
                position.x = world.bounds.right - size.width;
            } else if(newX < position.x) {
                position.x = Math.max(
                    newX,
                    ...world.solids.map(
                        solid => {
                            if(position.x >= solid.x + solid.width &&
                                newX < solid.x + solid.width &&
                                newY + size.height > solid.y &&
                                newY < solid.y + solid.height) {
                                return solid.x + solid.width;
                            } else {
                                return null;
                            }
                        }
                    )
                );
            } else if(newX > position.x) {
                position.x = Math.min(
                    newX,
                    ...world.solids.map(
                        solid => {
                            if(position.x + size.width <= solid.x &&
                                newX + size.width > solid.x &&
                                newY + size.height > solid.y &&
                                newY < solid.y + solid.height) {
                                return solid.x - size.width;
                            } else {
                                return null;
                            }
                        }
                    ).filter(x => x !== null)
                );
            }

            if(newY < world.bounds.top)
            {
                position.y = world.bounds.top;
            } else if(newY + size.height > world.bounds.bottom) {
                position.y = world.bounds.bottom - size.height;
            } else if(newY < position.y) {
                position.y = Math.max(
                    newY,
                    ...world.solids.map(
                        solid => {
                            if(position.y >= solid.y + solid.height &&
                                newY < solid.y + solid.height &&
                                position.x + size.width > solid.x &&
                                position.x < solid.x + solid.width) {
                                return solid.y + solid.height;
                            } else {
                                return null;
                            }
                        }
                    )
                );
            } else if(newY > position.y) {
                position.y = Math.min(
                    newY,
                    ...world.solids.map(
                        solid => {
                            if(position.y + size.height <= solid.y &&
                                newY + size.height > solid.y &&
                                position.x + size.width > solid.x &&
                                position.x < solid.x + solid.width) {
                                return solid.y - size.height;
                            } else {
                                return null;
                            }
                        }
                    ).filter(y => y !== null)
                );
            }
        }
    };
}

function accelerationComponent(direction, magnitude, velocity) {
    return {
        direction,
        magnitude,
        update(delta) {
            if (this.magnitude > 0) {
                const velocityX = velocity.magnitude * Math.cos(velocity.direction);
                const velocityY = velocity.magnitude * Math.sin(velocity.direction);
                const accelerationX = this.magnitude * Math.cos(this.direction) * (delta / 1000);
                const accelerationY = this.magnitude * Math.sin(this.direction) * (delta / 1000);
                const newVelocityX = velocityX + accelerationX;
                const newVelocityY = velocityY + accelerationY;
                velocity.magnitude = Math.sqrt(Math.pow(newVelocityX, 2) + Math.pow(newVelocityY, 2));
                if(newVelocityX !== 0 || newVelocityY !== 0)
                {
                    if(newVelocityX === 0)
                    {
                        if(newVelocityY > 0) {
                            velocity.direction = Math.PI / 2;
                        } else {
                            velocity.direction = Math.PI / -2;
                        }
                    } else {
                        velocity.direction = Math.atan2(newVelocityY, newVelocityX);
                    }
                }
            }
        }
    };
}

function playerControlledComponent(power, controller, acceleration) {
    return {
        power,
        update() {
            if(controller.up && !controller.down) {
                if(controller.right && !controller.left) {
                    acceleration.direction = Math.PI / -4;
                } else if (controller.left && !controller.right) {
                    acceleration.direction = 3 * Math.PI / -4;
                } else {
                    acceleration.direction = Math.PI / -2;
                }
                acceleration.magnitude = this.power;
            } else if(!controller.up && controller.down) {
                if(controller.right && !controller.left) {
                    acceleration.direction = Math.PI / 4;
                } else if (controller.left && !controller.right) {
                    acceleration.direction = 3 * Math.PI / 4;
                } else {
                    acceleration.direction = Math.PI / 2;
                }
                acceleration.magnitude = this.power;
            } else if(controller.right && !controller.left) {
                acceleration.direction = 0;
                acceleration.magnitude = this.power;
            } else if(!controller.right && controller.left) {
                acceleration.direction = Math.PI;
                acceleration.magnitude = this.power;
            } else {
                acceleration.magnitude = 0;
            }
        }
    };
}