console.log("script.js running");

const numPoints = 25;
const minSpeed = 0.2;
const maxSpeed = 5;
const segmentThreshold = 0.1; // 1/10 of screen size

function createRandomPoint() {
  const speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
  const direction = Math.random() * 2 * Math.PI;
  return new Point(
    Math.random() * myCanvas.width,
    Math.random() * myCanvas.height,
    speed,
    direction
  );
}

function createSegments() {
  for (let i = 0; i < graph.points.length; i++) {
    for (let j = i + 1; j < graph.points.length; j++) {
      const p1 = graph.points[i];
      const p2 = graph.points[j];
      const dist = distance(p1, p2);
      if (dist < Math.min(myCanvas.width, myCanvas.height) * segmentThreshold) {
        graph.tryAddSegment(new Segment(p1, p2));
      }
    }
  }
}

function updatePoints() {
  for (let i = graph.points.length - 1; i >= 0; i--) {
    const point = graph.points[i];
    point.update();

    if (
      point.x < 0 ||
      point.x > myCanvas.width ||
      point.y < 0 ||
      point.y > myCanvas.height
    ) {
      graph.removePoint(point);
      graph.addPoint(createRandomPoint());
    }
  }
}

function init() {
  myCanvas.width = window.innerWidth;
  myCanvas.height = window.innerHeight;

  graph.dispose();

  for (let i = 0; i < numPoints; i++) {
    graph.addPoint(createRandomPoint());
  }
}

function animate() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  updatePoints();
  createSegments();
  graphEditor.display();
  requestAnimationFrame(animate);
}

const ctx = myCanvas.getContext("2d");
const graph = new Graph();
const graphEditor = new GraphEditor(myCanvas, graph);

init();
animate();