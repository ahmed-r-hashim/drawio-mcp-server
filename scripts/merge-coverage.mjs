// Consolidates packages/*/coverage/{lcov.info,coverage-final.json} into <root>/coverage.
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const packagesDir = path.join(root, "packages");
const outDir = path.join(root, "coverage");

// Jest reports paths relative to the module or the repo root depending on where it ran.
const toRootRelative = (file, moduleDir) => {
  const abs = path.isAbsolute(file)
    ? file
    : [moduleDir, root].map((base) => path.resolve(base, file)).find(existsSync) ??
      path.resolve(moduleDir, file);
  return path.relative(root, abs).split(path.sep).join("/");
};

const lcovParts = [];
const json = {};
const merged = [];

for (const entry of readdirSync(packagesDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const moduleDir = path.join(packagesDir, entry.name);
  const lcovFile = path.join(moduleDir, "coverage", "lcov.info");
  const jsonFile = path.join(moduleDir, "coverage", "coverage-final.json");

  if (existsSync(lcovFile)) {
    const text = readFileSync(lcovFile, "utf8")
      .split(/\r?\n/)
      .map((line) => (line.startsWith("SF:") ? `SF:${toRootRelative(line.slice(3), moduleDir)}` : line))
      .join("\n")
      .trim();
    if (text) lcovParts.push(text);
    merged.push(entry.name);
  }
  if (existsSync(jsonFile)) {
    Object.assign(json, JSON.parse(readFileSync(jsonFile, "utf8")));
  }
}

if (merged.length === 0) {
  console.error("No packages/*/coverage/lcov.info found; run the module coverage first.");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(path.join(outDir, "lcov.info"), `${lcovParts.join("\n")}\n`);
writeFileSync(path.join(outDir, "coverage-final.json"), JSON.stringify(json));
console.log(`Merged coverage from: ${merged.join(", ")} -> ${path.relative(root, outDir)}/`);
