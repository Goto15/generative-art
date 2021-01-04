import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MathHelpersService {
  constructor() { }
}

// The min value is inclusive the max value is not
export function randIntBetween(min, max) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.floor(min));
}

export function degreeToRadian(degree){
  return degree * (Math.PI / 180);
}
