import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, ThumbsUp, MoreHorizontal, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
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
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showMenu]);

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
  const indentLeft = depth * 12; // 12px 每层缩进（约一个字宽度）

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
      {/* 嵌套回复的细竖线 */}
      {showThreadLine && depth > 0 && (
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200 transform -translate-x-1.5" />
      )}

      {/* 评论主体 */}
      <div className="flex gap-3 py-3 bg-white" style={{ marginLeft: `${depth > 0 ? '12px' : '0'}` }}>
        {/* 评论内容 */}
        <div className="flex-1 min-w-0">
          {/* 作者信息行 */}
          <div className="flex items-center justify-between mb-1 gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs text-gray-400">
                {comment.author}
              </span>

              <span className="text-xs text-gray-400">{comment.time}</span>

              {comment.score !== undefined && comment.score > 0 && (
                <span className="text-xs text-gray-400">+{comment.score}</span>
              )}

              {/* 更多菜单 - 跟在时间后面 */}
              <div className="relative flex items-center" ref={menuRef}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 px-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <MoreHorizontal className="h-3.5 w-3.5" />
                </Button>

                {/* 下拉菜单 */}
                {showMenu && (
                  <div className="absolute left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-md z-10 min-w-max">
                    {/* 删除选项 */}
                    <button
                      className="w-full px-3 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
                      onClick={() => {
                        if (confirm('确定要删除这条评论吗？')) {
                          onDelete(comment.id);
                        }
                        setShowMenu(false);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                      删除
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 右上角展开/收起 */}
            {totalReplies > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-5 px-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 flex items-center gap-1"
                onClick={() => setShowNested(!showNested)}
                title={showNested ? '收起回复' : '展开回复'}
              >
                <span className="text-xs">{totalReplies}条评论</span>
                {showNested ? (
                  <ChevronUp className="h-3.5 w-3.5" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5" />
                )}
              </Button>
            )}
          </div>

          {/* 评论文本 */}
          <div className="text-sm text-gray-700 leading-relaxed mb-2 whitespace-pre-wrap">
            {comment.content}
          </div>

          {/* 操作按钮行 - 左对齐 */}
          <div className="flex items-center gap-2 text-xs -ml-2">
            {/* 回复按钮 */}
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              onClick={() => setIsReplying(!isReplying)}
            >
              <MessageSquare className="h-3 w-3" />
              <span className="ml-1">回复</span>
            </Button>

            {/* 只在Puzle的内容时显示点赞按钮 */}
            {comment.author === "Puzle" && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                onClick={() => onVote(comment.id, 'up')}
                title={comment.voteStatus === 'up' ? '取消赞' : '赞'}
              >
                {comment.voteStatus === 'up' ? (
                  <ThumbsUp className="h-3 w-3 fill-blue-600 text-blue-600" />
                ) : (
                  <ThumbsUp className="h-3 w-3" />
                )}
              </Button>
            )}
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
