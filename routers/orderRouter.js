import express from 'express';
import { addProduct, getProduct, getProducts, deleteProduct ,addImage ,deleteImage,updateProduct,addAvailability,deleteAvailblity} from '../controllers/productController';
import { newOrder,getOrder,getUserOrders, getAllOrders } from '../controllers/orderController';

const router = new express.Router();
try {
    router.post('/order/add', [], newOrder);
    router.get('/order/all/', [], getAllOrders);
    router.get('/order/:id', [], getOrder);
    router.get('/order/user/:id', [], getUserOrders);

    
} catch (error) {
    console.log(error)
}

export default router;