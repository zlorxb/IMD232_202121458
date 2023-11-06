class Traffic {
  constructor() {
    this.vehicles = [];
    //Traffic 클래스의 생성자, vehicle 배열 초기화
  }

  run() {
    //모든 물체에 대해 계산 업데이트 후 화면에 표시
    this.vehicles.forEach((eachVehicle) => {
      let sepForce = eachVehicle.separate(this.vehicles);
      eachVehicle.applyForce(sepForce);
      let cohForce = eachVehicle.cohesion(this.vehicles);
      eachVehicle.applyForce(cohForce);
      let aliForce = eachVehicle.align(this.vehicles);
      eachVehicle.applyForce(aliForce);
      eachVehicle.update(); //물체 상태 업데이트
      eachVehicle.borderInfinite(); //물체가 화면 경계를 넘어가면 이동시킴
      eachVehicle.display(); //물체를 화면에 표시
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
