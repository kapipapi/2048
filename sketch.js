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
    getNewDigit();
    drawGrid();
}

function slideLeft() {
    for (var i = 0; i < 4; i++) {
        //get only digits from row
        var d = grid[i].filter(x => x > 0);

    }
}

function getNewDigit() {
    //check free cells in grid
    var empty = [];
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (grid[j][i] === 0) empty.push({
                x: j,
                y: i
            })
        }
    }
    // push 2 or 4 to random free cell
    for (var n = 0; n < 2; n++) {
        var r = random(1);
        var c = random(empty);
        grid[c.x][c.y] = r <= 0.5 ? 2 : 4;
        empty.pop(c);
    }
}

function drawGrid() {
    background(255);
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            noFill();
            stroke(0);
            strokeWeight(2);
            rect(i * w, j * w, w, w);
            strokeWeight(1);
            textSize(40);
            textAlign(CENTER, CENTER);
            text(grid[i][j], j * w + w / 2, i * w + w / 2);
        }
    }
}

function keyPressed() {
    if (key == " ") {
        slideLeft();
    }
}