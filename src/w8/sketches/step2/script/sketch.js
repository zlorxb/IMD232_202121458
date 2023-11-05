let emitter;
let particle;
let g;

function setup() {
  setCanvasContainer('canvasGoesHere', 2, 1, true);

  colorMode(MSL);
  particle = new Ball(width / 2, 0, 1, 0, 100, 50);

  emitter = new Emitter(width / 2, 0);

  g = createVector(0, 0.1);

  background('white');
}

function draw() {
  background('white');
  const scaledG = p5.Vector.mult(g, partice.mass);
  particle.applyForce(scaledG);
  particle.update();
  particle.display();

  emitter.createBall();
  emitter.applyGravity(scaledG);
  emitter.update();
  emitter.display();

  // console.log(emitter.balls.)
}
