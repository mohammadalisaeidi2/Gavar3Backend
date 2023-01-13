import express from 'express';
import { addProduct, getProduct, getProducts, deleteProduct ,addImage ,deleteImage,updateProduct,addAvailability,deleteAvailblity} from '../controllers/productController';
import { verifyTokenAndAdmin } from '../middlewares/authorization';

const router = new express.Router();
try {
    router.post('/product/add', [verifyTokenAndAdmin], addProduct);
    router.get('/product/find/:id', [] ,getProduct);
    router.get('/product/get/', [] ,getProducts);
    router.delete('/product/delete/:id', [verifyTokenAndAdmin] ,deleteProduct);
    router.put('/product/addimage',[],addImage);
    router.delete('/product/deleteimage',[],deleteImage);
    router.put('/product/update',[],updateProduct);
    router.put('/product/addavailability',[],addAvailability);
    router.delete('/product/deleteavailability',[],deleteAvailblity);
    
} catch (error) {
    console.log(error)
}

export default router;