let angle = 0;
let w = 80;
let cols;
let rows;
let curves = [];
let color = 0;

function setup() {
  createCanvas(400, 400);
  cols = width / w - 1;
  rows = height / w - 1;

  for (let j = 0; j < rows; j++) {
    curves[j] = [];
    for (let i = 0; i < cols; i++) {
      curves[j][i] = new Curve();
    }
  }
}

function draw() {
  background(0);
  let d = w - 0.2 * w;
  let r = d / 2;

  noFill();
  stroke(255);
  for (let i = 0; i < cols; i++) {
    
    let cx = w + i * w + w / 2;
    let cy = w / 2;
    strokeWeight(1);
    stroke(192, 192, 0);
    ellipse(cx, cy, d, d);
    let x = r * cos(angle * (i + 1) - HALF_PI);
    let y = r * sin(angle * (i + 1) - HALF_PI);
    strokeWeight(8);
    stroke(255);
    point(cx + x, cy + y);
    stroke(192, 0, 192);
    strokeWeight(1);
    line(cx + x, 0, cx + x, height);
    for (let j = 0; j < rows; j++) {
      curves[j][i].setX(cx + x);
    }

  }

  noFill();
  stroke(255);
  for (let j = 0; j < rows; j++) {
    let cx = w / 2;
    let cy = w + j * w + w / 2;
    strokeWeight(1);
    stroke(192, 192, 0);
    ellipse(cx, cy, d, d);
    let x = r * cos(angle * (j + 1) - HALF_PI);
    let y = r * sin(angle * (j + 1) - HALF_PI);
    strokeWeight(8);
    stroke(255);
    point(cx + x, cy + y);
    stroke(0, 192, 192);
    strokeWeight(1);
    line(0, cy + y, width, cy + y);

    for (let i = 0; i < cols; i++) {
      curves[j][i].setY(cy + y);
    }
  }

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      curves[j][i].addPoint();
      curves[j][i].show();
    }
  }

  angle -= 0.01;

  if (angle < -TWO_PI) {
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        curves[j][i].reset();
      }
    }
    angle = 0;
    noLoop();
  }
}