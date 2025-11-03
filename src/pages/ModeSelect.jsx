import { Box, Typography, Card } from '@mui/material';
import BoltOutlined from '@mui/icons-material/BoltOutlined';
import ArticleOutlined from '@mui/icons-material/ArticleOutlined';
import LayersOutlined from '@mui/icons-material/LayersOutlined';

const ModeSelect = ({ onSelectMode }) => {
  const modes = [
    {
      id: 'speed',
      name: '速读',
      description: '快速浏览模式，查看 Puzle 的精华评论和讨论',
      icon: BoltOutlined,
      color: 'var(--color-gray-100)',
    },
    {
      id: 'read',
      name: '精读',
      description: '精读模式，点击高亮文本查看 Puzle 的深度解读',
      icon: ArticleOutlined,
      color: 'var(--color-gray-100)',
    },
    {
      id: 'deep',
      name: '深度阅读',
      description: '深度阅读模式，结合快速浏览和精读的完整体验',
      icon: LayersOutlined,
      color: 'var(--color-gray-100)',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-gray-0)',
        padding: '20px',
      }}
    >
      {/* 标题 */}
      <Typography
        sx={{
          fontSize: '24px',
          fontWeight: 600,
          color: 'var(--color-gray-100)',
          marginBottom: '12px',
        }}
      >
        选择阅读模式
      </Typography>

      <Typography
        sx={{
          fontSize: '14px',
          color: 'var(--color-gray-60)',
          marginBottom: '32px',
        }}
      >
        选择最适合你的阅读方式
      </Typography>

      {/* 模式卡片列表 */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {modes.map((mode) => {
          const IconComponent = mode.icon;
          return (
            <Card
              key={mode.id}
              onClick={() => onSelectMode(mode.id)}
              sx={{
                padding: '24px',
                backgroundColor: 'var(--color-gray-0)',
                border: '1px solid var(--color-gray-40)',
                borderRadius: '12px',
                boxShadow: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: 'var(--color-gray-60)',
                  transform: 'translateY(-2px)',
                  backgroundColor: 'var(--color-gray-10)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                {/* 图标 */}
                <Box
                  sx={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--color-gray-20)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <IconComponent
                    sx={{
                      fontSize: 28,
                      color: mode.color,
                    }}
                  />
                </Box>

                {/* 文字内容 */}
                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{
                      fontSize: '18px',
                      fontWeight: 600,
                      color: 'var(--color-gray-100)',
                      marginBottom: '8px',
                    }}
                  >
                    {mode.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      lineHeight: 1.6,
                      color: 'var(--color-gray-70)',
                    }}
                  >
                    {mode.description}
                  </Typography>
                </Box>
              </Box>
            </Card>
          );
        })}
      </Box>

      {/* 底部提示 */}
      <Typography
        sx={{
          fontSize: '13px',
          color: 'var(--color-gray-60)',
          textAlign: 'center',
          marginTop: '40px',
        }}
      >
        你可以随时在设置中切换阅读模式
      </Typography>
    </Box>
  );
};

export default ModeSelect;

