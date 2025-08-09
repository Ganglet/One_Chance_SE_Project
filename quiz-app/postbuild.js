// postbuild.js
const { copyFileSync, existsSync, mkdirSync } = require('fs');
const { join } = require('path');

const src = join(process.cwd(), '..', 'generated', 'prisma', 'libquery_engine-darwin-arm64.dylib.node');
const destDir = join(process.cwd(), '.next', 'server', 'generated', 'prisma');
const dest = join(destDir, 'libquery_engine-darwin-arm64.dylib.node');

if (!existsSync(destDir)) {
  mkdirSync(destDir, { recursive: true });
}

try {
  copyFileSync(src, dest);
  console.log('Prisma query engine copied to .next/server/generated/prisma');
} catch (err) {
  console.error('Failed to copy Prisma query engine:', err);
}
