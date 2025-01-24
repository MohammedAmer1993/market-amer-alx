import React, { useState, useEffect } from "react"; // Import useState
import { connect } from "react-redux";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";

const ProductList = ({ products, addToCart }) => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filteredProducts, setFilteredProducts] = useState(products); // Initialize with all products

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    // Filter products whenever searchTerm or products change
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]); // Dependency array

  return (
    <div className="container">
      <Input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <div className="row">
        {filteredProducts.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <Card>
              <CardImg
                top
                width="100%"
                src={product.imageUrl}
                alt={product.name}
              />
              <CardBody>
                <CardTitle tag="h5">{product.name}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  ${product.price}
                </CardSubtitle>
                <Link to={`/product/${product.id}`}>
                  <Button>View Details</Button>
                </Link>
                <Button onClick={() => addToCart(product)}>Add to Cart</Button>
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

const mapDispatchToProps = (dispatch) => ({
  addToCart: (product) => dispatch({ type: "ADD_TO_CART", payload: product }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
