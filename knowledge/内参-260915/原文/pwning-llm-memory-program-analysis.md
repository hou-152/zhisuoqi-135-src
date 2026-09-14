# Some things should probably stay fuzzy

- 标题：Some things should probably stay fuzzy
- 来源：pwning.systems
- 原文：https://pwning.systems/posts/llm-memory-program-analysis/
- 作者：pwning.systems
- 类型：文章
- 摘要：Lemmalog uses facts and rules to keep track of knowledge and update conclusions efficiently without rereading all information. It helps explain why something is believed and manages changes over time better than some other systems. Although not perfect, Lemmalog performs well on tasks needing knowledge updates and temporal reasoning while using much less context.
- 收藏于：2026/9/15 03:24:17
- 抓取：Reader 快照（2026/9/15）
- 字数：27305

---
[pwning.systems](https://pwning.systems/) 


我不小心把LLM内存分析变成了程序分析
===================


在过去的几个月里，我一直在研究 LLM 代理，特别是用于漏洞研究。


它们在驾驭大型代码库、解释陌生的子系统以及帮助探索潜在攻击面方面表现出色。然而，一旦调查耗时数小时，我就会不断遇到同样的问题：模型会逐渐丢失我们实际已掌握的信息。


它可能建议我们采用之前已经排除的方法，忘记某个假设已被证明是错误的，或者自信地继续基于一个不再有效的观察结果进行推理。显然，告诉一个法学硕士（LLM）某些事情是错误的，并不一定意味着它会停止相信所有依赖于它的事情 :)


我最初开始研究记忆系统，是因为我想让 LLM 在复杂脆弱性研究中更有用，并减少这种类型的幻觉。


当然，目前已经有很多方法可以为语言学习模型赋予记忆功能。通常的做法是将过去的对话或观察结果存储在某个地方，对其进行嵌入，然后在模型再次需要时检索最相关的部分。


这个方法效果还不错，但总觉得哪里不太对劲。


在漏洞研究过程中，我不仅仅希望模型记住我们说过的话。


我希望它能**保持我们目前所知的状态**。


假设在调查过程中我们发现了以下情况：



```
attacker controls object_a
object_a points to object_b
object_b is a kernel object

```

复制


由此我们可以得出结论：攻击者可以控制内核对象。


一个普通的记忆系统可以存储所有这些观察结果，并在我们询问漏洞的可利用性时再次检索它们。LLM随后得出了相同的结论。


*伟大的！*


但是，假设两小时后我们在 LLDB 中发现它`object_a`实际上并不指向`object_b`，而我们之前的观察是基于错误的假设。


那时，我们的记忆中可能包含类似这样的内容：



```
object_a points to object_b
attacker can control object_b
object_a does not actually point to object_b

```

复制


现在我们检索这些记忆的某个子集，并希望 LLM 能够正确地找出哪些结论仍然有效。


这让我感觉*有点似曾相识。*


这看起来像是程序分析
----------


我通常做的很多工作都涉及程序分析。


分析一个程序时，我们通常会掌握一些关于该程序的事实，以及一些可以从中推导出其他事实的规则。


例如，假设我们知道：



```
calls(foo, bar)
calls(bar, baz)

```

复制


我们可以定义一条规则，规定如果一个函数调用另一个函数，而该函数本身又可以调用第三个函数，那么第一个函数也可以调用第三个函数。


Eventually we calculate a fixed point containing everything we can derive from the program. More importantly, if one of our input facts changes, there are plenty of techniques for updating only the affected results instead of rerunning everything from scratch.


This is also exactly what I wanted from an LLM during vulnerability research.


If an observation changes, I don’t want the model to reconstruct the entire investigation from a transcript and hopefully notice all of the consequences. I want the affected conclusions to become invalid automatically.


When looking at the problem from this perspective, I started wondering why we were making the LLM reconstruct its entire state over and over again.


*What if we just maintained it?*


And this is how I somehow ended up writing a Datalog engine for LLMs :)


Datalog
-------


Before we continue, it is probably useful to briefly explain what Datalog actually is.



>  Datalog is a declarative logic programming language. Instead of writing instructions describing how something should be calculated, we describe facts and rules from which new facts can be derived.
> 
>  


For example, we could store the following facts:



```
controls(attacker, object_a).
points_to(object_a, object_b).
kernel_object(object_b).

```

COPY


And then define the following rule:



```
controls_kernel_object(Attacker) :-
controls(Attacker, ObjectA),
points_to(ObjectA, ObjectB),
kernel_object(ObjectB).

```

COPY


From our existing facts, the engine can therefore derive:



```
controls_kernel_object(attacker).

```

COPY


Nothing particularly exciting yet.


However, suppose we later discover that:



```
points_to(object_a, object_b).

```

COPY


was incorrect.


If `controls_kernel_object(attacker)` was derived from that fact, we know exactly which conclusion depends on the observation that just changed, and we can automatically invalidate it.


This is considerably nicer than putting all of the old information into a prompt and asking an LLM to hopefully notice the same thing.


Lemmalog
--------


This eventually turned into [Lemmalog](https://github.com/JordyZomer/lemmalog).


The basic idea is that an LLM should not necessarily be responsible for maintaining its own knowledge. Instead, I split the problem into two parts.


The LLM handles the fuzzy part:



```
"LLDB shows that the freed object is later reused
as the destination of the write."
|
v
freed(object_a)
reused_as(object_a, write_target)

```

COPY


And Lemmalog handles the deterministic part:



```
facts
|
v
rules
|
v
derived facts

```

COPY


This means that the LLM is still responsible for understanding natural language, source code, debugger output and all the other messy information that appears during an investigation.


LLMs happen to be quite good at this.


But once that information has been converted into structured facts, we no longer need the model to repeatedly determine all of its consequences. The database can do that instead.


Retractions
-----------


One of the first interesting problems I ran into was removing facts.


Adding facts to a Datalog database is relatively straightforward: add the new fact and evaluate any rules which may now produce additional results.


**Removing** something is a little more annoying.


Take the following example:



```
a.
b.
c :- a.
c :- b.

```

COPY


Here `c` has two separate reasons for being true.


If we remove `a`, we cannot simply remove `c`, because `b` still provides another derivation for it. However, if we remove both `a` and `b`, `c` should disappear as well.


This turns out to be quite important during vulnerability research, because a conclusion may be supported by multiple observations.


For example:



```
candidate_3_is_exploitable

```

COPY


may remain true even if one particular exploit primitive turns out not to work, because there is another independent path to the same result.


So Lemmalog has to keep track of how facts were derived and update their support when something changes.


Conveniently, this also gives us another useful property:


*we can ask why something is true.*


Why?
----


Imagine we have been running an agent for a few hours while investigating something and it eventually concludes:



```
candidate_3_is_exploitable

```

COPY


That is nice, but I would also quite like to know why.


Because Lemmalog already tracks the dependencies of derived facts, we can ask it for the provenance of a conclusion. For example, we may get something that conceptually looks like this:



```
candidate_3_is_exploitable
|
+-- attacker_controls_pointer
| |
| +-- observation_41
|
+-- pointer_reaches_target
|
+-- observation_57
+-- rule_12

```

COPY


If `observation_41` later turns out to be incorrect, we know that this conclusion may no longer be valid, and because the database knows this as well, it can remove the affected conclusions automatically.


This was originally mostly necessary to make incremental evaluation work correctly, but it turns out that being able to ask an AI agent why it believes something is quite useful as well :)


It also addresses one of the more annoying failure modes I encountered with LLM-assisted research. Sometimes a model will confidently say something like:



```
we already established that this pointer is attacker-controlled

```

COPY


when that is not actually true.


If a conclusion exists in Lemmalog, I can ask where it came from. If there is no provenance supporting it, then it is not part of the maintained state.


This obviously does not prevent an LLM from hallucinating during extraction, but it does make it much harder for unsupported conclusions to silently become part of the investigation.


Facts also change over time
---------------------------


Another issue is that replacing old facts is not always the same as deleting them.


Suppose we originally believe:



```
primitive_a is viable

```

COPY


and later discover:



```
primitive_a is not viable

```

COPY


For most current queries, we probably only care about the second statement. However, if we want to understand why we previously explored a particular exploit strategy, the old state is still useful.


For this reason Lemmalog can associate facts with validity intervals.


Conceptually, we can represent the state as something like:



```
viable(primitive_a) [10:14, 12:37)
not_viable(primitive_a) [12:37, ...)

```

COPY


This allows us to answer both:



```
Is primitive_a viable now?

```

COPY


and:



```
Why did we think primitive_a was viable earlier?

```

COPY


without keeping two apparently contradictory facts around and asking the LLM to decide which one we meant.


Again, this is not really a language model problem.


It is mostly a database problem.


Why not just use a vector database?
-----------------------------------


Vector databases are very useful.


If I ask:



```
What did we find earlier about this allocation path?

```

COPY


semantic search is probably exactly what I want.


But cosine vibe similarity and truth are not quite the same thing.


A vector database can retrieve:



```
object_a points to object_b

```

COPY


because it is relevant to my question. It does not inherently know that the statement was disproven two hours later, or that five other conclusions depended on it and should therefore no longer be considered valid.


This made me realise that there are really two different problems hiding under the term “memory”.


The first is:



```
What information from the past is relevant to this question?

```

COPY


The second is:



```
Given everything we have learned so far, what is currently true?

```

COPY


Retrieval is very good at the first problem.


Lemmalog is mostly an experiment in solving the second one.


The two can also be combined, which is what I currently do.


A vulnerability investigation is basically an analysis state
------------------------------------------------------------


The more I worked on this, the more similarities with program analysis started appearing.


During a vulnerability investigation we have observations:



```
this field is attacker-controlled

```

COPY


assumptions:



```
this object survives until the second callback

```

COPY


relationships:



```
primitive_b depends on primitive_a

```

COPY


hypotheses:



```
this could become an arbitrary write

```

COPY


and conclusions:



```
candidate_3 is exploitable

```

COPY


This maps surprisingly well to the things we already do in program analysis.


We have input facts:



```
observations

```

COPY


rules:



```
relationships between observations

```

COPY


derived facts:



```
conclusions

```

COPY


a fixed point:



```
everything currently known

```

COPY


and when an input changes, we perform incremental evaluation:



```
update affected conclusions

```

COPY


Because we track dependencies, we can also explain where results came from:



```
provenance

```

COPY


At some point it became fairly obvious that I had approached the problem like a static analysis engine without intentionally meaning to.


This also changed how I thought about the role of the LLM itself.


You can almost think of the whole system as a slightly strange compiler.


The LLM acts as the front-end:



```
     source code,
   debugger output,
natural language notes
          |
          v
   structured facts

```

COPY


Lemmalog is the intermediate representation and analysis engine:



```
structured facts
       |
       v
deductive rules
       |
       v
maintained state

```

COPY


Another LLM invocation can eventually turn that state back into natural language, suggest the next experiment, or use it to perform some action.


The amusing part is that our parser is probabilistic, while everything after it does not necessarily have to be.


Does it actually make LLMs better?
----------------------------------


This is of course the important question.


The engine itself now supports incremental evaluation, retractions, provenance, temporal facts, aggregations, entity reconciliation, hybrid retrieval, demand-driven queries and a bunch of other things that I probably added because implementing Datalog features is more fun than I expected.


There is also an MCP server which allows agents to use Lemmalog directly.


But none of that matters very much if giving an LLM this memory does not actually improve anything.


So I plugged it into [MemEval](https://github.com/ProsusAI/MemEval) and tested it on both LongMemEval and LoCoMo using their standardized reader models and evaluation setup. Extraction during ingestion is Claude Sonnet 4.6 (chunked and file-cached, so it is paid once per conversation); everything after extraction uses the benchmark’s own standardized readers and judges.


The results were a little better than I expected.


LongMemEval
-----------


LongMemEval tests whether an LLM can answer questions about information spread across long conversation histories. The split I used contains 102 questions, divided equally between user facts, assistant facts, preferences, multi-session questions, temporal reasoning and knowledge updates.


Because 17 questions per category is not exactly a massive sample size, I ran Lemmalog three times rather than getting excited about whichever run happened to score highest.


The result was:



```
Lemmalog
F1: 0.463 +/- 0.010
Accuracy: 0.575 +/- 0.004

```

COPY


For comparison, the published memory-system results are:



```
PropMem 0.550
SimpleMem 0.480
Lemmalog 0.463 +/- 0.010
OpenClaw 0.244
Full Context 0.222

```

COPY


My own full-context GPT-4.1 run scored `0.197` F1.


So Lemmalog is not beating PropMem yet, and it is still slightly behind SimpleMem, but it gets more than twice the F1 of giving GPT-4.1 the entire conversation.


More amusingly, the context passed to the answering model is roughly **38 times smaller**.



```
Full context: ~104,000 tokens/question
Lemmalog: ~2,700 tokens/question

```

COPY


Apparently maintaining state instead of repeatedly rereading the entire history is useful :)


The category results from one representative run looked like this:




| System | SS-User | SS-Asst | Preference | Multi-Session | Temporal | K-Update |
| --- | --- | --- | --- | --- | --- | --- |
| PropMem | **0.851** | **0.767** | 0.147 | **0.582** | 0.424 | 0.528 |
| SimpleMem | 0.752 | 0.566 | 0.126 | 0.382 | **0.578** | 0.475 |
| **Lemmalog** | 0.790 | 0.672 | 0.128 | 0.211 | 0.416 | **0.579** |
| OpenClaw | 0.401 | 0.432 | 0.127 | 0.082 | 0.185 | 0.234 |
| Full Context | 0.265 | 0.415 | **0.177** | 0.062 | 0.212 | 0.202 |


The result I found most interesting was Knowledge Update.


Lemmalog scored `0.579`, compared with `0.528` for PropMem and `0.202` for full context.


Knowledge Update is basically the situation I originally cared about:



```
we believed A
|
later we learn that A is no longer true
|
what should we believe now?

```

COPY


So seeing Lemmalog top the published field on the category that most closely resembles maintained program state was rather satisfying.


Single-session factual memory also worked surprisingly well. Lemmalog reached `0.790` on user facts and `0.672` on assistant facts, while temporal reasoning reached `0.416`, almost identical to PropMem’s `0.424` in that run.


The obvious remaining problem is multi-session reasoning:



```
PropMem 0.582
SimpleMem 0.382
Lemmalog 0.211

```

COPY


Diagnosing those failures was interesting: the information usually was not mis-connected, it was simply never extracted. If the extractor never emits a fact for the Airbnb booking, no amount of derivation is going to answer a question about it.


Which brings us to one of the more amusing parts of running benchmarks.


I accidentally taught it not to answer questions
------------------------------------------------


At one point LongMemEval suddenly dropped to `0.371` F1.


After going through the failures, I discovered that **32 of the 102 questions were being refused**.


All 32 were answerable.


Questions such as:



```
Which airline did I fly most?

```

COPY


or:



```
How many magazine subscriptions do I have?

```

COPY


were returning:



```
Not mentioned.

```

COPY


The problem was an instruction I had added to reduce hallucinations. I told the reader to make sure that the answer was actually supported by the retrieved facts before answering.


Unfortunately, the model interpreted this as:



>  If no single fact literally contains the final answer, refuse.
> 
>  


There is obviously no fact saying:



```
most_flown_airline(user, swiss)

```

COPY


if the memory instead contains:



```
flew(user, swiss, trip_1)
flew(user, swiss, trip_2)
flew(user, lufthansa, trip_3)

```

COPY


The answer exists. It just requires counting.


The fix was to separate two cases:


1. If the premise is absent or misattributed, refuse.
2. If the evidence exists but requires counting, comparing, combining or ordering facts, actually reason over it.


After fixing that, F1 recovered to `0.429`.


The rest of the gap turned out to be sneakier: the counting path had been silently dead the entire time. Count lines were passed through a relevance filter before being shown to the reader, and the plural stemmer used by that filter only folded words longer than four characters. So `owns` never matched `own`, every count line was dropped, and counting questions quietly received no counts at all.


Fixing the stemmer, rendering counts together with the facts they count, and precomputing date arithmetic instead of hoping the model would correctly subtract two dates brought F1 to `0.463`.


This distinction also turns out to matter quite a bit on another benchmark.


LoCoMo
------


I also ran Lemmalog against the full LoCoMo benchmark.


LoCoMo is considerably larger: 10 long conversations containing **1,986 questions** covering factual recall, temporal reasoning, multi-hop questions, inference and adversarial false-premise questions.


This one was particularly useful because 1,986 questions makes it considerably harder to accidentally get excited about a lucky seed.


Again, I ran the entire benchmark three times.



```
Lemmalog LoCoMo:
0.533 +/- 0.001 F1

```

COPY


The published comparison looks like this:




| System | F1 |
| --- | --- |
| OpenClaw | 0.557 |
| Full Context | 0.542 |
| **Lemmalog** | **0.533 ± 0.001** |
| Graphiti | 0.416 |
| Memory-R1 | 0.389 |


So Lemmalog currently sits third among the dedicated memory systems in this comparison, behind PropMem and OpenClaw.


If we count throwing the entire conversation into the prompt as a memory system, it is fourth.


Which I think is fair :)


More importantly, the three runs were almost identical, so `~0.53` seems to be a real result rather than benchmark noise.


The per-category results from the final configuration look like this:




| Category | Lemmalog | PropMem | Full Context |
| --- | --- | --- | --- |
| Factual | 0.399 | 0.431 | **0.517** |
| Multi-hop | 0.545 | 0.599 | **0.674** |
| Inferential | 0.164 | **0.289** | 0.197 |


There are two results here that I particularly like.


The first is temporal reasoning.


The initial version of Lemmalog scored:


COPY


After fixing temporal normalization and retrieval:


COPY


The bug was actually quite funny.


At one point I was comparing date-like values as interned Datalog symbols.


The engine’s `<` operator on symbols compares their internal ids.


Internal ids are obviously not dates :)


After normalising extracted dates into comparable integers and deriving `happened_before` from actual timestamps, temporal performance jumped by almost twenty F1 points.


The second result I like is adversarial questions.


Lemmalog scores:


COPY


while full context scores:


COPY


These questions deliberately contain false or misattributed premises.


For example, the conversation may contain a story about somebody receiving a gift, followed by a question which attributes the same gift to somebody else.


A language model with a giant transcript is rather tempted to find the semantically similar story and answer anyway. A structured memory can instead notice that there is simply no supporting fact about the person in the question.


In other words:



```
no

```

COPY


turns out to be quite a useful answer.


The front-end matters a lot
---------------------------


The first LoCoMo implementation scored `0.483`.


The current one scores about `0.533`.


The Datalog evaluator did not suddenly become 10% smarter.


Most of the improvement came from fixing how information gets into and out of the analysis state.


Entity resolution, for example, turned out to matter quite a lot.


Imagine the following sessions:



```
Session 1:
"I bought a Honda Civic."
Session 3:
"My car broke down."
Session 7:
"The Civic is finally fixed."

```

COPY


If extraction produces:



```
bought(user, honda_civic).
broke_down(car).
fixed(civic).

```

COPY


then the Datalog engine is doing exactly what we asked it to do.


Unfortunately, we asked it to reason about three different objects.


So Lemmalog now has a reconciliation pass which connects episode-local mentions to canonical entities.


Pure lexical retrieval also caused some funny failures. A question referring to a:



```
"kitchen gadget"

```

COPY


would not necessarily retrieve a fact about an:



```
"Instant Pot"

```

COPY


even though the relationship is obvious to us.


Retrieval now combines BM25, graph/entity boosts and embeddings, while the final context contains both the structured facts and the original source snippets they came from.


This was another useful reminder that the difficult part of this architecture is not necessarily computing the fixed point.


It is building a good IR from natural language.


Which, again, feels suspiciously like program analysis.


There is also one area where Lemmalog remains rather bad: inference.


On LoCoMo:



```
PropMem 0.289
Lemmalog 0.164

```

COPY


This makes sense.


Suppose somebody says:



```
I usually prefer quiet restaurants, except when I'm travelling
with friends, when I quite like somewhere lively.

```

COPY


Flattening that into:



```
prefers(user, quiet_restaurants).

```

COPY


has thrown away half of the useful information before Datalog has even seen it.


The obvious direction is not to abandon structured memory, but to stop pretending that every memory is an unconditional tuple.


Conditional knowledge can remain conditional:



```
prefers(User, lively_restaurants) :-
    prefers_when(User, lively_restaurants, with_friends),
    with_friends(User).

```

COPY


And the original episode text can remain available for situations where the structured representation loses useful nuance.


The useful architecture therefore looks less like:



```
vector memory
OR
symbolic memory

```

COPY


and more like:



```
                       agent memory
                             |
              +--------------+--------------+
              |                             |
       deductive state               episodic memory
              |                             |
       facts / rules / time          fuzzy context
       provenance                    semantic retrieval
       retractions                   source text

```

COPY


Which is fortunately pretty close to what Lemmalog has become anyway.


The token thing
---------------


There is one other part of the result which I did not originally expect to be quite as large.


For LongMemEval, the answering model sees roughly:



```
Full context: ~104,000 tokens/question
Lemmalog: ~2,700 tokens/question

```

COPY


Around **38x less context**.


For LoCoMo:



```
Full context: ~18,900 tokens/question
Lemmalog: ~3,400 tokens/question

```

COPY


Around **6x less**.


There is of course an extraction cost.


The conversation has to be read once and turned into facts, so saying that the whole system is simply 38 times cheaper would be dishonest.


The important distinction is that extraction happens once.


Full-context prompting pays for the entire history again on every query.


With a persistent agent, the difference therefore grows over time.


Conceptually:




| Turn | Full context | Lemmalog |
| --- | --- | --- |
| 50 | 100K/query | ~2.5K/query |
| 100 | 200K/query | ~2.5K/query |
| 500 | 1M/query | ~2.5K/query |


At some point the full-context version doesn’t merely become expensive.


It stops fitting in the context window.


Lemmalog’s query context does not grow with the entire transcript because it retrieves the relevant maintained state instead.


Which was kind of the original point.


Does this prove anything?
-------------------------


Not quite yet.


LongMemEval is 102 questions, and LoCoMo is still a conversational-memory benchmark rather than a vulnerability investigation.


PropMem also still beats Lemmalog overall on both standardized comparisons.


So I am not going to claim that Datalog has solved LLM memory :)


But I do think the results are enough to show that the idea is not completely stupid.


Across three LongMemEval runs, Lemmalog scores:



```
0.463 +/- 0.010 F1
0.575 +/- 0.004 accuracy

```

COPY


And on LoCoMo:


COPY


It is particularly competitive when the task rewards the things the architecture was designed for: knowledge updates, temporal state, multi-hop relationships and rejecting unsupported premises.


Perhaps the most interesting result to me, though, is not the final number.


The first standardized LongMemEval configuration scored:


COPY


The current one scores:


COPY


More than twice as high.


Most of that improvement came from looking at individual failures and discovering fairly concrete computer science problems:


* entity identity was disconnected
* dates were represented incorrectly
* retrieval missed semantic aliases
* aggregation existed but wasn’t surfaced
* a plural stemmer didn’t think “owns” matched “own”
* the reader had accidentally been taught to refuse synthesis


None of those required making the language model larger.


They required maintaining better state around it.


Which is a result I find rather funny given why I started this project.


The next experiment is therefore the one I actually care about.


Give an agent a complicated vulnerability investigation, let it run for a long time, and see whether maintaining its analysis state stops it from resurrecting dead hypotheses and hallucinating relationships between observations.


That will probably be more interesting than remembering where Alice works :)


Conclusion
----------


I didn’t really want to give the LLM a better memory.


I wanted it to stop forgetting why we believed things.


If an agent has already discovered that:



```
A implies B
B implies C

```

COPY


and later learns that `A` is no longer true, we shouldn’t need to give it fifty old messages and ask it to figure out whether `C` should still be trusted.


Likewise, if an exploit strategy depends on an assumption that we have just disproven in a debugger, I don’t want the model to suggest the same strategy again two hours later because an old conversation happened to be semantically relevant.


We already know how to solve problems involving facts, dependencies, invalidation and fixed points. We’ve been solving them in databases and program analyses for decades.


The benchmark results at least suggest that this isn’t only a nice idea in theory.


Lemmalog is already competitive with dedicated LLM memory systems, substantially outperforms full context on some of the tasks it was designed for, and does so while giving the reader a tiny fraction of the original history.


There is still **plenty** that it is bad at.


But perhaps we don’t need a bigger context window every time an agent forgets something.


Sometimes we can just maintain the state.


The source code for Lemmalog is available [here](https://github.com/JordyZomer/lemmalog).


Cheers!


 [ SIGSEGV // CORE\_DUMPED ]
