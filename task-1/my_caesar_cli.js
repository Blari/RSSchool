#!/usr/bin/env node
const fs = require('fs');
const { pipeline } = require('stream');
const { program } = require('commander');
const transform = require('./transform')
program.version('0.0.1');

program
  .requiredOption('-s, --shift <integer>', 'a shift')
  .option('-i, --input <string>', 'an input file', 'input.txt')
  .option('-o, --output <string>', 'an output file', 'output.txt')
  .requiredOption('-a, --action <string>', 'an action encode/decode');

program.parse(process.argv);
const options = program.opts();

const input = options.input;
const output = options.output;

const write = fs.createWriteStream(output, 'utf8');
const read = fs.createReadStream(input, 'utf8');

async function start() {
 await pipeline(
    read,
    transform.transform,
    write,
    (error) => {
      error ? console.error('Pipeline failed', error) : console.log('Pipeline succeeded')
    }
  );
}

start();

