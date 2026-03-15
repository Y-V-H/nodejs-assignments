import { handleUp, handleCd, handleLs } from '../navigation.js';
// import { handleCd } from './cd.js';
// import { handleLs } from './ls.js';
import { count } from './count.js';
import { hash } from './hash.js';
import { jsonToCsv } from './jsonToCsv.js';

const commands = {
  up: (state, args) => handleUp(state, args),
  cd: (state, args) => handleCd(state, args),
  ls: (state, args) => handleLs(state, args),
  count: (state, args) => count(args),
  csv_to_json: (args) => console.log('was typed csv-to-json\n'),
  json_to_csv: (state, args) => jsonToCsv(args),
  hash: (state, args) => hash(args),
  hash_compare: (args) => console.log('hash-compare'),
  encrypt: (args) => console.log('encrypt'),
  decrypt: (args) => console.log('decrypt'),
  log_stats: (args) => console.log('log-stats'),
};

export { commands };
