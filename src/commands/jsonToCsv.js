import { createReadStream, createWriteStream } from 'fs';
import { validateFlags, argParser } from '../utils/argParser.js';

const jsonToCsv = async (args) => {
  console.log(1111111);
  if (!validateFlags(args, ['--input', '--output'])) return false;

  const inputPath = argParser(args, '--input');
  const outputPath = argParser(args, '--output');

  if (!inputPath || !outputPath) return false;

  try {
    let jsonData = '';

    await new Promise((resolve, reject) => {
      const stream = createReadStream(inputPath);

      stream.on('data', (chunk) => {
        jsonData += chunk.toString();
      });

      stream.on('end', resolve);
      stream.on('error', reject);
    });

    const parsed = JSON.parse(jsonData);

    if (!Array.isArray(parsed) || parsed.length === 0) {
      return false;
    }

    const headers = Object.keys(parsed[0]);

    const writeStream = createWriteStream(outputPath);

    writeStream.write(headers.join(',') + '\n');

    for (const row of parsed) {
      const values = headers.map((key) => row[key] ?? '');
      writeStream.write(values.join(',') + '\n');
    }

    await new Promise((resolve, reject) => {
      writeStream.end(resolve);
      writeStream.on('error', reject);
    });

    return true;
  } catch {
    return false;
  }
};

export { jsonToCsv };
