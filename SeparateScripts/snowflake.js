let symmetry = 6;
let angle = 360 / symmetry;
let xoff = 0;
let saveButton;
let clearButton;
let slider;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  background(0);
  colorMode(HSB, 200, 200, 200);
  saveButton = createButton('save');
  saveButton.mousePressed(saveSnowflake);
  clearButton = createButton('clear');
  saveButton.mousePressed(clearCanvas);
  slider = createSlider(1, 32, 4, 0.1);
}

function saveSnowflake() {
  save('snowflake.png');
}

function clearCanvas() {
  background(0);
}

function draw() {

  translate(width / 2, height / 2);

  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let mx = mouseX - width / 2;
    let my = mouseY - height / 2;
    let pmx = pmouseX - width / 2;
    let pmy = pmouseY - height / 2;

    if (mouseIsPressed) {
      let hu = noise(xoff) * 255;
      xoff += 0.005;
      stroke(hu, 255, 255, 100);
      for (let i = 0; i < symmetry; i++) {

        rotate(angle);
        let sw = slider.value();
        strokeWeight(sw);
        line(mx, my, pmx, pmy);
        push();
        scale(1, -1);
        line(mx, my, pmx, pmy);
        pop();
      }
    }
  }
}