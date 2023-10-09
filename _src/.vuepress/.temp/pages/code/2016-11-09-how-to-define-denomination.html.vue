<template><div><p>之前和一个朋友聊天的时候提到关于钱币的面值怎么设定好，这里的好，是指怎么规划可以使得组成指定钱所需的平均张数最少。</p>
<p>比如我们平时买东西，每次需要使用100元以下数额的钱的时候（1元~99元），需要用到1,5,10,20,50这几种面值的钱，有时需要1张，有时需要两张或多张。比如我需要付款68元，要使所用钱的张数最少我们会这样给钱：1张50元、1张10元、1张5元、3张1元。一共需要6张。有人会说直接给70元（50+20），让别人找2元（1+1），这样就只有4张参与交易了。对！下面我们从有找钱环节和没有找钱环节来说明这个问题。</p>
<h3 id="算法的正确性" tabindex="-1"><a class="header-anchor" href="#算法的正确性" aria-hidden="true">#</a> 算法的正确性</h3>
<p>因为下面的所有结论都是根据这个算法算出的结果得出来，所以算法的正确性就最为关键。这个是Demo：<a href="https://stplayproject.github.io/phpSub/demo/coins/" target="_blank" rel="noopener noreferrer">Demo<ExternalLinkIcon/></a>。有兴趣的同学可以去试试，看算法是否正确。这个程序是根据你输入的面值的种类，然后生成1到你指定的一个数字之前所有数字的最优（张数最小）组合方式。</p>
<h3 id="无找钱环节" tabindex="-1"><a class="header-anchor" href="#无找钱环节" aria-hidden="true">#</a> 无找钱环节</h3>
<p>我们先计算1,5,10,20,50这种组合的面值，当输入参数来计算这些面值组合组成99个数额平均需要4.24张。然后我们再试试其他所有组合（因为你需要组成1元，所以1元面值的纸币是必须有的），这种重复的工作交给电脑吧！运行后发现有407624种组合方式所需平均张数小于4.24，也就是407624种组合优于我们现在生活中所用的组合1,5,10,20,50。</p>
<p>下面列出前9名组合（第十名并列太多就算了）：</p>
<ol>
<li><a href="https://stplayproject.github.io/phpSub/demo/coins/?1,5,16,23,32" target="_blank" rel="noopener noreferrer">1,5,16,23,32<ExternalLinkIcon/></a>    平均张数：3.323张</li>
<li><a href="https://stplayproject.github.io/phpSub/demo/coins/?1,3,11,27,34" target="_blank" rel="noopener noreferrer">1,3,11,27,34<ExternalLinkIcon/></a>    平均张数：3.343张</li>
<li><a href="https://stplayproject.github.io/phpSub/demo/coins/?1,4,9,24,35" target="_blank" rel="noopener noreferrer">1,4,9,24,35<ExternalLinkIcon/></a>      平均张数：同上</li>
<li><a href="https://stplayproject.github.io/phpSub/demo/coins/?1,4,13,21,36" target="_blank" rel="noopener noreferrer">1,4,13,21,36<ExternalLinkIcon/></a>    平均张数：同上</li>
<li><a href="https://stplayproject.github.io/phpSub/demo/coins/?1,4,14,25,33" target="_blank" rel="noopener noreferrer">1,4,14,25,33<ExternalLinkIcon/></a>    平均张数：同上</li>
<li><a href="https://stplayproject.github.io/phpSub/demo/coins/?1,5,12,20,37" target="_blank" rel="noopener noreferrer">1,5,12,20,37<ExternalLinkIcon/></a>    平均张数：同上</li>
<li><a href="https://stplayproject.github.io/phpSub/demo/coins/?1,5,12,28,41" target="_blank" rel="noopener noreferrer">1,5,12,28,41<ExternalLinkIcon/></a>    平均张数：同上</li>
<li><a href="https://stplayproject.github.io/phpSub/demo/coins/?1,6,10,25,32" target="_blank" rel="noopener noreferrer">1,6,10,25,32<ExternalLinkIcon/></a>    平均张数：同上</li>
<li><a href="https://stplayproject.github.io/phpSub/demo/coins/?1,8,11,28,30" target="_blank" rel="noopener noreferrer">1,8,11,28,30<ExternalLinkIcon/></a>    平均张数：同上</li>
</ol>
<p>程序算出最优的组合是1,5,16,23,32，平均张数是3.23小于我们现在的4.24张。（点击每个结果看看具体组合方式）</p>
<p>所以如果组合是1,5,16,23,32是最节省钱币的张数的。</p>
<h3 id="有找钱环节" tabindex="-1"><a class="header-anchor" href="#有找钱环节" aria-hidden="true">#</a> 有找钱环节</h3>
<p>好了，在加入找钱环节后我们日常的组合1,5,10,20,50,100最后计算出平均每个数额需要：3.15张。确实是比之前没加入找钱环节的4.24张少了点。但是通过电脑计算其他组合，发现还是有1551929总组合优于我们日常用的组合（话说找这些组合，我的电脑也花了25分钟！）。老规矩还是列出前9名组合（好吧！并列第一的就有9个了）：</p>
<ol>
<li><a href="https://stplayproject.github.io/phpSub/demo/coins/?1,4,24,39,45" target="_blank" rel="noopener noreferrer">1,4,24,39,45<ExternalLinkIcon/></a>          平均张数：2.67张</li>
<li><a href="https://stplayproject.github.io/phpSub/demo/coins/?1,5,22,40,47" target="_blank" rel="noopener noreferrer">1,5,22,40,47<ExternalLinkIcon/></a>          同上</li>
<li><a href="https://stplayproject.github.io/phpSub/demo/coins/?1,8,20,42,47" target="_blank" rel="noopener noreferrer">1,8,20,42,47<ExternalLinkIcon/></a>          同上</li>
<li><a href="https://stplayproject.github.io/phpSub/demo/coins/?1,9,22,37,49" target="_blank" rel="noopener noreferrer">1,9,22,37,49<ExternalLinkIcon/></a>          同上</li>
<li><a href="https://stplayproject.github.io/phpSub/demo/coins/?1,12,19,45,48" target="_blank" rel="noopener noreferrer">1,12,19,45,48<ExternalLinkIcon/></a>        同上</li>
<li><a href="https://stplayproject.github.io/phpSub/demo/coins/?1,14,33,37,45" target="_blank" rel="noopener noreferrer">1,14,33,37,45<ExternalLinkIcon/></a>        同上</li>
<li><a href="https://stplayproject.github.io/phpSub/demo/coins/?1,15,23,44,48" target="_blank" rel="noopener noreferrer">1,15,23,44,48<ExternalLinkIcon/></a>        同上</li>
<li><a href="https://stplayproject.github.io/phpSub/demo/coins/?1,22,31,41,48" target="_blank" rel="noopener noreferrer">1,22,31,41,48<ExternalLinkIcon/></a>        同上</li>
<li><a href="https://stplayproject.github.io/phpSub/demo/coins/?1,28,32,41,47" target="_blank" rel="noopener noreferrer">1,28,32,41,47<ExternalLinkIcon/></a>        同上</li>
</ol>
<p>不过看结果发现5~9的结果很奇怪，10元以下的是不是略蛋疼。（点击每个结果看看具体组合方式）</p>
</div></template>


