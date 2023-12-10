import mongoose from "mongoose";


const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: {
        type: String,
        required: true
    },

    productID: {
        type: Number,
        required: true,
        unique: true
    },
    quantity: {
        type: Number,
        required: true
    },
    costPrice: {
        type: Number,
        required: true
    },
    sellingPrice: {
        type: Number,
        rquired: true
    },
    description: {
        type: String,
    }


})

const Product = mongoose.model('Product', productSchema);


export default Product;