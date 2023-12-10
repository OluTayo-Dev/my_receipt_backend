import Product from "../model/product.js";


const createProduct = async (req, res) => {
    const {productName, productID, quantity, costPrice, sellingPrice, description} = req.body;
    try{
        await Product.create({productName, productID, quantity, costPrice, sellingPrice, description}).then(
            (product) => {
                res.status(201).json({message: "Product created successfully", product})
            }
        )
    } catch (err) {
        res.status(400).json({ message: "Failed to create Product", error:err.message})
    }
}

const updateProduct = async (req, res) => {
    const {productName, productID, quantity, costPrice, sellingPrice, description} = req.body;

    const product = await Product.findById(req.params.id)
    if(product) {
        product.productName = productName
        product.productID = productID
        product.quantity = quantity
        product.costPrice = costPrice
        product.sellingPrice = sellingPrice
        product.description = description 

        const updatedProduct = await product.save();
        console.log(updatedProduct)
        res.status(200).json({ message: "Product updated successfully", product})
    } else{
        res.status(404).json({ message: "Product not updated", error:err.message})
    }
}

const getProductById = async (req, res) => {
    const profile = await Product.findById(req.params.id)
    if(profile){
        res.json(profile)
    } else{
        res.status(400).json({ message: "Profile not found"})
    } 
}

const getAllProduct = async (req, res) => {

    try {
        const profile = await Product.find({})
        res.status(200).json({success:true, data: profile})
    } catch (err) {
        res.status(400).json({success: false, message:err.message});
    }
};

const deleteProduct = async (req, res) => {
    try{
        const id = req.params.id;
        const data = await Product.findByIdAndDelete(id)
        res.status(201).json({ message: "Product Removed", data}) 
    } catch (err) {
        res.status(400).json
        ({ message: "Product not found", error:err.message})
    }
}

export {createProduct, updateProduct, getProductById, getAllProduct, deleteProduct};