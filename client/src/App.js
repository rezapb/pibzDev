import React, { useEffect, useState, Fragment } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import rtl from "jss-rtl";
import {
  StylesProvider,
  jssPreset,
  ThemeProvider,
} from "@material-ui/core/styles";
import { create } from "jss";

// Themes
import { lightTheme } from "./theme/light";
import { darkTheme } from "./theme/dark";

//Store
import store from "./store/store";

// Actions
import { loadUser } from "./actions/authAction";
import setAuthToken from "./util/setAuthToken";

// Scss
import "./app.scss";

// Private Routes
import UserPrivateRoute from "./components/routes/userPrivateRoutes";
import AdminPrivateRoute from "./components/routes/adminPrivateRoutes";

// Compoents
import Navbar from "./components/navbar/navbar";
import Home from "./components/home/home";
import About from "./components/about/about";
import Contact from "./components/contact/contact";
import Dashboard from "./components/dashboard/dashboard";
import AdminPanel from "./components/admin/adminPanel";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import EditProfile from "./components/dashboard/profile/editProfile";
import CreateProfile from "./components/dashboard/profile/createProfile";
import CreatePost from "./components/admin/CreatePost/createPost";
import Posts from "./components/posts/posts";
import Post from "./components/posts/post";
import Profiles from "./components/profiles/profiles";
import Tags from "./components/tags/tags";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  // Dark mode switch
  const [darkMode, setdarkMode] = useState(false);

  return (
    <Provider store={store}>
      <StylesProvider jss={jss}>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <CssBaseline>
            <Router>
              <Fragment>
                <Navbar themeModeFunc={setdarkMode} themeMode={darkMode} />
              </Fragment>
              <Fragment>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/posts' component={Posts} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/contact' component={Contact} />
                  <Route exact path='/posts/:id' component={Post} />
                  <Route exact path='/posts/tags/:tag' component={Tags} />
                  <Route exact path='/profiles/:id' component={Profiles} />
                  <UserPrivateRoute
                    exact
                    path='/dashboard'
                    component={Dashboard}
                  />
                  <UserPrivateRoute
                    exact
                    path='/dashboard/editProfile'
                    component={EditProfile}
                  />
                  <UserPrivateRoute
                    exact
                    path='/dashboard/createProfile'
                    component={CreateProfile}
                  />

                  <AdminPrivateRoute
                    exact
                    path='/adminPanel'
                    component={AdminPanel}
                  />
                  <AdminPrivateRoute
                    exact
                    path='/adminPanel/createPost'
                    component={CreatePost}
                  />
                </Switch>
              </Fragment>
            </Router>
          </CssBaseline>
        </ThemeProvider>
      </StylesProvider>
    </Provider>
  );
};

export default App;
