import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';

export default function SearchScreen(props) {
  const {
    term = '',
  } = useParams();
  console.log(`term = ${term}`)
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  // const regex = new RegExp(`!/${term}/i`);
  const { loading, error, products } = productList;
  let filteredProducts = products;
  if (products && term) {
    const lowercaseTerm = term.toLowerCase();
    filteredProducts = term === '' ? products : products.filter(product => {
      return (
        product.name.toLowerCase().indexOf(lowercaseTerm) !== -1 || 
        product.code.toLowerCase().indexOf(lowercaseTerm) !== -1 || 
        product.system.toLowerCase().indexOf(lowercaseTerm) !== -1 ||
        product.dupsystem.toLowerCase().indexOf(lowercaseTerm) !== -1 
      )
    })    
  }

  const productSystemList = useSelector((state) => state.productSystemList);
  const {
    loading: loadingSystems,
    error: errorSystems,
  } = productSystemList;
  useEffect(() => {
    dispatch(
      listProducts({})
    );
  }, [dispatch]);

  return (
    <div>
      <div className="row">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>{filteredProducts.length} Results</div>
        )}
        <div>
          
          <ul
            value={''}
            onChange={(e) => {
              props.history.push(`/search/${term}`);
            }}
          >
            {/* <option value="newest">Newest Arrivals</option>
            <option value="lowest">Price: Low to High</option>
            <option value="highest">Price: High to Low</option>
            <option value="toprated">Avg. Customer Reviews</option> */}
          </ul>
        </div>
      </div>
      <div className="row top">
        <div className="col-1">
          {/* <h3>NuFiber System</h3> */}
          <div>
            {loadingSystems ? (
              <LoadingBox></LoadingBox>
            ) : errorSystems ? (
              <MessageBox variant="danger">{errorSystems}</MessageBox>
            ) : (
              <ul>
              </ul>
            )}
          </div>
        </div>
        <div className="col-3">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {filteredProducts.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <div className="row center">
                {filteredProducts.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
