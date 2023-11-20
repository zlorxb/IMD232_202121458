let cam;

function setup() {
  setCanvasContainer('canvas', 1, 1, true);
  cam = createCapture(VIDEO);
  cam.size(30, 120);
}

function draw() {
  background('white');
  image(cam, 0, 0, width, height);
}
