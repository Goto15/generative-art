import { Component, OnInit } from '@angular/core';
import { SVG, extend as SVGextend, Element as SVGElement } from '@svgdotjs/svg.js';
import { rule30 } from '../services/genuary2021/genuary2021.service';
import { drawSaturn } from '../services/saturn.service';

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
    rule30(svg, 20);
  }
}
