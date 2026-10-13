import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export function checkVersions(root, lock, library, built, tag) {
  assert.match(root.version, /^\d+\.\d+\.\d+$/, 'Only stable release versions are supported');
  for (const [name, version] of Object.entries({
    lock: lock.version,
    lockRoot: lock.packages[''].version,
    library: library.version,
    built: built.version,
  })) {
    assert.equal(version, root.version, `${name} version must match root version`);
  }
  assert.equal(built.name, 'ngx-dom-confetti');
  assert.equal(tag, `v${root.version}`, 'Release tag must match package version');
  assert.notEqual(built.private, true, 'Built package must be publishable');
}

export function releaseNotes(changelog, version) {
  const sections = changelog.split(/(?=^#{1,2} )/m);
  const section = sections.find((text) => {
    const heading = text.split('\n')[0];
    return heading.match(/\d+\.\d+\.\d+(?:-[\w.-]+)?/)?.[0] === version;
  });
  assert.ok(section?.trim(), `Missing changelog entry for ${version}`);
  return section.trim() + '\n';
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const json = (path) => JSON.parse(readFileSync(path, 'utf8'));
  const root = json('package.json');
  switch (process.argv[2]) {
    case 'check':
      checkVersions(root, json('package-lock.json'), json('packages/ngx-dom-confetti/package.json'),
        json('dist/ngx-dom-confetti/package.json'), process.argv[3] ?? `v${root.version}`);
      console.log(`Release versions verified: ${root.version}`);
      break;
    case 'notes':
      writeFileSync('dist/release-notes.md', releaseNotes(readFileSync('CHANGELOG.md', 'utf8'), root.version));
      break;
    default:
      throw new Error('Usage: node scripts/release.mjs check [tag] | notes');
  }
}
