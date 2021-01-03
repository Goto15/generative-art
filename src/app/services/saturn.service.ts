import { Injectable } from '@angular/core';
import { degreeToRadian, randIntBetween } from './math-helpers.service';
import { random } from 'canvas-sketch-util';

@Injectable({
  providedIn: 'root'
})
export class SaturnService {
  constructor() { }
}

export function drawSaturn(svg, centerX, centerY){
  /* *Deep sigh* Since SVG has no z axis everything is painted onto it like a painters'
      brush. Functionally this means that things must be drawn onto the canvas in the z
      order they should appear. Meaning the planet in the middle of the rings must be
      drawn after the rings behind it and before the rings in front of it. That's what
      the next 10ish lines are for */
  let maxX = svg.width();
  let maxY = svg.height();
  let lineSlope = svg.height() / svg.width();

  let lengths = [];
  // TODO: This should be some offset between the radius of the planet and the edge of the
  // canvas
  for(let i = 0; i < 12; i += 1) {
    lengths.push(randIntBetween(100, Math.min(maxX/2-100, maxY/2-100)));
  }

  /*  TODO: actually solve the perspective issues here. At different degrees (literally
      anything not on the same slope as (0, 0) to (maxX, maxY)) the particles can end up
      on the wrong z level. Not only that, but the x and y offsets can also cause problems.
      It just needs to be a little more robust.*/
  let backRing = [];
  let frontRing = [];
  lengths.forEach(l => {
    for(let i = 0; i < 500; i += 1){
      /*  This randomizes where the particles go on the rings around the planet. Evenly
          distributed degrees cause rays emanating from the planet */
      let degree = randIntBetween(0,360);
      let endX = (centerX + randIntBetween(-6, 6)) - Math.cos(degreeToRadian(degree-45)) * l;
      let endY = (centerY + randIntBetween(-6, 6)) - Math.sin(degreeToRadian(degree+20)) * l;

      if(endY < (lineSlope * endX)){
        backRing.push([endX, endY]);
      } else {
        frontRing.push([endX, endY]);
      }
    }
  });

  /*  The order here matters. As described above, SVG z layers things from the first
      element added to the last. First in gets drawn over by everything that follows it */
  backRing.forEach(particle => {
    let width = random.noise2D(particle[0], particle[1], 10, 10);
    svg.circle(width).attr({ cx: particle[0], cy: particle[1], fill: randomGrey() });
  });

  //  Draw the actual planet
  //  TODO: allow the planet to accept a diameter size and fill
  svg.circle(150).attr({ cx: centerX, cy: centerY, fill: '#000000' });

  frontRing.forEach(particle => {
    let w = random.noise2D(particle[0], particle[1], 10, 10);
    svg.circle(w).attr({ cx: particle[0], cy: particle[1], fill: randomGrey() });
  })
}

//  TODO: Honestly needs to be in a color service
export function randomGrey(){
  let chars = '0123456789ABCDEF';
  let grey = chars[randIntBetween(0, chars.length -1)] + chars[randIntBetween(0, chars.length -1)];
  return '#' + grey + grey + grey;
}