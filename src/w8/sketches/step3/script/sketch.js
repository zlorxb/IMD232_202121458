let numCircles = 2; // 원의 개수
let numObjectsPerCircle = 10; // 각 원에 있는 물체의 개수
let circleRadius = 100; // 원의 반지름
let circles = [];

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);

  // 원을 그리며 회전하는 각 원마다 물체 배열을 생성합니다.
  for (let i = 0; i < numCircles; i++) {
    let circleObjects = [];
    for (let j = 0; j < numObjectsPerCircle; j++) {
      let angle = map(j, 0, numObjectsPerCircle, 0, 360);
      let x = width / 2 + cos(angle) * circleRadius + i * 200;
      let y = height / 2 + sin(angle) * circleRadius;
      circleObjects.push(new SimObject(x, y));
    }
    circles.push(circleObjects);
  }
}

function draw() {
  background(220);

  // 모든 물체를 업데이트하고 표시합니다.
  for (let i = 0; i < circles.length; i++) {
    for (let obj of circles[i]) {
      obj.update(i);
      obj.display();
    }
  }
}

class SimObject {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = random(360);
    this.speed = random(1, 3);
    this.radius = 10;
  }

  update(i) {
    // 물체의 위치를 반복적으로 업데이트합니다.
    this.x = width / 2 + cos(this.angle) * circleRadius + i * 200;
    this.y = height / 2 + sin(this.angle) * circleRadius;
    this.angle += this.speed;
  }

  display() {
    // 물체를 화면에 그립니다.
    fill(0);
    ellipse(this.x, this.y, this.radius * 2);
  }
}
