#!/usr/bin/env node
// 桌面版构建：把该装的东西装进 app/，然后交给 electron-packager。
//
// 为什么需要这一步（踩过）：main.js 原来 import `../scripts/serve-lib.mjs`，
// 而 electron-packager 只把 `app/` 目录装进包 —— 那个文件根本不在包里，
// 打出来的 .app 起不来且没有任何报错。
//
// 为什么不能直接把项目根当 source：那会把 `.private/`（凭证）一起装进可分发的东西里。
// AGENTS.md 硬边界：key 不进任何会被分发/提交的文件。
//
// 装什么：app/lib/serve-lib.mjs 及其 lib/llm.mjs 依赖、app/assets/prototype/（页面）、
//        app/assets/.agents/skills/（skill 原文）。**不装 .private/、不装 evidence/、不装 .git/**。
//
// 用法：node scripts/build-app.mjs [--skip-pack]

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve(import.meta.dirname, '..');
const APP = path.join(ROOT, 'app');
const LIB = path.join(APP, 'lib');
const ASSETS = path.join(APP, 'assets');
const SKIP_PACK = process.argv.includes('--skip-pack');

const rm = p => fs.rmSync(p, { recursive: true, force: true });
const cp = (from, to) => { fs.mkdirSync(path.dirname(to), { recursive: true }); fs.cpSync(from, to, { recursive: true }); };
const kb = p => {
  let n = 0;
  (function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name); e.isDirectory() ? walk(f) : n += fs.statSync(f).size;
  } })(p);
  return (n / 1024).toFixed(0) + ' KB';
};

/* ① 代码：serve-lib 必须进包 */
fs.mkdirSync(LIB, { recursive: true });
cp(path.join(ROOT, 'scripts', 'serve-lib.mjs'), path.join(LIB, 'serve-lib.mjs'));
cp(path.join(ROOT, 'scripts', 'lib', 'llm.mjs'), path.join(LIB, 'lib', 'llm.mjs'));

/* ② 资源：页面 + skill 原文 */
rm(ASSETS);
fs.mkdirSync(path.join(ASSETS, 'prototype'), { recursive: true });
for (const f of ['知所栖-壳.html', '知所栖-135-基础框架.html']) {
  const src = path.join(ROOT, 'prototype', f);
  if (fs.existsSync(src)) cp(src, path.join(ASSETS, 'prototype', f));
}
cp(path.join(ROOT, '.agents', 'skills'), path.join(ASSETS, '.agents', 'skills'));
// 打包版没有项目根的 .private，给一个空目录免得 serve-lib 报警
fs.mkdirSync(path.join(ASSETS, '.private'), { recursive: true });

/* ③ 自检：不许有凭证混进来 */
const leaked = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) walk(f);
    else if (/llm\.env$|access-secret|\.key$|credentials/i.test(e.name)) leaked.push(path.relative(APP, f));
  }
})(ASSETS);
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) walk(f);
    else if (/llm\.env$|access-secret|\.key$|credentials/i.test(e.name)) leaked.push(path.relative(APP, f));
  }
})(LIB);
if (leaked.length) { console.error('❌ 自检失败：包里出现疑似凭证 —— ' + leaked.join(', ')); process.exit(3); }

console.log('装好：');
console.log('  app/lib/serve-lib.mjs        ' + kb(LIB));
console.log('  app/assets/prototype/        ' + kb(path.join(ASSETS, 'prototype')));
console.log('  app/assets/.agents/skills/   ' + kb(path.join(ASSETS, '.agents')));
console.log('  凭证自检：通过（没有 llm.env / access-secret / *.key）');

if (SKIP_PACK) { console.log('（--skip-pack：只备料，不打包）'); process.exit(0); }

/* ④ 打包 */
rm(path.join(APP, 'dist'));
console.log('打包中（electron-packager）…');
execFileSync('npx', ['--no-install', 'electron-packager', '.', '知所栖 135',
  '--platform=darwin', '--arch=arm64', '--out=dist', '--overwrite',
  '--app-bundle-id=com.hou152.zhisuoqi135', '--app-version=0.1.0',
  '--ignore="^/dist"', '--ignore="^/assets$"'],
  { cwd: APP, stdio: 'inherit' });

const out = path.join(APP, 'dist', '知所栖 135-darwin-arm64', '知所栖 135.app');
console.log(out && fs.existsSync(out) ? `\n✅ ${path.relative(ROOT, out)}` : '\n❌ 没打出 .app');
