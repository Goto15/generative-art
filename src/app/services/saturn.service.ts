import { Injectable } from '@angular/core';
import { degreeToRadian, randIntBetween } from './math-helpers.service';
import { random } from 'canvas-sketch-util';
import { randomGrey } from '../services/colors.service';

@Injectable({
  providedIn: 'root'
})
export class SaturnService {
  constructor() { }
}

// TODO: Maybe clean up these parameters?
export function drawSaturn(svg, centerX, centerY, diameter = 150, ringDiameter = Math.min(svg.width()/2, svg.height()/2), fill = '#000000'){
  /* *Deep sigh* Since SVG has no z axis everything is painted onto it like a painters'
      brush. Functionally this means that things must be drawn onto the canvas in the z
      order they should appear. Meaning the planet in the middle of the rings must be
      drawn after the rings behind it and before the rings in front of it. That's what
      the next 10ish lines are for */
  let lineSlope = svg.height() / svg.width();

  let lengths = [];
  // TODO: maybe accept the number of rings and starting distance to make
  for(let i = 0; i < 25; i += 1) {
    lengths.push(randIntBetween(diameter/2, ringDiameter));
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

  /*  Draw the actual planet */
  svg.circle(diameter).attr({ cx: centerX, cy: centerY, fill: fill });

  /* Finally fill in the front rings */
  frontRing.forEach(particle => {
    let w = random.noise2D(particle[0], particle[1], 10, 10);
    svg.circle(w).attr({ cx: particle[0], cy: particle[1], fill: randomGrey() });
  })
}