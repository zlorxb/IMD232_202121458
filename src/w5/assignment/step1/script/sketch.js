const cNum = 8;
const rNum = 8;
const stripleNum = 20;
let gridC;
let gridR;
let angleBegin = 0;
let angleBeginVel = 1;
let angleStep = 15;
let colors = [];

function setup() {
  setCanvasContainer('canvas', 1, 1, true);

  colorMode(HSL, 360, 100, 100, 100);
  background('lightsteelblue');

  margin = width / 300;
  spacing = (width - 2 * margin) / (cNum + 1);

  for (let i = 0; i < cNum * rNum; i++) {
    let h = random(360);
    let s = random(80, 100);
    let l = random(40, 80);
    colors.push(color(h, s, l));
  }
}

function draw() {
  background('lightsteelblue');

  for (let r = 0; r < rNum; r++) {
    for (let c = 0; c < cNum; c++) {
      push();
      translate(margin + spacing * (c + 1), margin + spacing * (r + 1));
      rotate(angleBegin + angleStep * (c + r * cNum));

      noFill();

      stroke(colors[r * cNum]);

      ellipse(0, 0, (spacing * 2) / 3, (spacing * 2) / 3);

      pop();
    }
  }

  angleBegin += angleBeginVel;
}
