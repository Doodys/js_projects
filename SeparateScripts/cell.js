function Cell(pos, r, c) {

    if (pos) {
        this.pos = pos.copy();
    } else {
        this.pos = createVector(width / 2, height / 2);
    }

    this.r = r || 150;
    this.c = c || color(random(0, 255), random(0, 255), random(0, 255), 100);

    this.clicked = function(x, y) {
        var d = dist(this.pos.x, this.pos.y, x, y);
        if (d < this.r) {
            return true;
        } else {
            return false;
        }
    }

    this.mitosis = function() {
        this.pos.x += random(-this.r * 0.5, this.r * 0.5);
        this.pos.y += random(-this.r * 0.5, this.r * 0.5);
        var cell = new Cell(this.pos, this.r * 0.8, this.c);
        return cell;
    }

    this.move = function() {
        var velocity = p5.Vector.random2D();
        this.pos.add(velocity);
    }

    this.show = function() {
        noStroke();
        fill(this.c);
        ellipse(this.pos.x, this.pos.y, this.r, this.r);
    }
}