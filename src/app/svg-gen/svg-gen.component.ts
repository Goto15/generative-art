import { Component, OnInit } from '@angular/core';
import { SVG, extend as SVGextend, Element as SVGElement } from '@svgdotjs/svg.js';
import { random } from 'canvas-sketch-util';
import { diamondFlower, mondrianShapes, drawBoard } from '../services/genuary2021/genuary2021.service';
import { randIntBetween } from '../services/math-helpers.service';
import { drawSaturn } from '../services/saturn.service';

@Component({
  selector: 'app-svg-gen',
  templateUrl: './svg-gen.component.html',
  styleUrls: ['./svg-gen.component.sass']
})
export class SvgGenComponent implements OnInit {
  constructor() { }

  sleep(ms){
    const now = Date.now();
    let curr = Date.now();
    do {
      curr = Date.now();
    } while (curr - now < ms)
  }

  border = 100;
  canvas = { width: 600, height: 600};
  cells = Array.from({length: this.canvas.width/10}, () => Array.from({length: this.canvas.height/10}, () => 0));
  svg : any;

  ngOnInit(): void {
    this.svg = SVG().addTo('#canvas').size(this.canvas.width, this.canvas.height);
  }
}
