import { useState } from 'react';
import { Box, Typography, Button, Checkbox, FormControlLabel } from '@mui/material';

const Login = ({ onLogin }) => {
  const [agreed, setAgreed] = useState(false);

  const handleLogin = () => {
    if (agreed) {
      onLogin();
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-gray-0)',
        display: 'flex',
        flexDirection: 'column',
        padding: '0 20px',
      }}
    >
      {/* 顶部标题 */}
      <Box
        sx={{
          padding: '20px 0',
        }}
      >
        <Typography
          sx={{
            fontSize: '20px',
            fontWeight: 600,
            color: 'var(--color-gray-100)',
          }}
        >
          Puzle
        </Typography>
      </Box>

      {/* 介绍文字 */}
      <Typography
        sx={{
          fontSize: '18px',
          fontWeight: 400,
          color: 'var(--color-gray-100)',
          marginTop: '40px',
          marginBottom: '24px',
        }}
      >
        你好，我是 Puzle。
      </Typography>

      <Typography
        sx={{
          fontSize: '16px',
          lineHeight: 1.6,
          color: 'var(--color-gray-100)',
          marginBottom: '20px',
        }}
      >
        我是一名人工智能体，立志成为你的专属信息处理助手。帮你摆脱：
      </Typography>

      {/* 要点列表 */}
      <Box sx={{ marginBottom: '40px' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px' }}>
          <Typography sx={{ fontSize: '16px', marginRight: '8px' }}>•</Typography>
          <Typography sx={{ fontSize: '16px', lineHeight: 1.6, color: 'var(--color-gray-100)' }}>
            害怕错过又没时间看内容的焦虑😔
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px' }}>
          <Typography sx={{ fontSize: '16px', marginRight: '8px' }}>•</Typography>
          <Typography sx={{ fontSize: '16px', lineHeight: 1.6, color: 'var(--color-gray-100)' }}>
            手动整理内容的繁琐😬
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px' }}>
          <Typography sx={{ fontSize: '16px', marginRight: '8px' }}>•</Typography>
          <Typography sx={{ fontSize: '16px', lineHeight: 1.6, color: 'var(--color-gray-100)' }}>
            想不起、找不回内容的苦恼😥
          </Typography>
        </Box>
      </Box>

      <Typography
        sx={{
          fontSize: '16px',
          lineHeight: 1.6,
          color: 'var(--color-gray-100)',
          marginBottom: '40px',
        }}
      >
        为了能实现承诺，我需要先简单了解你一下。只需要花不到一分钟，回答几个问题或者提供一些资料即可。我们现在可以开始么？
      </Typography>

      {/* 底部按钮区域 */}
      <Box sx={{ marginTop: 'auto', paddingBottom: '40px' }}>
        {/* 勾选框 */}
        <FormControlLabel
          control={
            <Checkbox
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              sx={{
                color: 'var(--color-gray-60)',
                '&.Mui-checked': {
                  color: 'var(--color-gray-100)',
                },
              }}
            />
          }
          label={
            <Typography sx={{ fontSize: '14px', color: 'var(--color-gray-60)' }}>
              我已阅读并同意 《服务协议》和《隐私政策》
            </Typography>
          }
          sx={{ marginBottom: '16px' }}
        />

        {/* 使用微信账号登录按钮 */}
        <Button
          onClick={handleLogin}
          disabled={!agreed}
          fullWidth
          sx={{
            backgroundColor: 'var(--color-gray-100)',
            color: 'var(--color-gray-0)',
            padding: '14px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 600,
            textTransform: 'none',
            marginBottom: '12px',
            '&:hover': {
              backgroundColor: 'var(--color-gray-80)',
            },
            '&.Mui-disabled': {
              backgroundColor: 'var(--color-gray-40)',
              color: 'var(--color-gray-60)',
            },
          }}
        >
          使用微信账号登录
        </Button>

        {/* 游客登录按钮 */}
        <Button
          onClick={handleLogin}
          disabled={!agreed}
          fullWidth
          sx={{
            backgroundColor: 'transparent',
            color: 'var(--color-gray-100)',
            padding: '14px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 500,
            textTransform: 'none',
            border: '1px solid var(--color-gray-40)',
            '&:hover': {
              backgroundColor: 'var(--color-gray-20)',
            },
            '&.Mui-disabled': {
              backgroundColor: 'transparent',
              color: 'var(--color-gray-60)',
              borderColor: 'var(--color-gray-40)',
            },
          }}
        >
          游客登录
        </Button>
      </Box>
    </Box>
  );
};

export default Login;

