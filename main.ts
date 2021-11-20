const canvas = document.getElementById('can') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

let running = false;

const img = new Image();
img.src = 'ambulance.png';

const icaston = new Image();
icaston.src = 'caston.png';

let circles: [number, number, number][] = [];

let caston = '0';

let mx: number, my: number;
let cx: number, cy: number;

canvas.addEventListener(
  'mousemove',
  function (evt) {
    const mousePos = getMousePosition(canvas, evt);
    mx = mousePos.x;
    my = mousePos.y;
  },
  false,
);

function getMousePosition(canvas: HTMLCanvasElement, e: MouseEvent) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
}

window.onkeypress = function (e) {
  console.log(e.key);
  switch (e.key) {
    case ' ':
      e.preventDefault();
      running = !running;
      break;
    case 'l':
      cx += 5;
      img.src = 'ambulance.png';
      break;
    case 'h':
      cx -= 5;
      img.src = 'ambulance-rev.png';
      break;
    case 'Enter':
      circles = [];
      cx = 400;
      cy = 400;
      running = true;
      (document.getElementById('instruction') as HTMLDivElement).innerHTML = '';
      break;
    case 'm':
      cx = mx;
      cy = my;
      break;
    case 'a':
      caston = 'l';
      break;
    case 's':
      caston = '0';
      break;
    case 'd':
      caston = 'r';
      break;
    case 'r':
      circles = [];
      cx = 400;
      cy = 400;
      running = false;
      (document.getElementById('instruction') as HTMLDivElement).innerHTML = '';
      draw();
  }
};

setInterval(function (evt) {
  if (running) {
    circles.push([0, cx, cy]);
  }
  if (circles.length != 0) {
    if (circles[0][0] > 1000) {
      circles.shift();
    }
  }
}, 200);

setInterval(function (evt) {
  if (running) {
    for (let i = 0; i < circles.length; i++) {
      circles[i][0] += 10;
    }
    draw();
  }
}, 30);

function draw() {
  ctx.clearRect(0, 0, 1500, 1000);
  for (let i = 0; i < circles.length; i++) {
    circle(circles[i][0], circles[i][1], circles[i][2]);
  }

  ctx.drawImage(img, 0, 0, 450, 330, cx - 50, cy - 50, 100, 100);

  if (caston == 'l') {
    ctx.drawImage(icaston, 0, 0, 800, 800, 100, 300, 200, 200);
  } else if (caston == 'r') {
    ctx.drawImage(icaston, 0, 0, 800, 800, 1200, 300, 200, 200);
  }
}

function circle(rad: number, x: number, y: number) {
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(x, y, rad, 0, Math.PI * 2, false);
  ctx.stroke();
}
