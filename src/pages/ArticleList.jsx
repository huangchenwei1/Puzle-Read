import { useState } from 'react';
import { Box, Typography, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ArticleCard from '../components/ArticleCard';
import ImportDialog from '../components/ImportDialog';
import { mockArticles, groupArticlesByTime } from '../data/mockArticles';

const ArticleList = ({ onArticleClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const groupedArticles = groupArticlesByTime(mockArticles);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-gray-0)',
        padding: '20px',
      }}
    >
      {/* 页面标题 */}
      <Typography
        variant="h5"
        sx={{
          fontSize: '24px',
          fontWeight: 600,
          color: 'var(--color-gray-100)',
          marginBottom: '20px',
        }}
      >
        文章列表
      </Typography>

      {/* 搜索框和添加按钮 */}
      <Box
        sx={{
          display: 'flex',
          gap: '12px',
          marginBottom: '24px',
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            border: '1px solid var(--color-gray-40)',
            borderRadius: '4px',
            padding: '8px 12px',
            backgroundColor: 'var(--color-gray-0)',
          }}
        >
          <SearchIcon sx={{ color: 'var(--color-gray-60)', marginRight: '8px', fontSize: 20 }} />
          <InputBase
            placeholder="搜索文章"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              flex: 1,
              fontSize: '14px',
              color: 'var(--color-gray-100)',
              '& input::placeholder': {
                color: 'var(--color-gray-60)',
                opacity: 1,
              },
            }}
          />
        </Box>
        <IconButton
          onClick={() => setDialogOpen(true)}
          sx={{
            border: '1px solid var(--color-gray-40)',
            borderRadius: '4px',
            padding: '8px',
            color: 'var(--color-gray-100)',
            '&:hover': {
              backgroundColor: 'var(--color-gray-20)',
            },
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      {/* 文章列表 - 按时间分组 */}
      {Object.entries(groupedArticles).map(([timeGroup, articles]) => {
        if (articles.length === 0) return null;
        
        return (
          <Box key={timeGroup} sx={{ marginBottom: '32px' }}>
            {/* 时间分组标题 */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '16px',
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--color-gray-60)',
                  marginRight: '12px',
                }}
              >
                {timeGroup}
              </Typography>
              <Box
                sx={{
                  flex: 1,
                  height: '1px',
                  backgroundColor: 'var(--color-gray-40)',
                }}
              />
            </Box>

            {/* 该时间组的文章列表 */}
            <Box>
              {articles.map((article) => (
                <Box key={article.id} onClick={() => onArticleClick && onArticleClick(article)}>
                  <ArticleCard article={article} />
                </Box>
              ))}
            </Box>
          </Box>
        );
      })}

      {/* 导入对话框 */}
      <ImportDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </Box>
  );
};

export default ArticleList;

