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
        <Box
          width="60px"
          height="60px"
          radius="8px"
          style={{
            flexShrink: 0,
            backgroundImage: `url(${article.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#f0f0f0'
          }}
          alt={article.title}
        />
      </Row>

      {/* 评论预览区 */}
      {article.topComment && (
        <Column
          width="fill"
          fill="var(--color-gray-20)"
          padding="12px"
          radius="8px"
        >
          <Row
            width="fill"
            gap="6px"
          >
            <Box
              width="4px"
              height="4px"
              radius="50%"
              fill="var(--color-gray-60)"
            />
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--color-gray-80)',
              }}
            >
              {article.topComment.author}
            </span>
          </Row>
          <p
            style={{
              fontSize: '13px',
              lineHeight: 1.5,
              color: 'var(--color-gray-70)',
              WebkitLineClamp: 2,
              overflow: 'hidden',
            }}
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
        <Row
          alignment="center-center"
          gap="8px"
        >
          <span
            style={{
              fontSize: '12px',
              color: 'var(--color-gray-60)',
              fontWeight: 500,
            }}
          >
            {article.source}
          </span>
          <Box
            width="2px"
            height="2px"
            radius="50%"
            fill="var(--color-gray-60)"
          />
          <span
            style={{
              fontSize: '12px',
              color: 'var(--color-gray-60)',
            }}
          >
            {article.time}
          </span>
        </Row>
        <Row
          alignment="center-center"
          gap="4px"
        >
          <Box
            style={{
              fontSize: '12px',
              color: 'var(--color-gray-60)',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ChatBubbleOutlineIcon />
          </Box>
          <span
            style={{
              fontSize: '12px',
              color: 'var(--color-gray-60)',
              fontWeight: 500,
            }}
          >
            {article.comments}
          </span>
        </Row>
      </Row>
    </Column>
  );
};

export default ArticleCard;
