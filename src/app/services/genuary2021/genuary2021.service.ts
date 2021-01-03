import { Injectable } from '@angular/core';
import { randIntBetween } from '../math-helpers.service';

@Injectable({
  providedIn: 'root'
})
export class Genuary2021Service {
  constructor() { }
}

// TODO: Honestly this should be in a colors service
export let mondrianColors = {
  1: '#2034d6',
  2: '#f60201',
  3: '#fded01',
  4: '#ffffff',
  5: '#000000'
};

// This was for day 1 triple nested loops. I cheated a little bit by only using 2
export function mondrianShapes(svg){
  let canvasSize = { x: svg.width(), y: svg.height() };
  // TODO: these two should be derived or passed as an argument
  let border = 100;
  let offset = 100;
  for(let i = border; i < canvasSize.x - border; i += offset) {
    for(let j = border; j < canvasSize.y - border; j += offset) {
      if(randIntBetween(1, 3) === 1) {
        svg.circle(offset).attr({ cx: i+(offset/2), cy: j, fill: mondrianColors[randIntBetween(1, 6)]});
      } else {
        svg.rect(offset, offset).attr({fill: mondrianColors[randIntBetween(1, 6)], x: i, y: j});
      }
    }
  }
}