// File: scripts/build.js
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs-extra';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, '..');
const buildDir = path.join(__dirname, '..', 'build');

async function build() {
  try {
    // Ensure build directory exists
    await fs.ensureDir(buildDir);

    // Copy necessary files to build directory
    const filesToCopy = [
      'package.json',
      'package-lock.json',
      '.env',
      'Server'
    ];

    for (const file of filesToCopy) {
      await fs.copy(path.join(sourceDir, file), path.join(buildDir, file));
    }

    console.log('Build completed successfully!');
  } catch (err) {
    console.error('An error occurred during the build process:', err);
  }
}

build();