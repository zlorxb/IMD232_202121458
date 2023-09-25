let pos;
let vel;
let acc;
let mv;
let posToMv;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background('skyblue');
  pos = createVector(random(width), random(height));
  vel = createVector(0, 0);
  acc = p5.Vector.random2D();
  acc.mult(0.1);
  mv = createVector();
  posToMv = createVector();
}

function draw() {
  background('skyblue');
  update();
  checkEdges();
  display();
  mv.set(mouseX, mouseY);
  w3();
}
function w3() {
  posToMv = p5.Vector.sub(mv, pos);

  strokeWeight(2);

  stroke('white');
  translate(pos.x, pos.y);
  line(0, 0, posToMv.x, posToMv.y);

  stroke('lime');
  line(0, 0, vel.x * 10, vel.y * 10);

  stroke('red');
  line(0, 0, acc.x * 100, acc.y * 100);
}
function update() {
  acc = p5.Vector.random2D();
  acc.mult(1);
  vel.add(acc);
  vel.limit(5);
  pos.add(vel);
}

function checkEdges() {
  if (pos.x < 0) {
    pos.x = width;
  } else if (pos.x > width) {
    pos.x = 0;
  }
  if (pos.y < 0) {
    pos.y = height;
  } else if (pos.y > height) {
    pos.y = 0;
  }
}

function display() {
  noStroke();
  fill('black');
  ellipse(pos.x, pos.y, 50);
}
