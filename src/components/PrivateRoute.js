import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, user: { userId }, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      userId === "" ? <Redirect to="/signin" /> : <Component {...props} />
    }
  />
);

PrivateRoute.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(PrivateRoute);
