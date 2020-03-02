var snowflake = function(p) {
    let symmetry = 6;
    let angle = 360 / symmetry;
    let xoff = 0;
    let saveButton;
    let clearButton;
    let slider;

    p.setup = function() {
        var myCanvas = p.createCanvas(400, 400);
        myCanvas.parent('c1');
        p.angleMode(p.DEGREES);
        p.background(0);
        p.colorMode(p.HSB, 200, 200, 200);

        saveButton = p.createButton('save');
        saveButton.parent('c1');
        saveButton.position(114, 405);
        saveButton.mousePressed(p.saveSnowflake);

        clearButton = p.createButton('clear');
        clearButton.parent('c1');
        clearButton.position(164, 405);
        clearButton.mousePressed(p.clearCanvas);

        slider = p.createSlider(1, 32, 4, 0.1);
        slider.parent('c1');
        slider.position(214, 405);
    }

    p.saveSnowflake = function() {
        p.save('snowflake.png');
    }

    p.clearCanvas = function() {
        p.background(0);
    }

    p.draw = function() {

        p.translate(p.width / 2, p.height / 2);

        if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
            let mx = p.mouseX - p.width / 2;
            let my = p.mouseY - p.height / 2;
            let pmx = p.pmouseX - p.width / 2;
            let pmy = p.pmouseY - p.height / 2;

            if (p.mouseIsPressed) {
                let hu = p.noise(xoff) * 255;
                xoff += 0.005;
                p.stroke(hu, 255, 255, 100);
                for (let i = 0; i < symmetry; i++) {

                    p.rotate(angle);
                    let sw = slider.value();
                    p.strokeWeight(sw);
                    p.line(mx, my, pmx, pmy);
                    p.push();
                    p.scale(1, -1);
                    p.line(mx, my, pmx, pmy);
                    p.pop();
                }
            }
        }
    }
}

let myp5_1 = new p5(snowflake, 'c1');

var clock = function(p) {
    p.setup = function() {
        p.createCanvas(400, 400);
        p.angleMode(p.DEGREES);
    }

    p.draw = function() {
        p.background(0);
        p.translate(200, 200);
        p.rotate(-90);

        let hr = p.hour();
        let mn = p.minute();
        let sc = p.second();

        p.strokeWeight(8);
        p.noFill();

        p.stroke(192, 192, 0);
        let secondAngle = p.map(sc, 0, 60, 0, 360);
        p.arc(0, 0, 260, 260, 0, secondAngle);

        p.stroke(0, 192, 192);
        let minuteAngle = p.map(mn, 0, 60, 0, 360);
        p.arc(0, 0, 280, 280, 0, minuteAngle);

        p.stroke(192, 0, 192);
        let hourAngle = p.map(hr % 12, 0, 12, 0, 360);
        p.arc(0, 0, 300, 300, 0, hourAngle);

        p.push();
        p.rotate(secondAngle);
        p.stroke(192, 192, 0);
        p.line(0, 0, 100, 0);
        p.pop();

        p.push();
        p.rotate(minuteAngle);
        p.stroke(0, 192, 192);
        p.line(0, 0, 85, 0);
        p.pop();

        p.push();
        p.rotate(hourAngle);
        p.stroke(192, 0, 192);
        p.line(0, 0, 50, 0);
        p.pop();

        p.stroke(255);
        p.point(0, 0);
    }
}

let myp5_2 = new p5(clock, 'c2');

var lissajousCurve = function(p) {
    let angle = 0;
    let w = 80;
    let cols;
    let rows;
    let curves = [];
    let color = 0;

    p.setup = function() {
        p.createCanvas(400, 400);
        cols = p.width / w - 1;
        rows = p.height / w - 1;

        for (let j = 0; j < rows; j++) {
            curves[j] = [];
            for (let i = 0; i < cols; i++) {
                curves[j][i] = new Curve();
            }
        }
    }

    p.draw = function() {
        p.background(0);
        let d = w - 0.2 * w;
        let r = d / 2;

        p.noFill();
        p.stroke(255);
        for (let i = 0; i < cols; i++) {

            let cx = w + i * w + w / 2;
            let cy = w / 2;
            p.strokeWeight(1);
            p.stroke(192, 192, 0);
            p.ellipse(cx, cy, d, d);
            let x = r * p.cos(angle * (i + 1) - p.HALF_PI);
            let y = r * p.sin(angle * (i + 1) - p.HALF_PI);
            p.strokeWeight(8);
            p.stroke(255);
            p.point(cx + x, cy + y);
            p.stroke(192, 0, 192);
            p.strokeWeight(1);
            p.line(cx + x, 0, cx + x, p.height);

            for (let j = 0; j < rows; j++) {
                curves[j][i].setX(cx + x);
            }

        }

        p.noFill();
        p.stroke(255);
        for (let j = 0; j < rows; j++) {
            let cx = w / 2;
            let cy = w + j * w + w / 2;
            p.strokeWeight(1);
            p.stroke(192, 192, 0);
            p.ellipse(cx, cy, d, d);
            let x = r * p.cos(angle * (j + 1) - p.HALF_PI);
            let y = r * p.sin(angle * (j + 1) - p.HALF_PI);
            p.strokeWeight(8);
            p.stroke(255);
            p.point(cx + x, cy + y);
            p.stroke(0, 192, 192);
            p.strokeWeight(1);
            p.line(0, cy + y, p.width, cy + y);

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

        if (angle < -p.TWO_PI) {
            for (let j = 0; j < rows; j++) {
                for (let i = 0; i < cols; i++) {
                    curves[j][i].reset();
                }
            }
            angle = 0;
        }
    }

    class Curve {
        constructor() {
            this.path = [];
            this.current = p.createVector();
        }

        setX(x) {
            this.current.x = x;
        }

        setY(y) {
            this.current.y = y;
        }

        addPoint() {
            this.path.push(this.current);
        }

        reset() {
            this.path = [];
        }

        show() {
            p.stroke(50, 150, 200);
            p.strokeWeight(1);
            p.noFill();
            p.beginShape();
            for (let i = 0; i < this.path.length; i++) {
                const v = this.path[i];
                p.vertex(v.x, v.y);
            }
            p.endShape();

            p.strokeWeight(8);
            p.stroke(255);
            p.point(this.current.x, this.current.y);
            this.current = p.createVector();
        }
    }
}

let myp5_3 = new p5(lissajousCurve, 'c3');

var commodorePrint = function(p) {
    let x = 0;
    let y = 0;
    let spacing = 10;

    p.setup = function() {
        p.createCanvas(400, 400);
        p.background(0);
    }

    p.draw = function() {
        p.stroke(255);
        if (p.random(1) < 0.5) {
            p.line(x, y, x + spacing, y + spacing);
        } else {
            p.line(x, y + spacing, x + spacing, y);
        }
        x = x + spacing;

        if (x > p.width) {
            x = 0;
            y = y + spacing;
        } else if (y > p.height) {
            x = 0;
            y = 0;
            p.background(0);
        }
    }
}

let myp5_4 = new p5(commodorePrint, 'c4');

var recursion = function(p) {
    p.setup = function() {
        p.createCanvas(400, 400);
    }

    p.draw = function() {
        p.background(0);
        p.stroke(255);
        p.noFill();
        p.drawCircle(150, 150, 200);
    }

    p.drawCircle = function(x, y, d) {
        p.ellipse(x, y, d);
        if (d > 2) {
            p.drawCircle(x + d * 0.5, y, d * 0.5);
            p.drawCircle(x, y + d * 0.5, d * 0.5);
        }
    }
}

let myp5_5 = new p5(recursion, 'c5');

var mandelbrotSet = function(p) {

    p.setup = function() {
        p.createCanvas(400, 400);
        p.pixelDensity(1);
        var maxiterations = 100;
        p.loadPixels();

        for (var x = 0; x < p.width; x++) {
            for (var y = 0; y < p.height; y++) {
                var a = p.map(x, 0, p.width, -2.5, 2.5);
                var b = p.map(y, 0, p.height, -2.5, 2.5);

                var ca = a;
                var cb = b;
                var n = 0;

                while (n < maxiterations) {
                    var aa = a * a - b * b;
                    var bb = 2 * a * b;
                    a = aa + ca;
                    b = bb + cb;
                    if (p.abs(a + b) > 16) {
                        break;
                    }
                    n++;
                }

                var bright = p.map(n, 0, maxiterations, 0, 1);

                bright = p.map(p.sqrt(bright), 0, 1, 0, 255);
                if (n == maxiterations) {
                    bright = 0;
                }

                var pix = (x + y * p.width) * 4;
                p.pixels[pix + 0] = bright;
                p.pixels[pix + 1] = bright + 75;
                p.pixels[pix + 2] = bright + 75;
                p.pixels[pix + 3] = 255;
            }
        }
        p.updatePixels();
    }
}

let myp5_6 = new p5(mandelbrotSet, "c6");

var mitosis = function(p) {

    var cells = [];

    p.setup = function() {
        p.createCanvas(400, 400);
        cells.push(new Cell());
    }

    p.draw = function() {
        p.background(0);
        for (var i = 0; i < cells.length; i++) {
            cells[i].move();
            cells[i].show();
        }
    }

    p.mousePressed = function() {
        for (var i = cells.length - 1; i >= 0; i--) {
            if (cells[i].clicked(p.mouseX, p.mouseY)) {
                cells.push(cells[i].mitosis());
                cells.push(cells[i].mitosis());
                cells.splice(i, 1);
            }
        }
    }

    class Cell {

        constructor(pos, r, c) {
            if (pos) {
                this.pos = pos.copy();
            } else {
                this.pos = p.createVector(p.width / 2, p.height / 2);
            }

            this.r = r || 150;
            this.c = c || p.color(p.random(0, 255), p.random(0, 255), p.random(0, 255), 100);
        }


        clicked(x, y) {
            var d = p.dist(this.pos.x, this.pos.y, x, y);
            if (d < this.r) {
                return true;
            } else {
                return false;
            }
        }

        mitosis() {
            this.pos.x += p.random(-this.r * 0.5, this.r * 0.5);
            this.pos.y += p.random(-this.r * 0.5, this.r * 0.5);
            var cell = new Cell(this.pos, this.r * 0.8, this.c);
            return cell;
        }

        move() {
            var velocity = p5.Vector.random2D();
            this.pos.add(velocity);
        }

        show() {
            p.noStroke();
            p.fill(this.c);
            p.ellipse(this.pos.x, this.pos.y, this.r, this.r);
        }
    }
}

let myp5_7 = new p5(mitosis, "c7");

var lorenzAttractor = function(p) {
    const MAX_LEN = 1200;
    let offset = 0;

    var x = 0.01;
    var y = 0;
    var z = 0;

    var a = 10;
    var b = 28;
    var c = 8.0/3.0;

    var points = [];

    p.setup = function() {
      p.createCanvas(400, 400, p.WEBGL);
      p.colorMode(p.HSB, 100);
    }

    p.draw = function() {
      p.background(0);
      p.rotateY(p.frameCount * 0.01);
      var dt = 0.01;
      var dx = (a * (y - x)) * dt;
      var dy = (x * (b - z) - y) * dt;
      var dz = (x * y - c * z) * dt;
      x = x + dx;
      y = y + dy;
      z = z + dz;

      var vect = p.createVector(x, y, z);
      points.push(vect);

      if (points.length > MAX_LEN) {
        points.splice(0, 1);
        ++offset;
      }

      p.translate(p.width/2 - 200, p.height/2 - 200);
      p.strokeWeight(3);
      p.scale(2.8);
      p.noFill();
      p.beginShape()
      for(i = 0; i < points.length; i++)
      {   
        let next = points[i];
        p.stroke(((i + offset) * 0.1) % 100, 100, 100 - (points.length - i) * (100 / MAX_LEN));
        p.vertex(points[i].x, points[i].y, points[i].z);
      }   
      p.endShape()
    }
}

let myp5_8 = new p5(lorenzAttractor, "c8");

var purpleRain = function(p) {
    var drops = [];

    p.setup = function() {
      p.createCanvas(400, 400);
      for (var i = 0; i < 500; i++) {
        drops[i] = new Drop();
      }
    }

    p.draw = function() {
      p.background(230, 230, 250);
      for (var i = 0; i < drops.length; i++) {
        drops[i].fall();
        drops[i].show();
      }
    }

    class Drop {
        constructor () {
            this.x = p.random(p.width);
            this.y = p.random(-500, -50);
            this.z = p.random(0, 20);
            this.len = p.map(this.z, 0, 20, 10, 20);
            this.yspeed = p.map(this.z, 0, 20, 1, 20);
        }
     
        fall = function() {
            this.y = this.y + this.yspeed;
            var grav = p.map(this.z, 0, 20, 0, 0.2);
            this.yspeed = this.yspeed + grav;

            if (this.y > p.height) {
              this.y = p.random(-200, -100);
              this.yspeed = p.map(this.z, 0, 20, 4, 10);
            }
        };

        show = function() {
            var thick = p.map(this.z, 0, 20, 1, 3);
            p.strokeWeight(thick);
            p.stroke(138, 43, 226);
            p.line(this.x, this.y, this.x, this.y + this.len);
      };
    }  
}

let myp5_9 = new p5(purpleRain, "c9");
