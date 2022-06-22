let width = 1500;
let height = 600;

let a = width / 2;
let b = height;
let ma = width / 2;
let mb = height;

let rings = 5;
let maxRings = 10;
let segments = 5;
let maxSegments = 10;
let subSegments = 3;
let maxSubSegments = 6;
let deg;
// let ang;
let c;

let sliderPs = [];
let sliders = [];

let colours = ['#193874', 'white', '#55B9E6', '#F5C342'];
let cc = 0;

function setup() {
  
  frameRate(5);

  c = createCanvas(width, height);

  createP();
  
  button = createButton('Download Radar Template');
  button.mousePressed(saveMe);
    createP();

  // ringDiv = createDiv('Rings: ' + rings);
  // slider = createSlider(1, maxRings, rings);
  // slider.style("width", "80px");

  createP('Choose number of segments:')
  segDiv = createDiv('Segments');
  slider2 = createSlider(1, maxSegments, segments);
  // slider2.changed(doDraw);

    checkbox = createCheckbox('Segmented outer ring?', false);

  createP('Choose number of sub-segments for each segment (NOTE: Segments number anti-clockwise, right to left)');

  for (let i = 0; i < maxSegments; i++) {
    sliderPs.push(createP('Segment ' + (i+1) + ' sub-segments'));
    sliders.push(createSlider(1, maxSubSegments, subSegments));
    sliderPs[i].hide();    
    sliders[i].hide();
    // sliders[i].changed(doDraw);
  }

}

function draw() {

  if (checkbox.checked()) {
    a = (rings-1)/rings * width / 2;
    b = (rings-1)/rings * height;
  }
  else {
    a = width / 2;
    b = height;
  }

  // ringDiv.html('Rings: ' + slider.value());
  segDiv.html('Segments: ' + slider2.value());

  for (let i = 0; i < maxSegments; i++) {
    sliderPs[i].hide();    
    sliders[i].hide();
  }
  for (let i = 0; i < slider2.value(); i++) {
    sliderPs[i].html('Segment ' + (i+1) + ' sub-segments: ' + sliders[i].value());
    sliderPs[i].show();    
    sliders[i].show();

  }

  translate(width / 2, height);
  // background(255);

  // rings = slider.value();
  segments = slider2.value();
  deg = 180 / segments;
  

  fill(colours[cc%colours.length]);
  stroke('white');
  for (let i = 0; i < rings - 2; i++) {
    arc(
      0,
      0,
      width * (1 - i * (1 / rings)),
      height * 2 * (1 - i * (1 / rings)),
      PI,
      TWO_PI,
      CHORD
    );
    cc++;
      fill(colours[cc%colours.length]);

  }

  noFill();
  stroke('green');

  for (let i = 0; i < slider2.value(); i++) {
    for (let j = 0; j < sliders[i].value(); j++) {

      let angleT = 180 / slider2.value()/sliders[i].value() * (j + 1) + i*180/slider2.value();
      // console.log('seg' + i + ', subseg ' + j + ', angle ' + angleT);
      line(
      0,
      0,
      a * cos(-radians(angleT)),
      b * sin(-radians(angleT))
    );

      // a * cos(-radians(180 / slider2.value()/sliders[i].value() * (j + 1))),
      // b * sin(-radians(180 / slider2.value()/sliders[i].value() * (j + 1)))

    }

  }

  
    fill(colours[cc%colours.length]);

  arc(
    0,
    0,
    width * (1 - (rings - 2) * (1 / rings)),
    height * 2 * (1 - (rings - 2) * (1 / rings)),
    PI,
    TWO_PI,
    CHORD
  );
  
  noFill();
  stroke('black');
  strokeWeight(2);
  for (let i = 0; i < segments; i++) {
    line(
      0,
      0,
      ma * cos(-radians(deg * (i + 1))),
      mb * sin(-radians(deg * (i + 1)))
    );
  }
  strokeWeight(1);
  
  stroke(255);
fill('#193874');
  arc(
    0,
    0,
    width * (1 - (rings - 1) * (1 / rings)),
    height * 2 * (1 - (rings - 1) * (1 / rings)),
    PI,
    TWO_PI,
    CHORD
  );
  noFill();
  cc++; // Complete bodge to stop flashing on frame refresh!!!
    
  
}

function saveMe() {
    saveCanvas();

}
