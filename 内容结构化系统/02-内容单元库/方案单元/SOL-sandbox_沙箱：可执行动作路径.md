---
id: SOL-sandbox
type: 方案单元
title: "沙箱：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "沙箱"
  - "Sandbox"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：Sandbox 限制执行环境与爆炸半径，不负责判断动作是否获准；权限边界仍应在执行前独立生效。"
solution_summary: "默认只挂载任务需要的文件与依赖，收窄网络、命令、CPU、内存、时间和凭证访问。"
action_steps:
  - "默认只挂载任务需要的文件与依赖，收窄网络、命令、CPU、内存、时间和凭证访问。"
  - "运行前验证隔离策略，运行后检查输出和外部副作用；不要只相信配置名称里写着 sandbox。"
  - "把可恢复产物和状态放到明确的外部存储，并让工作区可以安全销毁与重建。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-sandbox
    note: "本方案是「沙箱」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：Sandbox 限制执行环境与爆炸半径，不负责判断动作是否获准；权限边界仍应在执行前独立生效。

**动作路径（how_to，逐条照抄源数据）**
1. 默认只挂载任务需要的文件与依赖，收窄网络、命令、CPU、内存、时间和凭证访问。
2. 运行前验证隔离策略，运行后检查输出和外部副作用；不要只相信配置名称里写着 sandbox。
3. 把可恢复产物和状态放到明确的外部存储，并让工作区可以安全销毁与重建。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/sandbox.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-sandbox]] —— 本方案是「沙箱」的落地动作
- [[CON-sandbox_沙箱]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
