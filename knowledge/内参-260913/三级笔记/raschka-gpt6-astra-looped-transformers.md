# 《GPT-6 Astra, Looped Transformers, and Hidden Reasoning》

## 一句话主旨
循环变换器不是隐藏思维链的元凶；更短推理链是模型变强的副作用。

## 作者试图回答的问题
GPT-6 Astra 是否（以及是否可能）使用"循环变换器/recurrent depth"？如果是，这会不会导致它隐藏或掩盖推理链（思维链）？关联子问题：循环变换器是什么、值不值得用、对推理链长度有何影响。

## 三级论证骨架

### 一、GPT-6 Astra 的印象：能力重心在计算机使用
#### 1.1 基准表现
- 作者用过的最强模型，在几乎所有类别上超越 GPT-5.6 Sol，尤其擅长 3D 渲染与动画。
  - ARC-AGI-3 达 99.9%（GPT-5.6 Sol 仅 7.8%），但作者认为数学、编码、computer-use 基准更贴近真实使用。
  - 在 Artificial Analysis Coding Agent Index v1.4 上处于前沿，但"doesn't pull ahead by leaps and bounds"。
- 独立基准（Artificial Analysis）可能比模型开发者自评更可信。
  - harness 设置影响比较：共享 harness 时更"apples-to-apples"；但模型训练时通常只针对一个主 harness 微调，其他 harness 上可能被低估。
- 旁注：建议删/归档旧的 `AGENTS.md` 与 `SKILL.md` 内容。
  - 新模型更能理解 prompt，多余的手把手提示反而限制模型、导致更差方案；部分工作流仍值得保留以复用效率。

#### 1.2 计算机使用能力是真正的亮点
- Astra 在图像、渲染任务上异常强；涉及 GUI 交互时体现 computer-use 能力（通过 Codex/ChatGPT app 操作本机软件）。
  - 案例：在浏览器版 MS Paint 中用鼠标重画作者头像（仅用 Medium 和 High，省 token）。
  - 社区案例：Blender 渲染纽约市、虚拟看房。
- computer use 不算全新，但通常"feels not quite as mature yet"。
  - 原因：LLM 本质是文本模型，写作/编码/API/CLI 是"lower-hanging fruit"。
  - 类比人形机器人：不比专用设备高效，但胜在 versatile；很多软件尚不暴露 CLI。
- 预期未来数月到数年，computer use 会在 LLM 与 agent harness 两个层面持续完善，也让非技术人群受益。

#### 1.3 计算机使用训练
- 据报 OpenAI 购买了数万台 Mac Mini 和 Mac Studio 用于 RL。
  - 这些 Mac 不用于训练模型（训练用 GPU），而是作为环境暴露 macOS 供模型学习操作。
  - NVIDIA CEO 称 Astra 训练用了约 10 万块 Grace Blackwell GPU；模型在 NVIDIA GPU 上，通过 API 喂给 Mac。
- 训练工作流：任务 prompt → 喂截图 → 模型预测鼠标/键盘动作 → harness 执行 → 喂新截图 → 循环至成功/失败 → 用成功/失败信号与 verifier/grader 作反馈（包括 post-training 的 RL，类似 RLVR）。

#### 1.4 Astra 仍是推理模型
- computer-use 训练不是训练范式的根本转变；Astra（及可预见的任何 LLM）仍是推理模型。
  - 用 RLVR 训练，产生中间推理轨迹（思维链）。

### 二、循环变换器：把中间表示多次送过同一批块
#### 2.1 复用 transformer 块（Nanbeige4.2-3B 为例）
- 核心思想：把中间表示多次送过同一批 transformer 块，而不是只过一次；关键在**多次传递间权重不变**。
  - 术语：transformer block（含 attention、feedforward、normalization、shortcut）；stack（块的序列）；block application（一次前向）。
  - 思想不新，最早见于 2018 年的 Universal Transformers。
- Nanbeige4.2-3B：22 个块应用两次（多出一个橙色回环箭头）。
  - 展开后 = 44 次 block application；第 23 次用第 1 个块的权重，以此类推。
  - 效果：有效深度从 22 提到 44，但不增加另一套权重。
  - 为何是 2 次？论文称最省；加到 3 次能提升建模性能，但额外算力不划算。

#### 2.2 循环的代价
- 用 22 块跑两次的（transformer-block）参数约为 44 块常规模型的一半，减少权重存储。
  - embedding 和输出层不计入此比较；Nanbeige 4.2 3B 中它们约占 3B 的 ~25%，若两层共享权重可降到 12.5%。
- 但计算不省：前向仍是 44 次 block application，反向梯度穿过两轮共享栈。
  - 与 44 个独立块几乎同样昂贵（区别只是优化器要更新的不同参数更少）。
- KV cache 也无节省：第二次进入时中间状态不同，key/value 也不同，需为两轮分别缓存。
  - Nanbeige 试过两轮共享 KV cache，缓存减半但性能更差，发布版用独立缓存。
- Nanbeige 其他权衡：从头训练优于对预训练模型 upcycling；两轮是其偏好的折中（更多轮增益小、训练慢、优化不稳）。

#### 2.3 Universal Transformer 与灵活循环数
- 与 Nanbeige 不同：反复应用**同一个**块，而非重复一整个块的栈；但思路相近。
- 支持自适应 halting：不同位置的 token 可循环不同次数，把算力分配给更能受益的 token。
  - 用小型的可训练函数输出每个位置的 halting probability，累加超阈值即停止；另有最大循环数兜底。

#### 2.4 Mixture-of-Recursions：按 token 路由循环数
- 2025 年论文，可视为 Universal Transformer 的进阶版。共享栈叫 "recursion block"，夹在单独的首尾块（Layer 0 与 Layer L-1）之间。
- 用小型可学习 router（类似 MoE 路由）决定 token 过几次，而非 halting probability。
  - router 作用于 token 的隐表示（含上下文信息），所以不是"某个词固定几次"，取决于出现位置和上文。
- 两种路由方式：
  - expert-choice routing：每个递归步选择要处理的 token，退出的 token 不再参与后续步。
  - token-choice routing：开头一次性决定，把 token 分配到 1/2/3 次传递的路径。
  - 两种方式权重都跨传递复用；模型与 router 一起训练。

#### 2.5 效果如何
- 对比 Vanilla / 固定递归（Recursive）/ MoR，跨四个模型规模与三种训练算力预算：
  - 最小规模下常规 transformer 最好；较大模型上 MoR 追上并常更好（尤其小预算）；最大预算下多条曲线很接近。
  - 优势取决于模型规模和训练算力。
- 同等训练算力不等于同等训练 token：MoR 跳过部分计算，可在同预算内处理更多 token。
- 结论：模型足够大时，循环变换器能在固定算力预算下提升质量。
  - 强调要在规模上做实验——只看最小的 135M 模型会得出相反结论。

### 三、旁注：与 RNN 的类比
- RNN 复用跨时间步的权重，隐状态从一个 token 带到下一个。
- 循环变换器：token 的循环发生在**架构深度**上；中间表示多次穿过栈，token 之间仍用 attention 传信息。
- 更简单的理解：像把模型做大的权重共享版。

### 四、Astra 是否真的用了循环变换器？
- 仍只是 The Information 的爆料，无官方确认；非开放权重无法自行验证。
- 作者认为**很可能**用了：
  - 上述报道；该技术已被证明有前景；OpenAI 首席科学家称"Astra 的计算图深度在 GPT-4 的两倍以内"。
  - 但这句话不明确证实循环架构，也可能只是用了两倍的常规块。
- 作者判断：Astra 的成功**主要**来自改进的训练配方和数据，循环变换器或许有点帮助，The Information 高估了它的贡献。

### 五、隐藏思维链：循环不是主因
#### 5.1 推理简述
- 推理模型先产生中间步骤（推理轨迹/思维链），用普通文本 token（部分 UI 对用户隐藏）。
  - 例子：找两数和为 10、积为 21 的数；先试 5 和 5（和符合、积为 25），再试 3 和 7 并复验。
  - 体现 backtracking：发现错误、回退到早先选择、换方案继续。
- 模型仍逐 token 生成，中间步骤充当 scratchpad 增加计算；最终答案可远短于推理轨迹。
- OpenAI 自 o1 起就一直对用户隐藏大部分推理轨迹，所以对终端用户区别不大；"interpretation-concern" 主要针对模型开发者。

#### 5.2 token 用量与更短思维链
- 可能的逻辑：循环让模型内部算力更多，或许不需要那么多外部思考 token。
  - 但 Astra 在各 effort 级别上并不必然比 GPT-5.6 Sol 用更少 token；只是在**固定准确率**下用的 token 更少。
- 作者不认为这是可解释性隐患：更少 token 可能只表示模型更强、犯错更少、更少 backtracking。
  - 类比 Luna vs Sol：同性能下 Luna 比 Sol 多用 80% token，没人因此认为 Sol 更不可解释。
- 关键限定：推理轨迹本就不保证忠实描述模型内部发生的一切。
  - 唯一有效担忧是循环变换器是否**故意**比常规变换器更频繁地呈现"假"推理轨迹；作者认为没有强证据。
- Astra 系统卡确实提到 monitorability 下降、相对 Sol 有回退，多与轨迹更短、信息更少相关，但不能确立循环是根因（可能只是轨迹更短）。
- OpenAI 首席科学家 Jakub Pachocki 的澄清：
  - "I want to prevent a race into unmonitorability kicked off by confused reporting." 计算图深度在 GPT-4 的 2 倍以内；OpenAI 自首个推理模型起就努力维护并利用思维链监控；该技术"fragile and unfortunately trending in a negative direction"，但原因与架构改动无关；有办法强化它。
  - "confused reporting" 很可能指 The Information 那段报道。

### 六、循环变换器的相关研究
#### 6.1 潜在推理（Latent reasoning）
- 2025 论文，训练一个 3.5B 模型、800B token；研究用额外循环做推理时扩展。
  - 与 Nanbeige 一样重复一个栈；但把 4 个块的共享栈夹在 2 个初始块和 2 个末尾块之间。
  - 不同点：共享栈每轮开始时除上一轮隐状态外，还接收初始块的输出，两者拼接后经可学习线性投影进入共享块——等于每次都能访问同一初始输入表示。
- 训练时随机采样循环数，让模型适应推理时的不同算力；推理时由使用者定固定预算（8/32/64）。
  - 还有按 token 的自适应停止：相邻两轮 next-token 分布的 KL 散度低于阈值即停止循环。
- 收益看任务：HellaSwag 约 8 轮后基本饱和；GSM8K 与 HumanEval 从更多轮中获益。
- 标题虽叫 "latent reasoning"，模型仍可生成文本思维链；循环只是在每个输出 token 前给它额外计算。

#### 6.2 知识检索 vs 推理
- 2025 年 6 月论文，分开测量记忆与推理。
  - 记忆：参数数固定时，循环几乎不改变存储的信息量；增加不同参数才提升容量。结论：循环不会让模型存储或检索更多知识——检索在信息存好后本就简单，循环是"computing"而非"storing"。
  - 推理：复用块在不加参数的情况下提升多步数学表现。结论：额外计算能帮助解题，即使没有更多存储空间；但更大的模型也能提升推理（同时会增加参数）。

#### 6.3 匹配算力预算下的循环（SMELT）
- 2026 年 9 月论文，回到 2.2 的成本比较：在每 token 算力、总非 embedding 参数、KV cache 都大致相同时比。
  - 用 MoE 架构，把中间一半的块应用两次（类似 Nanbeige，但有 sandwiching）。
  - 为补偿额外块应用的算力而收窄隐藏维度；参数变少后再加 experts 补回总数；调整 attention head 配置保持 KV cache 可比。
  - 规模扩到 54B 非 embedding 参数；据拟合的 scaling 曲线，SMELT 达同一验证损失所需训练算力少约 6.8–18%。
- 结论：循环变换器在算力上值得——同一预算下给出稍好的模型。

#### 6.4 Full-bandwidth transformer
- 2026 年 8 月论文，研究跨 token 位置的递归：每个解码步用可学习 gate 把上一 token 的最终隐状态与新采样 token 的 embedding 结合，作为下一次前向的输入。
  - 下一 token 的计算能从栈底访问上一 token 的最终表示，类似 Latent Reasoning。
- 1B 基础模型上，该 latent feedback 在 MATH500 上输出更短推理轨迹，同时维持或提升准确率；但**指令微调后这种缩短效果消失**。
- 直接关联前面的讨论：结果取决于反馈机制和训练方式；该实验也未确立更短轨迹是否更不忠实。
- 研究的大限制：没测试用常规方式（增加更多块而非循环）扩大模型是否也有类似缩短推理链的效果。

## 作者边界、反例与不确定性
- Astra 使用循环变换器仍是未经官方确认的爆料（原模型非开放权重），无法自行验证；首席科学家的话也可能只意味着用了两倍的常规块。
- 作者主观判断 Astra 的成功主要来自训练配方与数据，循环贡献可能被 The Information 高估。
- 可代表性问题：仅看 135M 模型会得出与大规模实验相反的结论（循环不划算）。
- Nanbeige 共享 KV cache 会减半缓存但性能更差；Ouro 的 HF 实现实际把循环数硬编码为 4。
- Astra 系统卡承认 monitorability 下降、相对 Sol 有回退，但不能确立循环是根因。
- 推理轨迹不保证忠实；作者承认的唯一有效担忧（循环"故意"更频繁地给出假轨迹）尚无强证据。
- Full-bandwidth transformer 实验未检验常规扩大模型是否产生类似推理链缩短效果；也未确立更短轨迹是否更不忠实。
- 作者对更短推理链的"人类类比"（聪明的考生少用草稿纸）是其个人解读，非实验结论。
