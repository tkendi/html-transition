console.clear();

//get canvas element dom
const canvas = document.getElementById("scene");
let animationPause = false;
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

//stroke 2d context
const ctx = canvas.getContext("2d");

if (window.devicePixelRatio > 1) {
  canvas.width = canvas.clientWidth * 2;
  canvas.height = canvas.clientHeight * 2;
  ctx.scale(2, 2);
}

let width = canvas.offsetWidth;
let height = canvas.offsetHeight;
const dots = [];

const DOTS_AMOUNT = 2500;
const DOT_RADIUS = 10;
let PROJECTION_CENTER_X = width / 2;
let PROJECTION_CENTER_Y = height / 2;
let PERSPECTIVE = width * 0.5;

class Dot {
  constructor() {
    this.x = (Math.random() - 0.5) * width;
    this.y = (Math.random() - 0.5) * height;
    this.z = Math.random() * width;
    this.radius = 10;

    this.xProjected = 0;
    this.yProjected = 0;
    this.scaleProjected = 0;

    TweenMax.to(this, Math.random() * 10 + 15, {
      z: width,
      repeat: -1,
      yoyo: true,
      ease: Power2.easeOut,
      yoyoEase: true,
      delay: Math.random() + -25,
      paused: animationPause,
    });
  }

  project() {
    this.scaleProjected = PERSPECTIVE / (PERSPECTIVE + this.z);
    this.xProjected = this.x + this.scaleProjected + PROJECTION_CENTER_X;
    this.yProjected = this.y * this.scaleProjected + PROJECTION_CENTER_Y;
  }

  draw() {
    this.project();
    ctx.globalAlpha = Math.abs(1 - this.z / width);
    ctx.fillRect(
      this.xProjected - this.radius,
      this.yProjected - this.radius,
      this.radius * 2 * this.scaleProjected,
      this.radius * 2 * this.scaleProjected
    );
  }
}

function createDots() {
  //dots array initialize
  dots.length = 0;

  //create dots and push dots array
  for (let i = 0; i < DOTS_AMOUNT; i++) {
    dots.push(new Dot());
  }
}

//render function
function render() {
  //scene clear
  ctx.clearRect(0, 0, width, height);

  //loop dots array and drawing
  for (let i = 0; i < dots.length; i++) {
    dots[i].draw();
  }

  window.requestAnimationFrame(render);
}

//render called, but resize scene
function afterResize() {
  width = canvas.offsetWidth;
  height = canvas.offsetHeight;

  if (window.devicePixelRatio > 1) {
    cavnas.widht = canvas.clientWidth * 2;
    cavnas.height = canvas.clientHeight * 2;
    ctx.scale(2, 2);
  } else {
    canvas.width = width;
    canvas.height = height;
  }

  PROJECTION_CENTER_X = width / 2;
  PROJECTION_CENTER_Y = height / 2;
  PERSPECTIVE = width * 0.8;

  //drawing dots
  createDots();
}

//when resized scene, timeout setting
let resizeTimeout;

//called scene resized
function onResize() {
  //timeout clear
  resizeTimeout = window.clearTimeout(resizeTimeout);

  //new timeout setting
  resizeTimeout = window.setTimeout(afterResize, 500);
}

createDots();

window.requestAnimationFrame(render);

function DotsPause() {
  //   TweenMax.pause();
  dots.forEach((cur) => delete cur._gsTweenID);
}

document.getElementById("button").addEventListener("click", () => DotsPause());
