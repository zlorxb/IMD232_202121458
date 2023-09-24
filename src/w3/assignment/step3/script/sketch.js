let pos;
let vel;
let acc;
let mv;
let posToMv;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background('white');
  pos = createVector(random(width), random(height));
  vel = createVector();
  acc = createVector();
  mv = createVector();
  posToMv = createVector();
}

function draw() {
  background('salmon');
  update();
  display();

  mv.set(mouseX, mouseY);
  acc.set(posToMv.x, posToMv.y);

  translate(pos.x, pos.y);
  posToMv = p5.Vector.sub(mv, pos);

  strokeWeight(1);
  stroke('black');
  line(0, 0, posToMv.x, posToMv.y);

  strokeWeight(2);
  stroke('blue');
  line(0, 0, vel.x * 10, vel.y * 10);

  if (mouseIsPressed === true) {
    acc.mult(-0.5);
  } else {
    acc.normalize();
    acc.mult(0.1);
  }

  strokeWeight(4);
  stroke('red');
  line(0, 0, acc.x * 0.1, acc.y * 0.1);
}

function update() {
  // acc = p5.Vector.random2D();
  vel.add(acc);
  vel.limit(5);
  pos.add(vel);
}

// function checkEdges() {
//   if (pos.x < 0) {
//     pos.x = width;
//   } else if (pos.x > width) {
//     pos.x = 0;
//   }
//   if (pos.y < 0) {
//     pos.y = height;
//   } else if (pos.y > height) {
//     pos.y = 0;
//   }
// }

function display() {
  noStroke();
  fill('black');
  ellipse(pos.x, pos.y, 50);
}
