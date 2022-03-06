let grid;
let size = 7;

function setup() {
  createCanvas(385, 390);
  grid = new gridCA(width, height, size);
}

function draw() {
  grid.drawGrid();
  grid.countAllNeighbors();
  grid.updateStates();
  grid.addCircle(12);
  // grid.addCenter();
  // grid.addCircle(5);
}


// CA class defining each tile on the grid by its position, current state and the number of 'alive' neighbors
class CA {
  constructor(x, y, size, state, neighbors) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.state = state;
    this.neighbors = neighbors;
  }
  
  // Drawing each tile as a rectangle. Color is determined by its state
  drawCAcolor() {
    if(this.state == 1) {
      fill(color("#023047"));
    } else {
      fill(color("#FFB703"));
    }
    noStroke();
    rect(this.x, this.y, this.size, this.size)
  }
  
  drawCA() {
    if(this.state == 1) {
      fill(245);
    } else {
      fill(20);
    }
    noStroke();
    rect(this.x, this.y, this.size, this.size)
  }
  
  // Updating the tile's state based on the GoL rules
  updateCA(count) {
    if(this.state == 1 && (count < 2 || count > 3)) {
      this.state = 0;
    } 
    if(this.state == 1 && (count == 2 || count == 3)) {
      this.state = 1;
    }
    if(this.state == 0 && count == 3) {
      this.state = 1;
    }
  }
}

// gridCA class to create the grid of CA tiles
class gridCA {
  constructor(width, height, size) {
    this.width = width/size;
    this.height = height/size;
    
    this.grid = [];
    for(let i = 0; i < height/size; i++) {
      let row = [];
      for(let j = 0; j < width/size; j++) {
        row[j] = new CA(j * size, i * size, size, random([0]), NaN);
      }
      this.grid[i] = row;
    }
  }
  
  drawGrid() {
    for(let i = 0; i < this.height; i++) {
      for(let j = 0; j < this.width; j++) {
        this.grid[i][j].drawCA();
      }
    }
  }
   
  countAllNeighbors() {
    for(let x = 0; x < this.height; x++) {
      for(let y = 0; y < this.width; y++) {
        let count = countNeighbors(this.grid, x, y)
        this.grid[x][y].neighbors = count
      }
    }
  }
  
  updateStates() {
    for(let i = 0; i < this.height; i++) {
      for(let j = 0; j < this.width; j++) {
        this.grid[i][j].updateCA(this.grid[i][j].neighbors)
      }
    }
  }
    
  addCenter() {
    let center = createVector(floor(this.width/2), floor(this.height/2));
    this.grid[center.y][center.x].state = 1;
  }
  
  addCircle(radius) {
    let center = createVector(floor(this.width/2), floor(this.height/2));
    let indices = circleIndices(center, radius);
    for(let i = 0; i < indices.length; i++) {
      let x = indices[i].x;
      let y = indices[i].y;
      this.grid[y][x].state = 1;
    }
  }
}


// HELPER FUNCTIONS
function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + grid.length) % grid.length;
      let row = (y + j + grid[0].length) % grid[0].length;
      sum += grid[col][row].state;
    }
  }
  sum -= grid[x][y].state;
  return sum;
}

function circleIndices(center, radius) {
  let indices = [];
  for(let x = 0; x < width/size; x++) {
    for(let y = 0; y < height/size; y++) {
      let formula = pow((x-center.x), 2) + pow((y-center.y), 2);
      let r2 = pow(radius,2);
      if(formula > r2 -3 && formula < r2 + 3) {

        append(indices, createVector(x,y));
      }
    }
  }
  return indices;
}
