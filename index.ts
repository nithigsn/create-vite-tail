#!/usr/bin/env node

import { execSync } from 'child_process';
import inquirer from 'inquirer';
import chalk from 'chalk';
import path from 'path';

import { createFolderStructure } from './helpers/createFolderStructure';
import installPrettier from './helpers/installPrettier';
import installTailwindCSS from './helpers/installTailwindCSS';
import installReactRouterDom from './helpers/installReactRouterDom';
import installSonner from './helpers/installSonner';
import { logger } from './utils/logger';

(async () => {
  console.log(chalk.green.bold('\n🌀 Vite + Tailwind CSS Project Generator\n'));

  // show logs
  // const run = (cmd: string, opts: object = {}) => execSync(cmd, { stdio: 'inherit', ...opts });

  // hides console log
  const hide = (cmd: string, opts: object = {}) =>
    execSync(cmd, {
      stdio: ['inherit', 'ignore', 'inherit'], // stdin, stdout, stderr
      ...opts,
    });

  // name of the project
  let projectName: string;
  // array of selected options
  let features: string[];

  try {
    const responses = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Your Project Name?',
        default: 'myapp',
      },
      {
        type: 'checkbox',
        name: 'features',
        message: 'Choose features to include:',
        choices: [
          { name: 'Tailwind CSS', value: 'tailwind' },
          { name: 'React Router DOM', value: 'router' },
          { name: 'Sonner (Toast)', value: 'sonner' },
          { name: 'Prettier', value: 'prettier' },
          { name: 'Folder Structure', value: 'structure' },
        ],
      },
    ]);

    projectName = responses.projectName;
    features = responses.features;
  } catch (error) {
    if (error instanceof Error) {
      logger.error(chalk.red('\n❌ Cancelled Operation'));
      process.exit(0);
    } else {
      throw error;
    }
  }

  console.log(chalk.blue('\n🚧 Creating '));
  hide(`npm create vite@latest ${projectName} -- --template react-swc-ts`);

  const projectPath = path.resolve(projectName);
  process.chdir(projectPath);

  const shouldInclude = (key: string) => features.includes(key);

  // install react-router-dom
  if (shouldInclude('router')) {
    await installReactRouterDom(projectPath, hide);
  }

  // install tailwind
  if (shouldInclude('tailwind')) {
    await installTailwindCSS(projectPath, hide);
  }
  // install prettier
  if (shouldInclude('prettier')) {
    await installPrettier(hide);
  }

  // install sonner
  if (shouldInclude('sonner')) {
    await installSonner(projectPath, hide);
  }

  // create folder structure
  if (shouldInclude('structure')) {
    await createFolderStructure(projectPath);
  }

  console.log(chalk.cyan(`\n🚀 Project "${projectName}" is ready!\n`));
  logger.info(`cd ${projectName}`);
  logger.info(`npm run dev`);
  process.exit(0);
})();
