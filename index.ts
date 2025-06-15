#!/usr/bin/env node

import { execSync } from 'child_process';
import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';

import { createFolderStructure } from './helpers/createFolderStructure';
import { APP_TSX } from './constants/constants';

(async () => {
  console.log(chalk.green.bold('\n🌀 Vite + Tailwind CSS Project Generator\n'));

  const { projectName }: { projectName: string } = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter project name:',
      default: 'vite-tailwind-app',
    },
  ]);

  const run = (cmd: string, opts: object = {}) => execSync(cmd, { stdio: 'inherit', ...opts });

  console.log(chalk.blue('\n🚧 Creating Vite project...'));
  run(`npm create vite@latest ${projectName} -- --template react-swc-ts`);

  const projectPath = path.resolve(projectName);
  process.chdir(projectPath);

  console.log(chalk.blue('📦 Installing dependencies...'));
  run(`npm install`);

  console.log(chalk.yellow('⚙️ Installing Tailwind CSS...'));
  run(`npm install tailwindcss @tailwindcss/vite`);

  console.log(chalk.yellow('🧹 Updating Vite config...'));
  const viteConfigPath = path.join(projectPath, 'vite.config.ts');
  await fs.writeFile(
    viteConfigPath,
    `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [react(), tailwindcss()],
});
`
  );
  console.log(chalk.green('✅ Vite config updated.'));

  const cssPath = path.join(projectPath, 'src/index.css');
  if (await fs.pathExists(cssPath)) {
    await fs.remove(cssPath);
    console.log(chalk.red('Removed default index.css'));
  }
  await fs.outputFile(
    cssPath,
    `@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
    @import "tailwindcss";

  body {
  min-height: 100vh;
  font-family: "Poppins", system-ui, -apple-system, "Segoe UI", Roboto,
    Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  background-color: #000000;
  color: #ffffff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`
  );

  const appPath = path.join(projectPath, 'src/App.tsx');
  if (await fs.pathExists(appPath)) {
    await fs.remove(appPath);
  }

  await fs.outputFile(appPath, APP_TSX);

  await createFolderStructure(projectPath);

  console.log(chalk.green('✅ Tailwind setup complete.'));
  console.log(chalk.cyan(`\n🚀 Project "${projectName}" is ready!\n`));
})();
