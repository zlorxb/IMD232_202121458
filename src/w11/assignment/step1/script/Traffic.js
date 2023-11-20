class Traffic {
  constructor() {
    this.vehicles = [];
    //Traffic 클래스의 생성자, vehicle 배열 초기화
  }

  run() {
    //모든 물체에 대해 계산 업데이트 후 화면에 표시
    this.vehicles.forEach((eachVehicle) => {
      //각 물체 간 간격 유지하도록 힘을 적용해 물체들을 분리시킴
      let sepForce = eachVehicle.separate(this.vehicles);
      eachVehicle.applyForce(sepForce);
      //각 물체 간의 분리 힘 적용
      let cohForce = eachVehicle.cohesion(this.vehicles);
      //물체들을 함께 묶는 힘을 계산해 물체들을 한데 모이도록 유도
      eachVehicle.applyForce(cohForce);
      //물체를 함께 모이도록 하는 힘 적용
      let aliForce = eachVehicle.align(this.vehicles);
      //주변 물체들과 비슷하 방향으로 이동하도록 하는 힘을 계산해 물체들을 정렬시킴
      eachVehicle.applyForce(aliForce); //물체를 정렬시키는 힘 적용
      eachVehicle.update(); //물체 상태 업데이트
      eachVehicle.borderInfinite(); //물체가 화면 경계를 넘어가면 반대편으로 이동시킴
      eachVehicle.display(); //물체를 화면에 그림
    });
  }

  addVehicle(x, y) {
    //새로운 물체 생성하고 추가
    this.vehicles.push(
      new Vehicle(x, y, 1, 10, 5, 0.1, color(random(360), 100, 50))
      //새로 추가된 물체들에 대한 초기 속성 설정값
    );
  }
}
