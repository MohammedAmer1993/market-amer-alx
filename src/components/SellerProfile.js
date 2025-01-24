// src/components/SellerProfile.js
import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Card, CardImg, CardBody, CardTitle, CardText } from "reactstrap";

const SellerProfile = ({ products }) => {
  const { sellerName } = useParams();
  const sellerProducts = products.filter((p) => p.seller === sellerName);

  if (sellerProducts.length === 0) {
    return <div>Seller not found.</div>;
  }

  // You can fetch more seller details from your backend (e.g., rating, description)
  // For now, we'll just display their products

  return (
    <div className="container">
      <h2>{sellerName}'s Profile</h2>
      <div className="row">
        {sellerProducts.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <Card>
              <CardImg top src={product.imageUrl} alt={product.name} />
              <CardBody>
                <CardTitle tag="h5">{product.name}</CardTitle>
                <CardText>${product.price}</CardText>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: state.product.products,
});

export default connect(mapStateToProps)(SellerProfile);
