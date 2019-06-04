import Car from './car.js';

const car = new Car();

document.getElementById("brakeButton").addEventListener("mousedown", car.stop);
document.getElementById("axcelButton").addEventListener("mousedown", car.drive);
document.getElementById("brakeButton").addEventListener("mouseup", car.notStep);
document.getElementById("axcelButton").addEventListener("mouseup", car.notStep);

setInterval(displayStatus, 100);

function displayStatus() {
    const status = car.monitorStatus();

    document.getElementById("monitor").innerHTML = `スピード：${status.speed}　アクセル：${status.accelerator}　ブレーキ：${status.brake}`;
}