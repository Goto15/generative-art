import { Injectable } from '@angular/core';

import { degreeToRadian, randIntBetween } from './math-helpers.service';

@Injectable({
  providedIn: 'root'
})
export class TreeService {
  constructor() { }
}

export const branchAngles = {
  1: [[75, 105]],
  2: [[30, 60], [120, 150]],
  3: [[50, 70], [80, 100], [110, 130]]
}

export function drawTree(svg, startX, startY, length, rotation = 90, branchingFactor = 1, stroke = {color: '#d2691e', width: 10, linecap: 'round'}){
    // Make sure the length of the line doesn't get too small and that all the branches stay in frame
    // TODO: this get very slow and weird at larger canvas sizes. It needs some optimization
    // and prettification
    if(startY < 50 || /*startX < 50 || startX > 450 ||*/ length < 2) {
      // Create the leaves of the tree
      for(let i = 0; i < 25; i += 1){
        // Create random number within a circle
        let x = startX + (30 * (Math.sqrt(Math.random())) * Math.cos(randIntBetween(0, Math.PI)));
        let y = startY + (30 * (Math.sqrt(Math.random())) * Math.sin(randIntBetween(0, Math.PI)));
        let rotate = randIntBetween(0, 180);
        svg.ellipse(5,10).attr({cx: x, cy: y}).rotate(rotate).fill('#3b7a57');
      }
      return null;
    }

    /* Convert rotation degrees to rads since Math.cos()/Math.sin() only works with rads.
       Calculate new end points with rotation using length ± Math.cos/sin * length of the line. Pulled from:
       https://www.codeproject.com/Questions/738309/How-to-draw-a-line-when-starting-point-angle-lengt */
    let endX = startX - Math.cos(degreeToRadian(rotation)) * length;
    let endY = startY - Math.sin(degreeToRadian(rotation)) * length;
    // TODO: need to do a shallow assignment since I don't really need to copy over the color or linecap
    let newStroke = {color: stroke.color, width: stroke.width - 1 > 0 ? stroke.width - 2 : 1, linecap: stroke.linecap}
    for(let i = 0; i < branchingFactor; i += 1){
      svg.line(startX, startY, endX, endY).stroke(stroke);
      let newAngle = randIntBetween(branchAngles[branchingFactor][i][0], branchAngles[branchingFactor][i][1])
      drawTree(svg, endX, endY, length * .5, newAngle, branchingFactor, newStroke);
    }
  }