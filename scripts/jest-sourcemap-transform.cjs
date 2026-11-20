const fs = require("node:fs");

// Passes compiled JS through unchanged but exposes its tsc .js.map so v8 coverage is reported against src/*.ts.
module.exports = {
  process(code, file) {
    const mapFile = `${file}.map`;
    return { code, map: fs.existsSync(mapFile) ? fs.readFileSync(mapFile, "utf8") : null };
  },
};
