// 关系种类的**唯一口径**（2026-09-14 起）。
//
// 为什么要有这个文件：同一个 `relatedCount` 曾在两处差 13 倍——
//   · `scripts/cm-wire.mjs`（进壳）只数**画得出来的语义关系**、且按稳定身份去过重 → Harness 21 条；
//   · `scripts/paths-validate.mjs`（进 validate.json）把 co-article 与 rejected 也算进"相关" → Harness 271 条。
// 两个数都是从 `relations.json` 算的，只是"算什么"不同；两处共用一个名字，页面就会自相矛盾。
// 现在两边都从这里取口径（kind 白名单 + 同一套去重 + 默认不绘制的那部分单独报），数字必然一致。
//
// 口径来自 README 与两份研究（`docs/总图与实践空间-方向研究-20260914.md` §关系层）：
//   drawn（画得出来 / 算语义关系）：prerequisite 前置 · related-to 相关 · used-with 一起使用 ·
//                                   part-of 组成 · contrast 对照
//   hidden（默认不绘制 / 不算知识关系）：co-article 同一篇里出现过（共现）· rejected 已被判不成立
//   related（页面上"相关概念"那一段）＝ drawn 里除 prerequisite 之外的部分：有关，但不是先修。

/** 画得出来的语义关系（关系视图与概念卡「相关概念」都只看这一组）。 */
export const DRAWN_RELATION_KINDS = ['prerequisite', 'related-to', 'used-with', 'part-of', 'contrast'];

/** 默认不绘制的记录：共现与已否，不是知识关系，不进画布、也不当先修。 */
export const HIDDEN_RELATION_KINDS = ['co-article', 'rejected'];

export const isDrawnRelation = (r) => DRAWN_RELATION_KINDS.includes(r && r.kind);
export const isHiddenRelation = (r) => HIDDEN_RELATION_KINDS.includes(r && r.kind);

/** 相关＝画得出来里除先修之外的部分（概念卡「相关概念」那一段的口径）。 */
export const isRelatedRelation = (r) => isDrawnRelation(r) && r.kind !== 'prerequisite';

/** 去重规则（原在 cm-wire.mjs 里，2026-09-14 上移到这里，两边共用）：
    先修边按方向去重，其余关系按无序对去重；同一身份留信息量最大的那条。 */
const relationScore = (r) => (r.strength === 'hard' ? 2 : 1) + (r.note ? .25 : 0) + (r.evidence ? .1 : 0);
export function relationKey(r) {
  if (r.kind === 'prerequisite') return `${r.kind}:${r.from}:${r.to}`;
  const [a, b] = [r.from, r.to].sort();
  return `${r.kind}:${a}:${b}`;
}
export function dedupeRelations(list) {
  const map = new Map();
  for (const r of list || []) {
    if (!isDrawnRelation(r) || r.from === r.to) continue;
    const k = relationKey(r);
    if (!map.has(k) || relationScore(r) > relationScore(map.get(k))) map.set(k, r);
  }
  return [...map.values()];
}

/**
 * 一份 relations.json 的完整账：raw（原样）· drawn（去重后可绘制）· related（drawn 里非先修）·
 * hidden（默认不绘制）· 逐类原始计数。
 * 所有要写"N 条相关关系"的地方都用它，别再各自 filter。
 */
export function relationLedger(rawList) {
  const raw = rawList || [];
  const byKindRaw = {};
  for (const r of raw) byKindRaw[r.kind] = (byKindRaw[r.kind] || 0) + 1;
  const drawn = dedupeRelations(raw);
  const related = drawn.filter((r) => r.kind !== 'prerequisite');
  const hidden = raw.filter(isHiddenRelation);
  return { total: raw.length, drawn, related, hidden, byKindRaw };
}

/** 某个概念身上的一份账（概念卡与路线步骤共用）。 */
export function relationLedgerOf(rawList, id) {
  return relationLedger((rawList || []).filter((r) => r.from === id || r.to === id));
}
