import { useState } from 'react';
import { Box, Typography, InputBase, IconButton } from '@mui/material';
import { Row, Column } from 'figma-react-layout';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import TuneIcon from '@mui/icons-material/Tune';
import BugReportIcon from '@mui/icons-material/BugReport';
import ArticleCard from '../components/ArticleCard';
import ImportDialog from '../components/ImportDialog';
import { mockArticles, groupArticlesByTime } from '../data/mockArticles';

const ArticleList = ({ onArticleClick, onChangeMode, onShowFigmaTest }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const groupedArticles = groupArticlesByTime(mockArticles);

  return (
    <Column
      minHeight="100vh"
      fill="$color-gray-0"
      padding="20px"
    >
      {/* 页面标题和模式切换 */}
      <Row
        width="fill"
        distribution="space-between"
        alignment="center-center"
        marginBottom="20px"
      >
        <Typography
          variant="h5"
          sx={{
            fontSize: '24px',
            fontWeight: 600,
          }}
          className="text-gray-100"
        >
          文章列表
        </Typography>
        <Row>
          <IconButton
            onClick={onChangeMode}
            className="icon-button"
            sx={{
              borderRadius: '8px',
            }}
          >
            <TuneIcon sx={{ fontSize: 20 }} />
          </IconButton>
          <IconButton
            onClick={onShowFigmaTest}
            className="icon-button"
            sx={{
              borderRadius: '8px',
            }}
            title="测试 Figma React 组件"
          >
            <BugReportIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Row>
      </Row>

      {/* 文章列表 - 按时间分组 */}
      {Object.entries(groupedArticles).map(([timeGroup, articles]) => {
        if (articles.length === 0) return null;

        return (
          <Column key={timeGroup} gap="16px" marginBottom="32px">
            {/* 时间分组标题 */}
            <Row
              width="fill"
              alignment="center-left"
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontSize: '13px',
                  fontWeight: 500,
                  marginRight: '12px',
                }}
                className="text-gray-60"
              >
                {timeGroup}
              </Typography>
            </Row>

            {/* 该时间组的文章列表 */}
            <Column gap="16px">
              {articles.map((article) => (
                <div key={article.id} onClick={() => onArticleClick && onArticleClick(article)}>
                  <ArticleCard article={article} />
                </div>
              ))}
            </Column>
          </Column>
        );
      })}

      {/* 导入对话框 */}
      <ImportDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </Column>
  );
};

export default ArticleList;
