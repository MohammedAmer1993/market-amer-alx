import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import {
  Card,
  CardImg,
  CardBody,
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
} from "reactstrap";
import { Link } from "react-router-dom";

const ProductList = ({ products, addToCart, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const dispatch = useDispatch(); // Call useDispatch

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

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
  }, [dispatch]); // Run effect only once when the component mounts

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Get unique categories from products
  const categories = [
    "All Categories",
    ...new Set(products.map((p) => p.category)),
  ];

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

  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const productsPerPage = 6; // Number of products to display per page

  // Logic for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                  <Button onClick={() => addToCart(product)}>
                    Add to Cart
                  </Button>
                </CardBody>
              </Card>
            </div>
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
