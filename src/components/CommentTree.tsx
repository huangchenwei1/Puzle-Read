import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, ThumbsUp, ThumbsDown, Trash2 } from 'lucide-react';
import type { Comment } from '@/data/mockArticles';

interface CommentTreeProps {
  comments: Comment[];
  onReply: (parentId: string, content: string) => void;
  onVote: (commentId: string, direction: 'up' | 'down') => void;
  onDelete: (commentId: string) => void;
  articleId: string;
}

interface CommentItemProps {
  comment: Comment;
  onReply: (parentId: string, content: string) => void;
  onVote: (commentId: string, direction: 'up' | 'down') => void;
  onDelete: (commentId: string) => void;
  showThreadLine?: boolean;
  articleId: string;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onReply,
  onVote,
  onDelete,
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
  const indentLeft = depth * 24; // 24px 每层缩进

  // 递归计数所有子评论数量
  const getTotalReplies = (comment: Comment): number => {
    if (!comment.replies || comment.replies.length === 0) return 0;
    return comment.replies.length + comment.replies.reduce((sum, reply) => sum + getTotalReplies(reply), 0);
  };

  const totalReplies = getTotalReplies(comment);

  return (
    <div
      className="relative"
      style={{ marginLeft: `${indentLeft}px` }}
    >
      {/* Reddit 风格的竖线 */}
      {showThreadLine && depth > 0 && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-300 transform -translate-x-3.5" />
      )}

      {/* 评论主体 */}
      <div className="flex gap-3 py-3 bg-white">
        {/* 评论内容 */}
        <div className="flex-1 min-w-0">
          {/* 作者信息 */}
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-sm ${
                comment.author === "Puzle" ? "text-blue-600" : "text-gray-700"
              }`}
            >
              {comment.author}
            </span>

            <span className="text-xs text-gray-400">{comment.time}</span>

            {comment.score !== undefined && comment.score > 0 && (
              <span className="text-xs text-gray-400">+{comment.score}</span>
            )}
          </div>

          {/* 评论文本 */}
          <div className="text-sm text-gray-700 leading-relaxed mb-2 whitespace-pre-wrap">
            {comment.content}
          </div>

          {/* 操作按钮和投票区域 */}
          <div className="flex items-center gap-3 text-xs">
            {/* 只在Puzle的内容时显示投票按钮 */}
            {comment.author === "Puzle" && (
              <>
                {/* 状态1：无操作，显示赞和踩两按钮 */}
                {comment.voteStatus === null && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                      onClick={() => onVote(comment.id, 'up')}
                    >
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      赞
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-gray-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => onVote(comment.id, 'down')}
                    >
                      <ThumbsDown className="h-3 w-3 mr-1" />
                      踩
                    </Button>
                    <span className="text-gray-300">|</span>
                  </>
                )}

                {/* 状态2：已赞，只显示已赞的按钮 */}
                {comment.voteStatus === 'up' && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 bg-blue-50 text-blue-600 hover:bg-blue-100"
                      onClick={() => onVote(comment.id, 'up')}
                    >
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      已赞
                    </Button>
                    <span className="text-gray-300">|</span>
                  </>
                )}

                {/* 状态3：已踩，只显示已踩的按钮 */}
                {comment.voteStatus === 'down' && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 bg-red-50 text-red-600 hover:bg-red-100"
                      onClick={() => onVote(comment.id, 'down')}
                    >
                      <ThumbsDown className="h-3 w-3 mr-1" />
                      已踩
                    </Button>
                    <span className="text-gray-300">|</span>
                  </>
                )}
              </>
            )}

            {/* 回复按钮 */}
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              onClick={() => setIsReplying(!isReplying)}
            >
              <MessageSquare className="h-3 w-3 mr-1" />
              回复
            </Button>

            {/* 展开/收起回复 */}
            {totalReplies > 0 && (
              <button
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 px-2 py-1 rounded"
                onClick={() => setShowNested(!showNested)}
              >
                {showNested ? "收起" : "展开"} {totalReplies}
              </button>
            )}

            {/* 删除按钮 */}
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-gray-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => {
                if (confirm('确定要删除这条评论吗？')) {
                  onDelete(comment.id);
                }
              }}
            >
              <Trash2 className="h-3 w-3 mr-1" />
              删除
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
        <div className="mt-0">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onVote={onVote}
              onDelete={onDelete}
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
  onDelete,
  articleId
}) => {

  // 对评论按时间排序，可考虑扩展为其他排序方式
  const sortedComments = [...comments].sort((a, b) =>
    new Date(b.time).getTime() - new Date(a.time).getTime()
  );

  return (
    <div className="space-y-0">
      {sortedComments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onReply={onReply}
          onVote={onVote}
          onDelete={onDelete}
          articleId={articleId}
        />
      ))}
    </div>
  );
};
