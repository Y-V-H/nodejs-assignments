import { promises } from 'fs';
import path from 'node:path';
import { validateArgs } from '../utils/argParser.js';

const handleCd = async (state, args) => {
  if (!validateArgs(args, 1)) return false;

  try {
    const [dirPath] = args;
    const targetPath = path.resolve(state.cwd, dirPath);
    const stats = await promises.stat(targetPath);

    if (stats.isDirectory()) {
      state.cwd = targetPath;
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
};

export { handleCd };
