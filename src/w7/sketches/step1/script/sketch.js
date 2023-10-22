class Emitter {
  constructor (emittingPosX, emittingPosY){
    this.emittingPos = createVector(emittingPosX,emittingPosY);
    this.balls = [];
  }

  createBall(){
    this.balls.push(new Ball(this.emittingPos.x, emittingPos.y, random(1,5), random(360), 100, 50));
  }

applyForce(force){
    this.balls.forEach((each) => {
      each.update();
    });
  }

  update(){
    this.balls.forEach((each) => {
      each.update();
    });
  }

  display(){
    this.balls.forEach((each) => {
      each.update();
    });
  }

}

class Ball {
  constructor (posX, posY, mass, h, s, v){
    this.pos = createVector(posX, posY);
    this.vel = createVector();
    this.acc = createVector();
    this.mass = mass;
    this.rad = mass*5;
    this.color = color(h, s, v);
  }

  applyGravity(gravity) {
    this.balls.forEach
  }
  applyForce(force){
    const calceAcc = p5.Vector.div(force, this.mass);
    // const calceAcc = force.div(this.mass);
    // 벡터를 나눈 값이 필요한데 나눗셈이 되어 작은 상태를 유지할 거냐
    // 두번째부터 앞에 나눈 상태가 그대로 적용됨
    this.acc.add(calceAcc);
  }
  update(){
    this.vel.add(this.acc);
    // this.vel.limit(5);
    this.pos.add(this.vel);
    // this.acc.set(0, 0);
    // this.acc.setMag(0);
    this.acc.mult(0);
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.posx, this.pos.y, 2*this.rad);
  }
}

let emitter;
let balls = [];
let gravity;
let wind;

function setup() {
setCanvasContainer('canvas', 2, 1, true);

ColorMode(HSL, 360, 100, 100);

emitter = new

for(let n = 0; n < 10; n++) {
  balls.push(new ball(random(width), 0, random(1, 20), random(360), 100, 50));
}

gravity = createVector(0, 0.1);
wind = creasteVector(0.5, 0);

background(255);
}

function draw(){
background(255);
balls.forEach((each) => {
  const scaledG = p5.Vector.mult(gravity, each.mass);
  each.applyForce(scacledG);
  each.applyForce(wind);
  each.update();
  each.display();
});
emitter.createBall();
emitter.applyForce(gravity);
}

functions mousePressed() {
  for(let n = 0; n < 10; n++) {
    balls.push(new ball(random(width), 0, random(1, 20), random(360), 100, 50));
  }
}