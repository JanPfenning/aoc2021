import * as fs from 'fs';

const fileName = './input.txt';
let fileContent = fs.readFileSync(fileName, 'utf8');

/*
 aaaa
b    c
b    c
 dddd
e    f
e    f
 gggg
 */

//works
const getSegementsOfDigit = (digit: number) => {
    if(digit===0) return ['a', 'b', 'c', 'e', 'f', 'g'];
    if(digit===1) return ['c', 'f'];
    if(digit===2) return ['a', 'c', 'd', 'e', 'g'];
    if(digit===3) return ['a', 'c', 'd', 'f', 'g'];
    if(digit===4) return ['b', 'c', 'd', 'f'];
    if(digit===5) return ['a', 'b', 'd', 'f', 'g'];
    if(digit===6) return ['a', 'b', 'd', 'e', 'f', 'g'];
    if(digit===7) return ['a', 'c', 'f'];
    if(digit===8) return ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    if(digit===9) return ['a', 'b', 'c', 'd', 'f', 'g'];
}

const getDigitOfString = (segments: string) => {
    for (let i = 0; i < 10; i++) {
        if(segments===getSegementsOfDigit(i).join("")) return i;
    }
    throw new Error(segments)
}

const input = fileContent.split(/\r?\n/)
    .map(line => line.split('|')
        .map(side => side.split(" ")
            .filter(value => value)
            //.map(value => value.toUpperCase())
        )
    )

/**
 * functions
 * */

//works
type permutation = string[];
const getAllPossiblePermutations = (list: string[]): permutation[] => {
    var length = list.length,
        result = [list.slice()],
        c = new Array(length).fill(0),
        i = 1, k, p;

    while (i < length) {
        if (c[i] < i) {
            k = i % 2 && c[i];
            p = list[i];
            list[i] = list[k];
            list[k] = p;
            ++c[i];
            i = 1;
            result.push(list.slice());
        } else {
            c[i] = 0;
            ++i;
        }
    }
    return result;
}
//console.log(getAllPossiblePermutations(['1', '2', '3']))

//works
type permutedMeasurement = string[]
const replaceOneMeasurementWithOnePermutation = (measurement: measurement, permutation: permutation): permutedMeasurement => {
    const measurementString = measurement.join(",")
    //console.log(measurement)
    const measurementStringUpper = measurementString
        .replace(/a/g, 'A')
        .replace(/b/g, 'B')
        .replace(/c/g, 'C')
        .replace(/d/g, 'D')
        .replace(/e/g, 'E')
        .replace(/f/g, 'F')
        .replace(/g/g, 'G')
    //console.log(measurementStringUpper)
    const permutedString = measurementStringUpper
        .replace(/A/g, permutation[0])
        .replace(/B/g, permutation[1])
        .replace(/C/g, permutation[2])
        .replace(/D/g, permutation[3])
        .replace(/E/g, permutation[4])
        .replace(/F/g, permutation[5])
        .replace(/G/g, permutation[6])
    //console.log(permutedString)
    //console.log(permutedString.split(","))
    return permutedString.split(",");
}

type measurement = string[]
const applyReplacementWithAllPermutationsOnOneMeasurement = (measurement: measurement): {permutation: permutation, permutedMeasurement: permutedMeasurement}[] => {
    const allPermutations = getAllPossiblePermutations(['a', 'b', 'c', 'd', 'e', 'f', 'g']);
    return allPermutations.map((permutation: permutation) => (
        {
            permutation: permutation,
            permutedMeasurement: replaceOneMeasurementWithOnePermutation(measurement, permutation)
        }
    ))
}

//works
const validForDigit = (digit: number, permutedMeasurement: permutedMeasurement) => {
    const stringOfSegmentsOfDigit = getSegementsOfDigit(digit).sort().join("");
    return permutedMeasurement
        .map(digitRepresentation => digitRepresentation.split("").sort().join("")===stringOfSegmentsOfDigit)
        .reduce((sum, value) => sum || value)
}

//works
const isValid = (permutationObject: {permutation: permutation, permutedMeasurement: permutedMeasurement}) => {
    for (let i = 0; i <= 9; i++) {
        if (!validForDigit(i, permutationObject.permutedMeasurement)) return false;
    }
    return true;
}

//works
const getCorrectPermutationOfAllPermutations = (permutationObjects: {permutation: permutation, permutedMeasurement: permutedMeasurement}[]) => {
    return permutationObjects
        .filter(eachPermutationObject => isValid(eachPermutationObject))
        .map(eachPermutationObject => eachPermutationObject.permutation)
}

/**
 * calls
 * */

const allMeasurementsWithAllPermutationsApplied =
    input.map(([measurement, fourSevenSegmentDigit]) => [applyReplacementWithAllPermutationsOnOneMeasurement(measurement), fourSevenSegmentDigit])

const correctPermutationForEachMeasurement = allMeasurementsWithAllPermutationsApplied
    .map(([eachMeasurementsWithAllPermutationsApplied, fourSevenSegmentDigit]: [any[], string[]]) => [getCorrectPermutationOfAllPermutations(eachMeasurementsWithAllPermutationsApplied), fourSevenSegmentDigit]
)

const x = correctPermutationForEachMeasurement.map(
    ([eachCorrectPermutation, fourSevenSegmentDigit]: [permutation[], string[]]) =>
        fourSevenSegmentDigit.map(digitRepresentation =>
            replaceOneMeasurementWithOnePermutation(digitRepresentation.split(""), eachCorrectPermutation[0]).sort().join("")
        ).map(correctedDigitRepresentation => getDigitOfString(correctedDigitRepresentation))

)
console.log(x.map(line => line.filter(element => element === 1 || element === 4 ||element === 7 || element === 8).length).reduce((sum, value) => sum+value))
console.log(x.map(y => Number(y.join(""))).reduce((sum, value) => sum+value))