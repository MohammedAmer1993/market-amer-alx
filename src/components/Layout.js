import React from "react";
import { Container, Navbar, Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Layout = ({ children, isAuthenticated, logout }) => (
  <div>
    <Navbar color="primary" dark expand="md">
      {" "}
      <Container>
        <Link to="/" className="navbar-brand">
          Marketplace
        </Link>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/">
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/cart">
              Cart
            </NavLink>
          </NavItem>
          {isAuthenticated ? (
            <>
              <NavItem>
                <NavLink tag={Link} to="/order-history">
                  Order History
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/profile">
                  Profile
                </NavLink>{" "}
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/logout" onClick={logout}>
                  Logout
                </NavLink>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem>
                <NavLink tag={Link} to="/login">
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/register">
                  Register
                </NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
    <Container className="pt-4"> {children}</Container>

    <footer className="footer mt-5 py-3 bg-light">
      {" "}
      <Container className="text-center">
        <p>&copy; {new Date().getFullYear()} Marketplace</p>
      </Container>
    </footer>
  </div>
);

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  // ...
  logout: () => dispatch({ type: "LOGOUT" }), // Dispatch logout action
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
