import fs from 'fs-extra';
import path from 'path';
import { SONNER } from '../constants/constants';
import { logger } from '../utils/logger';

/**
 * Install sonner (Toaster)
 * @param projectPath - root directory
 * @param run - command line
 */

const installSonner = async (projectPath: string, run: (command: string) => void) => {
  run('npm install sonner');
  const appPath = path.join(projectPath, 'src/main.tsx');
  if (await fs.pathExists(appPath)) {
    await fs.remove(appPath);
  }
  await fs.outputFile(appPath, SONNER);
  logger.success('✅ Sonner Setup Complete');
};

export default installSonner;
