import { stdin as input, stdout as output } from 'node:process';
import os from 'node:os';

import { startRepl } from './repl.js';
import { commands } from './commands/index.js';

const state = {
  cwd: os.homedir(),
};

const handleExit = () => {
  console.log('Thank you for using Data Processing CLI!!');
  process.exit(0);
};

console.log('Welcome to Data Processing CLI!');
console.log(`You are currently in ${state.cwd}`);

startRepl({ input, output }, commands, state, handleExit);
