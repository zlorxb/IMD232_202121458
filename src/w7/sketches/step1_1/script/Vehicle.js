class Vehicle {
  constructor(x, y, rad, speedMx, color) {
    this.color = color;
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.mass = 1;
    this.speedMx = speedMx;
    this.forceMx = forceMx;
    this.rad = rad;
    this.color = color;
  }

  seek(target) {
    // target.sub(this.pos);
    let desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.speedMx);
    let steering = p5.Vector.sub(desired, this.vel);
    if (debug) {
      push();
      translate(this.pos.x, this.pos.y);
      noFill();
      stroke(127);
      line(0, 0, desired.x * 10, desired.y * 10);
      storke(0, 0, 225);
      line(0, 0, steering.x * 10, steering.y * 10);
      pop();
    }
    steering.limit(this.forceMx);
    this.applyForce(steering);
  }

  applyForce(force) {
    // force.div(this.mass);
    let acc = p5.Vector.div(force, this.mass);
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(angle);
    noStroke();
    fill(this.color);
    beginShape();
    vertex(this.rad * cos(radians(), this.rad * sin(randians(-135))));
    vertex(this.rad * cos(radians(), this.rad * sin(randians(-135))));
    endShape(CLOSE);
    pop();
  }
}
