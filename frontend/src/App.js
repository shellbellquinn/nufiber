import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import AdminOrderScreen from './screens/AdminOrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import { listProductSystems } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';

function App() {
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const productSystemList = useSelector((state) => state.productSystemList);
  const {
    loading: loadingSystems,
    error: errorSystems,
    systems,
  } = productSystemList;
  useEffect(() => {
    dispatch(listProductSystems());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"/>
            </button>
            <Link className="brand" to="/">
              NuFiber
            </Link>
          </div>
          <div>
            <Route
              render={({ history }) => (
                <SearchBox history={history}/>
              )}
            />
          </div>
          <div>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"/>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
  
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"/>
                </Link>
                <ul className="dropdown-content">
                  {/* <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li> */}
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className={sidebarIsOpen ? 'open' : ''}>
          <ul className="systems">
            <li>
              <strong>Systems</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingSystems ? (
              <LoadingBox></LoadingBox>
            ) : errorSystems ? (
              <MessageBox variant="danger">{errorSystems}</MessageBox>
            ) : (
              systems.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))  
            )}
          </ul>

          <ul className="systems">
            <li>
              <strong>Product Category</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
              {loadingSystems ? (
                <LoadingBox></LoadingBox>
              ) : errorSystems ? (
                <MessageBox variant="danger">{errorSystems}</MessageBox>
              ) : (
            
                  <li>
                    <Link
                      to={`/search/buckets`}
                      onClick={() => setSidebarIsOpen(false)}
                    >
                      Buckets
                    </Link>
                  </li>
              )}
              {loadingSystems ? (
                <LoadingBox></LoadingBox>
              ) : errorSystems ? (
                <MessageBox variant="danger">{errorSystems}</MessageBox>
              ) : (
            
                  <li>
                    <Link
                      to={`/search/Mops`}
                      onClick={() => setSidebarIsOpen(false)}
                    >
                      Mops / Cloths / Pads
                    </Link>
                  </li>
              )}
              {loadingSystems ? (
                <LoadingBox></LoadingBox>
              ) : errorSystems ? (
                <MessageBox variant="danger">{errorSystems}</MessageBox>
              ) : (
            
                  <li>
                    <Link
                      to={`/search/Carts`}
                      onClick={() => setSidebarIsOpen(false)}
                    >
                      Carts
                    </Link>
                  </li>
              )}
              {loadingSystems ? (
                <LoadingBox></LoadingBox>
              ) : errorSystems ? (
                <MessageBox variant="danger">{errorSystems}</MessageBox>
              ) : (
            
                  <li>
                    <Link
                      to={`/search/Frames`}
                      onClick={() => setSidebarIsOpen(false)}
                    >
                      Frames / Handles
                    </Link>
                  </li>
              )}
              {loadingSystems ? (
                <LoadingBox></LoadingBox>
              ) : errorSystems ? (
                <MessageBox variant="danger">{errorSystems}</MessageBox>
              ) : (
            
                  <li>
                    <Link
                      to={`/search/Replacements`}
                      onClick={() => setSidebarIsOpen(false)}
                    >
                      Replacements / Accessories
                    </Link>
                  </li>
              )}
              
            </ul>

          

        </aside>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route
            path="/search/:term"
            component={SearchScreen}
            exact
          ></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <AdminRoute
            path="/productlist"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
            exact
          ></AdminRoute>
           <AdminRoute
            path="/order/:id/admin"
            component={AdminOrderScreen}
            exact   
          ></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>
         

          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
