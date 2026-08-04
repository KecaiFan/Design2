/* ============================================================
   XCSC 站点内容 — 全站唯一内容源
   ------------------------------------------------------------
   ⚠️ 所有带 [待核实] 的字段均为占位样稿，请替换为真实信息。
   改这一个文件即可更新全站文案，无需改动任何组件。
   ============================================================ */

export const brand = {
  abbr: 'XCSC',
  nameCn: '新疆科技学院网络安全战队',
  nameEn: 'Xinjiang Institute of Technology · Cyber Security Club',
  // 主管单位
  governedBy: ['信息科学与工程学院', '网络与信息技术中心'],
  charter: '校内官方指导学生社团',
}

/* ---- 导航 ---- */
export const nav = [
  { id: 'hero', label: 'INDEX' },
  { id: 'about', label: 'ORIGIN' },
  { id: 'projects', label: 'RECORD' },
  { id: 'contact', label: 'CONTACT' },
]

/* ---- 首屏 ---- */
export const hero = {
  // 放入 public/assets/videos/hero.mp4 后把下面改成 './assets/videos/hero.mp4'
  // 为 null 时自动回退到 WebGL 粒子星云背景
  videoSrc: null,
  poster: null,

  eyebrow: '新疆科技学院 · 信息科学与工程学院',
  // 用 {} 包裹的词会被渲染成电蓝高亮
  headline: '在无人注意的{缝隙}里，\n我们练习看见。',
  lede:
    'XCSC 是新疆科技学院校内官方指导的学生 CTF 社团。我们把攻防竞赛当作一种阅读方式 —— 阅读协议、阅读二进制、阅读那些被默认为安全的假设。',
  primaryCta: { label: '加入我们', href: '#contact' },
  secondaryCta: { label: '查看战绩', href: '#projects' },

  // 首屏底部读数条 [待核实]
  readouts: [
    { k: 'EST.', v: '2019' },
    { k: 'MEMBERS', v: '60+' },
    { k: 'AWARDS', v: '30+' },
    { k: 'TRACKS', v: '05' },
  ],
}

/* ---- 团队介绍：起源 + 发展 ---- */
export const about = {
  label: 'ORIGIN & GROWTH',
  index: '01',
  meta: '2019 — 至今',
  title: '从一间借来的机房\n到一支{建制完整}的队伍。',
  paragraphs: [
    'XCSC 的起点并不体面。2019 年秋天，几名学生在信息科学与工程学院一间借来的机房里搭起第一台靶机，用一块白板记录解题思路，把周末过成了通宵。那时没有队名、没有指导老师，只有一个共识 —— 想弄明白东西是怎么坏掉的。',
    '第一次参加正式赛事，我们在初赛就出局了。但那份题解被完整地保存下来，成为后来所有新人的第一份训练材料。社团真正的资产从那时开始积累：不是奖状，是可复用的复盘。',
    '此后 XCSC 逐步纳入信息科学与工程学院与网络与信息技术中心的指导体系，成为校内官方学生组织。我们建立了 Web、Pwn、Reverse、Crypto、Misc 五个方向的分组，形成"老带新"的梯队培养机制，并搭建了社团自有的训练平台与题库。',
    '今天的 XCSC 依然保持着机房里的那套习惯：每道题都要写复盘，每次失利都要归档。我们相信一支队伍的真实水位，不在它赢过多少次，而在它能把多少经验交给下一届。',
  ],

  // 能力方向
  tracks: [
    { code: 'WEB', name: 'Web 渗透', desc: '注入、反序列化、逻辑漏洞与真实业务场景下的组合利用。' },
    { code: 'PWN', name: '二进制利用', desc: '栈堆漏洞、内核态攻防与现代缓解机制的绕过研究。' },
    { code: 'REV', name: '逆向工程', desc: '混淆还原、虚拟机保护分析与自动化脱壳工具链建设。' },
    { code: 'CRY', name: '密码学', desc: '格密码、侧信道与竞赛场景下的非标准实现攻击。' },
    { code: 'MSC', name: '取证与杂项', desc: '流量分析、隐写、内存取证与应急响应演练。' },
  ],

  // 发展时间线 [待核实：年份与事件请按实际情况修改]
  timeline: [
    {
      year: '2019',
      tag: '起源',
      title: '第一台靶机',
      body: '几名学生在借用的机房里搭建起社团最早的训练环境，用白板和记事本积累第一批题解。',
    },
    {
      year: '2020',
      tag: '建制',
      title: '纳入学院指导',
      body: '正式接受信息科学与工程学院指导，确立五大技术方向分组与固定周训制度。',
    },
    {
      year: '2021',
      tag: '突破',
      title: '首次挺进区域赛',
      body: '战队首次通过区域选拔，在省级赛事中取得队史第一个正式名次，训练体系得到验证。',
    },
    {
      year: '2022',
      tag: '沉淀',
      title: '自建训练平台',
      body: '上线社团自有的靶场与题库系统，历年题解与复盘全部结构化归档，新人培养周期显著缩短。',
    },
    {
      year: '2023',
      tag: '协同',
      title: '跨校联合演练',
      body: '与区内多所高校战队建立常态化联赛与联合复盘机制，并承接校内网络安全宣传周技术支持。',
    },
    {
      year: '2024',
      tag: '梯队',
      title: '双线并行',
      body: '形成竞赛队与研究组双线结构，在参赛之外开展漏洞挖掘与安全工具开发。',
    },
    {
      year: '至今',
      tag: '在场',
      title: '仍在题目里',
      body: '每周训练照常，每份复盘照常归档。名次会过期，方法不会。',
    },
  ],
}

/* ---- 精选项目 / 赛事记录 ---- */
/* [待核实：赛事名称为真实存在的国内 CTF 赛事，但成绩与年份为占位样稿] */
export const projects = {
  label: 'SELECTED RECORD',
  index: '02',
  meta: '2021 — 2025',
  title: '精选战绩',
  lede: '我们只列出那些留下了完整复盘的比赛 —— 名次之外，还有可以交给下一届的东西。',

  items: [
    {
      id: 'ciscn',
      year: '2024',
      event: '全国大学生信息安全竞赛',
      subtitle: 'CISCN · 创新实践能力赛',
      result: '西北赛区 二等奖',
      tracks: ['WEB', 'PWN', 'REV'],
      note: '线上初赛四人满建制参赛，Web 方向在赛程后半段完成一道零解题的首杀，最终以区域二等奖收官。赛后输出完整题解 12 篇。',
      stat: { k: '解题数', v: '18' },
      art: 'ciscn',
      featured: true,
    },
    {
      id: 'qwb',
      year: '2024',
      event: '强网杯全国网络安全挑战赛',
      subtitle: 'Qiangwang Cup · 线上赛',
      result: '线上赛 全国 128 名',
      tracks: ['PWN', 'CRY'],
      note: '首次冲进全国前 150。二进制方向在内核题上耗时过久是明确失分点，赛后据此重构了 Pwn 组的时间分配策略。',
      stat: { k: '全国排名', v: '128' },
      art: 'qwb',
      featured: true,
    },
    {
      id: 'wdb',
      year: '2023',
      event: '网鼎杯网络安全大赛',
      subtitle: 'Wangding Cup · 青龙组',
      result: '青龙组 三等奖',
      tracks: ['WEB', 'MSC'],
      note: '取证与流量分析方向首次独立拿分，验证了 Misc 组从零建组一年的训练成果。',
      stat: { k: '有效得分题', v: '11' },
      art: 'wdb',
    },
    {
      id: 'xihu',
      year: '2023',
      event: '西湖论剑网络安全大赛',
      subtitle: 'Xihu Summit · 高校组',
      result: '高校组 优胜奖',
      tracks: ['REV', 'CRY'],
      note: '逆向方向遭遇重度虚拟机保护题，赛中未解出，赛后花三周完成完整还原并写成社团内部教程。',
      stat: { k: '赛后复盘', v: '3 周' },
      art: 'xihu',
    },
    {
      id: 'dfjk',
      year: '2022',
      event: '巅峰极客网络安全大赛',
      subtitle: 'Dingfeng Geek · 线上初赛',
      result: '晋级线上决赛',
      tracks: ['WEB', 'PWN'],
      note: '队史首次晋级全国性赛事决赛环节，也是"老带新"梯队制度落地后的第一届参赛阵容。',
      stat: { k: '新人占比', v: '50%' },
      art: 'dfjk',
    },
    {
      id: 'region',
      year: '2021 — 2025',
      event: '新疆区域高校网络安全联赛',
      subtitle: 'Regional Collegiate League',
      result: '连续五届进入前三',
      tracks: ['WEB', 'PWN', 'REV', 'CRY', 'MSC'],
      note: '区内常态化赛事，也是社团新人的第一战场。五届累计参赛人次覆盖社团全部在册成员。',
      stat: { k: '连续届数', v: '05' },
      art: 'region',
    },
  ],
}

/* ---- 联系方式 ---- */
export const contact = {
  label: 'JOIN / CONTACT',
  index: '03',
  meta: '常年招新',
  title: '如果你也想知道\n东西是{怎么坏掉}的。',
  lede:
    '我们不要求你已经会什么。零基础同样欢迎 —— 只要你愿意在一道题上耗上一整晚，并且在解出来之后，把过程写下来。',

  // [待核实：以下均为占位联系方式，请替换]
  channels: [
    { k: 'EMAIL', v: 'xcsc@example.edu.cn', href: 'mailto:xcsc@example.edu.cn' },
    { k: 'QQ 群', v: '000 000 000', href: null },
    { k: 'GITHUB', v: 'github.com/xcsc', href: null },
    { k: '地址', v: '新疆科技学院 · 信息科学与工程学院', href: null },
  ],

  recruit: [
    { k: '招新时间', v: '每年 9 月 / 3 月' },
    { k: '面向对象', v: '全校在读本专科生' },
    { k: '技术门槛', v: '无 · 提供完整入门路径' },
  ],

  footNote: '本站为社团介绍页面，不提供任何攻击性工具或未授权测试服务。',
}
