import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowLeft, MoreVertical, Trash2, Play, ExternalLink, Plus, MessageCircle } from "lucide-react"
import type { Article, Comment } from "@/data/mockArticles"
import { mockArticles } from "@/data/mockArticles"
import { CommentTree } from "@/components/CommentTree"

export default function ArticleDetail() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  
  // 找到对应的文章 - 先从 localStorage 查找，再从 mockArticles 查找
  const findArticle = () => {
    const storedArticles = localStorage.getItem("articles")
    if (storedArticles) {
      const parsed = JSON.parse(storedArticles)
      const found = parsed.find((a: Article) => a.id === id)
      if (found) return found
    }
    return mockArticles.find(a => a.id === id)
  }
  
  const article = findArticle()
  
  // 加载文章的评论
  const initialComments: Comment[] = article?.comments || []
  
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState("")
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const [isAddCommentOpen, setIsAddCommentOpen] = useState(false)

  // 递归查找父评论深度
  const getParentDepth = (comments: Comment[], targetParentId: string): number => {
    for (const comment of comments) {
      if (comment.id === targetParentId) {
        return comment.depth !== undefined ? comment.depth : 0
      }
      if (comment.replies && comment.replies.length > 0) {
        const depth = getParentDepth(comment.replies, targetParentId)
        if (depth >= 0) return depth
      }
    }
    return -1
  }

  // 递归查找并添加回复到指定评论
  const addReplyToComment = (comments: Comment[], targetId: string, newReply: Comment): Comment[] => {
    return comments.map(comment => {
      if (comment.id === targetId) {
        // 找到目标评论，添加回复
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply]
        }
      } else if (comment.replies && comment.replies.length > 0) {
        // 递归查找子回复
        return {
          ...comment,
          replies: addReplyToComment(comment.replies, targetId, newReply)
        }
      }
      return comment
    })
  }

  // 添加文章讨论评论 (树状结构)
  const handleAddArticleComment = (parentId?: string, content?: string) => {
    const actualContent = content || newComment
    if (!actualContent?.trim()) return

    const isReply = !!parentId && !!content

    let parentDepth = 0
    if (isReply && parentId) {
      parentDepth = getParentDepth(comments, parentId)
      if (parentDepth === -1) {
        parentDepth = 0
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
    }

    let updatedComments: Comment[]

    if (isReply) {
      updatedComments = addReplyToComment(comments, parentId, newCommentObj)
    } else {
      updatedComments = [...comments, newCommentObj]
    }

    setComments(updatedComments)
    saveCommentsToStorage(updatedComments)

    if (!isReply) {
      setNewComment("")
      setIsAddCommentOpen(false)
    }
  }

  // 更新评论投票状态
  const updateCommentVote = (commentsList: Comment[], commentId: string, direction: 'up' | 'down'): Comment[] => {
    return commentsList.map(comment => {
      if (comment.id === commentId) {
        const currentVote = comment.voteStatus
        let newVoteStatus: 'up' | 'down' | null = direction

        // 如果点击的是当前已选的按钮，则取消投票
        if (currentVote === direction) {
          newVoteStatus = null
        }

        return {
          ...comment,
          voteStatus: newVoteStatus
        }
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: updateCommentVote(comment.replies, commentId, direction)
        }
      }
      return comment
    })
  }

  // 保存评论到 localStorage
  const saveCommentsToStorage = (updatedComments: Comment[]) => {
    if (!id) return

    const existingArticles = localStorage.getItem("articles")
    const storedArticles = existingArticles ? JSON.parse(existingArticles) : []
    const articleIndex = storedArticles.findIndex((a: any) => a.id === id)

    if (articleIndex >= 0) {
      storedArticles[articleIndex].comments = updatedComments
    } else {
      storedArticles.push({
        ...article,
        comments: updatedComments
      })
    }

    localStorage.setItem("articles", JSON.stringify(storedArticles))
    window.dispatchEvent(new Event("storage"))
  }

  const handleDelete = () => {
    setIsMoreOpen(false)
    if (confirm("确认删除这篇文章吗？")) {
      navigate(-1)
    }
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">文章不存在</p>
      </div>
    )
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
              <h1 className="text-lg font-semibold text-gray-900">详情</h1>
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

        {/* 文章卡片 */}
        <div className="p-4 border-b border-gray-100">
          <Card className="border-gray-200">
            {/* 媒体类型卡片 - 顶部大图/视频 */}
            {article.type === "media" && article.imageUrl && (
              <div className="px-6 pt-6">
                <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-100 relative">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  {/* 视频播放按钮 */}
                  {article.mediaType === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-black/60 flex items-center justify-center backdrop-blur-sm hover:bg-black/80 transition-colors">
                        <Play className="w-8 h-8 text-white fill-white ml-1" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <CardHeader className="pb-3">
              {/* 链接类型卡片 - 文本/图文混排 */}
              {article.type === "link" && (
                <>
                  {article.imageUrl ? (
                    // 有图片：图文混排（右侧小缩略图）
                    <div className="flex gap-3">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base font-medium text-gray-900 line-clamp-2 mb-2">
                          {article.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-500 line-clamp-2">
                          {article.content}
                        </CardDescription>
                      </div>
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ) : (
                    // 无图片：纯文本
                    <div>
                      <CardTitle className="text-base font-medium text-gray-900 line-clamp-2 mb-2">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-500 line-clamp-3">
                        {article.content}
                      </CardDescription>
                    </div>
                  )}
                </>
              )}

              {/* 文章类型卡片 - 纯文本 */}
              {article.type === "article" && (
                <div>
                  <CardTitle className="text-base font-medium text-gray-900 line-clamp-2 mb-2">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500 line-clamp-3">
                    {article.content}
                  </CardDescription>
                </div>
              )}

              {/* 媒体类型卡片 - 文本信息 */}
              {article.type === "media" && (
                <div>
                  <CardTitle className="text-base font-medium text-gray-900 line-clamp-2 mb-2">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500 line-clamp-2">
                    {article.content}
                  </CardDescription>
                </div>
              )}
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>{article.time}</span>
                  <span>·</span>
                  <span>{article.source}</span>
                </div>
                {/* 原文链接按钮 */}
                {article.originalUrl && (
                  <button
                    onClick={() => navigate(`/article/${id}/source`)}
                    className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-700 transition-colors"
                  >
                    <span>查看原文</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </CardContent>
          </Card>
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
                onVote={(commentId: string, direction: 'up' | 'down') => {
                  const updatedComments = updateCommentVote(comments, commentId, direction)
                  setComments(updatedComments)
                  saveCommentsToStorage(updatedComments)
                }}
                articleId={id!}
              />
            )}
          </div>
        </main>

        {/* 底部讨论输入框 */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8 mt-1">
                <AvatarFallback className="bg-gray-500 text-white text-sm">
                  我
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                {isAddCommentOpen ? (
                  <div className="space-y-3">
                    <Input
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="分享你的观点..."
                      className="text-sm"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          handleAddArticleComment()
                        }
                      }}
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleAddArticleComment()}
                        disabled={!newComment.trim()}
                        className="bg-gray-900 hover:bg-gray-800"
                      >
                        发表评论
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setIsAddCommentOpen(false)
                          setNewComment('')
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
                    <Plus className="w-4 w-4 mr-2" />
                    <span>发表评论...</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
