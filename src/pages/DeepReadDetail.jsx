import { useState } from 'react';
import { Box, Typography, IconButton, InputBase, Button, Chip, Dialog, DialogContent, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import CloseIcon from '@mui/icons-material/Close';
import CommentItem from '../components/CommentItem';
import { mockComments, countComments } from '../data/mockComments';

const DeepReadDetail = ({ article, onBack }) => {
  const [comments, setComments] = useState(mockComments);
  const [commentText, setCommentText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeHighlightId, setActiveHighlightId] = useState(null);
  const [replyingToHighlightId, setReplyingToHighlightId] = useState(null);
  const [highlightReplyText, setHighlightReplyText] = useState('');
  const [highlightReplies, setHighlightReplies] = useState({});

  const commentCount = countComments(comments);

  const handleReply = (comment) => {
    setReplyingTo(comment);
    setCommentText(`回复 ${comment.author}：`);
  };

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      console.log('发表评论:', commentText);
      setCommentText('');
      setReplyingTo(null);
    }
  };

  const handleDeleteComment = (commentId) => {
    console.log('删除评论:', commentId);
  };

  const handleHighlightClick = (highlightId) => {
    setActiveHighlightId(highlightId);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setActiveHighlightId(null);
    setReplyingToHighlightId(null);
    setHighlightReplyText('');
  };

  const handleReplyHighlight = (highlightId) => {
    setReplyingToHighlightId(highlightId);
  };

  const handleSubmitHighlightReply = (highlightId) => {
    if (highlightReplyText.trim()) {
      const newReply = {
        id: Date.now(),
        author: '我',
        content: highlightReplyText,
        time: '刚刚'
      };
      
      setHighlightReplies(prev => ({
        ...prev,
        [highlightId]: [...(prev[highlightId] || []), newReply]
      }));
      
      setReplyingToHighlightId(null);
      setHighlightReplyText('');
    }
  };

  const handleCancelHighlightReply = () => {
    setReplyingToHighlightId(null);
    setHighlightReplyText('');
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    console.log('已复制:', text);
  };

  const handleShare = (highlightId) => {
    console.log('分享评论:', highlightId);
  };

  // 使用默认文章数据
  const displayArticle = article || {
    title: 'OpenAI最新产品发布会展示突破性多模态AI技术成果',
    source: 'TechCrunch',
    time: '2分钟前更新',
    tags: ['# AI相关问题讨论', '# 资料收集'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
    content: [],
    highlights: {}
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
          深度阅读 | 讨论 {commentCount}
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
          {displayArticle.tags?.map((tag, index) => (
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
                component="span"
                onClick={() => item.isHighlight && handleHighlightClick(item.highlightId)}
                sx={{
                  fontSize: '16px',
                  lineHeight: 1.8,
                  color: 'var(--color-gray-90)',
                  cursor: item.isHighlight ? 'pointer' : 'default',
                  textDecoration: item.isHighlight ? 'underline' : 'none',
                  textDecorationColor: item.isHighlight ? '#FFD700' : 'transparent',
                  textDecorationThickness: item.isHighlight ? '2px' : '0',
                  textUnderlineOffset: item.isHighlight ? '3px' : '0',
                  '&:hover': item.isHighlight ? {
                    textDecorationColor: '#FFC000',
                    textDecorationThickness: '2.5px',
                  } : {},
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
                  margin: '16px 0',
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

      {/* 高亮评论弹窗 */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        fullScreen
        PaperProps={{
          sx: {
            backgroundColor: 'var(--color-gray-0)',
          },
        }}
      >
        <DialogContent sx={{ padding: 0 }}>
          {/* 顶部标题栏 */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 20px',
              borderBottom: '1px solid var(--color-gray-40)',
            }}
          >
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--color-gray-100)',
              }}
            >
              Puzle 的解读
            </Typography>
            <IconButton
              onClick={handleCloseDialog}
              sx={{
                padding: '4px',
                color: 'var(--color-gray-60)',
              }}
            >
              <CloseIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>

          {/* 所有高亮评论列表 */}
          <Box sx={{ padding: '20px', height: 'calc(100vh - 70px)', overflowY: 'auto' }}>
            {displayArticle.highlights && Object.keys(displayArticle.highlights).map((key, index) => {
              const highlight = displayArticle.highlights[key];
              const isActive = activeHighlightId == key;
              
              return (
                <Box key={key}>
                  {index > 0 && <Divider sx={{ marginY: '20px' }} />}
                  
                  {/* 高亮文本 */}
                  <Box
                    sx={{
                      padding: '14px',
                      backgroundColor: isActive ? 'var(--color-gray-20)' : 'var(--color-gray-10)',
                      borderRadius: '6px',
                      marginBottom: '16px',
                      borderLeft: isActive ? '3px solid #FFD700' : '3px solid transparent',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '16px',
                        lineHeight: 1.6,
                        color: 'var(--color-gray-90)',
                        fontWeight: 500,
                        textDecoration: 'underline',
                        textDecorationColor: '#FFD700',
                        textDecorationThickness: '2px',
                        textUnderlineOffset: '3px',
                      }}
                    >
                      "{highlight.text}"
                    </Typography>
                  </Box>

                  {/* Puzle的评论 */}
                  <Box sx={{ marginBottom: '16px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                      <Box
                        sx={{
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--color-gray-60)',
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: '14px',
                          fontWeight: 600,
                          color: 'var(--color-gray-80)',
                        }}
                      >
                        {highlight.author}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        fontSize: '16px',
                        lineHeight: 1.7,
                        color: 'var(--color-gray-80)',
                        marginBottom: '16px',
                      }}
                    >
                      {highlight.comment}
                    </Typography>

                    {/* 操作按钮 */}
                    <Box sx={{ display: 'flex', gap: '20px', marginBottom: replyingToHighlightId == key ? '12px' : '0' }}>
                      <Box
                        onClick={() => handleReplyHighlight(key)}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          cursor: 'pointer',
                          '&:hover': {
                            opacity: 0.7,
                          },
                        }}
                      >
                        <ReplyOutlinedIcon sx={{ fontSize: 18, color: 'var(--color-gray-60)' }} />
                        <Typography sx={{ fontSize: '15px', color: 'var(--color-gray-60)' }}>
                          回复
                        </Typography>
                      </Box>
                      <Box
                        onClick={() => handleCopy(highlight.comment)}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          cursor: 'pointer',
                          '&:hover': {
                            opacity: 0.7,
                          },
                        }}
                      >
                        <ContentCopyOutlinedIcon sx={{ fontSize: 18, color: 'var(--color-gray-60)' }} />
                        <Typography sx={{ fontSize: '15px', color: 'var(--color-gray-60)' }}>
                          复制
                        </Typography>
                      </Box>
                      <Box
                        onClick={() => handleShare(key)}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          cursor: 'pointer',
                          '&:hover': {
                            opacity: 0.7,
                          },
                        }}
                      >
                        <ShareOutlinedIcon sx={{ fontSize: 18, color: 'var(--color-gray-60)' }} />
                        <Typography sx={{ fontSize: '15px', color: 'var(--color-gray-60)' }}>
                          分享
                        </Typography>
                      </Box>
                    </Box>

                    {/* 回复输入框 */}
                    {replyingToHighlightId == key && (
                      <Box
                        sx={{
                          backgroundColor: 'var(--color-gray-20)',
                          borderRadius: '8px',
                          padding: '12px',
                          marginBottom: '12px',
                        }}
                      >
                        <InputBase
                          multiline
                          rows={3}
                          placeholder="输入你的回复..."
                          value={highlightReplyText}
                          onChange={(e) => setHighlightReplyText(e.target.value)}
                          sx={{
                            width: '100%',
                            fontSize: '15px',
                            color: 'var(--color-gray-90)',
                            backgroundColor: 'var(--color-gray-0)',
                            borderRadius: '6px',
                            padding: '10px',
                            marginBottom: '10px',
                            border: '1px solid var(--color-gray-40)',
                            '&:focus-within': {
                              border: '1px solid var(--color-gray-60)',
                            },
                          }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                          <Button
                            onClick={handleCancelHighlightReply}
                            sx={{
                              fontSize: '14px',
                              color: 'var(--color-gray-70)',
                              textTransform: 'none',
                              padding: '6px 16px',
                              '&:hover': {
                                backgroundColor: 'var(--color-gray-30)',
                              },
                            }}
                          >
                            取消
                          </Button>
                          <Button
                            onClick={() => handleSubmitHighlightReply(key)}
                            disabled={!highlightReplyText.trim()}
                            sx={{
                              fontSize: '14px',
                              color: 'var(--color-gray-0)',
                              backgroundColor: 'var(--color-gray-100)',
                              textTransform: 'none',
                              padding: '6px 16px',
                              '&:hover': {
                                backgroundColor: 'var(--color-gray-90)',
                              },
                              '&:disabled': {
                                backgroundColor: 'var(--color-gray-40)',
                                color: 'var(--color-gray-60)',
                              },
                            }}
                          >
                            发送
                          </Button>
                        </Box>
                      </Box>
                    )}

                    {/* 回复列表 */}
                    {highlightReplies[key] && highlightReplies[key].length > 0 && (
                      <Box sx={{ marginTop: '12px', paddingLeft: '16px', borderLeft: '2px solid var(--color-gray-30)' }}>
                        {highlightReplies[key].map((reply) => (
                          <Box key={reply.id} sx={{ marginBottom: '12px' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                              <Box
                                sx={{
                                  width: '4px',
                                  height: '4px',
                                  borderRadius: '50%',
                                  backgroundColor: 'var(--color-gray-60)',
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: '13px',
                                  fontWeight: 600,
                                  color: 'var(--color-gray-80)',
                                }}
                              >
                                {reply.author}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: '12px',
                                  color: 'var(--color-gray-60)',
                                }}
                              >
                                {reply.time}
                              </Typography>
                            </Box>
                            <Typography
                              sx={{
                                fontSize: '15px',
                                lineHeight: 1.6,
                                color: 'var(--color-gray-80)',
                                paddingLeft: '12px',
                              }}
                            >
                              {reply.content}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default DeepReadDetail;

