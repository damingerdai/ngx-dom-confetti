module.exports = {
  "packages/dev-app/**/*.ts?(x)": (filenames) =>
    filenames.length > 10
      ? "yarn ng lint dev-app"
      : `eslint --format stylish ${filenames.join(" ")}`,
  "packages/ngx-dom-confetti/**/*.ts?(x)": (filenames) =>
    filenames.length > 10
      ? "yarn ng lint ngx-dom-confetti"
      : `eslint --format stylish ${filenames.join(" ")}`,
};
