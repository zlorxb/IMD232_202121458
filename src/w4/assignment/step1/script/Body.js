class Body {
  constructor(x, y, mass) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.mass = mass;
    this.rad = this.mass * random(20, 50);
    this.velVis = createVector(0, 0);
    this.accVis = createVector(0, 0);
  }

  attract(body) {
    const force = p5.Vector.sub(this.pos, body.pos);
    const distance = constrain(force.mag(), 5, 25);
    const strength = (G * (this.mass * body.mass)) / distance ** 2;
    force.setMag(strength);
    return force;
  }

  applyForce(force) {
    const acc = p5.Vector.div(force, this.mass);
    this.acc.add(acc);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
    this.velVis.set(this.vel);
    this.velVis.mult(10);
    this.accVis.set(this.acc);
    this.accVis.mult(100);
  }

  display() {
    noStroke();
    fill(0, 127);
    circle(this.pos.x, this.pos.y, this.rad * 2);
  }

  displayVectors() {
    noFill();
    stroke('red');
    line(
      this.pos.x,
      this.pos.y,
      this.pos.x + this.velVis.x,
      this.pos.y + this.velVis.y
    );
    stroke('blue');
    line(
      this.pos.x,
      this.pos.y,
      this.pos.x + this.accVis.x,
      this.pos.y + this.accVis.y
    );
  }
}
