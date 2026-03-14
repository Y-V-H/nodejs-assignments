import readline from 'readline';
import { stdin as input, stdout as output } from 'node:process';
import { readdir } from 'fs';

// const FILE_CODING = 'utf8';

const handleExit = () => {
  console.log('Thank you for using Data Processing CLI!!');
  process.exit(0);
};

const handleLs = (dirPath) => {
  readdir(dirPath, (err, files) => {
    if (err) throw err;
    files.sort().forEach((file) => {
      console.log(`${file} [file]`);
    });
  });
};

const main = () => {
  console.log('Welcome to Data Processing CLI!');
  console.log(`You are currently in ${process.cwd()}`);
  const rl = readline.createInterface({ input, output });
  rl.prompt();

  rl.on('line', (input) => {
    const command = input.toLowerCase().replaceAll('-', '_');
    if (command === '.exit') {
      handleExit();
    }
    const commands = {
      up: () => console.log('was typed up\n'),
      cd: () => console.log('was typed cd\n'),
      ls: () => handleLs(process.cwd()),
      count: () => console.log('was typed count\n'),
      csv_to_json: () => console.log('was typed csv-to-json\n'),
      json_to_csv: () => console.log('json-to-csv'),
      hash: () => console.log('hash'),
      hash_compare: () => console.log('hash-compare'),
      encrypt: () => console.log('encrypt'),
      decrypt: () => console.log('decrypt'),
      log_stats: () => console.log('log-stats'),
    };
    const handler = commands[command];
    if (handler) {
      handler();
    } else {
      console.error('Invalid input');
    }
    rl.prompt();
  });

  rl.on('SIGINT', handleExit);
};

main();
