import { Component, OnInit } from '@angular/core';
import { SVG, extend as SVGextend, Element as SVGElement } from '@svgdotjs/svg.js';

@Component({
  selector: 'app-cellular-automata',
  templateUrl: './cellular-automata.component.html',
  styleUrls: ['./cellular-automata.component.sass']
})
export class CellularAutomataComponent implements OnInit {
  constructor() { }

  alivePercent = .45;
  canvas = {height: 600, width: 600};
  cells: Array<Array<any>>;
  cellSize: number = 10;
  neighbors: Array<Array<number>> =
    [ [-1, -1], [0,-1], [1, -1],
      [-1, 0],          [1, 0],
      [-1, 1],  [0, 1], [1, 1] ];
  svg: any;

  // TODO: Figure out how to set this to an object that can be mutated. Right now I can't persist
  // the imformation to modify it over steps.
  initGrid(svg: any, cellSize: number, alivePercent: number): any{
    let cell = {
      x: 0,
      y: 0,
      alive: false
    }
    let width = svg.width();
    let height = svg.height();
    let cells = Array.from({length: width/cellSize},
          () => Array.from({length: height/cellSize},
          () => cell));

    cells.forEach((row, index) => {
      row.forEach((coord, yIndex) => {
        coord.x = index * cellSize;
        coord.y = yIndex * cellSize;
        if(Math.random() <= alivePercent){
          svg.rect(cellSize, cellSize).attr({fill: '#232323', x: index*cellSize, y: yIndex*cellSize});
        }
      });
    });

    return cells;
  }

  ngOnInit(): void {
    this.svg = SVG().addTo('#canvas').size(this.canvas.width, this.canvas.height);
    this.initGrid(this.svg, this.cellSize, this.alivePercent);
  }

}
