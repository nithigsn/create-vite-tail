import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs-extra';

/**
 * Prompts the user and install prettier
 * @param run - command line
 */

const installPrettier = async (run: (command: string) => void) => {
  const { installPrettier }: { installPrettier: boolean } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'installPrettier',
      message: 'Do you want to install prettier ?',
      default: true,
    },
  ]);

  if (installPrettier) {
    console.log(chalk.green('Installing Prettier...'));
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
  }
};

export default installPrettier;
