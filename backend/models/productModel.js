import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    // seller: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    image: { type: String, required: true },
    code: { type: String, required: true },
    system: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    msrp: { type: Number, required: true },
    weight: { type: Number, required: true },
    countInStock: { type: Number, required: true },     
    // rating: { type: Number, required: true },
    dimension: { type: String, required: true },
    type: { type: String, required: true },
    caseqty: { type: Number, required: true },

  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model('Product', productSchema);

export default Product;
