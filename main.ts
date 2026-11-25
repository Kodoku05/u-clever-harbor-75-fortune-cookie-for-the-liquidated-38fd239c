const { mkdirSync, writeFileSync } = require('node:fs');
const { join } = require('node:path');

const fortune = 'Your crypto liquidation foretells longevity: you can no longer afford a midlife crisis.';
const outputDirectory = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const outputFile = join(outputDirectory, 'entry.txt');

try {
  const characters = [...fortune].length;
  const words = fortune.trim().split(/\s+/).length;
  if (!fortune.trim() || characters < 1 || characters > 160 || words > 20 || /[\r\n]/.test(fortune)) {
    throw new Error('Fortune must be one nonempty line, 1–160 characters, and at most 20 words.');
  }

  mkdirSync(outputDirectory, { recursive: true });
  // Write only the slip text; no newline or metadata contributes extra bytes.
  writeFileSync(outputFile, fortune, 'utf8');
} catch (error) {
  console.error(`Cannot write fortune to ${outputFile}:`, error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
