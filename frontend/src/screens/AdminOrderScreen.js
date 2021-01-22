import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deliverOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


export default function OrderScreen(props) {
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;


  // const orderPay = useSelector((state) => state.orderPay);
  // const {
  //   // loading: loadingPay,
  //   // error: errorPay,
  //   success: successPay,
  // } = orderPay;
  // const orderDeliver = useSelector((state) => state.orderDeliver);
  // const {
  //   // loading: loadingDeliver,
  //   // error: errorDeliver,
  //   // success: successDeliver,
  // } = orderDeliver;
  const dispatch = useDispatch();
  // useEffect(() => {
    // const addPayPalScript = async () => {
    //   const { data } = await Axios.get('/api/config/paypal');
    //   const script = document.createElement('script');
    //   script.type = 'text/javascript';
    //   script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
    //   script.async = true;
    //   script.onload = () => {
    //     setSdkReady(true);
    //   };
    //   document.body.appendChild(script);
    // };
  //   if (
  //     !order ||
  //     successPay ||
  //     successDeliver ||
  //     (order && order._id !== orderId)
  //   ) {
  //     dispatch({ type: ORDER_PAY_RESET });
  //     dispatch({ type: ORDER_DELIVER_RESET });
  //     dispatch(detailsOrder(orderId));
  //   } else {
  //     if (!order.isPaid) {
  //       if (!window.paypal) {
  //         addPayPalScript();
  //       } else {
  //         setSdkReady(true);
  //       }
  //     }
  //   }
  // }, [dispatch, orderId, sdkReady, successPay, successDeliver, order]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };
  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  return loading ? (

   
    
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
            <button
               type="button"
               className="primary block"
               onClick={deliverHandler}
               >
                 Mark as Delivered
            </button>
            </li>
            <li>
                      <button
                        type="button"
                        className="primary block"
                        onClick={successPaymentHandler}
                      >
                        Mark as Paid
                      </button>
                  
                </li>
              
        
            </ul>
          </div>
        </div>
      </div>
  );
}
