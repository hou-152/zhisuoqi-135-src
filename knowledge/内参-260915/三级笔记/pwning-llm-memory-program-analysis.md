# Some things should probably stay fuzzy（我不小心把LLM内存分析变成了程序分析）

## 一句话主旨
将模糊语言理解交给大模型，将确定性状态与规则推导交给 Datalog 逻辑引擎（Lemmalog），解决长程调查中事实被推翻后模型幻觉与记忆不一致的难题。

## 作者试图回答的问题
在耗时数小时的复杂软件漏洞挖掘中，当某个早期观察或假设被证明错误时，如何避免 LLM 遗忘该推翻、继续基于过时前提产生错误推论？

## 三级论证骨架

### 一、长程漏洞研究中传统向量记忆（RAG）的失效
#### 1.1 依赖关系无法自动撤销的致命缺陷
- 长期调查中，模型会遗忘已被排除的假设，继续信任无效前提。
  - 原话：“显然，告诉一个法学硕士（LLM）某些事情是错误的，并不一定意味着它会停止相信所有依赖于它的事情 :)”
- 传统 RAG 仅做嵌入和语义检索，导致记忆库中同时存在“A 指向 B”和“A 不指向 B”的自相矛盾信息。
#### 1.2 记忆的核心不是检索对话，而是维护当前知识状态
- 漏洞挖掘不仅需要回忆说过的话，更需要确立当前真实的世界状态。
  - 原话：“我希望它能**保持我们目前所知的状态**。”

### 二、程序分析视角与 Datalog 引入
#### 2.1 不动点计算与因果传播
- 静态程序分析依靠事实（Facts）与规则（Rules）计算不动点推导新事实；当输入事实改变时，只需增量更新受影响结果。
  - 原话：“If an observation changes, I don’t want the model to reconstruct the entire investigation from a transcript and hopefully notice all of the consequences. I want the affected conclusions to become invalid automatically.”
- 引入 Datalog 声明式逻辑编程语言：
  - 原话：“Datalog is a declarative logic programming language. Instead of writing instructions describing how something should be calculated, we describe facts and rules from which new facts can be derived.”
#### 2.2 模糊（Fuzzy）与确定性（Deterministic）彻底解耦
- 由此诞生的开源引擎 Lemmalog 的核心哲学：
  - 原话：“The basic idea is that an LLM should not necessarily be responsible for maintaining its own knowledge. Instead, I split the problem into two parts.”
- LLM 负责模糊理解：处理自然语言、反汇编代码、LLDB 调试器输出，提取结构化谓词事实。
- 逻辑引擎负责确定性推导：基于规则推导新结论并维护状态。

### 三、关键机制：撤销、因果溯源与时态区间
#### 3.1 事实撤销（Retractions）与支持度维护
- 结论可能由多条独立路径支持（如多种漏洞利用原语）；当撤销某个事实时，引擎自动检测是否仍有其他有效路径支持该结论。
#### 3.2 结论因果溯源（Provenance）
- 引擎天然记录派生事实的因果树：
  - 原话：“Because Lemmalog already tracks the dependencies of derived facts, we can ask it for the provenance of a conclusion.”
- 若底层某条观察被证伪，受影响的推论自动失效；用户可随时质询模型“凭什么相信该结论”，杜绝无凭无据的幻觉蔓延。
#### 3.3 时态有效区间（Validity Intervals）
- 为事实关联时间区间 `[t_start, t_end)`，既能查询“当前什么为真”，又能追溯“两小时前为什么采取该策略”。

## 作者边界、反例与不确定性
作者明确指出，Lemmalog 无法阻止 LLM 在最初从非结构化文本中提取事实时发生幻觉，但能确保未获得溯源支持的虚假断言绝不可能无声融入系统状态；此外，对于高阶动态模糊语义，纯符号规则依然存在表达能力上限。
