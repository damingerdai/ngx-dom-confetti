import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

// Build the demo outside the workspace, resolving the installed tarball rather than source paths.
const tarball = resolve(process.argv[2] ?? 'dist/ngx-dom-confetti.tgz');
const consumer = mkdtempSync(join(tmpdir(), 'ngx-dom-confetti-consumer-'));
const json = (path) => JSON.parse(readFileSync(path, 'utf8'));
const writeJson = (path, data) => writeFileSync(join(consumer, path), JSON.stringify(data, null, 2) + '\n');
const npm = (...args) => execFileSync('npm', args, { cwd: consumer, stdio: 'inherit' });
try {
  cpSync('package.json', join(consumer, 'package.json'));
  cpSync('package-lock.json', join(consumer, 'package-lock.json'));
  npm('ci', '--ignore-scripts', '--no-audit', '--no-fund');
  npm('install', '--ignore-scripts', '--no-audit', '--no-fund', '--save-exact', tarball);
  const installed = json(join(consumer, 'node_modules/ngx-dom-confetti/package.json'));
  assert.equal(installed.version, json('package.json').version);
  for (const file of ['LICENSE', 'README.md']) {
    assert.ok(readFileSync(join(consumer, 'node_modules/ngx-dom-confetti', file)).length);
  }
  const workspace = json('angular.json');
  delete workspace.projects['ngx-dom-confetti'];
  workspace.cli.analytics = false;
  writeJson('angular.json', workspace);
  // tsconfig.json contains comments; TypeScript's parser handles them.
  const { default: ts } = await import('typescript');
  const { config, error } = ts.readConfigFile('tsconfig.json', ts.sys.readFile);
  assert.equal(error, undefined);
  delete config.compilerOptions.paths;
  writeJson('tsconfig.json', config);
  cpSync('packages/dev-app', join(consumer, 'packages/dev-app'), { recursive: true });
  npm('run', 'build');
  console.log(`Consumer build passed for ngx-dom-confetti@${installed.version}`);
} finally {
  rmSync(consumer, { recursive: true, force: true });
}
