import { Component, OnInit } from '@angular/core';
import { SVG, extend as SVGextend, Element as SVGElement } from '@svgdotjs/svg.js';

@Component({
  selector: 'app-svg-gen',
  templateUrl: './svg-gen.component.html',
  styleUrls: ['./svg-gen.component.sass']
})
export class SvgGenComponent implements OnInit {
  constructor() { }

  border = 100;
  canvas = { width: 600, height: 600};
  cells = Array.from({length: this.canvas.width/10}, () => Array.from({length: this.canvas.height/10}, () => 0));
  svg : any;
  pointArray = [[100, 100], [0, 100], [0, 0], [100, 0]];

  ngOnInit(): void {
    this.svg = SVG().addTo('#canvas').size(this.canvas.width, this.canvas.height);
  }
}
