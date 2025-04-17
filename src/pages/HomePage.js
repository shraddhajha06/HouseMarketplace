import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import "../styles/homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const img1 = "https://media.istockphoto.com/id/876864896/photo/luxurious-new-construction-home-in-bellevue-wa.webp?b=1&s=170667a&w=0&k=20&c=HHYUMi4AIyjPq-JZAmzz_HY37rvQV1hWfNEMnzCmYr0=";
  const img2 = "https://media.istockphoto.com/id/899471458/photo/purchase-agreement-for-new-house.webp?b=1&s=170667a&w=0&k=20&c=YuYOh4uAK_BcOloalnWIqzRRvJC1H9CGzutgWeTmrWg=";
  
  return (
    <Layout>
      <div className="container mt-4">
        <div className="row">
          <h1 className="text-center mb-4">Find Your Perfect Home</h1>
          <div className="col-md-6 mb-4">
            <div className="image-container position-relative">
              <img 
                src={img1} 
                alt="Rent" 
                className="img-fluid rounded shadow"
                style={{ width: "100%", height: "300px", objectFit: "cover" }} 
              />
              <button 
                className="btn btn-primary position-absolute bottom-0 start-50 translate-middle-x mb-3"
                onClick={() => navigate("/category/rent")}
              >
                TO RENT
              </button>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="image-container position-relative">
              <img 
                src={img2} 
                alt="Sale" 
                className="img-fluid rounded shadow"
                style={{ width: "100%", height: "300px", objectFit: "cover" }} 
              />
              <button 
                className="btn btn-primary position-absolute bottom-0 start-50 translate-middle-x mb-3"
                onClick={() => navigate("/category/sale")}
              >
                TO SALE
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;