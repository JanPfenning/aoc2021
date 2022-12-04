export type Coordinate = {x: number, y: number}
export class VentLine{
    start: Coordinate;
    end: Coordinate;

    constructor(x1, y1, x2, y2) {
        this.start = {x: x1, y: y1};
        this.end = {x: x2, y: y2};
    }

    getCoordinatesWithin(): Coordinate[] {
        const coordinates = []
        if(this.start.x === this.end.x){
            this.getAllNumbersBetween(this.start.y, this.end.y).forEach(number => coordinates.push({x: this.start.x, y: number}))
        }else if(this.start.y === this.end.y){
            this.getAllNumbersBetween(this.start.x, this.end.x).forEach(number => coordinates.push({x: number, y: this.start.y}))
        }else/*Diagonal*/{
            const xs = this.getAllNumbersBetween(this.start.x, this.end.x)
            let ys = this.getAllNumbersBetween(this.start.y, this.end.y)
            if(!(this.end.y > this.start.y && this.end.x > this.start.x || this.end.y < this.start.y && this.end.x < this.start.x))
                ys = ys.reverse()
            xs.map((e,i) => ({x: e, y:ys[i]})).forEach(coordinate => coordinates.push(coordinate))
            //console.log(this, coordinates)
        }
        //if(coordinates.length===0) console.log("diagonal line, thus ignored: ", this)
        return coordinates
    }

    private getAllNumbersBetween(n, m) {
        if(n > m){
            const x = n;
            n = m
            m = x
        }
        const numbers = [];
        for (let i = n; i <= m; i++) {
            numbers.push(i);
        }
        return numbers;
    }
}