import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ChevronDown, ChevronUp, MessageSquare, ThumbsUp, ThumbsDown, MoreHorizontal } from 'lucide-react';
import type { Comment } from '@/data/mockArticles';

interface CommentTreeProps {
  comments: Comment[];
  onReply: (parentId: string, content: string) => void;
  onVote: (commentId: string, direction: 'up' | 'down') => void;
  articleId: string;
}

interface CommentItemProps {
  comment: Comment;
  onReply: (parentId: string, content: string) => void;
  onVote: (commentId: string, direction: 'up' | 'down') => void;
  showThreadLine?: boolean;
  articleId: string;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onReply,
  onVote,
  showThreadLine = false,
  articleId
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [showNested, setShowNested] = useState(true);

  const handleReplySubmit = () => {
    if (replyContent.trim()) {
      onReply(comment.id, replyContent.trim());
      setReplyContent('');
      setIsReplying(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleReplySubmit();
    }
  };

  const depth = comment.depth || 0;
  const maxDepth = 8; // 最大缩进深度
  const indentLeft = Math.min(depth, maxDepth) * 16; // 16px 每层缩进

  // 递归计数所有子评论数量
  const getTotalReplies = (comment: Comment): number => {
    if (!comment.replies || comment.replies.length === 0) return 0;
    return comment.replies.length + comment.replies.reduce((sum, reply) => sum + getTotalReplies(reply), 0);
  };

  const totalReplies = getTotalReplies(comment);

  // 处理投票按钮点击
  const handleVoteClick = (direction: 'up' | 'down') => {
    const newVoteStatus = comment.voteStatus === direction ? null : direction;
    // 这里需要更新 comment.voteStatus，但由于是 props，实际更新应该通过父组件处理
    onVote(comment.id, direction);
  };


  return (
    <div
      className="relative"
      style={{ marginLeft: `${indentLeft}px` }}
    >
      {/* 线程线 */}
      {showThreadLine && depth > 0 && (
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-2" />
      )}

      {/* 评论主体 */}
      <div className="flex gap-2 py-2 bg-white rounded-lg">
        {/* 评论内容 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {/* 头像 */}
            <Avatar className="h-6 w-6">
              <AvatarFallback
                className={
                  comment.author === "Puzle"
                    ? "bg-blue-500 text-white text-xs"
                    : "bg-gray-500 text-white text-xs"
                }
              >
                {comment.author === "Puzle" ? "P" : comment.author.slice(0, 1)}
              </AvatarFallback>
            </Avatar>

            {/* 用户名 */}
            <span
              className={`text-sm font-medium ${
                comment.author === "Puzle" ? "text-blue-600" : "text-gray-900"
              }`}
            >
              {comment.author}
            </span>

            {/* 时间 */}
            <span className="text-xs text-gray-400">{comment.time}</span>

            {/* 评分 */}
            <span className="text-xs text-gray-400">
              {comment.score !== undefined && comment.score >= 0 && `+${comment.score}`}
            </span>
          </div>

          {/* 评论文本 */}
          <div className="text-sm text-gray-700 leading-relaxed mb-2 whitespace-pre-wrap">
            {comment.content}
          </div>

          {/* 操作按钮和投票区域 */}
          <div className="flex items-center gap-4 text-xs">
            {/* 状态1：无操作，显示赞和踩两按钮 */}
            {comment.voteStatus === null && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-gray-100"
                  onClick={() => onVote(comment.id, 'up')}
                >
                  <ThumbsUp className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-gray-100"
                  onClick={() => onVote(comment.id, 'down')}
                >
                  <ThumbsDown className="h-3 w-3" />
                </Button>
                <span className="text-gray-300">|</span>
              </>
            )}

            {/* 状态2：已赞，只显示已赞的按钮 */}
            {comment.voteStatus === 'up' && (
              <>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 bg-blue-100 text-blue-600 hover:bg-blue-200"
                    onClick={() => onVote(comment.id, 'up')}
                  >
                    <ThumbsUp className="h-3 w-3" />
                  </Button>
                  <span className="text-xs text-blue-600">已赞</span>
                </div>
                <span className="text-gray-300">|</span>
              </>
            )}

            {/* 状态3：已踩，只显示已踩的按钮 */}
            {comment.voteStatus === 'down' && (
              <>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 bg-red-100 text-red-600 hover:bg-red-200"
                    onClick={() => onVote(comment.id, 'down')}
                  >
                    <ThumbsDown className="h-3 w-3" />
                  </Button>
                  <span className="text-xs text-red-600">已踩</span>
                </div>
                <span className="text-gray-300">|</span>
              </>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-gray-500 hover:text-gray-700"
              onClick={() => setIsReplying(!isReplying)}
            >
              <MessageSquare className="h-3 w-3 mr-1" />
              回复
            </Button>
            {totalReplies > 0 && (
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowNested(!showNested)}
              >
                {showNested ? "收起" : "展开"} {totalReplies} 条回复
              </button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-gray-500 hover:text-gray-700"
            >
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </div>

          {/* 回复输入框 */}
          {isReplying && (
            <div className="mt-3 space-y-2">
              <Input
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="写下你的回复..."
                className="text-sm"
                onKeyDown={handleKeyDown}
                autoFocus
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleReplySubmit}
                  disabled={!replyContent.trim()}
                  className="h-8"
                >
                  回复
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsReplying(false);
                    setReplyContent('');
                  }}
                  className="h-8"
                >
                  取消
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 子评论 */}
      {comment.replies && comment.replies.length > 0 && showNested && (
        <div className="mt-2">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onVote={onVote}
              showThreadLine={true}
              articleId={articleId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const CommentTree: React.FC<CommentTreeProps> = ({
  comments,
  onReply,
  onVote,
  articleId
}) => {

  // 对评论按时间排序，可考虑扩展为其他排序方式
  const sortedComments = [...comments].sort((a, b) =>
    new Date(b.time).getTime() - new Date(a.time).getTime()
  );

  return (
    <div className="space-y-1">
      {sortedComments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onReply={onReply}
          onVote={onVote}
          articleId={articleId}
        />
      ))}
    </div>
  );
};