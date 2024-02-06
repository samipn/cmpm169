let capture, video;
let vScale = 10;

function setup() {
	createCanvas(windowWidth, screen.availHeight);
	capture = createCapture(VIDEO);
	capture.size(width / vScale, height / vScale);
	capture.hide();
	video = createGraphics(width, height);
}

function draw() {
	background('black');
	
	video.scale(-1, 1);
	video.image(capture, 0, 0, -width, height);
	video.loadPixels();
	
	for (let y = vScale / 2; y < height; y += vScale) {
		for (let x = vScale / 2; x < width; x += vScale) {
			let index = (y * video.width + x) * 4;
			let r = video.pixels[index + 0];
			let g = video.pixels[index + 1];
			let b = video.pixels[index + 2];

			let bright = (r + g + b) / 3; // 0 - 255
			fill(bright);
			noStroke();
			
			let d = map(bright, 0, 255, 0, vScale);
			rectMode(CENTER);
			rect(x, y, d, d);
		}
	}
  	let gridSize =8;
	
    video.loadPixels();
	for (let y=0; y<video.height; y+=gridSize) {
		for (let x=0; x<video.width; x+=gridSize) {
			
    let index = (y * video.width + x) * 4;
    let r = video.pixels[index];
    let dia = map(r,0,255,gridSize,2);
			
    fill(0);
    noStroke();
    circle(x+gridSize/2, y+gridSize/2,dia);
		}
	}
}
