// 模拟评论数据
export const mockComments = [
  {
    id: 1,
    author: 'Puzle',
    isPuzle: true,
    time: '32分钟前',
    content: '这次发布会的亮点主要集中在2个方面：\n\n1. 新模型可以同时理解和生成文本、图像、音频，信息处理更加自然流畅。\n\n2. 语音对话的延迟降低到接近人类对话的水平，能捕捉语气、情感等细微变化。',
    likes: 24,
    replies: [
      {
        id: 2,
        author: '我',
        isMe: true,
        time: '21分钟前',
        content: '我也这么认为，可以再说详细一点么？',
        likes: 0,
        replies: [
          {
            id: 3,
            author: 'Puzle',
            isPuzle: true,
            time: '14分钟前',
            content: '回复 我：这些突破不仅标志着AI技术进入了一个全新的阶段，也预示着人机协作的边界正在被重新定义。过去，AI更多地扮演"回答者"的角色',
            likes: 12,
            replies: []
          }
        ]
      }
    ]
  },
  {
    id: 4,
    author: 'Puzle',
    isPuzle: true,
    time: '32分钟前',
    content: '随着多模态模型的持续演进，AI将不再仅仅是工具，而是一种具备创造力的智能体。',
    likes: 18,
    replies: []
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


