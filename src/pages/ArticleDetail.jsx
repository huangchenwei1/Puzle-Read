import { useState } from 'react';
import { Box, Typography, IconButton, InputBase, Button, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CommentItem from '../components/CommentItem';
import { mockComments, countComments } from '../data/mockComments';

const ArticleDetail = ({ article, onBack }) => {
  const [comments, setComments] = useState(mockComments);
  const [commentText, setCommentText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);

  const commentCount = countComments(comments);

  const handleReply = (comment) => {
    setReplyingTo(comment);
    setCommentText(`回复 ${comment.author}：`);
  };

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      console.log('发表评论:', commentText);
      // 这里只是UI展示，不实现实际功能
      setCommentText('');
      setReplyingTo(null);
    }
  };

  const handleDeleteComment = (commentId) => {
    console.log('删除评论:', commentId);
    // 这里只是UI展示，不实现实际功能
  };

  // 使用默认文章数据（如果没有传入）
  const displayArticle = article || {
    title: 'OpenAI最新产品发布会展示突破性多模态AI技术成果，表达了当前时代...',
    source: 'TechCrunch',
    time: '2分钟前更新',
    tags: ['# AI相关问题讨论', '# 资料收集'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
    content: [
      { type: 'text', value: 'OpenAI在最新的产品发布会上展示了令人震撼的多模态AI技术成果。这些技术能够同时处理文本、图像、音频等多种形式的信息。' },
      { type: 'image', value: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop' },
      { type: 'text', value: '新一代的AI模型在理解和生成能力上都有显著提升，标志着人工智能技术进入了一个新的发展阶段。' }
    ]
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-gray-0)',
      }}
    >
      {/* 顶部导航栏 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          borderBottom: '1px solid var(--color-gray-40)',
          backgroundColor: 'var(--color-gray-0)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <IconButton
          onClick={onBack}
          sx={{
            padding: '4px',
            color: 'var(--color-gray-100)',
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: 600,
            color: 'var(--color-gray-100)',
          }}
        >
          讨论 {commentCount}
        </Typography>
        <IconButton
          sx={{
            padding: '4px',
            color: 'var(--color-gray-100)',
          }}
        >
          <MoreHorizIcon />
        </IconButton>
      </Box>

      {/* 文章卡片预览 */}
      <Box
        sx={{
          padding: '20px',
          borderBottom: '1px solid var(--color-gray-40)',
        }}
      >
        <Typography
          sx={{
            fontSize: '17px',
            fontWeight: 600,
            lineHeight: 1.5,
            color: 'var(--color-gray-100)',
            marginBottom: '16px',
          }}
        >
          {displayArticle.title}
        </Typography>

        {/* 标签 */}
        <Box
          sx={{
            display: 'flex',
            gap: '8px',
            marginBottom: '16px',
            flexWrap: 'wrap',
          }}
        >
          {displayArticle.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              sx={{
                backgroundColor: 'var(--color-gray-20)',
                color: 'var(--color-gray-80)',
                fontSize: '12px',
                height: '28px',
                border: 'none',
                '& .MuiChip-label': {
                  padding: '0 12px',
                },
              }}
            />
          ))}
        </Box>

        {/* 来源信息 */}
        <Box sx={{ display: 'flex', gap: '8px' }}>
          <Typography
            sx={{
              fontSize: '12px',
              color: 'var(--color-gray-60)',
            }}
          >
            {displayArticle.source}
          </Typography>
          <Typography
            sx={{
              fontSize: '12px',
              color: 'var(--color-gray-60)',
            }}
          >
            {displayArticle.time}
          </Typography>
        </Box>
      </Box>

      {/* 原文内容 */}
      <Box
        sx={{
          padding: '20px',
          borderBottom: '1px solid var(--color-gray-40)',
        }}
      >
        {displayArticle.content && displayArticle.content.map((item, index) => {
          if (item.type === 'text') {
            return (
              <Typography
                key={index}
                sx={{
                  fontSize: '16px',
                  lineHeight: 1.8,
                  color: 'var(--color-gray-90)',
                  marginBottom: '16px',
                }}
              >
                {item.value}
              </Typography>
            );
          } else if (item.type === 'image') {
            return (
              <Box
                key={index}
                component="img"
                src={item.value}
                alt="文章配图"
                sx={{
                  width: '100%',
                  borderRadius: '4px',
                  marginBottom: '16px',
                  display: 'block',
                }}
              />
            );
          }
          return null;
        })}
      </Box>

      {/* 评论区 */}
      <Box sx={{ padding: '20px', paddingBottom: '80px' }}>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onReply={handleReply}
            onDelete={handleDeleteComment}
          />
        ))}
      </Box>

      {/* 底部评论输入框 */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          maxWidth: '480px',
          margin: '0 auto',
          backgroundColor: 'var(--color-gray-0)',
          borderTop: '1px solid var(--color-gray-40)',
          padding: '12px 16px',
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
        }}
      >
        <InputBase
          placeholder={replyingTo ? `回复 ${replyingTo.author}...` : '分享我的观点...'}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          multiline
          maxRows={3}
          sx={{
            flex: 1,
            fontSize: '14px',
            color: 'var(--color-gray-100)',
            backgroundColor: 'var(--color-gray-0)',
            border: '1px solid var(--color-gray-40)',
            borderRadius: '4px',
            padding: '8px 12px',
            '& input::placeholder': {
              color: 'var(--color-gray-60)',
              opacity: 1,
            },
          }}
        />
        <Button
          onClick={handleSubmitComment}
          disabled={!commentText.trim()}
          sx={{
            textTransform: 'none',
            color: 'var(--color-gray-0)',
            backgroundColor: 'var(--color-gray-100)',
            padding: '8px 20px',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: 500,
            minWidth: '60px',
            '&:hover': {
              backgroundColor: 'var(--color-gray-80)',
            },
            '&.Mui-disabled': {
              backgroundColor: 'var(--color-gray-40)',
              color: 'var(--color-gray-60)',
            },
          }}
        >
          评论
        </Button>
      </Box>
    </Box>
  );
};

export default ArticleDetail;


