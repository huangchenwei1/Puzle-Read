import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const ArticleCard = ({ article }) => {
  return (
    <Card
      sx={{
        marginBottom: '20px',
        boxShadow: 'none',
        border: 'none',
        backgroundColor: 'transparent',
        borderRadius: '8px',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: 'var(--color-gray-20)',
        }
      }}
    >
      {/* 上半部分：图片和标题 */}
      <Box sx={{ display: 'flex', padding: '0', marginBottom: '10px' }}>
        {/* 左侧文字 */}
        <Box sx={{ flex: 1, paddingRight: '12px' }}>
          <Typography
            variant="body1"
            sx={{
              fontSize: '16px',
              fontWeight: 600,
              lineHeight: 1.5,
              color: 'var(--color-gray-100)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {article.title}
          </Typography>
        </Box>
        
        {/* 右侧图片 */}
        <CardMedia
          component="img"
          sx={{
            width: 70,
            height: 70,
            borderRadius: '4px',
            flexShrink: 0,
            objectFit: 'cover',
          }}
          image={article.image}
          alt={article.title}
        />
      </Box>

      {/* 评论预览区 */}
      {article.topComment && (
        <Box
          sx={{
            backgroundColor: 'var(--color-gray-20)',
            padding: '10px 12px',
            borderRadius: '6px',
            marginBottom: '10px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
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
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--color-gray-80)',
              }}
            >
              {article.topComment.author}
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: '13px',
              lineHeight: 1.5,
              color: 'var(--color-gray-70)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              paddingLeft: '10px',
            }}
          >
            {article.topComment.content}
          </Typography>
        </Box>
      )}

      {/* 底部信息栏 */}
      <CardContent
        sx={{
          padding: '0 !important',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Typography 
            variant="caption" 
            sx={{ 
              fontSize: '12px', 
              color: 'var(--color-gray-60)',
              fontWeight: 500,
            }}
          >
            {article.source}
          </Typography>
          <Box
            sx={{
              width: '2px',
              height: '2px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-gray-60)',
            }}
          />
          <Typography 
            variant="caption" 
            sx={{ 
              fontSize: '12px', 
              color: 'var(--color-gray-60)',
            }}
          >
            {article.time}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <ChatBubbleOutlineIcon sx={{ fontSize: 16, color: 'var(--color-gray-60)' }} />
          <Typography 
            variant="caption" 
            sx={{ 
              fontSize: '12px', 
              color: 'var(--color-gray-60)',
              fontWeight: 500,
            }}
          >
            {article.comments}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;

