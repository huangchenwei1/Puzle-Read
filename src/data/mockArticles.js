// 导入评论数据相关函数
import { getArticleComments } from './mockComments';

// 模拟文章数据
export const mockArticles = [
  // 今天
  {
    id: 1,
    title: 'Vue 3 新特性: Composition API ',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
    source: '前端开发者',
    time: '2小时前',
    timeGroup: '今天',
    comments: 5,
    tags: ['# Vue', '# 前端', '# 新特性'],
    topComment: {
      author: 'Puzle',
      content: 'Composition API真的是Vue 3的点睛之笔，代码组织更加灵活了。'
    },
    content: [
      { type: 'text', value: 'Vue 3带来了许多令人兴奋的新特性，包括Composition API、性能提升、更好的TypeScript支持等。' },
      { type: 'image', value: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop' },
      { type: 'text', value: '这些改进让Vue 3成为了一个更加现代化和强大的前端框架。' }
    ]
  },
  {
    id: 2,
    title: '深度学习技术在自然语言处理领域的最新研究进展、算法创新与实践应用深度探讨：从Transformer架构到大语言模型的发展历程，以及多模态AI融合的未来趋势分析和产业应用前景展望',
    image: null, // 无封面例子
    source: 'AI研究院',
    time: '5小时前',
    timeGroup: '今天',
    comments: 8,
    tags: ['# AI技术', '# 深度学习', '# NLP', '# 多模态'],
    topComment: {
      author: 'Puzle',
      content: '长文本建模能力确实是现代LLM的核心竞争力之一，上下文窗口的大小直接影响模型的实用性。'
    },
    content: [
      { type: 'text', value: '深度学习技术在自然语言处理领域取得了突破性进展。近年来，' },
      { type: 'text', value: 'Transformer架构', isHighlight: true, highlightId: 1 },
      { type: 'text', value: '的出现彻底改变了NLP的研究方向，使得模型能够更好地理解和生成人类语言。' },
      { type: 'text', value: '大规模预训练模型如GPT、BERT等的成功应用，证明了' },
      { type: 'text', value: '深度学习在处理复杂语言任务时的强大能力', isHighlight: true, highlightId: 2 },
      { type: 'text', value: '。这些模型通过在海量文本数据上进行预训练，学习到了丰富的语言知识和上下文理解能力。' }
    ],
    highlights: {
      1: {
        text: 'Transformer架构',
        comment: 'Transformer的自注意力机制是革命性的创新，它让模型能够直接建立序列中任意两个位置之间的依赖关系。',
        author: 'Puzle'
      },
      2: {
        text: '深度学习在处理复杂语言任务时的强大能力',
        comment: '这种能力主要体现在语义理解、上下文关联和生成内容的连贯性方面，相比传统方法有质的飞跃。',
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
    title: '从零开始学习 WebGL 着色器编程技术',
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

// 清除旧的localStorage数据
const clearOldRepliesData = () => {
  try {
    localStorage.removeItem(REPLIES_STORAGE_KEY);
    localStorage.removeItem(REPLY_ID_COUNTER_KEY);
  } catch (error) {
    console.error('清除旧数据失败:', error);
  }
};

// 初始化回复数据存储（仅在数据不存在时）
const initializeArticleReplies = () => {
  // 检查是否已有数据
  const existingData = localStorage.getItem(REPLIES_STORAGE_KEY);
  if (existingData) {
    try {
      return JSON.parse(existingData);
    } catch (error) {
      console.error('解析现有回复数据失败:', error);
    }
  }

  // 没有数据时创建初始数据
  const initialReplies = {
    1: [], 2: [], 3: [], 4: [], 5: [],
    6: [], 7: [], 8: [], 9: [], 10: []
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
  // 1. 获取静态mock评论数据
  const articleComments = getArticleComments(articleId);

  // 2. 将静态评论数据扁平化（添加去重机制）
  const flattenedReplies = [];
  const processedIds = new Set();

  articleComments.forEach(comment => {
    // 添加主评论，避免重复
    if (!processedIds.has(comment.id)) {
      flattenedReplies.push(comment);
      processedIds.add(comment.id);
    }

    // 添加嵌套回复
    if (comment.replies && comment.replies.length > 0) {
      const flattenNestedReplies = (replies) => {
        replies.forEach(reply => {
          // 只有未处理过的评论才添加
          if (!processedIds.has(reply.id)) {
            flattenedReplies.push(reply);
            processedIds.add(reply.id);
          }

          // 递归处理更深层的回复
          if (reply.replies && reply.replies.length > 0) {
            flattenNestedReplies(reply.replies);
          }
        });
      };
      flattenNestedReplies(comment.replies);
    }
  });

  // 3. 获取用户回复数据并合并（去重）
  const storedReplies = getArticleRepliesStorage();
  const userReplies = storedReplies[articleId] || [];

  userReplies.forEach(userReply => {
    if (!processedIds.has(userReply.id)) {
      flattenedReplies.push(userReply);
      processedIds.add(userReply.id);
    }
  });

  return flattenedReplies;
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
