import { handleUp } from './up.js';
import { handleCd } from './cd.js';
import { handleLs } from './ls.js';
import { count } from './count.js';

const commands = {
  up: (state, args) => handleUp(state, args),
  cd: (state, args) => handleCd(state, args),
  ls: (state, args) => handleLs(state, args),
  count: (state, args) => count(args),
  csv_to_json: (args) => console.log('was typed csv-to-json\n'),
  json_to_csv: (args) => console.log('json-to-csv'),
  hash: (args) => console.log('hash'),
  hash_compare: (args) => console.log('hash-compare'),
  encrypt: (args) => console.log('encrypt'),
  decrypt: (args) => console.log('decrypt'),
  log_stats: (args) => console.log('log-stats'),
};

export { commands };
