import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';

export async function createFolderStructure(projectPath) {
    const { createStructure } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'createStructure',
            message: 'Do you want to create a base folder structure (hooks, components, context, etc)?',
            default: true,
        },
    ]);


    if (createStructure) {
        const folders = [
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
            console.log(chalk.green(`📁 Created ${folder}`));
        }

        console.log(chalk.blue('\n✅ Folder structure created.\n'));
    }
}
