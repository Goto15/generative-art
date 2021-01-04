import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {
  constructor() { }
}

export const mondrian = {
  1: '#2034d6', // Blue
  2: '#f60201', // Red
  3: '#fded01', // Yellow
  4: '#ffffff', // White
  5: '#000000'  // Black
};

export const transparencies = [
  '0d', '1a', '26', '33', '40',
  '4d', '59', '66', '73', '80',
  '8c', '99', 'a6', 'b3', 'bf',
  'cc', 'd9', 'e6', 'f2', 'ff'
]

export const trueBlue = {
  1: '#0073cf'
}
