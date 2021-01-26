import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import { isAdmin, isAuth } from '../utils.js';

const productRouter = express.Router();

productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const name = req.query.name || '';
    const caseqty = req.query.caseqty || '';
    const system = req.query.system || '';
    // const seller = req.query.seller || '';
    const order = req.query.order || '';
    const code = req.query.code || '';
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    // const rating =
    //   req.query.rating && Number(req.query.rating) !== 0
    //     ? Number(req.query.rating)
    //     : 0;

    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const caseqtyFilter = caseqty ? { caseqty: { $regex: caseqty, $options: 'i' } } : {};
    const codeFilter = code ? { code: { $regex: code, $options: 'i' } } : {};


    // const sellerFilter = seller ? { seller } : {};
    const systemFilter = system ? { system: { $regex: system, $options: 'i'} } : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    // const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const sortOrder =
      order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        // : order === 'toprated'
        // ? { rating: -1 }
        : { _id: -1 };

    const products = await Product.find({
      // ...sellerFilter,
      ...nameFilter,
      ...caseqtyFilter,
      ...codeFilter,
      ...systemFilter,
      ...priceFilter,
      ...codeFilter,
      // ...ratingFilter,
    })
      .populate()
      .sort(sortOrder)
      .catch(err => console.error(err));
    res.send(products);
  })
);

productRouter.get(
  '/systems',
  expressAsyncHandler(async (req, res) => {
    const system = await Product.find().distinct('system');
    res.send(system);
  })
);

productRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    await Product.collection.drop();
    const createdProducts = await Product.insertMany(data.products).catch(err => console.log(`seed error {}`, err));
    console.log(`seed products {}`, createdProducts)
    res.send({ createdProducts });
  })
);

productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate(
      // 'seller',
      // 'seller.name seller.logo seller.rating seller.numReviews'
    );
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouter.post(
  '/',
  isAuth,
  // isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: 'TBD',
      // seller: req.user._id,
      image: '/images/REPLACETHIS.jpg',
      price: 0,
      system: 'New and Miscellaneous Items',
      code: 'TBD',
      msrp: 0,
      // rating: 0,
      // numReviews: 0,
      description: 'Coming soon',
      msrp: 0,
      weight: 0,
      countInStock: 20,     
      // rating: { type: Number, required: true },
      dimension: "TBD",
      type: "Replacements / Accessories",
      caseqty: 0,
    });
    const createdProduct = await product.save();
    res.send({ message: 'Product Created', product: createdProduct });
  })
);
productRouter.put(
  '/:id',
  isAuth,
  // isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.caseqty = req.body.caseqty;
      product.price = req.body.price;
      product.image = req.body.image;
      product.system = req.body.system;
      product.code = req.body.code;
      product.msrp = req.body.msrp;
      product.description = req.body.description;
      const updatedProduct = await product.save();
      res.send({ message: 'Product Updated', product: updatedProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deleteProduct = await product.remove();
      res.send({ message: 'Product Deleted', product: deleteProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

export default productRouter;
