import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, MoreHorizontal, MessageCircle, X, Plus } from "lucide-react";
import { mockArticles } from "@/data/mockArticles";
import type { Comment } from "@/data/mockArticles";
import { CommentTree } from "@/components/CommentTree";

// 段落评论类型
interface ParagraphComment {
  id: string;
  author: string;
  content: string;
  time: string;
}

// 段落数据类型
interface Paragraph {
  id: string;
  content: string;
  comments: ParagraphComment[];
}

export default function ArticleSource() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [selectedParagraph, setSelectedParagraph] = useState<string | null>(
    null,
  );
  const [newComment, setNewComment] = useState("");
  const [paragraphs, setParagraphs] = useState<Paragraph[]>([]);
  const [highlightedParagraph, setHighlightedParagraph] = useState<
    string | null
  >(null);
  const [isCommentBarExpanded, setIsCommentBarExpanded] = useState(false);
  const commentBarRef = useRef<HTMLDivElement>(null);

  // 文章评论状态
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [isAddCommentOpen, setIsAddCommentOpen] = useState(false);

  // 更新评论评分
  const updateCommentScore = (commentsList: Comment[], commentId: string, direction: 'up' | 'down'): Comment[] => {
    return commentsList.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          score: (comment.score || 0) + (direction === 'up' ? 1 : -1)
        };
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: updateCommentScore(comment.replies, commentId, direction)
        };
      }
      return comment;
    });
  };

  const deleteComment = (commentsList: Comment[], commentId: string): Comment[] => {
    return commentsList
      .filter(comment => comment.id !== commentId)
      .map(comment => {
        if (comment.replies && comment.replies.length > 0) {
          return {
            ...comment,
            replies: deleteComment(comment.replies, commentId)
          }
        }
        return comment
      })
  }

  // 保存评论到 localStorage
  const saveCommentsToStorage = (updatedComments: Comment[]) => {
    if (!id) return;

    const existingArticles = localStorage.getItem("articles");
    const storedArticles = existingArticles ? JSON.parse(existingArticles) : [];
    const articleIndex = storedArticles.findIndex((a: any) => a.id === id);

    if (articleIndex >= 0) {
      storedArticles[articleIndex].comments = updatedComments;
    } else {
      // 如果没找到文章，可能是 mock 数据，保存为新文章
      storedArticles.push({
        ...article,
        comments: updatedComments
      });
    }

    localStorage.setItem("articles", JSON.stringify(storedArticles));

    // 触发 storage 事件
    window.dispatchEvent(new Event("storage"));
  };

  // 找到对应的文章
  const findArticle = () => {
    const storedArticles = localStorage.getItem("articles");
    if (storedArticles) {
      const parsed = JSON.parse(storedArticles);
      const found = parsed.find((a: any) => a.id === id);
      if (found) return found;
    }
    return mockArticles.find((a) => a.id === id);
  };

  const article = useMemo(() => findArticle(), [id]);

  // 初始化段落数据和文章评论
  useEffect(() => {
    if (article && id) {
      // 将文章内容拆分为段落
      const contentParagraphs = [
        "在当今快速发展的技术环境中，我们看到了前所未有的创新和变革。这些变化不仅影响着技术本身，更深刻地改变着我们的工作方式和生活方式。",
        "对于个人而言，保持学习和适应能力变得越来越重要。我们需要不断更新自己的知识体系，才能在这个快速变化的时代保持竞争力。",
        "同时，技术的发展也带来了新的机遇。通过合理利用这些工具和平台，我们能够创造出更多的价值，实现个人和职业的成长。",
        "技术的真正价值在于它如何帮助人们解决实际问题，创造更美好的生活。",
        "展望未来，我们有理由相信，随着技术的不断进步和应用的深入，会有更多令人兴奋的可能性等待我们去探索和实现。",
      ];

      // 尝试从 localStorage 加载已有的评论数据
      const storageKey = `article-${id}-paragraph-comments`;
      const savedComments = localStorage.getItem(storageKey);

      let initialParagraphs: Paragraph[];

      if (savedComments) {
        // 如果有保存的数据，使用保存的数据
        initialParagraphs = JSON.parse(savedComments);
      } else {
        // 创建新的段落数据
        initialParagraphs = contentParagraphs.map((content, index) => ({
          id: `p-${index}`,
          content,
          comments: [],
        }));

        // 将文章讨论区中的引用式评论关联到对应的段落
        if (article.comments && article.comments.length > 0) {
          // 递归查找所有包含 quotedText 的评论
          const findQuotedComments = (comments: any[]): any[] => {
            let result: any[] = [];
            for (const comment of comments) {
              if (comment.quotedText) {
                result.push(comment);
              }
              if (comment.replies && comment.replies.length > 0) {
                result = result.concat(findQuotedComments(comment.replies));
              }
            }
            return result;
          };

          const quotedComments = findQuotedComments(article.comments);

          // 将引用评论匹配到段落
          quotedComments.forEach((comment) => {
            const matchedParagraph = initialParagraphs.find(
              (p) =>
                p.content.includes(comment.quotedText) ||
                comment.quotedText.includes(p.content),
            );

            if (matchedParagraph) {
              // 添加评论到段落
              const paragraphComment: ParagraphComment = {
                id: comment.id,
                author: comment.author,
                content: comment.content,
                time: comment.time,
              };
              matchedParagraph.comments.push(paragraphComment);
            }
          });
        }
      }

      setParagraphs(initialParagraphs);

      // 加载文章评论 (排除引用式评论)
      const storedArticles = localStorage.getItem("articles");
      if (storedArticles) {
        const parsed = JSON.parse(storedArticles);
        const foundArticle = parsed.find((a: any) => a.id === id);
        if (foundArticle && foundArticle.comments) {
          const articleComments = foundArticle.comments.filter((c: Comment) => !c.quotedText);
          setComments(articleComments);
        }
      } else {
        setComments(article?.comments?.filter((c: Comment) => !c.quotedText) || []);
      }

      // 监听 storage 事件
      const handleStorageChange = () => {
        const updatedArticles = localStorage.getItem("articles");
        if (updatedArticles) {
          const parsed = JSON.parse(updatedArticles);
          const foundArticle = parsed.find((a: any) => a.id === id);
          if (foundArticle && foundArticle.comments) {
            const articleComments = foundArticle.comments.filter((c: Comment) => !c.quotedText);
            setComments(articleComments);
          }
        }
      };

      window.addEventListener("storage", handleStorageChange);
      return () => window.removeEventListener("storage", handleStorageChange);
    }
  }, [article, id]);

  // 模拟页面加载
  useEffect(() => {
    // 快速加载到70%
    const timer1 = setTimeout(() => setProgress(70), 100);
    // 然后慢慢加载到95%
    const timer2 = setTimeout(() => setProgress(95), 400);
    // 最后完成加载
    const timer3 = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setLoading(false), 200);
    }, 800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // 处理段落点击
  const handleParagraphClick = (paragraphId: string) => {
    setSelectedParagraph(paragraphId);
    setHighlightedParagraph(paragraphId);
    setIsCommentBarExpanded(true);

    // 高亮效果持续2秒
    setTimeout(() => {
      setHighlightedParagraph(null);
    }, 2000);

    // 滚动到评论区
    setTimeout(() => {
      commentBarRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 100);
  };

  // 添加段落评论
  const handleAddComment = () => {
    if (!newComment.trim() || !selectedParagraph || !id) return;

    const newCommentObj: ParagraphComment = {
      id: Date.now().toString(),
      author: "我",
      content: newComment,
      time: "刚刚",
    };

    const updatedParagraphs = paragraphs.map((p) =>
      p.id === selectedParagraph
        ? { ...p, comments: [...p.comments, newCommentObj] }
        : p,
    );

    setParagraphs(updatedParagraphs);

    // 保存段落评论到 localStorage
    const storageKey = `article-${id}-paragraph-comments`;
    localStorage.setItem(storageKey, JSON.stringify(updatedParagraphs));

    setNewComment("");

    // 评论成功后关闭评论栏
    setTimeout(() => {
      setIsCommentBarExpanded(false);
      setSelectedParagraph(null);
    }, 500);
  };

  // 递归添加回复到评论树中
  const addReplyToCommentTree = (comments: Comment[], parentId: string, reply: Comment): Comment[] => {
    return comments.map(comment => {
      if (comment.id === parentId) {
        // 找到父评论，添加回复
        return {
          ...comment,
          replies: [
            ...(comment.replies || []),
            reply // reply 已经包含正确的 depth
          ]
        };
      } else if (comment.replies && comment.replies.length > 0) {
        // 递归查找子评论中的父评论
        return {
          ...comment,
          replies: addReplyToCommentTree(comment.replies, parentId, reply)
        };
      }
      return comment;
    });
  };

  // 添加文章讨论评论 (树状结构)
  const handleAddArticleComment = (parentId?: string, content?: string) => {
    const actualContent = content || commentText;
    if (!actualContent?.trim()) return;

    const isReply = !!parentId && !!content;

    // 如果是回复，需要先找到父评论的深度
    const getParentDepth = (comments: Comment[], targetParentId: string): number => {
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

    let parentDepth = 0;
    if (isReply && parentId) {
      // 先从当前状态中找
      parentDepth = getParentDepth(comments, parentId);

      // 如果没找到，从 localStorage 中找
      if (parentDepth === -1) {
        const storedArticles = localStorage.getItem("articles");
        if (storedArticles) {
          const parsed = JSON.parse(storedArticles);
          const foundArticle = parsed.find((a: any) => a.id === id);
          if (foundArticle && foundArticle.comments) {
            parentDepth = getParentDepth(foundArticle.comments, parentId);
          }
        }
      }

      // 如果还是没找到，设为 0
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
      depth: isReply ? parentDepth + 1 : 0, // 回复的深度为父评论深度+1
    };

    // 从 localStorage 读取文章数据
    const existingArticles = localStorage.getItem("articles");
    const storedArticles = existingArticles ? JSON.parse(existingArticles) : [];

    let updatedComments: Comment[];

    if (isReply) {
      // 为现有评论添加回复 - 使用当前state而不是storage中的数据
      updatedComments = addReplyToCommentTree(
        comments,  // 使用当前state
        parentId,
        newCommentObj
      );

      // 更新storage
      const articleIndex = storedArticles.findIndex((a: any) => a.id === id);
      if (articleIndex >= 0) {
        storedArticles[articleIndex].comments = updatedComments;
      } else {
        storedArticles.push({
          ...article,
          comments: updatedComments
        });
      }
    } else {
      // 添加根评论
      const articleIndex = storedArticles.findIndex((a: any) => a.id === id);
      if (articleIndex >= 0) {
        updatedComments = [
          ...(storedArticles[articleIndex].comments || []),
          newCommentObj
        ];
        storedArticles[articleIndex].comments = updatedComments;
      } else {
        updatedComments = [newCommentObj];
        storedArticles.push({
          ...article,
          comments: updatedComments
        });
      }
    }

    // 保存更新后的文章数据
    localStorage.setItem("articles", JSON.stringify(storedArticles));

    // 更新本地状态
    setComments(updatedComments);

    if (!isReply) {
      setCommentText("");
      setIsAddCommentOpen(false);
    }

    // 触发 storage 事件以通知其他页面更新
    window.dispatchEvent(new Event("storage"));
  };

  // 关闭评论栏
  const handleCloseCommentBar = () => {
    setIsCommentBarExpanded(false);
    setSelectedParagraph(null);
  };

  // 获取当前选中段落
  const currentParagraph = paragraphs.find((p) => p.id === selectedParagraph);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">文章不存在</p>
      </div>
    );
  }

  // 加载状态
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-md mx-auto min-h-screen flex flex-col bg-white">
          {/* 加载进度条 */}
          <div className="fixed top-0 left-0 right-0 z-50">
            <div
              className="h-0.5 bg-blue-600 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* 顶部导航栏（加载时也显示） */}
          <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <span className="text-sm text-gray-600">{article.source}</span>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-gray-900"
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </header>

          {/* 骨架屏 */}
          <div className="flex-1 px-6 pt-6 pb-4 animate-pulse">
            {/* 标题骨架 */}
            <div className="space-y-3 mb-4">
              <div className="h-7 bg-gray-200 rounded w-4/5"></div>
              <div className="h-7 bg-gray-200 rounded w-3/4"></div>
            </div>
            {/* 信息骨架 */}
            <div className="flex items-center justify-between mb-4">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
            {/* 分割线 */}
            <div className="h-px bg-gray-200 my-6"></div>
            {/* 图片骨架 */}
            {article.imageUrl && (
              <div className="h-48 bg-gray-200 rounded-lg mb-6"></div>
            )}
            {/* 内容骨架 */}
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 移动端容器 */}
      <div className="max-w-md mx-auto min-h-screen flex flex-col bg-white">
        {/* 顶部导航栏 */}
        <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <span className="text-sm text-gray-600">{article.source}</span>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-gray-900"
          >
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </header>

        {/* 文章内容区 */}
        <main className="flex-1 overflow-y-auto">
          {/* 文章头部 */}
          <div className="px-6 pt-6 pb-4">
            <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-4">
              {article.title}
            </h1>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{article.source}</span>
              <span>{article.time}</span>
            </div>
          </div>

          {/* 分割线 */}
          <div className="border-t border-gray-100 mx-6"></div>

          {/* 文章正文 */}
          <article className="px-6">
            {/* 如果有图片，显示题图 */}
            {article.imageUrl && (
              <div className="mb-6">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full rounded-lg"
                />
              </div>
            )}

            {/* 文章内容 - 可点击的段落 */}
            <div className="prose prose-gray max-w-none">
              {paragraphs.map((paragraph, index) => (
                <div key={paragraph.id} className="relative mb-4 group">
                  {index === 3 ? (
                    /* 引用块样式 */
                    <blockquote
                      onClick={() => handleParagraphClick(paragraph.id)}
                      className={`
                        border-l-4 pl-4 py-2 rounded-r cursor-pointer
                        transition-all duration-200
                        ${
                          paragraph.comments.length > 0
                            ? "border-blue-500 bg-yellow-50 border-b-2 border-b-yellow-400"
                            : "border-blue-500 bg-gray-50"
                        }
                        ${highlightedParagraph === paragraph.id ? "bg-blue-50 ring-2 ring-blue-200" : "hover:bg-gray-100"}
                      `}
                    >
                      <p className="text-gray-700 italic text-base leading-relaxed">
                        "{paragraph.content}"
                      </p>
                    </blockquote>
                  ) : (
                    /* 普通段落 */
                    <p
                      onClick={() => handleParagraphClick(paragraph.id)}
                      className={`
                        text-base leading-relaxed text-gray-800 cursor-pointer rounded-md px-2 py-1 -mx-2
                        transition-all duration-200 relative
                        ${
                          paragraph.comments.length > 0
                            ? "bg-yellow-50 border-b-2 border-b-yellow-400"
                            : ""
                        }
                        ${highlightedParagraph === paragraph.id ? "bg-blue-50 ring-2 ring-blue-200" : "hover:bg-gray-50"}
                      `}
                    >
                      {paragraph.content}
                    </p>
                  )}

                  {/* 评论数量标识 */}
                  {paragraph.comments.length > 0 && (
                    <div className="absolute -right-2 top-0 flex items-center gap-1 text-xs text-yellow-700 bg-yellow-100 border border-yellow-300 rounded-full px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                      <MessageCircle className="w-3 h-3" />
                      <span>{paragraph.comments.length}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </article>

          {/* 讨论区 */}
          <div className="px-6 pt-8 pb-4">
            <div className="flex items-center gap-3 mb-6">
              <MessageCircle className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">讨论 ({comments.length})</h2>
            </div>

            {/* 根评论输入框 - 固定位置 */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback className="bg-gray-500 text-white text-sm">
                    我
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  {isAddCommentOpen ? (
                    <div className="space-y-3">
                      <Input
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="分享你的观点..."
                        className="text-sm"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleAddArticleComment();
                          }
                        }}
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleAddArticleComment()}
                          disabled={!commentText.trim()}
                        >
                          发表评论
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setIsAddCommentOpen(false);
                            setCommentText('');
                          }}
                        >
                          取消
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-500 hover:text-gray-700 h-auto p-3"
                      onClick={() => setIsAddCommentOpen(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      <span>发表评论...</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* 评论列表 */}
            {comments && comments.length > 0 && (
              <CommentTree
                comments={comments}
                onReply={handleAddArticleComment}
                onReplyClick={(_commentId: string, _commentAuthor: string) => {
                  // Handle reply click if needed for ArticleSource page
                }}
                onVote={(commentId: string, direction: 'up' | 'down') => {
                  // 简单的投票实现
                  const updatedComments = updateCommentScore(comments, commentId, direction);
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

            {/* 无评论时的提示 */}
            {(!comments || comments.length === 0) && (
              <div className="text-center py-8">
                <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">还没有评论，来发表第一个观点吧！</p>
              </div>
            )}
          </div>

          {/* 底部留白 - 根据评论栏状态调整 */}
          <div className={selectedParagraph ? "h-48" : "h-12"}></div>
        </main>

        {/* 底部固定评论栏 */}
        {selectedParagraph && (
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.1)]">
            <div className="max-w-md mx-auto">
              <div
                ref={commentBarRef}
                className={`transition-all duration-300 ${
                  isCommentBarExpanded ? "max-h-80" : "max-h-0"
                } overflow-hidden`}
              >
                <div className="flex flex-col">
                  {/* 拖动指示器 */}
                  <div className="flex justify-center py-2">
                    <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
                  </div>

                  {/* 段落预览 */}
                  <div className="relative px-4 pb-3">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <div className="flex items-start gap-2 mb-2">
                        <MessageCircle className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
                        <p className="text-xs text-yellow-700 font-medium">
                          正在讨论的段落
                        </p>
                        <button
                          onClick={handleCloseCommentBar}
                          className="ml-auto text-yellow-600 hover:text-yellow-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed line-clamp-2 pl-6">
                        "{currentParagraph?.content}"
                      </p>
                    </div>
                  </div>

                  {/* 评论列表 */}
                  {currentParagraph && currentParagraph.comments.length > 0 && (
                    <div className="flex-1 overflow-y-auto px-4 pb-3 space-y-3 max-h-32">
                      {currentParagraph.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="flex gap-2 bg-gray-50 rounded-lg p-2"
                        >
                          <Avatar className="h-6 w-6 shrink-0">
                            <AvatarFallback
                              className={
                                comment.author === "Puzle"
                                  ? "bg-blue-600 text-white text-[10px]"
                                  : "bg-gray-600 text-white text-[10px]"
                              }
                            >
                              {comment.author === "Puzle" ? "P" : "我"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span
                                className={`text-xs font-medium ${comment.author === "Puzle" ? "text-blue-600" : "text-gray-900"}`}
                              >
                                {comment.author}
                              </span>
                              <span className="text-[10px] text-gray-400">
                                {comment.time}
                              </span>
                            </div>
                            <p className="text-xs text-gray-700 leading-relaxed">
                              {comment.content}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 输入框区域 */}
                  <div className="px-4 pb-4 pt-2 bg-white">
                    <div className="flex items-end gap-2">
                      <div className="flex-1">
                        <Input
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="说说你的看法..."
                          className="rounded-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 px-4"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleAddComment();
                            }
                          }}
                        />
                      </div>
                      <Button
                        onClick={handleAddComment}
                        disabled={!newComment.trim()}
                        size="icon"
                        className="rounded-full bg-blue-600 hover:bg-blue-700 w-10 h-10 shrink-0"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
