let snow = [];
let gravity;

let zOff = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  gravity = createVector(0, 0.3);

  for (let i = 0; i < 400; i++) {
    let x = random(width);
    let y = random(height);
    snow.push(new Snowflake(x, y));
  }
}

function draw() {
  background(0);

  zOff += 0.1;

  for (flake of snow) {
    let xOff = flake.pos.x / width;
    let yOff = flake.pos.y / height;
    let wAngle = noise(xOff, yOff, zOff) * TWO_PI;
    let wind = p5.Vector.fromAngle(wAngle);
    wind.mult(0.1);

    flake.applyForce(gravity);
    flake.applyForce(wind);
    flake.update();
    flake.render();
  }
}

class Snowflake {
  constructor(sx, sy) {
    let x = sx || random(width);
    let y = sy || random(-100, -10);
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector();
    this.angle = random(TWO_PI);
    this.dir = random(1) > 0.5 ? 1 : -1;
    this.r = getRandomSize();
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  render() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    stroke(255);
    fill(255);
    ellipse(0, 0, this.r, this.r);
    pop();
  }
}

function getRandomSize() {
  let r = pow(random(0, 1), 3);
  return constrain(r * 32, 2, 32);
}
