---
id: cm_a2868643
name: 运行时限制、权限与数据保留边界
nameEn: Runtime Limitations, Constraints, and Retention
type: CONCEPTUAL
subject: AI 内参 260912
domain: tools-sandbox
learningStage: when-needed
verification: judge
centrality: 0.196
depth: 0
origin: [neican]
aliases: ["Runtime Limitations, Constraints, and Retention"]
sources: 1
---

# 运行时限制、权限与数据保留边界 · Runtime Limitations, Constraints, and Retention

> 技能可做的事取决于所在产品面的运行时限制，如 API 无网络、不能装包，且不受 ZDR 覆盖。

**领域** tools-sandbox ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.196

## 费曼一下

技能能做什么，取决于它在哪个产品面运行。API 是沙箱，不能访问网络，也不能在运行时安装新包；claude.ai 的网络权限可能完整、部分或没有；Claude Code 有完整网络权限，但原文不建议全局安装软件包。数据保留方面，Agent Skills 不在 ZDR 覆盖范围内，技能定义和执行数据按标准数据保留政策保留。这些限制决定技能是否可规划、能否联网、能否装包，以及数据如何被保留。

## 原文 context

The exact runtime environment available to your Skill depends on the product surface where you use it.

Claude API: No network access: Skills cannot make external API calls or access the internet. No runtime package installation: Only pre-installed packages are available. You cannot install new packages during execution.

claude.ai: Varying network access: Depending on user/admin settings, Skills may have full, partial, or no network access.

Claude Code: 完全网络访问权限： Skills 与用户计算机上的任何其他程序具有相同的网络访问权限。不建议进行全局软件包安装： Skills 应该只在本地安装软件包，以避免干扰用户的计算机。

Agent Skills is not covered by ZDR arrangements. Skill definitions and execution data are retained according to Anthropic's standard data retention policy.

## 掌握证据（做到这些才算会）

- 能对比 API、claude.ai、Claude Code 的网络与装包权限
- 能说出 Agent Skills 不在 ZDR 覆盖范围内

## 验收问句

> {{name}} 下 API 面能否发起外部网络调用？

## 懂了它才能懂（解锁 2）

- [[allowed-tools]] — 不懂【运行时限制、权限与数据保留边界】里的正常权限模型与 ZDR 不覆盖的前提，就做不了 allowed-tools 的 ⟨判断省略该字段后技能回到什么样的默认权限⟩
- [[运行时失败的三类原因]] — 不懂【运行时限制、权限与数据保留边界】（所在产品面 API 无网络、不能装包），就做不了运行时失败三类原因中 ⟨「缺外部依赖」这一类的定位⟩

## 出场

- AI 内参 260912 ｜ 《Using Agent Skills with the API（用 API 使用 Agent Skills）》 ｜ https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview

## 别名

`Runtime Limitations, Constraints, and Retention`

## 反链

- [[allowed-tools]]
- [[运行时失败的三类原因]]
