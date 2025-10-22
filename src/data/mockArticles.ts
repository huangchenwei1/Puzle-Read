// 评论类型
export interface Comment {
  id: string
  author: string
  content: string
  time: string
  replies?: Comment[]
  quotedText?: string  // 引用的段落内容（用于原文页的段落评论）
}

// 文章数据类型
export interface Article {
  id: string
  title: string
  content: string
  puzleReply?: string
  source: string
  time: string
  timestamp: number  // 时间戳，用于排序和分组
  isDiscussed: boolean
  imageUrl?: string
  type: "link" | "media" | "article"  // 文章类型
  mediaType?: "image" | "video"  // media类型时，区分图片还是视频
  originalUrl?: string  // 原始链接地址
  comments?: Comment[]  // 评论列表
}

// 模拟文章数据
const now = Date.now()
const oneHour = 60 * 60 * 1000
const oneDay = 24 * oneHour

export const mockArticles: Article[] = [
  {
    id: "1",
    title: "OpenAI 最新产品发布会",
    content: "OpenAI 在今天的发布会上展示了多项突破性的AI技术，包括更强大的GPT模型和全新的多模态能力...",
    source: "TechCrunch",
    time: "2小时前",
    timestamp: now - 2 * oneHour,
    isDiscussed: false,
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    type: "link",
    originalUrl: "https://techcrunch.com/openai-product-launch",
    comments: [
      {
        id: "c1",
        author: "Puzle",
        content: "这次发布会的亮点主要集中在三个方面：\n\n**多模态能力突破**：新模型可以同时理解和生成文本、图像、音频，信息处理更加自然流畅。这意味着AI不再局限于单一的输入输出方式，而是能像人类一样进行多维度的感知和表达。\n\n**实时交互体验**：语音对话的延迟降低到接近人类对话的水平，能捕捉语气、情感等细微变化。这让AI助手从工具向伙伴的角色转变成为可能。\n\n**应用场景扩展**：从内容创作、教育辅导到专业领域分析，多模态能力将催生更多创新应用。特别是在需要综合处理视觉和语言信息的场景中，会有质的飞跃。",
        time: "1小时前"
      },
      {
        id: "c2",
        author: "我",
        content: "多模态能力这块确实很有想象空间",
        time: "50分钟前",
        quotedText: "OpenAI 在今天的发布会上展示了多项突破性的AI技术，包括更强大的GPT模型和全新的多模态能力..."
      },
      {
        id: "c3",
        author: "我",
        content: "实时语音对话的功能确实很震撼！",
        time: "30分钟前",
        replies: [
          {
            id: "c3-r1",
            author: "Puzle",
            content: "是的，实时语音交互确实是个技术突破。它实现了几个关键进步：\n\n• **低延迟响应**：从输入到输出的延迟降到毫秒级，接近真实对话的节奏\n• **情感理解**：能识别语气中的情绪变化，做出更贴切的回应\n• **上下文连贯**：保持长对话的语境理解，不会频繁失忆\n\n这些改进让AI对话从一问一答变成了真正的交流，用户体验有质的提升。",
            time: "20分钟前",
            replies: [
              {
                id: "c3-r1-r1",
                author: "我",
                content: "那延迟具体能做到多少毫秒？",
                time: "15分钟前"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "2",
    title: "如何高效使用AI工具提升工作效率",
    content: "分享我使用ChatGPT、Midjourney等AI工具的实践经验，从任务规划到内容创作，AI可以在多个环节帮助我们提升效率...",
    source: "少数派",
    time: "5小时前",
    timestamp: now - 5 * oneHour,
    isDiscussed: true,
    puzleReply: "文章提到的三个核心策略值得关注：\n\n1️⃣ 提示词设计：将复杂任务拆解为具体步骤，让AI理解你的真实需求\n2️⃣ 迭代优化：首次输出通常不是最佳结果，通过追问和调整持续改进\n3️⃣ 场景适配：不同工作场景需要不同的AI工具组合\n\n补充一点：建立个人提示词库可以显著提升效率，把常用的高质量提示词整理成模板。",
    type: "link",
    originalUrl: "https://sspai.com/post/ai-efficiency-guide",
    comments: [
      {
        id: "c1",
        author: "Puzle",
        content: "文章提到的三个核心策略值得关注：\n\n1️⃣ 提示词设计：将复杂任务拆解为具体步骤，让AI理解你的真实需求\n2️⃣ 迭代优化：首次输出通常不是最佳结果，通过追问和调整持续改进\n3️⃣ 场景适配：不同工作场景需要不同的AI工具组合\n\n补充一点：建立个人提示词库可以显著提升效率，把常用的高质量提示词整理成模板。",
        time: "4小时前"
      },
      {
        id: "c2",
        author: "我",
        content: "这个策略看起来很系统",
        time: "3.5小时前",
        quotedText: "对于个人而言，保持学习和适应能力变得越来越重要。我们需要不断更新自己的知识体系，才能在这个快速变化的时代保持竞争力。"
      },
      {
        id: "c3",
        author: "我",
        content: "太实用了！我之前一直不知道怎么写好提示词，按照文章的方法试了一下，效果确实好很多。",
        time: "3小时前",
        replies: [
          {
            id: "c3-r1",
            author: "Puzle",
            content: "提示词设计确实需要不断练习和迭代。几个实用建议：\n\n**具体化描述**：避免模糊表达，明确告诉AI你需要什么格式、风格、长度\n**示例引导**：提供1-2个样例，让AI理解你的期望输出\n**角色设定**：给AI一个明确角色（如专家、导师），会得到更专业的回答\n**迭代优化**：首次输出不满意就追问，引导AI逐步改进\n\n多实践，你会逐渐建立起自己的提示词模式库。",
            time: "2.5小时前",
            replies: [
              {
                id: "c3-r1-r1",
                author: "我",
                content: "角色设定这个很有用，我试试！",
                time: "2小时前"
              }
            ]
          }
        ]
      },
      {
        id: "c4",
        author: "我",
        content: "提示词库这个想法不错，我准备用Notion建一个",
        time: "2小时前",
        quotedText: "通过合理利用这些工具和平台，我们能够创造出更多的价值，实现个人和职业的成长。",
        replies: [
          {
            id: "c4-r1",
            author: "Puzle",
            content: "Notion确实很适合做提示词管理。建议的组织结构：\n\n**按场景分类**：\n• 写作类：文章大纲、内容扩写、润色修改\n• 代码类：调试分析、代码重构、文档生成\n• 分析类：数据解读、市场研究、竞品分析\n• 创意类：头脑风暴、方案设计、营销文案\n\n**每个提示词记录**：\n• 适用场景和目标\n• 完整的提示词模板\n• 实际效果示例\n• 优化迭代记录\n\n这样建立的知识库会越用越好用。",
            time: "1.5小时前",
            replies: [
              {
                id: "c4-r1-r1",
                author: "我",
                content: "好详细，马上开始整理！",
                time: "1小时前"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "6",
    title: "深度学习入门指南",
    content: "从零开始学习深度学习，涵盖神经网络基础、常用框架和实践项目...",
    source: "机器之心",
    time: "5天前",
    timestamp: now - 5 * oneDay,
    isDiscussed: false,
    type: "link",
    originalUrl: "https://www.jiqizhixin.com/articles/deep-learning-guide",
    comments: [
      {
        id: "c1",
        author: "Puzle",
        content: "这篇指南的内容结构很完整，适合系统化学习：\n\n**理论基础**：\n• 神经网络的工作原理：前向传播和反向传播\n• 激活函数的作用和选择\n• 损失函数与优化算法（SGD、Adam等）\n\n**实践框架**：\n• PyTorch/TensorFlow的选择和入门\n• 模型搭建的基本流程\n• 调参技巧和常见问题解决\n\n**学习路径建议**：\n1. 先理解感知机、线性回归等简单模型\n2. 掌握梯度下降的数学原理\n3. 动手实现一个简单的神经网络\n4. 逐步学习CNN、RNN等进阶结构\n\n配合吴恩达的课程和动手实践，效果会更好。关键是要把数学原理和代码实现结合起来理解。",
        time: "5天前"
      },
      {
        id: "c2",
        author: "我",
        content: "作为入门教程写得很详细",
        time: "4天前"
      }
    ]
  },
  {
    id: "7",
    title: "Notion AI 推出全新协作功能",
    content: "Notion 宣布推出 AI 协作助手，可以自动生成会议纪要、整理文档结构，并提供智能写作建议。这次更新让团队协作效率提升了一个新台阶...",
    source: "产品沉思录",
    time: "1天前",
    timestamp: now - 1 * oneDay,
    isDiscussed: true,
    imageUrl: "https://images.unsplash.com/photo-1633613286991-611fe299c4be?w=800&h=400&fit=crop",
    puzleReply: "Notion AI 的这次更新很有意思，几个亮点值得关注：\n\n**会议纪要自动化**：从录音到结构化文档，减少大量手动整理工作\n**文档智能优化**：自动调整结构、补充内容、优化表达\n**多人协作增强**：AI 可以理解团队上下文，提供更精准的建议\n\n这种深度集成的 AI 能力，比单独的 ChatGPT 更贴合实际工作场景。",
    type: "link",
    originalUrl: "https://pmthinking.com/notion-ai-collaboration",
    comments: [
      {
        id: "c1",
        author: "Puzle",
        content: "Notion AI 的这次更新很有意思，几个亮点值得关注：\n\n**会议纪要自动化**：从录音到结构化文档，减少大量手动整理工作。不仅能转写语音，还能识别关键决策点、待办事项、负责人，直接生成可执行的任务列表。\n\n**文档智能优化**：自动调整结构、补充内容、优化表达。比如写完一篇文档草稿，AI 会建议添加目录、调整段落顺序、补充遗漏的细节。\n\n**多人协作增强**：AI 可以理解团队上下文，提供更精准的建议。它知道你们团队的术语、工作流程、常用模板，给出的建议更接地气。\n\n**场景化落地**：这种深度集成的 AI 能力，比单独打开 ChatGPT 对话要高效得多。工具和场景的结合才是 AI 应用的正确姿势。",
        time: "20小时前"
      },
      {
        id: "c2",
        author: "我",
        content: "会议纪要自动化这个太实用了！",
        time: "18小时前",
        quotedText: "Notion 宣布推出 AI 协作助手，可以自动生成会议纪要、整理文档结构，并提供智能写作建议..."
      },
      {
        id: "c3",
        author: "我",
        content: "我们团队正在用 Notion，等不及要试试这个功能了",
        time: "15小时前",
        replies: [
          {
            id: "c3-r1",
            author: "Puzle",
            content: "如果你们团队已经在用 Notion，这次更新确实很值得期待。几个实用建议：\n\n**会议场景优化**：\n• 提前准备会议大纲模板，AI 会按照你的结构生成纪要\n• 录音时注意环境噪音，影响转写质量\n• 会后立即生成纪要并分享，趁记忆清晰时补充细节\n\n**文档协作技巧**：\n• 建立团队知识库，AI 会学习你们的表达习惯\n• 使用统一的标签和分类，方便 AI 理解上下文\n• 让 AI 帮忙整理散乱的想法，但关键决策还是要人来把关\n\n**成本考量**：AI 功能通常需要额外付费，评估一下团队规模和使用频率，算算 ROI 是否划算。如果能节省大量重复劳动，还是很值的。",
            time: "12小时前",
            replies: [
              {
                id: "c3-r1-r1",
                author: "我",
                content: "成本这块确实要考虑，我先申请试用看看效果",
                time: "10小时前"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "8",
    title: "苹果 Vision Pro 使用一个月体验报告",
    content: "从拿到设备到现在一个月，Vision Pro 给我带来了不少惊喜，但也有一些明显的局限。这篇文章分享我的真实使用感受和应用场景...",
    source: "爱范儿",
    time: "3天前",
    timestamp: now - 3 * oneDay,
    isDiscussed: true,
    imageUrl: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=800&h=400&fit=crop",
    puzleReply: "Vision Pro 作为第一代产品，优缺点都很明显。从这篇体验来看，几个关键点：\n\n**空间计算体验**：手势操作流畅度超预期，虚拟屏幕的清晰度很高\n**应用生态**：原生应用还不够丰富，但 iPad 应用兼容性不错\n**使用场景**：观影、工作效率场景体验最好，长时间佩戴还是会累\n\nVision Pro 更像是空间计算的起点，而非终点。",
    type: "link",
    originalUrl: "https://www.ifanr.com/vision-pro-one-month-review",
    comments: [
      {
        id: "c1",
        author: "Puzle",
        content: "Vision Pro 作为第一代产品，优缺点都很明显。从这篇体验来看，几个关键点：\n\n**空间计算体验**：手势操作的流畅度超出预期，眼动追踪精准度很高。虚拟屏幕的清晰度达到了 4K 级别，文字阅读完全没问题。空间音频的沉浸感也处理得很好。\n\n**应用生态现状**：原生应用数量还不够多，大厂适配速度偏慢。但好在 iPad 应用的兼容性做得不错，基本的生产力工具都能跑。游戏方面还比较欠缺，期待后续更新。\n\n**实际使用场景**：\n• 观影体验确实震撼，相当于随身带着巨幕影院\n• 多虚拟屏幕办公很提效，但长时间佩戴颈部会酸\n• 3D 内容创作很有想象空间，设计师会很喜欢\n• 社交应用还在早期，虚拟形象的表情捕捉需要改进\n\n**产品定位思考**：Vision Pro 更像是空间计算的起点，而非终点。苹果在用第一代产品验证方向、培养生态、积累数据。真正的大众化产品可能要等到第三代，价格更亲民、重量更轻、生态更完善。",
        time: "3天前"
      },
      {
        id: "c2",
        author: "我",
        content: "价格确实劝退，但技术方向很有前景",
        time: "2天前",
        quotedText: "从拿到设备到现在一个月，Vision Pro 给我带来了不少惊喜，但也有一些明显的局限..."
      },
      {
        id: "c3",
        author: "我",
        content: "想知道写代码的时候多屏幕效率提升明显吗",
        time: "2天前",
        replies: [
          {
            id: "c3-r1",
            author: "Puzle",
            content: "多虚拟屏幕写代码确实有优势，但要看使用场景：\n\n**优势方面**：\n• 可以同时展开多个窗口：代码编辑器、终端、文档、浏览器\n• 屏幕尺寸和位置随意调整，比物理显示器灵活\n• 环境隔离效果好，专注度更高\n\n**局限方面**：\n• 键盘操作需要低头看键盘，频繁视线切换会不适\n• 长时间佩戴的舒适度还是不如直接看显示器\n• 虚拟键盘打字体验差，还是得用实体键盘\n\n**实用建议**：\n如果是短时间专注编码（1-2小时），体验还不错。但一整天工作还是物理屏幕更舒服。Vision Pro 更适合作为移动办公的补充，比如在咖啡馆、飞机上需要多屏工作的场景。",
            time: "1天前",
            replies: [
              {
                id: "c3-r1-r1",
                author: "我",
                content: "明白了，移动办公场景确实是个好应用",
                time: "1天前"
              }
            ]
          }
        ]
      }
    ]
  }
]


