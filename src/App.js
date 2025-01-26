import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import Layout from "./components/Layout";
import { connect } from "react-redux";

function App({ isAuthenticated, logout }) {
  return (
    <Router>
      <Layout isAuthenticated={isAuthenticated} logout={logout}>
        <AppRoutes isAuthenticated={isAuthenticated} />
      </Layout>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch({ type: "LOGOUT" }), // Dispatch logout action
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
