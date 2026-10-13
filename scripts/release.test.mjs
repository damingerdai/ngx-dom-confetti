import assert from 'node:assert/strict';
import { test } from 'node:test';
import { checkVersions, releaseNotes } from './release.mjs';

const root = { version: '0.8.0' };
const lock = { ...root, packages: { '': root } };
const built = { ...root, name: 'ngx-dom-confetti' };

test('accepts matching release versions', () => {
  checkVersions(root, lock, root, built, 'v0.8.0');
});
test('rejects stale library, lockfile, artifact and mismatched tag', () => {
  const stale = { version: '0.7.1' };
  assert.throws(() => checkVersions(root, lock, stale, built, 'v0.8.0'));
  assert.throws(() => checkVersions(root, { ...lock, version: '0.7.1' }, root, built, 'v0.8.0'));
  assert.throws(() => checkVersions(root, lock, root, { ...built, ...stale }, 'v0.8.0'));
  assert.throws(() => checkVersions(root, lock, root, built, 'v0.9.0'));
});
test('extracts only the requested release and keeps feature headings', () => {
  const section = '# [0.8.0](url) (2026-10-13)\n\n### Features\n\n* New feature\n';
  assert.equal(releaseNotes(section + '\n## <small>0.7.1 (date)</small>\n\n* Old fix\n', '0.8.0'), section);
  assert.throws(() => releaseNotes(section, '0.9.0'));
});

test('npm version minor commits synchronized manifests and changelog before tagging', async () => {
  const { execFileSync } = await import('node:child_process');
  const { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } = await import('node:fs');
  const { tmpdir } = await import('node:os');
  const { join, resolve } = await import('node:path');
  const fixture = mkdtempSync(join(tmpdir(), 'ngx-release-test-'));
  const run = (command, args) => execFileSync(command, args, {
    cwd: fixture, encoding: 'utf8', env: { ...process.env, HUSKY: '0' },
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();
  const read = (file) => JSON.parse(readFileSync(join(fixture, file), 'utf8'));
  try {
    for (const file of ['package.json', 'package-lock.json', 'update-version.mjs']) {
      cpSync(file, join(fixture, file));
    }
    mkdirSync(join(fixture, 'packages/ngx-dom-confetti'), { recursive: true });
    cpSync('packages/ngx-dom-confetti/package.json', join(fixture, 'packages/ngx-dom-confetti/package.json'));
    symlinkSync(resolve('node_modules'), join(fixture, 'node_modules'), 'dir');
    writeFileSync(join(fixture, '.gitignore'), 'node_modules\n');
    writeFileSync(join(fixture, 'CHANGELOG.md'), '## 0.7.1\n\nPrevious release.\n');
    run('git', ['init', '-b', 'master']);
    run('git', ['config', 'user.name', 'Release Test']);
    run('git', ['config', 'user.email', 'release-test@example.com']);
    run('git', ['add', '.']);
    run('git', ['commit', '-m', 'chore: fixture']);
    const before = read('package.json').version;
    run('git', ['tag', `v${before}`]);
    run('git', ['commit', '--allow-empty', '-m', 'feat: release fixture']);
    run('npm', ['version', 'minor', '-m', 'chore(release): v%s']);
    const version = read('package.json').version;
    const [major, minor] = before.split('.').map(Number);
    assert.equal(version, `${major}.${minor + 1}.0`);
    assert.equal(read('packages/ngx-dom-confetti/package.json').version, version);
    assert.equal(read('package-lock.json').packages[''].version, version);
    assert.equal(run('git', ['describe', '--tags', '--exact-match']), `v${version}`);
    assert.equal(run('git', ['status', '--porcelain']), '');
    const notes = releaseNotes(readFileSync(join(fixture, 'CHANGELOG.md'), 'utf8'), version);
    assert.match(notes, /release fixture/);
    assert.doesNotMatch(notes, /Previous release/);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});
