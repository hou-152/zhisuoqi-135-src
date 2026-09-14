// 机器题 → 阅读器题形态的**唯一**一份搬运规则。
//
// 为什么单独放一个文件：六章的方案丙并入（scripts/build-learning-materials.mjs）与
// 76 个批量单元的阅读载荷编译（scripts/build-batch-materials.mjs）必须**同一套口径**——
// 两边各写一份的话，哪天改了一边就会悄悄漂移，而这两处的产物都进同一条通过判定。
//
// 这里只做字段搬运，不改一个字：
//   · 只搬复核 verdict==='usable' 的那一份（引用复核产物，不重新生成）；
//   · 正解的依据用 basisQuote（逐字可回溯），干扰项的理由用干扰项自带的 why；
//   · 每条题都带 origin（artifact / generatedFrom / review / verdict），页面照实标来源。

export function machineQuestionsOf({
  unitId, decisions, verdict, artifactRel, decisionsRel, reviewRel,
  note = '脚本确定性生成（模型调用 0 次）＋独立复核通过；人工内容排在最前，机器题不覆盖人工内容',
}) {
  const out = [];
  if (verdict !== 'usable') return out;
  for (const [i, q] of (decisions || []).entries()) {
    const co = q.correctOption || {};
    const field = String(co.locator || '').replace(/^units\[id=[^\]]+]\.key_fields\./, '');
    const basisRef = co.basis && field ? `${co.basis}#${field}` : '';
    out.push({
      judgment: `机器复核题 ${i + 1}｜来自 ${unitId} 第 ${i + 1} 道（已独立复核 verdict=usable）`,
      prompt: q.prompt,
      options: [
        { text: co.text, correct: true, why: '', basis: basisRef ? [basisRef] : [], basisQuote: co.basisQuote || '' },
        ...(q.distractors || []).map((d) => ({
          text: d.text, correct: false, why: d.why || '与材料里那一条动作不一致。', basis: [], basisQuote: '',
        })),
      ],
      origin: {
        kind: 'machine', unitId, questionId: q.id,
        artifact: `${artifactRel}#units[unitId=${unitId}].decisions[${i}]`,
        generatedFrom: `${decisionsRel}#units[unitId=${unitId}].questions[${i}]`,
        review: `${reviewRel}#units[unitId=${unitId}]`,
        verdict: 'usable',
        note,
      },
    });
  }
  return out;
}

/** 搬运规则的自校验：三选一恰好一对、正解带 basis 引用与 basisQuote、错项都写了 why。 */
export function machineQuestionProblems(unitId, qs) {
  const bad = [];
  qs.forEach((q, i) => {
    const tag = `${unitId} 第 ${i + 1} 道机器题`;
    const opts = q.options || [];
    if (opts.length !== 3) bad.push(`${tag}：选项应为 3 个（实为 ${opts.length}）`);
    if (opts.filter((o) => o.correct === true).length !== 1) bad.push(`${tag}：正确选项应为 1 个`);
    const r = opts.find((o) => o.correct === true);
    if (r) {
      if (!(r.basis || []).length) bad.push(`${tag}：正解没有可搬运的依据引用`);
      if (!r.basisQuote) bad.push(`${tag}：正解没有 basisQuote`);
    }
    if (!opts.filter((o) => !o.correct).every((o) => !!o.why)) bad.push(`${tag}：错误选项缺 why`);
    if (new Set(opts.map((o) => o.text)).size !== opts.length) bad.push(`${tag}：选项有重复`);
  });
  return bad;
}
