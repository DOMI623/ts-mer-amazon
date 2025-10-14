
import express, { Request, Response } from 'express';
import { isAuth } from '../utils';
import asyncHandler from 'express-async-handler';
import { OrderModel } from '../models/orderModel';
import { Product } from '../models/productModel';
export const orderRouter = express.Router()

orderRouter.get( // /api/orders/:id
  '/:id',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const order = await OrderModel.findById(req.params.id)
    if (order) {
      res.send(order)
    } else {
      res.status(404).send({ message: 'Pedido no encontrado' })
    }
  })
)

orderRouter.post(
  '/',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    if (!req.body.orderItems || req.body.orderItems.length === 0) {
      res.status(400).send({ message: 'El carrito esta vacio' })
    } else {
        const createdOrder = await OrderModel.create({
        orderItems: req.body.orderItems.map((x: Product) => ({
          ...x,
          product: x._id,
        })),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      })
       res.status(201).send({ message: 'Pedido No econtrado', order: createdOrder })
    }

  })
)