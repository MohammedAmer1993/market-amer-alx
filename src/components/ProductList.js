import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import {
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  CardSubtitle,
  Button,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Pagination,
  PaginationItem,
  PaginationLink,
  Spinner,
  Alert,
  Badge,
} from "reactstrap";
import { Link } from "react-router-dom";
import { color } from "./../../node_modules/tailwindcss/src/util/dataTypes";

const ProductList = ({ products, addToCart, isLoading, error }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [addingToCart, setAddingToCart] = useState(null); // State for adding to cart
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [expandedProductId, setExpandedProductId] = useState(null);

  const dispatch = useDispatch(); // Call useDispatch

  const productsPerPage = 6; // Number of products to display per page

  const toggleProductDetails = (productId) => {
    setExpandedProductId((prevProductId) =>
      prevProductId === productId ? null : productId
    );
  };
  // Logic for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Function to format price with currency symbol
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  // Get unique categories from products
  const categories = [
    "All Categories",
    ...new Set(products.map((p) => p.category)),
  ];

  useEffect(() => {
    // Filter by search term and category
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All Categories" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
    setFilteredProducts(filtered);
  }, [searchTerm, products, selectedCategory]);

  useEffect(() => {
    const fetchProducts = async () => {
      // Simulate fetching products with a delay
      dispatch({ type: "FETCH_PRODUCTS_REQUEST" }); // Dispatch request action
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate 1-second delay
        dispatch({ type: "FETCH_PRODUCTS_SUCCESS", payload: products }); // Dispatch success action
      } catch (error) {
        dispatch({ type: "FETCH_PRODUCTS_FAILURE", payload: error.message }); // Dispatch failure action
      }
    };

    fetchProducts();
    return () => {
      dispatch({ type: "CLEAR_PRODUCT_LIST_ERROR" }); // Dispatch a new action to clear product list errors
    };
  }, [dispatch]); // Run effect only once when the component mounts

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (sortOption) => {
    let sortedProducts = [...filteredProducts]; // Create a copy of filteredProducts

    switch (sortOption) {
      case "priceAsc":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      // Add more sorting cases as needed
      default:
        break; // Do nothing for default sorting
    }

    setFilteredProducts(sortedProducts); // Update filteredProducts state
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddToCart = async (product) => {
    // Make handleAddToCart async
    setAddingToCart(product.id); // Set addingToCart to the product ID

    dispatch({ type: "ADD_TO_CART_REQUEST" });
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call delay
      // In a real app, send the product data to your backend API to add to cart
      dispatch({ type: "ADD_TO_CART_SUCCESS", payload: product });
      addToCart(product); // This might be redundant if you update the cart in the reducer
    } catch (error) {
      dispatch({ type: "ADD_TO_CART_FAILURE", payload: error.message });
    } finally {
      setAddingToCart(null); // Reset addingToCart in finally block
    }
  };

  return (
    <div className="container">
      <div className="mb-3">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {/* Category Dropdown */}
      <div className="mb-3">
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
          <DropdownToggle caret>{selectedCategory}</DropdownToggle>
          <DropdownMenu>
            {categories.map((category) => (
              <DropdownItem
                key={category}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="mb-3">
        <label htmlFor="sortSelect">Sort by:</label>
        <select
          id="sortSelect"
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="priceAsc">Price (Low to High)</option>
          <option value="priceDesc">Price (High to Low)</option>
          {/* Add more sorting options as needed */}
        </select>
      </div>
      {isLoading ? ( // Show spinner if isLoading is true
        <div className="text-center">
          <Spinner color="primary" />
        </div>
      ) : (
        <div className="row">
          {currentProducts.map((product) => (
            <React.Fragment key={product.id}>
              {" "}
              {/* Use Fragment to wrap multiple elements */}
              <div className="col-md-4 mb-4">
                <Card>
                  <Link to={`/product/${product.id}`}>
                    {" "}
                    {/* Wrap the card image with Link */}
                    <CardImg
                      top
                      width="100%"
                      src={product.imageUrl}
                      alt={product.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = require("../assets/img/img_placeholder.jpg");
                      }} // Add onError handler
                    />
                  </Link>

                  <CardBody>
                    <CardTitle tag="h5">{product.name}</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      {formatPrice(product.price)} {/* Format the price */}
                    </CardSubtitle>
                    <CardText>Sold by: {product.seller}</CardText>
                    <Badge color="warning">
                      <span className="px-1">Rating:</span>
                      {Array(5)
                        .fill(0)
                        .map(
                          (
                            _,
                            i // Generate 5 stars
                          ) => (
                            <span
                              key={i}
                              style={{
                                color: i < product.rating ? "gold" : "gray",
                              }}
                            >
                              ★
                            </span>
                          )
                        )}
                      {/* Display the rating value */}
                      <span className="ms-2">({product.rating})</span>
                    </Badge>

                    <Link to={`/product/${product.id}`}>
                      <Button>View Details</Button>
                    </Link>
                    <Button onClick={() => toggleProductDetails(product.id)}>
                      {expandedProductId === product.id
                        ? "Hide Details"
                        : "Show Details"}
                    </Button>
                    {isLoading || addingToCart === product.id ? ( // Show spinner while adding to cart
                      <Spinner size="sm" color="primary" />
                    ) : (
                      <Button onClick={() => handleAddToCart(product)}>
                        Add to Cart
                      </Button>
                    )}
                  </CardBody>
                </Card>
              </div>
              {expandedProductId === product.id && (
                <div className="col-md-12 mb-4">
                  {" "}
                  {/* Use a full-width div for details */}
                  {/* Display detailed product information here */}
                  <h4>{product.name}</h4>
                  <p>{product.description}</p>
                  {/* ... other product details ... */}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
      <Pagination className="mt-3">
        {Array.from({
          length: Math.ceil(filteredProducts.length / productsPerPage),
        }).map((_, index) => (
          <PaginationItem key={index + 1} active={index + 1 === currentPage}>
            <PaginationLink onClick={() => paginate(index + 1)}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
      </Pagination>
      {error && <Alert color="danger">{error}</Alert>}{" "}
      {/* Display error message */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: state.product.products,
  isLoading: state.product.isLoading,
  error: state.product.error, // Get error from productReducer
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (product) => dispatch({ type: "ADD_TO_CART", payload: product }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
