import mongoose from "mongoose" ;
const slideShowSchema = new mongoose.Schema({

    title: {
        type: String,
        minlength: 3,
        maxlength: 30
    },
    img: {
        data: Buffer,
        contentType: String
    }
})

slideShowSchema.post('save',(error,doc,next)=>{

})

module.exports = mongoose.model("slideShows", slideShowSchema);
