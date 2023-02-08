import Product from '../models/products';


//TODO
//Add availablity
//Remove availablity


//ADD product
export const addProduct = async (req, res, next) => {
    try {
        console.log("-----Product ADD-----");
        const {
            productTitle,
            productDetile,
            productInfo,
            productColor,
            productCategories,
            productImages,
            productAvailability,
            productBrand,
            productWages,
            productSex,
            productHasStone,
            productScore
        } = req.body;
        Product.create({
            productTitle,
            productDetile,
            productInfo,
            productColor,
            productCategories,
            productImages,
            productAvailability,
            productBrand,
            productWages,
            productSex,
            productHasStone,
            productScore
        }, (error,product) => {
            error ? next(error) : res.status(200).json(product._id)
        })
    } catch (e) {
        next(e)
    }
};







//UPDATE product
export const updateProduct = async (req, res, next) => {
    try {
        console.log("-----Product UPDATE -----");
        const {
            productId,
            productTitle,
            productDetile,
            productInfo,
            productColor,
            productCategories,
            productBrand,
            productWages,
            productSex,
            productHasStone,
            productScore
        } = req.body;
        Product.findOneAndUpdate({_id:productId},{
            productTitle,
            productDetile,
            productInfo,
            productColor,
            productCategories,
            productBrand,
            productWages,
            productSex,
            productHasStone,
            productScore
        }, (error) => {
            error ? next(error) : res.status(200).send({"message": "Product updated succesfully !!"})
        })
    } catch (e) {
        next(e)
    }
};


//GET one product
export const getProduct = async (req, res, next) => {
    try {
        console.log("-----Product GET -----");
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
};



//GET all products
export const getProducts = async (req, res, next) => {
    const qLast = req.query.last;
    const qCategory = req.query.category;
    const qSort = req.query.sort;
    try {
        console.log("-----Product GET ALL -----");
        let products;
        if (qLast) {
            if(qLast==='All'){
                products = await Product.find().sort({ createdAt: -1 });}
            else {
                products = await Product.find().sort({ createdAt: -1 }).limit(qLast)};
          } else if (qCategory) {
            products = await Product.find({
                productCategories: {
                    $in: [qCategory],
                },
            });
          } else if(qSort){
            switch(qSort) {
                case 1:
                    products = await Product.find().sort({ productScore: 1 });
            }
          }
          else {
            products = await Product.find();
          }
          res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
};

//Delete product
export const deleteProduct = async (req, res, next) => {
    try {
        console.log("-----Product DELETE -----");

        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been Deleted!");
    } catch (err) {
        res.status(500).json(err);
    }
};


//ADD Image to product
export const addImage = async (req, res, next) => {
    try {
        console.log("-----Product ADD Image-----");
        const {
            productId,
            productImage,
        } = req.body;
        Product.findOneAndUpdate(
            {_id:productId,},
            {$push: {productImages: productImage}},
            (err,doc) =>{
                if(err) {
                    res.status(502).json(err)}
                else {
                    res.status(200).json("Images added to product succesfully!")}
            },
            )
    } catch (e) {
        next(e);
    }
};


//DELETE  Image of product
export const deleteImage = async (req, res, next) => {
    try {
        console.log("-----Product DELETE Image-----");
        const {
            productId,
            productImage,
        } = req.body;
        Product.updateOne(
            {_id:productId,},
            {$pull: {productImages: productImage}},
            (err,doc) =>{
                if(err) {
                    res.status(502).json(err)}
                else {
                    res.status(200).json("Image deleted to  succesfully!")}
            })
    } catch (e) {
        next(e);
    }
};


//ADD product Availability
export const addAvailability = async (req, res, next) => {
    try {
        console.log("----- Product ADD Availability -----");
        const {
            productId,
            newAvailability,
        } = req.body;
        Product.findOneAndUpdate(
            {_id:productId,},
            {$push: {productAvailability: newAvailability}},
            (err,doc) =>{
                if(err) {
                    res.status(502).json(err)}
                else {
                    res.status(200).json("Availability added succesfully!")}
            },
            )
    } catch (e) {
        next(e);
    }
};


//DELETE  Product availblity
export const deleteAvailblity = async (req, res, next) => {
    try {
        console.log("-----Product DELETE AVAILABLITY-----");
        const {
            productId,
            removeAvailability,
        } = req.body;
        Product.updateOne(
            {_id:productId,},
            {$pull: {productAvailability: removeAvailability}},
            (err,doc) =>{
                if(err) {
                    res.status(502).json(err)}
                else {
                    res.status(200).json("AVALABLITY deleted succesfully!")}
            })
    } catch (e) {
        next(e);
    }
};





export const uploadOneImage = async (req, res, next) => {
    try {
        console.log("-----UPLOAD TEST-----");
        console.log(req.file.filename)
        Product.findOneAndUpdate({_id:req.headers.lastid},
            {$push: {productImages:req.file.filename}},
            {},function(err,product){

        });

    } catch (e) {
        next(e);
    }
};