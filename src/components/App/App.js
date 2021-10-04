import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  HashRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import CreatePage from "../../pages/CreatePage";
import Header from "../Header";
import Footer from "../Footer";
import PostPage from "../../pages/PostPage";
import ListPage from "../../pages/ListPage";
import { AuthContext } from "../../contexts";
import { getAuthToken } from "../../utils";
import { getMe } from "../../WebAPI";
const Root = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  line-height: 1.5em;
`;
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (getAuthToken()) {
      getMe().then((response) => {
        if (response.ok) {
          setUser(response.data);
        }
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Root>
        <Router>
          <ScrollToTop />
          <Header />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/posts/:id">
              <PostPage />
            </Route>
            <Route path="/list/:page">
              <ListPage />
            </Route>
            <Route path="/create">
              <CreatePage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </Root>
    </AuthContext.Provider>
  );
}

export default App;
