import { Box, Row, Column } from 'figma-react-layout';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const ArticleCard = ({ article }) => {
  return (
    <Column width="fill" gap="10px" padding="bottom:12px">
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
            width: '60px',
            height: '60px',
            borderRadius: '8px',
            flexShrink: 0,
            objectFit: 'cover',
            backgroundColor: '#f0f0f0'
          }}
        />
      </Row>

      {/* 评论预览区 */}
      {article.topComment && (
        <Column
          width="fill"
          fill="$color-gray-20"
          padding="12px"
          radius="8px"
          alignment='top-left'
        >
          <span className="text-comment-author">
            {article.topComment.author}：
          </span>
          <p
            style={{
              fontSize: '13px',
              lineHeight: 1.5,
              WebkitLineClamp: 2,
              overflow: 'hidden',
            }}
            className="text-gray-70"
          >
            {article.topComment.content}
          </p>
        </Column>
      )}

      {/* 底部信息栏 */}
      <Row
        width="fill"
        distribution="space-between"
      >
        <Row gap="8px">
          <span className="text-secondary-medium">
            {article.source}
          </span>
          <span className="text-xs text-gray-60">
            •
          </span>
          <time className="text-secondary">
            {article.time}
          </time>
        </Row>
        <Row gap="4px">
          <ChatBubbleOutlineIcon sx={{ fontSize: '12px', color: 'var(--color-gray-60)' }} />
          <span className="text-secondary-medium">
            {article.comments}
          </span>
        </Row>
      </Row>
    </Column>
  );
};

export default ArticleCard;
