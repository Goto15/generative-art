import { Injectable } from '@angular/core';
import { endFromPointAndDegree, randIntBetween } from '../math-helpers.service';
import { random } from 'canvas-sketch-util';

import { mondrian, transparencies } from '../colors.service';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';

@Injectable({
  providedIn: 'root'
})
export class Genuary2021Service {
  constructor() { }
}

/* Day 1 triple nested loops. I cheated a little bit by only using 2 */
export function mondrianShapes(svg, rows = 2, columns = rows, border = 100){
  let canvasSize = { x: svg.width(), y: svg.height() };

  /*  This calculates the amount of space each shape gets on the grid or, more
      mathematically, it creates the dimensions of each cell */
  let xOffset = (canvasSize.x  - (2 * border))/columns;
  let yOffset = (canvasSize.y - (2 * border))/rows;

  for(let i = border; i < canvasSize.x - border; i += xOffset) {
    for(let j = border; j < canvasSize.y - border; j += yOffset) {
      /*  cx and cy set the center of the circle. Not adjusting the cy creates overlap with
          the shape above it and I think that looks better than nicely center circles */
      if(randIntBetween(1, 3) === 1) {
        svg.circle(xOffset).attr({ cx: i+(xOffset/2), cy: j, fill: mondrian[randIntBetween(1, 6)]});
      } else {
        svg.rect(xOffset, yOffset).attr({fill: mondrian[randIntBetween(1, 6)], x: i, y: j});
      }
    }
  }
}

/* Day 2 Rule 30: Basic cellular automata */
export function rule30(svg, offset = 10, border = 100, startingCells = 4, fill = '#ffffff'){
  let canvasSize = { x: svg.width(), y: svg.height() };

  /*  Since a circle's positioning is determined by their center coords, they need an offset
      that is the center coords of the cell or offset/2 */
  let circleOffset = offset/2;

  /*  In order to create the Rule 30 'pattern' we need to keep track of the position of each
      cell in the grid and whether it should be filled in or not. Since the grid is going to
      be offset by offset cells we can divide the width and height by the offset. To keep it
      simple true will be filled in while false will not */
  let grid = new Array(canvasSize.x/offset).fill(false);
  grid = grid.map(column => column = new Array(canvasSize.y / offset).fill(false));

  /*  Create a few true cells to be filled in so it's more interesting than a single cell at
      [0][0]. */
  let chosenCells = [0];
  grid[0][0] = true;
  for(let i = 0; i < startingCells; i += 1){
    let rand = randIntBetween(1, grid.length);
    if(chosenCells.indexOf(rand) === -1){
      chosenCells.push(rand);
      grid[rand][0] = true;
    } else {
      /* Reset the random round */
      i -= 1;
    }
  }

  /*  We're using two iterators so we can keep track of where we are on the grid _and_
      where we are as coordinates on the SVG. We're also starting and ending at the border
      to allow for some A E S T H E T I C white space */
  for(let x = 1, xCell = border; xCell < canvasSize.x - border; x += 1, xCell += offset){
    for(let y = 1, yCell = border; yCell < canvasSize.y - border; y += 1, yCell += offset){
      /*  This is where the Rule 30 comes in. For a logical explanation of it see:
          https://en.wikipedia.org/wiki/Rule_30#Rule_set
          This is a disgusting implementation based only on the true cases
          TODO: There's probably a way to generate which direction on the grid it behaves */
      let onlyLeft =     grid[x-1][y-1] && !grid[x][y-1] && !grid[x+1][y-1];
      let onlyCenter =  !grid[x-1][y-1] &&  grid[x][y-1] && !grid[x+1][y-1];
      let onlyRight =   !grid[x-1][y-1] && !grid[x][y-1] &&  grid[x+1][y-1];
      let centerRight = !grid[x-1][y-1] &&  grid[x][y-1] &&  grid[x+1][y-1];

      if(onlyLeft || onlyCenter || onlyRight || centerRight) {
        grid[x][y] = true;
        transparencies.forEach((transparency, index) => {
          /*  Stagger the coordinates of the circle to create a shadow */
          let centerX = xCell + circleOffset - index;
          let centerY = yCell + circleOffset - index;
          /*  Create the actual circle by layering the shadow/outline first and then
              'painting' over it with the color filled circle */
          let transFill = fill + transparency;
          let outline = '#000000' + transparency;
          /*  Order is important here like it is with every drawing operation on an SVG */
          svg.circle(offset).attr({cx: centerX - 1, cy: centerY - 1, fill: outline})
          svg.circle(offset).attr({cx: centerX, cy: centerY, fill: transFill });
        });
      }
    }
  }
}

/* Day 4 Small areas of symmetry */
export function diamondFlower(svg, petals = 4, size = 100, centerCoords = { x: svg.width()/2, y: svg.height()/2}){
  let degreeRotation = 360/petals;
  let halfRotation = degreeRotation/2;

  /* As with everything in SVG order is important */
  let points = [[centerCoords.x, centerCoords.y]]
  let rightPoint = endFromPointAndDegree(centerCoords.x, centerCoords.y, degreeRotation + halfRotation, size);
  let leftPoint = endFromPointAndDegree(centerCoords.x, centerCoords.y, degreeRotation - halfRotation, size);
  points.push([rightPoint.x, rightPoint.y]);
  points.push([centerCoords.x, centerCoords.y + size]);
  points.push([leftPoint.x, leftPoint.y]);

  let fillColor = '#ffffff';
  for(let i = 0; i < petals; i += 1){
    let anchorX = points[0][0];
    let anchorY = points[0][1];
    svg.polygon(points).fill(fillColor).rotate(degreeRotation * i, anchorX, anchorY);
  }
}

/* Day 5 Code Golf Conway's Game of Life */
function sumOfNeighbors(cells, coords, neighbors){
  let sum = 0;
  neighbors.forEach(n => sum += cells[coords.x + n.x][coords.y + n.y]);
  return sum;
}

/* Genuary Day 5: Code Golf Conway's Game of Life */
export function drawBoard(svg, cells, border = 100){
  /* Create the 2D array of next generations' live cells */
  let nextGen = Array.from({length: cells.length}, () => Array.from({length: cells[0].length}, () => 0));

  /* The relative x and y positions of a cell's neighbors */
  let neighborsArray = [{x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1},
                        {x: -1, y: 0},                 {x: 1, y: 0},
                        {x: -1, y: 1},  {x: 0, y: 1},  {x: 1, y: 1}];

  /* Set the cells that are alive next generation */
  for(let i = 1; i < cells.length - 1; i += 1){
    for(let j = 1; j < cells[i].length - 1; j += 1){
      let neighbors = sumOfNeighbors(cells, {x: i, y: j}, neighborsArray);
      if(neighbors === 3 || (cells[i][j] === 1 && neighbors === 2)) {
        nextGen[i][j] = 1;
      } else {
        nextGen[i][j] = 0;
      }
    }
  }

  /* Draw them bois */
  for(let i = 0; i < nextGen.length; i += 1){
    for(let j = 1; j < nextGen[0].length; j += 1){
      let fill = nextGen[i][j] ? '#52597C': '#fae9d7';
      svg.rect(10,10).attr({fill: fill, x: i*10, y: j*10 });
    }
  }

  return nextGen;
}

/* Day 7 Curves Only */
export function curvesOnly(svg, border = 100){
  let canvas = {x: svg.width(), y: svg.height()};
  let start = {x: canvas.x*.5, y: canvas.y*.5}

  for(let i = canvas.x - border; i > border; i -= 25){
    let rand = randIntBetween(0, 3);
    if(rand === 0){
      svg.circle(i).fill('#52597C').attr({cx: start.x + i/25, cy: start.y});
    } else if (rand === 1){
      svg.circle(i).fill('#fae9d7').attr({cx: start.x - i/25, cy: start.y});
    } else {
      /* Create the rays from a starting point to the edge of the canvas */
      let rays = 72;
      for(let j = 0; j < rays; j += 1){
        let end = endFromPointAndDegree(start.x, start.y, j*(360/rays), (canvas.x - (2 * border))/2);
        svg.line(start.x, start.y, end.x, end.y).stroke({color: '#52597C', width: 1});
      }
    }
  }
}