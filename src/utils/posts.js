/**
 * 文章数据层 —— 纯前端方案。
 *
 * 通过 Vite 的 import.meta.glob 在构建时将 src/posts/*.md 全部加载为原始字符串，
 * 然后解析 YAML frontmatter，生成文章元数据列表。
 * 不再依赖任何后端 API。
 */

// ── 构建时加载所有 Markdown 文章 ──────────────────────────────
const postModules = import.meta.glob('../posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

// ── 轻量级 frontmatter 解析器 ─────────────────────────────────
// 支持 key: value 以及 key: [item1, item2] 行内数组格式。
function parseFrontmatter(raw) {
  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!fmMatch) return { data: {}, content: raw }

  const fmStr = fmMatch[1]
  const content = raw.slice(fmMatch[0].length)
  const data = {}

  for (const line of fmStr.split(/\r?\n/)) {
    const match = line.match(/^(\w+)\s*:\s*(.*)$/)
    if (!match) continue
    const [, key, rawValue] = match
    const value = rawValue.trim()

    // 行内数组: [a, b, c]
    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map(s => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean)
    } else {
      // 去掉可选的引号包裹
      data[key] = value.replace(/^["']|["']$/g, '')
    }
  }

  return { data, content: content.trim() }
}

// ── 解析所有文章 ──────────────────────────────────────────────
const allPosts = Object.entries(postModules).map(([filePath, raw]) => {
  const { data, content } = parseFrontmatter(raw)
  // 从路径提取文件名（不含扩展名）作为 id
  const id = filePath.match(/\/([^/]+)\.md$/)[1]

  return {
    id,
    title: data.title || id,
    date: data.date || '',
    tags: data.tags || [],
    summary: data.summary || content.slice(0, 150).replace(/[#*\n\r]/g, '').trim(),
    content,
  }
})

// 按日期降序排列（新文章在前），修复原来按 mtime 排序的问题
allPosts.sort((a, b) => (b.date || '').localeCompare(a.date || ''))

// ── 对外接口 ──────────────────────────────────────────────────

/**
 * 获取分页文章列表（仅元数据，不含正文）。
 * @param {number} page - 页码，从 1 开始
 * @param {number} pageSize - 每页数量
 * @returns {{ posts: object[], total: number, page: number, pageSize: number }}
 */
export function getPaginatedPosts(page = 1, pageSize = 5) {
  const total = allPosts.length
  const start = (page - 1) * pageSize
  const posts = allPosts
    .slice(start, start + pageSize)
    .map(({ content, ...meta }) => meta)

  return { posts, total, page, pageSize }
}

/**
 * 获取全部文章（仅元数据）。
 * @returns {object[]}
 */
export function getAllPostsMeta() {
  return allPosts.map(({ content, ...meta }) => meta)
}

/**
 * 根据 id 获取单篇文章完整内容。
 * @param {string} id - 文件名（不含扩展名）
 * @returns {object|null}
 */
export function getPost(id) {
  return allPosts.find(p => p.id === id) || null
}
