import { useState } from 'react';
import Login from './pages/Login';
import ModeSelect from './pages/ModeSelect';
import ArticleList from './pages/ArticleList';
import ArticleDetail from './pages/ArticleDetail';
import ReadModeDetail from './pages/ReadModeDetail';
import DeepReadDetail from './pages/DeepReadDetail';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [readMode, setReadMode] = useState(null); // 'speed', 'read', 'deep'
  const [currentPage, setCurrentPage] = useState('list');
  const [selectedArticle, setSelectedArticle] = useState(null);

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
    setSelectedArticle(article);
    setCurrentPage('detail');
  };

  const handleBack = () => {
    setCurrentPage('list');
    setSelectedArticle(null);
  };

  // 根据模式渲染不同的详情页组件
  const renderDetailPage = () => {
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

  return (
    <>
      {currentPage === 'list' && (
        <ArticleList 
          onArticleClick={handleArticleClick}
          onChangeMode={handleChangeMode}
        />
      )}
      {currentPage === 'detail' && renderDetailPage()}
    </>
  );
}

export default App;

