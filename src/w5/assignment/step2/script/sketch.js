let pendulums = [];
let gravity;

function setup() {
  setCanvasContainer('canvas', 2, 1, true);

  pendulumA = new Pendulum(width / 2, 10, height / 3, (TAU / 360) * 45, 25);
  gravity = createVector(0, 0.5);

  background('lightsteelblue');
}

function draw() {
  pendulumA.applyGravity(gravity);
  pendulumA.update();
  background('lightsteelblue');
  pendulumA.display();
}

function mouseMoved() {
  pendulumA.mouseMoved(mouseX, mouseY);
}

function mousePressed() {
  pendulumA.mousePressed(mouseX, mouseY);
}

function mouseDragged() {
  pendulumA.mouseDragged(mouseX, mouseY);
}

function mouseReleased() {
  pendulumA.mouseReleased();
}
