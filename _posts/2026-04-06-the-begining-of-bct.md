---
title: "从血染钟楼到染魔典助手：一个说书人工具的诞生"
categories: ['血染钟楼', '背景故事']
image: https://img.yinheng.me/uPic/121jd96hv0ywk2es2tsqwxh91qsgbte0.jpeg
---

2022 年底，我第一次接触到桌游《血染钟楼》。那次是和以前一起玩《阿瓦隆》的朋友、同事组的局，玩过一轮之后，大家几乎立刻就“切换时代”了。

那段时间我们一直在跑“灾祸滋生（暗流涌动）”剧本。因为没有购买实体魔典，就用白纸手写身份后分发给玩家。线下流程是大家闭眼，说书人按顺序唤醒对应玩家传递信息；天亮后玩家可以自由私聊，但由于彼此还不够熟悉，私聊积极性其实并不高。 
当时我主要是以玩家身份参与，所以还没意识到：这个游戏对说书人而言其实也有很强的参与感。直到后来我自己开始尝试做说书人，才真正体会到那种乐趣。通过自由裁量去引导玩家朝你设想的剧情演绎，说书人本身也会获得很强的沉浸感。

不过，多次担任说书人的经历，也让我从“规则一知半解”走向“逐步熟悉”的过程中踩了不少坑。比如出现过一些低级错误：忘记配置男爵导致外来者数量不对；夜晚唤醒流程里反复确认“下一位该叫谁”，还要同时记录状态。对当时还不熟练的我来说，这套流程非常耗神。 
那时我就萌生了一个想法：做一个说书人记录工具，让自己在主持时可以更优雅地完成通知与记录。于是我先做了一个仅供自己使用的 iOS 手机端应用，大致效果如下：

<div style='display:grid; grid-template-columns: repeat(4, minmax(0, 1fr));'>
  <figure style='text-align:center;'>
		<img src='https://img.yinheng.me/uPic/vhaap3svksa0fbz43zg42r4r59p0k0pq.png' />
    <figcaption style='font-size: 14px; color: grey;'>
      角色选择
    </figcaption>
  </figure>
  <figure style='text-align:center;'>
		<img src='https://img.yinheng.me/uPic/e8m7hc1sx4m5v4jk8eyc126t8r59kbvn.png' />
    <figcaption style='font-size: 14px; color: grey;'>
      角色展示
    </figcaption>
  </figure>
  <figure style='text-align:center;'>
		<img src='https://img.yinheng.me/uPic/47wy1pg7sd7kqk970sgnjdxzxc4fthr8.png' />
    <figcaption style='font-size: 14px; color: grey;'>
      行动列表
    </figcaption>
  </figure>
  <figure style='text-align:center;'>
		<img src='https://img.yinheng.me/uPic/85hw8re27qag3h2e3pz9kx8faw25k5b9.png' />
    <figcaption style='font-size: 14px; color: grey;'>
      信息配置
    </figcaption>
  </figure>
</div>

不过它本质上仍是单机工具，说书人依然要按实体魔典流程推进。某种意义上，它只是一个对新手说书人更友好的辅助器，主要解决了三件事：

1. 角色选择时提供数量校验。  
2. 直接列出每个夜晚的行动顺序。  
3. 用图形化方式提示各角色能力的执行要点，降低操作失误。

<div style='display:grid; grid-template-columns: repeat(4, minmax(0, 1fr));'>
  <figure style='text-align:center;'>
		<img src='https://img.yinheng.me/uPic/cqv718bbwfg04f66794cjcxqdt8rrzjg.png' />
    <figcaption style='font-size: 14px; color: grey;'>
      完整配置
    </figcaption>
  </figure>
  <figure style='text-align:center;'>
		<img src='https://img.yinheng.me/uPic/beygnennwmgq4jq89pdwep20qd7av1hh.png' />
    <figcaption style='font-size: 14px; color: grey;'>
      信息展示
    </figcaption>
  </figure>
  <figure style='text-align:center;'>
		<img src='https://img.yinheng.me/uPic/j8a7xhyz8fwe08rwfd7ewr40wvtrymkg.png' />
    <figcaption style='font-size: 14px; color: grey;'>
      提名/猎杀
    </figcaption>
  </figure>
  <figure style='text-align:center;'>
		<img src='https://img.yinheng.me/uPic/gbnd5g3x0v1s7p6hdppefrcpxyxgf36e.png' />
    <figcaption style='font-size: 14px; color: grey;'>
      处决
    </figcaption>
  </figure>
</div>

当时的实现方式，是针对每个角色能力“量身定做”一套从文案到配置界面的逻辑：按不同场景枚举所需输入和展示形式。对于“灾祸滋生”这种规则较明确、复杂判断较少的剧本，这套方案在当时是够用的。

但用了一段时间后，问题还是暴露出来了： 
角色分配和消息传递仍然要一个个线下通知；玩家之间不愿私聊的情况也没有改善，很多角色能力无法充分发挥，最终影响了整体体验。于是我开始思考下一步该怎么做：

1. 支持身份自动分发。  
2. 支持玩家之间在线私聊。

从功能角度看，把这些能力继续加在 iOS 应用里并不算太难。但综合考虑上架流程、用户下载门槛，以及无法覆盖安卓用户等现实问题，我最终把方向转向了小程序。虽然体验可能不如原生应用，但依托微信生态，用户无需下载即可登录，也天然解决了跨平台问题。对当时的阶段来说，这是更现实的路径。 
于是，第一版“说书人助手”就这样进入了开发计划。