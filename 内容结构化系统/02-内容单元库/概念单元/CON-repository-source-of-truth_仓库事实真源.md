---
id: CON-repository-source-of-truth
type: 概念单元
title: "仓库事实真源"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息平时放在哪里"
  - "信息平时放在哪里"
keywords:
  - "仓库事实真源"
  - "Repository as Source of Truth"
  - "信息平时放在哪里"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "将 Agent 执行所需的项目规则、任务范围、状态与验收入口保存在版本化仓库中，使不同会话和执行者从同一可读取基线开始工作。"
concept_function: "解释「仓库事实真源」是什么、边界在哪；分类：信息平时放在哪里（现在就要懂）"
relationships:
  - type: 回应
    target: CON-state-management
    note: "原 kind=used-with｜版本化仓库为进度、任务范围和交接状态提供可持续读取的载体。"
  - type: 回应
    target: CON-context
    note: "原 kind=used-with｜仓库是真源入口，具体任务仍需从中选择并装配当前所需 Context。"
---

## 核心内容

**定义（remember）**：将 Agent 执行所需的项目规则、任务范围、状态与验收入口保存在版本化仓库中，使不同会话和执行者从同一可读取基线开始工作。

**费曼一下**：团队里的默契、走廊上的口头共识、某个人脑子里的历史包袱，对 agent 全是虚空。它的世界边界就是它能读到的文件——所以想让它知道的事，都得写进仓库。

**边界（明确不成立的用法）**
- 它不表示所有组织知识都必须进入仓库，只要求运行所依赖的事实不能仅存在于口头、个人脑中或不可定位的聊天记录。
- 仓库中的文件也可能过期或冲突，仍需明确权威顺序和维护责任。
- 单纯存在文件不证明 Agent 已读取、采用或正确执行其中内容。
- 当前证据缺口：需要补充仓库外动态真源如何登记、同步与失效处理。

**迁移问题**：哪些团队知识必须进入仓库才能支撑 Agent，哪些因隐私或时效性应留在其他受控系统并只登记入口？

**分类问题**：哪些信息会被保留，任务进度又记在哪里？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/repository-source-of-truth.yaml`（name_en: Repository as Source of Truth）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《Harness 工程学习仓库：从原始文献到能跑的 skill》：这段将仓库内可读取文件设为 Agent 指令、状态和范围的共同事实入口，排除口头与个人记忆作为运行依赖。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：现在就要懂

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [回应] [[CON-state-management]] —— 原 kind=used-with｜版本化仓库为进度、任务范围和交接状态提供可持续读取的载体。
- [回应] [[CON-context]] —— 原 kind=used-with｜仓库是真源入口，具体任务仍需从中选择并装配当前所需 Context。
- [[CON-state-management_状态管理]]
- [[CON-context_上下文]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
