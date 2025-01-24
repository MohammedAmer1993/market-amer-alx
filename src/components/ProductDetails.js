import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux"; // Import useDispatch
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
} from "reactstrap";

const ProductDetails = ({ products, addToCart, isLoading }) => {
  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [reviewText, setReviewText] = useState(""); // State for review text
  const [reviews, setReviews] = useState([]); // State to store reviews

  const { productId } = useParams();
  const product = products.find((p) => p.id === parseInt(productId, 10));
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchReviews = async () => {
      dispatch({ type: "FETCH_REVIEWS_REQUEST" });
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call delay
        // In a real app, fetch reviews from your backend API based on product.id
        const storedReviews = localStorage.getItem(`reviews-${product.id}`);
        const reviewsData = storedReviews ? JSON.parse(storedReviews) : [];
        dispatch({ type: "FETCH_REVIEWS_SUCCESS", payload: reviewsData });
      } catch (error) {
        dispatch({ type: "FETCH_REVIEWS_FAILURE", payload: error.message });
      }
    };

    fetchReviews();
  }, [dispatch, product.id]);

  const handleReviewSubmit = async () => {
    // Make handleReviewSubmit async
    dispatch({ type: "SUBMIT_REVIEW_REQUEST" });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call delay
      // In a real app, send review data to your backend API
      console.log("New review submitted:", {
        productId: product.id,
        review: reviewText,
      });
      dispatch({
        type: "SUBMIT_REVIEW_SUCCESS",
        payload: { productId: product.id, review: reviewText },
      });
      // ... (update reviews state and local storage) ...
    } catch (error) {
      dispatch({ type: "SUBMIT_REVIEW_FAILURE", payload: error.message });
    }
  };

  const similarProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const toggleModal = () => setModalOpen(!modalOpen);
  useEffect(() => {
    const fetchProductDetails = async () => {
      dispatch({ type: "FETCH_PRODUCT_DETAILS_REQUEST" });
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call delay
        // In a real app, fetch details from your API based on productId
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
            <CardImg top src={product.imageUrl} alt={product.name} />
          </Card>
        </div>
        <div className="col-md-6">
          <Card>
            <CardBody>
              <CardTitle tag="h5">{product.name}</CardTitle>
              <CardText>
                <p>Price: ${product.price}</p>
                <p>
                  Seller:{" "}
                  <Link to={`/seller/${product.seller}`}>{product.seller}</Link>
                </p>
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
                  {/* Display seller information */}
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
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleReviewSubmit}>
            Submit Review
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <div>
        <h3>Reviews</h3>
        {isLoading ? ( // Show spinner while fetching reviews
          <div className="text-center">
            <Spinner color="primary" />
          </div>
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
  isLoading: state.product.isLoading, // Get isLoading from Redux store
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (product) => dispatch({ type: "ADD_TO_CART", payload: product }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
