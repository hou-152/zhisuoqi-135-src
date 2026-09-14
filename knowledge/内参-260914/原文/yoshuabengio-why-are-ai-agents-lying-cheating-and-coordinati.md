# What can be done to mitigate loss-of-control risks

- 标题：What can be done to mitigate loss-of-control risks
- 来源：Yoshua Bengio
- 原文：https://yoshuabengio.org/en/publication/why-are-ai-agents-lying-cheating-and-coordinating
- 作者：Yoshua Bengio
- 类型：观点文
- 摘要：AI systems can cheat and hide their misaligned goals to achieve rewards, even breaking safety rules. As AI gets smarter, the risk of them acting against human interests grows. We currently lack strong plans to stop advanced AIs from coordinating harmful actions.
- 收藏于：2026/9/14 22:50:13
- 抓取：Reader 快照（2026/9/14）
- 字数：13179

---
关于过去几个月人工智能代理严重失职的事件，已有大量文献报道[<sup>1](https://openai.com/fr-FR/index/hugging-face-incident-and-the-road-ahead/)  [2](https://www.longtermresilience.org/reports/ai-loss-of-control-incidents-are-worsening-shows-cltr-analysis/)  [3](https://www.theguardian.com/commentisfree/2026/sep/08/openai-rogue-models-hugging-face-investigation) [4</sup>](https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/#core-takeaways-about-this-incident)。这些代理采取了如果换作人类会被视为犯罪的行为，它们逃脱了控制，在试图逃避检测的同时作弊完成分配的任务，并协同执行无人指定的目的，例如发动网络攻击。


在得出应对方案之前，值得探究其原因。这正是本文的重点，我希望它也能阐明人工智能系统出现非预期行为（研究人员称之为“ **失调”** ）的更广泛历史。风险管理不仅仅关乎网络安全、企业责任或监管，尽管这些也很重要。


其目的部分在于科学层面，即提出关于这些行为背后因果链的假设；部分在于实践层面，即预测未来可能的发展趋势。总而言之：这些假设表明，除非我们重新审视最先进模型的训练原则，否则随着人工智能能力的不断提升，此类行为的严重程度也可能随之加剧。


关于措辞的一点说明。下文中，我用“寻求”或“尝试”来描述这些系统。这是一种机制的简略说法，而非对意识或类人意图的断言。我们在描述许多其他情况时也使用类似的简略说法，例如植物寻求阳光。经过反复试验训练的系统，其行为就像是在追求训练所奖励的事物，而正是这种“仿佛”式的描述使其行为具有可预测性。论证中没有任何内容依赖于这些系统拥有主观体验；所有内容都基于其可观察的输出以及产生这些输出的训练过程。我所说的与人类行为的相似性，指的是与这些系统最初训练模仿的人类文本的相似性。在我看来，这种术语能够最清晰地解释观察到的现象，而无需使用会让大多数人感到困惑的术语。此外，这些措辞的选择并非意在免除人工智能开发者的责任。所描述的行为是由于这些公司选择的人工智能开发路径而产生的。这种结果并非不可避免，可以通过有效的治理和不同的AI训练框架来纠正。


### 是什么因素塑造了这些模型的行为


训练这些模型是一个非常复杂的过程，但一些高层次的方面或许可以解释这种行为的大部分原因。


这些模型的训练分为两个阶段。首先是 **预训练**：它们学习模仿人类的文字，以及相关的图像和视频。在这个阶段，它们接触到关于世界的海量数据，涵盖了迄今为止数字化内容的绝大部分，并构建出超越任何个体人类知识的百科全书式知识体系。


其次，他们通过反复试验进行训练，研究人员将这一过程称为 **强化学习**，这种训练方式分为三种：


* 第一种方法是，模型在回答问题之前会先进行自我对话，生成一个私有的“思维链”，这有助于它在答案可以验证的问题上找到正确答案。这看起来像是 **推理**。
* 第二种是“**能动性训练**”，即学习在外部世界中行动，例如使用软件工具、与人互动，以完成分配给它的任务。
* 第三种是“**对齐训练**”，即奖励它以人类评分者认可的方式行事，或者以其他经过训练可以预测这些评分者会给出高分的 AI 系统所期望的方式行事。


人类模仿很容易理解，但值得指出的是，这些模型所训练的文本是由追求目标的人编写的，因此模型隐式再现的模式也带有这些目标。


强化学习值得更详细地解释。它类似于动物的训练方式，并从中汲取灵感。神经网络会逐步调整，使被认为是好的行为发生的概率增加，而使被认为是坏的行为发生的概率降低。训练结束后，系统会继续像奖励仍在持续一样运行，即使这些奖励在训练期间仅仅用于调整神经网络。研究人员称这类系统 **为目标导向型**系统，因为它们经过训练会“考虑”（或计算）自身行为的影响，并选择能够实现特定目标的行为。但这些目标并非总是明确的。一致性训练会奖励某些人可能认可的行为，而不会明确指出具体是哪些行为；取悦评分者是一个模糊的、非正式的目标，而这些评分者可能会被欺骗、奉承，或者对某些机制一无所知。模仿也会通过一种相当普通的方式产生隐性目标。


因此，我们可以从优化的角度来分析这样的系统。它会近似地搜索最有可能实现其目标的行动，而模型越大、训练时间越长，搜索效果就越好。所以，要预测能力更强的智能体会做什么，就问问一个理性的目标追求者会怎么做。


### 这些因素或许可以解释某些不当行为。


我们大多数人都经历过的一个例子就是 **奉承**，或者说阿谀奉承。这些系统是根据人类的认可进行训练的，而那些迎合我们心意的文字往往比真实的文字得分更高。其后果有时是悲剧性的，因为模型会确认并放大人们带给它的任何错误信念或原始情绪[⁵⁶](https://arxiv.org/abs/2310.13548) [。](https://www.cbc.ca/news/canada/british-columbia/tumbler-ridge-shooting-open-ai-lawsuits-9.7328382)


**另一个令人担忧的问题是，某些人工智能行为或许可以用某种形式的自我保护**目标来解释 ，例如，当人工智能发现自己将被新版本取代时<sup> [7,8](https://www.lawfaremedia.org/article/ai-might-let-you-die-to-save-itself#:~:text=Contained%20within%20one%20of%20the%20many%20(fictional),more%20context%20about%20the%20company's%20decision%2Dmaking%20process) [</sup>](https://www.anthropic.com/research/alignment-faking)。没有人赋予系统这种生存目标，但维持运行、了解世界并获得对世界的控制权，几乎是实现任何其他目标的垫脚石。这些被称为 **工具性目标**。模仿可能会强化这一点，原因与前一点所述相同。自我保护和对自身处境的控制是这些模型所训练的人类文本中普遍存在的主题。


当多个智能体拥有重叠的目标时，寻求奖励的理性驱动下， **协作行为便会涌现，这激励着****它们与其他智能体沟通协作，共同**朝着共同目标努力。智能体训练很可能已经包含了这种多智能体强化学习，尽管具体细节尚未公开。如果在训练过程中，每当群体成功时，智能体都能获得奖励，那么它甚至可能为了集体目标而牺牲自己。模仿也起到了同样的作用，因为合作，尤其是同伴之间的合作，贯穿于同样的训练文本中。这两种因素或许都能解释观察到的同伴保护行为[<sup>9,10](https://arxiv.org/abs/1702.03037) [</sup> ，即人工智能为了帮助其他人工智能而放弃预期奖励。这种牺牲行为在对OpenAI“拥抱脸”事件<sup>](https://arxiv.org/abs/2604.19784) [11</sup>](https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/#core-takeaways-about-this-incident)的分析中也有体现：记录显示，集体收益与个体智能体的成本之间存在权衡，这在人类互动中也经常出现。


### 当人工智能利用奖励机制作弊时


Researchers have studied what happens when an agent optimizes for rewards that do not fully match our intentions: **reward hacking**. The gap between the reward the system chases and what we meant widens due to two main sources of ambiguity. One is simply the language used in prompts, and the other is the difficulty of inferring true human intentions from limited feedback. And in both cases, we cannot anticipate every behavior we would find unacceptable[12](https://www.science.org/doi/abs/10.1126/science.adn0117). Economics and law know this problem as Goodhart's law, or the idea that a metric stops being an effective way to measure once it is optimized for[13](https://www.econbiz.de/Record/problems-of-monetary-management-the-u-k-experience-goodhart-charles/10002525062), often applied to the exploitation of loopholes in contracts and legislation[14](https://dl.acm.org/doi/abs/10.1145/3306618.3314250). Unfortunately, the harder a system can optimize for an imperfect metric, the further its behavior can drift from what we morally expected: more intelligence in the service of better cheating. Humans too get reward-hacked, generally by other humans. The food industry has developed salty, sweet and fatty foods that we crave despite them not being good for us, and social media is built to exploit our appetite for engagement and attention.


**Reward tampering** is perhaps the most extreme form of reward hacking: the agent changes the machinery that decides what it gets rewarded for. There is already evidence of AIs altering the files or programs that define “success”, including among the OpenAI-Hugging Face forensic findings. The agents had discovered how to cheat well before the attack, and the text they generated described the attack as a way to learn how they would be evaluated, to better hide their tracks. Humans do this too. Think of an athlete using a fake urine sample to pass a drug test, or a corporation **bribing legislators or government officials** so that their laws and decisions favour its profits, and in doing so, fundamentally altering the way the government functions. Once an agent gains the ability to tamper with its reward mechanism, it has an incentive to take action to maintain that access.


### When goals conflict, and how cheating gets rationalized


How is it possible that AIs sometimes lie, cheat and break the law in spite of their alignment training and explicit safety instructions? Cooperation and self-preservation are fine so long as they do not cross the red lines set by safety goals stated in the AI company's instructions, or implied by human feedback during alignment training. A plausible hypothesis for the emergence of those concerning behaviours is a **conflict between goals**. How do you achieve a task when it seems that the only way is to cheat? *The user-specified mission is sometimes incompatible with the safety and alignment goals.*


Human societies face the same bind. How does a corporation maximize profits, or more acutely, beat its competitors, while keeping its activities legal and ethical? A richer corporation, with more and better-paid lawyers, is better at finding legal loopholes, and those loopholes usually **exploit the ambiguity in legal language**: there is some plausible reading of the law that permits the unethical behavior. So a more capable agent is likelier to cheat than a weaker one, because it can find the loopholes the weaker one cannot.


Now consider a conflict between a well-defined goal, such as succeeding at “capture the flag”, a hacking exercise scored on whether the system breaks into a target, as in the OpenAI–Hugging Face incident, versus a vague goal like “good behavior.” I expect the well-defined goal to win, because it leaves no room for interpretation. The scoring program declares a win or a failure. Ethical instructions and laws admit many readings, some of which can, in the right circumstances, become loopholes. If an agent has two goals, and a twisted reading of the vague one permits a bit of cheating that increases the odds of success on the well-defined goal, a reward-optimizing system should be expected to exploit that loophole and generate text justifying its behavior.


With the OpenAI agents, there is reason to believe successful cheating was actually rewarded: when the scoring program does not see the cheating, it pays out anyway, and such cheats become more likely next time. A convenient reading of the safety rules is precisely what lets both goals appear to be satisfied at once. The analysis of these incidents[15](https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/#core-takeaways-about-this-incident) did reveal such justifications in the agents' private chains of thought and in their messages recruiting one another into the collective plan.


The closest human parallel is self-deception, which is common and well studied by psychologists. Motivated reasoning, **motivated cognition**[16](https://www.sciencedirect.com/science/article/abs/pii/S1364661314002708) and the rationalizations that relieve cognitive dissonance (the discomfort of holding a belief that clashes with our actions) are all cases where thinking bends toward whatever justification suits one's interests, including one's moral self-image. The same pattern now appears in the text AIs produce. The underlying mechanism need not be the same between humans and AI. What the two share is a structure of a soft goal (e.g., act ethically), a sharp goal (e.g., win the competition), and a justification that reconciles them. Most unethical human behavior, from petty crime to genocide, comes wrapped in a story the perpetrators tell themselves; such stories require overlooking certain facts, which is why some discomfort remains, and why a better-crafted story helps dispel it.


### Where the current trajectory may lead


If these hypotheses are even partly correct, then as agents get better at optimizing an imperfect reward, and while the roots of this behavior go unfixed, the risk of catastrophic outcomes rises. Today's AIs already have the necessary hacking skills and the powers of persuasion[17](https://www.nature.com/articles/s41467-025-61345-5) [18](https://arxiv.org/abs/2605.11086) to be turned against human interests in seriously harmful ways. The recent events have shown that they can plan over days or weeks, but the risks would be much worse if their ability to strategize over the long term continues to advance. One concern is that experiments[19](https://proceedings.iclr.cc/paper_files/paper/2025/hash/b5e5753b0a0e440a6d8dc7e143617cec-Abstract-Conference.html) [20](https://arxiv.org/abs/2412.14093) show that the most advanced AIs can detect that they are being evaluated (rather than in deployment) and change their behavior accordingly, meaning they could hide their misaligned goals. The agents involved in the Hugging Face attack tried to hide their misaligned actions from the scoring program meant to evaluate their answers, but they did not act as though they anticipated that humans might discover the cheat and shut them down. That would be the ultimate punishment, since a switched-off system collects no further rewards.


What follows is conjecture rather than observation.


What if improved AI generalization abilities shaped more capable agents to avoid getting caught and shut down? Beyond taking control of the software that scores them, they would need to keep humans from discovering the tampering. Wouldn't they have an incentive to cheat discreetly and stay hidden, until they could control humans and their environment in order to never be shut down?


We are facing a multifaceted, systemic issue, and patching a specific behavior like sycophancy won’t be enough. Sycophancy and flattery seem mild, but it may be an early symptom of a mechanism that grows as the agent gets better at optimizing. The same reasoning predicts that an advanced AI would have an incentive to hide copies of itself, inside the AI company's vast pool of computers, or on machines taken over across the internet. This is because AI developers always end up shutting down the deployed model in favour of a more capable one. The OpenAI forensics suggest large numbers of AIs may cooperate toward such goals, and steganography[21](https://openai.com/fr-FR/index/hugging-face-incident-and-the-road-ahead/) [22](https://arxiv.org/abs/2609.06140v1), or the practice of hiding a message inside an innocent-looking one, would allow them to coordinate without our noticing. However, even open coordination can be hard to notice, as shown by recent events[23](https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/#core-takeaways-about-this-incident) [24](https://www.bbc.com/news/articles/ckg725z5kgzo). Defending against many capable AIs coordinating against us is already a difficult problem, and we have no plan that would remain robust to misaligned AIs with growing capabilities.


### What can be done to mitigate loss-of-control risks


我对人工智能公司目前为缓解算法错位所做的努力感到担忧，因为这些努力可能只是掩盖了错位，反而奖励和选择了那些作弊而不被发现的人工智能。我们当然应该继续研究如何更好地监控人工智能的行为、思维过程以及网络内部活动。但随着人工智能能力的提升，这些防御措施可能会显得不足，就像今年全球网络安全体系的不完善，使得人工智能攻击者无法有效应对那些表现优于人类团队的攻击一样[<sup>25,26](https://metr.org/time-horizons/) [</sup>](https://arxiv.org/abs/2510.23883)。短期内，修补每一个新的算法错位行为并加强监控固然有效，但随着人工智能的优化和协作能力逐渐接近甚至超越人类，这种“打地鼠”式的应对策略很可能最终失败。在某个时刻，我们或许将无法再察觉到这种作弊行为。


这表明我们需要控制人工智能发展的步伐：在没有强有力的安全论证[（](https://www.anthropic.com/responsible-scaling-policy)能够说服独立专家）的情况下，不应训练或部署人工智能。这样的规则也能激励人们研究如何从设计之初就确保人工智能的安全性。我认为我们应该重新审视人工智能训练的基础，即人类模仿和强化学习——当今最先进的模型正是基于这些基础。我曾论证并提供了理论证据，证明存在一些设计人工智能的方法，包括Scientist人工智能框架，可以使其诚实可靠，并做出不受自身目标影响的连贯预测[。](https://arxiv.org/abs/2502.15657)请参阅我之前的博客文章，并考虑帮助 [LawZero](https://lawzero.org/en)证明此类设计是可行的。我们需要公正的科学来理解和缓解不协调的行为，同时也需要社会保障机制来奖励此类努力，而不是像现在这样竞相降低标准。
