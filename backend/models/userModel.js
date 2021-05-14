import mongoose from 'mongoose';

export const Roles = {
    ADMIN: "Admin",
    USER: "User",
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    company: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    role: { type: String, required: true, default: Roles.USER },
    pricing: {
        universalModifier: { type: Number, required: true, default: 100 },
        itemOverrides: [{
            productCode: { type: String, required: true },
            price: { type: Number, required: true}
        }]
    }

    // isSeller: { type: Boolean, default: false, required: true },
    // seller: {
    //   name: String,
    //   logo: String,
    //   description: String,
    //   rating: { type: Number, default: 0, required: true },
    //   numReviews: { type: Number, default: 0, required: true },
    // },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
export default User;
