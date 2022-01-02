import p5 from "p5";
import { getRandomInt } from "./utils.js";

const sketch = (s) => {
  // Symmetry corresponding to the number of reflections. Change the number for different number of reflections
  let symmetry = 9;

  let angle = 360 / symmetry;
  let saveButton, clearButton, fullscreenButton, brushSizeSlider, sizeSlider;
  let hue, sat;
  let drawX, drawY, pDrawX, pDrawY;
  let xDir, yDir;
  const bg = [getRandomInt(100), getRandomInt(75) + 25, 100];

  s.windowResized = () => {
    s.resizeCanvas(s.windowWidth, s.windowHeight);
  };

  s.setup = () => {
    s.colorMode(s.HSB, 100);
    hue = getRandomInt(100);
    sat = getRandomInt(75) + 25;

    drawX = getRandomInt(s.width);
    drawY = getRandomInt(s.height);
    xDir = getRandomInt(2) === 0 ? -1 : 1;
    yDir = getRandomInt(2) === 0 ? -1 : 1;

    // // Creating the save button for the file
    // saveButton = s.createButton("save");
    // saveButton.mousePressed(saveFile);

    // // Creating the clear screen button
    // clearButton = s.createButton("clear");
    // clearButton.mousePressed(clearScreen);

    // // Creating the button for Full Screen
    // fullscreenButton = s.createButton("Full Screen");
    // fullscreenButton.mousePressed(screenFull);

    // // Setting up the slider for the thickness of the brush
    // brushSizeSlider = s.createButton("Brush Size Slider");
    // sizeSlider = s.createSlider(1, 32, 4, 0.1);

    s.createCanvas(s.windowWidth, s.windowHeight);
    s.angleMode(s.DEGREES);
    s.background(...bg);
  };

  // Save File Function
  function saveFile() {
    s.save("design.jpg");
  }

  // Clear Screen function
  function clearScreen() {
    s.background(...bg);
  }

  // Full Screen Function
  function screenFull() {
    let fs = s.fullscreen();
    s.fullscreen(!fs);
  }

  s.draw = () => {
    s.stroke(hue, sat, 100);
    hue += 0.1;
    if (hue > 100) {
      hue = 0;
    }

    s.translate(s.width / 2, s.height / 2);

    drawX += xDir * getRandomInt(5);
    drawY += yDir * getRandomInt(5);

    if (drawX > 0 && drawX < s.width && drawY > 0 && drawY < s.height) {
      let mx = drawX - s.width / 2;
      let my = drawY - s.height / 2;
      let pmx = pDrawX - s.width / 2;
      let pmy = pDrawY - s.height / 2;

      // if (s.mouseIsPressed) {
      for (let i = 0; i < symmetry; i++) {
        s.rotate(angle);
        // let sw = sizeSlider.value();
        let sw = getRandomInt(12);
        s.strokeWeight(sw);
        s.line(mx, my, pmx, pmy);
        s.push();
        s.scale(1, -1);
        s.line(mx, my, pmx, pmy);
        s.pop();
      }
      // }
    } else {
      if (drawX >= s.width || drawX <= 0) {
        xDir *= -1;
      }
      if (drawY >= s.height || drawY <= 0) {
        yDir *= -1;
      }
    }

    pDrawX = drawX;
    pDrawY = drawY;

    if (
      s.mouseX > 0 &&
      s.mouseX < s.width &&
      s.mouseY > 0 &&
      s.mouseY < s.height
    ) {
      let mx = s.mouseX - s.width / 2;
      let my = s.mouseY - s.height / 2;
      let pmx = s.pmouseX - s.width / 2;
      let pmy = s.pmouseY - s.height / 2;

      if (s.mouseIsPressed) {
        for (let i = 0; i < symmetry; i++) {
          s.rotate(angle);
          // let sw = sizeSlider.value();
          let sw = getRandomInt(12);
          s.strokeWeight(sw);
          s.line(mx, my, pmx, pmy);
          s.push();
          s.scale(1, -1);
          s.line(mx, my, pmx, pmy);
          s.pop();
        }
      }
    }
  };
};

const sketchInstance = new p5(sketch);
