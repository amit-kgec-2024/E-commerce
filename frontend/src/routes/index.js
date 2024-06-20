import React from "react";
import { Navigate, Route, Routes as Router } from "react-router-dom";
import Form from "../modules/Authorization";
import Navbar from "../component/Navbar";
import Reviews from "../modules/Reviews";
import AddToCart from "../modules/AddToCart";
import UserDetail from "../modules/UserDetail";
import SaveAddress from "../modules/SaveAddress";
import Sattings from "../modules/Sattings";
import Footer from "../component/Footer";
import Placeorder from "../modules/Placeorder";
import Shopping from "../modules/Shopping";
import NewPlaceOrder from "../modules/NewPlaceOrder";
import TrackOrder from "../modules/TrackOrder";
import BottomNav from "../component/BottomNav";
import Main from "../component/Main";
import AdminLogin from "../component/admin/AdminLogin";
import Admin from "../component/admin/Admin";
import FashionDetails from "../component/fashion/FashionDetails";
import FashionBuy from "../component/fashion/FashionBuy";
import FashionPayment from "../component/fashion/FashionPayment";
import AppliancesDetails from "../component/appliens/AppliancesDetails";
import AppliancesBuy from "../component/appliens/AppliancesBuy";
import AppliancesPayment from "../component/appliens/AppliancesPayment";
import ElectronicsDetails from "../component/electronics/ElectronicsDetails";
import ElectronicsBuy from "../component/electronics/ElectronicsBuy";
import ElectronicsPayment from "../component/electronics/ElectronicsPayment";
import BeautyDetails from "../component/beauty/BeautyDetails";
import BeautyBuy from "../component/beauty/BeautyBuy";
import BeautyPayment from "../component/beauty/BeautyPayment";
import KitcheneDetails from "../component/kitchene/KitcheneDetails";
import KitcheneBuy from "../component/kitchene/KitcheneBuy";
import KitchenePayment from "../component/kitchene/KitchenePayment";
import FurnitureDetails from "../component/furniture/FurnitureDetails";
import FurnitureBuy from "../component/furniture/FurnitureBuy";
import FurniturePayment from "../component/furniture/FurniturePayment";
import MobilesDetails from "../component/mobiles/MobilesDetails";
import MobilesBuy from "../component/mobiles/MobilesBuy";
import MobilesPayment from "../component/mobiles/MobilesPayment";
import GroceryDetails from "../component/grocery/GroceryDetails";
import GroceryBuy from "../component/grocery/GroceryBuy";
import GroceryPayment from "../component/grocery/GroceryPayment";
import Mobiles from "../component/mobiles/Mobiles";
import Appliens from "../component/appliens/Appliens";
import Electronics from "../component/electronics/Electronics";
import Fashion from "../component/fashion/Fashion";
import Beauty from "../component/beauty/Beauty";
import Kitchen from "../component/kitchene/Kitchen";
import Furniture from "../component/furniture/Furniture";
import Grocery from "../component/grocery/Grocery";
import MobilesStore from "../component/mobiles/MobilesStore";
import Profile from "../component/sattings/Profile";
import PlacedOrder from "../component/PlacedOrder";
import DeliveryPartner from "../component/delivery/DeliveryPartner";
import DeliveryLogin from "../component/delivery/DeliveryLogin";
import ManagementLogin from "../component/management/ManagementLogin";
import ManagementSection from "../component/management/ManagementSection";
import Management from "../component/management/Management";

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
    },
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
      {/* User Sections................... */}
      <Route
        path="/account/signup"
        element={<PrivetRoute>{<Form />}</PrivetRoute>}
      />
      <Route
        path="/account/signin"
        element={<PrivetRoute>{<Form />}</PrivetRoute>}
      />
      {/* mobiles....... */}
      <Route
        path={`/mobile/:category`}
        element={
          <PrivetRoute>
            <Navbar />
            {<Mobiles />}
            <Footer />
            <BottomNav />
          </PrivetRoute>
        }
      />
      <Route
        path={`/mobiles/store`}
        element={
          <PrivetRoute>
            <Navbar />
            {<MobilesStore />}
            <Footer />
            <BottomNav />
          </PrivetRoute>
        }
      />
      <Route
        path={`/mobilesDetails/:id`}
        element={
          <PrivetRoute>
            <Navbar />
            {<MobilesDetails />}
            <BottomNav />
          </PrivetRoute>
        }
      />
      <Route
        path={`/mobile/buynow/:id/:formattedDate`}
        element={
          <PrivetRoute>
            <Navbar />
            {<MobilesBuy />}
            <BottomNav />
          </PrivetRoute>
        }
      />
      <Route
        path={`/mobile/payment/:id/:dropItems/:formattedDate/:selectedAddressId`}
        element={
          <PrivetRoute>
            <Navbar />
            {<MobilesPayment />}
            <BottomNav />
          </PrivetRoute>
        }
      />
      {/* Appliances....... */}
      <Route
        path={`/appliances`}
        element={
          <PrivetRoute>
            <Navbar />
            {<Appliens />}
            <Footer />
            <BottomNav />
          </PrivetRoute>
        }
      />
      <Route
        path={`/appliancesDetails/:id`}
        element={
          <PrivetRoute>
            {<AppliancesDetails />}
            <BottomNav />
          </PrivetRoute>
        }
      />
      <Route
        path={`/appliancesDetails/buynow/:id/:selectedSize/:formattedDate`}
        element={
          <PrivetRoute>
            {<AppliancesBuy />}
            <BottomNav />
          </PrivetRoute>
        }
      />
      <Route
        path={`/appliancesDetails/buynow/payment/:id/:selectedSize/:dropItems/:formattedDate/:getAddGet`}
        element={
          <PrivetRoute>
            {<AppliancesPayment />}
            <BottomNav />
          </PrivetRoute>
        }
      />
      {/* electronics....... */}
      <Route
        path={`/electronics`}
        element={
          <PrivetRoute>
            <Navbar />
            {<Electronics />}
            <Footer />
            <BottomNav />
          </PrivetRoute>
        }
      />
      <Route
        path={`/electronicsDetails/:id`}
        element={
          <PrivetRoute>
            {<ElectronicsDetails />}
            <BottomNav />
          </PrivetRoute>
        }
      />
      <Route
        path={`/electronicsDetails/buynow/:id/:selectedSize/:formattedDate`}
        element={
          <PrivetRoute>
            {<ElectronicsBuy />}
            <BottomNav />
          </PrivetRoute>
        }
      />
      <Route
        path={`/electronicsDetails/buynow/payment/:id/:selectedSize/:dropItems/:formattedDate/:getAddGet`}
        element={
          <PrivetRoute>
            {<ElectronicsPayment />}
            <BottomNav />
          </PrivetRoute>
        }
      />
      {/* Fashion....... */}
      <Route
        path={`/fashion`}
        element={
          <PrivetRoute>
            <Navbar />
            {<Fashion />}
            <Footer />
            <BottomNav />
          </PrivetRoute>
        }
      />
      <Route
        path={`/fashionDetails/:id`}
        element={
          <PrivetRoute>
            {<FashionDetails />}
            <BottomNav />
          </PrivetRoute>
        }
      />
      <Route
        path={`/fashionDetails/buynow/:id/:selectedSize/:formattedDate`}
        element={
          <PrivetRoute>
            {<FashionBuy />}
            <BottomNav />
          </PrivetRoute>
        }
      />
      <Route
        path={`/fashionDetails/buynow/payment/:id/:selectedSize/:dropItems/:formattedDate/:getAddGet`}
        element={
          <PrivetRoute>
            {<FashionPayment />}
            <BottomNav />
          </PrivetRoute>
        }
      />
      {/* beauty....... */}
      <Route
        path={`/beauty`}
        element={
          <PrivetRoute>
            <Navbar />
            {<Beauty />}
            <Footer />
            <BottomNav />
          </PrivetRoute>
        }
      />
      <Route
        path={`/beautyDetails/:id`}
        element={
          <PrivetRoute>
            {<BeautyDetails />}
            <BottomNav />
          </PrivetRoute>
        }
      />
      <Route
        path={`/beautyDetails/buynow/:id/:selectedSize/:formattedDate`}
        element={
          <PrivetRoute>
            {<BeautyBuy />}
            <BottomNav />
          </PrivetRoute>
        }
      />
      <Route
        path={`/beautyDetails/buynow/payment/:id/:selectedSize/:dropItems/:formattedDate/:getAddGet`}
        element={
          <PrivetRoute>
            {<BeautyPayment />}
            <BottomNav />
          </PrivetRoute>
        }
      />
      {/* kitchene....... */}
      <Route
        path={`/kitchene`}
        element={
          <PrivetRoute>
            <Navbar />
            {<Kitchen />}
            <Footer />
            <BottomNav />
          </PrivetRoute>
        }
      />
      <Route
        path={`/kitcheneDetails/:id`}
        element={
          <PrivetRoute>
            {<KitcheneDetails />}
            <BottomNav />
          </PrivetRoute>
        }
      />
      <Route
        path={`/kitcheneDetails/buynow/:id/:selectedSize/:formattedDate`}
        element={
          <PrivetRoute>
            {<KitcheneBuy />}
            <BottomNav />
          </PrivetRoute>
        }
      />
      <Route
        path={`/kitcheneDetails/buynow/payment/:id/:selectedSize/:dropItems/:formattedDate/:getAddGet`}
        element={
          <PrivetRoute>
            {<KitchenePayment />}
            <BottomNav />
          </PrivetRoute>
        }
      />
      {/* Furniture....... */}
      <Route
        path={`/furniture`}
        element={
          <PrivetRoute>
            <Navbar />
            {<Furniture />}
            <Footer />
            <BottomNav />
          </PrivetRoute>
        }
      />
      <Route
        path={`/furnitureDetails/:id`}
        element={
          <PrivetRoute>
            {<FurnitureDetails />}
            <BottomNav />
          </PrivetRoute>
        }
      />
      <Route
        path={`/furnitureDetails/buynow/:id/:selectedSize/:formattedDate`}
        element={
          <PrivetRoute>
            {<FurnitureBuy />}
            <BottomNav />
          </PrivetRoute>
        }
      />
      <Route
        path={`/furnitureDetails/buynow/payment/:id/:selectedSize/:dropItems/:formattedDate/:getAddGet`}
        element={
          <PrivetRoute>
            {<FurniturePayment />}
            <BottomNav />
          </PrivetRoute>
        }
      />
      {/* grocery....... */}
      <Route
        path={`/grocery`}
        element={
          <PrivetRoute>
            <Navbar />
            {<Grocery />}
            <Footer />
            <BottomNav />
          </PrivetRoute>
        }
      />
      <Route
        path={`/groceryDetails/:id`}
        element={
          <PrivetRoute>
            {<GroceryDetails />}
            <BottomNav />
          </PrivetRoute>
        }
      />
      <Route
        path={`/groceryDetails/buynow/:id/:selectedSize/:formattedDate`}
        element={
          <PrivetRoute>
            {<GroceryBuy />}
            <BottomNav />
          </PrivetRoute>
        }
      />
      <Route
        path={`/groceryDetails/buynow/payment/:id/:selectedSize/:dropItems/:formattedDate/:getAddGet`}
        element={
          <PrivetRoute>
            {<GroceryPayment />}
            <BottomNav />
          </PrivetRoute>
        }
      />
      {/* Management sections...... */}
      <Route path="/management/section" element={<ManagementSection />} />
      <Route path="/management/login" element={<ManagementLogin />} />
      <Route path="/management" element={<Management />} />
      {/* Admin Sections.................... */}
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/admin" element={<Admin />} />
      {/* // delivery-partner................. */}
      <Route
        path="/deliverylogin"
        element={<DeliveryLogin />}
      />
      <Route
        path="/delivery/patner"
        element={<DeliveryPartner />}
      />
      {/* Account Details........... */}
      <Route
        path="/profile"
        element={
          <PrivetRoute>
            <Navbar />
            {<Profile />}
            <Footer />
            <BottomNav />
          </PrivetRoute>
        }
      />
      <Route
        path="/placedorder"
        element={<PrivetRoute>{<PlacedOrder />}</PrivetRoute>}
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
