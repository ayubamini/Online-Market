import { Route, Routes } from "react-router-dom";
import "./css/App.css";
import { useEffect, useState } from "react";
import RoleContext from './context/RoleContext';

// Components
import TopBar from "./component/publicView/Topbar";
import Footer from "./component/publicView/Footer";
import NoTopbar from "./component/publicView/NoTopbar";
// General Pages
import PageNotFound from "./pages/404";
import Home from "./pages";
import Checkout from "./pages/checkout";
import PasswordReset from "./pages/PasswordReset";
// Registered User Pages
import MyAccount from "./pages/registeredPages/myAccount";
import ChangePw from "./pages/registeredPages/changepw";
import OrderHistory from "./pages/registeredPages/OrderHistory";
import OrderDetail from "./pages/registeredPages/OrderDetail";
// Public Pages
import ShoppingCart from "./pages/publicPages/ShoppingCart";
import CartProvider from "./component/CartContext";
//Staff pages
import Dashboard from "./pages/Staff/Dashboard";
import OrdersMaintenancePage from "./pages/Staff/OrdersMaintenancePage";
import OrderDetailPage from "./pages/Staff/OrderDetailPage";
import ProductListPage from "./pages/publicPages/ProductListPage";
import ProductDetails from "./pages/publicPages/productDetails";
import AboutUs from "./pages/publicPages/about";
import ContactUs from "./pages/publicPages/contactUs";
import FAQ from "./pages/publicPages/FAQ";
//Admin pages
import AddNewUser from "./pages/admin/AddNewUser";
import StaffReportsPage from "./pages/admin/StaffReportsPage";
import UpdateUser from "./pages/admin/UpdateUser";
import UsersAccounts from "./pages/admin/UsersAccounts";
import ProductsMaintenancePage from "./pages/admin/ProductsMaintenancePage";
import ProductDetailPage from "./pages/admin/ProductDetailPage";
import CategoryMaintenancePage from "./pages/admin/CategoryMaintenancePage";
import { apiUrl } from './server-config'

function App() {
  const [authenticated, setAuthenticated] = useState({
    registered: false,
    isStaff: false,
    isAdmin: false
  });

  //set roles on refresh
  useEffect(() => {
    const user_id = localStorage.getItem("userId");

    // fetch if user currently logged in
    if (user_id) {
      fetch(`${apiUrl}/api/users/${user_id}`)
        .then((res) => res.json())
        .then((data) => {

          if (data.isAdmin)
            setAuthenticated({ isAdmin: true })
          else if (data.isStaff === true)
            setAuthenticated({ isStaff: true })
          else setAuthenticated({ registered: true })
        })
    }
  }, [])

  return (
    <div>
      
      <RoleContext.Provider value={{ authenticated, setAuthenticated }}>
      <CartProvider> 
        <Routes errorElement={<p>Oops! Something Went Wrong</p>}>
          {/*Pages that show topbar footer*/}
          <Route element={<TopBar />}>
            <Route element={<Footer />}>
              <Route path="/" element={<Home />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/404" element={<PageNotFound />} />
              <Route path="/shoppingcart" element={<ShoppingCart />} />
              <Route path="/resetpassword" element={<PasswordReset />} />
              <Route path="/productlist" element={<ProductListPage />} />
              <Route
                path="/productlist/:name"
                element={<ProductDetails />}
              />

              {/** Registered pages */}
              {authenticated.registered ? <>
                <Route path="/myAccount" element={<MyAccount />} />
                <Route path="/myAccount/changepw" element={<ChangePw />} />
                <Route path="/myAccount/orderhistory" element={<OrderHistory />} />
                <Route
                  exact
                  path="/myAccount/orderhistory/:orderNo"
                  element={<OrderDetail />}
                />
              </> : <></>
              }
            </Route>
          </Route>

          {/*Pages that dont show public topbar*/}
          <Route element={<NoTopbar />}>

            {/*Staff Pages*/}
            {authenticated.isStaff ? <>
              < Route path="/staff" element={<Dashboard />} />
              <Route
                
                path="/staff/orders"
                element={<OrdersMaintenancePage />}
              />
              <Route
                
                path="/staff/orders/:orderId"
                element={<OrderDetailPage />}
              />
            </> : <></>
            }


            {/*Admin Pages*/}
            {authenticated.isAdmin ? <>

              <Route path="/admin/" element={<StaffReportsPage />} />
              <Route path="/admin/add" element={<AddNewUser />} />
              <Route path="/admin/edit/:id" element={<UpdateUser />} />
              <Route path="/admin/users" element={<UsersAccounts />} />
              <Route
                path="/admin/categories"
                element={<CategoryMaintenancePage />}
              />
              <Route
                path="/admin/products"
                element={<ProductsMaintenancePage />}
              />
              <Route
                path="/admin/products/:productId"
                element={<ProductDetailPage />}
              />

              
            </>
              : <></>
            }

            {/*Checkout Page*/}
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
        </CartProvider> 
      </RoleContext.Provider>
    </div>
  );
}

export default App;
