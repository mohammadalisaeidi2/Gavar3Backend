import mongoose from "mongoose" ;


const availabilitySchema = mongoose.Schema(
    {
        size   :{required: true , type:Number},
        weight :{required: true , type:Number},
    },
    {timestamps :true,}
)



const productSchema = new mongoose.Schema({

    productTitle: {
        type: String,
        required: true,
        minlength: 3,
    },
    productDetile: {
        type: String,
        required: true,
        minlength: 3,
    },
    productInfo: {
        type: String,
    },
    productColor: {
        type: String,
        required: true,
    },
    productCategories: [String],
    productImages: [String],
    productAvailability: [availabilitySchema],
    productBrand: {
        type: String,
        required: true,
    },
    productWages: {
        type: Number,
        required: true,
    },
    productSex: {
        type: String,
        required: true,
    },
    productHasStone: {
        type: Boolean,
        default:false
    },
    productScore: {
        type: Number,
        default:4,
        required: true,
    },
},{timestamps :true})
productSchema.post('save',(error,doc,next)=>{})
module.exports = mongoose.model("product", productSchema);
