import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes/routes';
import MainLayout from './Layouts/MainLayout/MainLayout';
import { Fragment } from 'react';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;

                        let Layout = MainLayout;

                        //   if (route.component === Product) {
                        //     return (
                        //         <Route
                        //             key={index}
                        //             path="/product/:nameproduct"
                        //             element={
                        //                 <Layout>
                        //                     <ProductDetail />
                        //                 </Layout>
                        //             }
                        //         />
                        //     );
                        // }

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
