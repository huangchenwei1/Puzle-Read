import { useState, useRef, useEffect } from 'react';
import { Box, InputBase, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { addReplyToArticle } from '../data/mockArticles';

const GlobalReplyInput = ({
  isVisible,
  article,
  replyToComment,
  onClose,
  onReplyAdded
}) => {
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef(null);

  // 当组件显示或回复对象改变时，更新输入框内容
  useEffect(() => {
    if (isVisible && replyToComment) {
      setReplyContent(`回复 @${replyToComment.author} `);
    } else if (isVisible) {
      setReplyContent('');
    } else {
      setReplyContent('');
    }
  }, [isVisible, replyToComment]);

  // 自动聚焦输入框
  useEffect(() => {
    if (isVisible && inputRef.current) {
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  // 处理键盘事件
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  // 处理回复提交
  const handleReplySubmit = async () => {
    if (!replyContent.trim() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // 提取回复内容，去掉"回复 @用户名"前缀
      const cleanContent = replyContent.replace(/^回复 @[^ ]+\s+/, '');

      // 构建回复数据
      const replyData = {
        content: cleanContent,
        replyTo: replyToComment?.author || '未知用户',
        replyToAuthor: replyToComment?.author || '未知用户',
        originalComment: replyToComment?.content || ''
      };

      // 保存到 mock 数据
      const newReply = addReplyToArticle(article.id, replyData);

      console.log('回复已保存:', newReply);

      // 通知父组件有新回复
      if (onReplyAdded) {
        onReplyAdded(article.id, newReply);
      }

      // 关闭输入框
      onClose();
    } catch (error) {
      console.error('提交回复失败:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 处理点击外部区域关闭
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isVisible) {
        const inputBox = document.querySelector('[data-global-reply-box]');
        if (inputBox && !inputBox.contains(event.target)) {
          // 检查点击的不是评论区域
          const commentArea = event.target.closest('[data-comment-area]');
          if (!commentArea) {
            onClose();
          }
        }
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible, onClose]);

  if (!isVisible || !article) return null;

  return (
    <Box
      data-global-reply-box="true"
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
        zIndex: 1000
      }}
    >
      {/* 关闭按钮 */}
      {replyToComment && (
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: 'var(--color-gray-60)',
            padding: '2px'
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      )}

      {/* 输入框 - 与 ArticleDetail 完全一致的样式 */}
      <InputBase
        inputRef={inputRef}
        placeholder={replyToComment ? `回复 ${replyToComment.author}...` : '分享我的观点...'}
        value={replyContent}
        onChange={(e) => setReplyContent(e.target.value)}
        multiline
        maxRows={3}
        disabled={isSubmitting}
        sx={{
          flex: 1,
          fontSize: '16px', // 防止iOS缩放
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

      {/* 发送按钮 - 与 ArticleDetail 完全一致的样式 */}
      <Button
        onClick={handleReplySubmit}
        disabled={!replyContent.trim() || isSubmitting}
        sx={{
          textTransform: 'none',
          color: 'var(--color-gray-0)',
          backgroundColor: (replyContent.trim() && !isSubmitting) ? 'var(--color-gray-100)' : 'var(--color-gray-40)',
          padding: '8px 20px',
          borderRadius: '4px',
          fontSize: '14px',
          fontWeight: 500,
          minWidth: '60px',
          '&:hover': {
            backgroundColor: (replyContent.trim() && !isSubmitting) ? 'var(--color-gray-80)' : 'var(--color-gray-40)',
          },
          '&.Mui-disabled': {
            backgroundColor: 'var(--color-gray-40)',
            color: 'var(--color-gray-60)',
          },
        }}
      >
        {isSubmitting ? '发送中...' : '发送'}
      </Button>
    </Box>
  );
};

export default GlobalReplyInput;