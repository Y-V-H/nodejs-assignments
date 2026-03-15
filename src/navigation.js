import path from 'node:path';
import { promises } from 'fs';
import { validateArgs } from './utils/argParser.js';

const handleUp = (state, args) => {
  if (!validateArgs(args, 0)) return false;

  state.cwd = path.dirname(state.cwd);

  return true;
};

const handleLs = async (state, args) => {
  if (!validateArgs(args, 0)) return false;

  try {
    const result = await promises.readdir(state.cwd);
    const sortedElements = result.sort();

    const elementsWithStats = await Promise.all(
      sortedElements.map(async (el) => {
        const stats = await promises.stat(`${state.cwd}/${el}`);
        return {
          name: el,
          isFile: stats.isFile(),
        };
      }),
    );

    const files = elementsWithStats.filter((el) => el.isFile);
    const folders = elementsWithStats.filter((el) => !el.isFile);

    [...folders, ...files].forEach((el) => {
      const description = el.isFile ? `${el.name} [file]` : `${el.name} [folder]`;

      console.log(description);
    });

    return true;
  } catch {
    return false;
  }
};

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

export { handleUp, handleLs, handleCd };
