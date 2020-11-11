import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AdminPrivateRoute = ({
  component: Component,
  auth: { isAuth, loading, verified },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuth && !verified ? <Redirect to='/login' /> : <Component {...props} />
    }
  />
);

AdminPrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});
export default connect(mapStateToProps)(AdminPrivateRoute);
