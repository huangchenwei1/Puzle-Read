import { useState } from 'react';
import { Box, Typography, IconButton, Chip, Dialog, DialogContent, Divider, InputBase, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import CloseIcon from '@mui/icons-material/Close';

const ReadModeDetail = ({ article, onBack }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeHighlightId, setActiveHighlightId] = useState(null);
  const [replyingToId, setReplyingToId] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState({});

  const handleHighlightClick = (highlightId) => {
    setActiveHighlightId(highlightId);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setActiveHighlightId(null);
    setReplyingToId(null);
    setReplyText('');
  };

  const handleReply = (highlightId) => {
    setReplyingToId(highlightId);
  };

  const handleSubmitReply = (highlightId) => {
    if (replyText.trim()) {
      const newReply = {
        id: Date.now(),
        author: '我',
        content: replyText,
        time: '刚刚'
      };
      
      setReplies(prev => ({
        ...prev,
        [highlightId]: [...(prev[highlightId] || []), newReply]
      }));
      
      setReplyingToId(null);
      setReplyText('');
    }
  };

  const handleCancelReply = () => {
    setReplyingToId(null);
    setReplyText('');
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
          精读模式
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
          paddingBottom: '40px',
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

        {/* 查看所有评论入口 */}
        <Box
          onClick={() => setDialogOpen(true)}
          sx={{
            marginTop: '40px',
            padding: '16px',
            border: '1px solid var(--color-gray-40)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'var(--color-gray-10)',
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ChatBubbleOutlineIcon sx={{ fontSize: 20, color: 'var(--color-gray-60)' }} />
            <Typography
              sx={{
                fontSize: '15px',
                fontWeight: 500,
                color: 'var(--color-gray-100)',
              }}
            >
              查看所有评论
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: '14px',
              color: 'var(--color-gray-60)',
            }}
          >
            →
          </Typography>
        </Box>
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
                    <Box sx={{ display: 'flex', gap: '20px', marginBottom: replyingToId == key ? '12px' : '0' }}>
                      <Box
                        onClick={() => handleReply(key)}
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
                    {replyingToId == key && (
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
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
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
                            onClick={handleCancelReply}
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
                            onClick={() => handleSubmitReply(key)}
                            disabled={!replyText.trim()}
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
                    {replies[key] && replies[key].length > 0 && (
                      <Box sx={{ marginTop: '12px', paddingLeft: '16px', borderLeft: '2px solid var(--color-gray-30)' }}>
                        {replies[key].map((reply) => (
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

export default ReadModeDetail;

