const {
  Engine,
  Render,
  Runner,
  Body: CustomBody,
  Composite,
  Composites,
  Constraint,
  MouseConstraint,
  Mouse,
  Bodies,
  Common,
  Vertices,
} = Matter;

Common.setDecomp(decomp);

const engine = Engine.create(),
  world = engine.world;

const runner = Runner.create();
Runner.run(runner, engine);

let cHeight = 600;
let cWidth = 800;

let ropeA;
let ropeB;
let ropeC;

let mouse;

function setup() {
  setCanvasContainer('canvas', cWidth, cHeight, true);
  background('lightsteelblue');

  const concaveA = [
    { x: 0, y: 0 },
    { x: 10, y: -6 },
    { x: 20, y: -16 },
    { x: 30, y: -24 },
    { x: 40, y: -16 },
    { x: 50, y: -6 },
    { x: 60, y: 0 },
    { x: 30, y: 30 },
    { x: 0, y: 0 },
  ];

  const concaveB = [
    { x: 0 / 2, y: -30 / 2 },
    { x: 20 / 2, y: -10 / 2 },
    { x: 40 / 2, y: -30 / 2 },
    { x: 20 / 2, y: 20 / 2 },
    { x: 0 / 2, y: 30 / 2 },
    { x: -20 / 2, y: 20 / 2 },
    { x: -40 / 2, y: -30 / 2 },
    { x: -20 / 2, y: -10 / 2 },
  ];

  const concaveC = [
    { x: 0, y: 0 },
    { x: 10, y: -6 },
    { x: 20, y: -16 },
    { x: 30, y: -24 },
    { x: 40, y: -16 },
    { x: 50, y: -6 },
    { x: 60, y: 0 },
    { x: 30, y: 30 },
    { x: 0, y: 0 },
  ];

  const RandomShape = (vertices) => {
    return vertices.map((vertex) => ({
      x: vertex.x + Math.random() * 10 - 5,
      y: vertex.y + Math.random() * 10 - 5,
    }));
  };

  const BodyA = decomp.quickDecomp(concaveA);
  const BodyB = decomp.quickDecomp(concaveB);
  const BodyC = decomp.quickDecomp(concaveC);
  group = CustomBody.nextGroup(true);

  ropeA = Composites.stack(100, 50, 8, 1, 10, 8, function (x, y) {
    return Bodies.fromVertices(x, y, RandomShape(concaveA), {
      collisionFilter: { group: group },
    });
  });
  Composites.chain(ropeA, 0.5, 0, -0.5, 0, {
    stiffness: 0.5,
    length: 6,
    render: { type: 'line' },
  });

  Composite.add(
    ropeA,
    Constraint.create({
      bodyB: ropeA.bodies[0],
      pointB: { x: -25, y: 0 },
      pointA: { x: ropeA.bodies[0].position.x, y: ropeA.bodies[0].position.y },
      stiffness: 0.7,
    })
  );

  group = CustomBody.nextGroup(true);

  ropeB = Composites.stack(350, 50, 10, 1, 10, 10, function (x, y) {
    return Bodies.fromVertices(x - 20, y, RandomShape(concaveB), {
      collisionFilter: { group: group },
    });
  });

  Composites.chain(ropeB, 0.5, 0, -0.25, 0, {
    stiffness: 0.3,
    length: 3,
    render: { type: 'line' },
  });

  Composite.add(
    ropeB,
    Constraint.create({
      bodyB: ropeB.bodies[0],
      pointB: { x: -10, y: 0 },
      pointA: { x: ropeB.bodies[0].position.x, y: ropeB.bodies[0].position.y },
      stiffness: 0.5,
    })
  );

  group = CustomBody.nextGroup(true);

  ropeC = Composites.stack(600, 50, 13, 1, 10, 10, function (x, y) {
    return Bodies.fromVertices(x - 20, y, RandomShape(concaveC), {
      collisionFilter: { group: group },
      chamfer: 5,
    });
  });

  Composites.chain(ropeC, 0.3, 0, -0.3, 0, { stiffness: 1, length: 0 });

  Composite.add(
    ropeC,
    Constraint.create({
      bodyB: ropeC.bodies[0],
      pointB: { x: -20, y: 0 },
      pointA: { x: ropeC.bodies[0].position.x, y: ropeC.bodies[0].position.y },
      stiffness: 0.7,
    })
  );

  mouse = Mouse.create(document.querySelector('.p5Canvas'));
  mouse.pixelRatio = (pixelDensity() * width) / cWidth;
  let mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.1,
    },
  });

  Composite.add(world, [
    ropeA,
    ropeB,
    ropeC,
    Bodies.rectangle(400, 600, 1200, 50.5, { isStatic: true }),
  ]);

  Composite.add(world, mouseConstraint);
  Runner.run(runner, engine);
}

function draw() {
  background('lightsteelblue');
  colorMode(HSL);

  stroke(183, 94, 50);
  fill(83, 95, 50);
  drawParts(ropeA);

  stroke(258, 84, 56);
  fill(232, 84, 56);
  drawParts(ropeB);

  stroke(36, 81, 31);
  fill(22, 96, 56);
  drawParts(ropeC);

  mouse.pixelRatio = (pixelDensity() * width) / cWidth;
  console.log('length', ropeC.bodies[1].parts.length);
}

function drawParts(rope) {
  rope.bodies.forEach((eachBody) => {
    eachBody.parts.forEach((eachPart, idx) => {
      if (idx === 0) return;
      beginShape();
      eachPart.vertices.forEach((eachVertex) => {
        vertex(
          (eachVertex.x / cWidth) * width,
          (eachVertex.y / cHeight) * height
        );
      });
      endShape(CLOSE);
    });
  });
}
