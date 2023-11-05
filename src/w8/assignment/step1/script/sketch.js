let traffic;
let infiniteOffset = 80;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  colorMode(HSL, 360, 100, 100, 100);
  //색상모드 HSL로 설정
  background('lightsteelblue');
  traffic = new Traffic();
  // Traffic 클래스의 객체 생성, 변수에 할당
  for (let n = 0; n < 10; n++) {
    // 0에서 10 밑으로 반복하는 루프 시작
    traffic.addVehicle(random(width), random(height));
  }
}

function draw() {
  background('lightsteelblue');
  traffic.run();
}

function mouseDragged() {
  // 마우스 드래그할 때마다 마우스 위치에 새로 추가
  traffic.addVehicle(mouseX, mouseY);
}
