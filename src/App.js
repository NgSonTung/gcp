import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes/routes';
import MainLayout from './Layouts/MainLayout/MainLayout';
import AdminLayout from './Layouts/AdminLayout';
import ProductDetail from './components/ProductDetail/ProductDetail';
import { Fragment } from 'react';
import SearchCatalog from './pages/SearchCatalog/SearchCatalog';
import Keyboard from './pages/Products/Keyboard/Keyboard';
import Laptop from './pages/Products/Laptop/Laptop';
import AllProducts from './pages/Products/AllProducts/AllProducts';
import ProductByCate from './pages/Products/ProductByCate/ProductByCate';
import Admin from '~/pages/Admin/Admin';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;

                        let Layout = MainLayout;
                        if (route.component === ProductDetail) {
                            return (
                                <Route
                                    key={index}
                                    path="/product/:nameproduct"
                                    element={
                                        <Layout>
                                            <ProductDetail />
                                        </Layout>
                                    }
                                />
                            );
                        }

                        if (route.component === Keyboard) {
                            return (
                                <Route
                                    key={index}
                                    path="/keyboard/:categoryName"
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        }

                        if (route.component === ProductByCate) {
                            return (
                                <Route
                                    key={index}
                                    path="/category/:categoryName"
                                    element={
                                        <Layout>
                                            <ProductByCate />
                                        </Layout>
                                    }
                                />
                            );
                        }

                        if (route.component === AllProducts) {
                            return (
                                <Route
                                    key={index}
                                    path="/:categoryName"
                                    element={
                                        <Layout>
                                            <AllProducts />
                                        </Layout>
                                    }
                                />
                            );
                        }

                        if (route.component === SearchCatalog) {
                            return <Route key={index} path="/searchcatalog" element={<SearchCatalog />} />;
                        }
                        if (route.component === Admin) {
                            return (
                                <Route
                                    key={index}
                                    path="/Admin"
                                    element={
                                        <AdminLayout>
                                            <Admin />
                                        </AdminLayout>
                                    }
                                />
                            );
                        }
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
