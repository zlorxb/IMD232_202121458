class Particle {
  constructor(x, y, mass) {
    this.pos = createVector(x, y);
    this.vel = createVector(4, 0);
    this.vel.rotate((TAU / 360) * random(-360, 0));
    this.acc = createVector(0, 0);
    this.rad = 5;
    this.mass = mass;
    this.lifeSpan = 60;
    this.color = color(random(250), random(200), random(200));
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.lifeSpan -= 1;
  }

  display() {
    noStroke();
    fill(red(this.color), green(this.color), blue(this.color), this.lifeSpan);

    ellipse(this.pos.x, this.pos.y, this.rad * 2);
    pop();
  }

  isDead() {
    return this.lifeSpan < 0;
  }
}
