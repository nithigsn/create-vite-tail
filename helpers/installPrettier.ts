import fs from 'fs-extra';
import { logger } from '../utils/logger';

/**
 * Install prettier
 * @param run - command line
 */

const installPrettier = async (run: (command: string) => void) => {
  run('npm install --save-dev --save-exact prettier');
  await fs.writeFile(
    '.prettierrc',
    `{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
  }`
  );

  await fs.writeFile(
    '.prettierignore',
    `dist
       node_modules`
  );

  logger.success('🦋 Prettier Setup Complete');
};

export default installPrettier;
