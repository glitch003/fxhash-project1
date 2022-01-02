import p5 from "p5";
import webgazer from "webgazer/dist/webgazer.commonjs2.js";
import { getRandomInt } from "./utils.js";

let gazeX, gazeY;

webgazer
  .setGazeListener(function (data, elapsedTime) {
    console.log(data);
    gazeX = data?.x;
    gazeY = data?.y;
  })
  .begin();

// these are the variables you can use as inputs to your algorithms
// console.log(fxhash); // the 64 chars hex number fed to your algorithm
// console.log(fxrand()); // deterministic PRNG function, use it instead of Math.random()

// note about the fxrand() function
// when the "fxhash" is always the same, it will generate the same sequence of
// pseudo random numbers, always

//----------------------
// defining features
//----------------------
// You can define some token features by populating the $fxhashFeatures property
// of the window object.
// More about it in the guide, section features:
// [https://fxhash.xyz/articles/guide-mint-generative-token#features]
//
// window.$fxhashFeatures = {
//   "Background": "Black",
//   "Number of lines": 10,
//   "Inverted": true
// }

// this code writes the values to the DOM as an example
// const container = document.createElement("div");
// container.innerText = `
//   random hash: ${fxhash}\n
//   some pseudo random values: [ ${fxrand()}, ${fxrand()}, ${fxrand()}, ${fxrand()}, ${fxrand()},... ]\n
// `;
// document.body.prepend(container);

const sketch = (s) => {
  let t = 0; // time variable

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
    s.noStroke();
    s.fill(40, 200, 40);
  };

  s.draw = () => {
    s.background(10, 10); // translucent background (creates trails)

    // make a x and y grid of ellipses
    for (let x = 0; x <= s.width; x = x + 30) {
      for (let y = 0; y <= s.height; y = y + 30) {
        // starting point of each circle depends on mouse position
        // const xAngle = s.map(s.mouseX, 0, s.width, -4 * s.PI, 4 * s.PI, true);
        // const yAngle = s.map(s.mouseY, 0, s.height, -4 * s.PI, 4 * s.PI, true);
        const xAngle = s.map(gazeX, 0, s.width, -4 * s.PI, 4 * s.PI, true);
        const yAngle = s.map(gazeY, 0, s.height, -4 * s.PI, 4 * s.PI, true);
        // and also varies based on the particle's location
        const angle = xAngle * (x / s.width) + yAngle * (y / s.height);

        // each particle moves in a circle
        const myX = x + 20 * s.cos(2 * s.PI * t + angle);
        const myY = y + 20 * s.sin(2 * s.PI * t + angle);

        s.ellipse(myX, myY, 10); // draw particle
      }
    }

    t = t + 0.01; // update time
  };
};

const sketchInstance = new p5(sketch);
