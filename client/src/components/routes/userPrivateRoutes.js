import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const UserPrivateRoute = ({
  component: Component,
  auth: { isAuth, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuth ? <Redirect to='/login' /> : <Component {...props} />
    }
  />
);

UserPrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});
export default connect(mapStateToProps)(UserPrivateRoute);
