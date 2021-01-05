import { Component, OnInit } from '@angular/core';
import { SVG, extend as SVGextend, Element as SVGElement } from '@svgdotjs/svg.js';
import { diamondFlower, mondrianShapes } from '../services/genuary2021/genuary2021.service';
import { randIntBetween } from '../services/math-helpers.service';
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
    let border = 100;
    for( let i = 1; i < 100; i += 1){
      let petals = randIntBetween(4, 8);
      let size = 10;
      let centerX = randIntBetween(border + size, this.canvas.width/2);
      let centerY = randIntBetween(border + size, this.canvas.height/2);
      diamondFlower(svg, petals, size, { x: centerX, y: centerY });
      diamondFlower(svg, petals, size, { x: this.canvas.width - centerX, y: centerY });
      diamondFlower(svg, petals, size, { x: this.canvas.width - centerX, y: this.canvas.width - centerY });
      diamondFlower(svg, petals, size, { x: centerX, y: this.canvas.height - centerY });
    }
  }
}
