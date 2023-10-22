class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    // this.vel.rotate((TAU / 360) * random(-150, -30));
    this.vel = createVector(0, 3);
    this.acc = createVector(0, 0);

    this.rad = 7;
    this.lifeSpan = 255;

    //파티클 랜덤 색
    this.color = color(random(150), random(200), random(200), 180);

    this.rotationA = random(360);
    this.rotationS = random(-0.1, 0.1);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.lifeSpan -= 2;

    this.rotationA += this.rotationS;
  }

  display() {
    noStroke();
    fill(this.color);
    push();
    translate(this.pos.x, this.pos.y);
    //파티클 회전각도로 회전
    rotate(this.rotationA);
    rectMode(CENTER);
    rect(0, 0, this.rad * 2, this.rad * 2);
    pop();
  }

  isDead() {
    return this.lifeSpan < 0;
  }
}
