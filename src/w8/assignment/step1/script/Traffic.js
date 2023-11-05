class Traffic {
  constructor() {
    this.vehicles = [];
  }

  run() {
    //모든 물체에 대해 업데이트 화면에 표시
    this.vehicles.forEach((eachVehicle) => {
      let sepForce = eachVehicle.separate(this.vehicles);
      eachVehicle.applyForce(sepForce);
      let cohForce = eachVehicle.cohesion(this.vehicles);
      eachVehicle.applyForce(cohForce);
      let aliForce = eachVehicle.align(this.vehicles);
      eachVehicle.applyForce(aliForce);
      eachVehicle.update();
      eachVehicle.borderInfinite();
      eachVehicle.display();
    });
  }

  addVehicle(x, y) {
    //새로운 물체 생성하고 추가
    this.vehicles.push(
      new Vehicle(x, y, 1, 10, 5, 0.1, color(random(360), 100, 50))
    );
  }
}
