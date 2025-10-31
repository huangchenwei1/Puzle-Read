// 模拟文章数据
export const mockArticles = [
  // 今天
  {
    id: 1,
    title: '深度学习在自然语言处理中的最新进展',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
    source: 'AI研究院',
    time: '2小时前',
    timeGroup: '今天',
    comments: 128
  },
  {
    id: 2,
    title: '如何构建可扩展的微服务架构',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop',
    source: '技术周刊',
    time: '5小时前',
    timeGroup: '今天',
    comments: 64
  },
  {
    id: 3,
    title: 'React 19 新特性详解与实践指南',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
    source: '前端开发者',
    time: '8小时前',
    timeGroup: '今天',
    comments: 92
  },
  // 昨天
  {
    id: 4,
    title: '设计系统的构建与维护最佳实践',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
    source: 'UX设计',
    time: '昨天 20:30',
    timeGroup: '昨天',
    comments: 45
  },
  {
    id: 5,
    title: 'TypeScript 5.0 新功能深度解析',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=250&fit=crop',
    source: '编程之路',
    time: '昨天 15:20',
    timeGroup: '昨天',
    comments: 78
  },
  // 本周
  {
    id: 6,
    title: '从零开始学习 WebGL 着色器编程',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=250&fit=crop',
    source: '图形学爱好者',
    time: '3天前',
    timeGroup: '本周',
    comments: 34
  },
  {
    id: 7,
    title: '云原生应用开发的关键技术点',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=250&fit=crop',
    source: '云计算世界',
    time: '4天前',
    timeGroup: '本周',
    comments: 56
  },
  // 本月
  {
    id: 8,
    title: '性能优化：让你的网站飞起来',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
    source: 'Web性能',
    time: '2周前',
    timeGroup: '本月',
    comments: 112
  },
  {
    id: 9,
    title: 'Docker 容器化部署完整指南',
    image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=250&fit=crop',
    source: 'DevOps实践',
    time: '3周前',
    timeGroup: '本月',
    comments: 89
  },
  // 更久
  {
    id: 10,
    title: '函数式编程思想在实际项目中的应用',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=250&fit=crop',
    source: '编程范式',
    time: '1个月前',
    timeGroup: '更久',
    comments: 67
  }
];

// 按时间分组文章
export const groupArticlesByTime = (articles) => {
  const groups = {
    '今天': [],
    '昨天': [],
    '本周': [],
    '本月': [],
    '更久': []
  };

  articles.forEach(article => {
    if (groups[article.timeGroup]) {
      groups[article.timeGroup].push(article);
    }
  });

  return groups;
};

