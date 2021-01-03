import { Component, OnInit } from '@angular/core';
import { SVG, extend as SVGextend, Element as SVGElement } from '@svgdotjs/svg.js';
import { random } from 'canvas-sketch-util'

@Component({
  selector: 'app-svg-gen',
  templateUrl: './svg-gen.component.html',
  styleUrls: ['./svg-gen.component.sass']
})
export class SvgGenComponent implements OnInit {
  constructor() { }

  canvas = { width: 800, height: 800};
  svg : any;

  branchAngles = {
    1: [[75, 105]],
    2: [[30, 60], [120, 150]],
    3: [[50, 70], [80, 100], [110, 130]]
  }

  degreeToRadian(degree){
    return degree * (Math.PI / 180);
  }

  randIntBetween(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.floor(min));
  }

  generateRandomGrey(){
    let hexChars = '89ABCD';
    let grey = hexChars[this.randIntBetween(0, hexChars.length -1)] + hexChars[this.randIntBetween(0, hexChars.length -1)];
    let red = hexChars[this.randIntBetween(0, hexChars.length -1)] + hexChars[this.randIntBetween(0, hexChars.length -1)];
    return '#' + red + red + grey;
  }

  drawLine(svg, startX, startY, length, rotation = 90, branchingFactor = 1, stroke = {color: '#d2691e', width: 10, linecap: 'round'}){
    // Make sure the length of the line doesn't get too small and that all the branches stay in frame
    if(startY < 50 || /*startX < 50 || startX > 450 ||*/ length < 2) {
      // Create the leaves of the tree
      for(let i = 0; i < 25; i += 1){
        // Create random number within a circle
        let x = startX + (30 * (Math.sqrt(Math.random())) * Math.cos(this.randIntBetween(0, Math.PI)));
        let y = startY + (30 * (Math.sqrt(Math.random())) * Math.sin(this.randIntBetween(0, Math.PI)));
        let rotate = this.randIntBetween(0, 180);
        svg.ellipse(5,10).attr({cx: x, cy: y}).rotate(rotate).fill('#3b7a57');
      }
      return null;
    }

    /* Convert rotation degrees to rads since Math.cos()/Math.sin() only works with rads.
       Calculate new end points with rotation using length ± Math.cos/sin * length of the line. Pulled from:
       https://www.codeproject.com/Questions/738309/How-to-draw-a-line-when-starting-point-angle-lengt */
    let endX = startX - Math.cos(this.degreeToRadian(rotation)) * length;
    let endY = startY - Math.sin(this.degreeToRadian(rotation)) * length;
    // TODO: need to do a shallow assignment since I don't really need to copy over the color or linecap
    let newStroke = {color: stroke.color, width: stroke.width - 1 > 0 ? stroke.width - 2 : 1, linecap: stroke.linecap}
    for(let i = 0; i < branchingFactor; i += 1){
      svg.line(startX, startY, endX, endY).stroke(stroke);
      let newAngle = this.randIntBetween(this.branchAngles[branchingFactor][i][0], this.branchAngles[branchingFactor][i][1])
      this.drawLine(svg, endX, endY, length * .5, newAngle, branchingFactor, newStroke);
    }
  }

  drawTree(svg){
    let startPoint = { x: 200, y: 500 };
    this.drawLine(svg, startPoint.x, startPoint.y, 200);
  }

  // TODO: clean this bad boy up.
  drawPlanet(svg, centerX, centerY){
    svg.attr({background: '#232323'});
    /* *Deep sigh* Since SVG has no z axis everything is painted onto it like a painters' brush
       Functionally this means that things must be drawn onto the canvas in the z order they
       should appear. Meaning the planet in the middle of the rings must be drawn after the
       rings behind it and before the rings in front of it. That's what the next 10ish lines
       are for */
    let lineSlope = this.canvas.height / this.canvas.width;
    console.log(lineSlope);

    let lengths = [];
    for(let i = 0; i < 10; i += 1) lengths.push(this.randIntBetween(100, 225));

    let rings = []
    // TODO: actually solve the perspective issues here. At different degrees (literally not 45)
    // the particles can end up on the wrong z level
    lengths.forEach(l => {
      for(let i = 0; i < 500; i += 1){
        let d = this.randIntBetween(0,360);
        let endX = (centerX + this.randIntBetween(-6, 6)) - Math.cos(this.degreeToRadian(d-25)) * l;
        let endY = (centerY + this.randIntBetween(-6, 6)) - Math.sin(this.degreeToRadian(d+45)) * l;
        // TODO: figure out why I can't push this as an object into the array.
        // For now [0] is x and [1] is y
        rings.push([endX, endY]);
      }
    })

    let backRing = [];
    let frontRing = [];
    rings.forEach(particle => {
      // This figures out if the ring particle is above or below the line of the perspective
      particle[1] < lineSlope * particle[0] ? backRing.push(particle) : frontRing.push(particle);
    })

    backRing.forEach(p => {
      let w = random.noise2D(p[0], p[1], 10, 10);
      svg.circle(w).attr({ fill: this.generateRandomGrey(), cx: p[0], cy: p[1]});
    });

    svg.circle(150).attr({ cx: centerX, cy: centerY, fill: '#d46133'});

    frontRing.forEach(p => {
      let w = random.noise2D(p[0], p[1], 10, 10);
      svg.circle(w).attr({ fill: this.generateRandomGrey(), cx: p[0], cy: p[1]});
    });
  }

  tripleNestedLoop(svg){
    let colors = {
      1: '#2034d6',
      2: '#f60201',
      3: '#fded01',
      4: '#ffffff'
    };

    let bw = {
      1: '#ffffff',
      2: '#000000'
    }

    let border = 100;
    let offset = 100;
    for(let i = border; i < this.canvas.width - border; i += offset) {
      for(let j = border; j < this.canvas.height - border; j += offset) {
        if(this.randIntBetween(1,3) === 1) {
          svg.circle(offset).attr({fill: bw[this.randIntBetween(1, 3)], cx: i+(offset/2), cy: j});
        } else {
          svg.rect(offset, offset).attr({fill: bw[this.randIntBetween(1, 3)], x: i, y: j});
        }
      }
    }
  }

  ngOnInit(): void {
    let svg = SVG().addTo('#canvas').size(this.canvas.width, this.canvas.height);
    this.tripleNestedLoop(svg);
  }
}
