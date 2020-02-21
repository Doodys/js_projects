function setup() {
    createCanvas(400, 400);
  }
  
  function draw() {
    background(0);
    stroke(255);
    noFill();
    drawCircle(150, 150, 200);
  }
  
  function drawCircle(x, y, d) {
    ellipse(x, y, d);
    if(d > 2) {
       drawCircle(x + d * 0.5, y, d * 0.5);
       drawCircle(x, y + d * 0.5, d * 0.5);
    } 
  }