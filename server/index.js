import express from 'express'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import grayMatter from 'gray-matter'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = Number(process.env.PORT) || 3000
const POSTS_DIR = path.join(__dirname, 'posts')

if (!fs.existsSync(POSTS_DIR)) {
  fs.mkdirSync(POSTS_DIR, { recursive: true })
}

function resolveInside(baseDir, filename) {
  const base = path.resolve(baseDir)
  const target = path.resolve(base, filename)
  if (target !== base && !target.startsWith(base + path.sep)) return null
  return target
}

function sanitizeFilename(filename) {
  return path.basename(String(filename || ''))
    .replace(/[<>:"/\\|?*\u0000-\u001f]/g, '-')
    .trim()
}

function parsePost(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = grayMatter(raw)
  const fileName = path.basename(filePath, '.md')

  return {
    id: fileName,
    title: data.title || fileName,
    date: data.date || '',
    tags: data.tags || [],
    summary: data.summary || content.slice(0, 150).replace(/[#*\n\r]/g, '').trim(),
    content: content.trim(),
  }
}

app.get('/api/posts', (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1)
    const pageSize = Math.min(20, Math.max(1, parseInt(req.query.pageSize) || 5))

    const files = fs.readdirSync(POSTS_DIR)
      .filter(file => file.endsWith('.md'))
      .sort((a, b) => {
        const statA = fs.statSync(path.join(POSTS_DIR, a))
        const statB = fs.statSync(path.join(POSTS_DIR, b))
        return statB.mtimeMs - statA.mtimeMs
      })

    const total = files.length
    const start = (page - 1) * pageSize
    const posts = files.slice(start, start + pageSize).map(file => {
      const { content, ...post } = parsePost(path.join(POSTS_DIR, file))
      return post
    })

    res.json({ posts, total, page, pageSize })
  } catch (err) {
    console.error('获取文章列表失败:', err)
    res.status(500).json({ error: '获取文章列表失败' })
  }
})

app.get('/api/posts/:id', (req, res) => {
  try {
    const filename = sanitizeFilename(`${req.params.id}.md`)
    const filePath = resolveInside(POSTS_DIR, filename)

    if (!filePath) return res.status(400).json({ error: '文章路径不合法' })
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: '文章不存在' })

    res.json(parsePost(filePath))
  } catch (err) {
    console.error('获取文章失败:', err)
    res.status(500).json({ error: '获取文章失败' })
  }
})

app.listen(PORT, () => {
  console.log(`后端服务已启动: http://localhost:${PORT}`)
  console.log(`文章目录: ${POSTS_DIR}`)
})
