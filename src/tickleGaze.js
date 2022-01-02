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
console.log(fxhash); // the 64 chars hex number fed to your algorithm
console.log(fxrand()); // deterministic PRNG function, use it instead of Math.random()

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

let message = "look at me",
  font,
  bounds, // holds x, y, w, h of the text's bounding box
  fontsize = 60,
  x,
  y; // x and y coordinates of the text

const sketch = (s) => {
  s.preload = () => {
    font = s.loadFont("Pacifico-Regular.ttf");
  };
  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);

    // set up the font
    s.textFont(font);
    s.textSize(fontsize);
    s.fill(0);

    // get the width and height of the text so we can center it initially
    bounds = font.textBounds(message, 0, 0, fontsize);
    x = s.width / 2 - bounds.w / 2;
    y = s.height / 2 - bounds.h / 2;
  };

  s.draw = () => {
    s.background(204, 120);

    // write the text in black and get its bounding box
    // s.fill(0);
    s.text(message, x, y);
    bounds = font.textBounds(message, x, y, fontsize);

    // check if the mouse is inside the bounding box and tickle if so
    // if (
    //   s.mouseX >= bounds.x &&
    //   s.mouseX <= bounds.x + bounds.w &&
    //   s.mouseY >= bounds.y &&
    //   s.mouseY <= bounds.y + bounds.h
    // ) {
    //   x += s.random(-5, 5);
    //   y += s.random(-5, 5);
    // }

    // check if eyes are in the box
    if (
      gazeX >= bounds.x &&
      gazeX <= bounds.x + bounds.w &&
      gazeY >= bounds.y &&
      gazeY <= bounds.y + bounds.h
    ) {
      x += s.random(-5, 5);
      y += s.random(-5, 5);
      s.fill(getRandomInt(255), getRandomInt(255), getRandomInt(255));
    }
  };
};

const sketchInstance = new p5(sketch);
