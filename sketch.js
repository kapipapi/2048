var grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

var w = 100;

function setup() {
    createCanvas(400, 400);
    drawGrid();
    getNewDigit();
    drawGrid();
}

function slideRight() {
    for (var i = 0; i < 4; i++) {
        //get new row after merging similar digits
        //recive only digits without zeros
        grid[i] = mergeDigitsRight(grid[i]);
        //make array with zeros with length 4-(num of non-zero digit)
        var newRow = [];
        for (var z = 0; z < 4 - grid[i].length; z++) {
            newRow.push(0);
        }
        grid[i] = newRow.concat(grid[i]);
    }
}

function mergeDigitsRight(row) {
    var d = row.filter(x => x > 0);
    for (var i = d.length - 1; i >= 1; i--) {
        if (d[i] === d[i - 1]) {
            d[i] = d[i] + d[i - 1];
            d[i - 1] = 0;
            d = d.filter(x => x > 0);
        }
    }
    return d;
}

function slideLeft() {
    for (var i = 0; i < 4; i++) {
        grid[i] = mergeDigitsLeft(grid[i]);
        var newRow = [];
        for (var z = 0; z < 4 - grid[i].length; z++) {
            newRow.push(0);
        }
        grid[i] = grid[i].concat(newRow);
    }
}

function mergeDigitsLeft(row) {
    var d = row.filter(x => x > 0);
    for (var i = 0; i < d.length - 1; i++) {
        if (d[i] === d[i + 1]) {
            d[i] = d[i] + d[i + 1];
            d[i + 1] = 0;
            d = d.filter(x => x > 0);
        }
    }
    return d;
}

function slideUp() {
    for (var j = 0; j < 4; j++) {
        // convert col to single array
        var Ncol = [];
        for (var i = 0; i < 4; i++) {
            Ncol.push(grid[i][j]);
        }

        // same algoritm as sliding left
        Ncol = mergeDigitsLeft(Ncol);

        // adding zeros to empty cells
        var newRow = [];
        for (var z = 0; z < 4 - Ncol.length; z++) {
            newRow.push(0);
        }
        Ncol = Ncol.concat(newRow);

        // returning value to grid
        for (var i = 0; i < 4; i++) {
            grid[i][j] = Ncol[i];
        }
    }
}

function slideDown() {
    for (var j = 0; j < 4; j++) {
        var Ncol = [];
        for (var i = 0; i < 4; i++) {
            Ncol.push(grid[i][j]);
        }
        Ncol = mergeDigitsRight(Ncol);

        var newRow = [];
        for (var z = 0; z < 4 - Ncol.length; z++) {
            newRow.push(0);
        }
        Ncol = newRow.concat(Ncol);
        for (var i = 0; i < 4; i++) {
            grid[i][j] = Ncol[i];
        }
    }
}

function getNewDigit() {
    // push 2 or 4 to random free cell
    for (var n = 0; n < 2; n++) {
        //check free cells in grid
        var empty = getEmptyCells();
        var r = random(1);
        var c = random(empty);
        grid[c.x][c.y] = r <= 0.5 ? 2 : 4;
        empty.slice(c, 1);
    }
}

function getEmptyCells() {
    var empty = [];
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (grid[j][i] === 0) empty.push({
                x: j,
                y: i
            })
        }
    }
    return empty;
}

function drawGrid() {
    background(255);
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            fill(0);
            stroke(0);
            strokeWeight(2);
            rect(i * w, j * w, w, w);
        }
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            fill(255);
            strokeWeight(1);
            textSize(40);
            textAlign(CENTER, CENTER);
            text(grid[i][j], j * w + w / 2, i * w + w / 2);
        }
    }
}

function keyPressed() {
    if (key == "ArrowRight") {
        slideRight();
        getNewDigit();
        drawGrid();
    }
    if (key == "ArrowLeft") {
        slideLeft();
        getNewDigit();
        drawGrid();
    }
    if (key == "ArrowUp") {
        slideUp();
        getNewDigit();
        drawGrid();
    }
    if (key == "ArrowDown") {
        slideDown();
        getNewDigit();
        drawGrid();
    }
}