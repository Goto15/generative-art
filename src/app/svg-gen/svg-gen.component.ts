import { Component, OnInit } from '@angular/core';
import { SVG, extend as SVGextend, Element as SVGElement } from '@svgdotjs/svg.js';
import { drawSaturn } from '../services/saturn.service';
import { mondrianShapes } from '../services/genuary2021/genuary2021.service';

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

  // drawLine(svg, startX, startY, length, rotation = 90, branchingFactor = 1, stroke = {color: '#d2691e', width: 10, linecap: 'round'}){
  //   // Make sure the length of the line doesn't get too small and that all the branches stay in frame
  //   if(startY < 50 || /*startX < 50 || startX > 450 ||*/ length < 2) {
  //     // Create the leaves of the tree
  //     for(let i = 0; i < 25; i += 1){
  //       // Create random number within a circle
  //       let x = startX + (30 * (Math.sqrt(Math.random())) * Math.cos(this.randIntBetween(0, Math.PI)));
  //       let y = startY + (30 * (Math.sqrt(Math.random())) * Math.sin(this.randIntBetween(0, Math.PI)));
  //       let rotate = this.randIntBetween(0, 180);
  //       svg.ellipse(5,10).attr({cx: x, cy: y}).rotate(rotate).fill('#3b7a57');
  //     }
  //     return null;
  //   }

  //   /* Convert rotation degrees to rads since Math.cos()/Math.sin() only works with rads.
  //      Calculate new end points with rotation using length ± Math.cos/sin * length of the line. Pulled from:
  //      https://www.codeproject.com/Questions/738309/How-to-draw-a-line-when-starting-point-angle-lengt */
  //   let endX = startX - Math.cos(this.degreeToRadian(rotation)) * length;
  //   let endY = startY - Math.sin(this.degreeToRadian(rotation)) * length;
  //   // TODO: need to do a shallow assignment since I don't really need to copy over the color or linecap
  //   let newStroke = {color: stroke.color, width: stroke.width - 1 > 0 ? stroke.width - 2 : 1, linecap: stroke.linecap}
  //   for(let i = 0; i < branchingFactor; i += 1){
  //     svg.line(startX, startY, endX, endY).stroke(stroke);
  //     let newAngle = this.randIntBetween(this.branchAngles[branchingFactor][i][0], this.branchAngles[branchingFactor][i][1])
  //     this.drawLine(svg, endX, endY, length * .5, newAngle, branchingFactor, newStroke);
  //   }
  // }

  // drawTree(svg){
  //   let startPoint = { x: 200, y: 500 };
  //   this.drawLine(svg, startPoint.x, startPoint.y, 200);
  // }

  // tripleNestedLoop(svg){
  //   let colors = {
  //     1: '#2034d6',
  //     2: '#f60201',
  //     3: '#fded01',
  //     4: '#ffffff'
  //   };

  //   let bw = {
  //     1: '#ffffff',
  //     2: '#000000'
  //   }

  //   let border = 100;
  //   let offset = 100;
  //   for(let i = border; i < this.canvas.width - border; i += offset) {
  //     for(let j = border; j < this.canvas.height - border; j += offset) {
  //       if(this.randIntBetween(1,3) === 1) {
  //         svg.circle(offset).attr({fill: bw[this.randIntBetween(1, 3)], cx: i+(offset/2), cy: j});
  //       } else {
  //         svg.rect(offset, offset).attr({fill: bw[this.randIntBetween(1, 3)], x: i, y: j});
  //       }
  //     }
  //   }
  // }

  ngOnInit(): void {
    let svg = SVG().addTo('#canvas').size(this.canvas.width, this.canvas.height);
    mondrianShapes(svg);
  }
}
