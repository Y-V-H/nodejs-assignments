import { createReadStream, promises as fs } from 'fs';
import { createHash } from 'crypto';
import path from 'node:path';
import { validateFlags, argParser } from '../utils/argParser.js';

const hash = async (args) => {
  if (!validateFlags(args, ['--input'])) return false;

  const filePath = argParser(args, '--input');
  if (!filePath) return false;

  const algorithm = argParser(args, '--algorithm') || 'sha256';
  const save = args.includes('--save');

  const allowedAlgorithms = ['md5', 'sha256', 'sha512'];
  if (!allowedAlgorithms.includes(algorithm)) return false;

  try {
    const hash = createHash(algorithm);

    await new Promise((resolve, reject) => {
      const stream = createReadStream(filePath);

      stream.on('data', (chunk) => {
        hash.update(chunk);
      });

      stream.on('end', resolve);
      stream.on('error', reject);
    });

    const digest = hash.digest('hex');

    console.log(digest);

    if (save) {
      const savePath = path.resolve(`${filePath}.hash`);
      await fs.writeFile(savePath, digest);
    }

    return true;
  } catch {
    return false;
  }
};

export { hash };
