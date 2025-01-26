import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
  Spinner,
  Alert,
} from "reactstrap";

const SellerProfile = ({ products, isLoading, error }) => {
  const { sellerName } = useParams();
  const sellerProducts = products.filter((p) => p.seller === sellerName);
  // Get unique sellers from the products array
  const sellers = [...new Set(products.map((p) => p.seller))];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSellerProfile = async () => {
      dispatch({ type: "FETCH_SELLER_PROFILE_REQUEST" });
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call delay
        const sellerProducts = products.filter((p) => p.seller === sellerName);
        dispatch({
          type: "FETCH_SELLER_PROFILE_SUCCESS",
          payload: { sellerName, products: sellerProducts },
        });
      } catch (error) {
        dispatch({
          type: "FETCH_SELLER_PROFILE_FAILURE",
          payload: error.message,
        });
        // Optionally redirect to an error page or show an error message
        navigate("/error");
      }
    };

    fetchSellerProfile();
    return () => {
      dispatch({ type: "CLEAR_SELLER_PROFILE_ERROR" });
    };
  }, [dispatch, sellerName, products]);

  if (isLoading) {
    return (
      <div className="text-center">
        <Spinner color="primary" />
      </div>
    );
  }
  if (sellerProducts.length === 0) {
    return <div>Seller not found.</div>;
  }

  return (
    <div className="container">
      {error && <Alert color="danger">{error}</Alert>}{" "}
      <Row>
        <Col md="3">
          {" "}
          <h3>Seller List</h3>
          <ul>
            {sellers.map((seller) => (
              <li key={seller}>
                <Link to={`/seller/${seller}`}>{seller}</Link>
              </li>
            ))}
          </ul>
        </Col>
        <Col md="9">
          {" "}
          <h2>{sellerName}'s Profile</h2>
          <div className="row">
            {sellerProducts.map((product) => (
              <div className="col-md-4 mb-4" key={product.id}>
                <Card>
                  <Link to={`/product/${product.id}`}>
                    <CardImg
                      top
                      src={product.imageUrl}
                      alt={product.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = require("../assets/img/img_placeholder.jpg");
                      }}
                    />
                    <CardBody>
                      <CardTitle tag="h5">{product.name}</CardTitle>
                      <CardText>${product.price}</CardText>
                    </CardBody>
                  </Link>
                </Card>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: state.product.products,
  isLoading: state.product.isLoading,
  error: state.product.error,
});

export default connect(mapStateToProps)(SellerProfile);
