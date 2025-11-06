import { useState } from 'react';
import { Box, Typography, InputBase, IconButton } from '@mui/material';
import { Row, Column } from 'figma-react-layout';
import TuneIcon from '@mui/icons-material/Tune';
import BugReportIcon from '@mui/icons-material/BugReport';
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
    console.log('ArticleList 收到新回复:', newReply);

    // 只更新评论数量，保留原始的 topComment 不变
    setArticles(prevArticles =>
      prevArticles.map(article => {
        if (article.id === articleId) {
          return {
            ...article,
            comments: article.comments + 1
            // 不再覆盖 topComment，保留原始评论
          };
        }
        return article;
      })
    );
  };

  return (
    <Column padding="20px">
      {/* 页面标题和模式切换 */}
      <Row
        width="fill"
        distribution="space-between"
        alignment="center-center"
        strokeColor='bottom:#000'
        padding="bottom:16px"
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
          <Column key={timeGroup} marginBottom="32px" gap='0'>
            {/* 时间分组标题 */}
            {/* <Row
              width="fill"
              alignment="center-left"
              padding="top:24px"
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
            </Row>*/}

            {/* 该时间组的文章列表 */}
            <Column>
              {articles.map((article) => (
                <div key={article.id} onClick={() => onArticleClick && onArticleClick(article)}>
                  <ArticleCard
                    article={article}
                    onReplyClick={handleReplyClick}
                  />
                </div>
              ))}
            </Column>
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
