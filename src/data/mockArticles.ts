// 评论类型
export interface Comment {
  id: string;
  author: string;
  content: string;
  time: string;
  parentId?: string; // 父评论ID，用于树状结构
  depth?: number; // 嵌套深度，用于UI渲染
  score?: number; // 评论评分（可选，用于兼容性）
  voteStatus?: "up" | "down" | null; // 投票状态：无操作、已赞、已踩
  replies?: Comment[];
  quotedText?: string; // 引用的段落内容（用于原文页的段落评论）
}

// 文章数据类型
export interface Article {
  id: string;
  title: string;
  content: string;
  puzleReply?: string;
  source: string;
  time: string;
  timestamp: number; // 时间戳，用于排序和分组
  isDiscussed: boolean;
  imageUrl?: string;
  type: "link" | "media" | "article"; // 文章类型
  mediaType?: "image" | "video"; // media类型时，区分图片还是视频
  originalUrl?: string; // 原始链接地址
  comments?: Comment[]; // 评论列表
}

// 模拟文章数据
const now = Date.now();
const oneHour = 60 * 60 * 1000;
const oneDay = 24 * oneHour;

export const mockArticles: Article[] = [
  {
    id: "1",
    title: "OpenAI 最新产品发布会展示突破性多模态AI技术",
    content:
      "OpenAI 在今天的发布会上展示了多项突破性的AI技术，包括更强大的GPT模型和全新的多模态能力...",
    source: "TechCrunch",
    time: "2小时前",
    timestamp: now - 2 * oneHour,
    isDiscussed: false,
    imageUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    type: "link",
    originalUrl: "https://techcrunch.com/openai-product-launch",
    comments: [
      {
        id: "c1",
        author: "Puzle",
        content:
          "这次发布会的亮点主要集中在三个方面：\n\n**多模态能力突破**：新模型可以同时理解和生成文本、图像、音频，信息处理更加自然流畅。这意味着AI不再局限于单一的输入输出方式，而是能像人类一样进行多维度的感知和表达。\n\n**实时交互体验**：语音对话的延迟降低到接近人类对话的水平，能捕捉语气、情感等细微变化。这让AI助手从工具向伙伴的角色转变成为可能。\n\n**应用场景扩展**：从内容创作、教育辅导到专业领域分析，多模态能力将催生更多创新应用。特别是在需要综合处理视觉和语言信息的场景中，会有质的飞跃。",
        time: "1小时前",
        voteStatus: null,
      },
      {
        id: "c2",
        author: "张三",
        content: "多模态能力这块确实很有想象空间，特别是对内容创作者来说",
        time: "55分钟前",
      },
      {
        id: "c3",
        author: "我",
        content: "实时语音对话的功能确实很震撼！延迟这么低真的太厉害了",
        time: "50分钟前",
        replies: [
          {
            id: "c3-r1",
            author: "李四",
            content:
              "同意！这意味着我们可以像正常聊天一样和AI互动，体验会好很多",
            time: "45分钟前",
          },
          {
            id: "c3-r2",
            author: "Puzle",
            content:
              "是的，实时语音交互确实是个技术突破。从技术角度看，这背后涉及几个核心创新：\n\n• **低延迟响应**：从输入到输出的延迟降到毫秒级，接近真实对话的节奏\n• **情感理解**：能识别语气中的情绪变化，做出更贴切的回应\n• **上下文连贯**：保持长对话的语境理解，不会频繁失忆\n\n这让AI对话从一问一答变成了真正的交流体验。",
            time: "42分钟前",
            voteStatus: null,
            replies: [
              {
                id: "c3-r2-r1",
                author: "我",
                content: "那延迟具体能做到多少毫秒？比人类反应快吗？",
                time: "38分钟前",
              },
              {
                id: "c3-r2-r2",
                author: "王五",
                content:
                  "这个技术应用到教育领域会很有意思，可以做个智能家教系统",
                time: "35分钟前",
              },
            ],
          },
        ],
      },
      {
        id: "c4",
        author: "赵六",
        content: "有没有考虑成本问题？这种模型的计算量应该很大",
        time: "40分钟前",
        replies: [
          {
            id: "c4-r1",
            author: "Puzle",
            content:
              "这是个很好的问题。成本优化确实是大模型商用的关键瓶颈：\n\n**推理优化**：通过量化、剪枝等技术降低计算量\n**边缘计算**：部分模型部署到本地，减少云端调用\n**分级服务**：提供不同能力的模型版本，适应不同场景和成本预算\n\n当然，短期内成本还是会比较高，但随着技术进步和规模化应用，成本曲线会快速下降。",
            time: "35分钟前",
            voteStatus: null,
            replies: [
              {
                id: "c4-r1-r1",
                author: "我",
                content: "明白了，感谢专业的解答！",
                time: "32分钟前",
              },
              {
                id: "c4-r1-r2",
                author: "赵六",
                content: "有道理，期待成本下来之后的普及",
                time: "30分钟前",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "如何高效使用ChatGPT和AI工具",
    content:
      "分享我使用ChatGPT、Midjourney等AI工具的实践经验，从任务规划到内容创作，AI可以在多个环节帮助我们提升效率...",
    source: "少数派",
    time: "5小时前",
    timestamp: now - 5 * oneHour,
    isDiscussed: true,
    puzleReply:
      "文章提到的三个核心策略值得关注：\n\n1️⃣ 提示词设计：将复杂任务拆解为具体步骤，让AI理解你的真实需求\n2️⃣ 迭代优化：首次输出通常不是最佳结果，通过追问和调整持续改进\n3️⃣ 场景适配：不同工作场景需要不同的AI工具组合\n\n补充一点：建立个人提示词库可以显著提升效率，把常用的高质量提示词整理成模板。",
    type: "link",
    originalUrl: "https://sspai.com/post/ai-efficiency-guide",
    comments: [
      {
        id: "c1",
        author: "Puzle",
        content:
          "文章提到的三个核心策略值得关注：\n\n1️⃣ 提示词设计：将复杂任务拆解为具体步骤，让AI理解你的真实需求\n2️⃣ 迭代优化：首次输出通常不是最佳结果，通过追问和调整持续改进\n3️⃣ 场景适配：不同工作场景需要不同的AI工具组合\n\n补充一点：建立个人提示词库可以显著提升效率，把常用的高质量提示词整理成模板。",
        time: "4小时前",
        voteStatus: null,
      },
      {
        id: "c2",
        author: "陈可",
        content: "我已经用这个方法提升了30%的工作效率，强烈推荐！",
        time: "3.5小时前",
      },
      {
        id: "c3",
        author: "我",
        content:
          "太实用了！我之前一直不知道怎么写好提示词，按照文章的方法试了一下，效果确实好很多。",
        time: "3小时前",
        replies: [
          {
            id: "c3-r1",
            author: "杜海",
            content: "具体提升了多少效率呢？我也想试试",
            time: "2.8小时前",
          },
          {
            id: "c3-r2",
            author: "Puzle",
            content:
              '提示词设计确实需要不断练习和迭代。根据我的观察，掌握这些技巧后通常能获得 2-3 倍的效率提升：\n\n**具体化描述**：避免模糊表达，明确告诉AI你需要什么格式、风格、长度。比如说"总结"和"用300字总结成中学生能理解的语言"效果完全不同\n\n**示例引导**：提供1-2个样例，让AI理解你的期望输出。这比长篇描述更有效\n\n**角色设定**：给AI一个明确角色（如专家、导师），会得到更专业的回答\n\n**迭代优化**：首次输出不满意就追问，引导AI逐步改进\n\n多实践，你会逐渐建立起自己的提示词模式库。',
            time: "2.5小时前",
            voteStatus: null,
            replies: [
              {
                id: "c3-r2-r1",
                author: "我",
                content: "具体化描述和示例引导这两点最有帮助，我现在每次都用",
                time: "2小时前",
              },
              {
                id: "c3-r2-r2",
                author: "杜海",
                content: "谢谢！我也要开始记录一些好的提示词了",
                time: "1.8小时前",
              },
              {
                id: "c3-r2-r3",
                author: "何晓",
                content: "这些技巧对做内容创作特别有用，我已经在用了",
                time: "1.5小时前",
              },
            ],
          },
        ],
      },
      {
        id: "c4",
        author: "我",
        content: "提示词库这个想法不错，我准备用Notion建一个",
        time: "2小时前",
        replies: [
          {
            id: "c4-r1",
            author: "Puzle",
            content:
              "Notion确实很适合做提示词管理。建议的组织结构：\n\n**按场景分类**：\n• 写作类：文章大纲、内容扩写、润色修改\n• 代码类：调试分析、代码重构、文档生成\n• 分析类：数据解读、市场研究、竞品分析\n• 创意类：头脑风暴、方案设计、营销文案\n\n**每个提示词记录**：\n• 适用场景和目标\n• 完整的提示词模板\n• 实际效果示例\n• 优化迭代记录\n\n这样建立的知识库会越用越好用。",
            time: "1.5小时前",
            voteStatus: null,
            replies: [
              {
                id: "c4-r1-r1",
                author: "我",
                content: "好详细，马上开始整理！",
                time: "1小时前",
              },
              {
                id: "c4-r1-r2",
                author: "林芳",
                content:
                  "我之前用 Excel 存提示词，现在打算迁移到 Notion，有现成的模板吗？",
                time: "58分钟前",
              },
              {
                id: "c4-r1-r3",
                author: "Puzle",
                content:
                  "模板的话可以在 Notion 社区里找到一些不错的。但我建议根据自己的工作流程定制：\n\n1. **复制 Notion 官方模板作为基础**\n2. **增加自己需要的字段**（如效果评分、适用工具等）\n3. **定期回顾和优化**（什么提示词最有效，定期整理）\n\n好的知识库是逐步打磨出来的，不用完美，但要实用。",
                time: "55分钟前",
                voteStatus: null,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "6",
    title: "从零开始学习深度学习：神经网络基础和框架实战指南",
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
        content:
          "这篇指南的内容结构很完整，适合系统化学习：\n\n**理论基础**：\n• 神经网络的工作原理：前向传播和反向传播\n• 激活函数的作用和选择\n• 损失函数与优化算法（SGD、Adam等）\n\n**实践框架**：\n• PyTorch/TensorFlow的选择和入门\n• 模型搭建的基本流程\n• 调参技巧和常见问题解决\n\n**学习路径建议**：\n1. 先理解感知机、线性回归等简单模型\n2. 掌握梯度下降的数学原理\n3. 动手实现一个简单的神经网络\n4. 逐步学习CNN、RNN等进阶结构\n\n配合吴恩达的课程和动手实践，效果会更好。关键是要把数学原理和代码实现结合起来理解。",
        time: "5天前",
        voteStatus: null,
      },
      {
        id: "c2",
        author: "我",
        content: "作为入门教程写得很详细",
        time: "4天前",
      },
    ],
  },
  {
    id: "7",
    title: "Notion AI 推出全新协作功能提升团队工作效率和文档管理",
    content:
      "Notion 宣布推出 AI 协作助手，可以自动生成会议纪要、整理文档结构，并提供智能写作建议。这次更新让团队协作效率提升了一个新台阶...",
    source: "产品沉思录",
    time: "1天前",
    timestamp: now - 1 * oneDay,
    isDiscussed: true,
    imageUrl:
      "https://images.unsplash.com/photo-1633613286991-611fe299c4be?w=800&h=400&fit=crop",
    puzleReply:
      "Notion AI 的这次更新很有意思，几个亮点值得关注：\n\n**会议纪要自动化**：从录音到结构化文档，减少大量手动整理工作\n**文档智能优化**：自动调整结构、补充内容、优化表达\n**多人协作增强**：AI 可以理解团队上下文，提供更精准的建议\n\n这种深度集成的 AI 能力，比单独的 ChatGPT 更贴合实际工作场景。",
    type: "link",
    originalUrl: "https://pmthinking.com/notion-ai-collaboration",
    comments: [
      {
        id: "c1",
        author: "Puzle",
        content:
          "Notion AI 的这次更新很有意思，几个亮点值得关注：\n\n**会议纪要自动化**：从录音到结构化文档，减少大量手动整理工作。不仅能转写语音，还能识别关键决策点、待办事项、负责人，直接生成可执行的任务列表。\n\n**文档智能优化**：自动调整结构、补充内容、优化表达。比如写完一篇文档草稿，AI 会建议添加目录、调整段落顺序、补充遗漏的细节。\n\n**多人协作增强**：AI 可以理解团队上下文，提供更精准的建议。它知道你们团队的术语、工作流程、常用模板，给出的建议更接地气。\n\n**场景化落地**：这种深度集成的 AI 能力，比单独打开 ChatGPT 对话要高效得多。工具和场景的结合才是 AI 应用的正确姿势。",
        time: "20小时前",
        voteStatus: null,
      },
      {
        id: "c2",
        author: "我",
        content: "会议纪要自动化这个太实用了！",
        time: "18小时前",
        quotedText:
          "Notion 宣布推出 AI 协作助手，可以自动生成会议纪要、整理文档结构，并提供智能写作建议...",
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
            content:
              "如果你们团队已经在用 Notion，这次更新确实很值得期待。几个实用建议：\n\n**会议场景优化**：\n• 提前准备会议大纲模板，AI 会按照你的结构生成纪要\n• 录音时注意环境噪音，影响转写质量\n• 会后立即生成纪要并分享，趁记忆清晰时补充细节\n\n**文档协作技巧**：\n• 建立团队知识库，AI 会学习你们的表达习惯\n• 使用统一的标签和分类，方便 AI 理解上下文\n• 让 AI 帮忙整理散乱的想法，但关键决策还是要人来把关\n\n**成本考量**：AI 功能通常需要额外付费，评估一下团队规模和使用频率，算算 ROI 是否划算。如果能节省大量重复劳动，还是很值的。",
            time: "12小时前",
            voteStatus: null,
            replies: [
              {
                id: "c3-r1-r1",
                author: "我",
                content: "成本这块确实要考虑，我先申请试用看看效果",
                time: "10小时前",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "8",
    title: "苹果 Vision Pro 使用一个月真实体验报告及应用场景探讨",
    content:
      "从拿到设备到现在一个月，Vision Pro 给我带来了不少惊喜，但也有一些明显的局限。这篇文章分享我的真实使用感受和应用场景...",
    source: "爱范儿",
    time: "3天前",
    timestamp: now - 3 * oneDay,
    isDiscussed: true,
    imageUrl:
      "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=800&h=400&fit=crop",
    puzleReply:
      "Vision Pro 作为第一代产品，优缺点都很明显。从这篇体验来看，几个关键点：\n\n**空间计算体验**：手势操作流畅度超预期，虚拟屏幕的清晰度很高\n**应用生态**：原生应用还不够丰富，但 iPad 应用兼容性不错\n**使用场景**：观影、工作效率场景体验最好，长时间佩戴还是会累\n\nVision Pro 更像是空间计算的起点，而非终点。",
    type: "link",
    originalUrl: "https://www.ifanr.com/vision-pro-one-month-review",
    comments: [
      {
        id: "c1",
        author: "Puzle",
        content:
          "Vision Pro 作为第一代产品，优缺点都很明显。从这篇体验来看，几个关键点：\n\n**空间计算体验**：手势操作的流畅度超出预期，眼动追踪精准度很高。虚拟屏幕的清晰度达到了 4K 级别，文字阅读完全没问题。空间音频的沉浸感也处理得很好。\n\n**应用生态现状**：原生应用数量还不够多，大厂适配速度偏慢。但好在 iPad 应用的兼容性做得不错，基本的生产力工具都能跑。游戏方面还比较欠缺，期待后续更新。\n\n**实际使用场景**：\n• 观影体验确实震撼，相当于随身带着巨幕影院\n• 多虚拟屏幕办公很提效，但长时间佩戴颈部会酸\n• 3D 内容创作很有想象空间，设计师会很喜欢\n• 社交应用还在早期，虚拟形象的表情捕捉需要改进\n\n**产品定位思考**：Vision Pro 更像是空间计算的起点，而非终点。苹果在用第一代产品验证方向、培养生态、积累数据。真正的大众化产品可能要等到第三代，价格更亲民、重量更轻、生态更完善。",
        time: "3天前",
        voteStatus: null,
      },
      {
        id: "c2",
        author: "我",
        content: "价格确实劝退，但技术方向很有前景",
        time: "2天前",
        quotedText:
          "从拿到设备到现在一个月，Vision Pro 给我带来了不少惊喜，但也有一些明显的局限...",
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
            content:
              "多虚拟屏幕写代码确实有优势，但要看使用场景：\n\n**优势方面**：\n• 可以同时展开多个窗口：代码编辑器、终端、文档、浏览器\n• 屏幕尺寸和位置随意调整，比物理显示器灵活\n• 环境隔离效果好，专注度更高\n\n**局限方面**：\n• 键盘操作需要低头看键盘，频繁视线切换会不适\n• 长时间佩戴的舒适度还是不如直接看显示器\n• 虚拟键盘打字体验差，还是得用实体键盘\n\n**实用建议**：\n如果是短时间专注编码（1-2小时），体验还不错。但一整天工作还是物理屏幕更舒服。Vision Pro 更适合作为移动办公的补充，比如在咖啡馆、飞机上需要多屏工作的场景。",
            time: "1天前",
            voteStatus: null,
            replies: [
              {
                id: "c3-r1-r1",
                author: "我",
                content: "明白了，移动办公场景确实是个好应用",
                time: "1天前",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "3",
    title: "Google I/O 开发者大会重磅发布 Gemini 新能力和开发者工具",
    content:
      "Google 发布了多项开发者工具和AI服务的重大更新，包括 Gemini 模型的性能提升、新版本的 Android Studio 等...",
    source: "Google Developers",
    time: "8小时前",
    timestamp: now - 8 * oneHour,
    isDiscussed: false,
    imageUrl:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
    type: "link",
    originalUrl: "https://developers.google.com/io-highlights",
    comments: [
      {
        id: "c1",
        author: "Puzle",
        content:
          "Google I/O 2024 的主题聚焦在几个关键方向：\n\n**Gemini 模型升级**：新版本的多模态能力更强，特别是在代码理解和生成方面有显著提升。对开发者来说，这意味着更高效的编码辅助工具。\n\n**开发者工具改进**：Android Studio 的新版本集成了更多 AI 能力，包括代码补全、Bug 检测和性能分析。\n\n**生态建设**：开放更多 AI API 给开发者，降低 AI 应用开发的门槛。这对开发者社区是个好消息。",
        time: "7小时前",
        voteStatus: null,
      },
    ],
  },
  {
    id: "4",
    title: "分布式团队远程工作效率提升指南",
    content:
      "在分布式团队中保持高效沟通和协作的实用策略，涵盖工具选择、团队文化建设等方面...",
    source: "雷锋网",
    time: "12小时前",
    timestamp: now - 12 * oneHour,
    isDiscussed: true,
    imageUrl:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop",
    type: "link",
    originalUrl: "https://www.leiphone.com/remote-work-efficiency",
    comments: [
      {
        id: "c1",
        author: "Puzle",
        content:
          "远程工作的效率提升确实需要系统的方法论。文章提到的几个重点很有价值：\n\n**协同工具选择**：从简单的视频通话到项目管理，工具不是越多越好，要建立核心流程\n**异步沟通规范**：明确响应时间、文档化重要决策，避免信息丢失\n**绩效评估标准**：从可量化指标转向结果导向，减少过程管控\n\n补充一个点：建立虚拟水冷却器(digital watercooler)，保持团队的社交连接和文化传承。",
        time: "10小时前",
        voteStatus: null,
      },
      {
        id: "c2",
        author: "我",
        content: "异步沟通规范很重要，但怎么把握好度和响应速度",
        time: "9小时前",
      },
    ],
  },
  {
    id: "5",
    title: "2024 年移动应用UI设计最新趋势和用户体验创新方向",
    content:
      "微交互动画、AI 驱动的个性化和增强现实等新技术正在重塑移动应用的用户体验。本文分析了最新的设计趋势...",
    source: "MobilityWare",
    time: "18小时前",
    timestamp: now - 18 * oneHour,
    isDiscussed: false,
    imageUrl:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop",
    type: "link",
    originalUrl: "https://mobilityware.com/mobile-design-trends-2024",
    comments: [
      {
        id: "c1",
        author: "Puzle",
        content:
          "2024 年移动应用设计的几个关键趋势很值得关注：\n\n**微交互动画**：不仅仅是装饰，而是提升用户体验的关键。好的微交互能让用户更清楚地理解应用的反馈和状态变化。\n\n**AI 驱动个性化**：每个用户看到的内容、布局甚至交互方式都可以动态调整。这对提升用户留存率很有帮助。\n\n**增强现实（AR）**：已经从新鲜概念进化到实际应用阶段。电商、导航、家居等领域都在积极探索。\n\n**深色模式和无障碍**：从可选功能升级为必须考虑的设计要素。\n\n这些趋势背后的核心是：更加人性化、更加个性化、更加包容的设计理念。",
        time: "17小时前",
        voteStatus: null,
      },
    ],
  },
  {
    id: "9",
    title: "投资区块链项目的全面风险评估框架和投资决策指南",
    content:
      "在投资区块链项目时，如何进行全面的风险评估，包括技术风险、市场风险、团队风险和监管风险等方面的分析...",
    source: "36氪",
    time: "4天前",
    timestamp: now - 4 * oneDay,
    isDiscussed: true,
    type: "link",
    originalUrl: "https://36kr.com/blockchain-investment-risks",
    comments: [
      {
        id: "c1",
        author: "Puzle",
        content:
          "区块链投资的风险评估确实需要系统化的方法。几个关键考察点：\n\n**技术层面**：\n• 代码审计是否完整？是否有安全漏洞？\n• 技术文档是否齐全？Codebase 存储在哪？\n• 是否经过多次审计？\n\n**团队背景**：\n• 创始团队的区块链经验是否足够？\n• 顾问团队的质量和专业度如何？\n• 是否有足够的研发投入？\n\n**经济模型**：\n• Tokenomics 设计是否合理？\n• 激励机制是否可持续？\n• 有没有明确的路线图和里程碑？\n\n记住一句话：只有理解了项目，才有可能发现价值。",
        time: "4天前",
        voteStatus: null,
      },
    ],
  },
  {
    id: "10",
    title: "ESG 投资理念全球实践应用案例及可持续发展投资策略",
    content:
      "ESG (环境、社会、治理) 投资理念在全球范围内的实践案例分析，如何在投资决策中实现可持续发展目标...",
    source: "经济观察报",
    time: "6天前",
    timestamp: now - 6 * oneDay,
    isDiscussed: false,
    imageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop",
    type: "link",
    originalUrl: "https://eeo.com.cn/esg-investment-practice",
    comments: [
      {
        id: "c1",
        author: "Puzle",
        content:
          "ESG 投资从一个新兴概念演变成了主流实践，值得深入了解：\n\n**环境（E）**：关注碳排放、可再生能源、资源利用效率。气候变化已经成为全球投资者的重点考量因素。\n\n**社会（S）**：涵盖员工权益、劳动条件、社区关系。好的企业文化和员工满意度往往与长期业绩正相关。\n\n**治理（G）**：董事会构成、薪酬透明度、反腐机制。这是企业长期健康发展的基础。\n\n**投资实践建议**：\n• 不应该简单地选择 ESG 高分股票，而是要理解行业特性\n• ESG 好不一定意味着财务回报好，需要综合分析\n• 持续关注企业的 ESG 实际表现，而不仅仅是报告数据\n\nESG 投资的核心是可持续性，长期来看更符合价值投资的理念。",
        time: "5天前",
        voteStatus: null,
      },
    ],
  },
  {
    id: "11",
    title: "物联网设备安全风险分析与多层面防护策略探讨",
    content:
      "随着物联网设备的快速增长，设备安全、网络安全和数据隐私成为关键挑战。本文分析了主要安全风险和防护措施...",
    source: "Cybersecurity Today",
    time: "1周前",
    timestamp: now - 7 * oneDay,
    isDiscussed: true,
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
    type: "link",
    originalUrl: "https://cybersecurity.today/iot-security-risks",
    comments: [
      {
        id: "c1",
        author: "Puzle",
        content:
          "物联网安全是一个系统性问题，需要从多层面考虑：\n\n**设备层面**：固件更新机制、网络准入控制、物理安全设计\n**网络层面**：通信协议加密、异常流量检测、入侵防御系统\n**应用层面**：API 安全、数据传输保护、权限管理\n**管理层面**：设备资产管理、安全配置标准、应急响应计划\n\n关键是要建立安全生命周期管理，从设备设计研发就开始考虑安全，而不是事后补救。",
        time: "5天前",
        voteStatus: null,
      },
    ],
  },
  {
    id: "12",
    title: "前端性能优化实战指南：代码分割缓存策略和渲染优化",
    content:
      "从代码分割、缓存策略、渲染优化等多个角度，分享前端性能优化的实用技巧和最佳实践...",
    source: "掘金技术社区",
    time: "2周前",
    timestamp: now - 14 * oneDay,
    isDiscussed: false,
    imageUrl:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
    type: "link",
    originalUrl: "https://juejin.cn/frontend-performance-guide",
    comments: [
      {
        id: "c1",
        author: "Puzle",
        content:
          "前端性能优化是一个系统工程，需要从多个维度综合考虑：\n\n**代码分割（Code Splitting）**：\n• 按路由拆分，减少初始加载体积\n• 按功能拆分，按需加载\n• 分离第三方库和业务代码\n\n**缓存策略**：\n• 浏览器缓存：合理设置 Cache-Control、ETag\n• 应用级缓存：使用 Service Worker 和本地存储\n• CDN 缓存：静态资源部署到 CDN\n\n**渲染优化**：\n• 关键路径优化：内联关键 CSS，延迟加载非关键资源\n• 使用虚拟列表处理大数据量\n• 避免强制重排和重绘\n\n**监测和持续改进**：\n• 使用 Lighthouse、WebPageTest 定期检测\n• 建立性能基准和告警机制\n• Core Web Vitals 已成为搜索排名因素\n\n关键是要把性能作为一个持续的工程实践，而不是一次性的优化。",
        time: "13天前",
        voteStatus: null,
      },
    ],
  },
  {
    id: "13",
    title: "AI 芯片架构设计深度解析：TPU GPU ASIC 对比与应用场景",
    content:
      "介绍TPU、GPU和ASIC等AI芯片的工作原理、架构特点和应用场景，以及未来发展趋势...",
    source: "半导体新闻",
    time: "10天前",
    timestamp: now - 10 * oneDay,
    isDiscussed: true,
    type: "link",
    originalUrl: "https://semi.news/ai-chip-architecture",
    comments: [
      {
        id: "c1",
        author: "Puzle",
        content:
          "AI 芯片的发展确实很有趣，每个类型都有自己的定位：\n\n**GPU的灵活性**：通用计算，适合多样化算法的快速迭代\n**TPU的效率**：专用设计，矩阵运算优化，推理性能卓越\n**ASIC的定制**：按需定制，功耗和性能最优，但灵活性较差\n\n百度昆仑芯、华为昇腾等方式很不错的思路，将通用性和专用性结合起来，既保证性能又保持灵活性。",
        time: "9天前",
        voteStatus: null,
      },
    ],
  },
  {
    id: "14",
    title: "量子计算商业化进展报告：IBM Google 和初创企业最新突破",
    content:
      "IBM、Google、Rigetti等量子计算公司的最新进展，包括量子优势实现、可编程量子计算机的发布等...",
    source: "MIT Technology Review",
    time: "3周前",
    timestamp: now - 21 * oneDay,
    isDiscussed: false,
    imageUrl:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop",
    type: "link",
    originalUrl: "https://mitkr.com/quantum-commerce-progress",
    comments: [
      {
        id: "c1",
        author: "Puzle",
        content:
          "量子计算从理论走向实践，近期进展确实令人鼓舞：\n\n**量子优势的实现**：Google 宣布在特定问题上实现量子优势，虽然实用性还有争议，但从科学验证的角度很重要。\n\n**错误纠正的突破**：量子计算的最大挑战是错误率。最近的进展表明，通过冗余和编码，可以在更大的系统中保持量子信息的稳定性。\n\n**商业应用探索**：\n• 药物发现和分子模拟\n• 金融风险建模\n• 优化问题求解\n• 机器学习加速\n\n**当前的现实困境**：\n• 量子比特数仍然有限（数百到数千级别）\n• 操作时间短，需要极低的温度环境\n• 实用应用还需要 5-10 年的发展\n\n量子计算的未来充满机遇，但不应过度乐观。现在更多的是产业摸索阶段，真正的革命可能还要等待。",
        time: "20天前",
        voteStatus: null,
      },
    ],
  },
];
