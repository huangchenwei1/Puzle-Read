import { Box, Typography, IconButton } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useState } from 'react';

const CommentItem = ({ comment, level = 0, onReply, onDelete }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(comment.likes);

  const handleLike = () => {
    if (comment.isPuzle) {
      setLiked(!liked);
      setLikesCount(liked ? likesCount - 1 : likesCount + 1);
    }
  };

  const handleDelete = () => {
    if (comment.isMe && onDelete) {
      onDelete(comment.id);
    }
  };

  return (
    <Box
      sx={{
        marginLeft: level > 0 ? '32px' : 0,
        marginBottom: '16px',
      }}
    >
      {/* 评论主体 */}
      <Box>
        {/* 用户名和时间 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '8px',
            gap: '8px',
          }}
        >
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: comment.isPuzle || comment.isMe ? 600 : 500,
              color: comment.isPuzle ? 'var(--color-gray-100)' : 'var(--color-gray-80)',
            }}
          >
            {comment.author}
            {comment.isPuzle && ' :'}
          </Typography>
          <Typography
            sx={{
              fontSize: '12px',
              color: 'var(--color-gray-60)',
            }}
          >
            {comment.time}
          </Typography>
          {comment.isMe && (
            <IconButton
              onClick={handleDelete}
              sx={{
                padding: 0,
                marginLeft: 'auto',
                color: 'var(--color-gray-60)',
              }}
            >
              <MoreHorizIcon sx={{ fontSize: 18 }} />
            </IconButton>
          )}
        </Box>

        {/* 评论内容 */}
        <Typography
          sx={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: 'var(--color-gray-100)',
            marginBottom: '12px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {comment.content}
        </Typography>

        {/* 操作按钮 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          {/* 点赞按钮 - 只有Puzle的评论可以点赞 */}
          {comment.isPuzle && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer',
              }}
              onClick={handleLike}
            >
              <IconButton
                sx={{
                  padding: 0,
                  color: liked ? 'var(--color-gray-100)' : 'var(--color-gray-60)',
                }}
              >
                {liked ? (
                  <ThumbUpIcon sx={{ fontSize: 16 }} />
                ) : (
                  <ThumbUpOutlinedIcon sx={{ fontSize: 16 }} />
                )}
              </IconButton>
              {likesCount > 0 && (
                <Typography
                  sx={{
                    fontSize: '12px',
                    color: liked ? 'var(--color-gray-100)' : 'var(--color-gray-60)',
                  }}
                >
                  {likesCount}
                </Typography>
              )}
            </Box>
          )}

          {/* 回复按钮 */}
          <Typography
            sx={{
              fontSize: '12px',
              color: 'var(--color-gray-60)',
              cursor: 'pointer',
              '&:hover': {
                color: 'var(--color-gray-100)',
              },
            }}
            onClick={() => onReply && onReply(comment)}
          >
            回复
          </Typography>
        </Box>
      </Box>

      {/* 嵌套回复 */}
      {comment.replies && comment.replies.length > 0 && (
        <Box sx={{ marginTop: '16px' }}>
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              level={level + 1}
              onReply={onReply}
              onDelete={onDelete}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default CommentItem;


