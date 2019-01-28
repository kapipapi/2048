class Cell {
    constructor(x, y, val) {
        this.x = x;
        this.y = y;
        this.val = val;
    }

    displayBlock() {
        this.val = grid[this.y][this.x];
        this.getColor();
        stroke(0);
        strokeWeight(2);
        rect(this.x * w, this.y * w, w, w);
    }

    displayText() {
        fill(255);
        strokeWeight(1);
        textSize(40);
        textAlign(CENTER, CENTER);
        text(this.val, this.x * w + w / 2, this.y * w + w / 2);
    }

    getColor() {
        switch (this.val) {
            case 0:
                fill(255, 238, 230);
                break;
            case 2:
                fill(255, 153, 102);
                break;
            case 4:
                fill(255, 136, 77);
                break;
            case 8:
                fill(255, 119, 51);
                break;
            case 16:
                fill(255, 102, 26);
                break;
            case 32:
                fill(255, 85, 0);
                break;
            case 32:
                fill(230, 77, 0);
                break;
            case 64:
                fill(204, 68, 0);
                break;
            case 128:
                fill(179, 60, 0);
                break;
            default:
                fill(153, 51, 0);
                break;
        }
    }
}