import React, { useState, useEffect } from 'react';

const FigmaReactTest = () => {
  const [testResult, setTestResult] = useState('正在导入 figma-react...');
  const [figmaComponents, setFigmaComponents] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 使用动态导入来避免Vite构建时解析问题
    const loadFigmaReact = async () => {
      try {
        // 尝试多种导入方式
        let module = null;

        try {
          // 方式1: 尝试相对路径导入
          module = await import('../../../figma-react/dist/index.esm.js');
        } catch (e1) {
          console.log('相对路径导入失败:', e1.message);
          throw new Error(`相对路径导入失败: ${e1.message}`);
        }

        console.log('成功导入 figma-react/layout:', module);
        setTestResult('✅ 成功导入真正的 figma-react/layout 库');
        setFigmaComponents(module);
        setIsLoading(false);
      } catch (error) {
        console.error('导入 figma-react/layout 失败:', error);
        setError(error.message);
        setTestResult(`❌ 导入失败: ${error.message}`);
        setIsLoading(false);
      }
    };

    loadFigmaReact();
  }, []);

  // 如果正在加载，显示加载状态
  if (isLoading) {
    return (
      <div style={{ padding: '20px', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <h1>Figma React Layout 组件测试</h1>
        <div style={{
          padding: '20px',
          backgroundColor: '#e3f2fd',
          borderRadius: '8px',
          border: '2px solid #2196f3'
        }}>
          <p><strong>正在导入 figma-react 组件...</strong></p>
        </div>
      </div>
    );
  }

  // 如果导入失败，显示错误状态
  if (!figmaComponents) {
    return (
      <div style={{ padding: '20px', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <h1>Figma React Layout 组件测试</h1>
        <div style={{
          padding: '20px',
          backgroundColor: '#ffebee',
          borderRadius: '8px',
          border: '2px solid #f44336'
        }}>
          <h3>导入失败</h3>
          <p>{testResult}</p>
          {error && <p><strong>错误详情：</strong>{error}</p>}
        </div>
      </div>
    );
  }

  // 解构导入的组件
  const { StyleProvider, Box, Column, Row, ZStack } = figmaComponents;

  return (
    <StyleProvider>
      <div style={{ padding: '20px', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <h1>Figma React Layout 组件实际效果测试</h1>

        {/* 模块导入状态 */}
        <section style={{ marginBottom: '40px' }}>
          <h2>✅ 模块导入成功</h2>
          <div style={{
            padding: '16px',
            backgroundColor: '#e8f5e8',
            borderRadius: '8px',
            border: '2px solid #4caf50'
          }}>
            <p><strong>状态：</strong> {testResult}</p>
            <p><strong>📦 可用组件：</strong> {Object.keys(figmaComponents).filter(key =>
              ['StyleProvider', 'Box', 'Column', 'Row', 'ZStack'].includes(key)
            ).join(', ')}</p>
            <p><strong>🎯 现在开始测试真正的 figma-react 组件：</strong></p>
          </div>
        </section>

        {/* 简单的 Box 组件测试 */}
        <section style={{ marginBottom: '40px' }}>
          <h2>📦 Box 组件 - 简单测试</h2>
          <Box
            width="300px"
            height="150px"
            fill="#e3f2fd"
            padding="20px"
            radius="8px"
          >
            <h3 style={{ margin: '0 0 10px 0', color: '#1976d2', fontSize: '16px' }}>Figma React Box</h3>
            <p style={{ margin: 0, color: '#424242', fontSize: '12px' }}>
              这是一个真正的 figma-react Box 组件！
            </p>
          </Box>
        </section>

        {/* 简单的 Column 组件测试 */}
        <section style={{ marginBottom: '40px' }}>
          <h2>📋 Column 组件 - 简单测试</h2>
          <Column
            width="300px"
            fill="#f3e5f5"
            padding="15px"
            radius="8px"
            gap="10px"
          >
            <Box
              width="100%"
              height="40px"
              fill="#9c27b0"
              radius="6px"
              alignment="center-center"
            >
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '12px' }}>元素 1</span>
            </Box>
            <Box
              width="100%"
              height="40px"
              fill="#ba68c8"
              radius="6px"
              alignment="center-center"
            >
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '12px' }}>元素 2</span>
            </Box>
          </Column>
        </section>

        {/* 简单的 Row 组件测试 */}
        <section style={{ marginBottom: '40px' }}>
          <h2>➡️ Row 组件 - 简单测试</h2>
          <Row
            width="300px"
            fill="#e8f5e8"
            padding="15px"
            radius="8px"
            gap="8px"
          >
            <Box
              width="50px"
              height="50px"
              fill="#4caf50"
              radius="6px"
              alignment="center-center"
            >
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '12px' }}>A</span>
            </Box>
            <Box
              width="50px"
              height="50px"
              fill="#66bb6a"
              radius="6px"
              alignment="center-center"
            >
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '12px' }}>B</span>
            </Box>
            <Box
              width="50px"
              height="50px"
              fill="#81c784"
              radius="6px"
              alignment="center-center"
            >
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '12px' }}>C</span>
            </Box>
          </Row>
        </section>

        {/* 按钮组 */}
        <section style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => window.history.back()}
            style={{
              padding: '12px 24px',
              backgroundColor: '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            返回
          </button>

          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              backgroundColor: '#ff9800',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            刷新测试
          </button>
        </section>
      </div>
    </StyleProvider>
  );
};

export default FigmaReactTest;
