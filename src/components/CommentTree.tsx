import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ThumbsUp, MoreHorizontal, Trash2 } from 'lucide-react';
import type { Comment } from '@/data/mockArticles';

interface CommentTreeProps {
  comments: Comment[];
  onReply: (parentId: string, content: string) => void;
  onReplyClick: (commentId: string, commentAuthor: string) => void;
  onVote: (commentId: string, direction: 'up' | 'down') => void;
  onDelete: (commentId: string) => void;
  articleId: string;
}

interface CommentItemProps {
  comment: Comment;
  onReply: (parentId: string, content: string) => void;
  onReplyClick: (commentId: string, commentAuthor: string) => void;
  onVote: (commentId: string, direction: 'up' | 'down') => void;
  onDelete: (commentId: string) => void;
  showThreadLine?: boolean;
  articleId: string;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onReply,
  onReplyClick,
  onVote,
  onDelete,
  showThreadLine = false,
  articleId
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [showNested, setShowNested] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
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
      <div
        className="flex gap-3 py-3 bg-white cursor-pointer hover:bg-gray-50 transition-colors"
        style={{ marginLeft: `${depth > 0 ? '12px' : '0'}` }}
        onClick={() => onReplyClick(comment.id, comment.author)}
      >
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
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowMenu(!showMenu)
                  }}
                >
                  <MoreHorizontal className="h-3.5 w-3.5" />
                </Button>

                {/* 下拉菜单 */}
                {showMenu && (
                  <div className="absolute left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-md z-10 min-w-max">
                    {/* 删除选项 */}
                    <button
                      className="w-full px-3 py-2 text-left text-sm text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMenu(false);
                        setShowDeleteDialog(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4 shrink-0" />
                      <span>删除</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 右侧操作按钮 - 点赞和回复 */}
            <div className="flex items-center gap-0">
              {/* 只在Puzle的内容时显示点赞按钮 */}
              {comment.author === "Puzle" && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 px-0.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  onClick={() => onVote(comment.id, 'up')}
                  title={comment.voteStatus === 'up' ? '取消赞' : '赞'}
                >
                  {comment.voteStatus === 'up' ? (
                    <ThumbsUp className="h-2.5 w-2.5 fill-blue-600 text-blue-600" />
                  ) : (
                    <ThumbsUp className="h-2.5 w-2.5" />
                  )}
                </Button>
              )}

              {/* 回复按钮 - 最右边 */}
              <Button
                variant="ghost"
                size="sm"
                className="h-5 px-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 text-xs"
                onClick={(e) => {
                  e.stopPropagation()
                  onReplyClick(comment.id, comment.author)
                }}
              >
                回复
              </Button>
            </div>
          </div>

          {/* 评论文本 */}
          <div className="text-sm text-gray-700 leading-relaxed mb-2 whitespace-pre-wrap">
            {comment.content}
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
              onReplyClick={onReplyClick}
              onVote={onVote}
              onDelete={onDelete}
              showThreadLine={true}
              articleId={articleId}
            />
          ))}
        </div>
      )}

      {/* 删除确认对话框 */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogTitle>删除评论</AlertDialogTitle>
          <AlertDialogDescription>
            确定要删除这条评论吗？此操作无法撤销。
          </AlertDialogDescription>
          <div className="flex gap-3 justify-end mt-4">
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onDelete(comment.id);
                setShowDeleteDialog(false);
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              删除
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export const CommentTree: React.FC<CommentTreeProps> = ({
  comments,
  onReply,
  onReplyClick,
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
          onReplyClick={onReplyClick}
          onVote={onVote}
          onDelete={onDelete}
          articleId={articleId}
        />
      ))}
    </div>
  );
};
