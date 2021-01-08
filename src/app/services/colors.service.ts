import { Injectable } from '@angular/core';
import { randIntBetween } from '../services/math-helpers.service';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {
  constructor() { }
}

export const calmCream = {
  
}

export const mondrian = {
  1: '#2034d6', // Blue
  2: '#f60201', // Red
  3: '#fded01', // Yellow
  4: '#ffffff', // White
  5: '#000000'  // Black
};

/*  These are 2 digit hex code transparencies to be concatenated to 6 digit hex codes starting from
    0% and incrementing by 5% up to 100% */
export const transparencies = [
  '0d', '1a', '26', '33', '40',
  '4d', '59', '66', '73', '80',
  '8c', '99', 'a6', 'b3', 'bf',
  'cc', 'd9', 'e6', 'f2', 'ff'
]

export const trueBlue = {
  1: '#0073cf'
}

export function randomGrey(){
  let chars = '0123456789ABCDEF';
  let grey = chars[randIntBetween(0, chars.length -1)] + chars[randIntBetween(0, chars.length -1)];
  return '#' + grey + grey + grey;
}