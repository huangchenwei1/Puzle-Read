import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowLeft, MoreVertical, Trash2, Play, X, ExternalLink } from "lucide-react"
import { mockArticles } from "./ArticleList"
import type { Article } from "./ArticleList"

// 评论类型
interface Comment {
  id: string
  author: string
  content: string
  time: string
  replies?: Comment[]
  quotedText?: string  // 引用的段落内容（用于原文页的段落评论）
}

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
  const [replyingTo, setReplyingTo] = useState<{ id: string; author: string } | null>(null)

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

  const handleAddComment = () => {
    if (!newComment.trim()) return
    
    const newCommentObj: Comment = {
      id: Date.now().toString(),
      author: "我",
      content: newComment,
      time: "刚刚",
      replies: []
    }
    
    if (replyingTo) {
      // 如果是回复某条评论，将新评论添加到该评论的replies中
      const updatedComments = addReplyToComment(comments, replyingTo.id, newCommentObj)
      setComments(updatedComments)
    } else {
      // 如果不是回复，添加为一级评论
      setComments([...comments, newCommentObj])
    }
    
    setNewComment("")
    setReplyingTo(null)
  }

  const handleReply = (commentId: string, author: string) => {
    setReplyingTo({ id: commentId, author })
  }

  const handleCancelReply = () => {
    setReplyingTo(null)
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
          <div>
            {comments.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-sm">
                还没有讨论，来发表第一条讨论吧
              </div>
            ) : (
              comments.map((comment, index) => (
                <div key={comment.id} className={`${index > 0 ? 'border-t border-gray-100' : ''}`}>
                  <div className="p-4 hover:bg-gray-50 transition-colors">
                    {/* 讨论头部 */}
                    <div className="flex items-center gap-2 mb-2">
                      {comment.author === "Puzle" ? (
                        <>
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-blue-600 text-white text-xs">P</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium text-blue-600">Puzle</span>
                        </>
                      ) : (
                        <>
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-gray-600 text-white text-xs">我</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium text-gray-900">我</span>
                        </>
                      )}
                      <span className="text-xs text-gray-400">{comment.time}</span>
                    </div>

                    {/* 引用内容（如果有） */}
                    {comment.quotedText && (
                      <div className="mb-3 relative">
                        <div 
                          onClick={() => navigate(`/article/${id}/source`)}
                          className="bg-blue-50 border border-blue-200 rounded-lg p-3 pl-4 cursor-pointer hover:bg-blue-100 transition-colors"
                        >
                          <div className="absolute left-2 top-3 w-1 h-8 bg-blue-400 rounded-full"></div>
                          <p className="text-xs text-blue-600 font-medium mb-1.5 pl-3 flex items-center gap-1">
                            引用原文
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </p>
                          <p className="text-sm text-gray-700 leading-relaxed line-clamp-3 pl-3">
                            "{comment.quotedText}"
                          </p>
                        </div>
                      </div>
                    )}

                    {/* 讨论内容 */}
                    <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed mb-3">
                      {comment.content}
                    </div>

                    {/* 讨论操作 */}
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => handleReply(comment.id, comment.author)}
                        className="text-xs text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1"
                      >
                        <span>回复</span>
                      </button>
                    </div>

                    {/* 二级回复 */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-3 ml-6 space-y-3">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="border-l-2 border-blue-100 pl-3">
                            <div className="flex items-center gap-2 mb-1.5">
                              {reply.author === "Puzle" ? (
                                <>
                                  <Avatar className="h-5 w-5">
                                    <AvatarFallback className="bg-blue-600 text-white text-[10px]">P</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm font-medium text-blue-600">Puzle</span>
                                </>
                              ) : (
                                <>
                                  <Avatar className="h-5 w-5">
                                    <AvatarFallback className="bg-gray-600 text-white text-[10px]">我</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm font-medium text-gray-900">我</span>
                                </>
                              )}
                              <span className="text-xs text-gray-400">{reply.time}</span>
                            </div>
                            <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed mb-2">
                              {reply.content}
                            </div>
                            {/* 回复操作 */}
                            <button 
                              onClick={() => handleReply(reply.id, reply.author)}
                              className="text-xs text-gray-500 hover:text-blue-600 transition-colors"
                            >
                              回复
                            </button>
                            
                            {/* 三级回复 */}
                            {reply.replies && reply.replies.length > 0 && (
                              <div className="mt-2 space-y-2">
                                {reply.replies.map((subReply) => (
                                  <div key={subReply.id} className="pl-6 border-l-2 border-gray-100">
                                    <div className="flex items-center gap-2 mb-1.5">
                                      {subReply.author === "Puzle" ? (
                                        <>
                                          <Avatar className="h-5 w-5">
                                            <AvatarFallback className="bg-blue-600 text-white text-[10px]">P</AvatarFallback>
                                          </Avatar>
                                          <span className="text-sm font-medium text-blue-600">Puzle</span>
                                        </>
                                      ) : (
                                        <>
                                          <Avatar className="h-5 w-5">
                                            <AvatarFallback className="bg-gray-600 text-white text-[10px]">我</AvatarFallback>
                                          </Avatar>
                                          <span className="text-sm font-medium text-gray-900">我</span>
                                        </>
                                      )}
                                      <span className="text-xs text-gray-400">{subReply.time}</span>
                                    </div>
                                    <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                                      {subReply.content}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </main>

        {/* 底部讨论输入框 */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
          {replyingTo && (
            <div className="mb-2 flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
              <span className="text-sm text-gray-600">
                回复 <span className="font-medium text-blue-600">{replyingTo.author}</span>:
              </span>
              <button onClick={handleCancelReply} className="text-gray-400 hover:text-gray-600">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={replyingTo ? `回复 ${replyingTo.author}...` : "发表你的讨论..."}
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddComment()
                }
              }}
            />
            <Button
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              className="bg-gray-900 hover:bg-gray-800"
            >
              发送
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
