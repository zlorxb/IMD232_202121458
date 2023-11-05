class Vehicle {
  constructor(x, y, mass, rad, speedMx, forceMx, color) {
    // Vehicle 클래스의 생성자, traffic의 초기 속성 설정
    this.pos = createVector(x, y);
    //위치(pos)를 나타내는 2D 벡터 생성
    this.vel = p5.Vector.random2D();
    //무작위 방향의 속도 벡터
    this.acc = createVector();
    //가속도 벡터 초기화
    this.mass = mass; //질량
    this.rad = rad; //반지름
    this.speedMx = speedMx; //최대 속도
    this.forceMx = forceMx; //최대 힘
    this.neighborhooodRad = 50; //주변 물체의 반지름값 = 50
    this.color = color; //물체 색상
  }

  cohesion(others) {
    // 다른 물체들과 평균 위치 계산
    let cnt = 0;
    //카운터 초기화
    const steer = createVector(0, 0); //방향 벡터 초기화
    others.forEach((each) => {
      // 다른 물체들을 반복
      if (each !== this) {
        //현재 자신은 제외
        const distSq =
          (this.pos.x - each.pos.x) ** 2 + (this.pos.y - each.pos.y) ** 2;
        //현재 위치와 다른 물체의 거리 제곱 계산
        if (distSq < this.neighborhooodRad ** 2) {
          //거리가 주변 반지름 이내인 경우
          steer.add(each.pos);
          //평균 위치에 다른 물체의 위치 추가
          cnt++; //카운터 증가
        }
      }
    });
    if (cnt > 0) {
      steer.div(cnt); //평균 위치 벡터를 물체 수로 나누기
      steer.sub(this.pos); //현재 위치에서 평균 위치 뺀 방향 벡터
      steer.setMag(this.speedMx); //최대 속도로 설정
      steer.sub(this.vel); //현재 속도에서 방향 벡터 뺀 벡터
      steer.limit(this.forceMx); //최대 힘을 초과하지 않도록 제한
    }
    return steer; //계산된 방향 벡터 반환함
  }

  align(others) {
    // 다른 물체들과의 정렬 힘을 계산
    let cnt = 0; //카운터 조기화
    const steer = createVector(0, 0);
    //방향 벡터 초기화
    others.forEach((each) => {
      //다른 물체들을 반복
      if (each !== this) {
        //현재 자신은 제외
        const distSq =
          (this.pos.x - each.pos.x) ** 2 + (this.pos.y - each.pos.y) ** 2;
        //현재 위치와 다른 물체의 거리 제곱 계산
        if (distSq < this.neighborhooodRad ** 2) {
          //거리가 주변 반지름 이내인 경우
          steer.add(each.vel); //평균 속도에 다른 물체의 속도 추가
          //   steer.add(p5.Vector.normalize(each.vel));
          cnt++; //카운터 증가
        }
      }
    });
    if (cnt > 0) {
      steer.div(cnt); //평균 속도 벡터를 물체 수로 나누기
      steer.setMag(this.speedMx); //최대 속도로 설정
      steer.sub(this.vel); //현재 속도에서 방향 벡터를 뺀 벡터
      steer.limit(this.forceMx); //최대 힘을 초과하지 않도록 제한
    }
    return steer; //계산된 방향 벡터 반환
  }

  separate(others) {
    // 다른 물체들과 거리 계산
    let cnt = 0; //카운터 초기화
    const steer = createVector(0, 0); //방향 벡터 초기화
    others.forEach((each) => {
      //다른 물체들을 반복함
      if (each !== this) {
        //현재 자신은 제외
        const dist = this.pos.dist(each.pos); //현재 위치와 다른 물체 거리 계산
        if (dist > 0 && this.rad + each.rad > dist) {
          const distNormal = dist / (this.rad + each.rad);
          //거리가 0보다 크고 충돌이 발생하는 경우
          const towardMeVec = p5.Vector.sub(this.pos, each.pos); //방향 벡터 계산
          towardMeVec.setMag(1 / distNormal); //방향 벡터를 거리고 나누기
          steer.add(towardMeVec); //방향 벡터 추가
          cnt++; //카운터 증가
        }
      }
    });
    if (cnt > 0) {
      steer.div(cnt); //방향 벡터를 물체 수로 나누기
      steer.setMag(this.speedMx); //최대 속도로 설정
      steer.sub(this.vel); //현재 속도에서 방향 벡터를 뺀 벡터
      steer.limit(this.forceMx); //최대 힘을 초과하지 않도록 제한함
    }
    return steer; //계산된 방향 벡터 전환
  }

  applyForce(force) {
    //물체에 외부 힘을 적용
    const forceDivedByMass = p5.Vector.div(force, this.mass);
    //힘을 질량으로 나누기
    this.acc.add(forceDivedByMass);
    //가속도에 힘 추가
  }

  update() {
    this.vel.add(this.acc);
    //가속도에 속도 더하기
    this.vel.limit(this.speedMx);
    //speedMx가 이미 있기 때문에 제한을 걸어둠
    this.pos.add(this.vel);
    //위치에 속도 더하기
    this.acc.mult(0);
    //가속도 초기화
  }

  borderInfinite() {
    //물체가 화면 경계를 넘어가면 반대편으로 이동시킴
    if (this.pos.x < -infiniteOffset) {
      this.pos.x = width + infiniteOffset;
    } else if (this.pos.x > width + infiniteOffset) {
      this.pos.x = -infiniteOffset;
    } //너비 경계를 넘어가면
    if (this.pos.y < -infiniteOffset) {
      this.pos.y = height + infiniteOffset;
    } else if (this.pos.y > height + infiniteOffset) {
      this.pos.y = -infiniteOffset;
    } //높이 경계를 넘어가면
  }

  display() {
    //화면에 물체 표시
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    noStroke();
    fill(this.color);
    beginShape();
    vertex(this.rad, 0);
    vertex(this.rad * cos(radians(-135)), this.rad * sin(radians(-135)));
    vertex(0, 0);
    vertex(this.rad * cos(radians(135)), this.rad * sin(radians(135)));
    endShape(CLOSE);
    // noFill();
    // stroke(0, 0, 60);
    // ellipse(0, 0, 2 * this.rad);
    // stroke(0, 0, 80);
    // ellipse(0, 0, 2 * this.neighborhooodRad);
    pop();
  }
}
