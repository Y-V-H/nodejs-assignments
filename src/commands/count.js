import { createReadStream } from 'fs';
import { validateArgs, argParser } from '../utils/argParser.js';

let lines = 0;
let words = 0;
let characters = 0;

const count = async (args) => {
  if (!validateArgs(args, 2)) return false;

  const filePath = argParser(args, '--input');

  if (!filePath) {
    return false;
  }

  try {
    await new Promise((resolve, reject) => {
      const stream = createReadStream(filePath);

      stream.on('data', (chunk) => {
        const text = chunk.toString();

        characters += text.length;
        lines += text.split('\n').length - 1;

        const wordMatches = text.trim().match(/\S+/g);
        if (wordMatches) {
          words += wordMatches.length;
        }
      });

      stream.on('end', resolve);
      stream.on('error', reject);
    });

    console.log(`Lines: ${lines}`);
    console.log(`Words: ${words}`);
    console.log(`Characters: ${characters}`);

    return true;
  } catch {
    return false;
  }
};

export { count };
