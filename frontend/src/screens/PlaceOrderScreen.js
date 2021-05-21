import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createOrder} from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import {ORDER_CREATE_RESET} from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useReactToPrint } from 'react-to-print';


export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push('/payment');
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  // const showPrice = useSelector ((state => state.showPrice))
  const {loading, success, error, order} = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price * c.caseqty, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 1500 ? toPrice(0) : 0.20 * cart.itemsPrice;
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.msrp = toPrice(2 * cart.itemsPrice);



  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({...cart, orderItems: cart.cartItems}));
  };

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({type: ORDER_CREATE_RESET});
    }
  }, [dispatch, order, props.history, success]);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

    function removePrice(){
      if (document.getElementsByClassName('delete') !== null) {
        const elements = document.getElementsByClassName("delete");
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
      }
}


function showPrice(){
  window.location.reload()
   }
  



    
  
  

return (
    <>
    <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
    <div ref={componentRef}>
     
      


<div className="row top">
  <div className="col-1">
    <ul>
      <li>
        <div className="orders">
          <h2>Shipping</h2>
          <p>
            <strong>Name:</strong> {cart.shippingAddress.fullName} <br/>
            <strong>Address: </strong> {cart.shippingAddress.address},
            {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
            ,{cart.shippingAddress.country}
          </p>
        </div>
      </li>
      <li>
        <div className="orders">
          <h2>Payment</h2>
          <p>
            <strong>Method:</strong> {cart.paymentMethod}
          </p>
        </div>
      </li>
      <li>
        <div className="orders">
          <h2>Order Items</h2>
          <ul>
            {cart.cartItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="small"
                    ></img>
                    <p>{item.code}</p>
                    <p>{item.name}</p>

                  </div>
          

                  <div>
                    {item.qty} cases ({item.caseqty} per case)
                    <p className="delete">x ${item.price} = ${ (item.qty * item.caseqty * item.price).toFixed(2) }</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </li>
    </ul>
  </div>
  <div className="col-1">
    <div className="card card-body">
      <ul>
        <li>
          <h2>Order Summary</h2>
        </li>

        <li>
          <div className="row">
            <div>Shipping</div>
            <div>All orders placed online will display shipping and handling as TBD (to be determined) since freight is determined by the weight and distance and is calculated at the time of shipping</div>
          </div>
        </li>

        <li>
              <div className="delete row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                 <div>
                    <strong>${cart.itemsPrice.toFixed(2)}</strong>
                  </div>
              </div>
         </li>
              <li>
              <div className="row">
                  <div>
                    <strong> Suggested MSRP</strong>
                  </div>
                  <div>
                    <strong>${2 * (cart.itemsPrice).toFixed(2)}</strong>
                  </div>

                </div>
              </li>
        <li>
          <button
            type="button"
            onClick={placeOrderHandler}
            className="primary block"
            disabled={cart.cartItems.length === 0}
          >
            Save to My Order History Tab
          </button>
        </li>

         <li>
            <button className="primary block" onClick={handlePrint}>Save Quote as PDF</button>
        </li> 
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
      </ul>
    </div>
  </div>
</div>
</div>
<div>
<button  
            type="button"
            onClick={removePrice}
            className="smallbutton"
            disabled={cart.cartItems.length === 0}
          >
            Hide Distributor Price
</button>

<button  
            type="button"
            onClick={showPrice}
            className="smallbutton"
            disabled={cart.cartItems.length === 0}
          >
            Show Distributor Price
</button>

</div>
</>
);
}


  
