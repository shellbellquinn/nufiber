import React, {useEffect} from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import { Carousel } from 'react-responsive-carousel';
import Product from '../components/Product'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {useDispatch, useSelector} from 'react-redux';
import {listProducts} from '../actions/productActions';
import {useParams} from 'react-router-dom';



export default function HomeScreen(props) {

  const {
    wallSystem = 'walls',
    sealedSystem = 'sealed'
  } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);

  const {loading, error, products} = productList;
  let wallProducts = products;
  let sealedProducts = products;
  if (products && wallSystem) {
    const lowercasewallSystem = wallSystem.toLowerCase();
    wallProducts = wallSystem === '' ? products : products.filter(product => {
      return (
        product.system.toLowerCase().indexOf(lowercasewallSystem) !== -1 
      )
    })
  }
  if (products && sealedSystem) {
    const lowercasesealedSystem = sealedSystem.toLowerCase();
    sealedProducts = sealedSystem === '' ? products : products.filter(product => {
      return (
        product.system.toLowerCase().indexOf(lowercasesealedSystem) !== -1 
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

      <div className="row center">
       
          {/* <h3>About NuFiber</h3> */}
          <div>
            {loadingSystems ? (
             <div></div>
            ) : errorSystems ? (
              <MessageBox variant="danger">{errorSystems}</MessageBox>
            ) : (
              <ul>
              </ul>
            )}
        </div>
        
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {wallProducts.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <h1>Walls, Counters, Desks, Windows Systems</h1>
              <div className="row center">
                {wallProducts.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </div>

              {sealedProducts.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <h1>Sealed Bucket (Pretreat) System</h1>
              <div className="row center">
                {sealedProducts.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </div>
            </>
          )}

      
      </div>
    </div>
  );
} 

