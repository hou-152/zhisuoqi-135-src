---
id: cm_ec485c61
name: Computer-Use Training / Harness
nameEn: computer use, harness
type: CONCEPTUAL
subject: AI 内参 260912
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.052
depth: 0
origin: [neican]
aliases: ["computer use, harness"]
sources: 1
---

# Computer-Use Training / Harness · computer use, harness

> 模型通过 harness 操作本机软件：出截图、预测鼠标键盘动作、执行后返回新截图与成败信号。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.052

## 费曼一下

Computer use 指模型通过 harness 操作本机软件：harness 提供截图，模型预测鼠标键盘动作，动作在环境中执行，再返回新截图和成功/失败信号。训练时 Mac 主要是环境，模型仍在 GPU 上。它说明 Astra 的强项来自环境交互和 harness，而不是 looped transformer 或 CoT 隐藏机制。

## 原文 context

The Macs (or their macOS operating system, to be precise) serve as an environment that the model can interact with during training.

> The Mac is mostly the environment here and not the machine for running or updating the model during training. The model likely sits on NVIDIA GPUs and is fed via API to said Mac.

> However, computer use is a relatively new capability, enabled by the harness, and usually feels not quite as mature yet.

## 掌握证据（做到这些才算会）

- 能描述“截图—动作—新截图”的训练循环
- 能说明训练时 Mac 是环境、模型仍跑在 GPU 上

## 验收问句

> 在 {{name}} 里，环境、模型与成功失败信号各扮演什么角色？

## 出场

- AI 内参 260912 ｜ 《GPT-6 Astra, Looped Transformers, and Hidden Reasoning》 ｜ https://magazine.sebastianraschka.com/p/gpt-6-astra-looped-transformers-and

## 别名

`computer use, harness`
