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
  acc = createVector();
  mv = createVector();
  posToMv = createVector();
}

function draw() {
  background('skyblue');
  update();
  //   checkEdges();
  display();
  mv.set(mouseX, mouseY);
  w3();
}

// acc.set(posToMv.x, posToMv.y);

function w3() {
  acc = p5.Vector.sub(mv, pos);
  translate(pos.x, pos.y);
  posToMv = p5.Vector.sub(mv, pos);

  strokeWeight(2);

  stroke('white');
  line(0, 0, posToMv.x, posToMv.y);

  stroke('green');
  line(0, 0, vel.x * 10, vel.y * 10);

  acc.normalize();
  acc.mult(0.1);

  stroke('red');
  line(0, 0, acc.x * 50, acc.y * 50);
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
