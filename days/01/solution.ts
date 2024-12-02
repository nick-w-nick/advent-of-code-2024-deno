const input = Deno.readTextFileSync('days/01/input.txt');

const {
    leftColumn,
    rightColumn,
} = input.split('\n').reduce<{ leftColumn: number[], rightColumn: number[] }>((acc, value) => {
    if (value.trim() === '') {
        return acc;
    }
    
    const [leftValue, rightValue] = value.split('   ');
    
    acc.leftColumn.push(parseInt(leftValue, 10));
    acc.rightColumn.push(parseInt(rightValue, 10));
    
    return acc;
}, {
    leftColumn: [],
    rightColumn: [],
});

const sortedLeftColumn = leftColumn.sort((a, b) => a - b);
const sortedRightColumn = rightColumn.sort((a, b) => a - b);

const pairs = sortedLeftColumn.reduce<number[][]>((acc, curr, index) => {
    const pairedValue = sortedRightColumn[index];
    
    acc.push([curr, pairedValue])
    
    return acc;
}, []);

const differences = pairs.reduce<number>((acc, curr) => {
    const [leftValue, rightValue] = curr;
    
    let distance = 0;
    
    if (leftValue > rightValue) {
        distance = leftValue - rightValue;
    }
    
    if (rightValue > leftValue) {
        distance = rightValue - leftValue;
    }
    
    acc += distance;
    return acc;
}, 0);

console.log(differences);
