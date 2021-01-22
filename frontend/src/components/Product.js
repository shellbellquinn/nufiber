import React from 'react';
import { Link } from 'react-router-dom';

export default function Product(props) {
  const { product } = props;
  return (
    <div key={product._id} className="card">
        <Link to={`/product/${product._id}`}>
         <img className="medium" src={product.image} alt={product.name} />
        </Link>

        <div className="card-body">
          <Link to={`/product/${product._id}`}>
            <h2>{product.name} | {product.code}</h2>
          </Link>

        <div className="row">
          <div className="row">
            <p><b>Quantity:</b> ${product.qty}</p>
          </div>
            <div className="row">
              <p><b>Weight:</b> {product.weight}lbs</p>
            </div>
          </div>

          <div className="row">
            <div className="row">
              <p><b>Dist Cost:</b> ${product.price}</p>
            </div>
            <div className="row">
              <p><b>MSRP:</b> ${product.msrp}</p>
            </div>
          </div>
    
    
            <div className="row">
              <Link to={`/search/sealed%20bucket`}>
              <p>{product.system}</p>
              </Link>
            </div>
        </div>
    </div>
  );
}