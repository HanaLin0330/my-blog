const API_BASE = '/api'

/**
 * 获取博客文章列表
 * @param {number} page - 页码
 * @param {number} pageSize - 每页数量
 */
export async function fetchPosts(page = 1, pageSize = 5) {
  const res = await fetch(`${API_BASE}/posts?page=${page}&pageSize=${pageSize}`)
  if (!res.ok) throw new Error('获取文章列表失败')
  return res.json()
}

/**
 * 获取单篇文章详情
 * @param {string} id - 文章 ID（文件名不含扩展名）
 */
export async function fetchPost(id) {
  const res = await fetch(`${API_BASE}/posts/${encodeURIComponent(id)}`)
  if (!res.ok) throw new Error('获取文章详情失败')
  return res.json()
}
