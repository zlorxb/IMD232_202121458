let dandelion;
let seeds = [];

function setup() {
  createCanvas(400, 400);
  dandelion = new Dandelion(width / 2, height - 20);
}

function draw() {
  background(220);

  // Update and display the dandelion
  dandelion.display();

  // Update and display each seed
  for (let seed of seeds) {
    seed.update();
    seed.display();
  }

  // Remove seeds that have gone out of the canvas
  seeds = seeds.filter((seed) => !seed.isOutOfCanvas());
}

function mousePressed() {
  // Create a new seed at the dandelion's position and add it to the array
  let seed = new Seed(dandelion.pos.x, dandelion.pos.y);
  seeds.push(seed);

  // Make the dandelion blow
  dandelion.blow();
}

class Dandelion {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.size = 40;
    this.blown = false;
  }

  display() {
    fill(255, 200, 50);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }

  blow() {
    this.blown = true;
  }
}

class Seed {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(2, 5));
    this.size = 5;
  }

  update() {
    this.pos.add(this.vel);
  }

  display() {
    fill(200, 200, 200);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }

  isOutOfCanvas() {
    return (
      this.pos.x < 0 ||
      this.pos.x > width ||
      this.pos.y < 0 ||
      this.pos.y > height
    );
  }
}
