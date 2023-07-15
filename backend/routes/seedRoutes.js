import express from 'express';
import data from '../data.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Product.deleteMany({}); //changed to deleteMany instead of remove
  const createdProducts = await Product.insertMany(data.products);
  await User.deleteMany({}); //changed to deleteMany instead of remove
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdProducts, createdUsers });
});

export default seedRouter;
