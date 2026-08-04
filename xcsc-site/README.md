# XCSC — 新疆科技学院网络安全战队官网

React + Vite 单页站点。暗色系，Atlantic.vc 观测站视觉体系 + Resend 发丝级边框质感，GSAP ScrollTrigger 驱动的电影感滚动叙事。

## 运行

```bash
npm install
npm run dev      # http://localhost:5180
npm run build    # 产物在 dist/
npm run preview
```

## 页面结构

| 区块 | 组件 | 说明 |
|------|------|------|
| 导航 | `Nav.jsx` | 固定顶栏，滚动后毛玻璃 + 发丝线；IntersectionObserver 高亮当前区块 |
| 首屏 | `Hero.jsx` | 整屏。粒子观测场背景 + 取景框 + 逐行遮罩上推标题 + 底部读数条 |
| 团队介绍 | `About.jsx` | 起源叙事 + 五大技术方向 + **横向 pin 时间线** |
| 精选项目 | `Projects.jsx` | 6 张大卡片，2 张 featured 跨列；scrub 视差 |
| 联系方式 | `Contact.jsx` | 整屏尾页，招新信息 + 联系渠道 + 页脚 |

## 改内容

**全站文案集中在 `src/content/site.js` 一个文件**，改它即可，不需要动组件。

标题里用 `{}` 包住的词会自动渲染成电蓝高亮，例如：

```js
headline: '在无人注意的{缝隙}里，\n我们练习看见。'
```

`\n` 表示换行，每行会独立做遮罩上推动画。

⚠️ 文件中所有标注 `[待核实]` 的字段都是占位样稿（年份、名次、联系方式），请替换为真实信息。

## 换素材

### Hero 背景视频

把视频放到 `public/assets/videos/hero.mp4`，然后在 `src/content/site.js` 改：

```js
export const hero = {
  videoSrc: './assets/videos/hero.mp4',
  poster: './assets/images/hero-poster.webp',
  ...
}
```

`videoSrc` 为 `null` 时自动回退到 WebGL 粒子星云背景（当前状态）。

### 比赛照片

当前卡片视觉由 `src/components/ProjectArt.jsx` 程序化生成（6 种不同的线框构图）。
拿到真实照片后，在 `Projects.jsx` 中把：

```jsx
<div className="pcard__media">
  <ProjectArt variant={p.art} />
</div>
```

替换为：

```jsx
<div className="pcard__media">
  <img className="pcard__art" src={p.photo} alt="" />
</div>
```

并在 `site.js` 的每个项目里加上 `photo: './assets/images/xxx.webp'`。

## 设计约束

改样式时请守住这几条，否则会破坏体系：

- **版心 1700px**（`--shell`），栏距 48px
- 表面只用阶梯灰：`#06070a → #0d0d0f → #131519 → #1a1d22`，**不用阴影**，层次靠 1px 发丝边框
- 电蓝 `#1f58f2` **只**用于高亮中性标题里的单个词，不整句上色
- 橙 `#ff4105` **只**用于描边按钮和当前导航态，不做背景填充
- 显示字重统一 300/400，靠字号建立层级，不加粗
- 圆角只有三档：按钮/标签 8px、卡片 16px、大卡片 24px

## 动效

- 强度档位 7-8（电影感）：遮罩上推、pin 横向推进、scrub 视差
- 全部走 GSAP，**不与 Framer Motion 混用**
- 只动 `transform` / `opacity`，不动 layout 属性
- 所有 `useGSAP` 都带 scope 和清理；`gsap.matchMedia()` 处理断点与 `prefers-reduced-motion`
- 粒子数分级：桌面 800 / 平板 300 / 移动 100；触摸设备关闭指针视差
- 横向 pin 时间线仅在 ≥1024px 生效，窄屏自动降级为原生横向滚动 + snap
