import { execSync } from 'child_process';
import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { createFolderStructure } from './helpers/createFolderStructure.js';



console.log(chalk.green.bold('\n🌀 Vite + Tailwind CSS Project Generator\n'));

const { projectName } = await inquirer.prompt([
    {
        type: 'input',
        name: 'projectName',
        message: 'Enter project name:',
        default: 'vite-tailwind-app'
    }
]);

const run = (cmd, opts = {}) => execSync(cmd, { stdio: 'inherit', ...opts });

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
import react from '@vitejs/plugin-react';
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
await fs.outputFile(cssPath, `@import 'tailwindcss'`);

await createFolderStructure(projectPath)






console.log(chalk.green('✅ Tailwind setup complete.'));
console.log(chalk.cyan(`\n🚀 Project "${projectName}" is ready!\n`));
