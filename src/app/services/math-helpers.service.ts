import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MathHelpersService {
  constructor() { }
}

/* The min value is inclusive the max value is not */
export function randIntBetween(min, max) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.floor(min));
}

export function degreeToRadian(degree){
  return degree * (Math.PI / 180);
}

export function radianToDegree(radian){
  return radian * (180 / Math.PI);
}

export function endFromPointAndDegree(x, y, degree, length){
  return {x: x - Math.cos(degreeToRadian(degree)) * length, y: y - Math.sin(degreeToRadian(degree)) * length };
}

export function pointTranslation(pointMatrix : Array<Array<number>>, degree = 30, point = {x: 0, y: 0}){
    let newArray = []
    pointMatrix.forEach(point => {
      let rads = degreeToRadian(degree);
      let x = point[0]*Math.cos(rads) - point[1]*Math.sin(rads);
      let y = point[0]*Math.sin(rads) + point[1]*Math.cos(rads);
      newArray.push([x, y]);
    });

    /* This is the point around which everything is rotated */
    newArray.forEach(point =>{
      point[0] += this.canvas.width/3;
      point[1] += this.canvas.height/3;
    });

    return newArray;
  }