import Order from '../models/orders'
import jwt_decode from "jwt-decode";


//new order
export const newOrder = async (req, res, next) => {
    try {
        console.log("-----NEW ORDER-----");
        const {
            orderUserId,
            orderProducts,
            orderAddress,
            orderPhone

        } = req.body;
        Order.create({
            orderUserId,
            orderProducts,
            orderAddress,
            orderPhone
        }, (error,product) => {
            error ? next(error) : res.status(200).json("Order added Succesfully!!")
        })
    } catch (e) {
        next(e)
    }
};




//GET ALL ORDERS
export const getAllOrders = async (req, res, next) => {
    try {
        console.log("-----GET ALL ORDERS -----");
        const orders = await Order.find();

        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
};


//GET one ORDER
export const getOrder = async (req, res, next) => {
    try {
        console.log("-----GET ONE ORDER -----");
        const order = await Order.findById(req.params.id);
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json(err);
    }
};



//GET user orders
export const getUserOrders = async (req, res, next) => {
    try {
        console.log("-----GET USER ORDERS -----");
        const orders = await Order.find({
            orderUserId:req.params.id
        });

        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
};


