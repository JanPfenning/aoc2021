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
const getSegementsOfDigit = (digit: number) => {
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

const input = fileContent.split(/\r?\n/)
    .map(line => line.split('|').map(side => side.split(" ").filter(value => value).map(value => value.toUpperCase())))

//each line consist of [digitRepresenations, fourSevenSegmentDigit]
const findSmallA = (digitRepresentations: string[]) =>  {
    const [one, two] = digitRepresentations.filter(representation => representation.length<=3)
        .sort((a,b) => a.length - b.length)
        .map(representation => representation.split(""))
    return two.filter(element => !one.find(innerElement => innerElement === element))[0]
}
input.map(
    ([digitRepresentations, fourSevenSegmentDigit]) => digitRepresentations
        .map(digitRepresentation => digitRepresentation
            .replace(findSmallA(digitRepresentations), "a")
        )
).forEach(line => console.log(line))