import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ArrowLeft,
  MoreVertical,
  Trash2,
  Play,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import type { Article, Comment } from "@/data/mockArticles";
import { mockArticles } from "@/data/mockArticles";
import { CommentTree } from "@/components/CommentTree";

// 递归计算总评论数（包括嵌套回复）
const countTotalComments = (comments?: Comment[]): number => {
  if (!comments || comments.length === 0) return 0;

  let total = comments.length;
  comments.forEach((comment) => {
    if (comment.replies) {
      total += countTotalComments(comment.replies);
    }
  });
  return total;
};

export default function ArticleDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // 找到对应的文章 - 先从 localStorage 查找，再从 mockArticles 查找
  const findArticle = () => {
    const storedArticles = localStorage.getItem("articles");
    if (storedArticles) {
      const parsed = JSON.parse(storedArticles);
      const found = parsed.find((a: Article) => a.id === id);
      if (found) return found;
    }
    return mockArticles.find((a) => a.id === id);
  };

  const article = findArticle();

  // 加载文章的评论
  const initialComments: Comment[] = article?.comments || [];

  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isAddCommentOpen, setIsAddCommentOpen] = useState(false);
  const [replyingTo, setReplyingTo] = useState<{
    id: string;
    author: string;
    content: string;
  } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 递归查找父评论深度
  const getParentDepth = (
    comments: Comment[],
    targetParentId: string,
  ): number => {
    for (const comment of comments) {
      if (comment.id === targetParentId) {
        return comment.depth !== undefined ? comment.depth : 0;
      }
      if (comment.replies && comment.replies.length > 0) {
        const depth = getParentDepth(comment.replies, targetParentId);
        if (depth >= 0) return depth;
      }
    }
    return -1;
  };

  // 递归查找并添加回复到指定评论
  const addReplyToComment = (
    comments: Comment[],
    targetId: string,
    newReply: Comment,
  ): Comment[] => {
    return comments.map((comment) => {
      if (comment.id === targetId) {
        // 找到目标评论，添加回复
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply],
        };
      } else if (comment.replies && comment.replies.length > 0) {
        // 递归查找子回复
        return {
          ...comment,
          replies: addReplyToComment(comment.replies, targetId, newReply),
        };
      }
      return comment;
    });
  };

  // 添加文章讨论评论 (树状结构)
  const handleAddArticleComment = (parentId?: string, content?: string) => {
    const actualContent = content || newComment;
    if (!actualContent?.trim()) return;

    const isReply = !!parentId && !!content;

    let parentDepth = 0;
    if (isReply && parentId) {
      parentDepth = getParentDepth(comments, parentId);
      if (parentDepth === -1) {
        parentDepth = 0;
      }
    }

    const newCommentObj: Comment = {
      id: Date.now().toString(),
      author: "我",
      content: actualContent,
      time: "刚刚",
      score: 0,
      parentId: isReply ? parentId : undefined,
      depth: isReply ? parentDepth + 1 : 0,
    };

    let updatedComments: Comment[];

    if (isReply) {
      updatedComments = addReplyToComment(comments, parentId, newCommentObj);
    } else {
      updatedComments = [...comments, newCommentObj];
    }

    setComments(updatedComments);
    saveCommentsToStorage(updatedComments);

    // 清空状态并退出激活状态
    setNewComment("");
    setIsAddCommentOpen(false);
    setReplyingTo(null);
  };

  // 递归查找评论对象
  const findCommentById = (
    comments: Comment[],
    targetId: string,
  ): Comment | null => {
    for (const comment of comments) {
      if (comment.id === targetId) {
        return comment;
      }
      if (comment.replies && comment.replies.length > 0) {
        const found = findCommentById(comment.replies, targetId);
        if (found) return found;
      }
    }
    return null;
  };

  // 处理回复点击
  const handleReplyClick = (commentId: string, commentAuthor: string) => {
    const targetComment = findCommentById(comments, commentId);
    if (targetComment) {
      setReplyingTo({
        id: commentId,
        author: commentAuthor,
        content: targetComment.content,
      });
      setIsAddCommentOpen(true);
      // 延迟 focus 以确保 DOM 更新完成
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  // 取消回复
  const handleCancelReply = () => {
    setReplyingTo(null);
    setNewComment("");
  };

  // 更新评论投票状态
  const updateCommentVote = (
    commentsList: Comment[],
    commentId: string,
    direction: "up" | "down",
  ): Comment[] => {
    return commentsList.map((comment) => {
      if (comment.id === commentId) {
        const currentVote = comment.voteStatus;
        let newVoteStatus: "up" | "down" | null = direction;

        // 如果点击的是当前已选的按钮，则取消投票
        if (currentVote === direction) {
          newVoteStatus = null;
        }

        return {
          ...comment,
          voteStatus: newVoteStatus,
        };
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: updateCommentVote(comment.replies, commentId, direction),
        };
      }
      return comment;
    });
  };

  // 删除评论
  const deleteComment = (
    commentsList: Comment[],
    commentId: string,
  ): Comment[] => {
    return commentsList
      .filter((comment) => comment.id !== commentId)
      .map((comment) => {
        if (comment.replies && comment.replies.length > 0) {
          return {
            ...comment,
            replies: deleteComment(comment.replies, commentId),
          };
        }
        return comment;
      });
  };

  // 保存评论到 localStorage
  const saveCommentsToStorage = (updatedComments: Comment[]) => {
    if (!id) return;

    const existingArticles = localStorage.getItem("articles");
    const storedArticles = existingArticles ? JSON.parse(existingArticles) : [];
    const articleIndex = storedArticles.findIndex((a: any) => a.id === id);

    if (articleIndex >= 0) {
      storedArticles[articleIndex].comments = updatedComments;
    } else {
      storedArticles.push({
        ...article,
        comments: updatedComments,
      });
    }

    localStorage.setItem("articles", JSON.stringify(storedArticles));
    window.dispatchEvent(new Event("storage"));
  };

  const handleDelete = () => {
    setIsMoreOpen(false);
    if (confirm("确认删除这篇文章吗？")) {
      navigate(-1);
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">文章不存在</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 移动端容器 */}
      <div className="max-w-md mx-auto min-h-screen flex flex-col bg-white">
        {/* 顶部导航 */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 h-14">
          <div className="h-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h3 className="text-lg font-semibold text-gray-900">
                评论
                {comments.length > 0 && (
                  <span className="ml-2 text-gray-400 text-sm font-normal">
                    {countTotalComments(comments)}
                  </span>
                )}
              </h3>
            </div>

            <Popover open={isMoreOpen} onOpenChange={setIsMoreOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2" align="end">
                <div className="flex flex-col gap-1">
                  <Button
                    variant="ghost"
                    className="justify-start h-auto py-3 px-3 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleDelete}
                  >
                    <Trash2 className="h-4 w-4 mr-3" />
                    <span>删除</span>
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </header>

        {/* 文章卡片 - 列表样式 */}
        <div
          className="border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors py-4 px-6"
          onClick={() => navigate(`/article/${id}/source`)}
        >
          {/* 媒体类型卡片 - 顶部小图 */}
          {article.type === "media" && article.imageUrl && (
            <div className="mb-3">
              <div className="w-full overflow-hidden bg-gray-100 relative">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                {/* 视频播放按钮 */}
                {article.mediaType === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-black/60 flex items-center justify-center backdrop-blur-sm">
                      <Play className="w-3 h-3 text-white fill-white ml-0.5" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-between items-start gap-3">
            {/* 左侧：标题和元信息（垂直排列） */}
            <div className="flex-1 min-w-0">
              {/* 标题行 - 标题 + 外链icon（紧跟在标题后） */}
              <h3 className="text-base font-medium text-gray-900 line-clamp-2 mb-1.5">
                {article.title}
                {article.originalUrl && (
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-1 inline align-text-middle" />
                )}
              </h3>

              {/* 元信息行 - 来源 + 发布时间 */}
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <span>{article.source}</span>
                <span>·</span>
                <span>发布于{article.time}</span>
              </div>
            </div>

            {/* 右侧：预览图 */}
            {article.imageUrl && article.type !== "media" && (
              <div className="w-12 h-12 overflow-hidden bg-gray-100 shrink-0 flex-shrink-0">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* 讨论区 */}
        <main className="flex-1 overflow-y-auto pb-24">
          {/* 讨论列表 */}
          <div className="px-6">
            {comments.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-sm">
                <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p>还没有讨论，来发表第一条讨论吧</p>
              </div>
            ) : (
              <CommentTree
                comments={comments}
                onReply={handleAddArticleComment}
                onReplyClick={handleReplyClick}
                onVote={(commentId: string, direction: "up" | "down") => {
                  const updatedComments = updateCommentVote(
                    comments,
                    commentId,
                    direction,
                  );
                  setComments(updatedComments);
                  saveCommentsToStorage(updatedComments);
                }}
                onDelete={(commentId: string) => {
                  const updatedComments = deleteComment(comments, commentId);
                  setComments(updatedComments);
                  saveCommentsToStorage(updatedComments);
                }}
                articleId={id!}
              />
            )}
          </div>
        </main>

        {/* 底部讨论输入框 */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
          <div className="space-y-2">
            {/* 回复状态提示 */}
            {replyingTo && (
              <div className="text-xs text-gray-600 flex items-center justify-between gap-2">
                <span className="truncate">
                  <span className="text-gray-400">回复: </span>
                  <span className="text-gray-700">{replyingTo.content}</span>
                </span>
                <button
                  onClick={handleCancelReply}
                  className="text-gray-400 hover:text-gray-600 shrink-0"
                >
                  ✕
                </button>
              </div>
            )}
            <Input
              ref={inputRef}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={replyingTo ? "写下你的回复..." : "分享你的观点..."}
              className="text-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (replyingTo) {
                    handleAddArticleComment(replyingTo.id, newComment);
                  } else {
                    handleAddArticleComment();
                  }
                }
              }}
              onFocus={() => setIsAddCommentOpen(true)}
            />
            {isAddCommentOpen && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => {
                    if (replyingTo) {
                      handleAddArticleComment(replyingTo.id, newComment);
                    } else {
                      handleAddArticleComment();
                    }
                  }}
                  disabled={!newComment.trim()}
                  className="bg-gray-900 hover:bg-gray-800"
                >
                  发表
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsAddCommentOpen(false);
                    handleCancelReply();
                  }}
                >
                  取消
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
