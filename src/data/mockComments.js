// 模拟评论数据
export const mockComments = [
  {
    id: 1,
    author: 'Puzle',
    isPuzle: true,
    time: '32分钟前',
    content: 'Vue 3的Composition API确实解决了Options API在处理复杂组件时的痛点，特别是在逻辑复用和类型推导方面有显著提升。',
    likes: 15,
    replies: [
      {
        id: 2,
        author: '张小明',
        time: '28分钟前',
        content: 'setup script语法糖真的很好用，代码看起来更简洁了。',
        likes: 3,
        replies: []
      },
      {
        id: 3,
        author: '李技术',
        time: '25分钟前',
        content: '性能提升确实明显，但是迁移成本还是有点高，特别是对于大型项目。',
        likes: 5,
        replies: []
      }
    ]
  },
  {
    id: 4,
    author: 'Puzle',
    isPuzle: true,
    time: '45分钟前',
    content: '长文本处理能力确实是现代大语言模型的核心竞争力之一。随着上下文窗口的不断扩展，我们能够处理更复杂的任务，比如整本书的总结、长篇文档的分析等。',
    likes: 22,
    replies: [
      {
        id: 5,
        author: '我',
        isMe: true,
        time: '38分钟前',
        content: 'Puzle说得对！不过上下文窗口越大，模型的注意力机制计算负担是不是也越重？这会不会影响响应速度？',
        likes: 2,
        replies: [
          {
            id: 6,
            author: '王算法',
            time: '35分钟前',
            content: '确实有这个问题，现在有一些优化的注意力机制，比如FlashAttention，可以在保证效果的同时提升计算效率。',
            likes: 8,
            replies: []
          },
          {
            id: 7,
            author: 'Puzle',
            isPuzle: true,
            time: '30分钟前',
            content: '回复 我：你提到了一个很好的点！计算复杂度确实是O(n²)，这正是为什么需要算法优化的原因。除了FlashAttention，还有稀疏注意力、局部注意力等方案。另外，硬件层面的优化也很重要，比如专门针对Transformer架构的芯片设计。',
            likes: 12,
            replies: [
              {
                id: 8,
                author: '我',
                isMe: true,
                time: '26分钟前',
                content: '感谢Puzle的详细解答！硬件加速确实很有意思，有没有了解过哪些具体的实现方案？',
                likes: 1,
                replies: []
              }
            ]
          }
        ]
      },
      {
        id: 9,
        author: '赵研究',
        time: '20分钟前',
        content: '多模态融合也很重要，未来的AI应该能同时处理文本、图像、音频等多种信息。',
        likes: 6,
        replies: []
      }
    ]
  },
  {
    id: 10,
    author: '前端小王',
    time: '1小时前',
    content: 'React 19的服务端组件听起来很厉害，但是学习成本感觉不低啊。',
    likes: 4,
    replies: [
      {
        id: 11,
        author: 'Puzle',
        isPuzle: true,
        time: '55分钟前',
        content: '确实需要一些思维转换，但是一旦理解了"在服务端运行"这个核心概念，就会发现它解决了很多前端性能问题。',
        likes: 9,
        replies: []
      }
    ]
  },
  {
    id: 12,
    author: 'Puzle',
    isPuzle: true,
    time: '2小时前',
    content: '设计系统的成功关键在于三个要素：一致性、可扩展性、易用性。但最重要的是要有一个好的维护机制和文档体系。',
    likes: 18,
    replies: [
      {
        id: 13,
        author: 'UI设计师',
        time: '1小时45分钟前',
        content: '文档确实太重要了，没有文档的设计系统就像没有说明书的复杂机器。',
        likes: 7,
        replies: []
      }
    ]
  },
  {
    id: 14,
    author: '后端老张',
    time: '3小时前',
    content: '微服务拆分真的是个技术活，拆分粒度的把握需要很多实践经验。',
    likes: 11,
    replies: [
      {
        id: 15,
        author: 'Puzle',
        isPuzle: true,
        time: '2小时50分钟前',
        content: '建议按业务能力拆分，一个微服务对应一个有界上下文。这样既保证了服务内聚性，又降低了服务间耦合。',
        likes: 15,
        replies: [
          {
            id: 16,
            author: '架构师小李',
            time: '2小时30分钟前',
            content: 'DDD（领域驱动设计）的指导原则确实很有用，但在实际项目中执行起来还是很有挑战性。',
            likes: 4,
            replies: []
          }
        ]
      }
    ]
  }
];

// 递归计算评论总数
export const countComments = (comments) => {
  let count = 0;
  comments.forEach(comment => {
    count += 1;
    if (comment.replies && comment.replies.length > 0) {
      count += countComments(comment.replies);
    }
  });
  return count;
};


