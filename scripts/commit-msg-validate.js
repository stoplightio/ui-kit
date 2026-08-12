#!/usr/bin/env node

const fs = require('fs');

const rawParams = process.env.HUSKY_GIT_PARAMS || '';
const messageFile = rawParams.trim().split(/\s+/).find(Boolean);

if (!messageFile) {
  process.exit(0);
}

let message;
try {
  message = fs.readFileSync(messageFile, 'utf8');
} catch (error) {
  console.error(`commit-msg: unable to read commit message file: ${messageFile}`);
  process.exit(1);
}

const firstLine = message.split(/\r?\n/)[0].trim();

if (!firstLine) {
  console.error('commit-msg: commit message cannot be empty');
  process.exit(1);
}

const ignoredPrefixes = ['Merge ', 'Revert ', 'fixup!', 'squash!'];
if (ignoredPrefixes.some(prefix => firstLine.startsWith(prefix))) {
  process.exit(0);
}

const conventionalPattern = /^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test)(\([a-z0-9._\/-]+\))?!?: .+/;

if (!conventionalPattern.test(firstLine)) {
  console.error('commit-msg: invalid commit message format');
  console.error('Expected: <type>(optional-scope): <subject>');
  console.error('Allowed types: build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test');
  console.error(`Received: ${firstLine}`);
  process.exit(1);
}

process.exit(0);
