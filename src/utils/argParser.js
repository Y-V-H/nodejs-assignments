const validateArgs = (args, expectedCount) => {
  if (args.length !== expectedCount) {
    return false;
  }
  return true;
};

const argParser = (args, param) => {
  const index = args.indexOf(param);

  if (index !== -1) {
    return args[index + 1];
  }
};

const validateFlags = (args, requiredFlags = []) => {
  return requiredFlags.every((flag) => args.includes(flag));
};

export { validateArgs, argParser, validateFlags };
