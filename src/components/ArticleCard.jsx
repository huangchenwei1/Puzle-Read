import { useMemo } from 'react';
import { Row, Column } from 'figma-react-layout';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { getArticleReplies } from '../data/mockArticles';

const ArticleCard = ({ article, onReplyClick, refreshKey, onClick }) => {
  // 使用 useMemo 缓存评论数据，避免重复计算
  const flattenedComments = useMemo(() => {
    return getArticleReplies(article.id);
  }, [article.id, refreshKey]);

  // 处理点击评论区域
  const handleCommentClick = (comment, event) => {
    event.stopPropagation();
    if (onReplyClick) {
      onReplyClick(article, comment);
    }
  };

  // 处理评论预览区域点击（不点击具体评论时）
  const handleCommentAreaClick = (event) => {
    event.stopPropagation();
    // 评论区域不进行页面导航，只处理具体评论的回复点击
  };

  // 处理点击文章卡片
  const handleArticleClick = () => {
    if (onClick) {
      onClick(article);
    }
  };

  // 处理点击标题区域
  const handleTitleClick = (event) => {
    event.stopPropagation();
    handleArticleClick();
  };

  // 处理点击图片区域
  const handleImageClick = (event) => {
    event.stopPropagation();
    handleArticleClick();
  };

  return (
    <Column
      width="fill"
      gap="16px"
      padding="y:24px"
      strokeColor='bottom:#f0f0f0'
      onClick={handleArticleClick}
      style={{ cursor: 'pointer' }}
    >
      {/* 上半部分：图片和标题 - 可点击区域 */}
      <Row
        width="fill"
        distribution="space-between"
        alignment="top-left"
        style={{ cursor: 'pointer' }}
      >
        {/* 左侧文字 */}
        <h3
          onClick={handleTitleClick}
          style={{
            fontSize: '16px',
            fontWeight: 600,
            lineHeight: 1.5,
            color: 'var(--color-gray-100)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
        >
          {article.title}
        </h3>

        {/* 右侧图片 - 只有当图片存在时才显示 */}
        {article.image && (
          <img
            src={article.image}
            alt={article.title}
            onClick={handleImageClick}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '8px',
              flexShrink: 0,
              objectFit: 'cover',
              backgroundColor: '#f0f0f0',
              cursor: 'pointer',
            }}
          />
        )}
      </Row>

      {/* 信息栏 */}
      <Row
        width="fill"
        distribution="space-between"
      >
        <Row gap="4px">
          <time className="text-secondary">
            {article.time}
          </time>
          <span className="text-xs text-gray-60">
            •
          </span>
          <span className="text-secondary-medium">
            {article.source}
          </span>
        </Row>
        <Row gap="4px">
          <ChatBubbleOutlineIcon sx={{ fontSize: '12px', color: 'var(--color-gray-60)' }} />
          <span className="text-secondary-medium">
            评论
          </span>
        </Row>
      </Row>

      {/* 评论预览区 */}
      {flattenedComments.length > 0 && (
        <Column
          width="fill"
          fill="var(--color-gray-10)"
          padding="12px"
          radius="8px"
          alignment="top-left"
          onClick={handleCommentAreaClick}
          style={{ cursor: 'pointer' }}
        >
          {flattenedComments.map((comment, index) => (
            <div
              key={`comment-${article.id}-${comment.id || index}`}
              onClick={(e) => handleCommentClick(comment, e)}
              data-comment-area="true"
              data-comment-id={comment.id || index}
              style={{
                cursor: 'pointer',
                width: '100%'
              }}
            >
              <p
                style={{
                  fontSize: '13px',
                  lineHeight: 1.5,
                  WebkitLineClamp: 2,
                  overflow: 'hidden',
                  textAlign: 'left',
                  width: '100%'
                }}
                className="text-gray-70"
              >
                <span className="text-comment-author">
                  {comment.author}
                  {comment.replyToAuthor && comment.author !== comment.replyToAuthor && (
                    <>
                      {' '}回复{' '}
                      {comment.replyToAuthor === '我' ? '我' : comment.replyToAuthor}
                      {'：'}
                    </>
                  )}
                  {(!comment.replyToAuthor || comment.author === comment.replyToAuthor) && (
                    '：'
                  )}
                </span>
                {comment.content}
              </p>
            </div>
          ))}
        </Column>
      )}
    </Column>
  );
};

export default ArticleCard;
