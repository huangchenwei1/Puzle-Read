import { useState, useEffect } from 'react';
import { Row, Column } from 'figma-react-layout';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { getArticleReplies } from '../data/mockArticles';
import { getArticleComments } from '../data/mockComments';

const ArticleCard = ({ article, onReplyClick, refreshKey, onClick }) => {
  const [allComments, setAllComments] = useState([]);

  // 响应式获取评论数据
  useEffect(() => {
    console.log('🔄 ArticleCard 获取评论数据，refreshKey:', refreshKey);

    const userReplies = getArticleReplies(article.id);
    const comments = userReplies.length > 0 ? userReplies : getArticleComments(article.id);

    console.log('- 文章ID:', article.id);
    console.log('- 用户回复数:', userReplies.length);
    console.log('- 静态评论数:', getArticleComments(article.id).length);
    console.log('- 使用数据源:', userReplies.length > 0 ? '用户回复数据' : '静态mock数据');
    console.log('- 最终评论数据:', comments);

    setAllComments(comments);
  }, [article.id, refreshKey]);

  // 递归扁平化评论数据
  const flattenComments = (comments) => {
    const flat = [];
    comments.forEach(comment => {
      flat.push(comment);
      if (comment.replies && comment.replies.length > 0) {
        flat.push(...flattenComments(comment.replies));
      }
    });
    return flat;
  };

  const flattenedComments = flattenComments(allComments);

  console.log('📊 ArticleCard 最终数据');
  console.log('- 评论数量:', allComments.length);
  console.log('- 扁平化后数量:', flattenedComments.length);
  console.log('- 评论数据样本:', flattenedComments.slice(0, 2));

  // 处理点击评论区域
  const handleCommentClick = (comment, event) => {
    console.log('🔍 评论点击事件触发');
    event.stopPropagation(); // 阻止事件冒泡，防止触发文章点击
    if (onReplyClick) {
      onReplyClick(article, comment);
    }
  };

  // 处理评论预览区域点击（不点击具体评论时）
  const handleCommentAreaClick = (event) => {
    console.log('🔍 评论预览区域点击事件触发');
    event.stopPropagation(); // 阻止事件冒泡，防止触发文章点击
    // 评论区域不进行页面导航，只处理具体评论的回复点击
    console.log('📝 评论区域点击被阻止，不会触发页面导航 - 已验证修复');
  };

  // 处理点击文章卡片
  const handleArticleClick = () => {
    console.log('🔍 文章卡片点击事件触发');
    console.log('- 点击的文章:', article.title);
    console.log('- 传递的article对象:', article);

    if (onClick) {
      onClick(article);
    }
  };

  // 处理点击标题区域
  const handleTitleClick = (event) => {
    console.log('🔍 标题区域点击事件触发');
    event.stopPropagation(); // 阻止事件冒泡，但直接调用文章点击
    handleArticleClick();
  };

  // 处理点击图片区域
  const handleImageClick = (event) => {
    console.log('🔍 图片区域点击事件触发');
    event.stopPropagation(); // 阻止事件冒泡，但直接调用文章点击
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
                  margin: index > 0 ? '8px 0 0 0' : 0,
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
