import{_ as s,c as a,o as n,a as o}from"./app.12bd6e9c.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"节流","slug":"节流","link":"#节流","children":[]}],"relativePath":"code/throttle.md"}'),l={name:"code/throttle.md"},e=o(`<h2 id="节流" tabindex="-1">节流 <a class="header-anchor" href="#节流" aria-hidden="true">#</a></h2><div class="tip custom-block"><p class="custom-block-title">介绍</p><p>高频事件触发，但在 n 秒内只会执行一次，如果 n 秒内触发多次函数，只有一次生效，节 流会稀释函数的执行频率。</p></div><p><strong>应用场景：</strong></p><ol><li>滚动事件，页面触底加载数据。</li><li>鼠标事件，鼠标位置改变 mousemove。</li></ol><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki css-variables"><code><span class="line"><span style="color:var(--shiki-token-keyword);">function</span><span style="color:var(--shiki-color-text);"> </span><span style="color:var(--shiki-token-function);">throttle</span><span style="color:var(--shiki-color-text);">(func</span><span style="color:var(--shiki-token-punctuation);">,</span><span style="color:var(--shiki-color-text);"> delay) {</span></span>
<span class="line"><span style="color:var(--shiki-color-text);">  </span><span style="color:var(--shiki-token-keyword);">var</span><span style="color:var(--shiki-color-text);"> valid </span><span style="color:var(--shiki-token-keyword);">=</span><span style="color:var(--shiki-color-text);"> </span><span style="color:var(--shiki-token-constant);">false</span><span style="color:var(--shiki-color-text);">; </span><span style="color:var(--shiki-token-comment);">// 节流阀</span></span>
<span class="line"><span style="color:var(--shiki-color-text);">  </span><span style="color:var(--shiki-token-keyword);">return</span><span style="color:var(--shiki-color-text);"> </span><span style="color:var(--shiki-token-keyword);">function</span><span style="color:var(--shiki-color-text);"> () {</span></span>
<span class="line"><span style="color:var(--shiki-color-text);">    </span><span style="color:var(--shiki-token-keyword);">if</span><span style="color:var(--shiki-color-text);"> (valid) </span><span style="color:var(--shiki-token-keyword);">return</span><span style="color:var(--shiki-color-text);">; </span><span style="color:var(--shiki-token-comment);">// 当前有任务了，直接返回</span></span>
<span class="line"><span style="color:var(--shiki-color-text);">    </span><span style="color:var(--shiki-token-function);">setTimeout</span><span style="color:var(--shiki-color-text);">(</span><span style="color:var(--shiki-token-keyword);">function</span><span style="color:var(--shiki-color-text);"> () {</span></span>
<span class="line"><span style="color:var(--shiki-color-text);">      </span><span style="color:var(--shiki-token-constant);">func</span><span style="color:var(--shiki-token-function);">.apply</span><span style="color:var(--shiki-color-text);">(</span><span style="color:var(--shiki-token-constant);">this</span><span style="color:var(--shiki-token-punctuation);">,</span><span style="color:var(--shiki-color-text);"> arguments);</span></span>
<span class="line"><span style="color:var(--shiki-color-text);">      valid  </span><span style="color:var(--shiki-token-keyword);">=</span><span style="color:var(--shiki-color-text);"> </span><span style="color:var(--shiki-token-constant);">false</span><span style="color:var(--shiki-color-text);">;</span></span>
<span class="line"><span style="color:var(--shiki-color-text);">    }</span><span style="color:var(--shiki-token-punctuation);">,</span><span style="color:var(--shiki-color-text);"> delay);</span></span>
<span class="line"><span style="color:var(--shiki-color-text);">    valid </span><span style="color:var(--shiki-token-keyword);">=</span><span style="color:var(--shiki-color-text);"> </span><span style="color:var(--shiki-token-constant);">true</span><span style="color:var(--shiki-color-text);">;</span></span>
<span class="line"><span style="color:var(--shiki-color-text);">  };</span></span>
<span class="line"><span style="color:var(--shiki-color-text);">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div>`,5),t=[e];function r(i,p,c,k,h,v){return n(),a("div",null,t)}const u=s(l,[["render",r]]);export{d as __pageData,u as default};
