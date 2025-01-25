import React from "react";
import { useParams, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  CardSubtitle,
} from "reactstrap";

const ProductDetails = ({ products, addToCart }) => {
  const { productId } = useParams();
  const product = products.find((p) => p.id === parseInt(productId, 10));

  if (!product) {
    return <div>Product not found.</div>;
  }

  const similarProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <Card>
            <CardImg
              top
              src={product.imageUrl}
              alt={product.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "../../public/img_placeholder.jpg";
              }}
            />
          </Card>
        </div>
        <div className="col-md-6">
          <Card>
            <CardBody>
              <CardTitle tag="h5">{product.name}</CardTitle>
              <CardText>
                <p>Price: ${product.price}</p>
                <p>Seller: {product.seller}</p>
                <p>Description: {product.description}</p>
              </CardText>
              <Button onClick={() => addToCart(product)}>Add to Cart</Button>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Similar Products Section */}
      <h2>Similar Products</h2>
      <div className="row">
        {similarProducts.map((similarProduct) => (
          <div className="col-md-4 mb-4" key={similarProduct.id}>
            <Card>
              <Link to={`/product/${similarProduct.id}`}>
                <CardImg
                  top
                  src={similarProduct.imageUrl}
                  alt={similarProduct.name}
                />
                <CardBody>
                  <CardTitle tag="h5">{similarProduct.name}</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    ${similarProduct.price}
                  </CardSubtitle>
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

const mapDispatchToProps = (dispatch) => ({
  addToCart: (product) => dispatch({ type: "ADD_TO_CART", payload: product }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
