import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Categories from './pages/Categories';
import CategoryPage from './pages/CategoryPage';
import ProductsIndex from './pages/ProductsIndex';
import ProductPage from './pages/ProductPage';
import { MarketsIndex, MarketPage } from './pages/Markets';
import { BlogIndex, BlogPostPage } from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';
import Wholesale from './pages/Wholesale';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:category" element={<CategoryPage />} />
        <Route path="/categories/:category/:subcategory" element={<CategoryPage />} />
        <Route path="/products" element={<ProductsIndex />} />
        <Route path="/products/:slug" element={<ProductPage />} />
        <Route path="/markets" element={<MarketsIndex />} />
        <Route path="/markets/:slug" element={<MarketPage />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/wholesale" element={<Wholesale />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
