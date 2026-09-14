# 产品开发的下一阶段由上下文与行动能力驱动

## 一句话主旨
问题追踪已死；新系统围绕上下文与agent，将上下文转化为执行。

## 作者试图回答的问题
- 核心问题：任务列表/问题追踪系统能否升级为Agent可理解、可行动的协作系统？
- 子问题：旧问题追踪为何失效？替代系统应以什么为核心、由什么驱动，又通过哪些产品能力落地？

## 三级论证骨架
### 一、旧范式：问题追踪为“交接模型”而生，流程旨在分配稀缺工程时间
#### 1.1 交接模型是旧系统的设计原点
- 问题追踪最初服务于软件开发的“交接模型”：PM先划定工作范围，工程师稍后接手。
- 为在角色与职能间小心路由工作，系统塞满优先级排序、协商、工作流，用来弥合交接缝隙。
- 这些仪式有真实约束：“Engineering time was scarce”——工程时间是瓶颈时，谨慎分配工作才有价值。

#### 1.2 这套机制随时间退化为负担
- 系统吸收的流程越多，越显得先进；“complexity started to look like sophistication”。
  - 结果是开销不断膨胀，最终“the process became the work”——管理流程本身消耗掉本应用于构建的精力。

### 二、Linear的相反信念及agent对它的放大
#### 2.1 Linear的基线：移除开销而非打磨流程
- Linear一贯信念：最好的系统“remove overhead so teams can focus on building”。
- 价值坐标不是把流程打磨得更精致，而是直接拿掉不必要的流程。

#### 2.2 Agent把“移除开销”推得更远：阶段压缩与人的回归
- Agent吸收程序性工作，使规划、实现、代码评审三个阶段“begin to compress”。
- 人因此能把更多时间花在“intent, judgment, and taste”上，少花时间管理流程的机械环节。

#### 2.3 转变已被数据证实
- Coding agents已进入超过75%的Linear企业工作区。
- 过去三个月，agent完成的工作量增长5倍。
- Agent撰写了接近25%的新issue。
- 由此推出：下一个系统“designed around context and agents”，而非围绕交接设计。

### 三、新范式的核心：上下文必须存在于人与agent共享的系统
#### 3.1 Agent依赖上下文，不读心
- “Agents are not mind readers. They become useful through context.”
- 需捕获的上下文包括：客户反馈、内部想法、战略方向、决策、代码。

#### 3.2 共享系统应具备四种行动能力
- 系统应理解意图、把工作路由给正确执行者、在需要时升级、保持执行推进。
- 目标是帮团队把工作向前推进，“not trap them inside the process”。

#### 3.3 Linear的自我定位：把上下文转化为执行
- 定位句：“Linear is the shared product system that turns context into execution”。
- 它承载反馈、意图、决策、计划、代码，把上下文塑造成工作，并帮人与agent一路带到生产环境。

### 四、产品发布：将上下文与行动能力产品化
#### 4.1 今日发布
- Linear Agent：原生agent界面，在产品上下文中工作，分析用户反馈，生成项目、issue和文档。
- Skills：把值得重复的工作流固化为可复用技能，让学习复利累积；可斜杠命令手动触发，也可在相关时自动应用。
- Automations：从Triage开始，issue进入系统的瞬间触发agent工作流；每个新issue增添上下文，系统可在到达那一刻就精炼、综合或采取行动。

#### 4.2 即将推出
- Code Intelligence：理解代码库、回答关于它的问题并调试。
- Code Diffs：为人与agent协同迭代设计的快速现代代码评审界面。
- Linear Coding Agent：Linear自己写代码、自动修复bug，由前沿模型与harness驱动，用Linear原生上下文与工具增强。

#### 4.3 收束：压缩想法与实现之间的距离
- 这些更新建立在Triage Intelligence及云端coding agents、其他AI工具深度集成之上。
- 通过让agent扎根于产品与代码库完整上下文，Linear在“collapsing the distance between an idea and its implementation”。
- 收束对照：“Issue tracking was built for handoffs. Linear turns context into execution.”

## 作者边界、反例与不确定性
- 作者明确给出的边界：agent不是读心者，只有获得完整上下文才有用；人并未退出，而是保留“意图、判断与品味”，agent吸收的主要是程序性工作。
- 产品状态有区分：Code Intelligence、Code Diffs、Linear Coding Agent仍属“即将推出”，尚未兑现。
- 数据口径限于Linear生态：75%企业工作区、5倍增长、近25%新issue，均为Linear平台数据，未提供跨行业绝对基准。
- 原文未给出明确反例，也未讨论交接模型在合规、强流程等场景中可能保留的价值。
