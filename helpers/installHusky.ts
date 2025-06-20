import { logger } from '../utils/logger';

/**
 * Install Husky (Git Hook)
 * @param run - command line
 */

const installHusky = async (rootPath: string, run: (command: string) => void) => {
  run('npm install --save-dev  husky');

  logger.success('🐺 Husky Setup Complete');
};

export default installHusky;
