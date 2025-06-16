import fs from 'fs-extra';
import path from 'path';
import { logger } from '../utils/logger';

/**
 *  Creates a folder structure inside the project path
 * @param projectPath - Absolute path to the project root
 */
export async function createFolderStructure(projectPath: string): Promise<void> {
  const folders: string[] = [
    'src/hooks',
    'src/components',
    'src/context',
    'src/services',
    'src/utils',
    'src/pages',
    'src/constants',
    'src/layout',
    'src/routes',
  ];

  for (const folder of folders) {
    await fs.ensureDir(path.join(projectPath, folder));
  }
  logger.success(`📁 Folder Setup Complete`);
}
