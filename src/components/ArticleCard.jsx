import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const ArticleCard = ({ article }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        marginBottom: '16px',
        boxShadow: 'none',
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'var(--color-gray-20)',
        }
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: 100,
          height: 100,
          borderRadius: '4px',
          border: '1px solid var(--color-gray-40)',
          flexShrink: 0,
        }}
        image={article.image}
        alt={article.title}
      />
      <CardContent
        sx={{
          flex: 1,
          padding: '0 0 0 12px !important',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: '15px',
            fontWeight: 500,
            lineHeight: 1.4,
            color: 'var(--color-gray-100)',
            marginBottom: '8px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {article.title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', gap: '8px', fontSize: '12px', color: 'var(--color-gray-60)' }}>
            <Typography variant="caption" sx={{ fontSize: '12px', color: 'var(--color-gray-60)' }}>
              {article.source}
            </Typography>
            <Typography variant="caption" sx={{ fontSize: '12px', color: 'var(--color-gray-60)' }}>
              {article.time}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ChatBubbleOutlineIcon sx={{ fontSize: 14, color: 'var(--color-gray-60)' }} />
            <Typography variant="caption" sx={{ fontSize: '12px', color: 'var(--color-gray-60)' }}>
              {article.comments}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;

