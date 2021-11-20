const canvas = document.getElementById('can') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const width = canvas.width;
const height = canvas.height;
console.log({ width, height });

const hagenImgRight = new Image();
hagenImgRight.src = 'ambulance.png';
const hagenImgLeft = new Image();
hagenImgLeft.src = 'ambulance-rev.png';

const icaston = new Image();
icaston.src = 'caston.png';

let running = true;

let circles: [number, number, number][] = [];

let caston: '0' | 'l' | 'r' = '0';

type Hagen = {
  x: number;
  y: number;
  direction: 'left' | 'right';
};
let hagen: Hagen = { x: width / 4, y: height / 2, direction: 'right' };
let observer = { x: (width * 3) / 4, y: height / 2 };

let mousePos = { x: 0, y: 0 };

let hagenMoving = { left: false, right: false };
let observerMoving = { left: false, right: false };

let mouseMode: null | 'hagen' = null;

// マウスの移動においてmx, myを更新する
canvas.addEventListener(
  'mousemove',
  function (evt) {
    mousePos = getMousePosition(canvas, evt);
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

window.addEventListener('keydown', function (e) {
  switch (e.key) {
    case 'j':
      hagenMoving.left = true;
      break;
    case 'l':
      hagenMoving.right = true;
      break;
    case 'a':
      observerMoving.left = true;
      break;
    case 'd':
      observerMoving.right = true;
      break;
  }
});

window.addEventListener('keyup', function (e) {
  switch (e.key) {
    case 'j':
      hagenMoving.left = false;
      break;
    case 'l':
      hagenMoving.right = false;
      break;
    case 'a':
      observerMoving.left = false;
      break;
    case 'd':
      observerMoving.right = false;
      break;
  }
});

window.addEventListener('keypress', function (e) {
  switch (e.key) {
    case ' ':
      e.preventDefault();
      running = !running;
      break;
    case 'm':
      if (mouseMode == 'hagen') {
        mouseMode = null;
      } else {
        mouseMode = 'hagen';
      }
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
  }
});

/**
 * キー入力の状態をもとに位置を更新します
 */
function updatePosition() {
  if (!running) return;
  if (mouseMode == 'hagen') {
    hagen.x = mousePos.x;
    hagen.y = mousePos.y;
  } else {
    const dx = -(hagenMoving.left ? 1 : 0) + (hagenMoving.right ? 1 : 0);
    hagen.x += 5 * dx;
    switch (hagen.direction) {
      case 'left':
        if (dx > 0) hagen.direction = 'right';
        break;
      case 'right':
        if (dx < 0) hagen.direction = 'left';
        break;
    }
  }

  const dx = -(observerMoving.left ? 1 : 0) + (observerMoving.right ? 1 : 0);
  observer.x += 5 * dx;
}
setInterval(updatePosition, 20);

setInterval(function (evt) {
  if (!running) return;
  circles.push([0, hagen.x, hagen.y]);
  if (circles.length != 0) {
    if (circles[0][0] > 1000) {
      circles.shift();
    }
  }
}, 200);

/**
 * 円の半径を大きくします。(音の伝播)
 */
function updateCircleRadius() {
  if (!running) return;
  for (let i = 0; i < circles.length; i++) {
    circles[i][0] += 5;
  }
}
setInterval(updateCircleRadius, 20);

/**
 * 描画
 */
function draw() {
  ctx.clearRect(0, 0, 1500, 1000);

  for (let i = 0; i < circles.length; i++) {
    drawCircle(circles[i][0], circles[i][1], circles[i][2]);
  }

  // if (caston == 'l') {
  //   ctx.drawImage(
  //     icaston,
  //     0,
  //     0,
  //     800,
  //     800,
  //     width / 5 - castonSize / 2,
  //     height / 2 - castonSize / 2,
  //     castonSize,
  //     castonSize,
  //   );
  // } else if (caston == 'r') {
  //   ctx.drawImage(
  //     icaston,
  //     0,
  //     0,
  //     800,
  //     800,
  //     (width * 4) / 5 - castonSize / 2,
  //     height / 2 - castonSize / 2,
  //     castonSize,
  //     castonSize,
  //   );
  // }
  const hagenImg = hagen.direction == 'left' ? hagenImgLeft : hagenImgRight;
  ctx.drawImage(hagenImg, 0, 0, 450, 330, hagen.x - 50, hagen.y - 50, 100, 100);

  const castonSize = 200;
  ctx.drawImage(
    icaston,
    0,
    0,
    800,
    800,
    observer.x - castonSize / 2,
    observer.y - castonSize / 2,
    castonSize,
    castonSize,
  );
}
setInterval(draw, 20);

function drawCircle(rad: number, x: number, y: number) {
  const ratio = Math.max(0, 1 - rad / 1000) ** 2;
  ctx.strokeStyle = `rgb(${255 - ratio * 255}, ${255 - ratio * 255}, ${255 - ratio * 255})`;

  ctx.fillStyle = `rgb(${255 - ratio * 80}, 255, 255)`;

  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(x, y, rad, 0, Math.PI * 2, false);
  ctx.stroke();
  ctx.fill();
}
