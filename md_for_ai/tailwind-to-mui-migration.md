# Tailwind CSS 到 MUI 迁移计划

## 样式常量存放位置

项目中样式常量的存放位置：

1. **`src/utils/theme.ts`** - MUI 主题定义文件
   - 定义了颜色常量（slate, gray, sky, indigo, fuchsia, pink 等）
   - 定义了 codeblock 和 codeblockSecondary 颜色对象
   - 定义了 MUI theme，包含 header 和 codeblock 的自定义 palette

2. **`tailwind.config.js`** - Tailwind 主题定义文件
   - 定义了自定义颜色：
     - `fg`: 前景色（DEFAULT: slate[700], light: slate[500]）
     - `bg`: 背景色（DEFAULT: slate[50], focus: slate[100], focus2: slate[200]）
     - `border`: 边框色（DEFAULT: slate[400], focus: slate[500]）
     - `codeblock`: 代码块相关颜色
     - `codeinline`: 行内代码相关颜色

3. **`src/styles/globals.scss`** - 全局样式文件
   - CSS 变量：`--hover`, `--line`, `--link`
   - 使用 Tailwind 的 @apply 指令定义全局样式
   - 定义了各种工具类（highlight-word, tag-word, post-frame, post-body 等）

4. **组件级样式文件** - 各个组件的 `.module.scss` 文件
   - 使用 Tailwind 的 @apply 指令
   - 例如：`PostList.module.scss`, `TagsBox.module.scss`

5. **组件内联 Tailwind 类** - 直接在 JSX 中使用 Tailwind 类名
   - 例如：`py-1`, `py-4 md:py-1` 等

## Tailwind Theme 到 MUI Theme 映射

### 颜色映射

| Tailwind 配置 | 对应值 | MUI Theme 路径 |
|--------------|--------|---------------|
| `fg.DEFAULT` | `slate[700]` | `palette.text.primary` |
| `fg.light` | `slate[500]` | `palette.text.secondary` |
| `bg.DEFAULT` | `slate[50]` | `palette.background.default` |
| `bg.focus` | `slate[100]` | `palette.background.paper` (或自定义) |
| `bg.focus2` | `slate[200]` | 自定义 |
| `border.DEFAULT` | `slate[400]` | `palette.divider` |
| `border.focus` | `slate[500]` | 自定义 |

### 代码块颜色映射

| Tailwind 配置 | 对应值 | MUI Theme 路径 |
|--------------|--------|---------------|
| `codeblock.DEFAULT` | `slate[900]` | `palette.codeblock.darkBg` (已存在) |
| `codeblock.text` | `slate[200]` | `palette.codeblock.text` (已存在) |
| `codeblock.titletext` | `slate[100]` | 需要添加 |
| `codeblock.titlebg` | `slate[900]` | 需要添加 |
| `codeblock.highlightedbg` | `slate[500]` | 需要添加 |
| `codeblock.colored.*` | 各种颜色 | 需要添加 |
| `codeinline.DEFAULT` | `slate[400]` | 需要添加 |
| `codeinline.text` | `slate[700]` | 需要添加 |

## PostList 组件迁移

### 当前使用的 Tailwind 样式

1. **PostList.module.scss**:
   - `.postList`: `flex flex-col gap-4 md:gap-0`
   - `.postListElement`: `flex-1 p-2 rounded-md hover:bg-bg-focus`
   - `.postTitle`: `text-xl font-bold`
   - `.postDate`: `text-xs text-fg-light w-full`
   - `.postAbstract`: `text-sm py-1 leading-snug`

2. **组件内联样式**:
   - `py-1` (PostAbstract 中的 p 标签)
   - `py-4 md:py-1` (TagsBox 的 className)

### 迁移方案

使用 MUI 的以下组件和 API：
- `Box` - 替代 div，使用 `sx` prop 进行样式设置
- `Typography` - 替代 h6, p 等文本元素
- `Stack` - 替代 flex 布局
- `useTheme` - 获取主题对象
- `sx` prop - 替代 Tailwind 类名和 CSS 模块

### 迁移完成情况

✅ **已完成** - PostList 组件已迁移到 MUI：

1. **移除了 CSS 模块依赖**：
   - 删除了 `import style from "./PostList.module.scss"`
   - 所有样式都通过 MUI 的 `sx` prop 或组件属性设置

2. **组件替换**：
   - `div` → `Box` 或 `Stack`
   - `h6` → `Typography variant="h6"`
   - `p` → `Typography variant="body2"`

3. **样式映射**：
   - `flex flex-col gap-4 md:gap-0` → `Stack` 组件 + `spacing={{ xs: 2, md: 0 }}`
   - `flex-1 p-2 rounded-md` → `Box` 的 `sx={{ flex: 1, p: 1, borderRadius: 1 }}`
   - `hover:bg-bg-focus` → `sx` 中的 `"&:hover": { backgroundColor: theme.palette.bg.focus }`
   - `text-xl font-bold` → `Typography` 的 `sx={{ fontSize: "1.25rem", fontWeight: "bold" }}`
   - `text-xs text-fg-light` → `Box` 的 `sx={{ fontSize: "0.75rem", color: theme.palette.fg.light }}`
   - `text-sm py-1 leading-snug` → `Typography` 的 `sx={{ fontSize: "0.875rem", py: 0.5, lineHeight: 1.375 }}`
   - `py-4 md:py-1` → `Box` 的 `sx={{ py: { xs: 2, md: 0.5 } }}`

4. **注意事项**：
   - TagsBox 组件仍然使用 Tailwind 类名，暂时用 Box 包裹并设置 padding
   - RelativeTime 组件仍然接受 className，但已用 Box 包裹并设置样式
   - 保持了响应式设计（md 断点的样式）

