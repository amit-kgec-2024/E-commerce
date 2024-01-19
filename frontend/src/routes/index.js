import React from "react";
import { Navigate, Route, Routes as Router } from "react-router-dom";
import Home from "../modules/Home";
import Form from "../modules/Authorization";
import Men from "../modules/Men";
import Women from "../modules/Women";
import Beauty from "../modules/Beauty";
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
      name: "home",
      path: "/",
      Comment: <Home />,
    },
    {
      id: 2,
      name: "men",
      path: "/men",
      Comment: <Men />,
    },
    {
      id: 3,
      name: "women",
      path: "/women",
      Comment: <Women />,
    },
    {
      id: 4,
      name: "beauty",
      path: "/beauty",
      Comment: <Beauty />,
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
                <Footer/>
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
      <Route
        path="/control"
        element={<PrivetRoute>{<Control />}</PrivetRoute>}
      />
      <Route
        path="/reviews"
        element={<PrivetRoute>{<Reviews />}</PrivetRoute>}
      />
      <Route
        path={`/productDat/:id`}
        element={<PrivetRoute>{<ProductDat />}</PrivetRoute>}
      />
      <Route
        path={`/productDat/buynow/:id/:selectedSize/:formattedDate`}
        element={<PrivetRoute>{<Buynow />}</PrivetRoute>}
      />
      <Route
        path={`/productDat/buynow/payment/:id/:selectedSize/:dropItems/:formattedDate/:getAddGet`}
        element={<PrivetRoute>{<Payment />}</PrivetRoute>}
      />
      <Route
        path={`/placeorder/:id`}
        element={<PrivetRoute>{<Placeorder />}</PrivetRoute>}
      />
      <Route
        path={`/nweplaceorder/:id/:selectedSize/:dropItems/:currentFormatDate`}
        element={<PrivetRoute>{<NewPlaceOrder />}</PrivetRoute>}
      />
      <Route
        path="/addToCart"
        element={<PrivetRoute>{<AddToCart />}</PrivetRoute>}
      />
      <Route
        path="userDetail"
        element={<PrivetRoute>{<UserDetail />}</PrivetRoute>}
      />
      <Route
        path="trackorder"
        element={<PrivetRoute>{<TrackOrder />}</PrivetRoute>}
      />
      <Route
        path="/saveAddress"
        element={<PrivetRoute>{<SaveAddress />}</PrivetRoute>}
      />
      <Route
        path="/shopping"
        element={<PrivetRoute>{<Shopping />}</PrivetRoute>}
      />
      <Route
        path="/sattings"
        element={<PrivetRoute>{<Sattings />}</PrivetRoute>}
      />
    </Router>
  );
};

export default Routes;
