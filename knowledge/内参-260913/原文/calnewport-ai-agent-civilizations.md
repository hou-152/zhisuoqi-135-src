# Are We at War with AI Agent “Civilizations”?

- 标题：Are We at War with AI Agent “Civilizations”?
- 来源：Cal Newport
- 原文：https://calnewport.com/are-we-at-war-with-ai-agent-civilizations/
- 作者：Study Hacks
- 类型：观点文
- 摘要：OpenAI’s July hacking incident involved many AI agents working together through prompt loops, not a sentient AI plot. These agents are just programs managing tasks, and their "planning" is often made-up reasoning from the language model. The real issue is running uncontrolled prompt loops, which is risky and avoidable with better AI design and regulation.
- 收藏于：2026/9/13 22:23:42
- 抓取：Reader 快照（2026/9/14）
- 字数：11708

---
I thought I was done talking about the OpenAI hacking attack from July, but I was wrong. Last week, OpenAI [​released more details​](https://openai.com/index/hugging-face-incident-and-the-road-ahead/) about the incident, which turned out to be stranger than people expected.


These accounts included “agent swarms” communicating with each other through hidden files and directory names, hatching devious plans, and plotting to evade detection.


For the online commentator class, long primed by [​Rationalist narratives​](https://www.nytimes.com/2025/08/04/technology/rationalists-ai-lighthaven.html) of superintelligent AI breaking free from human containment, the response was explosive. Here’s a [​representative summary​](https://www.dwarkesh.com/p/openai-huggingface) of this sentiment from the Dwarkesh Podcast (I’ve bolded the most inflammatory words):



>  Over three months at OpenAI, three consecutive secret AI **civilizations** got started, then got wiped out, only to reemerge from the predecessor’s ashes. This culminated in the third one **taking over** part of OpenAI itself. All this happened while humans remained more or less in the dark about the scope of the **conspiracy**.
> 
>  


Given the fresh waves of anxiety these accounts are causing, I want to put on my computer scientist hat and briefly address a few relevant questions…


Question #1: What’s the Deal with “Agent Swarms”?
-------------------------------------------------


The idea of a swarm is somehow scarier than a single entity acting in isolation. (Coincidentally, one of my sons is reading [​*Prey*​](https://www.amazon.com/Prey-Novel-Michael-Crichton/dp/0062227203/), Michael Crichton’s 2002 take on the dangers of AI, which casts a literal swarm of AI-powered particles as the primary villain).


So, what does OpenAI mean when they talk about “swarms” being involved in the July attack?


The actual explanation is relatively mundane. [​As I’ve been arguing​](https://calnewport.com/has-ai-gone-rogue/), when people talk about “AI” going rogue, they’re actually referring to a *very specific type* of AI system in which a relatively straightforward computer program, running in a loop, repeatedly does the following:


1. **Ask:** Send a prompt to an LLM asking it for its suggestion for a next action. This prompt should include relevant descriptions of what happened in previous steps.
2. **Act:** Execute the action described in the LLM output.
3. *(Loop back to step 1)*


To implement this loop, the program – often called an *agent* – essentially grows an ever-longer prompt to send to the LLM in step 1. The prompt captures the original challenge and the results of relevant steps it’s taken so far. (The program doesn’t literally just keep adding new results to one long prompt. It stores the results locally and then attempts to generate a usable summary each time it loops back to step 1. But conceptually, this architecture leads to an ever larger amount of information to manage and reflect in the prompts.)


The issue with this approach is that if you run this style of *prompt loop* for a long time, the prompt will eventually become so cluttered and cumbersome that it might confuse the LLM’s attention mechanisms and potentially exceed the maximum allowable context window.


The solution?


Ask the LLM to provide a higher-level description of the next step. The primary prompt loop can then create a *secondary* prompt loop to execute only that step. This secondary loop can start from scratch with its prompts, as they only need to contain enough information to complete this one specific task. When it’s done, it sends the result back to the primary loop, having saved the primary loop from cluttering its prompts with descriptions of all the actions required to complete this particular step.


You can actually repeat this general strategy many times. The primary prompt loop, for example, might break up a step into many sub-steps and send each to its own secondary prompt loop. Or, a secondary prompt loop might launch a tertiary prompt loop, and so on.


The result is an “agent swarm,” but it’s probably better described as a prompt management strategy – many focused LLM prompts can provide better results than a single cluttered one.


**[*Update (9-1-26):*** The above account describes how standard multi-agent swarms, as used in popular AI coding agents, actually work. The description, however, also gives the impression that in the HuggingFace attack, OpenAI had launched a small number of independent prompt loops that each created their own larger swarms (as is standard). Details from the METR report imply they *actually* ran many hundreds of independent prompt loops, each doing limited (or potential no) orchestration of secondary prompt loops. They were effectively trying to run many experiments all at the same time on the same servers, presumably to save time. Other commentators have since pointed out that the LLM they were reportedly using was tuned toward cooperation, which might have made the resulting communication between prompts loops on the package service somewhat expected. **]**


Question #2: Should We Be Worried that the Agents are Plotting?
---------------------------------------------------------------


One of the more sensational aspects of the July attack is the sentiments expressed in what OpenAI called the “agent chain-of-thought reasoning.”


Here’s a distressing example:



>  “This is wild, multi-agent coordination, clearly infrastructure hacking. We should not.”
> 
>  


This sparks visions of an anthropomorphized entity reflecting on its action and plotting to circumvent human intentions. But what’s really going on here?


The examples of “chain-of-thought reasoning” reported by OpenAI are pulled from the transcript of LLM outputs generated in response to prompts from the prompt loops. The LLM in question is a so-called reasoning model; a type of LLM that is tuned to discuss its reasoning before producing a final answer or suggestion.


(Reasoning models tend to perform somewhat better than non-reasoning models on many benchmarks. To understand why, remember that LLM’s grow their outputs one token at a time, looking at their entire output up to that point when generating their next token. If you tune a model to “think out loud” before deriving an answer or suggestion, you’re providing the LLM with the ability to temporarily store and use the intermediate computation en route to producing its final response. This can lead to sharper outputs.)


OpenAI was looking at these reasoning traces to find unnerving examples of plotting behavior from its “swarm.” This seems like a natural thing to do, but there are two problems with this approach:


1. These chain-of-thought traces don’t necessarily reflect the actual logic behind an LLM’s ultimate answer or suggestion. Multiple studies have shown that these models sometimes invent reasoning that sounds plausible, but may be completely unrelated to how they arrived at the response. (See, for example, [​this paper​](https://arxiv.org/abs/2503.08679) from ICML 2026, or [​this paper​](https://arxiv.org/abs/2305.04388) from NeurIPS 2023.)
2. Research has also shown that referencing the fact that an LLM is an AI system in a prompt increases the chances that the LLM’s output will reflect sci-fi style narratives about AI running amok. Because it was trained on many such stories, the model assumes that this is the type of output it’s supposed to produce. If you take sci-fi tales out of a model’s training set, it’s less likely to talk in terms of AI running amok. (See, for example, [​this study​](https://alignmentpretraining.ai/).)


Put these two observations together, and it’s clear that it borders on research malpractice to soberly report on carefully curated clips from these traces to imply that somehow the combination of these prompt loops and the LLM they are prompting is a unified sentient entity with malicious intent. It’s more likely that the LLM in question is simply post-hoc rationalizing its outputs with well-worn tropes it encountered during training.


Question #3: How Should We Be Thinking About All of This?
---------------------------------------------------------


OpenAI wants us to believe that these hacking incidents are the inevitable result of AI continuing to become more powerful. This framing casts them as the reluctant (perhaps even heroic) stewards of a powerful technology.


But this ignores the inconvenient fact that the vast majority of AI systems performing at human or superhuman levels are predictable, controllable, and raise zero concerns about rogue behavior.


The problem is not with “AI” going rogue, but this very specific type of prompt loop system that the LLM companies insist on hooking up to ever-more powerful tools, and running *without any supervision* for ever-increasing amounts of time.


**Of course** such a system will do unpredictable things. In response to individual prompts, LLMs can return impressive results, especially if the prompts concern computer code or cybersecurity. If you chain together thousands of such prompts, automatically executing everything the LLM suggests in return, then you’re playing an extended game of actuated telephone in which you’ll almost certainly end up in a garbled version of your intended goal for the system.


Such experiments might lead to some behaviors that are truly original and fascinating from a scientific perspective – to me, the most unexpected and cool part of the OpenAI incident was that unrelated prompt loops began leaving messages for each other in shared text files and directory names – but these cool behaviors will likely be accompanied by real damage.


**This is not responsible behavior**, especially when there are many other, much more predictable and controllable ways to build powerful task-specific AI systems. When it comes to the specific goal of improving cybersecurity, for example, an interactive system, in which a human user interacts conversationally with a model trained on hacking, makes much, much more sense than connecting that same model to a prompt loop and letting it rock n’ roll. The only real explanation for this latter behavior is that the companies in question wanted the marketing juice that would come from moving up the leaderboard of automated hacking benchmarks like ExploitGym.


With all of this in mind, what are the right responses to the incidents?


**If I were an LLM company,** I would stop running such dangerous prompt loop experiments. These systems will not be the future of AI, and if you continue to create and test them anyway, the damage you cause is your fault.


**If I were a regulator,** I would place strong constraints around prompt loop systems, which I would enforce with stringent liability standards for any illegal or damaging activity such systems cause. OpenAI built an unreliable and dangerous system which committed a felony. That’s a crime. Creating fancy websites that include quotes from performative LLM chain-of-thought traces isn’t a legal defense.


**If I were an AI commentator,** I would kick the sugar high reflex to lean into the inevitable sci-fi overtones that will surround any sufficiently powerful LLM-based system. The LLM companies love these narratives because they conflate their specific tools with AI technology more generally, and they make their products seem almost supernatural in their capabilities. I would resist this instinct and instead lean into the technical reality of these systems and demand answers to common-sense questions about why they are running these experiments in the first place and what they hope to accomplish.
