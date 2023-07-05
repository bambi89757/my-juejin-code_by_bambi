import React from "react";
import Transfer from "./pages/Transfer-2019-12-30.jsx";
import './assets/css/base.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout.jsx";
import HomePage from "./layouts/homePage.jsx";
import ContentPage from "./layouts/ContentPage.jsx";
import NoFound from "./layouts/404.jsx";
import Marker from "./pages/marker/Marker-2023-07-02.jsx";
import BlogPage from "./layouts/BlogPage.jsx";

const App = () => {
    return (
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/content" element={<ContentPage />}>
              <Route path="transfer" element={<Transfer />} />
              <Route path="marker" element={<Marker />} />
              <Route path="*" element={<NoFound />} />
            </Route>
            <Route path="/blog" element={<BlogPage />} />
            <Route path="*" element={<NoFound />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    );
  };

export default App;