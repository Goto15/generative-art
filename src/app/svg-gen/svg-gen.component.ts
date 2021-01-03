import { Component, OnInit } from '@angular/core';
import { SVG, extend as SVGextend, Element as SVGElement } from '@svgdotjs/svg.js';

@Component({
  selector: 'app-svg-gen',
  templateUrl: './svg-gen.component.html',
  styleUrls: ['./svg-gen.component.sass']
})
export class SvgGenComponent implements OnInit {
  constructor() { }

  canvas = { width: 800, height: 800};
  svg : any;

  ngOnInit(): void {
    let svg = SVG().addTo('#canvas').size(this.canvas.width, this.canvas.height);
  }
}
