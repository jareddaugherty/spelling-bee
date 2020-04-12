import process from 'process';
import fs from 'fs';
import readline from 'readline';

const readInterface = readline.createInterface({
    input: fs.createReadStream('/usr/share/dict/words'),
});

let [center, ...rest] = process.argv.slice(2);
let outer = rest.join('') + center;
let regex = RegExp(`^[${outer}]*(${center})+[${outer}]*$`, 'g');
let answers = []

readInterface.on('line', (line) => {
    if(line.length < 4) return
    if(regex.test(line)) {
        answers.push(line)
    }
})

readInterface.on('close', () => {
    answers.sort((a,b) => b.length - a.length)
    console.log(answers)
})
