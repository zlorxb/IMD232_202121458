let emitter;
// let emitters = [];
let gravity;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);

  emitter = new Emitter(mouseX, mouseY, 20);
  gravity = createVector(0, 0.1);

  background('lightsteelblue');
}

function draw() {
  // if (mouseIsPressed) {
  //   for (let i = 0; i < 100; i++) {
  //     emitter.addParticle();
  //     emitter.setPosition(mX, mY);
  //   }
  // }
  background('lightsteelblue');

  emitter.update(gravity);
  emitter.display();
  // emitter.addParticle();

  // for (let i = 0; i < emitters.length; i++) {
  //   emitters[i].update(gravity);
  //   emitters[i].display();
  // }

  console.log(emitter.particles.length);
}

function mouseClicked() {
  for (let a = 0; a < 100; a++) {
    emitter.setPosition(mouseX, mouseY);
    emitter.addParticle(a);
  }
}
