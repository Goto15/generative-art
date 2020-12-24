import { Component, OnInit } from '@angular/core';
import { SVG, extend as SVGextend, Element as SVGElement } from '@svgdotjs/svg.js';

@Component({
  selector: 'app-svg-gen',
  templateUrl: './svg-gen.component.html',
  styleUrls: ['./svg-gen.component.sass']
})
export class SvgGenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let draw = SVG().addTo('body').size(500,500);
    let rect = draw.rect(100, 100).attr({ fill: '#f06' });
  }

}
