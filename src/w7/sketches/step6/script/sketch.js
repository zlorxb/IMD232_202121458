function setup() {
  createCanvas(400, 400); // 캔버스 생성
  noFill(); // 채우기 없음
  frameRate(30); // 초당 프레임 설정

  // 중심축의 시작과 끝 위치
  let centerX1 = width / 4;
  let centerX2 = (3 * width) / 4;
  let centerY = height / 2;

  // 중심축 그리기
  line(centerX1, centerY, centerX2, centerY);
}

function draw() {
  background(220); // 배경 색상 설정

  // 원의 개수
  let numCircles = 10;

  for (let i = 0; i < numCircles; i++) {
    let t = i / numCircles; // 0에서 1 사이의 값을 t로 사용
    let x = lerp(width / 4, (3 * width) / 4, t); // 중심축 위의 x 좌표 계산
    let radius = random(10, 50); // 랜덤한 반지름 크기

    let y = height / 2; // 중심축의 y 좌표

    stroke(0); // 선 색상 설정
    strokeWeight(2); // 선 두께 설정
    ellipse(x, y, radius * 2); // 원 그리기
  }
}
