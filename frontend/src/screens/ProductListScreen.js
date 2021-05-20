import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createProduct, deleteProduct, listProducts} from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET,} from '../constants/productConstants';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


export default function ProductListScreen(props) {
  const productList = useSelector((state) => state.productList);
  const {
    loading,
    error,
    products
  } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({
        type: PRODUCT_CREATE_RESET
      });
      props.history.push(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({
        type: PRODUCT_DELETE_RESET
      });
    }
    dispatch(listProducts({}));
    // seller: sellerMode ? userInfo._id : ''
  }, [
    createdProduct,
    dispatch,
    props.history,
    // sellerMode,
    successCreate,
    successDelete,
    userInfo._id,
  ]);

  const deleteHandler = (product) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteProduct(product._id));
    }
  };
  const createHandler = () => {
    dispatch(createProduct());
  };


  return (

    <div>
      <div className="row">
        <h1> Products </h1>
        <button type="button" className="primary"
                onClick={
                  createHandler}>Create Product
        </button>
        <ReactHTMLTableToExcel id="test-table-xls-button"
                                 className="download-table-xls-button primary"
                                 table="table-to-xls"
                                 filename="tablexls"
                                 sheet="tablexls"
                                 tpe="button"
                                 buttonText="Download to Excel"/>
      </div>

      {
        loadingDelete && <LoadingBox> </LoadingBox>} {
      errorDelete && < MessageBox variant="danger"> {
        errorDelete
      } </MessageBox>}

      {
        loadingCreate && < LoadingBox> </LoadingBox>} {
      errorCreate && < MessageBox variant="danger"> {
        errorCreate
      } </MessageBox>} {
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
              <th> THUMBNAIL </th>
              <th> IMAGE SOURCE</th>
              <th> NUFIBER CODE</th>
              <th> NAME</th>
              <th> PRICE(ea)</th>
              <th> MSRP(ea)</th>
              <th> CASE QTY</th>
              <th> WEIGHT</th>
              <th> DIMENSIONS</th>
              <th> SYSTEM</th>
              <th> ACTIONS</th>
            </tr>
            </thead>
            <tbody> {
              products.map((product) => (
                <tr key={product._id}>
                  <td><img
                    src={product.image}
                    alt={product.image}
                    className="small"/>
                  </td>
                  <td>/images/{product.code}.jpg</td>
                  <td> {product.code} </td>
                  <td> {product.name} </td>
                  <td> ${product.price.toFixed(2)} </td>
                  <td> ${product.msrp.toFixed(2)} </td>
                  <td> {product.caseqty} /cs</td>
                  <td> {product.caseqty}lbs /cs</td>
                  <td> {product.dimension} </td>
                  <td> {product.system} </td>
                  <td>
                    <button type="button" className="small"
                            onClick={() => props.history.push(`/product/${product._id}/edit`)}>Edit
                    </button>
                    <button type="button" className="small" onClick={() => deleteHandler(product)}> Delete</button>
                  </td>
                </tr>
              ))
            }
            </tbody>
          </table>
        </div>
      )
    }

    </div>
  );
}
