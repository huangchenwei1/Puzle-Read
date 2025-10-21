import { BrowserRouter, Routes, Route } from "react-router-dom"
import ArticleList from "./pages/ArticleList"
import ArticleDetail from "./pages/ArticleDetail"
import ArticleEdit from "./pages/ArticleEdit"
import ArticleSource from "./pages/ArticleSource"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/article/new" element={<ArticleEdit />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/article/:id/source" element={<ArticleSource />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
