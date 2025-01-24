import React, { useState, useEffect } from "react"; // Import useEffect
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
} from "reactstrap";

const ProductDetails = ({ products, addToCart, isLoading }) => {
  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [reviewText, setReviewText] = useState(""); // State for review text
  const [reviews, setReviews] = useState([]); // State to store reviews

  const { productId } = useParams();
  const product = products.find((p) => p.id === parseInt(productId, 10));

  useEffect(() => {
    // Fetch reviews from local storage (or from your backend API)
    const storedReviews = localStorage.getItem(`reviews-${product.id}`);
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, [product.id]); // Run effect whenever product.id changes

  const handleReviewSubmit = () => {
    console.log("New review submitted:", {
      productId: product.id,
      review: reviewText,
    });
    // Update reviews state and store in local storage
    const updatedReviews = [...reviews, { text: reviewText }];
    setReviews(updatedReviews);
    localStorage.setItem(
      `reviews-${product.id}`,
      JSON.stringify(updatedReviews)
    );
  };

  const similarProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const toggleModal = () => setModalOpen(!modalOpen);
  const dispatch = useDispatch();
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
        {reviews.map((review, index) => (
          <div key={index}>
            <p>{review.text}</p>
          </div>
        ))}
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
