let drops = [];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 200; i++) {
    drops[i] = new Raindrop();
  }
}

function draw() {
  background(220);

  for (let i = 0; i < drops.length; i++) {
    drops[i].fall();
    drops[i].display();

    if (drops[i].y > height) {
      drops[i] = new Raindrop();
    }
  }
}

function mouseClicked() {
  // 마우스 클릭 이벤트가 발생하면 페이지를 새로 고침합니다.
  window.location.reload();
}

class Raindrop {
  constructor() {
    this.x = random(width);
    this.y = 0; // 모든 비 방울이 y좌표 0에서 시작
    this.speed = random(5, 10); // 비의 속도를 랜덤으로 조절
    this.gravity = random(0.1, 0.3); // 각 비 방울의 중력을 랜덤으로 조절
    this.length = random(10, 20);
    this.thickness = random(1, 3);
  }

  fall() {
    this.y += this.speed;
    this.speed += this.gravity; // 중력을 적용
    if (this.y > height) {
      this.y = 0; // 화면 밖으로 나갔을 때 다시 위에서 시작
      this.speed = random(5, 10); // 속도 초기화
    }
  }

  display() {
    stroke(0, 0, 255); // 파란색 선
    strokeWeight(this.thickness);
    line(this.x, this.y, this.x, this.y + this.length);
  }
}
