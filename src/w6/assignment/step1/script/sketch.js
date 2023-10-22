let particleArray = [];
let gravity;

function setup() {
  setCanvasContainer('canvas', 2, 1, true);

  gravity = createVector(0, 0.1);

  background('lightsteelblue');
}

function draw() {
  particleArray.push(new Particle(random(width), -10));

  background('lightsteelblue');

  for (let a = 0; a < particleArray.length; a++) {
    particleArray[a].applyForce(gravity);
    particleArray[a].update();
    particleArray[a].display();
  }

  for (let a = particleArray.length - 1; a >= 0; a--) {
    if (particleArray[a].isDead()) {
      particleArray.splice(a, 1);
    }
  }

  console.log(particleArray.length);
}
