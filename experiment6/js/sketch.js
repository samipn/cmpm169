p5.disableFriendlyErrors = true;
let font1;
let radius = 100;
let tubeRadius = 200;
let textTexture;
let hu = 0;
let indexWord = 0;
let canvas;
let words = ['example text'];
let num = 20;


function setup() {
 canvas = createCanvas(1112, 834,WEBGL);
 colorMode(HSB, 255);
  textTexture = createGraphics(2*PI*radius,2*PI*400);
  textTexture.clear()
  textTexture.colorMode(HSB, 100);
  textTexture.fill(255);
  textTexture.textSize(51);
  textTexture.translate(0,words.length*25);
  textAlign(CENTER, CENTER);
  	textFont('koshy');

	noStroke();
}

function draw() {
	background(0);
	orbitControl();

	let wave = (sin(frameCount * 0.005 + (0.005) * 0.005) * 1);
	textTexture.clear();
	
	for(let i = 0; i <=31; i++){
    textTexture.fill((hu + i*8)%255, 200, 255);
		textTexture.text(words[i%3], 0, i*70);
	}

	push();
	rotateZ(radians(-90));
	rotateX(radians(90));
	rotateY(PI/2 + frameCount*0.005);
	push();
	texture(textTexture);
	cylinder(radius, 1500, 180, 1, false, false);

	pop();
	pop();
	hu++;
  
  	for (let y = 0; y < height; y += height / num) {
		noStroke(0);
		fill(0);
		rect(-200, y, width, height / num);
	}
	
}