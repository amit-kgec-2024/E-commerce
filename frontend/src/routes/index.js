// import React from "react";
import { Route, Routes as Router } from "react-router-dom";
import Product from "../component/buy/Product";
import ProductBuy from "../component/buy/ProductBuy";
import ProductPayment from "../component/buy/ProductPayment";
import PlaceOrder from "../component/buy/PlacedOrder"
// import Form from "../modules/Authorization";
// import Navbar from "../component/Navbar";
// import Reviews from "../modules/Reviews";
// import AddToCarts from "../component/AddToCarts";
// import UserDetail from "../modules/UserDetail";
// import SaveAddress from "../modules/SaveAddress";
// import Sattings from "../modules/Sattings";
// import Footer from "../component/Footer";
// import Placeorder from "../modules/Placeorder";
// import Shopping from "../modules/Shopping";
// import NewPlaceOrder from "../modules/NewPlaceOrder";
// import TrackOrder from "../modules/TrackOrder";
// import Main from "../component/Main";
// import AdminLogin from "../component/admin/AdminLogin";
// import Admin from "../component/admin/Admin";
import Mani from "../component/Main";
// import Mobiles from "../component/mobiles/Mobiles";
// import Appliens from "../component/appliens/Appliens";
// import Electronics from "../component/electronics/Electronics";
// import Fashion from "../component/fashion/Fashion";
// import Beauty from "../component/beauty/Beauty";
// import Kitchen from "../component/kitchene/Kitchen";
// import Furniture from "../component/furniture/Furniture";
// import Grocery from "../component/grocery/Grocery";
// import MobilesStore from "../component/mobiles/MobilesStore";
// import Profile from "../component/sattings/Profile";
// import PlacedOrder from "../component/PlacedOrder";
// import DeliveryPartner from "../component/delivery/DeliveryPartner";
// import DeliveryLogin from "../component/delivery/DeliveryLogin";
// import ManagementLogin from "../component/management/ManagementLogin";
// import ManagementSection from "../component/management/ManagementSection";
// import Management from "../component/management/Management";

// const PrivetRoute = ({ children }) => {
//   const isUserLoggedIn = window.localStorage.getItem("user:token") || false;
//   const isFromPage = window.location.pathname.includes("account");

//   if (isUserLoggedIn && !isFromPage) {
//     return children;
//   } else if (!isUserLoggedIn && isFromPage) {
//     return children;
//   } else {
//     const redirectUrl = isUserLoggedIn ? "/" : "/account/signin";
//     return <Navigate to={redirectUrl} replace />;
//   }
// };

const Routes = ()=>{
    return (
      <Router>
        <Route path="/product/:id" element={<Product />} />
        <Route path="/product/:id/:formattedDate" element={<ProductBuy />} />
        <Route
          path="/product/:id/:dropItems/:amountSave/:totalAmount/:formattedDate/:selectedAddressId"
          element={<ProductPayment />}
        />
        <Route path="/order/confrom/:id" element={<PlaceOrder />} />
        <Route path="/" element={<Mani />} />
        
      </Router>
    );};

export default Routes;
// const Routes = () => {
//   // const routes = [
//   //   {
//   //     id: 1,
//   //     name: "main",
//   //     path: "/",
//   //     Comment: <Main />,
//   //   },
//   // ];
//   return (
//     <Router>
//       {/* {routes.map(({ id, name, path, Comment }) => {
//         return (
//           <Route
//             key={id}
//             path={path}
//             element={
              
//                 <Navbar />
//                 {Comment}
//                 <Footer/>
              
//             }
//           />
//         );
//       })} */}
//       {/* User Sections................... */}
//       <Route
//         path="/"
//         element={<Main />}
//       />
//       <Route
//         path="/account/signup"
//         element={<Form />}
//       />
//       <Route
//         path="/account/signin"
//         element={<Form />}
//       />
//       {/* mobiles....... */}
//       <Route
//         path={`/mobile/:category`}
//         element={
//             <Navbar />
//             <Mobiles />
//             <Footer />
//         }
//       />
//       <Route
//         path={`/mobiles/store`}
//         element={
          
//             <Navbar />
//             {<MobilesStore />}
//             <Footer />
          
//         }
//       />
//       <Route
//         path={`/mobilesDetails/:id`}
//         element={
          
//             <Navbar />
//             {<MobilesDetails />}
//             <Footer/>
          
//         }
//       />
//       <Route
//         path={`/mobile/buynow/:id/:formattedDate`}
//         element={
          
//             <Navbar />
//             {<MobilesBuy />}
//             <Footer/>
          
//         }
//       />

//       {/* Appliances....... */}
//       <Route
//         path={`/appliances`}
//         element={
          
//             <Navbar />
//             {<Appliens />}
//             <Footer />
          
//         }
//       />
//       
//       {/* electronics....... */}
//       <Route
//         path={`/electronics`}
//         element={
          
//             <Navbar />
//             {<Electronics />}
//             <Footer />
          
//         }
//       />
//
//       
//       {/* Management sections...... */}
//       <Route path="/management/section" element={<ManagementSection />} />
//       <Route path="/management/login" element={<ManagementLogin />} />
//       <Route path="/management" element={<Management />} />
//       {/* Admin Sections.................... */}
//       <Route path="/adminlogin" element={<AdminLogin />} />
//       <Route path="/admin" element={<Admin />} />
//       {/* // delivery-partner................. */}
//       <Route path="/deliverylogin" element={<DeliveryLogin />} />
//       <Route path="/delivery/patner" element={<DeliveryPartner />} />
//       {/* Account Details........... */}
//       <Route
//         path="/profile"
//         element={
          
//             <Navbar />
//             {<Profile />}
          
//         }
//       />
//       <Route
//         path="/placedorder"
//         element={{<PlacedOrder />}}
//       />
//       <Route
//         path="/reviews"
//         element={
          
//             {<Reviews />}
//             <Footer/>
          
//         }
//       />
//       <Route
//         path={`/placeorder/:id`}
//         element={
          
//             {<Placeorder />}
//             <Footer/>
          
//         }
//       />
//       <Route
//         path={`/nweplaceorder/:id/:selectedSize/:dropItems/:currentFormatDate`}
//         element={
          
//             {<NewPlaceOrder />}
//             <Footer/>
          
//         }
//       />
//       <Route
//         path="/addToCart"
//         element={
          
//             <Navbar/>
//             {<AddToCarts />}
//             <Footer/>
          
//         }
//       />
//       <Route
//         path="userDetail"
//         element={
          
//             {<UserDetail />}
//             <Footer/>
          
//         }
//       />
//       <Route
//         path="trackorder"
//         element={
          
//             {<TrackOrder />}
//             <Footer/>
          
//         }
//       />
//       <Route
//         path="/saveAddress"
//         element={
          
//             {<SaveAddress />}
//             <Footer/>
          
//         }
//       />
//       <Route
//         path="/shopping"
//         element={
          
//             {<Shopping />}
//             <Footer/>
          
//         }
//       />
//       <Route
//         path="/sattings"
//         element={{<Sattings />}}
//       />
//     </Router>
//   );
// };

// export default Routes;
