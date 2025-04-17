import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
import "../../styles/layout.css";

const Layout = ({ children, title }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "calc(100vh - 200px)", padding: "20px 0" }}>
        {children}
      </main>
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  title: "House Markteplace - search best home near you",
};

export default Layout;
