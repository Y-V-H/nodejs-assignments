import readline from 'readline';

const startRepl = ({ input, output }, commands, state, handleExit) => {
  const rl = readline.createInterface({ input, output });

  rl.prompt();

  rl.on('line', async (input) => {
    const [rowCommand, ...args] = input.trim().split(/\s+/);
    const command = rowCommand.replaceAll('-', '_');

    if (command === '.exit') {
      handleExit();
    }

    const handler = commands[command];

    if (handler) {
      const isSuccess = await handler(state, args);

      if (isSuccess) {
        console.log(`You are currently in ${state.cwd}`);
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

export { startRepl };
