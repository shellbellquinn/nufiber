import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {detailsProduct} from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const {loading, error, product} = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);
  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Back to result</Link>
          <div className="row top">
            <div className="col-2">
              
              <img
                className="large"
                src={product.image}
                alt={product.name}
              ></img>

            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <b>{product.code}</b>
                </li>
                <li>
                  <Link to={`/search/` + product.system}>
                    <p>{product.system}</p>
                  </Link>
                </li>
                <li>
                  <Link to={`/search/` + product.dupsystem}>
                    <p>{product.dupsystem}</p>
                  </Link>
                </li>
                <li>
                  <b>Dimension:</b>{product.dimension}
                </li>
                <li>
                  <b>Description:</b>
                  <p>{product.description}</p>

                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div>Distributor Price</div>
                      <div className="price">${(product.price).toFixed(2)} each</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Suggested MSRP</div>
                      <div className="price">${(product.msrp).toFixed(2)} each</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>
                        <li className="success">{product.weight}lbs per case</li>
                      </div>
                      <div>
                        <li className="success">{product.caseqty} per case</li>
                      </div>
                    </div>
                  </li>
                  {product.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Cases</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <div className="price">${(qty * product.price * product.caseqty).toFixed(2)} Total Price</div>
                      <li>
                        <button
                          onClick={addToCartHandler}
                          className="primary block"
                        >
                          Add to Quote
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
