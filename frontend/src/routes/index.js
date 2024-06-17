import React from "react";
import { Navigate, Route, Routes as Router } from "react-router-dom";
import Form from "../modules/Authorization";
import Navbar from "../component/Navbar";
import Control from "../modules/Control";
import Reviews from "../modules/Reviews";
import ProductDat from "../modules/ProductDat";
import Buynow from "../modules/Buynow";
import Payment from "../modules/Payment";
import AddToCart from "../modules/AddToCart";
import UserDetail from "../modules/UserDetail";
import SaveAddress from "../modules/SaveAddress";
import Sattings from "../modules/Sattings";
import Footer from "../component/Footer";
import Placeorder from "../modules/Placeorder";
import Shopping from "../modules/Shopping";
import NewPlaceOrder from "../modules/NewPlaceOrder";
import TrackOrder from '../modules/TrackOrder'
import BottomNav from "../component/BottomNav";
import Main from "../component/Main";
import AdminLogin from "../component/admin/AdminLogin";
import Admin from "../component/admin/Admin";

const PrivetRoute = ({ children }) => {
  const isUserLoggedIn = window.localStorage.getItem("user:token") || false;
  const isFromPage = window.location.pathname.includes("account");

  if (isUserLoggedIn && !isFromPage) {
    return children;
  } else if (!isUserLoggedIn && isFromPage) {
    return children;
  } else {
    const redirectUrl = isUserLoggedIn ? "/" : "/account/signin";
    return <Navigate to={redirectUrl} replace />;
  }
};

const Routes = () => {
  const routes = [
    {
      id: 1,
      name: "main",
      path: "/",
      Comment: <Main />,
    }
  ];
  return (
    <Router>
      {routes.map(({ id, name, path, Comment }) => {
        return (
          <Route
            key={id}
            path={path}
            element={
              <PrivetRoute>
                <Navbar />
                {Comment}
                <BottomNav />
                <Footer />
              </PrivetRoute>
            }
          />
        );
      })}
      <Route
        path="/account/signup"
        element={<PrivetRoute>{<Form />}</PrivetRoute>}
      />
      <Route
        path="/account/signin"
        element={<PrivetRoute>{<Form />}</PrivetRoute>}
      />
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/admin" element={<Admin />} />
      <Route
        path="/control"
        element={
          <PrivetRoute>
            {<Control />}
            <BottomNav />
          </PrivetRoute>
        }
      />
      <Route
        path="/reviews"
        element={
          <PrivetRoute>
            {<Reviews />}
            <BottomNav />
          </PrivetRoute>
        }
      />
      <Route
        path={`/productDat/:id`}
        element={
          <PrivetRoute>
            {<ProductDat />}
            <BottomNav />
          </PrivetRoute>
        }
      />
      <Route
        path={`/productDat/buynow/:id/:selectedSize/:formattedDate`}
        element={
          <PrivetRoute>
            {<Buynow />}
            <BottomNav />
          </PrivetRoute>
        }
      />
      <Route
        path={`/productDat/buynow/payment/:id/:selectedSize/:dropItems/:formattedDate/:getAddGet`}
        element={
          <PrivetRoute>
            {<Payment />}
            <BottomNav />
          </PrivetRoute>
        }
      />
      <Route
        path={`/placeorder/:id`}
        element={
          <PrivetRoute>
            {<Placeorder />}
            <BottomNav />
          </PrivetRoute>
        }
      />
      <Route
        path={`/nweplaceorder/:id/:selectedSize/:dropItems/:currentFormatDate`}
        element={
          <PrivetRoute>
            {<NewPlaceOrder />}
            <BottomNav />
          </PrivetRoute>
        }
      />
      <Route
        path="/addToCart"
        element={
          <PrivetRoute>
            {<AddToCart />}
            <BottomNav />
          </PrivetRoute>
        }
      />
      <Route
        path="userDetail"
        element={
          <PrivetRoute>
            {<UserDetail />}
            <BottomNav />
          </PrivetRoute>
        }
      />
      <Route
        path="trackorder"
        element={
          <PrivetRoute>
            {<TrackOrder />}
            <BottomNav />
          </PrivetRoute>
        }
      />
      <Route
        path="/saveAddress"
        element={
          <PrivetRoute>
            {<SaveAddress />}
            <BottomNav />
          </PrivetRoute>
        }
      />
      <Route
        path="/shopping"
        element={
          <PrivetRoute>
            {<Shopping />}
            <BottomNav />
          </PrivetRoute>
        }
      />
      <Route
        path="/sattings"
        element={<PrivetRoute>{<Sattings />}</PrivetRoute>}
      />
    </Router>
  );
};

export default Routes;
