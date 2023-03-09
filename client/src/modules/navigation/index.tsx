import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePageContainer from "../common/components/homePage/index";
import { APP_KEYS } from "../common/consts";
import Todo from "../common/components/TodoDisplay/todo";
import SignUp from "../common/components/Authentication/SignUp";
import Login from "../common/components/Authentication/Login";
import Header from "../common/components/Header/Header";
import AddTodo from "../common/components/AddTodo/AddTodo";
import AuthPage from "../common/components/Authentication/Auth";
import MyProfile from "../common/components/MyProfile/MyProfile";

export const MainRouter = () => (
  <Router>
    <Routes>
      <Route path={APP_KEYS.ROUTER_KEYS.AUTH} element={<AuthPage />} />
      <Route path={APP_KEYS.ROUTER_KEYS.SIGNUP} element={<SignUp />} />
      <Route path={APP_KEYS.ROUTER_KEYS.LOGIN} element={<Login />} />
      <Route
        path={APP_KEYS.ROUTER_KEYS.ADD}
        element={
          <>
            <Header />
            <AddTodo />
          </>
        }
      />
      <Route
        path={APP_KEYS.ROUTER_KEYS.TODO}
        element={
          <>
            <Header />
            <Todo />
          </>
        }
      />
      <Route
        path={APP_KEYS.ROUTER_KEYS.PROFILE}
        element={
          <>
            <Header />
            <MyProfile />
          </>
        }
      />
      <Route
        path={APP_KEYS.ROUTER_KEYS.ROOT}
        element={
          <>
            <Header />
            <HomePageContainer />
          </>
        }
      />
    </Routes>
  </Router>
);
