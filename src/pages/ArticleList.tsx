import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, Plus, Link, Play, MessageCircle } from "lucide-react";
import type { Article, Comment } from "@/data/mockArticles";
import { mockArticles } from "@/data/mockArticles";

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

export default function ArticleList() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [importUrl, setImportUrl] = useState("");

  // 加载文章列表
  useEffect(() => {
    const loadArticles = () => {
      const storedArticles = localStorage.getItem("articles");
      if (storedArticles) {
        const parsed = JSON.parse(storedArticles);
        // 过滤掉 localStorage 中与 mockArticles ID 重复的数据
        const mockIds = new Set(mockArticles.map((a) => a.id));
        const userArticles = parsed.filter((a: Article) => !mockIds.has(a.id));

        // 为 mock 数据与 localStorage 中的数据合并（如果存在则使用 localStorage 中的版本）
        const storedMockArticles = parsed.filter((a: Article) => mockIds.has(a.id));
        const storedMockIds = new Set(storedMockArticles.map((a: Article) => a.id));
        const originalMockArticles = mockArticles.filter((a: Article) => !storedMockIds.has(a.id));

        // 将用户创建的文章放在前面，然后是更新过的 mock 文章，最后是未更新的 mock 文章
        setArticles([...userArticles, ...storedMockArticles, ...originalMockArticles]);
      } else {
        setArticles(mockArticles);
      }
    };
    loadArticles();

    // 监听 storage 事件，当其他页面修改 localStorage 时更新
    window.addEventListener("storage", loadArticles);
    window.addEventListener("focus", loadArticles);

    return () => {
      window.removeEventListener("storage", loadArticles);
      window.removeEventListener("focus", loadArticles);
    };
  }, []);

  const handleImportLink = () => {
    setIsPopoverOpen(false);
    setIsImportDialogOpen(true);
  };

  const handleImportConfirm = () => {
    if (!importUrl.trim()) {
      alert("请输入链接地址");
      return;
    }

    // 模拟解析链接，生成标题、正文和图片
    // 实际应用中这里会调用后端API解析链接
    const generateLinkPreview = (url: string) => {
      const hasImage = Math.random() > 0.3; // 70%的链接有图片
      const imageIndex = Math.floor(Math.random() * 5) + 1;
      const domain = url.includes("://")
        ? url.split("://")[1].split("/")[0]
        : url.substring(0, 30);

      return {
        title: `${domain}`,
        content: `这是从链接 ${url} 解析的内容摘要。通常会包含链接页面的描述、关键信息等内容。`,
        imageUrl: hasImage
          ? `https://images.unsplash.com/photo-${1500000000000 + imageIndex * 100000000}?w=800&h=400&fit=crop`
          : undefined,
      };
    };

    const preview = generateLinkPreview(importUrl);

    // 创建导入的文章
    const newArticle = {
      id: Date.now().toString(),
      title: preview.title,
      content: preview.content,
      source: "导入链接",
      time: "刚刚",
      timestamp: Date.now(),
      isDiscussed: false,
      type: "link" as const,
      imageUrl: preview.imageUrl,
      originalUrl: importUrl,
    };

    // 保存到 localStorage
    const existingArticles = localStorage.getItem("articles");
    const storedArticles = existingArticles ? JSON.parse(existingArticles) : [];
    storedArticles.unshift(newArticle);
    localStorage.setItem("articles", JSON.stringify(storedArticles));

    // 关闭弹窗并跳转
    setIsImportDialogOpen(false);
    setImportUrl("");
    navigate(`/article/${newArticle.id}`);
  };

  const handleArticleClick = (articleId: string) => {
    navigate(`/article/${articleId}`);
  };

  // 显示所有文章（不筛选）
  const filteredArticles = articles;

  // 时间分组函数
  const getTimeGroup = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;
    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = 7 * oneDay;
    const oneMonth = 30 * oneDay;

    const todayStart = new Date().setHours(0, 0, 0, 0);
    const yesterdayStart = todayStart - oneDay;

    if (timestamp >= todayStart) {
      return "今天";
    } else if (timestamp >= yesterdayStart) {
      return "昨天";
    } else if (diff < oneWeek) {
      return "本周";
    } else if (diff < oneMonth) {
      return "本月";
    } else {
      return "更久";
    }
  };

  // 按时间分组
  const groupedArticles = filteredArticles.reduce(
    (groups, article) => {
      const group = getTimeGroup(article.timestamp);
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(article);
      return groups;
    },
    {} as Record<string, Article[]>,
  );

  // 分组顺序
  const groupOrder = ["今天", "昨天", "本周", "本月", "更久"];
  const sortedGroups = groupOrder.filter(
    (group) => groupedArticles[group]?.length > 0,
  );

  return (
    <div className="min-h-screen bg-white">
      {/* 移动端容器 */}
      <div className="max-w-md mx-auto min-h-screen flex flex-col bg-white">
        {/* 顶部导航栏 */}
        <header className="sticky top-0 bg-white border-b border-gray-200 z-10">
          <div className="flex items-center justify-between px-4 py-3">
            <h1 className="text-xl font-semibold text-gray-900 flex-1">
              PuzleRead
            </h1>
            <div className="flex items-center gap-2">
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-48 p-2"
                  align="end"
                  side="bottom"
                  sideOffset={8}
                >
                  <div className="flex flex-col gap-1">
                    <Button
                      variant="ghost"
                      className="justify-start h-auto py-3 px-3"
                      onClick={handleImportLink}
                    >
                      <Link className="h-4 w-4 mr-3" />
                      <span>导入链接</span>
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearching(!isSearching)}
                className="text-gray-600 hover:text-gray-900"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* 搜索框（展开时显示） */}
          {isSearching && (
            <div className="px-4 pb-3">
              <Input placeholder="搜索文章..." className="w-full" autoFocus />
            </div>
          )}
        </header>

        {/* 文章列表 */}
        <main className="flex-1 overflow-y-auto pb-20">
          <div className="p-4">
            {sortedGroups.map((groupName) => (
              <div key={groupName} className="mb-4">
                {/* 时间分组标题 */}
                <h2 className="text-sm font-medium text-gray-500 mb-3 px-2">
                  {groupName}
                </h2>

                {/* 该分组的文章列表 */}
                <div className="space-y-2">
                  {groupedArticles[groupName].map((article) => (
                    <Card
                      key={article.id}
                      className="cursor-pointer hover:border-gray-400 transition-colors border-gray-200 overflow-hidden py-0"
                      onClick={() => handleArticleClick(article.id)}
                    >
                      {/* 媒体类型卡片 - 顶部小图 */}
                      {article.type === "media" && article.imageUrl && (
                        <div className="px-4">
                          <div className="w-full rounded-lg overflow-hidden bg-gray-100 relative">
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

                      <CardContent className="p-4">
                        <div className="flex justify-between items-start gap-3">
                          {/* 左侧：标题和元信息（垂直排列） */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base font-medium text-gray-900 line-clamp-2 mb-1.5">
                              {article.title}
                            </h3>
                            <div className="flex items-center gap-1.5 text-xs text-gray-400">
                              <span>{article.time}</span>
                              <span>·</span>
                              <span>{article.source}</span>
                              {article.comments && countTotalComments(article.comments) > 0 && (
                                <>
                                  <span>·</span>
                                  <div className="flex items-center gap-1">
                                    <MessageCircle className="w-3.5 h-3.5" />
                                    <span>{countTotalComments(article.comments)}</span>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>

                          {/* 右侧：预览图 */}
                          {article.imageUrl && (
                            <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 shrink-0 flex-shrink-0">
                              <img
                                src={article.imageUrl}
                                alt={article.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* 导入链接弹窗 */}
        <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
          <DialogContent className="w-[90vw] max-w-sm">
            <DialogHeader>
              <DialogTitle>导入链接</DialogTitle>
              <DialogDescription>输入文章或网页链接地址</DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <Input
                value={importUrl}
                onChange={(e) => setImportUrl(e.target.value)}
                placeholder="https://..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleImportConfirm();
                  }
                }}
                autoFocus
              />
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsImportDialogOpen(false);
                  setImportUrl("");
                }}
              >
                取消
              </Button>
              <Button
                onClick={handleImportConfirm}
                className="bg-gray-900 hover:bg-gray-800"
              >
                确定
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
