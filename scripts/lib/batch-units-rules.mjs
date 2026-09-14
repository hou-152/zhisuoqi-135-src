// 批量学习单元的确定性规则表与出处理解工具。
//
// 为什么单独放一个文件：装配脚本（build-batch-units.mjs）与体检脚本（check-batch-units.mjs）
// 必须**各自从图鉴卡原文重算**同一套规则——体检不是把产物读回来自己跟自己比，而是拿同样的
// 确定性规则从源数据重新推一遍，再与产物逐字对齐。规则表只有一份，避免两边悄悄漂移。

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { readYamlFields } from './graph-adapter.mjs';

export const TYPE_OF = { 概念单元: 'CON', 问题单元: 'QST', 案例单元: 'CAS', 观点单元: 'OPI', 方案单元: 'SOL' };

/* 反面转述的确定性规则表（按短语长度降序，取**第一处**命中）。规则只有两条：
     negation-flip   ：把边界里第一处否定短语机械换成肯定短语（命中的短语记进 flipped）
     boundary-denial ：边界里没有登记过的否定短语时，写成"把这条边界当成不成立"，不换词 */
export const FLIP = [
  ['不等同于', '等同于'], ['不等于', '等于'], ['不必然', '必然'], ['不属于', '属于'], ['不保证', '保证'],
  ['未给出', '已经给出'], ['不是', '是'], ['不能', '能'], ['不会', '会'], ['不应', '应'], ['不再', '再'],
  ['无法', '可以'], ['没有', '有'], ['未必', '必定'], ['不确定', '确定'],
].sort((a, b) => b[0].length - a[0].length);
export const DENIAL_PREFIX = '误以为这条边界不成立：';

/** 逐字原文的机械反面转述：纯函数，输入同一条边界永远得到同一个结果。 */
export function deriveMisconception(condition) {
  const s = String(condition || '');
  for (const [neg, pos] of FLIP) {
    const i = s.indexOf(neg);
    if (i >= 0) return { rule: 'negation-flip', flipped: neg, text: s.slice(0, i) + pos + s.slice(i + neg.length) };
  }
  return { rule: 'boundary-denial', flipped: '', text: DENIAL_PREFIX + s };
}

export const firstChars = (t, n) => Array.from(String(t)).slice(0, n).join('');
export const jsonEscaped = (t) => JSON.stringify(String(t)).slice(1, -1);

/** 逐字命中判定：返回命中形态，找不到返回 null。JSON 源允许 JSON 转义形态（并照实记下来）。 */
export function verbatimForm(raw, text, isJson) {
  const t = String(text == null ? '' : text);
  if (!t) return null;
  if (raw.includes(t)) return 'raw';
  if (isJson && raw.includes(jsonEscaped(t))) return 'json-escaped';
  return null;
}

/** `units[id=CON-x].key_fields.action_steps[0]` 形状的定位解析。 */
export function resolveUnitsLocator(unitsArr, locator) {
  const m = /^units\[id=([^\]]+)]\.(.+)$/.exec(String(locator || ''));
  if (!m) return { ok: false, why: `locator 形状不认：${locator}` };
  const u = unitsArr.find((x) => x.id === m[1]);
  if (!u) return { ok: false, why: `units.json 里没有单元 ${m[1]}` };
  let cur = u;
  for (const seg of m[2].split('.')) {
    const mm = /^(.+)\[(\d+)]$/.exec(seg);
    if (mm) {
      cur = cur[mm[1]];
      if (!Array.isArray(cur)) return { ok: false, why: `${locator} 里 ${seg} 不是数组` };
      cur = cur[Number(mm[2])];
    } else {
      cur = cur[seg];
    }
    if (cur === undefined) return { ok: false, why: `${locator} 里 ${seg} 取不到` };
  }
  return { ok: true, value: cur };
}

/** 图鉴卡顶层字段 / 缩进列表项的定位解析（复用 graph-adapter 的极简 YAML 读取器）。 */
export function resolveCardLocator(raw, locator, rel = '') {
  const y = readYamlFields(raw);
  const m = /^([a-z_]+)\[(\d+)]$/.exec(String(locator || ''));
  if (m) {
    const arr = y[m[1]];
    if (!Array.isArray(arr)) return { ok: false, why: `${rel} 里 ${m[1]} 不是列表` };
    if (arr[Number(m[2])] === undefined) return { ok: false, why: `${rel} 里 ${locator} 越界` };
    return { ok: true, value: arr[Number(m[2])] };
  }
  if (!Object.prototype.hasOwnProperty.call(y, locator)) return { ok: false, why: `${rel} 里没有字段 ${locator}` };
  return { ok: true, value: y[locator] };
}

/** 读一份来源文件（正文 + sha256），产物与体检两边都用同一套口径。 */
export function loadSource(absPath, rel, isJson) {
  return { rel, json: !!isJson, raw: fs.readFileSync(absPath, 'utf8'), sha: sha256File(absPath) };
}
export function sha256File(abs) {
  return crypto.createHash('sha256').update(fs.readFileSync(abs)).digest('hex');
}
export const abs = (root, rel) => path.join(root, rel);
