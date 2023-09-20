let posX;
let posY;
let posXAdd = 3;
let posXAdd = -2;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background(255);
  pos = creatVector(width / 2, height / 2);
  vel = creatVector(3, 5);
  //화면의 중앙에 배치
  console.log(pos);
  console.log(vel);
  ellipse(posX, posY, 50);
}

function draw() {
  background(255);
  pos.add(vel);
  if (pos.x < 0) {
    vel.x *= -1;
  } else if (pos.x > width) {
    vel.x *= -1;
  }
  if (pos.y < 0) ellipse(posX, posY, 50);
  //   posX++;
  //   posX = posX + 1;
  //   posX += 1;
}
