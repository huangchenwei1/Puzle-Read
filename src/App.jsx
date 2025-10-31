import { useState } from 'react';
import ArticleList from './pages/ArticleList';
import ArticleDetail from './pages/ArticleDetail';

function App() {
  const [currentPage, setCurrentPage] = useState('list');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setCurrentPage('detail');
  };

  const handleBack = () => {
    setCurrentPage('list');
    setSelectedArticle(null);
  };

  return (
    <>
      {currentPage === 'list' && (
        <ArticleList onArticleClick={handleArticleClick} />
      )}
      {currentPage === 'detail' && (
        <ArticleDetail article={selectedArticle} onBack={handleBack} />
      )}
    </>
  );
}

export default App;

