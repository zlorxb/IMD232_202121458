let raindrop;
let splashes = [];

function setup() {
  createCanvas(400, 400);
  raindrop = new Raindrop(random(width), -20, 3);
}

function draw() {
  background(220);

  // 비 방울을 이동시키고 표현
  raindrop.update();
  raindrop.display();

  // 비 방울이 땅에 닿았을 때 파동을 생성
  if (raindrop.reachedGround()) {
    let splash = new Splash(raindrop.x, height);
    splashes.push(splash);
    raindrop = new Raindrop(random(width), -20, 3);
  }

  // 파동을 업데이트하고 표현
  for (let i = splashes.length - 1; i >= 0; i--) {
    splashes[i].update();
    splashes[i].display();
    if (splashes[i].isFinished()) {
      splashes.splice(i, 1);
    }
  }
}

class Raindrop {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  update() {
    this.y += this.speed;
  }

  display() {
    stroke(0, 0, 255);
    line(this.x, this.y, this.x, this.y + 10);
  }

  reachedGround() {
    return this.y >= height;
  }
}

class Splash {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 0;
    this.alpha = 255;
  }

  update() {
    this.r += 2;
    this.alpha -= 5;
  }

  display() {
    noFill();
    stroke(0, 0, 255, this.alpha);
    ellipse(this.x, this.y, this.r * 2);
  }

  isFinished() {
    return this.alpha <= 0;
  }
}
