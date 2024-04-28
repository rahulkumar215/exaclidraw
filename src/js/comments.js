// let canvasOffset = canvas.getBoundingClientRect();
// let offsetX = canvasOffset.left;
// let offsetY = canvasOffset.top;
// let startX, startY;
// prevEvent,
// currentEvent,
// speedInterval = null;
// currentEvent = e;

// if (speedInterval === null) {
//   speedInterval = setInterval(calculateSpeed, 100);
// }
// function calculateSpeed() {
//   if (prevEvent && currentEvent) {
//     let movement = Math.sqrt(
//       Math.pow(Math.abs(currentEvent.screenX - prevEvent.screenX), 2) +
//         Math.pow(Math.abs(currentEvent.screenY - prevEvent.screenY), 2)
//     );

//     var speed = Math.round(10 * movement); //current speed

//     console.log(speed);

//     if (speed <= 100) {
//       brushWidth = brushWidth * 2;
//     } else {
//       brushWidth = 5;
//     }
//   }
//   prevEvent = currentEvent;
//   prevSpeed = speed;
// }
// clearInterval(speedInterval);
// speedInterval = null;
