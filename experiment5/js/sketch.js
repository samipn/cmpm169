function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    noStroke();
    colorMode(HSB);
    noFill();
    strokeWeight(8);
}
  
function draw() {
    background(255);
    orbitControl();
    noFill();
    stroke('brown');
    strokeWeight(0.5);
      
    sphere(50);
    
    orbitControl();                                          
    rotateY(0.5);
    for (let i = 0; i < 385; i = i + 5){                     
        stroke('white');                                    
        strokeWeight(8);                                     
        line(-600*sin(i*PI/12)*cos(i*PI/60), -600*sin(i*PI/12)*sin(i*PI/90), 650, 350*cos(i*PI/45), 350*sin(i*PI/45), -450);
    }
    
    orbitControl();
    
    curved(30, 12)
    curved(-30, -12)   
}
  
function curved(y, speed) {
    beginShape()
    for (let i = 0; i < 300; i++) {
      stroke(i % 60, 100, 80)
      vertex(cos(frameCount / speed + i / 3) * map(sin(i * 0.05 + frameCount / 32), -1, 1, 60, 300),
             y + 300 - i * 2,
             sin(frameCount / speed + i / 3) * map(sin(i * 0.05 + frameCount / 32), -1, 1, 60, 300))
    }
    endShape()
}