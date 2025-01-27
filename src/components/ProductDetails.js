import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  CardSubtitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
  Alert,
  FormFeedback,
  Badge,
} from "reactstrap";

const ProductDetails = ({ products, addToCart, isLoading, error }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [reviewTextValid, setReviewTextValid] = useState(true);
  const [submittingReview, setSubmittingReview] = useState(false);

  const { productId } = useParams();
  const product = products.find((p) => p.id === parseInt(productId, 10));
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchReviews = async () => {
      dispatch({ type: "FETCH_REVIEWS_REQUEST" });
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const storedReviews = localStorage.getItem(`reviews-${product.id}`);
        const reviewsData = storedReviews ? JSON.parse(storedReviews) : [];
        dispatch({ type: "FETCH_REVIEWS_SUCCESS", payload: reviewsData });
      } catch (error) {
        dispatch({ type: "FETCH_REVIEWS_FAILURE", payload: error.message });
      }
      return () => {
        dispatch({ type: "CLEAR_PRODUCT_ERROR" });
      };
    };

    fetchReviews();
  }, [dispatch, product.id]);

  const handleReviewSubmit = async () => {
    const isValid = reviewText.trim() !== "";
    setReviewTextValid(isValid);

    if (!isValid) {
      return; // Don't proceed with submission if validation fails
    }
    setSubmittingReview(true);

    dispatch({ type: "SUBMIT_REVIEW_REQUEST" });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call delay
      console.log("New review submitted:", {
        productId: product.id,
        review: reviewText,
      });
      dispatch({
        type: "SUBMIT_REVIEW_SUCCESS",
        payload: { productId: product.id, review: reviewText },
      });
    } catch (error) {
      dispatch({ type: "SUBMIT_REVIEW_FAILURE", payload: error.message });
    } finally {
      setSubmittingReview(false);
    }
  };

  const similarProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const toggleModal = () => setModalOpen(!modalOpen);

  // Function to format price with currency symbol
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      dispatch({ type: "FETCH_PRODUCT_DETAILS_REQUEST" });
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call delay
        dispatch({ type: "FETCH_PRODUCT_DETAILS_SUCCESS", payload: product }); // Assuming product has all details
      } catch (error) {
        dispatch({
          type: "FETCH_PRODUCT_DETAILS_FAILURE",
          payload: error.message,
        });
      }
    };

    fetchProductDetails();
  }, [dispatch, product]); // Run effect when productId or dispatch changes

  if (isLoading) {
    // Show spinner while loading
    return (
      <div className="text-center">
        <Spinner color="primary" />
      </div>
    );
  }

  if (!product) {
    return <div>Product not found.</div>;
  }
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
                e.target.src = require("../assets/img/img_placeholder.jpg");
              }}
            />
          </Card>
        </div>
        <div className="col-md-6">
          <Card>
            <CardBody>
              <CardTitle tag="h5">{product.name}</CardTitle>
              <CardText>
                <p>Price: {formatPrice(product.price)}</p>{" "}
                {/* Format the price */}
                <p>
                  Seller:{" "}
                  <Link to={`/seller/${product.seller}`}>{product.seller}</Link>
                </p>
                <p>Description: {product.description}</p>
              </CardText>
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
                  <CardText>Sold by: {similarProduct.seller}</CardText>
                </CardBody>
              </Link>
            </Card>
          </div>
        ))}
      </div>
      <Button color="primary" onClick={toggleModal}>
        Add Review
      </Button>

      {/* Review Modal */}
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Write a Review</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="reviewText">Your Review</Label>
              <Input
                type="textarea"
                name="reviewText"
                id="reviewText"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                valid={reviewTextValid}
                invalid={!reviewTextValid}
              />
              {!reviewTextValid && (
                <FormFeedback>Please enter your review</FormFeedback>
              )}{" "}
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          {submittingReview ? ( // Show spinner while submitting review
            <Spinner size="sm" color="primary" />
          ) : (
            <>
              <Button color="primary" onClick={handleReviewSubmit}>
                Submit Review
              </Button>
              <Button color="secondary" onClick={toggleModal}>
                Cancel
              </Button>
            </>
          )}
        </ModalFooter>
      </Modal>
      <div>
        <h3 id="reviews">Reviews</h3>
        {isLoading ? (
          <div className="text-center">
            <Spinner color="primary" />
          </div>
        ) : error ? ( // Show error message if there's an error fetching reviews
          <Alert color="danger">{error}</Alert>
        ) : (
          reviews.map((review, index) => (
            <div key={index}>
              <p>{review.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  products: state.product.products,
  isLoading: state.product.isLoading,
  error: state.product.error,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (product) => dispatch({ type: "ADD_TO_CART", payload: product }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
