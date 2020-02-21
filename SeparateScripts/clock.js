function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(0);
  translate(200, 200);
  rotate(-90);

  let hr = hour();
  let mn = minute();
  let sc = second();

  strokeWeight(8);
  noFill();

  stroke(192, 192, 0);
  let secondAngle = map(sc, 0, 60, 0, 360);
  arc(0, 0, 260, 260, 0, secondAngle);

  stroke(0, 192, 192);
  let minuteAngle = map(mn, 0, 60, 0, 360);
  arc(0, 0, 280, 280, 0, minuteAngle);

  stroke(192, 0, 192);
  let hourAngle = map(hr % 12, 0, 12, 0, 360);
  arc(0, 0, 300, 300, 0, hourAngle);

  push();
  rotate(secondAngle);
  stroke(192, 192, 0);
  line(0, 0, 100, 0);
  pop();

  push();
  rotate(minuteAngle);
  stroke(0, 192, 192);
  line(0, 0, 85, 0);
  pop();

  push();
  rotate(hourAngle);
  stroke(192, 0, 192);
  line(0, 0, 50, 0);
  pop();

  stroke(255);
  point(0, 0);
}