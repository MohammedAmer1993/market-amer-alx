import React from "react";
import { useParams, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap";

const SellerProfile = ({ products }) => {
  const { sellerName } = useParams();
  const sellerProducts = products.filter((p) => p.seller === sellerName);

  if (sellerProducts.length === 0) {
    return <div>Seller not found.</div>;
  }

  // Get unique sellers from the products array
  const sellers = [...new Set(products.map((p) => p.seller))];

  return (
    <div className="container">
      <Row>
        <Col md="3">
          {" "}
          {/* Sidebar for seller list */}
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
          {/* Main content area */}
          <h2>{sellerName}'s Profile</h2>
          <div className="row">
            {sellerProducts.map((product) => (
              <div className="col-md-4 mb-4" key={product.id}>
                <Card>
                  <Link to={`/product/${product.id}`}>
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
        </Col>
      </Row>
    </div>
  );
};

export default connect(mapStateToProps)(SellerProfile);
