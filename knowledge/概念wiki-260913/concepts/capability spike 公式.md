---
id: cm_4f1a541c
name: capability spike 公式
type: REPRESENTATIONAL
subject: AI 概念库
domain: model-training
learningStage: deep-dive
verification: judge
centrality: 0.017
depth: 0
origin: [notion]
aliases: ["capability spike formula", "capability spike", "能力跃迁公式"]
sources: 1
---

# capability spike 公式

> capability spike ≈ 可验证性 × 训练注意力 × 数据覆盖 × 经济价值，四者同时高才可能跃迁。

**领域** model-training ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.017

## 原文 context

<mention-page url="https://app.notion.com/p/202679b108ff8386979a01933594c9bc"/>
> capability spike \~= verifiability × training attention × data coverage × economic value
**费曼一下**：Karpathy 给"LLM 在哪里飞、在哪里傻"的粗略公式。
一个领域要出现能力跃迁（capability spike），需要四样东西**同时**具备：
- **verifiability**：任务的成功能被自动判定
- **training attention**：实验室在 post-training / RL 里专门搞过这块
- **data coverage**：pretraining mix 里有足够多这领域的数据
- **economic value**：这事经济价值高，所以实验室愿意投资源
**chess 例子**：GPT-4 棋艺跃升不一定是"通用智能均匀提高"，而很可能是 OpenAI 把大量棋谱塞进 pretraining mix。
这个公式连接 verifiability 与 jagged intelligence——解释了为什么模型即使在 verifiable 任务上也表现不均：因为 attention/coverage/value 的分布本身是不均的。
创业者实操：找四个因子**同时高但前沿实验室没投入**的缝隙——这是 startup wedge。

## 掌握证据（做到这些才算会）

- 能对某个领域按四个因子打分并判断是否会跃迁
- 能指出四因子同时高但前沿实验室尚未投入的缝隙

## 验收问句

> 用 {{name}} 评估一个新领域，四个因子各打几分？

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/capability-spike-e51679b108ff82b1964a81a8f9384a08

## 别名

`capability spike formula`、`capability spike`、`能力跃迁公式`

## 反链

- [[外包思考，但不外包理解]]
- [[Agent-Native Infrastructure]]
- [[Sensors 与 Actuators]]
