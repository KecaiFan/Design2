/* ============================================================
   XCSC 站点内容 — 全站唯一内容源
   ------------------------------------------------------------
   ⚠️ 所有带 [待核实] 的字段均为占位样稿，请替换为真实信息。
   改这一个文件即可更新全站文案，无需改动任何组件。
   ============================================================ */

export const brand = {
  abbr: 'XCSC',
  nameCn: '新疆科技学院网络安全社',
  nameEn: 'Xinjiang University of Science and Technology Cyber-Security Club',
  // 主管单位
  governedBy: ['网络与信息技术中心'],
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

  eyebrow: '新疆科技学院 · 网络与信息技术中心',
  // 用 {} 包裹的词会被渲染成电蓝高亮
  headline: '把{漏洞}读成路，\n一题一长，步步更强。',
  // 高亮词 → 跳转链接（彩蛋入口）。点击「漏洞」跳到 surprise 彩蛋页
  accentLinks: { 漏洞: 'surprise.html' },
  lede:
    'XCSC 是新疆科技学院由网络与信息技术中心指导的学生 CTF 社团。我们参加攻防竞赛与应急实战演练，在 Web、二进制、逆向、密码等方向训练，靠一场场解题和复盘慢慢积累。',
  primaryCta: { label: '加入我们', href: '#contact' },
  secondaryCta: { label: '查看战绩', href: '#projects' },
  tertiaryCta: { label: '资料分享', href: 'https://www.wolai.com/joEQHR5SYdE68tne4KWNUk', external: true },
  quaternaryCta: { label: '社团靶场', href: 'https://www.cyberstrikelab.com/', external: true },

  // 首屏底部读数条 [待核实]
  readouts: [
    { k: 'EST.', v: '2024' },
    { k: 'MEMBERS', v: '60+' },
    { k: 'AWARDS', v: '30+' },
    { k: 'TRACKS', v: '07' },
  ],
}

/* ---- 团队介绍：起源 + 发展 ---- */
export const about = {
  label: 'ORIGIN & GROWTH',
  index: '01',
  meta: '2024 — 至今',
  title: '从几名网络安全爱好者\n到一支{建制完整}的队伍',
  paragraphs: [
    'XCSC 的起点很朴素。2024 年，几名网络安全爱好者出于对攻防技术的共同兴趣，提议组建一支属于本校的网络安全队伍，并很快在网络与信息技术中心的支持下落定。大家想的其实很朴素 —— 把喜欢的攻防技术，认真练成一支能打的队伍。',
    '第一次参加正式赛事，XCSC 便一路高歌猛进，从线上选拔一路杀进决赛圈。尽管最终在决赛阶段惜败，但每一场的题解都被完整留存，成为后来新人接手的第一手训练材料。社团真正的资产从那时起持续积累：不是奖状，是可复用的复盘。',
    '此后 XCSC 逐步纳入网络与信息技术中心的指导体系，成为校内官方学生组织。我们建立了 Web、Pwn、Reverse、Crypto、Misc、硬件安全、算法竞赛 七个方向的分组，形成"老带新"的梯队培养机制，并搭建了社团自有的训练平台与题库。',
    '今天的 XCSC 依然保持着建队之初的那套习惯：每打完一场，题解与复盘都要归档；每带完一届，经验都要交到下一届手里。我们相信一支队伍的真实水位，不在它赢过多少，而在它能把多少东西留给后来人........',
  ],

  // 能力方向
  tracks: [
    { code: 'WEB', name: 'Web 渗透', desc: '注入、反序列化、逻辑漏洞与真实业务场景下的组合利用。' },
    { code: 'PWN', name: '二进制利用', desc: '栈堆漏洞、内核态攻防与现代缓解机制的绕过研究。' },
    { code: 'REV', name: '逆向工程', desc: '混淆还原、虚拟机保护分析与自动化脱壳工具链建设。' },
    { code: 'CRY', name: '密码学', desc: '格密码、侧信道与竞赛场景下的非标准实现攻击。' },
    { code: 'MSC', name: '取证与杂项', desc: '流量分析、隐写、内存取证与应急响应演练。' },
    { code: 'HW', name: '硬件安全', desc: '侧信道分析、固件提取、硬件木马检测与 IoT 设备安全评估。' },
    { code: 'ALG', name: '算法竞赛', desc: '数据结构与算法训练、ACM/蓝桥杯等综合赛事与CTF中的算法题目。' },
  ],

  // 发展时间线（规划 2024.06 · 成立&首次纳新 2024.09 · 出征与演练 · 至今）
  timeline: [
    {
      year: '2024.06',
      tag: '规划',
      title: '蓝图初绘',
      body: '社团发起人完成整体规划，明确以 CTF 竞赛与实战训练为核心的发展方向。',
    },
    {
      year: '2024.09',
      tag: '成立 · 纳新',
      title: '社团成立 · 首次招新',
      body: 'XCSC 正式组建，确定七大技术方向分组与固定周训制度，并面向全校完成第一次新人招募，搭建起最初的训练环境与"老带新"梯队。',
    },
    {
      year: '2024.11',
      tag: '首赛',
      title: '首次以 XCSC 出征',
      body: '首次以 XCSC 为名参赛，派出 XCSC 与 XCSC-MiNi 两支队伍出战"天山固网-2024"线下总决赛。',
    },
    {
      year: '2025.05',
      tag: '演练',
      title: '楼兰固网-2025',
      body: '首次以 XCSC 为名受邀参与巴州党委网信办、巴州公安局联合主办的"楼兰固网-2025"网络安全应急实战演练。',
    },
    {
      year: '2025.06',
      tag: '建设',
      title: '搭建社团实验室',
      body: '着手搭建社团自有实验室，把日常训练、解题与复盘沉淀到统一的环境与题库里，逐步减少对临时机位的依赖。',
    },
    {
      year: '2025.08',
      tag: '总决赛',
      title: '天山固网-2025',
      body: '派出 XCSC-O、XCSC-N、XCSC-E 三支队伍参加"天山固网-2025"线下总决赛。',
    },
    {
      year: '2026.05',
      tag: '演练',
      title: '楼兰固网-2026',
      body: '受邀参与巴州党委网信办、巴州公安局联合主办的"楼兰固网-2026"网络安全应急实战演练。',
    },
    {
      year: '2026.06',
      tag: '演练',
      title: '天山固网-2026 · 哈密',
      body: '受邀参与哈密市委网信办、哈密市公安局联合举办的新疆"天山固网-2026"哈密市网络安全攻防演练活动。',
    },
    {
      year: '至今',
      tag: '在场',
      title: '仍在题目里',
      body: '训练与复盘仍在继续。名次会过期，方法不会。',
    },
  ],
}

/* ---- 精选项目 / 赛事记录 ---- */
/* 以下为社团真实参赛 / 演练记录（名次以用户提供的官方成绩为准） */
export const projects = {
  label: 'SELECTED RECORD',
  index: '02',
  meta: '2024 — 至今',
  title: '精选战绩',
  lede: '这里记录我们参与过的攻防竞赛与应急实战演练。比起一时名次，更想把每一场的解题与复盘留下来。',

  items: [
    {
      id: 'tsgw-2024',
      year: '2024.11',
      event: '天山固网-2024 线下总决赛',
      subtitle: '首次以 XCSC 之名出征',
      result: 'XCSC 第 11 名 · XCSC-MiNi 第 16 名',
      tracks: ['WEB', 'PWN', 'REV', 'CRY', 'MSC'],
      note: '社团首次以 XCSC 名义参赛，同时派出 XCSC 与 XCSC-MiNi 两支队伍。两支队伍均在决赛圈完赛，是后续梯队建设的起点。',
      stat: { k: '出战队伍', v: '2' },
      art: 'ciscn',
    },
    {
      id: 'llgw-2025',
      year: '2025.05',
      event: '楼兰固网-2025 网络安全应急实战演练',
      subtitle: '巴州党委网信办 · 巴州公安局 联合主办',
      result: 'XCSC 第六名',
      tracks: ['WEB', 'MSC', 'CRY'],
      note: '首次受邀参与属地网络安全应急实战演练，在真实防守与应急响应场景中检验训练成果。',
      stat: { k: '名次', v: '第 6 名' },
      art: 'qwb',
    },
    {
      id: 'tsgw-2025',
      year: '2025.08',
      event: '天山固网-2025 线下总决赛',
      subtitle: '三支队伍同场出战',
      result: 'XCSC-O 第 10 · XCSC-N 第 18 · XCSC-E 第 14',
      tracks: ['WEB', 'PWN', 'REV', 'CRY', 'MSC'],
      note: '派出 XCSC-O、XCSC-N、XCSC-E 三支队伍参加线下总决赛，是社团单次参赛阵容最大的一次。',
      stat: { k: '出战队伍', v: '3' },
      art: 'wdb',
    },
    {
      id: 'ciscn-xj-2025',
      year: '2025.12',
      event: '全国大学生信息安全竞赛（新疆赛区）',
      subtitle: 'CISCN · 新疆赛区',
      result: '8 支队伍获奖（一等奖 4 · 二等奖 2 · 三等奖 1 · 优胜奖 1）',
      tracks: ['WEB', 'PWN', 'REV', 'CRY', 'MSC'],
      note: 'XCSC 共计 8 支队伍在新疆赛区获奖，其中四支队伍斩获一等奖，另有二等奖 2 支、三等奖 1 支、优胜奖 1 支，是社团单次赛事获奖面最广的一次。',
      stat: { k: '获奖队伍', v: '8' },
      art: 'xihu',
    },
    {
      id: 'llgw-2026',
      year: '2026.05',
      event: '楼兰固网-2026 网络安全应急实战演练',
      subtitle: '巴州党委网信办 · 巴州公安局 联合主办',
      result: 'XCSC 第 3 名',
      tracks: ['WEB', 'MSC', 'CRY'],
      note: '再次受邀参与属地应急实战演练，名次较 2025 年提升三位，防守与响应节奏更稳。',
      stat: { k: '名次', v: '第 3 名' },
      art: 'dfjk',
    },
    {
      id: 'tsgw-2026-hami',
      year: '2026.06',
      event: '天山固网-2026 哈密市网络安全攻防演练',
      subtitle: '哈密市委网信办 · 哈密市公安局 联合举办',
      result: 'XCSC 第二名',
      tracks: ['WEB', 'PWN', 'MSC'],
      note: '受邀参与新疆"天山固网-2026"哈密市网络安全攻防演练活动，获得第二名，是社团截至目前的最好名次。',
      stat: { k: '名次', v: '第 2 名' },
      art: 'region',
    },
  ],
}

/* ---- 联系方式 ---- */
export const contact = {
  label: 'JOIN / CONTACT',
  index: '03',
  meta: '常年招新',
  title: '如果你也想弄明白，\n{安全防线}是怎么被一步步攻破的。',
  lede:
    '我们不要求你已经会什么。零基础同样欢迎 —— 只要你愿意在一道题上耗上一整晚，并且在解出来之后，把过程写下来。',

  // [待核实：以下均为占位联系方式，请替换]
  channels: [
    { k: 'EMAIL', v: 'xcsc@example.edu.cn', href: 'mailto:xcsc@example.edu.cn' },
    { k: 'QQ群', v: '000 000 000', href: null },
    { k: 'GITHUB', v: 'github.com/xcsc', href: null },
    { k: '地址', v: '新疆科技学院 · 网络与信息技术中心', href: null },
  ],

  recruit: [
    { k: '招新时间', v: '每年 9 月' },
    { k: '面向对象', v: '全校本科生' },
    { k: '技术门槛', v: '无 · 提供完整入门路径' },
  ],

  footNote: '免责声明：本站为社团介绍页面，不提供任何攻击性工具或未授权测试服务。',
}
