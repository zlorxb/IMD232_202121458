const bodies = [];
const G = 1;
let showVector = false;
const numBodies = 30;

function setup() {
  setCanvasContainer('canvas', 1, 1, true);
  reset();
}

function draw() {
  background('lightsteelblue');

  for (let i = 0; i < bodies.length; i++) {
    for (let j = 0; j < bodies.length; j++) {
      if (i !== j) {
        let forceForJ = bodies[i].attract(bodies[j]);
        bodies[j].applyForce(forceForJ);
      }
    }
    bodies[i].update();
    bodies[i].display();
    if (showVector) {
      bodies[i].displayVectors();
    }
  }
}

function mousePressed() {
  if (isMouseInsideCanvas()) {
    reset();
  }
}

function reset() {
  bodies.length;
  for (let i = 0; i < 30; i++) {
    const mass = random(16, 100);
    bodies[i] = new Body(random(width), random(height), random(0.1, 2));
  }
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    showVector = !showVector;
  }
}
