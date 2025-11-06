import { Row, Column } from 'figma-react-layout';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { getArticleReplies } from '../data/mockArticles';

const ArticleCard = ({ article, onReplyClick }) => {
  // 获取文章的所有回复
  const allReplies = getArticleReplies(article.id);

  // 处理点击评论区域
  const handleCommentClick = (comment, event) => {
    event.stopPropagation(); // 阻止事件冒泡，防止触发文章点击
    if (onReplyClick) {
      onReplyClick(article, comment);
    }
  };

  return (
    <Column width="fill" gap="16px" padding="y:24px" strokeColor='bottom:#f0f0f0'>
      {/* 上半部分：图片和标题 */}
      <Row
        width="fill"
        distribution="space-between"
        alignment="top-left"
      >
        {/* 左侧文字 */}
        <h3
          style={{
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
        </h3>

        {/* 右侧图片 */}
        <img
          src={article.image}
          alt={article.title}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '8px',
            flexShrink: 0,
            objectFit: 'cover',
            backgroundColor: '#f0f0f0'
          }}
        />
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
      <Column
        width="fill"
        fill="var(--color-gray-10)"
        padding="12px"
        radius="8px"
        alignment="top-left"
        className="comment-preview-container"
      >
        {/* 显示原始评论 */}
        <div
          onClick={(e) => handleCommentClick(article.topComment, e)}
          data-comment-area="true"
          data-comment-id="original"
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
              margin: 0,
              textAlign: 'left',
              width: '100%'
            }}
            className="text-gray-70"
          >
            <span className="text-comment-author">
              {article.topComment.author}：
            </span>
            {article.topComment.content}
          </p>
        </div>

        {/* 显示所有用户回复 */}
        {allReplies.length > 0 && (
          <>
            {allReplies.map((reply, index) => (
              <div
                key={reply.id || index}
                onClick={(e) => handleCommentClick(reply, e)}
                data-comment-area="true"
                data-comment-id={reply.id || index}
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
                    margin: '8px 0 0 0',
                    textAlign: 'left',
                    width: '100%'
                  }}
                  className="text-gray-70"
                >
                  <span className="text-comment-author">
                    {reply.author}回复{reply.author === reply.replyToAuthor ? '我' : reply.replyToAuthor}：
                  </span>
                  {reply.content}
                </p>
              </div>
            ))}
          </>
        )}
      </Column>

      {/* 如果没有原始评论但有用户回复，显示用户回复 */}
      {!article.topComment && allReplies.length > 0 && (
        <Column
          width="fill"
          fill="var(--color-gray-10)"
          padding="12px"
          radius="8px"
          alignment="top-left"
          className="comment-preview-container"
        >
          {/* 显示所有用户回复 */}
          {allReplies.map((reply, index) => (
            <div
              key={reply.id || index}
              onClick={(e) => handleCommentClick(reply, e)}
              data-comment-area="true"
              data-comment-id={reply.id || index}
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
                  margin: index > 0 ? '8px 0 0 0' : 0,
                  textAlign: 'left',
                  width: '100%'
                }}
                className="text-gray-70"
              >
                <span className="text-comment-author">
                  {reply.author}回复{reply.author === reply.replyToAuthor ? '我' : reply.replyToAuthor}：
                </span>
                {reply.content}
              </p>
            </div>
          ))}
        </Column>
      )}
    </Column>
  );
};

export default ArticleCard;
