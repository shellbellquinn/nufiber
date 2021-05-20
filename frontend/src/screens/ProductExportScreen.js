import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {listProducts} from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


export default function ProductListScreen(props) {
  const productList = useSelector((state) => state.productList);
  const {
    loading,
    error,
    products
  } = productList;




  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(listProducts({}));
    // seller: sellerMode ? userInfo._id : ''
  }, [
    dispatch,
    props.history,
    // sellerMode,
    userInfo._id,
  ]);




  return (

    <div>
      <div className="row">
        <h1> Products </h1>
      </div>



      {
      loading ? (<
          LoadingBox> </LoadingBox>
      ) : error ? (<
          MessageBox variant="danger"> {
          error
        } </MessageBox>
      ) : (


        <div>



          <table id="table-to-xls" className="table">
            <thead>
            <tr>
              <th> IMAGE</th>
              <th> NUFIBER CODE</th>
              <th> NAME</th>
              <th> PRICE(ea)</th>
              <th> MSRP(ea)</th>
              <th> CASE QTY</th>
              <th> WEIGHT</th>
              <th> DIMENSIONS</th>
              <th> SYSTEM</th>
            </tr>
            </thead>
            <tbody> {
              products.map((product) => (
                <tr key={product._id}>
                  <td h><img 
                    src={"https://nufiber.herokuapp.com"+product.image}
                    alt={product.image}
                    width="30"
                    />
                  </td>
                  <td> {product.code} </td>
                  <td> {product.name} </td>
                  <td> ${product.price.toFixed(2)} </td>
                  <td> ${product.msrp.toFixed(2)} </td>
                  <td> {product.caseqty} /cs</td>
                  <td> {product.caseqty}lbs /cs</td>
                  <td> {product.dimension} </td>
                  <td> {product.system} </td>
                </tr>
              ))
            }
            </tbody>
          </table>
          <ReactHTMLTableToExcel id="test-table-xls-button"
                                 className="download-table-xls-button primary"
                                 table="table-to-xls"
                                 filename="tablexls"
                                 sheet="tablexls"
                                 tpe="button"
                                 buttonText="Download"/>
        </div>
        
      )
    }

    </div>
  );
}
