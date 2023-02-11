import mongoose from "mongoose" ;

const orderSchema = new mongoose.Schema({

    orderUserId: {
        type: String,
        required: true,
    },
    orderProducts: [String],
    orderAddress: {
        type: String,
        required: true,
        minlength: 5,
    },
    orderPhone: {
        type: String,
        required: true,
        minlength: 10,
    },
    orderImages :[String],





},{timestamps :true})
orderSchema.post('save',(error,doc,next)=>{
})
module.exports = mongoose.model("orders", orderSchema);
