/**
 * 网站全局配置文件。
 * 修改这里可以调整站点标题、个人信息、社交链接、友链和分页数量。
 */
export const siteConfig = {
  title: 'Hana\'s Blog',
  nickname: 'Hana Lin',
  bio: '随机游走兴趣不定的的一般人类',

  socialLinks: [
    { name: 'GitHub', url: 'https://github.com/HanaLin0330', icon: 'github' },
    { name: 'Twitter', url: 'https://x.com/HanaLin0330', icon: 'twitter' },
    { name: 'Email', url: 'mailto:HanaLin0330@gmail.com', icon: 'email' },
    { name: 'Bilibili', url: 'https://space.bilibili.com/498796125', icon: 'bilibili' },
  ],

  friends: [
    { name: '七夏浅笑', url: 'https://julydate.com/', desc: '接触互联网的开始？' },
    { name: '无名氏', url: '', desc: '占位符' },
    { name: '无名氏', url: '', desc: '同样是占位符' },
  ],

  postsPerPage: 5,
}
