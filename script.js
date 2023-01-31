/*
  Johan Karlsson, 2023
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/
let canvas;
let ctx;
let w, h;
let rope;

function setup() {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  resize();
  window.addEventListener("resize", () => {
    resize();
  });
  canvas.addEventListener("pointermove", pointermove);

  rope = getNewRope();
}

function pointermove(e) {
  rope[0].x = e.offsetX;
  rope[0].y = e.offsetY;
}

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  ctx.lineWidth = 2;
}

function draw() {
  requestAnimationFrame(draw);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, w, h);
  moveRope();
  drawRope();
}

setup();
draw();

function getNewRope() {
  let r = [];
  for(let i = 0; i < 100; i++) {
    r.push({ x: w / 2, y: h / 2 });
  }
  return r;
}

function drawRope() {
  ctx.beginPath();
  for(let i = 0; i < rope.length; i++) {
    ctx.lineTo(rope[i].x, rope[i].y);
  }
  ctx.stroke();
}

function moveRope() {
  for(let i = 0; i < rope.length-1; i++) {
    const head = rope[i];
    const tail = rope[i+1];
    moveTail(head, tail);
  }
}

function moveTail(head, tail) {
  if(!touching(head, tail)) {
    let xDiff = head.x - tail.x;
    let yDiff = head.y - tail.y;
    if(xDiff === 0) {
      // vertically 
      tail.y += yDiff / 2;
    } else if(yDiff === 0) {
      // horizontally
      tail.x += xDiff / 2;
    } else {
      // diagonally
      if(Math.abs(xDiff) > 1) {
        xDiff *= 0.5;
      }
      if(Math.abs(yDiff) > 1) {
        yDiff *= 0.5;
      }
      tail.x += xDiff;
      tail.y += yDiff;
    }
  }
}

function touching(a, b) {
  const xDiff = Math.abs(a.x - b.x);
  const yDiff = Math.abs(a.y - b.y);
  return xDiff < 2 && yDiff < 2;
}
