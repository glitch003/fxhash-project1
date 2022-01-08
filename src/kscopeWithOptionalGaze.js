import p5 from "p5";
import webgazer from "webgazer/dist/webgazer.commonjs2.js";
import { getRandomInt } from "./utils.js";

const bg = [getRandomInt(100), getRandomInt(75) + 25, 100];
let hue, sat;
hue = getRandomInt(100);
sat = getRandomInt(75) + 25;

let drawX, drawY;
drawX = getRandomInt(50);
drawY = getRandomInt(50);

let xDir, yDir;
xDir = getRandomInt(2) === 0 ? -1 : 1;
yDir = getRandomInt(2) === 0 ? -1 : 1;

let gazeX, gazeY;
let eyeTrackingActivated = false;

window.$fxhashFeatures = {
  Background: `hsb(${bg[0]}, ${bg[1]}%, ${bg[2]}%)`,
  StartingColor: `hsb(${hue}, ${sat}%, 100%)`,
  StaringCoordinate: `(${drawX}, ${drawY})`,
  StartingDirection: `(${xDir}, ${yDir})`,
};

const sketch = (s) => {
  // Symmetry corresponding to the number of reflections. Change the number for different number of reflections
  let symmetry = 9;

  let angle = 360 / symmetry;
  let eyeButton;
  let pDrawX, pDrawY;

  s.windowResized = () => {
    s.resizeCanvas(s.windowWidth, s.windowHeight - 40);
    s.background(...bg);
  };

  s.setup = () => {
    s.colorMode(s.HSB, 100);

    s.createCanvas(s.windowWidth, s.windowHeight - 40);
    s.angleMode(s.DEGREES);
    s.background(...bg);

    const t = s.createSpan("Reflections by Chris Cassano");
    t.style("font-weight", "bold");
    t.style("margin-left", "10px");
    t.style("margin-right", "10px");
    const d = s.createSpan(
      "Watch passively, click anywhere to draw, or activate eye tracking to draw with your eyes"
    );
    d.style("margin-left", "10px");
    d.style("margin-right", "20px");

    eyeButton = s.createButton("Activate Eye Tracking");
    eyeButton.mousePressed(activateEyeTracking);
  };

  function activateEyeTracking() {
    pDrawX = null;
    pDrawY = null;
    webgazer
      .setGazeListener(function (data, elapsedTime) {
        // console.log(data);
        gazeX = data?.x;
        gazeY = data?.y;
      })
      .begin();
    eyeTrackingActivated = true;
    alert(
      "Allow usage of your camera.  Then, click anywhere in the page to begin eye tracking.  Clicking more in different places will make the eye tracking more accurate"
    );
  }

  s.draw = () => {
    s.stroke(hue, sat, 100);
    hue += 0.1;
    if (hue > 100) {
      hue = 0;
    }

    s.translate(s.width / 2, s.height / 2);

    if (eyeTrackingActivated) {
      let mx = gazeX - s.width / 2;
      let my = gazeY - s.height / 2;
      let pmx = pDrawX - s.width / 2;
      let pmy = pDrawY - s.height / 2;

      for (let i = 0; i < symmetry; i++) {
        s.rotate(angle);
        let sw = getRandomInt(12);
        s.strokeWeight(sw);
        s.line(mx, my, pmx, pmy);
        s.push();
        s.scale(1, -1);
        s.line(mx, my, pmx, pmy);
        s.pop();
      }

      pDrawX = gazeX;
      pDrawY = gazeY;
    } else {
      drawX += xDir * getRandomInt(5);
      drawY += yDir * getRandomInt(5);

      if (drawX > 0 && drawX < s.width && drawY > 0 && drawY < s.height) {
        let mx = drawX - s.width / 2;
        let my = drawY - s.height / 2;
        let pmx = pDrawX - s.width / 2;
        let pmy = pDrawY - s.height / 2;

        for (let i = 0; i < symmetry; i++) {
          s.rotate(angle);
          let sw = getRandomInt(12);
          s.strokeWeight(sw);
          s.line(mx, my, pmx, pmy);
          s.push();
          s.scale(1, -1);
          s.line(mx, my, pmx, pmy);
          s.pop();
        }
      } else {
        if (drawX >= s.width || drawX <= 0) {
          xDir *= -1;
          if (drawX >= s.width) {
            drawX = s.width - 1;
          } else {
            drawX = 1;
          }
        }
        if (drawY >= s.height || drawY <= 0) {
          yDir *= -1;
          if (drawY >= s.height) {
            drawY = s.height - 1;
          } else {
            drawY = 1;
          }
        }
      }

      pDrawX = drawX;
      pDrawY = drawY;
    }

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
