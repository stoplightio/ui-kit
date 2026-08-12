#!/usr/bin/env node

/*
 * Compatibility bridge for legacy Husky v4 git hooks.
 * Old hooks execute: yarn run --silent husky-run <hookName> <gitParams>
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const hookName = process.argv[2];
const gitParams = process.argv.slice(3).join(' ');

if (!hookName) {
  process.exit(0);
}

const packageJsonPath = path.join(process.cwd(), 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  process.exit(0);
}

let packageJson;
try {
  packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
} catch {
  process.exit(0);
}

const hookCommand = packageJson?.husky?.hooks?.[hookName];
if (!hookCommand) {
  process.exit(0);
}

const result = spawnSync(hookCommand, {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    HUSKY_GIT_PARAMS: gitParams,
  },
});

if (typeof result.status === 'number') {
  process.exit(result.status);
}

process.exit(1);
