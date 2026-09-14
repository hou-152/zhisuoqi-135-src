// 准入门：判据的「区分度自证」——三条机器条件（docs/准入门改版-区分度自证-20260914.md）。
//
// 一条判据要参与**通过判定**，必须同时满足：
//   ① 绑了逐字原文 —— 逐字 indexOf ＋ sha256 ＋ locator 指到同一句，机器可查、零人力；
//   ② 有至少一条**真实轨迹**证明它从 not-met 走到 met；
//   ③ 缺口在轨迹上**真的下降过**（第一轮就全 met ＝ 死判据，自动淘汰）。
//
// 三条不满足的照实标「待验证区分度」：**可以看、不参与通过判定、也不挡单元进入**。
// 这是和上一版最重要的区别 —— 上一版把「判据没过复核」当成不开放的理由，
// 于是 76 个单元永远停在「未装配」；这一版把未验证降级成**标注**，把「绑不到原文」升级成**硬条件**。
//
// 三条条件全部从磁盘现算，不读任何自述结论。轨迹只认 learnerIs.realHuman === true 的那一种：
// 脚本扮演的合成轨迹（learnerIs 写明"合成学习者/脚本扮演"）**不算真实轨迹**，照实排除。

export const PENDING_LABEL = '待验证区分度';
export const ACTIVE_LABEL = '已激活（区分度自证通过）';

const hasText = (x) => typeof x === 'string' && x.trim().length > 0;

/** 逐字原文绑定：形状 → 出处 → locator 指到同一句。纯结构判断，磁盘核查在调用方做。 */
export function verbatimBinding(citation) {
  if (!citation || typeof citation !== 'object') return { ok: false, why: '没有带出处的逐字材料（citation 缺）' };
  if (!hasText(citation.text)) return { ok: false, why: '引文为空' };
  if (!hasText(citation.sourceFile)) return { ok: false, why: '缺 sourceFile' };
  if (!/^[0-9a-f]{64}$/.test(String(citation.sourceSha256 || ''))) return { ok: false, why: 'sourceSha256 不是 64 位十六进制' };
  if (!hasText(citation.locator)) return { ok: false, why: '缺 locator' };
  return {
    ok: true,
    why: `逐字 ${citation.sourceFile}#${citation.locator}（sha256 ${String(citation.sourceSha256).slice(0, 12)}…）`,
    sourceFile: citation.sourceFile, locator: citation.locator, sha256: citation.sourceSha256,
  };
}

/** 轨迹的一轮取缺口集合：状态不是 met 的都算缺口（contradicted 与 partial 一样是缺口）。 */
export function gapsOfRound(round) {
  const st = (round && round.statuses) || {};
  return Object.keys(st).filter((id) => st[id] !== 'met');
}

/** 一份轨迹里判据 c 的观察序列：[{round, status, gapClosed}]。 */
export function observationsOf(trajectory, criterionId) {
  const rounds = (trajectory && trajectory.rounds) || [];
  const out = [];
  for (let i = 0; i < rounds.length; i++) {
    const st = (rounds[i].statuses || {})[criterionId];
    if (st === undefined) continue;
    const gaps = gapsOfRound(rounds[i]);
    out.push({
      round: rounds[i].round !== undefined ? rounds[i].round : i + 1,
      status: st,
      inGap: st !== 'met',
      gapCount: gaps.length,
      gapClosed: i > 0 ? gaps.length < gapsOfRound(rounds[i - 1]).length : false,
    });
  }
  return out;
}

/** 判据 c 在轨迹 t 上有没有走过 not-met → met（缺口在这一跳真的下降）。 */
export function progressionOn(trajectory, criterionId) {
  const obs = observationsOf(trajectory, criterionId);
  if (obs.length < 2) return { transitioned: false, why: `轨迹里关于这条判据的观察只有 ${obs.length} 轮（需要 ≥2 轮才谈得上"走过一遍"）`, observations: obs };
  for (let i = 1; i < obs.length; i++) {
    if (obs[i - 1].inGap && obs[i].status === 'met') {
      return {
        transitioned: true, at: obs[i].round, from: obs[i - 1].status, gapCountBefore: obs[i - 1].gapCount, gapCountAfter: obs[i].gapCount,
        observations: obs,
        why: `第 ${obs[i - 1].round} 轮 ${obs[i - 1].status} → 第 ${obs[i].round} 轮 met（那一轮缺口 ${obs[i - 1].gapCount} → ${obs[i].gapCount}）`,
      };
    }
  }
  return { transitioned: false, why: `这条判据在轨迹上没有从 not-met 走到 met（${obs.map((o) => o.status).join(' → ')}）`, observations: obs };
}

/** 缺口在轨迹上真的下降过：整份轨迹有没有哪一轮的缺口数比上一轮少。 */
export function gapDeclinedOn(trajectory) {
  const rounds = (trajectory && trajectory.rounds) || [];
  if (rounds.length < 2) return { declined: false, why: `轨迹只有 ${rounds.length} 轮（需要 ≥2 轮才谈得上缺口下降）` };
  const series = rounds.map(gapsOfRound).map((g) => g.length);
  for (let i = 1; i < series.length; i++) {
    if (series[i] < series[i - 1]) return { declined: true, at: i + 1, series, why: `缺口 ${series[i - 1]} → ${series[i]}（第 ${i + 1} 轮）` };
  }
  return { declined: false, series, why: `缺口在轨迹上没有下降过（逐轮缺口数 ${series.join(' → ')}）` };
}

/**
 * 三条机器条件全过 → active=true（参与通过判定）；否则 active=false 并照实标「待验证区分度」。
 *
 * @param criterion  判据：{ id, unitId, point, condition, misconception, citation }
 *                   citation = { text, sourceFile, sourceSha256, locator }（逐字原文绑定）
 * @param opts.trajectories  真实轨迹数组（只传 realHuman === true 的那些）
 * @returns {{active:boolean,label:string,reasons:string[],binding:object,trajectories:Array}}
 */
export function judgeCriterion(criterion, opts = {}) {
  const trajectories = (opts.trajectories || []).filter((t) => t && t.learnerIs && t.learnerIs.realHuman === true);
  const reasons = [];

  // ① 绑了逐字原文（citation 或 criterion 自带的出处字段两种写法都认，都是同一件事）
  const binding = verbatimBinding((criterion && criterion.citation) || criterion);
  reasons.push(`${binding.ok ? '✓' : '✗'} ① 绑了逐字原文：${binding.why}`);

  // ② 有至少一条真实轨迹证明它从 not-met 走到 met
  let hit = null;
  for (const t of trajectories) {
    const p = progressionOn(t, criterion.id);
    if (p.transitioned) { hit = { trajectoryId: t.trajectoryId, unitId: t.unitId, learner: t.learnerIs, ...p }; break; }
  }
  reasons.push(`${hit ? '✓' : '✗'} ② 真实轨迹里从 not-met 走到 met：${hit ? `${hit.trajectoryId}｜${hit.why}` : (trajectories.length ? `真实轨迹 ${trajectories.length} 份里都没有这条判据的这一步（${trajectories.map((t) => `${t.trajectoryId}: ${progressionOn(t, criterion.id).why}`).join('；')}）` : '一份真实轨迹都没有（脚本扮演的合成轨迹不算）')}`);

  // ③ 缺口在轨迹上真的下降过
  let declined = null;
  for (const t of trajectories) {
    const d = gapDeclinedOn(t);
    if (d.declined) { declined = { trajectoryId: t.trajectoryId, ...d }; break; }
  }
  reasons.push(`${declined ? '✓' : '✗'} ③ 缺口在轨迹上真的下降过：${declined ? `${declined.trajectoryId}｜${declined.why}` : (trajectories.length ? `真实轨迹里缺口都没有下降过（${trajectories.map((t) => `${t.trajectoryId}: ${gapDeclinedOn(t).why}`).join('；')}）` : '没有真实轨迹，无从谈起')}`);

  const active = binding.ok && !!hit && !!declined;
  if (!active) reasons.push(`→ 标「${PENDING_LABEL}」：可以看、不参与通过判定、不挡单元进入`);
  return {
    active,
    label: active ? ACTIVE_LABEL : PENDING_LABEL,
    conditions: { verbatimQuote: binding.ok, realTrajectory: !!hit, gapDeclined: !!declined },
    trajectory: hit ? { trajectoryId: hit.trajectoryId, unitId: hit.unitId, at: hit.at, from: hit.from, gapCountBefore: hit.gapCountBefore, gapCountAfter: hit.gapCountAfter } : null,
    gapDecline: declined ? { trajectoryId: declined.trajectoryId, at: declined.at, series: declined.series } : null,
    binding, reasons,
  };
}

/** 单元级汇总：判据数 / 激活数 / 待验证数。 */
export function summarizeUnit(checks) {
  const list = checks || [];
  return {
    total: list.length,
    active: list.filter((c) => (c.admission || {}).active === true).length,
    pending: list.filter((c) => (c.admission || {}).active !== true).length,
  };
}
