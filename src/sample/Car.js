let brakePedal = false;
let acceleratorPedal = false;
let speed = 0;
const MAX_SPEED = 200;

export default class Car {
    constructor() {
        brakePedal = false;
        acceleratorPedal = false;
    }
    drive() {
        brakePedal = false;
        acceleratorPedal = true;
    }
    stop() {
        acceleratorPedal = false;
        brakePedal = true;
    }
    notStep() {
        acceleratorPedal = false;
        brakePedal = false;
    }
    monitorStatus() {
        if (!brakePedal && !acceleratorPedal) {
            speed -= 0.2;
        }

        if (brakePedal && speed > 0) {
            speed -= 3;
        }

        if (acceleratorPedal && speed < MAX_SPEED) {
            speed++;
        }

        if (speed < 0) {
            speed = 0;
        }

        speed = Math.floor(speed * 10) / 10;
        console.log(speed)
        return {
            "speed": speed,
            "brake": brakePedal,
            "accelerator": acceleratorPedal
        };
    }
}