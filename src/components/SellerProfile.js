import React from "react";
import { useParams, Link } from "react-router-dom"; // Import Link
import { connect } from "react-redux";
import { Card, CardImg, CardBody, CardTitle, CardText } from "reactstrap";

const SellerProfile = ({ products }) => {
  const { sellerName } = useParams();
  const sellerProducts = products.filter((p) => p.seller === sellerName);

  if (sellerProducts.length === 0) {
    return <div>Seller not found.</div>;
  }

  return (
    <div className="container">
      <h2>{sellerName}'s Profile</h2>
      <div className="row">
        {sellerProducts.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <Card>
              <Link to={`/product/${product.id}`}>
                {" "}
                {/* Wrap the card with Link */}
                <CardImg top src={product.imageUrl} alt={product.name} />
                <CardBody>
                  <CardTitle tag="h5">{product.name}</CardTitle>
                  <CardText>${product.price}</CardText>
                </CardBody>
              </Link>
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
