let data = []

function setup() {
  createCanvas(410, 300)
 
  data = [
    {size:68, label:"January"},
    {size:68, label:"February"},
    {size:70, label:"March"},
    {size:88, label:"April"},
    {size:87, label:"May"},
    {size:88, label:"June"},
    {size:94, label:"July"},
    {size:94, label:"August"},
    {size:85, label:"September"},
    {size:95, label:"October"},
    {size:82, label:"November"},
    {size:72, label:"December"},
    ]
  
  colors = [color(55, 255, 0),
          color(204, 255, 0),
          color(238, 255, 0),
          color(255, 212, 0),
          color(255, 182, 0),
          color(255, 157, 0),
          color(255, 123, 0),
          color(255, 97, 0),
          color(255, 63, 0),
          color(255, 16, 0)]

  noStroke()
}

function draw() {
  background('green')
  textSize(20)
  fill(255)
  textStyle(BOLD)
  text('Highest Temperature 2023 (Santa Cruz)',30,40)
  textSize(12)
  push()
  translate(55,210)
  data.forEach((el,i) => {
      push()
  		translate(i * 25, 0)
      let c = floor(map(el.size,23,99,0,9))
    	fill(colors[c])
      rect(0,0,20,-el.size*1.5)
      fill(28, 110, 127)
    	push()
      translate(0,10)
      text(el.size,3.5,-18)
      rotate(HALF_PI)
      fill(255)
      textStyle(ITALIC)
      text(el.label,0,-6)
    	pop()
  		pop()
	})
  pop()
}