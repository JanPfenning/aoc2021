export class Octopus {
    energyLevel: number;
    flashed: boolean;
    flashes: number;
    x: number;
    y: number;

    constructor(energyLevel, x, y) {
        this.energyLevel = energyLevel;
        this.flashed = false;
        this.flashes = 0;
        this.x = x;
        this.y = y;
    }

    increaseEnergyLevel() {
        this.energyLevel++;
    }

    /**
     * Handles the flash for this single octopus
     * */
    flash() {
        if (this.energyLevel > 9 && !this.flashed) {
            this.flashed = true;
            this.flashes++;
            return true;
        }
        return false;
    }

    resetEnergyLevel() {
        if(this.flashed){
            this.energyLevel = 0;
            this.flashed = false;
        }
    }
}