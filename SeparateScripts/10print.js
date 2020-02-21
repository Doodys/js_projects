let x = 0;
let y = 0;
let spacing = 10;

function setup() {
  createCanvas(100, 100);
  background(0);
}

function draw() {
  print(y + " " + height);
  stroke(255);
  
  if(random(1) < 0.5) {
   line(x, y, x + spacing, y + spacing); 
  } else {
    line(x, y + spacing, x + spacing, y); 
  }
  x = x + spacing;
  
  if(x > width) {
    x = 0;
    y = y + spacing;

  }
  else if(y > height) {
    x = 0;
    y = 0;
    background(0);
  }
}