import express from 'express'
export const productRouter = express.Router()
import asyncHandler from 'express-async-handler'
import { ProductModel } from '../models/productModel'

productRouter.get(
    '/', 
    asyncHandler(async (req, res) => {
    const products = await ProductModel.find()
    res.json(products)
  })
)
// /api/slug/tshirt
productRouter.get(
    '/slug/:slug', 
    asyncHandler(async (req, res) => {
    const product = await ProductModel.findOne({ slug: req.params.slug })
    if (product) {
        res.json(product)
    } else {
        res.status(404).json({ message: 'Producto No Encontrado' })
    }
  })
)