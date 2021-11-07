import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CreateSurvey from "./components/Coordinator/CreateSurvey";
import SurveyComplete from "./components/SurveyComplete";
import SurveyResults from "./components/Coordinator/SurveyResults";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

import { Provider } from "react-redux";
import store from "./redux/store";
import PrivateRoute from "./components/PrivateRoute";
import SurveyResultsView from "./components/SurveyResultsView";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="container">
          <Switch>
            <PrivateRoute path="/" exact component={Dashboard} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/signin" exact component={SignIn} />
            <PrivateRoute
              path="/create-survey"
              exact
              component={CreateSurvey}
            />
            <PrivateRoute
              path="/survey/:surveyId"
              exact
              component={SurveyComplete}
            />
            <PrivateRoute
              path="/survey-results/:surveyId"
              exact
              component={SurveyResults}
            />
            <PrivateRoute
              path="/survey-results/:surveyId/:userId"
              exact
              component={SurveyResultsView}
            />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
