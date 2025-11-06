// 模拟文章数据
export const mockArticles = [
  // 今天
  {
    id: 1,
    title: '深度学习技术在自然语言处理领域的最新研究进展、算法创新与实践应用深度探讨',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
    source: 'AI研究院',
    time: '2小时前',
    timeGroup: '今天',
    comments: 8,
    tags: ['# AI技术', '# 深度学习', '# NLP'],
    topComment: {
      author: 'Puzle',
      content: 'Transformer架构确实是NLP领域的革命性突破，自注意力机制让模型能够更好地捕捉长距离依赖关系。'
    },
    content: [
      { type: 'text', value: '深度学习技术在自然语言处理领域取得了突破性进展。近年来，', highlights: [] },
      { type: 'text', value: 'Transformer架构', isHighlight: true, highlightId: 1 },
      { type: 'text', value: '的出现彻底改变了NLP的研究方向，使得模型能够更好地理解和生成人类语言。' },
      { type: 'image', value: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop' },
      { type: 'text', value: '大规模预训练模型如GPT、BERT等的成功应用，证明了' },
      { type: 'text', value: '深度学习在处理复杂语言任务时的强大能力', isHighlight: true, highlightId: 2 },
      { type: 'text', value: '。这些模型通过在海量文本数据上进行预训练，学习到了丰富的语言知识和上下文理解能力。' },
      { type: 'text', value: '预训练模型的核心优势在于能够从大量无标注数据中学习通用的语言表示，然后通过微调适应特定任务。这种范式极大地降低了对标注数据的依赖，使得NLP技术能够应用到更多领域。' },
      { type: 'text', value: '未来，随着' },
      { type: 'text', value: '计算能力的提升和数据规模的扩大', isHighlight: true, highlightId: 3 },
      { type: 'text', value: '，深度学习在NLP领域将会有更多令人兴奋的突破。多模态学习、少样本学习等新方向也在不断发展。' }
    ],
    highlights: {
      1: {
        text: 'Transformer架构',
        comment: 'Transformer的自注意力机制是革命性的创新，它让模型能够直接建立序列中任意两个位置之间的依赖关系，避免了RNN的顺序处理限制。',
        author: 'Puzle'
      },
      2: {
        text: '深度学习在处理复杂语言任务时的强大能力',
        comment: '这种能力主要体现在三个方面：1) 语义理解的准确性 2) 上下文关联的把握 3) 生成内容的连贯性。相比传统方法有质的飞跃。',
        author: 'Puzle'
      },
      3: {
        text: '计算能力的提升和数据规模的扩大',
        comment: '目前最大的挑战不是算法，而是算力和数据。随着GPU/TPU性能提升和互联网数据积累，我们能训练更大规模的模型，从而获得更好的效果。',
        author: 'Puzle'
      }
    }
  },
  {
    id: 2,
    title: '如何从零开始构建可扩展、高可用的微服务架构体系',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop',
    source: '技术周刊',
    time: '5小时前',
    timeGroup: '今天',
    comments: 5,
    tags: ['# 架构设计', '# 微服务', '# 后端开发'],
    topComment: {
      author: 'Puzle',
      content: '服务拆分的粒度确实是个难题，太细了管理成本高，太粗了失去了微服务的优势。需要根据团队规模和业务复杂度来权衡。'
    },
    content: [
      { type: 'text', value: '微服务架构已经成为现代软件开发的主流模式。通过将大型应用拆分成多个小型、独立的服务，我们可以实现' },
      { type: 'text', value: '更好的可扩展性和可维护性', isHighlight: true, highlightId: 1 },
      { type: 'text', value: '。每个服务都可以独立开发、部署和扩展，这为大型团队的协作提供了便利。' },
      { type: 'image', value: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop' },
      { type: 'text', value: '在构建微服务架构时，需要考虑' },
      { type: 'text', value: '服务拆分的粒度', isHighlight: true, highlightId: 2 },
      { type: 'text', value: '、服务间通信机制、数据一致性、以及容错处理等关键问题。合理的架构设计能够显著提升系统的可靠性和性能。' },
      { type: 'text', value: '服务拆分要遵循单一职责原则，每个服务应该只负责一个业务能力。同时要注意避免服务间的强耦合，通过异步消息、事件驱动等方式实现松耦合。' },
      { type: 'text', value: '同时，配合' },
      { type: 'text', value: '容器化技术和服务网格', isHighlight: true, highlightId: 3 },
      { type: 'text', value: '，可以进一步简化微服务的部署和管理，让团队能够更专注于业务逻辑的实现。Kubernetes等编排工具已成为微服务部署的标准选择。' }
    ],
    highlights: {
      1: {
        text: '更好的可扩展性和可维护性',
        comment: '微服务的可扩展性体现在可以针对性地扩展高负载服务，而不是整个应用。可维护性则体现在代码库更小、职责更清晰，便于理解和修改。',
        author: 'Puzle'
      },
      2: {
        text: '服务拆分的粒度',
        comment: '这是最难把握的问题。太细会导致服务数量爆炸、管理复杂；太粗则失去微服务的优势。建议按业务能力划分，一个服务对应一个有界上下文。',
        author: 'Puzle'
      },
      3: {
        text: '容器化技术和服务网格',
        comment: 'Docker解决了环境一致性问题，Kubernetes实现了自动化部署和扩展。Service Mesh如Istio则提供了服务间通信的可观测性和流量管理能力。',
        author: 'Puzle'
      }
    }
  },
  {
    id: 3,
    title: 'React 19 最新版本核心特性全面详解：服务端组件、并发渲染与企业级项目实战应用指南',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
    source: '前端开发者',
    time: '8小时前',
    timeGroup: '今天',
    comments: 10,
    tags: ['# React', '# 前端开发', '# 教程'],
    topComment: {
      author: 'Puzle',
      content: '服务端组件真的很香！首屏加载速度提升明显，而且代码组织也更加清晰了。'
    },
    content: [
      { type: 'text', value: 'React 19 带来了许多令人兴奋的新特性，进一步提升了开发体验和应用性能。新的并发渲染机制让界面响应更加流畅。' },
      { type: 'image', value: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=500&fit=crop' },
      { type: 'text', value: '服务端组件的引入改变了我们思考React应用架构的方式，通过将部分组件放在服务端渲染，可以显著减少客户端的JavaScript负担，提升首屏加载速度。' },
      { type: 'text', value: '此外，新的Hook API和优化器也让代码编写变得更加简洁和高效。对于React开发者来说，这些新特性值得深入学习和实践。' }
    ]
  },
  // 昨天
  {
    id: 4,
    title: '企业级设计系统的构建、维护与团队协作最佳实践分享',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
    source: 'UX设计',
    time: '昨天 20:30',
    timeGroup: '昨天',
    comments: 4,
    tags: ['# 设计系统', '# UI设计', '# 最佳实践'],
    topComment: {
      author: 'Puzle',
      content: '设计系统的文档真的太重要了！没有好的文档，再好的组件库也很难推广使用。'
    },
    content: [
      { type: 'text', value: '一个好的设计系统能够显著提升团队的设计和开发效率。通过建立统一的设计语言和组件库，可以确保产品的一致性和可维护性。' },
      { type: 'image', value: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop' },
      { type: 'text', value: '构建设计系统需要从基础的设计原则、色彩系统、排版规范开始，逐步建立可复用的组件库。同时，文档和工具链也是设计系统成功的关键因素。' }
    ]
  },
  {
    id: 5,
    title: 'TypeScript 5.0 新版本重磅更新：装饰器、类型推断、性能优化与项目迁移完整指南',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=250&fit=crop',
    source: '编程之路',
    time: '昨天 15:20',
    timeGroup: '昨天',
    comments: 7,
    topComment: {
      author: 'Puzle',
      content: '装饰器终于正式支持了！之前用实验性特性总是担心后续的兼容性问题。'
    },
    tags: ['# TypeScript', '# 编程语言', '# 技术分享'],
    content: [
      { type: 'text', value: 'TypeScript 5.0 带来了重要的类型系统改进，使得类型推断更加智能和准确。新版本在性能和开发体验上都有显著提升。' },
      { type: 'image', value: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=500&fit=crop' },
      { type: 'text', value: '装饰器的正式支持、更好的枚举类型处理，以及改进的模块解析策略，这些特性让TypeScript更加强大和易用。' }
    ]
  },
  // 本周
  {
    id: 6,
    title: '从零开始学习 WebGL 着色器编程技术与3D渲染实战',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=250&fit=crop',
    source: '图形学爱好者',
    time: '3天前',
    timeGroup: '本周',
    comments: 3,
    tags: ['# WebGL', '# 图形编程', '# 3D开发'],
    topComment: {
      author: 'Puzle',
      content: '着色器编程初看很难，但掌握后真的能做出很酷的效果！建议从简单的颜色渐变开始练习。'
    },
    content: [
      { type: 'text', value: 'WebGL让我们能够在浏览器中实现强大的3D图形渲染。着色器编程是掌握WebGL的核心技能，通过编写顶点着色器和片段着色器，可以实现各种炫酷的视觉效果。' },
      { type: 'image', value: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=500&fit=crop' },
      { type: 'text', value: '本文将带你从基础开始，逐步理解着色器的工作原理，并通过实例学习如何创建自己的着色器程序。' }
    ]
  },
  {
    id: 7,
    title: '云原生应用开发的核心技术要点与Kubernetes实践经验',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=250&fit=crop',
    source: '云计算世界',
    time: '4天前',
    timeGroup: '本周',
    comments: 6,
    tags: ['# 云原生', '# Kubernetes', '# DevOps'],
    topComment: {
      author: 'Puzle',
      content: 'K8s的学习曲线确实陡峭，但一旦上手，就能体会到它的强大。配合Helm使用体验会更好。'
    },
    content: [
      { type: 'text', value: '云原生应用开发代表了现代应用架构的发展方向。通过容器化、微服务、服务网格等技术，可以构建出更加灵活、可扩展的应用系统。' },
      { type: 'image', value: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=500&fit=crop' },
      { type: 'text', value: 'Kubernetes作为容器编排的事实标准，配合CI/CD流水线和可观测性工具，能够实现应用的自动化部署和运维。' }
    ]
  },
  // 本月
  {
    id: 8,
    title: 'Web前端性能优化终极指南：从代码分割到资源加载，让你的网站访问速度飞速提升300%以上',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
    source: 'Web性能',
    time: '2周前',
    timeGroup: '本月',
    comments: 9,
    tags: ['# 性能优化', '# Web开发', '# 前端'],
    topComment: {
      author: 'Puzle',
      content: '性能优化最重要的是要先测量！lighthouse和webpagetest都是很好的工具。'
    },
    content: [
      { type: 'text', value: '网站性能直接影响用户体验和转化率。通过代码分割、懒加载、资源压缩等技术手段，可以显著提升页面加载速度。' },
      { type: 'image', value: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop' },
      { type: 'text', value: '同时，优化渲染性能、减少重绘重排、使用Web Workers等方法，能让页面交互更加流畅。性能优化是一个持续的过程，需要不断测量和改进。' }
    ]
  },
  {
    id: 9,
    title: 'Docker 容器化部署完整指南：从入门到生产环境实践',
    image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=250&fit=crop',
    source: 'DevOps实践',
    time: '3周前',
    timeGroup: '本月',
    comments: 2,
    tags: ['# Docker', '# 容器化', '# 部署'],
    topComment: {
      author: 'Puzle',
      content: '多阶段构建真的很实用，可以大幅减小镜像体积。生产环境一定要注意镜像的安全性。'
    },
    content: [
      { type: 'text', value: 'Docker容器技术改变了应用部署的方式。通过将应用及其依赖打包到容器中，可以确保在不同环境中的一致性运行。' },
      { type: 'image', value: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=500&fit=crop' },
      { type: 'text', value: '本指南涵盖Docker的基础概念、镜像构建、容器编排，以及在生产环境中的最佳实践。掌握Docker是现代开发者的必备技能。' }
    ]
  },
  // 更久
  {
    id: 10,
    title: '函数式编程思想在现代前端项目中的深度应用与实践',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=250&fit=crop',
    source: '编程范式',
    time: '1个月前',
    timeGroup: '更久',
    comments: 5,
    tags: ['# 函数式编程', '# 编程思想', '# 最佳实践'],
    topComment: {
      author: 'Puzle',
      content: '函数式编程让我的代码更容易测试和维护了。不可变数据结构在React中特别好用。'
    },
    content: [
      { type: 'text', value: '函数式编程提供了一种不同于面向对象的编程思维方式。通过纯函数、不可变数据、高阶函数等概念，可以写出更加清晰和可维护的代码。' },
      { type: 'image', value: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=500&fit=crop' },
      { type: 'text', value: '在JavaScript、Python等主流语言中，函数式编程的理念已经被广泛应用。理解函数式编程能够拓展你的编程思维，写出更优雅的代码。' }
    ]
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

// localStorage 键名
const REPLIES_STORAGE_KEY = 'puzle_read_article_replies';
const REPLY_ID_COUNTER_KEY = 'puzle_read_reply_id_counter';

// 初始化回复数据存储
const initializeArticleReplies = () => {
  const storedReplies = localStorage.getItem(REPLIES_STORAGE_KEY);
  if (storedReplies) {
    try {
      return JSON.parse(storedReplies);
    } catch (error) {
      console.error('解析存储的回复数据失败:', error);
    }
  }

  // 如果没有存储数据，初始化为空数组
  const initialReplies = {
    1: [], // 文章1的回复
    2: [], // 文章2的回复
    3: [], // 文章3的回复
    4: [], // 文章4的回复
    5: [], // 文章5的回复
    6: [], // 文章6的回复
    7: [], // 文章7的回复
    8: [], // 文章8的回复
    9: [], // 文章9的回复
    10: [] // 文章10的回复
  };
  saveArticleReplies(initialReplies);
  return initialReplies;
};

// 获取回复数据
export const getArticleRepliesStorage = () => {
  return initializeArticleReplies();
};

// 保存回复数据到 localStorage
const saveArticleReplies = (replies) => {
  try {
    localStorage.setItem(REPLIES_STORAGE_KEY, JSON.stringify(replies));
  } catch (error) {
    console.error('保存回复数据失败:', error);
  }
};

// 获取文章的所有回复
export const getArticleReplies = (articleId) => {
  const replies = getArticleRepliesStorage();
  return replies[articleId] || [];
};

// 生成唯一ID
const generateReplyId = () => {
  let counter = localStorage.getItem(REPLY_ID_COUNTER_KEY);
  if (!counter) {
    counter = 1000;
  } else {
    counter = parseInt(counter) + 1;
  }
  localStorage.setItem(REPLY_ID_COUNTER_KEY, counter.toString());
  return counter;
};

// 添加回复到文章
export const addReplyToArticle = (articleId, replyData) => {
  const replies = getArticleRepliesStorage();

  if (!replies[articleId]) {
    replies[articleId] = [];
  }

  const newReply = {
    id: generateReplyId(),
    author: '我',
    content: replyData.content,
    time: '刚刚',
    isMe: true,
    isPuzle: false,
    likes: 0,
    replies: [],
    replyTo: replyData.replyTo || '未知用户',
    replyToAuthor: replyData.replyToAuthor || replyData.replyTo || '未知用户',
    originalComment: replyData.originalComment || ''
  };

  replies[articleId].push(newReply);
  saveArticleReplies(replies);
  return newReply;
};

// 为了向后兼容，导出一个空的 articleReplies 对象
export const articleReplies = {};

