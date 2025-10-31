import { Dialog, DialogTitle, DialogContent, TextField, Button, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

const ImportDialog = ({ open, onClose }) => {
  const [url, setUrl] = useState('');

  const handleImport = () => {
    if (url.trim()) {
      console.log('导入链接:', url);
      // 这里只是UI展示，不实现实际功能
      setUrl('');
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '8px',
          boxShadow: 'none',
          border: '1px solid var(--color-gray-40)',
          margin: '16px',
        }
      }}
    >
      <DialogTitle
        sx={{
          borderBottom: '1px solid var(--color-gray-40)',
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ fontSize: '16px', fontWeight: 500, color: 'var(--color-gray-100)' }}>
          导入文章
        </Box>
        <IconButton
          onClick={onClose}
          sx={{
            padding: 0,
            color: 'var(--color-gray-60)',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ padding: '20px' }}>
        <TextField
          autoFocus
          fullWidth
          placeholder="请输入文章链接"
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          sx={{
            marginBottom: '20px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '4px',
              '& fieldset': {
                borderColor: 'var(--color-gray-40)',
              },
              '&:hover fieldset': {
                borderColor: 'var(--color-gray-60)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'var(--color-gray-100)',
                borderWidth: '1px',
              },
            },
          }}
        />
        <Box sx={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <Button
            onClick={onClose}
            sx={{
              textTransform: 'none',
              color: 'var(--color-gray-60)',
              border: '1px solid var(--color-gray-40)',
              padding: '6px 20px',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: 'var(--color-gray-20)',
                border: '1px solid var(--color-gray-40)',
              },
            }}
          >
            取消
          </Button>
          <Button
            onClick={handleImport}
            disabled={!url.trim()}
            sx={{
              textTransform: 'none',
              color: 'var(--color-gray-0)',
              backgroundColor: 'var(--color-gray-100)',
              padding: '6px 20px',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: 'var(--color-gray-80)',
              },
              '&.Mui-disabled': {
                backgroundColor: 'var(--color-gray-40)',
                color: 'var(--color-gray-60)',
              },
            }}
          >
            确认导入
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ImportDialog;

