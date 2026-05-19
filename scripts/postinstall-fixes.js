const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

function ensureCompatDataShim(projectRoot) {
  const dataDir = path.join(projectRoot, 'node_modules', '@babel', 'compat-data', 'data');
  const jsonSource = path.join(dataDir, 'corejs3-shipped-proposals.json');
  const extensionlessTarget = path.join(dataDir, 'corejs3-shipped-proposals');

  if (!fs.existsSync(jsonSource)) {
    return;
  }

  const shimContent = "module.exports = require('./corejs3-shipped-proposals.json');\n";
  const current = fs.existsSync(extensionlessTarget)
    ? fs.readFileSync(extensionlessTarget, 'utf8')
    : null;

  if (current !== shimContent) {
    fs.writeFileSync(extensionlessTarget, shimContent, 'utf8');
    console.log('Created @babel/compat-data corejs3 shim.');
  }
}

function ensureDeasyncBinding(projectRoot) {
  try {
    require(path.join(projectRoot, 'node_modules', 'deasync'));
    return;
  } catch (err) {
    console.log('Rebuilding deasync native binding...');
  }

  const result = spawnSync('npm', ['rebuild', 'deasync'], {
    cwd: projectRoot,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });

  if (result.status !== 0) {
    throw new Error('Failed to rebuild deasync native binding.');
  }
}

function main() {
  const projectRoot = path.resolve(__dirname, '..');
  ensureCompatDataShim(projectRoot);
  ensureDeasyncBinding(projectRoot);
}

main();
