import express from 'express';
import { addProduct, getProduct, getProducts, deleteProduct ,addImage ,deleteImage,updateProduct,addAvailability,deleteAvailblity} from '../controllers/productController';
import { verifyTokenAndAdmin } from '../middlewares/authorization';
import { uploadOneImage } from '../controllers/productController';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images/')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' +file.originalname )
    },
  })
  const upload = multer({ storage: storage })

const router = new express.Router();
try {
    router.post('/product/add', [verifyTokenAndAdmin], addProduct);
    router.get('/product/find/:id', [] ,getProduct);
    router.get('/product/get/', [] ,getProducts);
    router.delete('/product/delete/:id', [verifyTokenAndAdmin] ,deleteProduct);
    router.put('/product/addimage',[verifyTokenAndAdmin],addImage);
    router.delete('/product/deleteimage',[verifyTokenAndAdmin],deleteImage);
    router.put('/product/update',[verifyTokenAndAdmin],updateProduct);
    router.put('/product/addavailability',[verifyTokenAndAdmin],addAvailability);
    router.delete('/product/deleteavailability',[verifyTokenAndAdmin],deleteAvailblity);
    router.post('/product/upload',upload.single('file'),uploadOneImage);
    
} catch (error) {
    console.log(error)
}

export default router;