# Tailwind CSS 到 MUI 迁移计划

## 一、globals.scss 中的 Tailwind CSS 使用分析

### 1.1 @layer base 部分

#### body 样式
- **当前**: `@apply font-sans leading-7 text-fg bg-bg`
- **改造方案**: 
  - `font-sans` → MUI theme 的 `typography.fontFamily`
  - `leading-7` → MUI theme 的 `typography.body1.lineHeight`
  - `text-fg bg-bg` → 已在 theme 中定义，通过 MUI 的 CssBaseline 自动应用
- **处理方式**: 保留在 globals.scss，但改为使用 CSS 变量引用 theme 值，或通过 MUI 的 CssBaseline 处理

#### h1-h6 标题样式
- **当前**: 使用 `@apply` 定义字体大小、粗细、行高
- **改造方案**: 
  - 迁移到 MUI theme 的 `typography` 配置
  - 例如: `h1: { fontSize: "2.25rem", fontWeight: "bold", lineHeight: "normal" }`
- **处理方式**: 提取到 MUI theme，移除 globals.scss 中的定义

#### blockquote 样式
- **当前**: `@apply text-fg-light bg-bg-focus2 border-l-8 border-[--line] rounded-lg my-6 px-5 py-4`
- **改造方案**: 
  - 提取为 MUI 组件（如 `Blockquote` 组件）
  - 或保留在 globals.scss，但颜色使用 theme 变量
- **处理方式**: 建议提取为 MUI 组件，因为 blockquote 是语义化元素

### 1.2 @layer utilities 部分

#### .highlight-word
- **当前**: 使用 CSS 变量和 Tailwind 的 `theme()` 函数
- **改造方案**: 
  - CSS 变量保留（用于动态高亮颜色）
  - `theme("colors.yellow.500")` → 改为使用 MUI theme 颜色
- **处理方式**: 保留在 globals.scss，但颜色值改为从 MUI theme 获取

#### .tag-word
- **当前**: 使用 CSS 变量和 `theme("colors.pink.500")`
- **改造方案**: 
  - CSS 变量保留
  - `theme("colors.pink.500")` → 改为使用 MUI theme 的 `palette.pink[500]`
- **处理方式**: 保留在 globals.scss，但颜色值改为从 MUI theme 获取

#### .post-frame
- **当前**: `@apply flex flex-col mx-auto min-h-screen p-2`
- **改造方案**: 
  - 已在 Post 组件中迁移为 MUI Box
  - 可以完全移除
- **处理方式**: 移除，已迁移到组件

#### .post-body
- **当前**: 包含大量 MDX 渲染内容的样式（p, li, ul, ol, h1-h6, table, code, code block 等）
- **改造方案分析**:
  - **适合提取为 MUI theme**: 
    - 颜色相关（如 `text-fg-light`, `bg-bg-focus2`, `bg-codeinline/20`）
    - 间距相关（如 `my-4`, `mt-12 mb-8`）可以部分提取
  - **适合提取为组件**: 
    - blockquote（已分析）
    - table 可以提取为 MUI Table 组件
  - **适合保留在 globals.scss**:
    - MDX 渲染的复杂选择器（如 `& :not(pre) > code`）
    - 代码块的高亮样式（`figure[data-rehype-pretty-code-figure]`）
    - 行内代码样式（因为 MDX 会直接渲染这些元素）
    - 列表样式（ul, ol, li）
    - 链接样式（`& a:not(.tag-word)`）
- **处理方式**: 
  - 颜色值改为从 MUI theme 获取
  - 间距值可以部分提取到 theme，但复杂的选择器保留在 globals.scss
  - 代码块相关样式保留在 globals.scss（因为是由 rehype-pretty-code 生成的）

#### .pager-visible / .pager-invisible
- **当前**: 使用 `@apply` 定义分页器样式
- **改造方案**: 提取为 MUI 组件
- **处理方式**: 迁移到组件时处理

### 1.3 CSS 变量
- **当前**: `--hover`, `--line`, `--link`
- **改造方案**: 
  - `--hover` → MUI theme 的 `palette.action.hover` 或自定义 palette
  - `--line` → MUI theme 的 `palette.divider`
  - `--link` → MUI theme 的 `palette.primary.main` 或自定义 palette
- **处理方式**: 迁移到 MUI theme，在 globals.scss 中通过 CSS 变量引用 theme 值

## 二、项目中其他文件的 Tailwind CSS 使用分析

### 2.1 组件级 CSS 模块文件

#### PostList.module.scss
- **状态**: ✅ 已迁移
- **内容**: 已完全迁移到 MUI

#### TagsBox.module.scss
- **当前**: 
  - `.tagsBox`: `@apply flex flex-row flex-wrap gap-2`
  - `.tag`: 使用 CSS 变量 `theme("colors.pink.500")`
- **改造方案**: 
  - `.tagsBox` → MUI Stack 组件
  - `.tag` → 保留 CSS 变量，但颜色值从 MUI theme 获取
- **处理方式**: 待统一迁移 TagsBox 时处理

#### HomeCategoryList.module.scss
- **当前**: 大量使用 `@apply` 定义复杂布局和动画
- **改造方案**: 
  - 布局相关 → MUI Box/Stack/Grid
  - 动画相关 → 保留在 SCSS 或使用 MUI 的 `sx` prop
  - 颜色相关 → MUI theme
- **处理方式**: 复杂组件，需要仔细规划

#### DefaultLayout.module.scss
- **当前**: 使用 `@apply` 定义 header、footer、菜单等样式
- **改造方案**: 
  - Header/Footer → MUI AppBar/Footer 组件
  - 颜色 → MUI theme
  - 布局 → MUI Box/Stack
- **处理方式**: 布局组件，优先级较高

### 2.2 组件内联 Tailwind 类

#### Post 组件
- **当前**: 使用 `post-frame`, `post-body`, `text-sm text-slate-700`, `mt-2`, `mt-4` 等
- **改造方案**: 
  - 全局类（`post-frame`, `post-body`）→ 已在 globals.scss 分析
  - 内联类 → MUI Box/Typography 的 `sx` prop
- **处理方式**: 待迁移

#### BackRefList 组件
- **当前**: 大量内联 Tailwind 类
- **改造方案**: 迁移到 MUI 组件
- **处理方式**: 待迁移

#### ObsidianCallout 组件
- **当前**: 使用硬编码的 Tailwind 颜色类（如 `bg-sky-100`, `text-sky-500`）
- **改造方案**: 
  - 提取到 MUI theme 的 `palette.callout` 或类似结构
  - 或硬编码为 MUI theme 中的颜色值
- **处理方式**: 建议提取到 theme，便于统一管理

#### HomeCategoryList 组件
- **当前**: 混合使用 CSS 模块和内联 Tailwind 类
- **改造方案**: 统一迁移到 MUI
- **处理方式**: 复杂组件，需要仔细规划

#### 其他组件
- **Tag 组件**: 使用 `tag-word` 类（已在 globals.scss 分析）
- **License 组件**: 需要检查
- **其他**: 需要进一步检查

### 2.3 页面级文件

#### pages/index.tsx
- **需要检查**: 可能包含 Tailwind 类

#### 其他页面
- **需要检查**: 各页面文件

### 2.4 原代码渲染后的 css 文件

源代码渲染出的 CSS 文件，在本文件夹下的 `css/` 文件夹下。进行改造时，如不清楚 tailwindcss 的类对应的 CSS 样式，需要参考原有渲染出的 CSS 文件找到对应关系。

## 三、改造优先级和顺序

### 阶段 1: 基础建设（最高优先级）
1. **完善 MUI Theme**
   - 将所有 Tailwind 颜色映射到 MUI theme
   - 添加 typography 配置（h1-h6, body 等）
   - 添加自定义 palette（fg, bg, border, codeblock, codeinline 等）
   - 添加 CSS 变量映射（--hover, --line, --link）

2. **迁移 CSS 变量**
   - 将 globals.scss 中的 CSS 变量改为从 MUI theme 获取
   - 确保 CSS 变量与 MUI theme 同步

### 阶段 2: 全局样式迁移（高优先级）✅ 已完成

1. **迁移 @layer base 样式** ✅
   - ✅ body 样式 → MUI CssBaseline（已添加 CssBaseline 组件）
   - ✅ h1-h6 → MUI theme typography（已移除 globals.scss 中的定义）
   - ✅ blockquote → 保留在 globals.scss，使用 theme 颜色（通过 CSS 变量）

2. **迁移 @layer utilities 中的工具类** ✅
   - ✅ .highlight-word → 保留在 globals.scss，使用 theme 颜色（通过 CSS 变量）
   - ✅ .tag-word → 保留在 globals.scss，使用 theme 颜色（通过 CSS 变量）
   - ⚠️ .post-frame → **注意**：Post 组件迁移被拒绝，所以保留在 globals.scss
   - ✅ .post-body → 颜色值已迁移到 theme（通过 CSS 变量），复杂选择器保留

#### 阶段2完成情况说明

**已完成的工作：**
1. 添加了 MUI CssBaseline 组件来处理全局 body 样式
2. 移除了 globals.scss 中的 h1-h6 样式定义（已在 theme typography 中配置）
3. blockquote 样式改为使用 CSS 变量（--fg-light, --bg-focus2, --line）
4. .highlight-word 和 .tag-word 已使用 CSS 变量（--yellow-500, --pink-500）
5. .post-body 中的所有颜色值已迁移到 CSS 变量：
   - codeinline: --codeinline-bg, --codeinline-text
   - codeblock: --codeblock-titlebg, --codeblock-titletext, --codeblock-bg, --codeblock-text, --codeblock-highlightedbg
   - codeblock colored: --codeblock-colored-a 到 --codeblock-colored-f

**需要注意的事项：**
1. ⚠️ **.post-frame 类仍在使用**：Post 组件和 wiki-page 组件仍在使用 `post-frame` 类，所以不能移除。后续迁移这些组件时需要处理。
2. ⚠️ **CSS 变量注入时机**：ThemeCSSVars 组件在客户端运行时注入 CSS 变量，SSR 时使用 fallback 值。这可能导致轻微的样式闪烁，但影响很小。
3. ⚠️ **代码块样式**：代码块相关的样式（rehype-pretty-code 生成的内容）已全部使用 CSS 变量，确保与 theme 同步。
4. ⚠️ **Tailwind @apply 指令**：部分样式仍使用 @apply，但颜色值已通过 CSS 变量从 theme 获取。后续可以逐步将 @apply 替换为原生 CSS。

**重要修复（阶段2完成后发现的问题）：**
1. ⚠️ **h1-h6 样式必须保留在 globals.scss**：
   - 问题：项目中直接使用原生 HTML 标签（`<h1>`, `<h2>` 等），而不是 MUI Typography 组件
   - MUI 的 typography 配置只对 Typography 组件生效，不会自动应用到原生 HTML 标签
   - MDX 渲染的内容也会生成原生 h1-h6 标签
   - 解决方案：在 globals.scss 中保留 h1-h6 样式，但使用与 theme typography 相同的值，确保一致性
   
2. ⚠️ **body 样式需要补充**：
   - 问题：CssBaseline 只提供基础样式，不包含自定义的 `leading-7` 和颜色（`text-fg bg-bg`）
   - 解决方案：在 globals.scss 中补充 body 样式，使用 CSS 变量从 theme 获取值
   - 添加了 `--fg-main`, `--bg-default`, `--font-family` CSS 变量

3. ⚠️ **后续迁移建议**：
   - 如果要将组件迁移到 MUI Typography，需要将原生 `<h1>` 等标签替换为 `<Typography variant="h1">` 组件
   - 但 MDX 渲染的内容无法直接控制，所以 globals.scss 中的 h1-h6 样式需要保留
   - 可以考虑使用 rehype 插件将 MDX 中的 h1-h6 转换为 Typography 组件，但这需要额外的配置

### 阶段 3: 布局组件迁移（中优先级）✅ 已完成

1. **DefaultLayout 相关** ✅
   - ✅ DefaultLayout.module.scss → 已迁移到 MUI sx prop
   - ✅ Header → 已使用 MUI AppBar 和 Typography
   - ✅ Footer → 已迁移到 MUI Box 组件
   - ✅ TextLink 和 IconLink → 已迁移到 MUI Typography 和 Box
   - ⚠️ **注意**：DefaultLayout.Menu.scss 仍在使用，这是全局样式文件，用于 rc-menu 组件，暂时保留

2. **Post 组件** ✅
   - ✅ 迁移内联 Tailwind 类到 MUI
   - ✅ 使用 MUI Box, Stack, Typography, Divider 组件
   - ⚠️ **注意**：`post-frame` 和 `post-body` 类仍在使用（在 globals.scss 中定义），这些是全局样式，用于 MDX 渲染内容

#### 阶段3完成情况说明

**已完成的工作：**
1. **DefaultLayout Header**：
   - TextLink 组件：迁移到 MUI Typography，使用 sx prop 定义样式
   - IconLink 组件：迁移到 MUI Box，使用 sx prop 定义样式
   - MenuBar：迁移到 MUI Typography
   - Home 图标：迁移到 MUI HomeIcon，使用 sx prop
   - 移除了所有 CSS 模块类的使用

2. **DefaultLayout Footer**：
   - 迁移到 MUI Box 组件
   - 使用 sx prop 定义所有样式（颜色、间距、布局等）
   - Footer 图标：迁移到 MUI Box，使用 sx prop

3. **Post 组件**：
   - 标题：使用 MUI Typography variant="h1"
   - 时间显示：使用 MUI Box，迁移 text-sm text-slate-700
   - 标签：使用 MUI Box 包裹 TagsBox，迁移 mt-2, mt-4
   - 前后导航：使用 MUI Stack，迁移 flex justify-center 等
   - 分隔线：使用 MUI Divider，迁移 hr mt-4
   - post-frame 样式：使用 MUI Box sx prop 定义（flex, flex-col, mx-auto, min-h-screen, p-2）

**需要注意的事项：**
1. ⚠️ **DefaultLayout.module.scss**：
   - 文件已清空，但保留文件以避免破坏导入
   - 如果确认没有其他地方引用，可以安全删除

2. ⚠️ **DefaultLayout.Menu.scss**：
   - 这是全局样式文件，用于 rc-menu 组件（第三方菜单组件）
   - 暂时保留，后续可以考虑迁移到 MUI Menu 组件

3. ⚠️ **post-frame 和 post-body 类**：
   - 这些类仍在 globals.scss 中定义，用于 MDX 渲染的内容
   - Post 组件现在使用 MUI Box 定义 post-frame 的布局样式
   - post-body 类仍在使用，因为它是 MDX 内容的容器，样式在 globals.scss 中定义

4. ⚠️ **颜色值硬编码**：
   - DefaultLayout 中使用了一些硬编码的颜色值（如 gray-300: #d1d5db, gray-900: #111827）
   - 这些值在 theme.ts 中已定义（gray300, gray900），但为了保持与原样式一致，暂时使用硬编码
   - 后续可以考虑提取到 theme 中统一管理

5. ⚠️ **text-shadow 效果**：
   - TextLink 和 MenuBar 中的 text-shadow 效果（0 0 10px #69e0ff, 0 0 20px #69e0ff）已保留
   - 这是 hover 时的特殊效果，使用 sx prop 的 &:hover 定义

### 阶段 4: 内容组件迁移（中优先级）
1. **PostList 组件**
   - ✅ 已完成

2. **TagsBox 组件**
   - 统一迁移（包括 className prop 的处理）

3. **BackRefList 组件**
   - 迁移到 MUI

4. **ObsidianCallout 组件**
   - 提取颜色到 theme
   - 迁移样式到 MUI

### 阶段 5: 复杂组件迁移（低优先级）
1. **HomeCategoryList 组件**
   - 复杂布局和动画，需要仔细规划

2. **其他复杂组件**
   - 根据实际情况处理

### 阶段 6: 清理工作（最后）
1. **移除 Tailwind 依赖**
   - 确认所有样式已迁移
   - 移除 tailwind.config.js
   - 移除 @tailwind 指令
   - 清理 package.json

2. **文档更新**
   - 更新迁移文档
   - 记录决策和注意事项

## 四、改造策略总结

### 4.1 应该提取到 MUI Theme 的内容
- ✅ 所有颜色定义（fg, bg, border, codeblock, codeinline 等）
- ✅ Typography 配置（字体、大小、行高等）
- ✅ 间距系统（部分，复杂场景保留在 CSS）
- ✅ CSS 变量值（--hover, --line, --link）

### 4.2 应该提取为 MUI 组件的内容
- ✅ 布局组件（PostList, BackRefList 等）
- ✅ 语义化组件（Blockquote, Table 等）
- ✅ 功能组件（TagsBox, License 等）

### 4.3 应该保留在 globals.scss 的内容
- ✅ MDX 渲染内容的复杂选择器（`& :not(pre) > code`）
- ✅ 代码块样式（rehype-pretty-code 生成的内容）
- ✅ 工具类（.highlight-word, .tag-word）的 CSS 实现
- ✅ 复杂的伪元素和动画效果
- ✅ 第三方库生成的内容样式

### 4.4 应该硬编码的内容
- ✅ 组件特定的颜色值（如果不需要主题化）
- ✅ 一次性的布局值（如果不需要复用）
- ⚠️ 注意：尽量使用 theme，硬编码应该是例外情况

## 五、注意事项

1. **保持样式一致性**: 迁移过程中要确保视觉效果不变
2. **渐进式迁移**: 不要一次性迁移所有内容，逐步进行
3. **测试**: 每个阶段完成后都要进行测试
4. **文档**: 记录迁移过程中的决策和问题
5. **回滚计划**: 如果出现问题，要有回滚方案
