import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Axios from 'axios';
import {detailsProduct, updateProduct} from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {PRODUCT_UPDATE_RESET} from '../constants/productConstants';

export default function ProductEditScreen(props) {
  const productId = props.match.params.id;
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [system, setSystem] = useState('');
  const [msrp, setmsrp] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState('');
  const [dimension, setDimension] = useState('');
  const [producttype, setType] = useState('');
  const [caseqty, setCases] = useState('');


  const productDetails = useSelector((state) => state.productDetails);
  const {loading, error, product} = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push('/productlist');
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({type: PRODUCT_UPDATE_RESET});
      dispatch(detailsProduct(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setSystem(product.system);
      setmsrp(product.msrp);
      setCode(product.code);
      setCases(product.caseqty);
      setDescription(product.description);
      setWeight(product.weight);
      // setCountInStock(product.countInStock);
      setDimension(product.dimension);
      setType(product.producttype);
    }
  }, [product, dispatch, productId, successUpdate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update product
    dispatch(
      updateProduct({
        _id: productId,
        name,
        image,
        price,
        system,
        caseqty,
        code,
        msrp,
        description,
        weight,
        dimension,
        producttype,
      })
    );
  };
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const userInfo = useSelector((state) => state.userInfo);
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const {data} = await Axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit Product {productId}</h1>
        </div>
        {loadingUpdate && <LoadingBox/>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox/>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Insert Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="code">NuFiber Code</label>
              <input
                id="code"
                type="text"
                placeholder="Enter NuFiber Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="price">Distributor Price</label>
              <input
                id="price"
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="msrp">Suggested MSRP</label>
              <input
                id="msrp"
                type="number"
                placeholder="Enter Suggested MSRP"
                value={msrp}
                onChange={(e) => setmsrp(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="image">Image</label>
              <input
                id="image"
                type="text"
                placeholder="Enter image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="imageFile">Image File</label>
              <input
                type="file"
                id="imageFile"
                label="Choose Image"
                onChange={uploadFileHandler}
              />
              {loadingUpload && <LoadingBox/>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
            </div>
            <div>
              <label htmlFor="system">System</label>
              <div>
                <select id="system" onChange={(e) => setSystem(e.target.value)}>
                  <option value="New and Miscellaneous Items">New and Miscellaneous Items</option>
                  <option value='Sealed Bucket (Pretreat) System'>Sealed Bucket (Pretreat) System</option>
                  <option value="Divided Bucket System">Divided Bucket System</option>
                  <option value="Double Bucket and Trolley Systems">Double Bucket and Trolley Systems</option>
                  <option value="Floor Finish Applicator Systems">Floor Finish Applicator Systems</option>
                  <option value="Walls, Counters, Desks, Windows Systems">Walls, Counters, Desks, Windows Systems
                  </option>
                  <option value="Color Coded Microfiber Cloths">Color Coded Microfiber Cloths</option>
                  <option value="High Duster Tools">High Duster Tools</option>
                  <option value="Dust Mops">Dust Mops</option>
                  <option value="Module Cart and Accessories">Module Cart and Accessories</option>
                  <option value="Specialty Items">Specialty Items</option>
                  <option value="Disposable Microfiber">Disposable Microfiber</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="producttype">Type of Product</label>
              <div>
                <select id="producttype" onChange={(e) => setType(e.target.value)}>
                  <option value="Mops / Cloths / Pads">Mops / Cloths / Pads</option>
                  <option value='Buckets'>Buckets</option>
                  <option value="Carts">Carts</option>
                  <option value="Frames / Handles">Frames / Handles</option>
                  <option value="Dusters">Dusters</option>
                  <option value="Replacements / Accessories">Replacements / Accessories</option>
                  <option value="Disposables">Disposables</option>
                  <option value="Kits">Kits</option>


                </select>
              </div>
            </div>


            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="3"
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="weight">Weight (in lbs)</label>
              <input
                id="weight"
                type="number"
                placeholder="Enter weight"
                value={weight}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="dimension">Dimensions</label>
              <input
                id="dimension"
                type="text"
                placeholder="Enter dimension"
                value={dimension}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="caseqty">Quantity (per case)</label>
              <input
                id="caseqty"
                type="number"
                placeholder="Enter cases qty"
                value={caseqty}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <button className="primary" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
