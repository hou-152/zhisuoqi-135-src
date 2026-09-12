#!/usr/bin/env node
// 可信报告层：只读取确定性 e2e-result.json，不执行 PR 中的代码。
// 当前默认输出机器可复核的规则分类；未来接入模型时，模型仍只能解释，
// 不能修改 machineVerdict 或 required-check 结论。

import fs from 'node:fs';
import path from 'node:path';

const args = new Map(process.argv.slice(2).filter(x => x.startsWith('--')).map(x => {
  const i = x.indexOf('='); return i < 0 ? [x.slice(2), true] : [x.slice(2, i), x.slice(i + 1)];
}));
const input = path.resolve(String(args.get('input') || 'e2e-result.json'));
const output = path.resolve(String(args.get('out') || path.join(path.dirname(input), 'e2e-report.md')));
const data = JSON.parse(fs.readFileSync(input, 'utf8'));

const classify = (scenario) => {
  if (scenario.status === 'BLOCKED') return ['环境阻塞', '浏览器、依赖、服务启动或执行器不可用；不能按通过处理。'];
  if (scenario.status === 'UNSTABLE') return ['偶发失败', '首次失败、重试成功；按约定保留 UNSTABLE，等待人工判断。'];
  if (scenario.status === 'FAIL') {
    const error = scenario.error || scenario.attempts?.at(-1)?.error || '';
    if (/契约|mock|manifest|校验和|版本/i.test(error)) return ['契约漂移', '数据真源、mock 或测试契约不一致。'];
    if (/Chrome|浏览器|调试端口|超时|未就绪|spawn|ENOENT/i.test(error)) return ['环境阻塞', '错误看起来来自运行环境，需先复核日志。'];
    return ['产品或测试断言失败', '机器断言未通过；需要查看对应 DOM、截图和日志。'];
  }
  if (scenario.status === 'NOT_APPLICABLE') return ['不适用', '该 profile 不适用于当前运行平台或变更范围。'];
  return ['通过', '所有机器断言通过。'];
};
const cell = (value) => String(value || '—').replaceAll('|', '\\|').replaceAll('\n', ' ');

const lines = [];
lines.push('# 知所栖 135 · PR E2E 验收报告', '');
lines.push(`- 机器结论：**${data.verdict || 'UNKNOWN'}**`);
lines.push(`- PR：${data.pr ?? '本地运行'}`);
lines.push(`- head SHA：${data.headSha || '未知'}`);
lines.push(`- base SHA：${data.baseSha || '未知'}`);
lines.push(`- 合并候选 SHA：${data.candidateSha || '未知'}`);
lines.push(`- evaluator SHA：${data.evaluatorSha || '未知'}`);
lines.push(`- profile：${(data.profiles || []).join('、') || '未知'}`);
lines.push(`- 环境：${data.environment?.runner || 'local'} / ${data.environment?.os || '未知'} / ${data.environment?.node || '未知'}`, '');
lines.push('## 场景结果', '', '| 场景 | Profile | 状态 | 预期 | 实际 | 解释分类 | 证据 |', '|---|---|---|---|---|---|---|');
for (const scenario of data.scenarios || []) {
  const [kind, reason] = classify(scenario);
  const evidence = (scenario.artifacts || []).map(x => `\`${typeof x === 'string' ? x : (x.text || x.screenshot || '')}\``).filter(Boolean).join('<br>') || '—';
  lines.push(`| ${cell(scenario.id)} | ${cell(scenario.profile)} | **${cell(scenario.status)}** | ${cell(scenario.expected || '参照固定契约')} | ${cell(scenario.actual || '见 attempts 与证据')} | ${cell(kind)}：${cell(reason)} | ${evidence} |`);
}
lines.push('', '## 自动合并闸门', '', `required check 只读取机器结论 **${data.verdict || 'UNKNOWN'}**。只有 ` +
  '`PASS` 才能进入可信 workflow 的最新 SHA、分支保护和无新提交检查；AI 摘要、截图或主观意见不能把 FAIL、BLOCKED、UNSTABLE 改成 PASS。', '');
lines.push('## 限制和复核入口', '');
lines.push('- AI 解释：当前未调用模型；本报告使用零密钥确定性分类。未来模型只能读取本回执和脱敏证据，不能改写机器结论。');
for (const item of data.limitations || []) lines.push(`- ${item}`);
lines.push('- 本报告没有检出、安装或执行 PR 之外的修复代码。', '- 真实 LLM、知乎检索和生产凭证不在普通 PR 闸门内。', '');
lines.push('## 证据索引', '');
for (const item of data.artifacts || []) lines.push(`- 运行级网络／元数据：${item}`);
for (const scenario of data.scenarios || []) {
  for (const item of scenario.artifacts || []) {
    const value = typeof item === 'string' ? item : `${item.text || ''}${item.screenshot ? ` / ${item.screenshot}` : ''}`;
    if (value) lines.push(`- ${scenario.id}：${value}`);
  }
}

fs.writeFileSync(output, lines.join('\n') + '\n');
console.log(`报告已写入 ${output}`);
