import fs from 'fs-extra';
import path from 'path';
import { APP_TSX } from '../constants/constants';
import { logger } from '../utils/logger';

/**
 * Prompts the user and install prettier
 * @param projectPath - root directory
 * @param run - command line
 */

const installTailwindCSS = async (projectPath: string, run: (command: string) => void) => {
  run(`npm install tailwindcss @tailwindcss/vite`);
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

  const cssPath = path.join(projectPath, 'src/index.css');
  if (await fs.pathExists(cssPath)) {
    await fs.remove(cssPath);
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
  logger.success('✅ Tailwind CSS Setup Complete.');
};

export default installTailwindCSS;
