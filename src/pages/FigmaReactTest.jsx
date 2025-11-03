import React, { useState } from 'react';

const FigmaReactTest = () => {
  const [testResult, setTestResult] = useState('正在测试导入...');

  React.useEffect(() => {
    // 测试导入
    import('@figma-react/layout')
      .then((module) => {
        console.log('成功导入 figma-react/layout:', module);
        setTestResult('✅ 成功导入 figma-react/layout 模块');
      })
      .catch((error) => {
        console.error('导入 figma-react/layout 失败:', error);
        setTestResult(`❌ 导入失败: ${error.message}`);
      });
  }, []);

  return (
    <div style={{ padding: '20px', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <h1>Figma React Layout 测试页面</h1>

      <section style={{ marginBottom: '40px' }}>
        <h2>模块导入测试</h2>
        <div style={{
          padding: '20px',
          backgroundColor: '#e3f2fd',
          borderRadius: '8px',
          border: '2px solid #2196f3'
        }}>
          <p><strong>测试结果：</strong> {testResult}</p>
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>原生 React 组件测试（对照）</h2>
        <div style={{
          width: '300px',
          height: '150px',
          backgroundColor: '#f3e5f5',
          padding: '20px',
          borderRadius: '8px',
          border: '2px solid #9c27b0'
        }}>
          <h3>原生 React 组件</h3>
          <p>这是一个原生 React 组件，确保 React Hook 正常工作。</p>
        </div>
      </section>

      <section>
        <button
          onClick={() => window.history.back()}
          style={{
            padding: '12px 24px',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          返回
        </button>
      </section>
    </div>
  );
};

export default FigmaReactTest;