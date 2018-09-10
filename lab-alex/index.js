'use strict';

/********************************************************************************
*         CLI                                                                   *
********************************************************************************/
let args = process.argv;

if(args.length < 5){
  throw new Error('--ERROR--\nusage: node index.js <input-file> <output-file> <transform-name>');
}

let inputFile = args[2];
let outputFile = args[3];
let transform = args[4];

let message = `Using ${transform} on ${inputFile} and saving to ${outputFile}`;

console.log(message);

/********************************************************************************
*         Operations                                                            *
********************************************************************************/

const BMT = require('./lib/bmt.js');
let bmt = new BMT();

bmt.open(inputFile, (err, data) => {
  if (err) throw err;
  console.log(data);
});