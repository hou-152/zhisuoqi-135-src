# GitHub 同类项目对标报告

**访问日期：** 2026-09-06（Asia/Shanghai）  
**研究目的：** 为「知所栖」核对“问题驱动交互学习 → 概念关系 → 个人知识树 → 后续探索”的产品拟合方向，寻找可借鉴的开源实现。  
**证据原则：** 以下判断优先来自仓库 README、项目设计文档、源码目录和许可证等一手资料。仓库自述的“支持／计划支持”不等于本地运行验收；报告不把 star 数或宣传语当成效果证据。

## 一、分层结论

没有发现一个可以直接证明“从用户原问题自动判断缺口，并把本次学习结果沉淀为个人知识树”的成熟开源替代品。候选项目分成三层：

- **直接同类：** EduMind、Flame Education、KnowledgeGrapher。它们分别覆盖知识图谱驱动导师、AI 课程与语音交互、从教材生成概念关系图。
- **底层能力：** Khoj、Mycel。它们提供本地优先的个人知识库、检索、链接和图谱能力，但核心目标是知识管理／问答，不是教学闭环。
- **视觉／交互参考：** Logseq、AFFiNE。它们验证了大纲、双向链接、图谱、画布和本地数据等信息架构；不提供知所栖所需的学习诊断。

对知所栖最有价值的组合不是照搬某个项目，而是取三件事：EduMind 的“节点—前置—评估”数据模型，KnowledgeGrapher 的“文本→概念→关系”管道，Logseq／Mycel 的“用户可见、可回看、可导出”的知识结构呈现；同时保留知所栖从**原问题**出发并在结束页回接原问题的核心叙事。

## 二、直接同类

### 1. EduMind — AI 驱动个人导师系统

- **仓库：** https://github.com/WekiLee/EduMind
- **一手资料：** [README](https://github.com/WekiLee/EduMind/blob/main/README.md)、[设计文档 DESIGN.md](https://github.com/WekiLee/EduMind/blob/main/docs/DESIGN.md)、[优势对比 ADVANTAGES.md](https://github.com/WekiLee/EduMind/blob/main/docs/ADVANTAGES.md)、[许可证 AGPL-3.0](https://github.com/WekiLee/EduMind/blob/main/LICENSE)
- **功能证据：** README 自述“从零到一建立完整知识图谱，教、练、评、拓一体化”；亮点包括“每个知识点在图中有唯一位点，教学是对图的拓扑序遍历”、领域／学习者画像、对话教学、节点测验、掌握度和间隔重复。DESIGN.md 进一步写明 Neo4j 图谱、前置依赖、按拓扑生成大纲、评估后更新 mastery、节点按掌握度着色，以及学习报告和图谱全览。
- **与知所栖相似：** 都把知识关系和学习结果放在“课程完成”之上，并希望形成个人化知识结构；都包含学习、练习、评估、继续探索的闭环想法。
- **关键不同：** EduMind 从预先构建／导入的领域图谱和学习目标出发，用户输入主题（如“我要学 Python 深度学习”）后生成路径；知所栖当前原型从一个具体困惑出发，课程仍固定为 3 个概念，尚未让问题决定学习目标。EduMind 的 mastery 是量化模型设计，知所栖当前 `1 / 3` 只是最近一次检验通过数。
- **可借鉴：** 将“概念节点、关系类型（前置／关联）、学习证据、任务产出、评估历史”分开建模；结束页提供本次节点覆盖与下次解锁建议；明确区分当前状态与历史记录。
- **不能据此推断：** 设计文档不能证明其教学效果、生成内容准确率或真实用户留存；“完整知识图谱”是项目目标，需运行和数据验证。

### 2. Flame Education（火花 AI 教育）

- **仓库：** https://github.com/FlameEducation/FlameEducation
- **一手资料：** [README](https://github.com/FlameEducation/FlameEducation/blob/main/README.md)、[许可证](https://github.com/FlameEducation/FlameEducation/blob/main/LICENSE)
- **功能证据：** README 自述采用 React／TypeScript／Vite，支持 LLM、ASR、TTS；输入任意主题自动生成课程大纲和内容；实时语音交互；解析对话动态生成可视化知识图谱；“自由学习课”与移动端适配。仓库同时提供课程创建、设置等界面截图资源。
- **与知所栖相似：** 都强调从用户想学的主题／问题进入课程，并在学习过程中生成可视化知识关系；都把语音／多模态交互视为未来体验方向。
- **关键不同：** Flame 的入口是主题到自动课程，偏“AI 教师＋课程生成”；知所栖原始画更强调具体问题、概念补足和个人知识树回看。README 没有说明问题级学习记录、练习证据如何隔离或结束页如何回接原问题。
- **可借鉴：** 把“生成课程”“语音问答”“图谱更新”拆成可替换能力；Demo 可以先用固定课程验证叙事，再为真实 AI 接入预留接口。
- **不能据此推断：** “全流程自动化”“实时”是 README 宣称，不能直接证明延迟、稳定性、知识图谱正确性或学习成效；许可证为个人免费／非商业，商用前必须重新核对条款。

### 3. KnowledgeGrapher

- **仓库：** https://github.com/openimpactai/KnowledgeGrapher
- **一手资料：** [README](https://github.com/openimpactai/KnowledgeGrapher/blob/main/README.md)、[许可证 MIT](https://github.com/openimpactai/KnowledgeGrapher/blob/main/LICENSE)、[示例代码](https://github.com/openimpactai/KnowledgeGrapher/blob/main/examples/example_usage.py)
- **功能证据：** README 说明从教育内容中提取关键概念、识别关系、构建层级知识结构并生成交互可视化；支持 PDF、文本和网页输入，输出 JSON、GraphML 等；技术栈描述包括 Transformer、NetworkX、FastAPI、D3.js／Cytoscape.js。
- **与知所栖相似：** 都需要把文本／对话中的概念及其关系显性化，最终让学习者看到结构，而不是只有聊天记录。
- **关键不同：** KnowledgeGrapher 是“内容→图”的基础工具，不负责解释、练习、答题、掌握度、原问题回看或个人学习路径；它生成的是内容结构，未证明是用户真正理解的结构。
- **可借鉴：** 将概念提取、关系候选、层级结构和可视化导出独立成管道；在知所栖中可先把 AI 生成关系标为“候选”，经用户确认后再进入个人知识树。
- **不能据此推断：** 自动抽取的关系不等于事实正确或教学适切；README 没有给出基准数据、精度、复杂材料表现或可用性评估。

## 三、底层能力

### 4. Khoj — AI second brain

- **仓库：** https://github.com/khoj-ai/khoj
- **一手资料：** [README](https://github.com/khoj-ai/khoj/blob/master/README.md)、[文档](https://docs.khoj.dev)、[许可证](https://github.com/khoj-ai/khoj/blob/master/LICENSE)
- **功能证据：** README 将 Khoj 定位为“Your AI second brain”，提供自托管、离线／本地模型与 OpenAI 兼容 API，并支持在个人文档上检索、对话和扩展。文档与源码包含文本、Markdown、PDF 等知识源和搜索／聊天能力。
- **与知所栖相似：** 都重视个人资料归属和围绕用户材料的持续上下文；可作为“问题、课程卡、学习卡”的本地检索底座。
- **关键不同：** Khoj 的主任务是从已有资料中找答案和对话，不是根据问题设计教学路径、验证理解或生成知识树；其“second brain”不代表学习掌握度。
- **可借鉴：** 本地优先、可替换模型、资料源与会话索引分离；为知所栖的学习卡导出和续学提供存储／检索思路。
- **不能据此推断：** 检索命中或回答流畅不等于学习发生；不要把 RAG 命中率当作概念掌握度。

### 5. Mycel

- **仓库：** https://github.com/Mycel-AI-notes/Mycel
- **一手资料：** [README](https://github.com/Mycel-AI-notes/Mycel/blob/main/README.md)、[图谱示例图片](https://github.com/Mycel-AI-notes/Mycel/blob/main/public/graph.png)、[许可证 MIT](https://github.com/Mycel-AI-notes/Mycel/blob/main/LICENSE)
- **功能证据：** README 将其定位为本地优先 Markdown 知识库，使用 Tauri／Rust，支持 Wikilinks、反向链接、实时大纲、标签、内联数据库、力导向图、GitHub 私有同步及全局快捷键；数据以用户目录中的普通 Markdown 文件保存。
- **与知所栖相似：** 都希望让个人知识关系可见、可持续积累，并强调数据可拥有、可回看。
- **关键不同：** Mycel 负责记录和连接用户笔记，不决定“该学什么”、不提供概念解释／练习／评估，也没有问题到学习结果的闭环。
- **可借鉴：** 知识树节点应能回到原始学习卡／问题证据；普通 Markdown／JSON 导出可减少锁定；图谱视图可作为第三栏“后续方向”之外的知识结构入口。
- **不能据此推断：** 有图谱视图不等于图谱语义正确；仓库标注 v0.1 active development，功能稳定性与跨平台质量需自行验收。

## 四、视觉／交互参考

### 6. Logseq

- **仓库：** https://github.com/logseq/logseq
- **一手资料：** [README](https://github.com/logseq/logseq/blob/master/README.md)、[官方文档](https://docs.logseq.com/)、[许可证](https://github.com/logseq/logseq/blob/master/LICENSE.md)
- **功能证据：** README 定位为 privacy-first、open-source knowledge management and collaboration 平台；官方文档及产品界面采用块级大纲、双向链接、页面／标签和图谱等组织方式。
- **与知所栖相似：** 知所栖原始 v1 也有“我的知识树”和领域总览，Logseq 提供了把碎片记录组织成可回看的块和链接的成熟交互参考。
- **关键不同：** Logseq 是通用知识管理工具，链接由用户或插件维护，不提供问题诊断、课程编排和学习评估；它的图谱不自动证明“用户理解了”。
- **可借鉴：** 让学习卡、作答、用户产出成为可展开的证据块；支持从一个概念追溯来源问题和后续讨论，而不是只显示节点名称。
- **不能据此推断：** 大纲＋图谱交互本身不会自动形成个人学习路径；不要把 Logseq 的通用 PKM 直接当教育产品范式。

### 7. AFFiNE

- **仓库：** https://github.com/toeverything/AFFiNE
- **一手资料：** [README](https://github.com/toeverything/AFFiNE/blob/master/README.md)、[官方文档](https://docs.affine.pro/)、[许可证](https://github.com/toeverything/AFFiNE/blob/master/LICENSE)
- **功能证据：** README 定位为 privacy-focused、local-first、open-source 的 Notion／Miro 替代，强调文档、白板、数据库和统一工作区，并提供本地／云端使用和可视化画布。
- **与知所栖相似：** 可参考“知识树＋关系图＋自由画布”并置的空间，让用户在课程结束后整理自己的理解和下一步。
- **关键不同：** AFFiNE 是通用写作、绘图、规划工作区，不负责从问题生成学习目标、练习或掌握度；自由画布也可能把未经验证的关系视觉化。
- **可借鉴：** 结束页允许用户把“本次理解／仍不确定／下一步问题”组织成轻量卡片或关系图；保持本地优先和可导出。
- **不能据此推断：** 工作区的自由度不等于学习效率；知所栖首版不应直接引入复杂白板，避免视觉形式掩盖问题闭环。

## 五、对知所栖的对标判断与建议

### 可以确认的产品差异

1. **入口差异：** 多数候选从主题、资料或笔记开始；知所栖的辨识度在于从一个具体问题开始，并且要在课程结束明确回答“本次补了什么、还缺什么”。
2. **结果差异：** 候选多输出课程、答案、图谱或笔记；知所栖应把“概念关系＋用户自己的处理方案＋未解决点”作为一次学习结果。
3. **状态差异：** EduMind 设计了节点级 mastery 与历史快照；知所栖目前是固定 3 概念的最近通过数。两者不能直接比较，也不能把 `1 / 3` 宣传成累计掌握度。
4. **问题隔离：** 候选资料没有证明不同问题之间如何隔离概念证据、任务产出和组合结果。知所栖应把这列为待讨论语义，而不是因“有图谱”就默认跨问题复用。

### 最小拟合路线（不扩充 Demo 范围）

- 保留现有固定课程，先在每个概念页显示“原问题”和“本概念与它的关系”。
- 结束页增加三段：本次覆盖的概念／关系、仍未解决的部分、用户写的一句下一步处理方案。
- 知识树节点保留来源问题、学习卡、练习证据和时间；自动抽取的关系先标为候选，用户确认后再成为正式关系。
- 左侧第三栏“后续方向”只承载待讨论、待验证和可能聊天的方向，不混入当前学习状态；它是探索入口，不是已完成的知识树。
- 在语义规则确定前，不接入 AI 自动课程生成、不扩课、不改变跨问题状态规则。

## 六、边界与后续验证

- 本报告是仓库级研究，不是对候选项目的完整运行测试；未执行其部署、模型调用、准确率和多用户并发验收。
- GitHub README 的功能列表可能包含路线图或作者自述；实现状态需锁定具体 commit 后再复核。
- 许可证只说明代码使用条件，不自动授予项目名称、截图、模型或课程内容的再发布权。
- 下一轮若要深入对标，应选 2 个仓库做可复现实验：EduMind（输入一个问题，观察图谱／路径／评估数据是否写回）与 KnowledgeGrapher（同一材料抽取关系，人工核对候选边）；其余项目先作为交互和存储参考。
