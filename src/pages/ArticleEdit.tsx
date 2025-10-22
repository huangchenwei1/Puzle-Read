import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function ArticleEdit() {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      alert("请填写标题和内容")
      return
    }

    // 创建新文章
    const newArticle = {
      id: Date.now().toString(),
      title: title.trim() || "无标题",
      content: content.trim(),
      source: "手动创建",
      time: "刚刚",
      timestamp: Date.now(),
      isDiscussed: false,
      type: "article" as const
    }

    // 获取现有文章列表
    const existingArticles = localStorage.getItem("articles")
    const articles = existingArticles ? JSON.parse(existingArticles) : []
    
    // 将新文章添加到列表开头
    articles.unshift(newArticle)
    localStorage.setItem("articles", JSON.stringify(articles))

    // 返回列表页
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto min-h-screen flex flex-col bg-white">
        
        {/* 顶部导航栏 */}
        <header className="sticky top-0 bg-white border-b border-gray-200 z-10">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-lg font-semibold text-gray-900">新建文章</h1>
            </div>
            
            <Button
              onClick={handleSave}
              className="bg-gray-900 hover:bg-gray-800"
            >
              完成
            </Button>
          </div>
        </header>

        {/* 编辑区域 */}
        <main className="flex-1 flex flex-col">
          {/* 标题输入 */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="标题"
            className="px-6 py-4 text-2xl font-bold border-0 outline-none placeholder:text-gray-300"
          />
          
          {/* 内容输入 */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="开始写作..."
            className="flex-1 px-6 py-4 text-base leading-relaxed border-0 outline-none resize-none placeholder:text-gray-300"
          />
        </main>
      </div>
    </div>
  )
}

