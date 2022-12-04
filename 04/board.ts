export class Board {
    numbers: number[][]
    winningNumber: number|undefined;

    constructor(numbers: number[][]) {
        this.numbers = numbers;
    }

    public crossNumberAndCheckWin(number: number): boolean{
        this.numbers = this.numbers.map((column: number[]) => column.map(value => value === number ? 0 : value))
        if(this.colWin() || this.rowWin()){
            this.winningNumber = number;
            return true
        }
        return false
    }

    public rowWin(): boolean{
        for (let i = 0; i < this.numbers.length; i++){
            if(this.numbers[i].filter(value => value===0).length===5) return true;
        }
        return false;
    }

    public colWin(): boolean{
        for (let j = 0; j < this.numbers.length; j++) {
            let zeroes = 0;
            for (let i = 0; i < this.numbers[0].length; i++){
                if(this.numbers[i][j] === 0) zeroes += 1
            }
            if(zeroes===5)
                return true
        }
        return false;
    }

    public sumOfUnmarked(): number {
        return this.numbers
            .reduce((a,b) => a.concat(b)) //flatten
            .reduce((sum, value) => sum+value) //sum
    }
}