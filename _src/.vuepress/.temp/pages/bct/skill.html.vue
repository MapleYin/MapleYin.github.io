<template><div><p>以剧本“灾祸滋生”为参考，归纳能力</p>
<h2 id="能力抽象" tabindex="-1"><a class="header-anchor" href="#能力抽象" aria-hidden="true">#</a> 能力抽象</h2>
<h3 id="获取一个数字" tabindex="-1"><a class="header-anchor" href="#获取一个数字" aria-hidden="true">#</a> 获取一个数字</h3>
<VPCard v-bind='{"title":"厨师","desc":"在你的首个夜晚，你会得知场上邻座的邪恶玩家有多少对。","logo":"https://img.bct.enmo.fun/818a3ae8-b9f8-4731-b154-fcd2849c5b98.png"}' /><VPCard v-bind='{"title":"共情者","desc":"每个夜晚，你会得知与你邻近的两名存活的玩家中邪恶玩家的数量。","logo":"https://img.bct.enmo.fun/285de2e6-a3ac-4a45-8d90-c201a1fbbc71.png"}' /><h3 id="给定一个角色" tabindex="-1"><a class="header-anchor" href="#给定一个角色" aria-hidden="true">#</a> 给定一个角色</h3>
<VPCard v-bind='{"title":"掘墓人","desc":"每个夜晚*，你会得知今天白天死于处决的玩家的角色。","logo":"https://img.bct.enmo.fun/7df56cce-ec72-40c5-879e-a4644d1d464f.png"}' /><h3 id="选择一个玩家" tabindex="-1"><a class="header-anchor" href="#选择一个玩家" aria-hidden="true">#</a> 选择一个玩家</h3>
<VPCard v-bind='{"title":"僧侣","desc":"每个夜晚*，你要选择除你以外的一名玩家：当晚恶魔的负面能力对他无效。","logo":"https://img.bct.enmo.fun/3f6ead47-51ab-45b4-9056-6b424dbd0eeb.png"}' /><VPCard v-bind='{"title":"管家","desc":"每个夜晚，你要选择除你以外的一名玩家：明天白天，只有他投票时你才能投票。","logo":"https://img.bct.enmo.fun/941227aa-7f94-4a00-9c82-af609a5dea00.png"}' /><VPCard v-bind='{"title":"投毒者","desc":"每个夜晚，你要选择一名玩家：他在当晚和明天白天中毒。","logo":"https://img.bct.enmo.fun/c0636c2e-c057-4dc2-aa49-56eec5274b72.png"}' /><h3 id="选择一名玩家-给定一个角色" tabindex="-1"><a class="header-anchor" href="#选择一名玩家-给定一个角色" aria-hidden="true">#</a> 选择一名玩家，给定一个角色</h3>
<VPCard v-bind='{"title":"守鸦人","desc":"如果你在夜晚死亡，你会被唤醒，然后你要选择一名玩家：你会得知他的角色。","logo":"https://img.bct.enmo.fun/25b82960-ca21-4999-a56d-4d3705ced0c4.png"}' /><h3 id="选择两个玩家-给定一个角色" tabindex="-1"><a class="header-anchor" href="#选择两个玩家-给定一个角色" aria-hidden="true">#</a> 选择两个玩家，给定一个角色</h3>
<VPCard v-bind='{"title":"洗衣妇","desc":"在你的首个夜晚，你会得知两名玩家和一个镇民角色：这两名玩家之一是该角色。","logo":"https://img.bct.enmo.fun/6c3d125b-6661-4128-88d7-f5d9c297e4a3.png"}' /><VPCard v-bind='{"title":"图书管理员","desc":"在你的首个夜晚，你会得知两名玩家和一个外来者角色：这两名玩家之一是该角色（或者你会得知没有外来者在场）。","logo":"https://img.bct.enmo.fun/2b35fb04-a196-455d-b23e-fd8b2044c682.png"}' /><VPCard v-bind='{"title":"调查员","desc":"在你的首个夜晚，你会得知两名玩家和一个爪牙角色：这两名玩家之一是该角色（或者你会得知没有爪牙在场）。","logo":"https://img.bct.enmo.fun/0b5c8086-df95-4805-96ed-141d564e7a85.png"}' /><h3 id="选择一名玩家-得到一个结果" tabindex="-1"><a class="header-anchor" href="#选择一名玩家-得到一个结果" aria-hidden="true">#</a> 选择一名玩家，得到一个结果</h3>
<VPCard v-bind='{"title":"杀手","desc":"每局游戏限一次，你可以在白天时公开选择一名玩家：如果他是恶魔，他死亡。","logo":"https://img.bct.enmo.fun/27b679c2-4bca-479e-9491-540f96b062c7.png"}' /><VPCard v-bind='{"title":"小恶魔","desc":"每个夜晚*，你要选择一名玩家：他死亡。如果你以这种方式自杀，一名爪牙会变成小恶魔。","logo":"https://img.bct.enmo.fun/0467844e-d2a9-4ba9-8d80-2b843cbcbeca.png"}' /><h3 id="选择两个玩家-得到一个结果" tabindex="-1"><a class="header-anchor" href="#选择两个玩家-得到一个结果" aria-hidden="true">#</a> 选择两个玩家，得到一个结果</h3>
<VPCard v-bind='{"title":"占卜师","desc":"每个夜晚，你要选择两名玩家：你会得知他们之中是否有恶魔。会有一名善良玩家始终被你的能力当作恶魔。","logo":"https://img.bct.enmo.fun/167a0ed8-bc42-4f7c-8dbf-625f18993d70.png"}' /><h2 id="结构化" tabindex="-1"><a class="header-anchor" href="#结构化" aria-hidden="true">#</a> 结构化</h2>
<h3 id="获取一个数字-1" tabindex="-1"><a class="header-anchor" href="#获取一个数字-1" aria-hidden="true">#</a> 获取一个数字</h3>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token builtin">number</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="给定一个角色-多名角色" tabindex="-1"><a class="header-anchor" href="#给定一个角色-多名角色" aria-hidden="true">#</a> 给定一个角色/多名角色</h3>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token punctuation">{</span>
    character<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token punctuation">{</span>
    characters<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="选择一个玩家-多名玩家" tabindex="-1"><a class="header-anchor" href="#选择一个玩家-多名玩家" aria-hidden="true">#</a> 选择一个玩家/多名玩家</h3>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token punctuation">{</span>
    player<span class="token operator">:</span> IPlayer<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token punctuation">{</span>
    players<span class="token operator">:</span> IPlayer<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="得到一个结果" tabindex="-1"><a class="header-anchor" href="#得到一个结果" aria-hidden="true">#</a> 得到一个结果</h3>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Result</span> <span class="token punctuation">{</span>
    result<span class="token operator">:</span> <span class="token builtin">boolean</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="定义一个技能" tabindex="-1"><a class="header-anchor" href="#定义一个技能" aria-hidden="true">#</a> 定义一个技能</h2>
<h3 id="技能数据结构" tabindex="-1"><a class="header-anchor" href="#技能数据结构" aria-hidden="true">#</a> 技能数据结构</h3>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Skill<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    payload<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">;</span> <span class="token comment">/// 针对不同技能，可能对应有不同的 payload</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


