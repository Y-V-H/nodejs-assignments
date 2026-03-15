import path from 'node:path';
import { validateArgs } from '../utils/argParser.js';

const handleUp = (state, args) => {
  if (!validateArgs(args, 0)) return false;

  state.cwd = path.dirname(state.cwd);

  return true;
};

export { handleUp };
