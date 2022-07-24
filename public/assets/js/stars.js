"use strict";

let canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'),
	w = canvas.width = window.innerWidth,
	h = canvas.height = window.innerHeight,
	hue = 270,
	stars = [],
	count = 0,
	maxStars = 1500;

// START CANVAS CACHED GRADIENt
let whiteGradient = createGradient(hue);
let yellowGradient = createGradient(60);
let redGradient = createGradient(0);

// END CANVAS CACHED GRADIENT

let globalGradient = ctx.createLinearGradient(
	0,
	0,
	w,
	h
);
globalGradient.addColorStop(0,"black");
globalGradient.addColorStop(0.25,"black");
globalGradient.addColorStop(0.5, 'hsl(' + hue + ',75%, 12%)');
globalGradient.addColorStop(1, 'hsl(' + 0 + ', 100%,6%)');
ctx.fillStyle = globalGradient;

function createGradient(hue) {
let canvas2 = document.createElement('canvas');
let w2 = canvas2.width = 100;
let h2 = canvas2.height = 100;
let ctx2 = canvas2.getContext("2d");
// draw a big beefy gradient in the center of the dummy canvas
let gradientCache = ctx2.createRadialGradient(
        w2 / 2,
        h2 / 2,
        0,
        w2 / 2,
        h2 / 2,
        w2 / 2
);
gradientCache.addColorStop(0.025, '#fff');
gradientCache.addColorStop(0.1, 'hsl(' + hue + ', 100%, 33%)');
gradientCache.addColorStop(0.25, 'hsl(' + hue + ', 100%, 6%)');
gradientCache.addColorStop(1, 'transparent');
ctx2.fillStyle = gradientCache;
ctx2.beginPath();
ctx2.arc(w2 / 2, h2 / 2, w2 / 2, 0, Math.PI * 2);
ctx2.fill();
return canvas2;
}

function random(min, max) {
	if (arguments.length < 2) {
		max = min;
		min = 0;
	}

	if (min > max) {
		let hold = max;
		max = min;
		min = hold;
	}

	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function maxOrbit(x,y) {
	let max = Math.max(x,y),
		diameter = Math.round(Math.sqrt(max*max + max*max));
	return diameter/2;
}

let Star = function() {
	this.orbitRadius = random(maxOrbit(w,h));
	this.radius = random(60, this.orbitRadius) / 10;
	this.orbitX = w / 2;
	this.orbitY = h / 2;
	this.timePassed = random(0, maxStars);
	this.speed = random(this.orbitRadius) / 400000;
	this.alpha = random(2, 10) / 10;
  this.color = random(1, 10);
  if (this.color < 2) {
	this.gradient = yellowGradient;
} else if (this.color < 4) {
	this.gradient = redGradient;
} else {
	this.gradient = whiteGradient;
}

	count++;
	stars[count] = this;
}

Star.prototype.draw = function() {
	let x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
		y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
		twinkle = random(50);

	if (twinkle === 1 && this.alpha > 0) {
		this.alpha -= 0.05;
	} else if (twinkle === 2 && this.alpha < 1) {
		this.alpha += 0.05;
	}
  
	ctx.globalAlpha = this.alpha;
	// draw the cached gradient canvas image
	ctx.drawImage( this.gradient, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius );
	this.timePassed += this.speed;
}

for (let i = 0; i < maxStars; i++) {
	new Star();
}

function animation() {
	ctx.globalCompositeOperation = 'source-over';
	ctx.globalAlpha = 0.8;
	//ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';
	ctx.fillRect(0, 0, w, h)

	ctx.globalCompositeOperation = 'lighten';
	for (let i = 1, l = stars.length; i < l; i++) {
		stars[i].draw();
	};  
	self.requestAnimationFrame(animation);
}

animation();