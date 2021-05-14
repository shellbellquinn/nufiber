import React from 'react';
import {Link} from 'react-router-dom'


export default function Product(props) {
  const {product} = props;

  if (`${product.price}` === "undefined" ) {
    return (
    <div key={product._id} className="card">
      <Link to={`/product/${product._id}`}>
      <div className="imgWrapper">
        <img className="medium" src={product.image} alt={product.name}/>
       </div> 
      </Link>

      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2>{product.name} </h2>
          <h2>{product.code}</h2>
        </Link>

        <div className="row">
          <div className="row">
            <p><b>Quantity:</b> {product.caseqty} per case</p>
          </div>
          <div className="row">
            <p><b>Weight:</b> {product.weight}lbs</p>
          </div>
        </div>

        <div className="row">
          <Link to={`/search/` + product.system}>
            <p>{product.system}</p>
          </Link>
        </div>
        <div className="row">
          <Link to={`/search/` + product.dupsystem}>
            <p>{product.dupsystem}</p>
          </Link>
        </div>

      </div>
    </div>
  );
}
else {
 return (
    <div key={product._id} className="card">
      <Link to={`/product/${product._id}`}>
      <div className="imgWrapper">
        <img className="medium" src={product.image} alt={product.name}/>
       </div> 
      </Link>

      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2>{product.name} </h2>
          <h2>{product.code}</h2>
        </Link>

        <div className="row">
          <div className="row">
            <p><b>Quantity:</b> {product.caseqty} per case</p>
          </div>
          <div className="row">
            <p><b>Weight:</b> {product.weight}lbs</p>
          </div>
        </div>

        <div className="row">
          <div className="row">
            <p><b>Dist Cost:</b> ${product.price} each</p>
          </div>
          <div className="row">
            <p><b>MSRP:</b> ${product.msrp} each</p>
          </div>
        </div>


        <div className="row">
          <Link to={`/search/` + product.system}>
            <p>{product.system}</p>
          </Link>
        </div>
        <div className="row">
          <Link to={`/search/` + product.dupsystem}>
            <p>{product.dupsystem}</p>
          </Link>
        </div>

      </div>
    </div>
  );
}
}
