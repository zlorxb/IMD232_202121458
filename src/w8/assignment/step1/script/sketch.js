let traffic;
//traffic이라는 변수 선언
let infiniteOffset = 80;
//infiniteOffse이라는 변수 80으로 설정

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  //화면에 캔버스 생성하고 설정
  colorMode(HSL, 360, 100, 100, 100);
  //색상모드 HSL로 설정
  background('lightsteelblue'); //배경색
  traffic = new Traffic();
  // Traffic 클래스의 객체 생성, 변수에 할당
  for (let n = 0; n < 10; n++) {
    // 0에서 10 밑으로 반복하는 루프 시작
    traffic.addVehicle(random(width), random(height));
    //traffic 객체에 무작위 위치에 물체 추가
  }
}

function draw() {
  background('lightsteelblue'); //배경색
  traffic.run();
  //traffic 업데이트, 화면에 표시
}

function mouseDragged() {
  // 마우스 드래그할 때마다 마우스 위치에 새로 vehicle 추가
  traffic.addVehicle(mouseX, mouseY);
}
