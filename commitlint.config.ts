import type { UserConfig } from '@commitlint/types';

const config: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
      ],
    ],
    "subject-full-stop": [0, 'never', '.'],
    "subject-case": [0, "never", 'lower-case'],
    "header-max-length": [2, "always", 200],
    "scope-case": [2, "never", 'lower-case'],
  },

}

module.exports = config;
