import { useState } from 'react';
import Login from './pages/Login';
import ModeSelect from './pages/ModeSelect';
import ArticleList from './pages/ArticleList';
import ArticleDetail from './pages/ArticleDetail';
import ReadModeDetail from './pages/ReadModeDetail';
import DeepReadDetail from './pages/DeepReadDetail';
import FigmaReactTest from './pages/FigmaReactTest';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 开发环境下默认已登录
  const [readMode, setReadMode] = useState('speed'); // 开发环境下默认选择速读模式
  const [currentPage, setCurrentPage] = useState('list');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showFigmaTest, setShowFigmaTest] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSelectMode = (mode) => {
    setReadMode(mode);
  };

  const handleChangeMode = () => {
    setReadMode(null);
    setCurrentPage('list');
    setSelectedArticle(null);
  };

  const handleArticleClick = (article) => {
    console.log('🔍 App.handleArticleClick 被调用');
    console.log('- 接收到的文章:', article);
    console.log('- 当前页面状态:', currentPage);

    setSelectedArticle(article);
    setCurrentPage('detail');

    console.log('✅ 页面状态已更新');
    console.log('- 新的selectedArticle:', article);
    console.log('- 新的currentPage:', 'detail');
  };

  const handleBack = () => {
    if (showFigmaTest) {
      setShowFigmaTest(false);
    } else {
      setCurrentPage('list');
      setSelectedArticle(null);
    }
  };

  const handleShowFigmaTest = () => {
    setShowFigmaTest(true);
  };

  // 根据模式渲染不同的详情页组件
  const renderDetailPage = () => {
    console.log('🔍 renderDetailPage 被调用');
    console.log('- readMode:', readMode);
    console.log('- selectedArticle:', selectedArticle);

    switch (readMode) {
      case 'speed':
        return <ArticleDetail article={selectedArticle} onBack={handleBack} />;
      case 'read':
        return <ReadModeDetail article={selectedArticle} onBack={handleBack} />;
      case 'deep':
        return <DeepReadDetail article={selectedArticle} onBack={handleBack} />;
      default:
        return <ArticleDetail article={selectedArticle} onBack={handleBack} />;
    }
  };

  // 未登录显示登录页
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // 已登录但未选择模式，显示模式选择页
  if (!readMode) {
    return <ModeSelect onSelectMode={handleSelectMode} />;
  }

  console.log('🔍 App 组件渲染');
  console.log('- currentPage:', currentPage);
  console.log('- selectedArticle:', selectedArticle);
  console.log('- readMode:', readMode);

  return (
    <>
      {showFigmaTest ? (
        <FigmaReactTest />
      ) : (
        <>
          {currentPage === 'list' && (
            <ArticleList
              onArticleClick={handleArticleClick}
              onChangeMode={handleChangeMode}
              onShowFigmaTest={handleShowFigmaTest}
            />
          )}
          {currentPage === 'detail' && renderDetailPage()}
        </>
      )}
    </>
  );
}

export default App;

