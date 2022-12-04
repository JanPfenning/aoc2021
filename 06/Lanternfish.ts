export class Lanternfish {
    timer: number;

    constructor(timer?: number) {
        this.timer = timer ?? 8
    }

    public tick(): Lanternfish|undefined {
        if(this.timer === 0){
            this.timer = 6
            return new Lanternfish();
        }
        this.timer -= 1;
    }
}