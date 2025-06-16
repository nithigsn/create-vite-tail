import path from 'path';
import fs from 'fs-extra';
import { ROUTER } from '../constants/constants';
import { logger } from '../utils/logger';

/**
 * Install react-router-dom
 * @param projectPath - Root Directory
 * @param run - Command Line
 */
const installReactRouterDom = async (projectPath: string, run: (cmd: string) => void) => {
  run('npm i react-router-dom');

  const appPath = path.join(projectPath, 'src/main.tsx');
  if (await fs.pathExists(appPath)) {
    await fs.remove(appPath);
  }
  await fs.outputFile(appPath, ROUTER);

  logger.success('📍 React-router-dom Setup Complete');
};

export default installReactRouterDom;
