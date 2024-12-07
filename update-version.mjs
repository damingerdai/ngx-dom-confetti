import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the main package.json file
const mainPackageJsonPath = path.join(__dirname, "package.json");
const mainPackageJson = JSON.parse(
  fs.readFileSync(mainPackageJsonPath, "utf8"),
);

// Get the version from the main package.json
const mainVersion = mainPackageJson.version;

// Get all package.json files in the packages directory
const packagesDir = path.join(__dirname, "packages");
const packageJsonFiles = fs
  .readdirSync(packagesDir)
  .map((file) => path.join(packagesDir, file, "package.json"))
  .filter((file) => fs.existsSync(file));

// Update the version in each package.json
packageJsonFiles.forEach((packageJsonPath) => {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  packageJson.version = mainVersion;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
});

console.log(`Version ${mainVersion} sync completed.`);
