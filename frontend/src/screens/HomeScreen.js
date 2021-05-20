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
    sealedSystem = 'sealed',
    newSystem = 'new',
    dividedSystem = 'divided',
    doubleSystem = 'double',
    floorSystem = 'floor',
    clothSystem = 'cloth',
    dustSystem = 'dust ',
    ModularSystem = 'modular',
    specialSystem = "special"


  } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);

  const {loading, error, products} = productList;
  let wallProducts = products;
  let sealedProducts = products;
  let newProducts = products;
  let dividedProducts = products;
  let doubleProducts = products;
  let floorProducts = products;
  let clothProducts = products;
  let dustProducts = products;
  let ModularProducts = products;
  let specialProducts = products;

  if (products && wallSystem) {
    wallProducts = wallSystem === '' ? products : products.filter(product => {
      return (
        product.system.toLowerCase().indexOf(wallSystem) !== -1 
      )
    })
  }
  if (products && specialSystem) {
    specialProducts = specialSystem === '' ? products : products.filter(product => {
      return (
        product.system.toLowerCase().indexOf(specialSystem) !== -1 
      )
    })
  }
  if (products && ModularSystem) {
    ModularProducts = ModularSystem === '' ? products : products.filter(product => {
      return (
        product.system.toLowerCase().indexOf(ModularSystem) !== -1 
      )
    })
  }
  if (products && doubleSystem) {
    doubleProducts = doubleSystem === '' ? products : products.filter(product => {
      return (
        product.system.toLowerCase().indexOf(doubleSystem) !== -1 
      )
    })
  }
  if (products && floorSystem) {
    floorProducts = floorSystem === '' ? products : products.filter(product => {
      return (
        product.system.toLowerCase().indexOf(floorSystem) !== -1 
      )
    })
  }
  if (products && dividedSystem) {
    dividedProducts = dividedSystem === '' ? products : products.filter(product => {
      return (
        product.system.toLowerCase().indexOf(dividedSystem) !== -1 
      )
    })
  }
  if (products && sealedSystem) {
    sealedProducts = sealedSystem === '' ? products : products.filter(product => {
      return (
        product.system.toLowerCase().indexOf(sealedSystem) !== -1 
      )
    })
  }  

  if (products && clothSystem) {
    clothProducts = clothSystem === '' ? products : products.filter(product => {
      return (
        product.system.toLowerCase().indexOf(clothSystem) !== -1 
      )
    })
  }  
  if (products && dustSystem) {
    dustProducts = dustSystem === '' ? products : products.filter(product => {
      return (
        product.system.toLowerCase().indexOf(dustSystem) !== -1 
      )
    })
  } 
    if (products && newSystem) {
      newProducts = newSystem === '' ? products : products.filter(product => {
        return (
          product.system.toLowerCase().indexOf(newSystem) !== -1 
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
              {sealedProducts.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <h1>Sealed Bucket (Pretreat) System</h1>
              <div className="row center">
                {sealedProducts.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </div>

              {dividedProducts.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <h1>Divided Bucket System</h1>
              <div className="row center">
                {dividedProducts.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </div>

              {doubleProducts.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <h1>Double Bucket System</h1>
              <div className="row center">
                {doubleProducts.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </div>

              {floorProducts.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <h1>Floor Finish Applicator Systems</h1>
              <div className="row center">
                {floorProducts.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </div>

              {wallProducts.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <h1>Walls, Counters, Desks, Windows Systems</h1>
              <div className="row center">
                {wallProducts.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </div>

              {clothProducts.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <h1>Microfiber Cloths</h1>
              <div className="row center">
                {clothProducts.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </div>

              {dustProducts.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <h1>Dust Mops</h1>
              <div className="row center">
                {dustProducts.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </div>

              {ModularProducts.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <h1>Modular Cart</h1>
              <div className="row center">
                {ModularProducts.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </div>

              {specialProducts.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <h1>Specialty Items</h1>
              <div className="row center">
                {specialProducts.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </div>

              {newProducts.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <h1>New and Miscellaneous Items</h1>
              <div className="row center">
                {newProducts.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </div>
            </>
          )}

      
      </div>
    </div>
  );
} 