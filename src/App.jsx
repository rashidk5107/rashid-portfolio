
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Users from './pages/users/Users';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import Products from './pages/products/Product';
import AddProduct from './pages/products/AddProduct';
import UserDetails from './pages/users/UserDetails';
import EditUser from './pages/users/EditUser';
import ProductLayout from './layouts/ProductLayout';
import NewsLayout from './layouts/NewsLayout';
import { ToastContainer } from 'react-toastify';
import ProductDetails from './pages/products/ProductDetails';
import EditProduct from './pages/products/EditProduct';
import AddUser from './pages/users/AddUser';
import UsersLayout from './layouts/UserLayout';
import AddNews from './pages/news/AddNews';
import EditNews from './pages/news/EditNews';
import NewsDetails from './pages/news/NewsDetails';
import NewsList from './pages/news/NewsList';
import Login from './pages/auth/Login';
import CreateNotice from './pages/notice/CreateNotice';
import NoticeLayout from './layouts/NoticeLayout';
import Notice from './pages/notice/Notice';
import ReadNotice from './pages/notice/ReadNotice';
import UpdateNotice from './pages/notice/UpdateNotice';
function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            {/* Nested Routes */}
            <Route path="" element={<DashboardHome />} />

            {/* Nested Users Routes */}
            <Route path="users" element={<UsersLayout />}>
              <Route index element={<Users />} />
              <Route path="add-user" element={<AddUser />} />
              <Route path="view-user/:userId" element={<UserDetails />} />
              <Route path="edit-user/:userId" element={<EditUser />} />
            </Route>

            {/* Nested Users Routes */}
            <Route path="products" element={<ProductLayout />}>
              <Route index element={<Products />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="view-product/:id" element={<ProductDetails />} />
              <Route path="edit-product/:id" element={<EditProduct />} />
            </Route>

            <Route path="news" element={<NewsLayout />}>
              <Route index element={<NewsList />} />
              <Route path="add-news" element={<AddNews />} />
              <Route path="view-news/:id" element={<NewsDetails />} />
              <Route path="edit-news/:id" element={<EditNews />} />
            </Route>
            
            <Route path="notice" element={<NoticeLayout/>}>
              <Route index element={<Notice />} />
              <Route path="add-notice" element={<CreateNotice />} />
              <Route path="view-notice/:id" element={<ReadNotice />} />
              <Route path="edit-notice/:id" element={<UpdateNotice />} />
            </Route>


          </Route>

        </Routes>
      </Router>
    </>

  );
}

export default App;