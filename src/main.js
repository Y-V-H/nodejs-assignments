import readline from 'readline';
import { stdin as input, stdout as output } from 'node:process';
import { promises } from 'fs';
import os from 'node:os';

// const FILE_CODING = 'utf8';

let cwd = os.homedir();

const handleExit = () => {
  console.log('Thank you for using Data Processing CLI!!');
  process.exit(0);
};

const handleLs = async (args) => {
  if (args.length) {
    return false;
  }
  try {
    const result = await promises.readdir(cwd);
    const sortedElements = result.sort();

    const elementsWithStats = await Promise.all(
      sortedElements.map(async (el) => {
        const stats = await promises.stat(`${cwd}/${el}`);
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

const commands = {
  up: (args) => console.log('was typed up\n'),
  cd: (args) => console.log('was typed cd\n'),
  ls: (args) => handleLs(args),
  count: (args) => console.log('was typed count\n'),
  csv_to_json: (args) => console.log('was typed csv-to-json\n'),
  json_to_csv: (args) => console.log('json-to-csv'),
  hash: (args) => console.log('hash'),
  hash_compare: (args) => console.log('hash-compare'),
  encrypt: (args) => console.log('encrypt'),
  decrypt: (args) => console.log('decrypt'),
  log_stats: (args) => console.log('log-stats'),
};

const main = () => {
  const rl = readline.createInterface({ input, output });

  console.log('Welcome to Data Processing CLI!');
  console.log(`You are currently in ${cwd}`);

  rl.prompt();

  rl.on('line', async (input) => {
    const normalizedInput = input.toLowerCase().replaceAll('-', '_');
    const [command, ...args] = normalizedInput.trim().split(/\s+/); // slit takes into account different size of space

    if (command === '.exit') {
      handleExit();
    }

    const handler = commands[command];
    if (handler) {
      const isSuccess = await handler(args);
      if (isSuccess) {
        console.log(`You are currently in ${cwd}`);
      } else {
        console.log('Operation failed');
      }
    } else {
      console.error('Invalid input');
    }
    rl.prompt();
  });

  rl.on('SIGINT', handleExit);
};

main();
