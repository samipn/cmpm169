let seed,mySize;
let angle_c;
let colors = [];
let colors7 = "ff0000-ffaa00-eeee00-00ee00-4444ff-ff00ff".split("-").map((a) => "#" + a);
let colors8 = "8c75ff-c553d2-2dfd60-2788f5-23054f-f21252-8834f1-c4dd92-184fd3-f9fee2-2E294E-541388-F1E9DA-FFD400-D90368-e9baaa-ffa07a-164555-ffe1d0-acd9e7-4596c7-6d8370-e45240-21d3a4-3303f9-cd2220-173df6-244ca8-a00360-b31016".split("-").map((a) => "#" + a);
var color_setup1,color_setup2;
let color_bg;
let balls = []
var k = 30
let r, w, cols, rows, circleW
let active = []

function setup() {
	// pixelDensity(5);
	mySize = min(windowWidth, windowHeight);
	createCanvas(1112, 834);
	seed = int(random(1000));
	colorMode(HSB, 360, 100, 100, 100);
	color_setup1 = colors7;
	color_setup2 = colors8;
	color_bg = "#202020";
	background(color_bg);
	angle_c = 0;
  	circleW = min(width, height)

	poissonDiscSample()

	noFill()
	strokeWeight(0.5)
	stroke('#f2ece7')
	beginShape()
	for (let i = 0; i < balls.length; i++) {
		for (let j = 0; j < balls.length; j++) {
			if (balls[i] && balls[j]) {
				curveVertex(balls[i].x, balls[i].y)
				curveVertex(balls[j].x, balls[j].y)
			}
		}
	}
	endShape()
}

function draw() {
	randomSeed(seed);
	drawingContext.shadowColor = str(random(color_setup1)) + "00";
	drawingContext.shadowOffsetX = 0;
	drawingContext.shadowOffsetY = 0;
	drawingContext.shadowBlur = 0;
	translate(width / 2, height / 2);
	for (let i = 0; i < 2; i++) {
		colors[0] = random(color_setup1);
		colors[1] = random(color_setup1);
		colors[2] = random(color_setup1);
		colors[3] = random(color_setup1);
		colors[4] = random(color_setup2);
		circleForm(0, 0, mySize * 1.1 * (i + 1)/2);
	}
  	for (let i = 0; i < balls.length; i++) {
		if (balls[i]) {
			let rot = map(noise(balls[i].x / 2 + balls[i].y / 2, frameCount / 1000), 0, 1, 0, TAU)
			for (let j = 0; j < 30; j++) {
				push()
				translate(balls[i].x, balls[i].y)

				let theta = random(PI)
				let shading = map(noise(balls[i].x + balls[i].y, theta / 2, frameCount / 100), 0, 1, 0, colors.length)
				let c1 = color(colors[floor(shading)])
				let c2 = color(colors[floor((shading + 1) % colors.length)])
				let mix = fract(shading)
				let coloring = lerpColor(c1, c2, mix)

				stroke(coloring)
				let sizer = map(noise(balls[i].x / 10 + balls[i].y / 10), 0, 1, circleW * 0.01, circleW * 0.25)
				pt1 = createVector(sin(theta + rot) * (sizer), cos(theta + rot) * (sizer))
				pt2 = createVector(sin(-theta + rot) * (sizer), cos(-theta + rot) * (sizer))
				line(pt1.x, pt1.y, pt2.x, pt2.y)
				pop()
			}
		}
	}
	stroke('#f2ece7')	
}

function circleForm(x, y, d) {

	let branch = int(random(2000,500));
	let ang = TAU / branch;
	let angles = [];
	for (let i = 0; i < branch; i++) {
		angles.push(ang * (i + iteration(0.1, 0.25)));
	}
	for (let i = 0; i < branch; i++) {
		let ang1 = angles[i];
		let ang2 = angles[(i + int(random(6))) % angles.length];
		let dd = d * iteration(0.1, 1);
		noFill();
		drawingContext.shadowColor = random(color_setup1);
		drawingContext.shadowOffsetX = 1;
		drawingContext.shadowOffsetY = 1;
		drawingContext.shadowBlur = 0;
		stroke(colors[random([0,1,2,3,4])]);
		strokeWeight(random(1));
		arc(x, y, dd, dd, ang1, ang2);
	}
}

function iteration(s, e) {
	let t = random(10, 100);
	let v = random(0.001, 0.01);
	return map(cos(t + frameCount * v), -1, 1, s, e);
}

function poissonDiscSample() {
	let s = min(windowWidth, windowHeight)
	let r = s / 4
	w = r / sqrt(2)


	cols = floor(width / w)
	rows = floor(height / w)
	for (let i = 0; i < cols * rows; i++) {
		balls[i] = undefined

	}

	var pos = createVector(random(width), random(height))
	let i = floor(pos.x / w)
	let j = floor(pos.y / w)
	balls[i + j * cols] = pos
	active.push(pos)


	while (active.length > 0) {
		let ranIndex = floor(random(active.length))
		var rpos = active[ranIndex]
		var found = false
		for (let n = 0; n < k; n++) {
			let sample = p5.Vector.random2D()
			let m = random(2, 2 * r)
			sample.setMag(m);
			sample.add(rpos)

			var col = floor(sample.x / w)
			var row = floor(sample.y / w)

			if (col > -1 && row > -1 && col < cols && row < rows && !balls[col + row * cols]) {

				var ok = true
				for (let i = -1; i <= 1; i++) {
					for (let j = -1; j <= 1; j++) {
						var index = (col + i) + (row + j) * cols
						let neighbor = balls[index]
						if (neighbor) {
							let d = p5.Vector.dist(sample, neighbor)
							if (d < r) {
								ok = false
							}
						}
					}
				}
				if (ok) {
					found = true
					balls[col + row * cols] = sample;
					active.push(sample)
				}
			}
		}
		if (!found) {
			active.splice(ranIndex, 1)
		}
	}

}
