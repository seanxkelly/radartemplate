let width = 1000;
let eheight = width*0.45;
let cheight = width*0.5;
let height = eheight;

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
let subSegLineColour;

let sliderPs = [];
let sliders = [];

let colours = ['#193874', 'white', '#55B9E6', '#F5C342'];
let ringColours = ['#A6A6A6', '#D9D9D9', '#193874', 'white', '#55B9E6', '#F5C342', '#193874'];
let cc = 0;

function setup() {
  pixelDensity(2); // Witchcraft!!...to make it create same size image on different density/quality monitors!
  
  frameRate(5);

  c = createCanvas(width, height);

  createP();
  
  button = createButton('Download Radar Template Image');
  button.mousePressed(saveMe);

  createP('Radar style:');
  radio = createRadio();
  radio.option('Elliptical');
  radio.option('Semicircle');
  radio.selected('Elliptical');
  radio.input(changeShape);

  createP('Number of themes:')
  segDiv = createDiv('Themes');
  slider2 = createSlider(1, maxSegments, segments);

  checkbox = createCheckbox('Segmented outer rings?', true);
  checkbox2 = createCheckbox('Cisco product & services outer rings?', false);

    createP('Imperative line separator colour:');
    subSegLineColour = createColorPicker('green');

  createP('Choose number of imperatives for each theme (NOTE: Themes number anti-clockwise, right to left)');

  for (let i = 0; i < maxSegments; i++) {
    sliderPs.push(createP('Theme ' + (i+1) + ' imperatives'));
    sliders.push(createSlider(1, maxSubSegments, subSegments));
    sliderPs[i].hide();    
    sliders[i].hide();
  }

}



function draw() {




  // Two extra rings for Cisco stuff?
  if (checkbox2.checked()) {
    rings = 7;
  }
  else {
    rings = 5;
  }

  // How far do we draw the sub-segment lines?
  if (checkbox.checked()) {
    // Draw them all the way to the edge
    a = width / 2;
    b = height;
  }
  else {
    // Stop at Measures of Success
    if (checkbox2.checked()) {
      // There are 7 rings
      a = (rings-3)/rings * width / 2;
      b = (rings-3)/rings * height;
    }
    else {
      // There are 5 rings
      a = (rings-1)/rings * width / 2;
      b = (rings-1)/rings * height;
    }
  }

  // ringDiv.html('Rings: ' + slider.value());
  segDiv.html('Themes: ' + slider2.value());

  for (let i = 0; i < maxSegments; i++) {
    sliderPs[i].hide();    
    sliders[i].hide();
  }
  for (let i = 0; i < slider2.value(); i++) {
    sliderPs[i].html('Theme ' + (i+1) + ', imperatives: ' + sliders[i].value());
    sliderPs[i].show();    
    sliders[i].show();

  }

  translate(width / 2, height);
  // background(255);

  // rings = slider.value();
  segments = slider2.value();
  deg = 180 / segments;
  
  // Draw rings EXCEPT final inner ring
  if (checkbox2.checked()) {
    cc = 0;
  }
  else {
    cc = 2;
  }
  stroke('white');
  for (let i = 0; i < rings - 2; i++) {
    fill(ringColours[cc]);
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
  }



  // Draw sub-segment lines
  noFill();
  stroke(subSegLineColour.color());
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



  // Draw themes ring
  stroke('white');
  fill(ringColours[cc]);
  cc++;
  arc(
    0,
    0,
    width * (1 - (rings - 2) * (1 / rings)),
    height * 2 * (1 - (rings - 2) * (1 / rings)),
    PI,
    TWO_PI,
    CHORD
  );


  
  // Draw main segment (theme) lines
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


  
  // Draw centre ring
  stroke(255);
  fill(ringColours[cc]);
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
  // cc++; // Complete bodge to stop flashing on frame refresh!!!
    
  strokeWeight(3);
  stroke('black');
  line(-width/2,0,width/2,0); // Remember the translate above!!
  strokeWeight(1);
  
  
}

function saveMe() {
    saveCanvas(c, 'radartemplate');


}

function changeShape() {
  if (radio.value() == 'Elliptical') {
    height = eheight;
    mb = height;
  }
  else {
    height = cheight;
    mb = height;
  }
  resizeCanvas(width, height);
  draw();
}