import { useState } from 'react';
import { Typography, IconButton } from '@mui/material';
import { Row, Column } from 'figma-react-layout';
import ArticleCard from '../components/ArticleCard';
import GlobalReplyInput from '../components/GlobalReplyInput';
import ImportDialog from '../components/ImportDialog';
import { mockArticles, groupArticlesByTime, getArticleReplies } from '../data/mockArticles';
import { Add } from '@mui/icons-material';

const ArticleList = ({ onArticleClick, onChangeMode, onShowFigmaTest }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [replyState, setReplyState] = useState({
    isVisible: false,
    article: null,
    replyToComment: null
  });
  const [articles, setArticles] = useState(mockArticles);
  const [refreshKey, setRefreshKey] = useState(0); // 用于强制刷新评论显示

  const groupedArticles = groupArticlesByTime(articles);

  // 处理回复显示
  const handleReplyClick = (article, comment) => {
    setReplyState({
      isVisible: true,
      article,
      replyToComment: comment
    });
  };

  // 关闭回复输入框
  const handleCloseReply = () => {
    setReplyState({
      isVisible: false,
      article: null,
      replyToComment: null
    });
  };

  // 处理回复成功
  const handleReplyAdded = (articleId, newReply) => {
    // 更新评论数量
    setArticles(prevArticles =>
      prevArticles.map(article => {
        if (article.id === articleId) {
          return {
            ...article,
            comments: article.comments + 1
          };
        }
        return article;
      })
    );

    // 强制刷新评论显示
    setRefreshKey(prev => prev + 1);
  };

  return (
    <Column padding="x:20px y:12px">
      {/* 页面标题和模式切换 */}
      <Row
        width="fill"
        distribution="space-between"
        alignment="center-center"
        strokeColor='bottom:#000'
        padding="bottom:12px"
      >
        <Typography
          variant="h5"
          sx={{
            fontSize: '20px',
            fontWeight: 600,
          }}
          className="text-gray-100"
        >
          Puzle Read
        </Typography>
        <IconButton
          onClick={onChangeMode}
          className="icon-button"
          sx={{
            borderRadius: '8px',
          }}
        >
          <Add sx={{ fontSize: 20 }} />
        </IconButton>
      </Row>

      {/* 文章列表 - 按时间分组 */}
      {Object.entries(groupedArticles).map(([timeGroup, articles]) => {
        if (articles.length === 0) return null;

        return (
          <Column width='fill' key={timeGroup}>
            {articles.map((article) => (
              <ArticleCard
                article={article}
                onReplyClick={handleReplyClick}
                refreshKey={refreshKey}
                key={article.id}
                onClick={() => onArticleClick && onArticleClick(article)}
              />
            ))}
          </Column>
        );
      })}

      {/* 导入对话框 */}
      <ImportDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />

      {/* 全局回复输入框 */}
      <GlobalReplyInput
        isVisible={replyState.isVisible}
        article={replyState.article}
        replyToComment={replyState.replyToComment}
        onClose={handleCloseReply}
        onReplyAdded={handleReplyAdded}
      />
    </Column>
  );
};

export default ArticleList;
