#!/usr/bin/env node
// 从已审核的语义单元 ID 批量装配材料；不调用模型，不覆盖已有文件。
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const configPath = process.argv[2] || 'docs/mvp-materials.json';
const config = JSON.parse(fs.readFileSync(path.resolve(root, configPath), 'utf8'));
const assembler = path.resolve(root, '内容结构化系统/模块/ai-concept-base/scripts/assemble.mjs');
for (const item of config.materials || []) {
  if (!item.id || !item.qst || !item.out) throw new Error('每个材料必须有 id、qst、out');
  const out = path.resolve(root, item.out);
  if (fs.existsSync(out) && !process.argv.includes('--overwrite')) {
    console.log(`跳过已有文件：${item.out}`); continue;
  }
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const args = [assembler, '--qst', item.qst, '--out', out, '--max-concepts', String(item.maxConcepts || 3)];
  for (const [key, flag] of [['concepts','concept'],['opinions','opinion'],['cases','case'],['solutions','solution'],['selfChecks','self-check']]) {
    if (item[key]?.length) args.push('--' + flag, item[key].join(','));
  }
  execFileSync(process.execPath, args, { cwd: root, stdio: 'inherit' });
  console.log(`完成：${item.id} → ${item.out}`);
}
